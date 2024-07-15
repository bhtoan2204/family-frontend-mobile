import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Agenda, AgendaSchedule } from 'react-native-calendars';
import { CalendarScreenProps } from 'src/navigation/NavigationTypes';
import CalendarServices from 'src/services/apiclient/CalendarService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import {  selectAllEvent, selectEvents, selectSelectedDate, setEvents, setSelectedDate, setSelectedEvent } from 'src/redux/slices/CalendarSlice';
import styles from './style';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheet from './BottomSheet';
import { Swipeable } from 'react-native-gesture-handler';
import IconL from 'react-native-vector-icons/Ionicons';
import { RRule, rrulestr } from 'rrule';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { selectProfile } from 'src/redux/slices/ProfileSclice';
import type { Event, EventDetail } from 'src/interface/calendar/Event';
import moment from 'moment';
import { selectSelectedFamily } from 'src/redux/slices/FamilySlice';
import { format, isSameDay as isSameDayFn, isSameMonth, isSameYear } from 'date-fns';

const CalendarScreen = ({ route, navigation }: CalendarScreenProps) => {
  const { id_family } = route.params || {};
  const dispatch = useDispatch();
  const bottomSheetRef = useRef<RBSheet>(null);
  const screenHeight = Dimensions.get('screen').height;
  const [eventDetails, setEventDetails] = useState<Event | null>(null);
  const [allEvent, setAllEvent] = useState<Event[] | null>(null);
  const [selectDate, setSelectDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const profile = useSelector(selectProfile);
  const date = useSelector(selectSelectedDate);
  const events = useSelector(selectAllEvent);
  const [currentEvents, setCurrentEvents] = useState<Event[]>([]);
  const family = useSelector(selectSelectedFamily);
  useEffect(() => {
    fetchEvent();
    
  }, []);

  useEffect(() => {
    setSelectDate(format(new Date(date), 'yyyy-MM-dd'));
    
  }, [selectDate, allEvent]);

  const cleanRecurrenceRule = (rule: string) => {
    return rule.replace(/\s+/g, '').replace(/;$/, '');
  };

  const fetchEvent = async () => {
    try {
      const response = await CalendarServices.getCalendar({ id_family: family.id_family });

      if (Array.isArray(response)) {
        const formattedEvents: Event[] = response.map(item => ({
          ...item,
          time_start: new Date(item.time_start),
          time_end: new Date(item.time_end),
        }));
        dispatch(setEvents(formattedEvents));
      }
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    }
  };

  
  const onDelete = async (event: Event) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this event?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await CalendarServices.DeleteEvent(event.id_calendar);
              Alert.alert('Success', 'Event has been deleted successfully.');
              //await handleGetCalendarForMonth(new Date());
            } catch (error) {
              console.error('Error deleting event:', error);
              Alert.alert('Error', 'An error occurred while deleting the event.');
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  const onUpdate = (event: Event) => {
    setEventDetails(event);
    bottomSheetRef.current?.open();
  };

  const handleAddEvent = () => {
    navigation.navigate('CreateEvent', { id_family });
  };

  const pressSchedule = () => {
    navigation.navigate('EventListScreen', { id_family });
  };

  const loadItemsForMonth = async (data: any) => {
    const selectedMonth = new Date(data.year, data.month - 1);
    dispatch(setSelectedDate(selectedMonth))

  };

  const handlePressEvent = async (event: EventDetail) => {
    dispatch(setSelectedEvent(event));
    navigation.navigate('EventDetailsScreen', {
      id_family: id_family,
      id_calendar: event.id_calendar,
    });
  };
  
  const renderItem = (item: EventDetail) => {
    const startDate =format(new Date(item.time_start), 'yyyy-MM-dd HH:mm:ss');
    const endDate = format(new Date(item.time_end), 'yyyy-MM-dd HH:mm:ss');
    const isAllDay = item.is_all_day;
    
    const isSameDay = isSameDayFn(startDate, endDate);
    const isSameMonthYear = isSameMonth(startDate, endDate) && isSameYear(startDate, endDate);

    return (
      <TouchableOpacity onPress={() => handlePressEvent(item)}>
        <View style={[styles.agendaItem, { backgroundColor: item.color }]}>
          <Text style={[styles.agendaItemText, { color: item.color !== 'white' ? 'white' : 'black' }]}>
            {item.title}
          </Text>
          {isAllDay ? (
            isSameDay ? (
              <Text style={[styles.agendaItemTime, { color: item.color !== 'white' ? 'white' : 'black' }]}>
                All day
              </Text>
            ) : (
              isSameMonthYear ? (
                <Text style={[styles.agendaItemTime, { color: item.color !== 'white' ? 'white' : 'black' }]}>
                All day {format(startDate, 'MM/dd')} - {format(endDate, 'MM/dd')}
              </Text>
              ) : (
                <Text style={[styles.agendaItemTime, { color: item.color !== 'white' ? 'white' : 'black' }]}>
                All day {format(startDate, 'yyyy/MM/dd')} - { format(endDate, 'yyyy/MM/dd')}
              </Text>
              )
             
            )
          ) : (
            isSameDay ? (
              <Text style={[styles.agendaItemTime, { color: item.color !== 'white' ? 'white' : 'black' }]}>
                {format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}
              </Text>
            ) : (
              <Text style={[styles.agendaItemTime, { color: item.color !== 'white' ? 'white' : 'black' }]}>
                {format(startDate, 'yyyy/MM/dd HH:mm')} - {format(endDate, isSameMonthYear ? 'dd HH:mm' : 'yyyy/MM/dd HH:mm')}
              </Text>
            )
          )}
          <Text style={[styles.agendaItemText, { color: item.color !== 'white' ? 'white' : 'black' }]}>
            {item.categoryEvent.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>No events for this day</Text>
      </View>
    );
  };

  const rowHasChanged = (r1: any, r2: any) => {
    return r1.id_calendar !== r2.id_calendar;
  };

  const handleDayPress = (date: any) => {
    setSelectDate(date.dateString);
    dispatch(setSelectedDate(moment(new Date(date.dateString)).format('YYYY-MM-DD')));

    // const eventsForSelectedDay = events[date.dateString] || [];
    // setCurrentEvents(eventsForSelectedDay);
  };

  function formatDate(dateStr: string | number | Date) {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.calendar}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pressSchedule()}>
          <Ionicons name="list" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
            alignItems: 'center',
          }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 40, fontWeight: '400', marginBottom: 5, color: 'gray' }}>
              {formatDate(selectDate)}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: '300' }}>
              Welcome, {profile.firstname} {profile.lastname}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleAddEvent}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#00adf5',
              padding: 15,
              borderRadius: 30,
              paddingHorizontal: 20,
              shadowColor: '#00adf5',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 2,
            }}>
            <Feather name="plus" size={20} color="white" />
            <Text style={{ marginLeft: 10, fontWeight: '700', color: 'white' }}>
              Add Task
            </Text>
          </TouchableOpacity>
        </View>
        <Agenda
          items={events}
          loadItemsForMonth={loadItemsForMonth}
          renderItem={renderItem}
          renderEmptyData={renderEmptyDate}
          rowHasChanged={rowHasChanged}
          onDayPress={(days: any) => handleDayPress(days)}
          selected={selectDate}
        />
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;
