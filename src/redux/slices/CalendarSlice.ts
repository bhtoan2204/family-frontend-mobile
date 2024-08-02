import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {EventDetail} from 'src/interface/calendar/event';
import moment from 'moment';
import {rrulestr} from 'rrule';
import {addMonths, endOfMonth, format, startOfMonth, subMonths} from 'date-fns';
import {AgendaSchedule} from 'react-native-calendars';
interface CalendarState {
  events: EventDetail[];
  allEvents: AgendaSchedule;
  selectedEvent: EventDetail | null;
  selectedDate: string;
  option: string | null;
  isOnly: boolean;
}

const initialState: CalendarState = {
  events: [],
  allEvents: {},
  selectedEvent: null,
  selectedDate: moment(new Date()).format('YYYY-MM-DD'),
  option: null,
  isOnly: false,
};

const cleanRecurrenceRule = (rule: string) => {
  return rule.replace(/\s+/g, '').replace(/;$/, '');
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setEvents(state, action: PayloadAction<EventDetail[]>) {
      state.events = action.payload;

      // const groupedEvents: AgendaSchedule = {};

      // action.payload.forEach(event => {
      //   const dateKey = format(event.time_start, 'yyyy-MM-dd');
      //   if (!groupedEvents[dateKey]) {
      //     groupedEvents[dateKey] = [];
      //   }
      //   groupedEvents[dateKey].push({
      //     ...event,
      //     name: event.title,
      //     height: 50,
      //     day: dateKey,
      //   });

      //   const start = startOfMonth(subMonths(new Date(state.selectedDate), 1));
      //   const end = endOfMonth(addMonths(new Date(state.selectedDate), 3));

      //   if (event.recurrence_rule) {
      //     const cleanedRecurrenceRule = cleanRecurrenceRule(
      //       event.recurrence_rule,
      //     );
      //     try {
      //       const rule = rrulestr(cleanedRecurrenceRule);
      //       const dates = rule.between(start, end);

      //       dates.forEach(date => {
      //         if (!isNaN(date.getTime())) {
      //           const recurrenceDateKey = format(date, 'yyyy-MM-dd');
      //           if (!groupedEvents[recurrenceDateKey]) {
      //             groupedEvents[recurrenceDateKey] = [];
      //           }
      //           groupedEvents[recurrenceDateKey].push({
      //             ...event,
      //             time_start:
      //               format(new Date(date), 'yyyy-MM-dd') +
      //               ' ' +
      //               format(new Date(event.time_start), 'HH:mm:ss'),
      //             time_end:
      //               format(
      //                 new Date(
      //                   date.getTime() +
      //                     (event.time_end.getTime() -
      //                       event.time_start.getTime()),
      //                 ),
      //                 'yyyy-MM-dd',
      //               ) +
      //               ' ' +
      //               format(new Date(event.time_end), 'HH:mm:ss'),
      //             name: event.title,
      //             height: 50,
      //             day: recurrenceDateKey,
      //           });
      //         } else {
      //           console.error('Invalid date:', date);
      //         }
      //       });
      //     } catch (recurrenceError) {
      //       // console.error(
      //       //   'Error parsing cleaned recurrence rule:',
      //       //   recurrenceError,
      //       //   cleanedRecurrenceRule,
      //       // );
      //     }
      //   }
      // });

      // state.allEvents = {groupedEvents};
    },

    addEvent(state, action: PayloadAction<EventDetail>) {
      const newEvent = action.payload;

      const timeStart = new Date(newEvent.time_start);
      const timeEnd = new Date(newEvent.time_end);

      if (isNaN(timeStart.getTime()) || isNaN(timeEnd.getTime())) {
        console.error(
          'Invalid time_start or time_end:',
          newEvent.time_start,
          newEvent.time_end,
        );
        return;
      }

      state.events.push(newEvent);
      const dateKey = format(timeStart, 'yyyy-MM-dd');
      if (!state.allEvents[dateKey]) {
        state.allEvents[dateKey] = [];
      }
      state.allEvents[dateKey].push({
        ...newEvent,
        name: newEvent.title,
        height: 50,
        day: dateKey,
      });

      if (newEvent.recurrence_rule) {
        const cleanedRecurrenceRule = cleanRecurrenceRule(
          newEvent.recurrence_rule,
        );
        const start = startOfMonth(subMonths(new Date(state.selectedDate), 1));
        const end = endOfMonth(addMonths(new Date(state.selectedDate), 1));

        try {
          const rule = rrulestr(cleanedRecurrenceRule);
          const dates = rule.between(start, end);

          dates.forEach(date => {
            if (!isNaN(date.getTime())) {
              const recurrenceDateKey = format(date, 'yyyy-MM-dd');
              if (!state.allEvents[recurrenceDateKey]) {
                state.allEvents[recurrenceDateKey] = [];
              }

              if (
                newEvent.recurrence_exception &&
                typeof newEvent.recurrence_exception === 'string'
              ) {
                const exceptionDates = newEvent.recurrence_exception
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

              const adjustedStartTime = new Date(date);
              adjustedStartTime.setHours(timeStart.getHours());
              adjustedStartTime.setMinutes(timeStart.getMinutes());

              const adjustedEndTime = new Date(date);
              adjustedEndTime.setHours(timeEnd.getHours());
              adjustedEndTime.setMinutes(timeEnd.getMinutes());

              state.allEvents[recurrenceDateKey].push({
                ...newEvent,
                time_start: adjustedStartTime,
                time_end: adjustedEndTime,
                name: newEvent.title,
                height: 50,
                day: recurrenceDateKey,
              });
            } else {
              console.error('Invalid date:', date);
            }
          });
        } catch (recurrenceError) {
          // console.error(
          //   'Error parsing cleaned recurrence rule:',
          //   recurrenceError,
          //   cleanedRecurrenceRule,
          // );
        }
      }
    },

    updateEvent(state, action: PayloadAction<EventDetail>) {
      const {id_calendar} = action.payload;
      console.log(action.payload);
      const index = state.events.findIndex(
        event => event.id_calendar === id_calendar,
      );
      if (index !== -1) {
        state.events[index] = action.payload;
      }

      // const dateKey = format(action.payload.time_start, 'yyyy-MM-dd');
      // const eventIndex = state.allEvents[dateKey]?.findIndex(
      //   event => event.id_calendar === id_calendar,
      // );
      state.selectedEvent = action.payload;

      // if (eventIndex !== -1) {
      //   state.allEvents[dateKey][eventIndex] = {
      //     ...action.payload,
      //     name: action.payload.title,
      //     height: 50,
      //     day: dateKey,
      //   };
      // }
    },

    deleteEvent(state, action: PayloadAction<number>) {
      const idToDelete = action.payload;

      state.events = state.events.filter(
        event => event.id_calendar !== idToDelete,
      );

      Object.keys(state.allEvents).forEach(date => {
        state.allEvents[date] = state.allEvents[date].filter(
          event => event.id_calendar !== idToDelete,
        );
      });
    },
    deleteEventOnly(state: CalendarState) {
      if (state.selectedEvent) {
        const {id_calendar, time_start} = state.selectedEvent;

        Object.keys(state.allEvents).forEach(date => {
          state.allEvents[date] = state.allEvents[date].filter(
            event =>
              !(
                event.id_calendar === id_calendar &&
                event.time_start === time_start
              ),
          );
        });

        state.events = state.events
          .map(event => {
            if (event.id_calendar === id_calendar) {
              const newRecurrenceException = event.recurrence_exception
                ? `${event.recurrence_exception},${new Date(time_start).toISOString()}`
                : new Date(time_start).toISOString();

              return {
                ...event,
                recurrence_exception: newRecurrenceException,
              };
            }
            return event;
          })
          .filter(
            event =>
              !(
                event.id_calendar === id_calendar &&
                event.time_start === time_start
              ),
          );

        state.selectedEvent = null;
      }
    },

    setSelectedEvent(state, action: PayloadAction<EventDetail>) {
      state.selectedEvent = action.payload;
    },
    setSelectedEventById(state, action: PayloadAction<number>) {
      const eventId = action.payload;
      const selectedEvent =
        state.events.find(event => event.id_calendar === eventId) || null;
      state.selectedEvent = selectedEvent;
    },
    setOption(state, action: PayloadAction<string>) {
      state.option = action.payload;
    },
    setOnly(state, action: PayloadAction<boolean>) {
      state.isOnly = action.payload;
    },

    setSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
      const start = startOfMonth(subMonths(new Date(action.payload), 1));
      const end = endOfMonth(addMonths(new Date(action.payload), 1));
      state.allEvents = {};

      state.events.forEach((event: EventDetail) => {
        if (!event.recurrence_rule) {
          const dateKey = format(new Date(event.time_start), 'yyyy-MM-dd');
          if (!state.allEvents[dateKey]) {
            state.allEvents[dateKey] = [];
          }
          state.allEvents[dateKey].push({
            ...event,
            name: event.title,
            height: 50,
            day: dateKey,
          });
        } else {
          const cleanedRecurrenceRule = cleanRecurrenceRule(
            event.recurrence_rule,
          );
          try {
            const rule = rrulestr(cleanedRecurrenceRule);
            const dates = rule.between(start, end);
            dates.forEach(date => {
              if (!isNaN(date.getTime())) {
                const recurrenceDateKey = format(date, 'yyyy-MM-dd');
                if (!state.allEvents[recurrenceDateKey]) {
                  state.allEvents[recurrenceDateKey] = [];
                }

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

                const adjustedStartTime = new Date(date);
                adjustedStartTime.setHours(event.time_start.getHours());
                adjustedStartTime.setMinutes(event.time_start.getMinutes());

                const adjustedEndTime = new Date(date);
                adjustedEndTime.setHours(event.time_end.getHours());
                adjustedEndTime.setMinutes(event.time_end.getMinutes());

                state.allEvents[recurrenceDateKey].push({
                  ...event,
                  time_start: adjustedStartTime,
                  time_end: adjustedEndTime,
                  name: event.title,
                  height: 50,
                  day: recurrenceDateKey,
                });
              } else {
                console.error('Invalid date:', date);
              }
            });
          } catch (recurrenceError) {
            // console.error(
            //   'Error parsing cleaned recurrence rule:',
            //   recurrenceError,
            //   cleanedRecurrenceRule,
            // );
          }
        }
      });
    },
  },
});
export const {
  setSelectedEventById,
  deleteEventOnly,
  setOption,
  setOnly,
  setEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  setSelectedEvent,
  setSelectedDate,
} = calendarSlice.actions;

export const selectEvents = (state: RootState) => state.calendar.events;
export const selectAllEvent = (state: RootState) => state.calendar.allEvents;

export const selectSelectedEvent = (state: RootState) =>
  state.calendar.selectedEvent;
export const selectSelectedDate = (state: RootState) =>
  state.calendar.selectedDate;
export const getOption = (state: RootState) => state.calendar.option;
export const getOnly = (state: RootState) => state.calendar.isOnly;

export default calendarSlice.reducer;
