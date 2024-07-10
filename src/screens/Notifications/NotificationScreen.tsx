import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from 'src/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { markAsRead, selectNotifications, setNotificationSlice } from 'src/redux/slices/NotificationSlice';
import { ProfileServices } from 'src/services/apiclient';
import { Notification } from 'src/interface/notification/getNoti';
import { ViewFamilyScreenProps } from 'src/navigation/NavigationTypes';
import { setSelectedFamilyById } from 'src/redux/slices/FamilySlice';
import { setSelectedDate } from 'src/redux/slices/ExpenseAnalysis';

const NotificationScreen = ({navigation} : ViewFamilyScreenProps) => {
  let notifications = useSelector(selectNotifications);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchNotification();
  }, []);

  const fetchNotification = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await ProfileServices.getNotification(index);
      if (response) {
        setIndex(index + 1);
        dispatch(setNotificationSlice([...notifications, ...response]));
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
  
    const dateObj = typeof dateTime === 'string' ? new Date(dateTime) : dateTime;
  
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
      return 'Just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} ${diffMinutes > 1 ? 'minutes' : 'minute'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours > 1 ? 'hours' : 'hour'} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} ${diffDays > 1 ? 'days' : 'day'} ago`;
    } else if (diffWeeks < 4) {
      return `${diffWeeks} ${diffWeeks > 1 ? 'weeks' : 'week'} ago`;
    } else if (diffMonths < 12) {
      return `${diffMonths} ${diffMonths > 1 ? 'months' : 'month'} ago`;
    } else {
      return `${diffYears} ${diffYears > 1 ? 'years' : 'year'} ago`;
    }
  };
  const formatDate = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
  };
  
  const handlePressNoti = async (item: Notification) => {
    switch (item.type) {
      case 'CHECKLIST':
        navigation.navigate('FamilyStack', {
          screen: 'CheckList',
          params: { id_family: item.id_family }
        });
        
        break;

      case 'EXPENSE':
        dispatch(setSelectedFamilyById(item.id_family));
        navigation.navigate('ExpenseStack', { screen: 'ExpenseScreen' });
        break;
      case 'INCOME':
        
        dispatch(setSelectedFamilyById(item.id_family));
        navigation.navigate('IncomeStack', { screen: 'IncomeScreen' });
        break;  
      case 'ASSET':
        dispatch(setSelectedFamilyById(item.id_family));
        navigation.navigate('ExpenseStack', { screen: 'AssetScreen' });
        break;    
      case 'SHOPPING_LIST':
        dispatch(setSelectedFamilyById(item.id_family));
        navigation.navigate('ShoppingListStack', { screen: 'ShoppingList', params: item.id_family });
        break; 
      case 'CALENDAR':
        dispatch(setSelectedDate(formatDate(item.timestamp)));
        dispatch(setSelectedFamilyById(item.id_family));
        navigation.navigate('CalendarStack', { screen: 'CalendarScreen', params: item.id_family });
        break;      
      default:
        console.log(`Unhandled notification type: ${item.type}`);
    }
  };
  

  const renderItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity onPress={() => handlePressNoti(item)} style={[item.isRead ? {backgroundColor: '#fff'} : {backgroundColor: COLORS.AliceBlue}]}>
      <View style={styles.notificationItem}>
        <Image
          source={require('../../assets/images/avatar.png')}
          style={styles.avatar}
          resizeMode="cover"
        />
        <View style={styles.notificationContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>{item.content}</Text>
          <Text style={styles.date}>{item.timestamp ? formatDateTime(item.timestamp) : ''}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
  };
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Notifications</Text>
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
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
    marginTop: 20,
    backgroundColor: '#f8f8f8',
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
    padding: 16,
    shadowRadius: 8,
    elevation: 4,
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
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
