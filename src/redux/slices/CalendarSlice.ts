import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {EventDetail} from 'src/interface/calendar/event';
import moment from 'moment';
import {rrulestr} from 'rrule';
import {addMonths, endOfMonth, format, startOfMonth, subMonths} from 'date-fns';
import {AgendaSchedule} from 'react-native-calendars';
import {TodoListItem} from 'src/interface/todo/todo';

interface CalendarState {
  events: EventDetail[];
  allEvents: AgendaSchedule;
  selectedEvent: EventDetail | null;
  selectedDate: string;
  option: string | null;
  isOnly: boolean;
  todoList: TodoListItem[];
}

const initialState: CalendarState = {
  events: [],
  allEvents: {},
  selectedEvent: null,
  selectedDate: moment(new Date()).format('YYYY-MM-DD'),
  option: null,
  isOnly: false,
  todoList: [],
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
    },

    setTodoList: (state, action: PayloadAction<TodoListItem[]>) => {
      state.todoList = action.payload;
    },

    doneTodoList: (state, action: PayloadAction<{id_item: number}>) => {
      state.todoList = state.todoList.map(item => {
        if (item.id_checklist === action.payload.id_item) {
          return {
            ...item,
            is_completed: !item.is_completed,
          };
        }
        return item;
      });
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
        id: newEvent.id_calendar, // Add unique identifier
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
                id: `${newEvent.id_calendar}-${recurrenceDateKey}`, // Unique identifier for recurring events
              });
            } else {
              console.error('Invalid date:', date);
            }
          });
        } catch (recurrenceError) {
          console.error(
            'Error parsing cleaned recurrence rule:',
            recurrenceError,
            cleanedRecurrenceRule,
          );
        }
      }
    },

    updateEvent(state, action: PayloadAction<EventDetail>) {
      const {id_calendar, time_start, title} = action.payload;
      const dateKey = format(time_start, 'yyyy-MM-dd');

      const index = state.events.findIndex(
        event => event.id_calendar === id_calendar,
      );
      if (index !== -1) {
        state.events[index] = action.payload;
      }

      state.selectedEvent = action.payload;

      if (state.allEvents[dateKey]) {
        const eventIndex = state.allEvents[dateKey].findIndex(
          event => event.id_calendar === id_calendar,
        );
        if (eventIndex !== -1) {
          state.allEvents[dateKey][eventIndex] = {
            ...action.payload,
            name: title, // Cập nhật tiêu đề của sự kiện
            height: 50, // Hoặc bất kỳ giá trị nào bạn muốn đặt cho chiều cao
            day: dateKey, // Ngày sự kiện
            id: id_calendar,
          };
        } else {
          // Nếu sự kiện không tồn tại trong danh sách sự kiện cho ngày đó, thêm mới vào
          state.allEvents[dateKey].push({
            ...action.payload,
            name: title,
            height: 50,
            day: dateKey,
            id: id_calendar,
          });
        }
      }
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
    deleteEventOnly(
      state,
      action: PayloadAction<{id_calendar: string; recurrence_rule: string}>,
    ) {
      const {id_calendar, recurrence_rule} = action.payload;

      if (state.selectedEvent) {
        state.events = state.events.map(event => {
          if (event.id_calendar === id_calendar) {
            return {
              ...event,
              recurrence_rule: recurrence_rule,
            };
          }
          return event;
        });

        state.selectedEvent = null;
      } else {
        console.error('No selected event to delete');
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
            id: event.id_calendar,
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
                adjustedStartTime.setHours(
                  new Date(event.time_start).getHours(),
                );
                adjustedStartTime.setMinutes(
                  new Date(event.time_start).getMinutes(),
                );

                const adjustedEndTime = new Date(date);
                adjustedEndTime.setHours(new Date(event.time_end).getHours());
                adjustedEndTime.setMinutes(
                  new Date(event.time_end).getMinutes(),
                );

                state.allEvents[recurrenceDateKey].push({
                  ...event,
                  time_start: adjustedStartTime,
                  time_end: adjustedEndTime,
                  name: event.title,
                  height: 50,
                  day: recurrenceDateKey,
                  id: `${event.id_calendar}-${recurrenceDateKey}`, // Unique identifier for recurring events
                });
              } else {
                console.error('Invalid date:', date);
              }
            });
          } catch (recurrenceError) {
            console.error(
              'Error parsing cleaned recurrence rule:',
              recurrenceError,
              cleanedRecurrenceRule,
            );
          }
        }
      });
    },
  },
});

export const {
  setEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  deleteEventOnly,
  setSelectedEvent,
  setSelectedEventById,
  setOption,
  setOnly,
  setSelectedDate,
  setTodoList,
  doneTodoList,
} = calendarSlice.actions;

export const selectEvents = (state: RootState) => state.calendar.events;
export const selectSelectedEvent = (state: RootState) =>
  state.calendar.selectedEvent;
export const selectSelectedDate = (state: RootState) =>
  state.calendar.selectedDate;
export const selectAllEvent = (state: RootState) => state.calendar.allEvents;
export const selectOption = (state: RootState) => state.calendar.option;
export const selectIsOnly = (state: RootState) => state.calendar.isOnly;
export const selectTodoList = (state: RootState) => state.calendar.todoList;

export default calendarSlice.reducer;
