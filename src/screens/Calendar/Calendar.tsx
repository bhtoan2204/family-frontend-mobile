import React, {useEffect, useRef, useState, useCallback} from 'react';
import {View, Text, TouchableOpacity, Dimensions, Alert} from 'react-native';
import {Agenda, AgendaSchedule, LocaleConfig} from 'react-native-calendars';
import {CalendarScreenProps} from 'src/navigation/NavigationTypes';
import CalendarServices from 'src/services/apiclient/CalendarService';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectAllEvent,
  selectEvents,
  selectSelectedDate,
  setEvents,
  setSelectedDate,
  setSelectedEvent,
  setSelectedEventById,
} from 'src/redux/slices/CalendarSlice';
import styles from './style';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheet from './BottomSheet';
import {Swipeable} from 'react-native-gesture-handler';
import IconL from 'react-native-vector-icons/Ionicons';
import {RRule, rrulestr} from 'rrule';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Feather, Ionicons} from '@expo/vector-icons';
import {selectProfile} from 'src/redux/slices/ProfileSclice';
import type {Event, EventDetail} from 'src/interface/calendar/Event';
import moment from 'moment';
import {selectSelectedFamily} from 'src/redux/slices/FamilySlice';
import {isSameDay as isSameDayFn, isSameMonth, isSameYear} from 'date-fns';
import {getTranslate, selectLocale} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import './localeConfig';
import CustomDay from './CustomDay';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isBefore,
  startOfDay,
} from 'date-fns';
import {getSocket} from 'src/services/apiclient/Socket';
import {Noti} from 'src/interface/notification/getNoti';

const CalendarScreen = ({route, navigation}: CalendarScreenProps) => {
  const {id_family} = route.params || {};
  const dispatch = useDispatch();
  const bottomSheetRef = useRef<RBSheet>(null);
  const screenHeight = Dimensions.get('screen').height;
  const [eventDetails, setEventDetails] = useState<Event | null>(null);
  const [allEvent, setAllEvent] = useState<Event[] | null>(null);
  const [selectDate, setSelectDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd'),
  );
  const profile = useSelector(selectProfile);
  const date = useSelector(selectSelectedDate);
  const events = useSelector(selectAllEvent);
  const [currentEvents, setCurrentEvents] = useState<Event[]>([]);
  const family = useSelector(selectSelectedFamily);
  const translate = useSelector(getTranslate);
  const color = useThemeColors();
  const location = useSelector(selectLocale);
  const [key, setKey] = useState(Date.now());
  const socket = getSocket();

  useEffect(() => {
    fetchEvent();
  }, [route.params?.forceUpdate]);

  useEffect(() => {
    LocaleConfig.defaultLocale = location;
    setKey(Date.now());
  }, [location]);

  useEffect(() => {
    setSelectDate(format(new Date(date), 'yyyy-MM-dd'));
  }, [selectDate, allEvent]);

  const cleanRecurrenceRule = (rule: string) => {
    return rule.replace(/\s+/g, '').replace(/;$/, '');
  };

  const fetchEvent = async () => {
    try {
      const response = await CalendarServices.getCalendar({
        id_family: family.id_family,
      });

      if (Array.isArray(response)) {
        const formattedEvents: Event[] = response.map(item => ({
          ...item,
          time_start: new Date(item.time_start),
          time_end: new Date(item.time_end),
        }));
        dispatch(setEvents(formattedEvents));
        dispatch(setSelectedDate(moment(new Date()).format('YYYY-MM-DD')));
      }
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    }
  };

  // const onDelete = async (event: Event) => {
  //   Alert.alert(
  //     'Confirm Delete',
  //     'Are you sure you want to delete this event?',
  //     [
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Delete',
  //         onPress: async () => {
  //           try {
  //             await CalendarServices.DeleteEvent(event.id_calendar);
  //             Alert.alert('Success', 'Event has been deleted successfully.');
  //             //await handleGetCalendarForMonth(new Date());
  //           } catch (error) {
  //             console.error('Error deleting event:', error);
  //             Alert.alert('Error', 'An error occurred while deleting the event.');
  //           }
  //         },
  //       },
  //     ],
  //     { cancelable: true },
  //   );
  // };

  // const onUpdate = (event: Event) => {
  //   setEventDetails(event);
  //   bottomSheetRef.current?.open();
  // };

  const handleAddEvent = () => {
    navigation.navigate('CreateEvent', {id_family});
  };

  const pressSchedule = () => {
    navigation.navigate('EventListScreen', {id_family});
  };

  const loadItemsForMonth = async (data: any) => {
    const selectedMonth = new Date(data.year, data.month - 1);
    dispatch(setSelectedDate(selectedMonth));
  };

  const handlePressEvent = async (event: EventDetail) => {
    console.log(event);
    dispatch(setSelectedEvent(event));
    navigation.navigate('EventDetailsScreen', {
      id_family: id_family,
      id_calendar: event.id_calendar,
    });
  };
  const isPastDate = date =>
    isBefore(startOfDay(new Date(date)), startOfDay(new Date()));

  const renderItem = item => {
    const startDate = new Date(item.time_start);
    const endDate = new Date(item.time_end);
    const isAllDay = item.is_all_day;

    const backgroundColor = isPastDate(startDate)
      ? 'lightgray'
      : `${item.color}90`;

    const textColor = item.color !== 'white' ? 'white' : 'black';

    const isSameDay = startDate.toDateString() === endDate.toDateString();
    const isSameMonthYear =
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getFullYear() === endDate.getFullYear();

    return (
      <TouchableOpacity
        onPress={() => handlePressEvent(item)}
        style={{backgroundColor: color.background}}>
        <View style={[styles.agendaItem, {backgroundColor: `${item.color}70`}]}>
          <Text
            style={[
              styles.agendaItemText,
              {color: item.color !== 'white' ? 'white' : 'black'},
            ]}>
            {item.title}
          </Text>
          {isAllDay ? (
            isSameDay ? (
              <Text style={[styles.agendaItemTime, {color: textColor}]}>
                {translate('All day')}
              </Text>
            ) : isSameMonthYear ? (
              <Text style={[styles.agendaItemTime, {color: textColor}]}>
                {translate('All day')} {format(startDate, 'MM/dd')} -{' '}
                {format(endDate, 'MM/dd')}
              </Text>
            ) : (
              <Text style={[styles.agendaItemTime, {color: textColor}]}>
                {translate('All day')} {format(startDate, 'yyyy/MM/dd')} -{' '}
                {format(endDate, 'yyyy/MM/dd')}
              </Text>
            )
          ) : isSameDay ? (
            <Text style={[styles.agendaItemTime, {color: textColor}]}>
              {format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}
            </Text>
          ) : (
            <Text style={[styles.agendaItemTime, {color: textColor}]}>
              {format(startDate, 'yyyy/MM/dd HH:mm')} -{' '}
              {format(
                endDate,
                isSameMonthYear ? 'dd HH:mm' : 'yyyy/MM/dd HH:mm',
              )}
            </Text>
          )}
          <Text style={[{color: textColor, fontWeight: '800'}]}>
            {translate('Location')}: {item.location}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={[styles.emptyDate, {backgroundColor: color.background}]}>
        <Text style={{color: color.text}}>
          {translate('No events for this day')}
        </Text>
      </View>
    );
  };

  const rowHasChanged = (r1: any, r2: any) => {
    return r1.id_calendar !== r2.id_calendar;
  };

  const handleDayPress = (date: any) => {
    setSelectDate(date.dateString);
    dispatch(
      setSelectedDate(moment(new Date(date.dateString)).format('YYYY-MM-DD')),
    );

    // const eventsForSelectedDay = events[date.dateString] || [];
    // setCurrentEvents(eventsForSelectedDay);
  };

  function formatDate(dateStr: string | number | Date) {
    const date = new Date(dateStr);
    const options = {year: 'numeric', month: 'short'};
    return date.toLocaleDateString(location === 'vi' ? 'vi' : 'en-US', options);
  }
  const getDayTextColor = (date: string | number | Date) => {
    const today = new Date();
    return isBefore(new Date(date), today) ? 'white' : color.text;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.background}}>
      <View style={styles.calendar}>
        <View style={[styles.header, {backgroundColor: color.background}]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={30} color={color.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pressSchedule()}>
            <Ionicons name="list" size={30} color={color.text} />
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
            <Text
              style={{
                fontSize: 40,
                fontWeight: '400',
                marginBottom: 5,
                color: color.text,
              }}>
              {formatDate(selectDate)}
            </Text>
            <Text style={{fontSize: 14, fontWeight: '300', color: color.text}}>
              {translate('Welcome')}, {profile.firstname} {profile.lastname}
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
              {translate('Add Event')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, backgroundColor: color.background}}>
          <Agenda
            key={key}
            items={events}
            loadItemsForMonth={loadItemsForMonth}
            renderItem={renderItem}
            renderEmptyData={renderEmptyDate}
            rowHasChanged={rowHasChanged}
            onDayPress={days => handleDayPress(days)}
            selected={selectDate}
            hideExtraDays
            showClosingKnob={true}
            theme={{
              backgroundColor: color.background,
              calendarBackground: color.background,
              monthTextColor: color.text,
              textDecorationColor: color.background,
              dayTextColor: color.text,

              textSectionTitleColor: color.text,
              agendaKnobColor: color.white,
              reservationsBackgroundColor: color.background,
            }}
            dayNamesShort={LocaleConfig.locales[location]?.dayNamesShort || []}
            monthNames={LocaleConfig.locales[location]?.monthNames || []}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;
