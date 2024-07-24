import React, { useState, useEffect, useRef } from 'react';
import {View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { getSocket } from "../../services/apiclient/Socket";
import { AxiosResponse } from 'axios';
import { FamilyServices } from '../../services/apiclient';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from '../../redux/slices/ProfileSclice';
import { Message } from 'src/redux/slices/MessageUser';



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

  // const fetchMember = async (receiverId?: string) => {
  //   try {
  //     const response: AxiosResponse<Member[]> = await FamilyServices.getMember({ id_user: receiverId });
  //     if (response && response.data.length > 0) {
  //       return response.data[0];
  //     }
  //   } catch (error) {
  //     console.error('Error fetching member:', error);
  //   }
  // };

//   const fetchFamily = async (id_family?: number) => {
//     try {
//         const familyInfo: AxiosResponse<Family[]> = await FamilyServices.getFamily({ id_family });
//         //console.log(familyInfo[0])
//         return familyInfo[0];
//     } catch (error) {
//         console.error('Error fetching family:', error);
//     }
// };


  const handleNewImage = async (message: Message) => {
    //console.log('hi')
    //if (!notificationQueue.some((queuedMessage) => queuedMessage._id === message._id)) {
      //const sender: Member | undefined = await fetchMember(message.senderId);
     
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `${message.senderInfo.firstname} ${message.senderInfo.lastname}`,
            body: 'Sent image',
            data: {
              screen: 'ChatUser',
              id_user: message.receiverId,
              receiverId: message.senderId,
            },
          },
          trigger: { seconds: 1 },
        });
        setNotificationQueue((prevQueue) => [...prevQueue, { ...message, isRead: false, category: 'User' }]);
      
   //}
  };

  const handleNewMessage = async (message: Message) => {
    console.log(message);
    if (!notificationQueue.some((queuedMessage) => queuedMessage._id === message._id)) {
      //const sender: Member | undefined = await fetchMember(message.senderId);
      //if (sender) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `${message.senderInfo.firstname} ${message.senderInfo.lastname}`,
            body: message.content,
            data: {
              screen: 'ChatUser',
              id_user: message.receiverId,
              receiverId: message.senderId,
            },
          },
          trigger: { seconds: 1 },
        });
        setNotificationQueue((prevQueue) => [...prevQueue, { ...message, isRead: false, category: 'User' }]);
      //}
   }
  };
  const handleNewNotification = async (message: any) => {
    console.log(message);
      //const sender: Member | undefined = await fetchMember(message.senderId);
      //if (sender) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `${message.familyInfo.name} `,
            body: message.content,
            // data: {
            //   screen: 'ChatUser',
            //   id_user: message.receiverId,
            //   receiverId: message.senderId,
            // },
          },
          trigger: { seconds: 1 },
        });
      //}
   
  };

  const handleNewMessageFamily = async (message: any) => {
    console.log(message)
    // const sender: Member | undefined = await fetchMember(message.senderId);
    // const family: Family | undefined = await fetchFamily(message.familyId);
    //if (sender && family) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `${message.senderInfo.firstname} ${message.senderInfo.lastname}`,
          subtitle: `${message.senderInfo.firstname}`,
          body: message.content,
          data: {
            screen: 'ChatFamily',
            familyId: message.familyId,
          },
        },
        trigger: { seconds: 1 },
      });
      setNotificationQueue((prevQueue) => [...prevQueue, { ...message, isRead: false, category: 'Family' }]);
    //}
  };

  // const handleNewImageFamily = async (message: Message) => {
  //   if (!notificationQueue.some((queuedMessage) => queuedMessage._id === message._id)) {
  //     const sender: Member | undefined = await fetchMember(message.senderId);
  //     const family: Family | undefined = await fetchFamily(message.familyId);
  //     if (sender && family) {
  //       await Notifications.scheduleNotificationAsync({
  //         content: {
  //           title: `${sender.firstname} ${sender.lastname}`,
  //           subtitle: `${family.name}`,
  //           body: 'Sent image',
  //           data: {
  //             screen: 'ChatFamily',
  //             familyId: message.familyId,
  //           },
  //           },
  //         trigger: { seconds: 1 },
  //       });
  //       setNotificationQueue((prevQueue) => [...prevQueue, { ...message, isRead: false, category: 'Family' }]);
  //     }
  //   }
  // };
  const checkNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
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
        socket.on('onNewImageMessage', handleNewImage);
        socket.on('onNewFamilyMessage', handleNewMessageFamily);
        // socket.on('onNewFamilyImageMessage', handleNewImageFamily);
        socket.on('onNewNotification', handleNewNotification);

      }

  return () => {
    if (socket) {
      socket.off('onNewMessage', handleNewMessage);
      socket.off('onNewNotification', handleNewNotification);

      socket.off('onNewImageMessage', handleNewImage);
      // socket.off('onNewFamilyMessage', handleNewMessageFamily);
      // socket.off('onNewFamilyImageMessage', handleNewImageFamily);
    }
  };
}, []);


  useEffect(() => {
    //console.log(navigation)
    const notificationResponseListener = Notifications.addNotificationResponseReceivedListener(response => {
      const screen = response.notification.request.content.data.screen;
      let id_user = response.notification.request.content.data.id_user;
      const receiverId = response.notification.request.content.data.receiverId;
      const familyId = response.notification.request.content.data.familyId;
      if (navigation && screen === 'ChatUser'  && receiverId) {
        navigation.navigate('ChatStack', {screen: 'ChatUser', params: { id_user: id_user, receiverId: receiverId }});
      }
      if (navigation && screen === 'ChatFamily' && familyId) {
        id_user = profile.id_user;
        navigation.navigate('ChatStack', {screen: 'ChatFamily', params: { id_user: id_user, id_family: familyId }});
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationResponseListener);
    };
  }, [navigation]);

  return (
    <View>
    </View>
  );
};

export default Notification;