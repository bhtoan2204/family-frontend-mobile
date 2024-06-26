import React, {useEffect, useRef, useState, useCallback} from 'react';
import {View, Text, TouchableOpacity, Dimensions, Alert} from 'react-native';
import {Agenda, AgendaSchedule} from 'react-native-calendars';
import {CalendarScreenProps} from 'src/navigation/NavigationTypes';
import CalendarServices from 'src/services/apiclient/CalendarService';
import Icon from 'react-native-vector-icons/FontAwesome';
import {format, startOfMonth, endOfMonth, addMonths, subMonths} from 'date-fns';
import {useDispatch, useSelector} from 'react-redux';
import {setFamily, setDate, getDate, setEvent} from 'src/redux/slices/CalendarSlice';
import styles from './style';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheet from './BottomSheet';
import {Swipeable} from 'react-native-gesture-handler';
import IconL from 'react-native-vector-icons/Ionicons';
import {RRule, rrulestr} from 'rrule';
import {setSelectedDate} from 'src/redux/slices/ExpenseAnalysis';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Feather, Ionicons} from '@expo/vector-icons';
import { selectProfile } from 'src/redux/slices/ProfileSclice';
import type { Event } from 'src/interface/calendar/Event'

const CalendarScreen = ({route, navigation}: CalendarScreenProps) => {
  const {id_family} = route.params || {};
  const [events, setEvents] = useState<AgendaSchedule>({});
  const dispatch = useDispatch();
  const bottomSheetRef = useRef<RBSheet>(null);
  const screenHeight = Dimensions.get('screen').height;
  const [eventDetails, setEventDetails] = useState<Event | null>(null);
  const [allEvent, setAllEvent] = useState<Event[] | null>(null);

  const [selectDate, setSelectDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const profile = useSelector(selectProfile);
  let date = useSelector(getDate);
  dispatch(setFamily(id_family));

  useEffect(() => {
    fetchEvent();
    handleGetCalendarForMonth(new Date(selectDate));

  }, []);

  useEffect(() => {
    setSelectDate(format(new Date(date), 'yyyy-MM-dd'));
    handleGetCalendarForMonth(new Date(selectDate));
  }, [selectDate, allEvent]);

  const cleanRecurrenceRule = (rule: string) => {
    return rule
      .replace(/\s+/g, '') 
      .replace(/;$/, '');  
  };

  const fetchEvent = async() => {
    try {
      const response = await CalendarServices.getCalendar({ id_family });
      if (Array.isArray(response)) {
        const formattedEvents: Event[] | null= response.map(item => ({
          ...item,
          time_start: new Date(item.time_start),
          time_end: new Date(item.time_end),
        }));
        setAllEvent(formattedEvents);


      }
    } catch (error){
      console.error('Error fetching calendar data:', error);
    } 
  };
  

  const handleGetCalendarForMonth = useCallback(
    async (date: Date) => {
      const start = startOfMonth(subMonths(date, 1));
      const end = endOfMonth(addMonths(date, 3));
  
      try {
        
          if (allEvent) { 
            const groupedEvents = {};
    
            allEvent.forEach(event => {
              const dateKey = format(event.time_start, 'yyyy-MM-dd');
              if (!groupedEvents[dateKey]) {
                groupedEvents[dateKey] = [];
              }
              groupedEvents[dateKey].push({
                ...event,
                name: event.title,
                height: 50,
                day: dateKey,
              });
    
              if (event.recurrence_rule) {
                const cleanedRecurrenceRule = cleanRecurrenceRule(event.recurrence_rule);
                try {
                  const rule = rrulestr(cleanedRecurrenceRule);
                  const dates = rule.between(start, end);
                  dates.forEach(date => {
                    if (!isNaN(date.getTime())) { 
                      const recurrenceDateKey = format(date, 'yyyy-MM-dd');
                      if (!groupedEvents[recurrenceDateKey]) {
                        groupedEvents[recurrenceDateKey] = [];
                      }
                      groupedEvents[recurrenceDateKey].push({
                        ...event,
                        time_start: date,
                        time_end: new Date(
                          date.getTime() +
                          (event.time_end.getTime() - event.time_start.getTime())
                        ),
                        name: event.title,
                        height: 50,
                        day: recurrenceDateKey,
                      });
                    } else {
                      console.error('Invalid date:', date);
                    }
                  });
                } catch (recurrenceError) {
                  console.error('Error parsing cleaned recurrence rule:', recurrenceError, cleanedRecurrenceRule);
                }
              }
            });
    
            setEvents(prevEvents => ({ ...prevEvents, ...groupedEvents }));
          } 
        } catch(error){
          console.error('Error getting calendar for month:', error);
        }
      },
      [allEvent, selectDate],
  );
  

  
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
              await handleGetCalendarForMonth(new Date());
            } catch (error) {
              console.error('Error deleting event:', error);
              Alert.alert(
                'Error',
                'An error occurred while deleting the event.',
              );
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  const onUpdate = (event: Event) => {
    setEventDetails(event);
    bottomSheetRef.current?.open();
  };

  const handleAddEvent = () => {
    navigation.navigate('CreateEvent', {id_family});
  };

  

  const pressSchedule = () => {
    navigation.navigate('EventListScreen', {id_family});
  };

  const loadItemsForMonth = async (data: any) => {
    const selectedMonth = new Date(data.year, data.month - 1);
    await handleGetCalendarForMonth(selectedMonth);
  };
  const handlePressEvent = async (event: any) => {
    console.log(event)
    await dispatch(setEvent(event));
    navigation.navigate('EventDetailsScreen', {
      id_family: id_family,
      id_calendar: event.id_calendar,
    });
  };

  const renderItem = (item: any) => (
      <TouchableOpacity onPress={() => handlePressEvent(item)}>
        <View style={[styles.agendaItem, {backgroundColor: item.color}]}>
          <Text
            style={[
              styles.agendaItemText,
              {color: item.color !== 'white' ? 'white' : 'black'},
            ]}>
            {item.title}
          </Text>
          {!item.is_all_day && (
            <Text
              style={[
                styles.agendaItemTime,
                {color: item.color !== 'white' ? 'white' : 'black'},
              ]}>
              {format(new Date(item.time_start), 'HH:mm')} -{' '}
              {format(new Date(item.time_end), 'HH:mm')}
            </Text>
          )}
          {item.is_all_day && (
            <Text
              style={[
                styles.agendaItemTime,
                {color: item.color !== 'white' ? 'white' : 'black'},
              ]}>
              {format(new Date(item.time_start), 'yyyy/MM/dd')} -{' '}
              {format(new Date(item.time_end), 'yyyy/MM/dd')}
            </Text>
          )}
        </View>
      </TouchableOpacity>
  );

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
    setSelectedDate(date.dateString);
    dispatch(setDate(date.dateString));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.calendar}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => pressSchedule()}>
                    <Icon name="list" size={20} color="black" />
                </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 40, fontWeight: '300', marginBottom: 5}}>
              Today
            </Text>
            <Text style={{fontSize: 14, fontWeight: '300'}}>
              Welcome, {profile.firstname } {profile.lastname }
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
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.3,
              shadowRadius: 2,
            }}>
            <Feather name="plus" size={20} color="white" />
            <Text style={{marginLeft: 10, fontWeight: '700', color: 'white'}}>
              Add Task
            </Text>
          </TouchableOpacity>
        </View>
        <Agenda
          items={events}
          loadItemsForMonth={loadItemsForMonth}
          renderItem={renderItem}
          renderEmptyDate={renderEmptyDate}
          rowHasChanged={rowHasChanged}
          onDayPress={days => handleDayPress(days)}
          selected={selectDate}
        />
        
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;
