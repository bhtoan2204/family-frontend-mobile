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
import { selectAllEvent, selectEvents, selectSelectedDate, setSelectedDate, setSelectedEventById } from 'src/redux/slices/CalendarSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PackedEvent } from 'react-native-calendars/src/timeline/EventBlock';
import { Ionicons } from '@expo/vector-icons';

const EVENT_COLOR = 'white';

const EventListScreen = ({ route, navigation }: EventListScreenProps) => {
  const { id_family } = route.params || {};
  const [loading, setLoading] = useState(true);
  const events = useSelector(selectAllEvent);
  const selectedDate = useSelector(selectSelectedDate);
  const [showTimeline, setShowTimeline] = useState(true);
  const INITIAL_TIME = { hour: 9, minutes: 0 };
  const [eventTL, setEventTL] = useState<Event[]>([]);
  let date = useSelector(selectSelectedDate);

  const dispatch = useDispatch();
  const allEvent = useSelector(selectEvents);



  useEffect(() => {
    setSelectedDate(format(new Date(date).toISOString(), 'yyyy-MM-dd'));
    //handleGetCalendarForMonth(new Date(selectedDate));
    handleGetCalendarForDay(new Date(selectedDate));

  }, [allEvent]);


  const cleanRecurrenceRule = (rule: string) => {
    return rule
      .replace(/\s+/g, '') 
      .replace(/;$/, '');  
  };

  // const handleGetCalendarForMonth = useCallback(
  //   async (date: Date) => {
  //     const start = startOfMonth(subMonths(date, 1));
  //     const end = endOfMonth(addMonths(date, 3));
  
  //     try {
  //       if (allEvent) {
  //         const groupedEvents: { [dateKey: string]: Event[] } = {};
  
  //         allEvent.forEach((event) => {
  //           const dateKey = format(event.time_start, 'yyyy-MM-dd');
  //           if (!groupedEvents[dateKey]) {
  //             groupedEvents[dateKey] = [];
  //           }
  
  //           // Check recurrence exceptions
  //           if (event.recurrence_exception && typeof event.recurrence_exception === 'string') {
  //             const exceptionDates = event.recurrence_exception.split(',').map(dateStr => new Date(dateStr.trim()));
  
  //             // Filter out events that fall on exception dates
  //             if (exceptionDates.some(exceptionDate => {
  //               return exceptionDate.getFullYear() === date.getFullYear() &&
  //                      exceptionDate.getMonth() === date.getMonth() &&
  //                      exceptionDate.getDate() === date.getDate();
  //             })) {
  //               return; // Skip this event for the current date
  //             }
  //           }
  
  //           groupedEvents[dateKey].push({
  //             ...event,
  //             name: event.title,
  //             height: 50,
  //             day: dateKey,
  //           });
  
  //           if (event.recurrence_rule) {
  //             const cleanedRecurrenceRule = cleanRecurrenceRule(event.recurrence_rule);
  //             try {
  //               const rule = rrulestr(cleanedRecurrenceRule);
  //               const dates = rule.between(start, end);
  
  //               dates.forEach((date) => {
  //                 if (!isNaN(date.getTime())) {
  //                   const recurrenceDateKey = format(date, 'yyyy-MM-dd');
  //                   if (!groupedEvents[recurrenceDateKey]) {
  //                     groupedEvents[recurrenceDateKey] = [];
  //                   }
  
  //                   // Check recurrence exceptions for each occurrence
  //                   if (event.recurrence_exception && typeof event.recurrence_exception === 'string') {
  //                     const exceptionDates = event.recurrence_exception.split(',').map(dateStr => new Date(dateStr.trim()));
  
  //                     // Skip occurrence if it falls on an exception date
  //                     if (exceptionDates.some(exceptionDate => {
  //                       return exceptionDate.getFullYear() === date.getFullYear() &&
  //                              exceptionDate.getMonth() === date.getMonth() &&
  //                              exceptionDate.getDate() === date.getDate();
  //                     })) {
  //                       return;
  //                     }
  //                   }
  
  //                   groupedEvents[recurrenceDateKey].push({
  //                     ...event,
  //                     time_start: date,
  //                     time_end: new Date(date.getTime() + (event.time_end.getTime() - event.time_start.getTime())),
  //                     name: event.title,
  //                     height: 50,
  //                     day: recurrenceDateKey,
  //                   });
  //                 } else {
  //                   console.error('Invalid date:', date);
  //                 }
  //               });
  //             } catch (recurrenceError) {
  //               console.error('Error parsing cleaned recurrence rule:', recurrenceError, cleanedRecurrenceRule);
  //             }
  //           }
  //         });
  
  //         // Update state or dispatch groupedEvents
  //       }
  //     } catch (error) {
  //       console.error('Error getting calendar for month:', error);
  //     }
  //   },
  //   [allEvent, selectedDate],
  // );
  
  const handleGetCalendarForDay = useCallback(
    async (date: string | number | Date) => {
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
                const formattedStartDate = format(new Date(date), 'yyyy-MM-dd');
                const formattedStartTime = event.is_all_day ? '00:00:00' : format(new Date(event.time_start), 'HH:mm:ss');
                const formattedEndTime = event.is_all_day ? '23:59:59' : format(new Date(event.time_end), 'HH:mm:ss');
                if (event.recurrence_exception && typeof event.recurrence_exception === 'string') {

                  const exceptionDates = event.recurrence_exception
                    .split(',')
                    .map(dateStr => new Date(dateStr.trim()));
  
                  if (exceptionDates.some(exceptionDate => {
                    return exceptionDate.getFullYear() === date.getFullYear() &&
                           exceptionDate.getMonth() === date.getMonth() &&
                           exceptionDate.getDate() === date.getDate();
                  })) {
                    return; 
                  }
                }

                groupedEvents.push({
                  ...event,
                  time_start: `${formattedStartDate} ${formattedStartTime}`,
                  time_end: `${formattedStartDate} ${formattedEndTime}`,
                  name: event.title,
                  height: 50,
                });
              });
            } else {
              const formattedStartDate = format(new Date(event.time_start), 'yyyy-MM-dd');
              const formattedStartTime = event.is_all_day ? '00:00:00' : format(new Date(event.time_start), 'HH:mm:ss');
              const formattedEndTime = event.is_all_day ? '23:59:59' : format(new Date(event.time_end), 'HH:mm:ss');
  
      

              groupedEvents.push({
                ...event,
                time_start: `${formattedStartDate} ${formattedStartTime}`,
                time_end: `${formattedStartDate} ${formattedEndTime}`,
                name: event.title,
                height: 50,
              });
            }
          });
  
          const multiDayEvents: Event[] = [];
          groupedEvents.forEach(event => {
            let currentDate = new Date(event.time_start);
            const endDate = new Date(event.time_end);
  
            if (currentDate.toDateString() !== endDate.toDateString()) {
              while (currentDate <= endDate) {
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
              multiDayEvents.push({
                ...event,
                time_start: format(new Date(event.time_start), 'yyyy-MM-dd HH:mm:ss'),
                time_end: format(new Date(event.time_end), 'yyyy-MM-dd HH:mm:ss'),
                name: event.title,
                height: 50,
              });
            }
          });
  
          setEventTL(multiDayEvents);
        }
      } catch (error) {
        console.log('Error fetching calendar data:', error);
      }
    },
    [allEvent],
  );
  
  
  
  
  const loadItemsForMonth = async (data: any) => {
    const { year, month } = data[0];
    const selectedMonth = new Date(year, month);
    dispatch(setSelectedDate(selectedMonth))

    //await handleGetCalendarForMonth(selectedMonth);
  };

  const onDayPress = async (day: any) => {
    const { year, month } = day;
    const selectedMonth = new Date(year, month);

    dispatch(setSelectedDate(day.dateString));
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
    setSelectedDate(date.toISOString());
    dispatch(setSelectedDate(date.toISOString()));
    await handleGetCalendarForDay(selectedMonth);

  };
  const handlePressEvent = (item: any) => {
    dispatch(setSelectedEventById(item.id_calendar));
    navigation.navigate('EventDetailsScreen', {
      id_family: id_family,
      id_calendar: item.id_calendar,
    });
  };

  
  
  return (
    <View style={styles.calendar}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerp}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Schedule</Text>
          </View>

          <View style={styles.headerp}>
           

            <TouchableOpacity style={[styles.icon , {marginRight: 15}]} onPress={() => pressCalendar()}>
              <Icon name="calendar" size={25} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.icon} onPress={() => pressList()}>
              <Ionicons name="list" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {showTimeline ? (
        <CalendarProvider
          date={selectedDate}
          onDateChanged={(date) => {
            setSelectedDate(date);
            dispatch(setSelectedDate(date));
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
            onEventPress: handlePressEvent,
            renderEvent: (event: PackedEvent) => {
              const start = format(new Date(event.start), 'HH:mm');
              const end = format(new Date(event.end), 'HH:mm');
              return (
                <View style={[styles.event]}>
                  <Text style={{color : 'white', fontWeight: '800'}}>{`${start} - ${end}`}</Text>
                  <Text style={{color : 'white'}}>{event.title}</Text>

                </View>
              );
            },
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