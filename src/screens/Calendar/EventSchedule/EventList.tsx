import React, {useCallback, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {EventListScreenProps} from 'src/navigation/NavigationTypes';
import CalendarServices from 'src/services/apiclient/CalendarService';
import {
  AgendaSchedule,
  CalendarList,
  CalendarProvider,
  ExpandableCalendar,
  TimelineList,
  CalendarUtils,
  AgendaEntry,
  LocaleConfig,
} from 'react-native-calendars';
import {format, startOfMonth, endOfMonth, addMonths, subMonths} from 'date-fns';
import {rrulestr} from 'rrule';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import {Event, EventDetail} from 'src/interface/calendar/Event';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectAllEvent,
  selectEvents,
  selectSelectedDate,
  setSelectedDate,
  setSelectedEvent,
  setSelectedEventById,
} from 'src/redux/slices/CalendarSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PackedEvent} from 'react-native-calendars/src/timeline/EventBlock';
import {Ionicons} from '@expo/vector-icons';
import {getTranslate, selectLocale} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import '../localeConfig';
const EVENT_COLOR = 'white';

const EventListScreen = ({route, navigation}: EventListScreenProps) => {
  const {id_family} = route.params || {};
  const [loading, setLoading] = useState(true);
  const events = useSelector(selectAllEvent);
  const selectedDate = useSelector(selectSelectedDate);
  const [showTimeline, setShowTimeline] = useState(true);
  const INITIAL_TIME = {hour: 9, minutes: 0};
  const [eventTL, setEventTL] = useState<EventDetail[]>([]);
  let date = useSelector(selectSelectedDate);
  const translate = useSelector(getTranslate);
  const dispatch = useDispatch();
  const allEvent = useSelector(selectEvents);
  const color = useThemeColors();
  const location = useSelector(selectLocale);

  useEffect(() => {
    setSelectedDate(format(new Date(date).toISOString(), 'yyyy-MM-dd'));
    //handleGetCalendarForMonth(new Date(selectedDate));
    handleGetCalendarForDay(new Date(selectedDate));
  }, [allEvent]);

  const cleanRecurrenceRule = (rule: string) => {
    return rule.replace(/\s+/g, '').replace(/;$/, '');
  };

  const handleGetCalendarForDay = useCallback(
    async (date: string | number | Date) => {
      const start = startOfMonth(subMonths(new Date(date), 1));
      const end = endOfMonth(addMonths(new Date(date), 3));

      try {
        if (allEvent) {
          const groupedEvents: EventDetail[] = [];

          allEvent.forEach(event => {
            if (event.recurrence_rule) {
              const cleanedRecurrenceRule = cleanRecurrenceRule(
                event.recurrence_rule,
              );
              const rule = rrulestr(cleanedRecurrenceRule);
              const dates = rule.between(start, end);
              dates.forEach(date => {
                const formattedStartDate = format(new Date(date), 'yyyy-MM-dd');
                const formattedStartTime = event.is_all_day
                  ? '00:00:00'
                  : format(new Date(event.time_start), 'HH:mm:ss');
                const formattedEndTime = event.is_all_day
                  ? '23:59:59'
                  : format(new Date(event.time_end), 'HH:mm:ss');
                if (
                  event.recurrence_exception &&
                  typeof event.recurrence_exception === 'string'
                ) {
                  const exceptionDates = event.recurrence_exception
                    .split(',')
                    .map(dateStr => new Date(dateStr.trim()));

                  if (
                    exceptionDates.some(exceptionDate => {
                      return (
                        exceptionDate.getFullYear() === date.getFullYear() &&
                        exceptionDate.getMonth() === date.getMonth() &&
                        exceptionDate.getDate() === date.getDate()
                      );
                    })
                  ) {
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
              const formattedStartDate = format(
                new Date(event.time_start),
                'yyyy-MM-dd',
              );
              const formattedStartTime = event.is_all_day
                ? '00:00:00'
                : format(new Date(event.time_start), 'HH:mm:ss');
              const formattedEndTime = event.is_all_day
                ? '23:59:59'
                : format(new Date(event.time_end), 'HH:mm:ss');

              groupedEvents.push({
                ...event,
                time_start: `${formattedStartDate} ${formattedStartTime}`,
                time_end: `${formattedStartDate} ${formattedEndTime}`,
                name: event.title,
                height: 50,
              });
            }
          });

          const multiDayEvents: EventDetail[] = [];
          groupedEvents.forEach(event => {
            let currentDate = new Date(event.time_start);
            const endDate = new Date(event.time_end);

            if (currentDate.toDateString() !== endDate.toDateString()) {
              while (currentDate <= endDate) {
                const eventStart =
                  currentDate.toDateString() ===
                  new Date(event.time_start).toDateString()
                    ? event.time_start
                    : new Date(currentDate.setHours(0, 0, 0, 0));
                const eventEnd =
                  currentDate.toDateString() === endDate.toDateString()
                    ? event.time_end
                    : new Date(currentDate.setHours(23, 59, 59, 999));

                multiDayEvents.push({
                  ...event,
                  time_start: format(
                    new Date(eventStart),
                    'yyyy-MM-dd HH:mm:ss',
                  ),
                  time_end: format(new Date(eventEnd), 'yyyy-MM-dd HH:mm:ss'),
                  name: event.title,
                  height: 50,
                });
                currentDate.setDate(currentDate.getDate() + 1);
              }
            } else {
              multiDayEvents.push({
                ...event,
                time_start: format(
                  new Date(event.time_start),
                  'yyyy-MM-dd HH:mm:ss',
                ),
                time_end: format(
                  new Date(event.time_end),
                  'yyyy-MM-dd HH:mm:ss',
                ),
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
    const {year, month} = data[0];
    const selectedMonth = new Date(year, month);
    dispatch(setSelectedDate(selectedMonth));

    //await handleGetCalendarForMonth(selectedMonth);
  };

  const onDayPress = async (day: any) => {
    const {year, month} = day;
    const selectedMonth = new Date(year, month);

    dispatch(setSelectedDate(day.dateString));
    setSelectedDate(day.dateString);
    await handleGetCalendarForDay(selectedMonth);

    setShowTimeline(true);
  };

  const formatMarkedDates = (
    events: EventDetail[],
  ): {[date: string]: {marked: boolean}} => {
    const markedDates: {[date: string]: {marked: boolean}} = {};

    events.forEach(event => {
      const startDate = format(new Date(event.time_start), 'yyyy-MM-dd');
      const endDate = format(new Date(event.time_end), 'yyyy-MM-dd');

      if (startDate === endDate) {
        markedDates[startDate] = {marked: true};
      } else {
        let currentDate = new Date(startDate);
        const endDateObj = new Date(endDate);

        while (currentDate <= endDateObj) {
          markedDates[format(currentDate, 'yyyy-MM-dd')] = {marked: true};
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    });

    return markedDates;
  };

  const formatEvent = (events: EventDetail[]) => {
    const allEvents = events.map((e: EventDetail) => {
      const start = new Date(e.time_start);
      const end = new Date(e.time_end);

      return {
        id_calendar: e.id_calendar,
        id_family: e.id_family,
        category: e.category,
        title: e.title,
        description: e.description,
        start: format(start, 'yyyy-MM-dd HH:mm:ss'),
        end: format(end, 'yyyy-MM-dd HH:mm:ss'),
        is_all_day: e.is_all_day,
        location: e.location,
        color: e.color,
        start_timezone: e.start_timezone,
        end_timezone: e.end_timezone,
        recurrence_id: e.recurrence_id,
        recurrence_exception: e.recurrence_exception,
        recurrence_rule: e.recurrence_rule,
        created_at: e.created_at,
        updated_at: e.updated_at,
        categoryEvent: e.categoryEvent,
      };
    });

    const eventsByDate = _.groupBy(allEvents, e => e.start.split(' ')[0]);

    return eventsByDate;
  };

  const pressList = () => {
    navigation.navigate('CalendarScreen', {id_family});
  };

  const pressCalendar = () => {
    setShowTimeline(false);
  };

  const handleTimelineScroll = async (date: any) => {
    const {year, month} = date;
    const selectedMonth = new Date(year, month);
    setSelectedDate(date.toISOString());
    dispatch(setSelectedDate(date.toISOString()));
    await handleGetCalendarForDay(selectedMonth);
  };
  const handlePressEvent = (item: EventDetail) => {
    const eventDetail: EventDetail = {
      id_calendar: item.id_calendar,
      id_family: item.id_family,
      category: item.category,
      title: item.title,
      description: item.description,
      time_start: new Date(item.start).toISOString(),
      time_end: new Date(item.end).toISOString(),
      is_all_day: item.is_all_day,
      location: item.location,
      color: item.color,
      start_timezone: item.start_timezone,
      end_timezone: item.end_timezone,
      recurrence_id: item.recurrence_id,
      recurrence_exception: item.recurrence_exception,
      recurrence_rule: item.recurrence_rule,
      categoryEvent: item.categoryEvent,
    };

    dispatch(setSelectedEvent(eventDetail));
    navigation.navigate('EventDetailsScreen', {
      id_family: id_family,
      id_calendar: eventDetail.id_calendar,
    });
  };

  return (
    <View style={[styles.calendar, {backgroundColor: color.background}]}>
      <View style={[styles.header, {backgroundColor: color.background}]}>
        <View style={styles.headerContent}>
          <View style={styles.headerp}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={30} color={color.text} />
            </TouchableOpacity>
            <Text style={[styles.headerText, {color: color.text}]}>
              {translate('Schedule')}
            </Text>
          </View>

          <View style={styles.headerp}>
            <TouchableOpacity
              style={[styles.icon, {marginRight: 15}]}
              onPress={() => pressCalendar()}>
              <Icon name="calendar" size={25} color={color.text} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.icon} onPress={() => pressList()}>
              <Ionicons name="list" size={30} color={color.text} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {showTimeline ? (
        <CalendarProvider
          date={selectedDate}
          onDateChanged={date => {
            setSelectedDate(date);
            dispatch(setSelectedDate(date));
          }}
          showTodayButton
          todayBottomMargin={38}
          disabledOpacity={0.6}
          theme={{
            backgroundColor: color.background,
            calendarBackground: color.white,
            monthTextColor: color.text,
            dayTextColor: color.text,
          }}>
          <ExpandableCalendar
            firstDay={1}
            markedDates={formatMarkedDates(eventTL)}
            onDayPress={onDayPress}
            theme={{
              backgroundColor: color.background,
              calendarBackground: color.white,
              monthTextColor: color.text,
              dayTextColor: color.text,
            }}
            dayNamesShort={LocaleConfig.locales['en'].dayNamesShort}
            monthNames={LocaleConfig.locales['en'].monthNames}
            initialPosition={ExpandableCalendar.positions.CLOSED}
            onCalendarToggled={isOpen => setShowTimeline(isOpen)}
            hideKnob={false}
            allowShadow={true}
            closeOnDayPress={true}
          />

          <TimelineList
            events={formatEvent(eventTL)}
            timelineProps={{
              format24h: true,
              start: 0,
              end: 24,
              theme: {
                backgroundColor: color.background,
                calendarBackground: color.background,
                monthTextColor: color.text,
                dayTextColor: color.text,
              },
              overlapEventsSpacing: 10,
              rightEdgeSpacing: 24,
              layout: 'stacked',
              onEventPress: handlePressEvent,
              renderEvent: (event: PackedEvent) => {
                const start = format(new Date(event.start), 'HH:mm');
                const end = format(new Date(event.end), 'HH:mm');
                return (
                  <View style={[styles.event]}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: '800',
                      }}>{`${start} - ${end}`}</Text>
                    <Text style={{color: 'white'}}>{event.title}</Text>
                  </View>
                );
              },
            }}
            scrollToNow
            initialTime={INITIAL_TIME}
            onChangeTime={(time: string | number | Date) =>
              handleTimelineScroll(new Date(time))
            }
            theme={{
              backgroundColor: color.background,
              calendarBackground: color.background,
              monthTextColor: color.text,
              dayTextColor: color.text,
            }}
          />
        </CalendarProvider>
      ) : (
        <CalendarList
          pastScrollRange={50}
          futureScrollRange={50}
          scrollEnabled={true}
          showScrollIndicator={true}
          onDayPress={onDayPress}
          markedDates={formatMarkedDates(eventTL)}
          onVisibleMonthsChange={months => loadItemsForMonth(months)}
          theme={{
            backgroundColor: color.background,
            calendarBackground: color.background,
            monthTextColor: color.text,
            dayTextColor: color.text,
          }}
          dayNamesShort={LocaleConfig.locales[location].dayNamesShort}
          monthNames={LocaleConfig.locales[location].monthNames}
        />
      )}
    </View>
  );
};

export default EventListScreen;
