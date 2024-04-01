import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { CalendarScreenProps } from 'src/navigation/NavigationTypes';
import styles from './style';
import CalendarServices from 'src/services/apiclient/CalendarService';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const CalendarScreen = ({ navigation, route }: CalendarScreenProps) => {
  const [events, setEvents] = useState({});
  const { id_family } = route.params || {};

  type FormattedEvents = {
    [date: string]: { marked: boolean; customIcon?: JSX.Element };
  };



  const handleGetCalendar = async () => {
    try {
      const response = await CalendarServices.getCalendar({ id_family: id_family });
      const formattedEvents: FormattedEvents = {};
      response.data.forEach((item: { datetime: string }) => {
        const date = new Date(item.datetime).toISOString().split('T')[0];
        formattedEvents[date] = { marked: true };
      });
      setEvents(formattedEvents);
    } catch (error) {
      console.log('getCalendar', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetCalendar();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.calendar}>
      <Calendar
        onDayPress={(day) => console.log('selected day', day)}
        monthFormat={'yyyy/MM'}
        firstDay={1}
        enableSwipeMonths={true}
        markedDates={events}
      />
    </View>
  );
};

export default CalendarScreen;
