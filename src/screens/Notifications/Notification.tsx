import React, {useState, useEffect, useRef} from 'react';
import {View} from 'react-native';
import * as Notifications from 'expo-notifications';
import {getSocket} from '../../services/apiclient/Socket';
import {AxiosResponse} from 'axios';
import {FamilyServices} from '../../services/apiclient';
import {useDispatch, useSelector} from 'react-redux';
import {selectProfile} from '../../redux/slices/ProfileSclice';
import {Message} from 'src/redux/slices/MessageUser';
import {Noti} from 'src/interface/notification/getNoti';
import {setSelectedFamilyById} from 'src/redux/slices/FamilySlice';
import {setSelectedDate} from 'src/redux/slices/CalendarSlice';
import {selectLocale} from 'src/redux/slices/languageSlice';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Notification = ({navigation}) => {
  const profile = useSelector(selectProfile);
  const [notificationQueue, setNotificationQueue] = useState<Message[]>([]);
  const socket = getSocket();
  const notificationListener = useRef<Notifications.Subscription | undefined>();
  const dispatch = useDispatch();
  const language = useSelector(selectLocale);

  const handleNewMessage = async (message: Message) => {
    if (message.senderId != profile.id_user) {
      let notificationBody = message.content;
      switch (message.type) {
        case 'photo':
          notificationBody = 'Sent image';
          break;
        case 'video':
          notificationBody = 'Sent video';
          break;
        case 'text':
          notificationBody = message.content;
          break;
        default:
          notificationBody = 'New message';
          break;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: `${message.receiver.firstname} ${message.receiver.lastname}`,
          body: notificationBody,
          data: {
            screen: 'ChatUser',
            id_user: message.receiverId,
            receiverId: message.senderId,
          },
        },
        trigger: {seconds: 1},
      });
      setNotificationQueue(prevQueue => [
        ...prevQueue,
        {...message, isRead: false, category: 'User'},
      ]);
    }
  };

  const handleNewNotification = async (message: Noti) => {
    if (message.createdAt != profile.id_user) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `${message.familyInfo.name}`,
          body: message.content,
          data: {
            type: message.type,
            id_family: message.id_family,
            timestamp: message.timestamp,
          },
        },
        trigger: {seconds: 1},
      });
    }
  };

  const handleNewMessageFamily = async (message: any) => {
    let notificationBody = '';
    switch (message.type) {
      case 'photo':
        notificationBody = 'Sent image';
        break;
      case 'video':
        notificationBody = 'Sent video';
        break;
      case 'text':
        notificationBody = message.content;
        break;
      default:
        notificationBody = 'New message';
        break;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${message.senderInfo.firstname} ${message.senderInfo.lastname}`,
        subtitle: `${message.senderInfo.firstname}`,
        body: notificationBody,
        data: {
          screen: 'ChatFamily',
          familyId: message.familyId,
        },
      },
      trigger: {seconds: 1},
    });
    setNotificationQueue(prevQueue => [
      ...prevQueue,
      {...message, isRead: false, category: 'Family'},
    ]);
  };

  const checkNotificationPermission = async () => {
    const {status} = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const {status: newStatus} = await Notifications.requestPermissionsAsync();
      if (newStatus !== 'granted') {
        console.log('Notification permission not granted');
        return false;
      }
    }
    return true;
  };
  useEffect(() => {
    checkNotificationPermission();
    if (socket) {
      socket.on('onNewMessage', handleNewMessage);
      socket.on('onNewFamilyMessage', handleNewMessageFamily);
      socket.on('onNewNotification', handleNewNotification);
    }

    return () => {
      if (socket) {
        socket.off('onNewMessage', handleNewMessage);
        socket.off('onNewFamilyMessage', handleNewMessageFamily);
        socket.off('onNewNotification', handleNewNotification);
      }
    };
  }, []);

  useEffect(() => {
    const notificationResponseListener =
      Notifications.addNotificationResponseReceivedListener(response => {
        const screen = response.notification.request.content.data.screen;
        let id_user = response.notification.request.content.data.id_user;
        const receiverId =
          response.notification.request.content.data.receiverId;
        const familyId = response.notification.request.content.data.familyId;
        if (navigation && screen === 'ChatUser' && receiverId) {
          navigation.navigate('ChatStack', {
            screen: 'ChatUser',
            params: {id_user: id_user, receiverId: receiverId},
          });
        }
        if (navigation && screen === 'ChatFamily' && familyId) {
          id_user = profile.id_user;
          navigation.navigate('ChatStack', {
            screen: 'ChatFamily',
            params: {id_user: id_user, id_family: familyId},
          });
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationResponseListener,
      );
    };
  }, [navigation]);

  const formatDate = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    const notificationResponseListener =
      Notifications.addNotificationResponseReceivedListener(response => {
        const {screen, id_user, receiverId, familyId, type, id_family} =
          response.notification.request.content.data;
        switch (type) {
          case 'CHECKLIST':
            navigation.navigate('TodoListStack', {
              screen: 'TodoList',
              params: {id_family},
            });
            break;
          case 'EXPENSE':
            dispatch(setSelectedFamilyById(id_family));
            navigation.navigate('ExpenseStack', {screen: 'ExpenseScreen'});
            break;
          case 'INCOME':
            dispatch(setSelectedFamilyById(id_family));
            navigation.navigate('IncomeStack', {screen: 'IncomeScreen'});
            break;
          case 'ASSET':
            dispatch(setSelectedFamilyById(id_family));
            navigation.navigate('ExpenseStack', {screen: 'AssetScreen'});
            break;
          case 'SHOPPING_LIST':
            dispatch(setSelectedFamilyById(id_family));
            navigation.navigate('ShoppingListStack', {
              screen: 'ShoppingList',
              params: id_family,
            });
            break;
          case 'CALENDAR':
            dispatch(
              setSelectedDate(
                formatDate(
                  response.notification.request.content.data.timestamp,
                ),
              ),
            );
            dispatch(setSelectedFamilyById(id_family));
            navigation.navigate('CalendarStack', {
              screen: 'CalendarScreen',
              params: id_family,
            });
            break;
          case 'EDUCATION':
            navigation.navigate('EducationStack', {
              screen: 'EducationScreen',
              params: {id_family},
            });
            break;
          case 'GUIDELINE':
            navigation.navigate('FamilyStack', {
              screen: 'GuildLine',
              params: {id_family},
            });
            break;
          default:
            console.log('Unknown notification type:', type);
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationResponseListener,
      );
    };
  }, [navigation, profile]);

  return <View></View>;
};

export default Notification;
