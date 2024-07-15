import React, { useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { EventListScreenProps } from 'src/navigation/NavigationTypes';
import CalendarServices from 'src/services/apiclient/CalendarService';
import { AgendaSchedule, CalendarList, CalendarProvider, ExpandableCalendar, TimelineList, CalendarUtils, AgendaEntry } from 'react-native-calendars';
import { format, startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns';
import { rrulestr } from 'rrule';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash'; 
import { Event } from 'src/interface/calendar/Event';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedDate, setSelectedDate } from 'src/redux/slices/CalendarSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PackedEvent } from 'react-native-calendars/src/timeline/EventBlock';
const EVENT_COLOR = 'white';

const EventListScreen = ({ route, navigation }: EventListScreenProps) => {
  const { id_family } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<AgendaSchedule>({});
  const selectedDate = useSelector(selectSelectedDate);
  const [showTimeline, setShowTimeline] = useState(true);
  const INITIAL_TIME = { hour: 9, minutes: 0 };
  const [eventTL, setEventTL] = useState<Event[]>([]);
  let date = useSelector(selectSelectedDate);

  const dispatch = useDispatch();
  const [allEvent, setAllEvent] = useState<Event[] | null>(null);

  useEffect(() => {
    fetchEvent();
  }, []);

  useEffect(() => {
    dispatch(setSelectedDate(format(new Date(date), 'yyyy-MM-dd')));
    handleGetCalendarForMonth(new Date(selectedDate));
    handleGetCalendarForDay(new Date(selectedDate));
  }, [allEvent]);

  const fetchEvent = async () => {
    try {
      const response = await CalendarServices.getCalendar({ id_family });
      if (Array.isArray(response)) {
        const formattedEvents: Event[] | null = response.map(item => ({
          ...item,
          time_start: new Date(item.time_start),
          time_end: new Date(item.time_end),
        }));
        setAllEvent(formattedEvents);
      }
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    }
  };

  const cleanRecurrenceRule = (rule: string) => {
    return rule
      .replace(/\s+/g, '') 
      .replace(/;$/, '');  
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
              id_calendar: event.id_calendar,
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
                      id_calendar: event.id_calendar,
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
      } catch (error) {
        console.error('Error getting calendar for month:', error);
      }
    },
    [allEvent, selectedDate],
  );

  const handleGetCalendarForDay = useCallback(async (date: string | number | Date) => {
    const start = startOfMonth(subMonths(new Date(date), 1));
    const end = endOfMonth(addMonths(new Date(date), 3));
  
    try {
      if (allEvent) { 
        const groupedEvents: Event[] = [];
        
        allEvent.forEach(event => {
          if (event.recurrence_rule) {
            const cleanedRecurrenceRule = cleanRecurrenceRule(event.recurrence_rule);
            const rule = rrulestr(cleanedRecurrenceRule);
            const dates = rule.between(start, end);
            dates.forEach(date => {
              groupedEvents.push({
                ...event,
                id_calendar: event.id_calendar,
                time_start: format(new Date(date), 'yyyy-MM-dd') + ' ' + format(new Date(event.time_start), 'HH:mm:ss'),
                time_end: format(new Date(date.getTime() + (event.time_end.getTime() - event.time_start.getTime())), 'yyyy-MM-dd') + ' ' + format(new Date(event.time_end), 'HH:mm:ss'),
                name: event.title,
                height: 50,
              });
            });
          } else {
            groupedEvents.push(event);
          }
        });

        const multiDayEvents: Event[] = [];
        groupedEvents.forEach(event => {
          let currentDate = new Date(event.time_start);
          const endDate = new Date(event.time_end);

          if (currentDate.toDateString() !== endDate.toDateString()) {
            while (currentDate.getFullYear() <= endDate.getFullYear() && currentDate.getMonth() <= endDate.getMonth() && currentDate.getDate() <= endDate.getDate()) {
              const eventStart = (currentDate.toDateString() === new Date(event.time_start).toDateString())
                ? event.time_start
                : new Date(currentDate.setHours(0, 0, 0, 0));
              const eventEnd = (currentDate.toDateString() === endDate.toDateString())
                ? event.time_end
                : new Date(currentDate.setHours(23, 59, 59, 999));

              multiDayEvents.push({
                ...event,
                id_calendar: event.id_calendar,
                time_start: format(new Date(eventStart), 'yyyy-MM-dd HH:mm:ss'),
                time_end: format(new Date(eventEnd), 'yyyy-MM-dd HH:mm:ss'),
                name: event.title,
                height: 50,
              });
              currentDate.setDate(currentDate.getDate() + 1);
            }
          } else {
            multiDayEvents.push(event);
          }
        });

        setEventTL(multiDayEvents );
      }
    } catch (error) {
      console.log('Error fetching calendar data:', error);
    }
  }, [allEvent]);

  const loadItemsForMonth = async (data: any) => {
    const { year, month } = data[0];
    const selectedMonth = new Date(year, month);
    await handleGetCalendarForMonth(selectedMonth);
  };

  const onDayPress = async (day: any) => {
    const { dateString } = day;
    dispatch(setSelectedDate(dateString));
    await handleGetCalendarForDay(dateString);
    setShowTimeline(true);
  };

  const formatMarkedDates = (events: { [x: string]: AgendaEntry[] }) => {
    const markedDates: { [date: string]: { marked: boolean } } = {};
    Object.keys(events).forEach((date) => {
      markedDates[date] = { marked: true };
    });
    return markedDates;
  };

  const formatEvent = (events: Event[]) => {
    const allEvents = Object.values(events)
      .flat()
      .map((e: Event) => ({
        id_calendar: e.id_calendar,
        start: format(new Date(e.time_start), 'yyyy-MM-dd HH:mm:ss'),
        end: format(new Date(e.time_end), 'yyyy-MM-dd HH:mm:ss'),
        title: e.title,
        color: e.color,
      }));
  
    const eventsByDate = _.groupBy(allEvents, (e) =>
      CalendarUtils.getCalendarDateString(e.start)
    );
  
    return eventsByDate;
  };

  const pressList = () => {
    navigation.navigate('CalendarScreen', { id_family });
  };

  const pressCalendar = () => {
    setShowTimeline(false);
  };

  const handleTimelineScroll = async (date: any) => {
    const { year, month } = date;
    const selectedMonth = new Date(year, month);
    await handleGetCalendarForMonth(selectedMonth);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={pressCalendar} style={styles.buttonContainer}>
          <Icon name="calendar" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={pressList} style={styles.buttonContainer}>
          <Icon name="list" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <CalendarProvider
        date={date}
        onDateChanged={(date) => dispatch(setSelectedDate(date))}
        onMonthChange={(date) => handleTimelineScroll(date)}
        showTodayButton
        disabledOpacity={0.6}
      >
        <ExpandableCalendar
          firstDay={1}
          disableAllTouchEventsForDisabledDays
          hideKnob
          theme={{
            todayButtonTextColor: 'black',
            todayBackgroundColor: 'yellow',
            todayTextColor: 'black',
          }}
          markedDates={formatMarkedDates(events)}
          renderHeader={(date) => {
            const header = format(new Date(date), 'yyyy/MM');
            return <Text style={styles.header}>{header}</Text>;
          }}
        />
        {showTimeline && (
          <TimelineList
            events={formatEvent(eventTL)}
            timelineProps={{
              format24h: true,
              onEventPress: (event: Event) => 
                navigation.navigate('CalendarStack',{screen: 'EventDetailScreen', params: { id_event: event.id_calendar }}),
              renderEvent: (event: PackedEvent) => {
                const start = format(new Date(event.start), 'HH:mm');
                const end = format(new Date(event.end), 'HH:mm');
                return (
                  <View style={[styles.event]}>
                    <Text style={{color:'white'}}>{`${start} - ${end}`}</Text>
                    <Text style={{color:'white'}}>{event.title}</Text>
                  </View>
                );
              },
              initialTime: INITIAL_TIME,
            }}
          />
        )}
      </CalendarProvider>
    </SafeAreaView>
  );
};

export default EventListScreen;