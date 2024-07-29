import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from 'src/constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  markAsRead,
  selectNotifications,
  setNotificationSlice,
} from 'src/redux/slices/NotificationSlice';
import {ProfileServices} from 'src/services/apiclient';
import {Noti} from 'src/interface/notification/getNoti';
import {ViewFamilyScreenProps} from 'src/navigation/NavigationTypes';
import {setSelectedFamilyById} from 'src/redux/slices/FamilySlice';
import {setSelectedDate} from 'src/redux/slices/ExpenseAnalysis';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {getTranslate, selectLocale} from 'src/redux/slices/languageSlice';

const NotificationScreen = ({navigation}: ViewFamilyScreenProps) => {
  let notifications = useSelector(selectNotifications);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const color = useThemeColors();
  const translate = useSelector(getTranslate);
  const language = useSelector(selectLocale);

  useEffect(() => {
    fetchNotification();
  }, [index]);

  const fetchNotification = async () => {
    setLoading(true);
    try {
      if (index == 0) {
        dispatch(setNotificationSlice([]));
      }
      const response = await ProfileServices.getNotification(index);
      if (response && response.data.length > 0) {
        setIndex(index + 1);
        dispatch(setNotificationSlice([...notifications, ...response.data]));
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetchNotification:', error);
    }
    setLoading(false);
  };

  const formatDateTime = (dateTime: Date | string) => {
    if (!dateTime) {
      return '';
    }

    const dateObj =
      typeof dateTime === 'string' ? new Date(dateTime) : dateTime;

    if (!(dateObj instanceof Date && !isNaN(dateObj.getTime()))) {
      console.error('Invalid dateTime:', dateTime);
      return '';
    }

    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffSeconds < 60) {
      return translate('Just now');
    } else if (diffMinutes < 60) {
      return `${diffMinutes} ${diffMinutes > 1 ? translate('minutes') : translate('')} ${translate('ago')}`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours > 1 ? translate('hours') : translate('hour')} ${translate('ago')}`;
    } else if (diffDays < 7) {
      return `${diffDays} ${diffDays > 1 ? translate('days') : translate('day')} ${translate('ago')}`;
    } else if (diffWeeks < 4) {
      return `${diffWeeks} ${diffWeeks > 1 ? translate('weeks') : translate('week')} ${translate('ago')}`;
    } else if (diffMonths < 12) {
      return `${diffMonths} ${diffMonths > 1 ? translate('months') : translate('month')} ${translate('ago')}`;
    } else {
      return `${diffYears} ${diffYears > 1 ? translate('years') : translate('year')} ${translate('ago')}`;
    }
  };
  const formatDate = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
  };

  const handlePressNoti = async (item: Noti) => {
    switch (item.type) {
      case 'CHECKLIST':
        navigation.navigate('TodoListStack', {
          screen: 'TodoList',
          params: {id_family: item.id_family},
        });

        break;

      case 'EXPENSE':
        dispatch(setSelectedFamilyById(item.id_family));
        navigation.navigate('ExpenseStack', {screen: 'ExpenseScreen'});
        break;
      case 'INCOME':
        dispatch(setSelectedFamilyById(item.id_family));
        navigation.navigate('IncomeStack', {screen: 'IncomeScreen'});
        break;
      case 'ASSET':
        dispatch(setSelectedFamilyById(item.id_family));
        navigation.navigate('ExpenseStack', {screen: 'AssetScreen'});
        break;
      case 'SHOPPING_LIST':
        dispatch(setSelectedFamilyById(item.id_family));
        navigation.navigate('ShoppingListStack', {
          screen: 'ShoppingList',
          params: item.id_family,
        });
        break;
      case 'CALENDAR':
        dispatch(setSelectedDate(formatDate(item.timestamp)));
        dispatch(setSelectedFamilyById(item.id_family));
        navigation.navigate('CalendarStack', {
          screen: 'CalendarScreen',
          params: item.id_family,
        });
        break;
      case 'EDUCATION':
        navigation.navigate('EducationStack', {
          screen: 'EducationScreen',
          params: {id_family: item!.id_family},
        });
        break;
      case 'GUIDELINE':
        navigation.navigate('FamilyStack', {
          screen: 'GuildLine',
          params: {id_family: item!.id_family},
        });
        break;
      case 'CHAT':
        break;
      default:
        console.log(`Unhandled notification type: ${item.type}`);
    }
  };

  const renderItem = ({item}: {item: Noti}) => (
    // <TouchableOpacity
    //   onPress={() => handlePressNoti(item)}
    //   style={[
    //     item.isRead
    //       ? {backgroundColor: color.background}
    //       : {backgroundColor: color.white},
    //   ]}>
    //   <View style={styles.notificationItem}>
    //     {item.familyInfo.avatar && (
    //       <Image
    //         source={{uri: item.familyInfo.avatar}}
    //         style={styles.avatar}
    //         resizeMode="cover"
    //       />
    //     )}

    //     {/* { item.familyInfo.avatar ? (
    //     <Image
    //       source={{uri: item.familyInfo.avatar}}
    //       style={styles.avatar}
    //       resizeMode="cover"
    //     />
    //   ):(
    //     <Image
    //     source={require('../../assets/images/avatar.png')}

    //     style={styles.avatar}
    //     resizeMode="cover"
    //   />
    //   )
    // } */}
    //     <View style={styles.notificationContent}>
    //       <Text style={[styles.title, {color: color.text}]}>
    //         {language === 'vi' ? item.title_vn : item.title}
    //       </Text>
    //       <Text style={[styles.content, {color: color.textSubdued}]}>
    //         {language === 'vi' ? item.content_vn : item.content}
    //       </Text>

    //       <Text style={[styles.date, {color: color.textSubdued}]}>
    //         {item.timestamp ? formatDateTime(item.timestamp) : ''}
    //       </Text>
    //     </View>
    //   </View>
    // </TouchableOpacity>
    <TouchableOpacity
      onPress={() => handlePressNoti(item)}
      style={[
        item.isRead
          ? {backgroundColor: color.background}
          : {backgroundColor: color.white},
      ]}>
      <View style={styles.notificationItem}>
        {item.familyInfo.avatar && (
          <Image
            source={{uri: item.familyInfo.avatar}}
            style={styles.avatar}
            resizeMode="cover"
          />
        )}
        <View style={styles.notificationContent}>
          <Text style={[styles.title, {color: color.text}]}>
            {language === 'vi' ? item.title_vn : item.title}
          </Text>
          <Text style={[styles.content, {color: color.textSubdued}]}>
            {language === 'vi' ? item.content_vn : item.content}
          </Text>

          <Text style={[styles.date, {color: color.textSubdued}]}>
            {item.timestamp ? formatDateTime(item.timestamp) : ''}
          </Text>
        </View>
        {!item.isRead && <View style={styles.unreadIndicator} />}
        {/* Hình tròn đỏ */}
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    return loading ? (
      <ActivityIndicator size="large" color={color.text} />
    ) : null;
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: color.background}]}>
      <View style={styles.container}>
        <Text style={[styles.header, {color: color.text}]}>
          {translate('notificationTab')}
        </Text>
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginBottom: 50,
  },
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    marginLeft: 20,
  },
  notificationItem: {
    position: 'relative',
    padding: 16,
    shadowRadius: 8,
    elevation: 4,
    flexDirection: 'row',
  },
  unreadIndicator: {
    position: 'absolute',
    right: 20, // Hoặc điều chỉnh tùy theo bố cục của bạn
    top: 50, // Hoặc điều chỉnh tùy theo bố cục của bạn
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  content: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#aaa',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
});

export default NotificationScreen;
