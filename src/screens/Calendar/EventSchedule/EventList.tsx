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
import { getDate, setDate } from 'src/redux/slices/CalendarSlice';

const EVENT_COLOR = 'white';

const EventListScreen = ({ route, navigation }: EventListScreenProps) => {
  const { id_family } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<AgendaSchedule>({});
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString());
  const [showTimeline, setShowTimeline] = useState(true);
  const INITIAL_TIME = { hour: 9, minutes: 0 };
  const [eventTL, setEventTL] = useState<Event[]>([]);
  let date = useSelector(getDate);
  const dispatch = useDispatch();
  const [allEvent, setAllEvent] = useState<Event[] | null>(null);

  useEffect(() => {
    fetchEvent();
  }, []);

  useEffect(() => {
    setSelectedDate(format(new Date(date).toISOString(), 'yyyy-MM-dd'));
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
    //await handleGetCalendarForDay(selectedMonth);
  };

  const onDayPress = async (day: any) => {
    const { year, month } = day;
    const selectedMonth = new Date(year, month);
    dispatch(setDate(day.dateString));
    setSelectedDate(day.dateString);
    await handleGetCalendarForDay(selectedMonth);

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
        start: format(new Date(e.time_start), 'yyyy-MM-dd HH:mm:ss'),
        end: format(new Date(e.time_end), 'yyyy-MM-dd HH:mm:ss'),
        title: e.title,
        color: e.color,
        textColor: "white", 
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
    setSelectedDate(date.toISOString());
    dispatch(setDate(date.toISOString()));
    await handleGetCalendarForDay(selectedMonth);

  };

  return (
    <View style={styles.calendar}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerp}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={20} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Schedule</Text>
          </View>

          <View style={styles.headerp}>
            <TouchableOpacity style={styles.icon} onPress={() => pressList()}>
              <Icon name="list" size={20} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.icon} onPress={() => pressCalendar()}>
              <Icon name="calendar" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {showTimeline ? (
        <CalendarProvider
          date={selectedDate}
          onDateChanged={(date) => {
            setSelectedDate(date);
            dispatch(setDate(date));
          }}
          showTodayButton
          todayBottomMargin={38}
          disabledOpacity={0.6}
        >
          <ExpandableCalendar
            firstDay={1}
            markedDates={formatMarkedDates(events)}
            onDayPress={(days) => onDayPress(days)}
            hideArrows={true}
            hideExtraDays={true}
        
          />
          <TimelineList
            events={formatEvent(eventTL)}
            timelineProps={{
              format24h: true,
              start: 0,
              end: 24,
              overlapEventsSpacing: 10,
              rightEdgeSpacing: 24,
              layout: "stacked",
            }}
            scrollToNow
            initialTime={INITIAL_TIME}
            onChangeTime={(time: string | number | Date) => handleTimelineScroll(new Date(time))}
          />
        </CalendarProvider>
      ) : (
        <CalendarList
          pastScrollRange={50}
          futureScrollRange={50}
          scrollEnabled={true}
          showScrollIndicator={true}
          onDayPress={onDayPress}
          markedDates={formatMarkedDates(events)}
          onVisibleMonthsChange={(months) => loadItemsForMonth(months)}
        />
      )}
    </View>
  );
};

export default EventListScreen;
