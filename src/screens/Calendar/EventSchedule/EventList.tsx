import React, { useCallback, useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { EventListScreenProps } from 'src/navigation/NavigationTypes';
import CalendarServices from 'src/services/apiclient/CalendarService';
import { AgendaEntry, AgendaSchedule, CalendarList, CalendarProvider, ExpandableCalendar, Timeline, CalendarUtils, TimelineList } from 'react-native-calendars';
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
  const [eventTL, setEventTL]=  useState<Event[]>([]);
  let date = useSelector(getDate);
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedDate(date);

    handleGetCalendarForMonth(new Date());
    handleGetCalendarForDay(new Date());
    
  }, [id_family]);

  const handleGetCalendarForMonth = useCallback(async (date: string | number | Date) => {
    const start = startOfMonth(subMonths(new Date(date), 1));
    const end = endOfMonth(addMonths(new Date(date), 3));

    try {
      const response = await CalendarServices.getCalendar({ id_family });
      if (Array.isArray(response)) {


        const formattedEvents = response.map(item => ({
          ...item,
          title: item.title,
          start: new Date(item.time_start),
          end: new Date(item.time_end),
        }));
        const groupedEvents: AgendaSchedule = {};

        formattedEvents.forEach(event => {
          const dateKey = format(event.start, 'yyyy-MM-dd');
          if (!groupedEvents[dateKey]) {
            groupedEvents[dateKey] = [];
          }
          groupedEvents[dateKey].push({
            ...event,
            title: event.title,
            height: 50,
            day: dateKey,
          });

          if (event.recurrence_rule) {
            const rule = rrulestr(event.recurrence_rule);
            const dates = rule.between(start, end);
            dates.forEach(date => {
              const recurrenceDateKey = format(date, 'yyyy-MM-dd');
              if (!groupedEvents[recurrenceDateKey]) {
                groupedEvents[recurrenceDateKey] = [];
              }
              const endTime = event.end instanceof Date ? event.end.getTime() : 0;
              groupedEvents[recurrenceDateKey].push({
                ...event,
                start: date,
                end: new Date(date.getTime() + (endTime - event.start.getTime())),
                title: event.title,
                height: 50,
                day: recurrenceDateKey,
              });
            });
          }
        });



        setEvents(prevEvents => ({ ...prevEvents, ...groupedEvents }));
      } else {
        console.log('Unexpected response format', response);
      }
    } catch (error) {
      console.log('Error fetching calendar data:', error);
    }
  }, [id_family]);

  const handleGetCalendarForDay = useCallback(async (date: string | number | Date) => {
    const start = startOfMonth(subMonths(new Date(date), 1));
    const end = endOfMonth(addMonths(new Date(date), 3));
  
    try {
        const response = await CalendarServices.getCalendar({ id_family });
        if (Array.isArray(response)) {
            const formattedEvents = response.map(item => ({
                ...item,
                time_start: new Date(item.time_start),
                time_end: new Date(item.time_end),
            }));
            const groupedEvents: Event[] = [];
        
            formattedEvents.forEach(event => {
                if (event.recurrence_rule) {
                    const rule = rrulestr(event.recurrence_rule);
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
                let currentDate = new Date(event.time_start) ;
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

            setEventTL(preEventTL => ({ ...preEventTL, ...multiDayEvents }));
          } else {
            console.log('Unexpected response format', response);
        }
    } catch (error) {
        console.log('Error fetching calendar data:', error);
    }
}, [id_family]);




const loadItemsForMonth = async (data: any) => {
  const { year, month } = data[0];

  console.log(data)
  const selectedMonth = new Date(year,month );
  await handleGetCalendarForMonth(selectedMonth);
  await handleGetCalendarForDay(selectedMonth)
};


  const onDayPress = (day: any) => {
    dispatch(setDate(day.dateString));

    setSelectedDate(day.dateString);
    setShowTimeline(true);
  };

  const formatMarkedDates = (events: { [x: string]: AgendaEntry[]; }) => {
    const markedDates: { [date: string]: { marked: boolean } } = {};
    Object.keys(events).forEach((date) => {
      markedDates[date] = { marked: true };
    });
    return markedDates;
  };

  const formatEvent = (events: any ) => {
    const allEvents = Object.values(events).flat().map(entry => ({
      start: format(new Date(entry.time_start), 'yyyy-MM-dd HH:mm:ss'),
      end: format(new Date(entry.time_end), 'yyyy-MM-dd HH:mm:ss'),
      title: entry.title,
      color: entry.color ,
    }));
  
    const eventsByDate = _.groupBy(allEvents, (e) =>
      CalendarUtils.getCalendarDateString(e.end)
    );
    return eventsByDate;
  }
  const pressList = () => {
    navigation.navigate('CalendarScreen', { id_family});

  }
  const pressCalendar = () => {
    setShowTimeline(false);
  }
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
            <TouchableOpacity onPress={() => pressList()}>
                <Icon name="list" size={20} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => pressCalendar()}>
                <Icon name="calendar" size={20} color="black" />
            </TouchableOpacity>

          </View>
        </View>
        
      </View>

      {showTimeline ? (
        <CalendarProvider
          date={selectedDate}
          onDateChanged={setSelectedDate}
          showTodayButton
          todayBottomMargin={38}
          disabledOpacity={0.6}
        >
          <ExpandableCalendar
            firstDay={1}
            markedDates={formatMarkedDates(events)}
            onDayPress={ (days) => onDayPress(days)}

            hideArrows={true} 
            hideExtraDays={true} 

          />
          <TimelineList
            events={formatEvent(eventTL)}
            timelineProps={{
              format24h: true,
              start: 0,
              end: 24,
              overlapEventsSpacing: 8,
              rightEdgeSpacing: 24,
            }}
            scrollToNow
            initialTime={INITIAL_TIME}

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

