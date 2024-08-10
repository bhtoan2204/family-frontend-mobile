import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import {EventDetailsScreenProps} from 'src/navigation/NavigationTypes';
import {useSelector, useDispatch} from 'react-redux';
import {Feather} from '@expo/vector-icons';
import {COLORS} from 'src/constants';
import {
  deleteEventOnly,
  doneTodoList,
  selectTodoList,
  selectSelectedEvent,
  setOnly,
  setSelectedDate,
  setTodoList,
  updateEvent,
} from 'src/redux/slices/CalendarSlice';
import {deleteEvent} from 'src/redux/slices/CalendarSlice';
import moment from 'moment';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import CalendarServices from 'src/services/apiclient/CalendarService';
import {getTranslate, selectLocale} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {Toast} from 'react-native-toast-notifications';
import {RRule, rrulestr} from 'rrule';
import {format} from 'date-fns';
import {getExtraPackages} from 'src/redux/slices/FunctionSlice';
import {selectSelectedFamily} from 'src/redux/slices/FamilySlice';
import {TodoListItem} from 'src/interface/todo/todo';
import toast from 'react-native-toast-notifications/lib/typescript/toast';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import TodoListServices from 'src/services/apiclient/TodoListService';
import {updateDoneTodoList} from 'src/redux/slices/TodoListSlice';
import {TodoListCategoryItem} from 'src/screens/TodoListScreen/TodoListCategory/TodoListCategoryScreen';

const formatEventDate = (start: Date, end: Date) => {
  const formattedStart = format(start, 'yyyy/MM/dd');
  const formattedEnd = format(end, 'yyyy/MM/dd');
  return formattedStart === formattedEnd
    ? formattedStart + ` All day`
    : `${formattedStart} - ${formattedEnd} All day`;
};

const formatEventTime = (start: Date, end: Date) => {
  const formattedStart = format(start, 'HH:mm');
  const formattedEnd = format(end, 'HH:mm');
  return `${formattedStart} - ${formattedEnd}`;
};
const fakeEvent = {
  id_calendar: '1',
  id_family: '96',
  title: 'Birthday Party',
  description: "Celebrate John's birthday",
  location: "John's House",
  categoryEvent: {title: 'Party', color: '#ff6347'},
  color: '#ff6347',
  is_all_day: false,
  time_start: new Date('2024-08-10T18:00:00Z'),
  time_end: new Date('2024-08-10T21:00:00Z'),
  recurrence_rule: 'FREQ=WEEKLY;COUNT=10;BYDAY=MO,WE,FR',
  recurrence_exception: null,
  recurrence_id: null,
  start_timezone: 'UTC',
  end_timezone: 'UTC',
  checklist: ['Buy balloons', 'Order cake'],
  shoppingList: ['Party hats', 'Drinks'],
};
const EventDetailsScreen = ({route, navigation}: EventDetailsScreenProps) => {
  const {id_family} = route.params;
  const event = useSelector(selectSelectedEvent);
  //const event = fakeEvent;
  const dispatch = useDispatch();
  const translate = useSelector(getTranslate);
  const color = useThemeColors();
  const language = useSelector(selectLocale);
  const extraPackage = useSelector(getExtraPackages);
  const startDate = new Date(event.time_start);
  const family = useSelector(selectSelectedFamily);

  const endDate = new Date(event.time_end);
  const checkList = useSelector(selectTodoList);

  const isSameDay =
    format(startDate, 'yyyy-MM-dd') === format(endDate, 'yyyy-MM-dd');

  useEffect(() => {
    fetchChecklist();
  }, [event?.checklistType != null]);

  const fetchChecklist = async () => {
    try {
      const data = await CalendarServices.getAllChecklist(
        event?.id_checklist_type,
        event.id_family,
      );

      if (data) {
        dispatch(setTodoList(data));
      }
    } catch (error) {
      console.error('Error fetching checklist:', error);
    }
  };

  const onUpdate = () => {
    if (event?.recurrence_rule) {
      Alert.alert(
        translate('Choose Edit Option'),
        translate('Do you want to edit only this event or all future events?'),
        [
          {
            text: translate('Only this event'),
            onPress: async () => {
              await dispatch(setOnly(true));
              navigation.navigate('UpdateEvent', {id_family});
            },
          },
          {
            text: translate('All future events'),
            onPress: async () => {
              await dispatch(setOnly(false));
              navigation.navigate('UpdateEvent', {id_family});
            },
          },
          {
            text: translate('Cancel'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    } else {
      navigation.navigate('UpdateEvent', {id_family});
    }
  };

  const onDelete = () => {
    // console.log(event);
    if (!event?.recurrence_rule) {
      Alert.alert(
        translate('Confirm Delete'),
        translate('Are you sure you want to delete this event?'),
        [
          {
            text: translate('Cancel'),
            style: 'cancel',
          },
          {
            text: translate('Delete'),
            onPress: async () => {
              try {
                await CalendarServices.DeleteEvent(
                  event?.id_family,
                  event?.id_calendar,
                );
                await dispatch(deleteEvent(event.id_calendar));
                Toast.show(translate('Event has been deleted successfully'), {
                  type: 'success',
                });
                navigation.goBack();
              } catch (error) {
                console.error('Error deleting event:', error);
                Toast.show(
                  translate('An error occurred while deleting the event.'),
                  {
                    type: 'danger',
                  },
                );
              }
            },
          },
        ],
        {cancelable: true},
      );
    } else {
      Alert.alert(
        translate('Confirm Delete'),
        translate('What do you want to do with this event?'),
        [
          {
            text: translate('Cancel'),
            style: 'cancel',
          },
          {
            text: translate('Delete This Event Only'),
            onPress: async () => {
              try {
                console.log(event.time_start);
                const timeStartWithComma = event.recurrence_exception
                  ? `${event.recurrence_exception},${new Date(event.time_start).toISOString()}`
                  : new Date(event.time_start).toISOString();

                const data = await CalendarServices.UpdateEvent(
                  event.id_calendar,
                  id_family,
                  event.title,
                  event.description,
                  new Date(event.time_start),
                  new Date(event.time_end),
                  event.color,
                  event.is_all_day,
                  event.category,
                  event.location,
                  timeStartWithComma,
                  event.recurrence_id,
                  event.recurrence_rule,
                );
                if (data) {
                  await dispatch(
                    deleteEventOnly(data.id_calendar, data.recurrence_rule),
                  );
                  //await dispatch(setSelectedDate(data.time_start));
                  Toast.show(translate('Event has been deleted successfully'), {
                    type: 'success',
                  });
                  navigation.goBack();
                } else {
                  console.log('hi');
                }
              } catch (error) {
                console.error('Error deleting event:', error);
                Toast.show(
                  translate('An error occurred while deleting the event.'),
                  {
                    type: 'danger',
                  },
                );
              }
            },
          },
          {
            text: translate('Delete All Future Events'),
            onPress: async () => {
              try {
                await CalendarServices.DeleteEvent(
                  event.id_family,
                  event.id_calendar,
                );
                await dispatch(deleteEvent(event.id_calendar));
                Toast.show('Event has been deleted successfully.', {
                  type: 'success',
                });
                navigation.goBack();
              } catch (error) {
                console.error('Error deleting event:', error);
                Toast.show(
                  translate('An error occurred while deleting the event.'),
                  {
                    type: 'danger',
                  },
                );
              }
            },
          },
        ],
        {cancelable: true},
      );
    }
  };

  if (!event) {
    return null;
  }
  const cleanRecurrenceRule = (rule: string) => {
    if (rule !== null && rule != '') {
      return rule.replace(/\s+/g, '').replace(/;$/, '');
    }
  };

  const explainRecurrenceRule = (ruleString: string, language: 'en' | 'vi') => {
    const cleanedRecurrenceRule: string | undefined =
      cleanRecurrenceRule(ruleString);
    //console.log('Cleaned Rule String:', cleanedRecurrenceRule);

    try {
      console.log(ruleString);
      let rule: RRule | null = null;

      if (cleanedRecurrenceRule && cleanedRecurrenceRule.trim() !== '') {
        try {
          rule = rrulestr(cleanedRecurrenceRule);
        } catch (error) {
          //console.error('Error parsing recurrence rule:', error);
          // Handle parsing error
        }
      }

      if (!rule || !rule.options) {
        //throw new Error('RRule or RRule options are undefined or not valid.');
      }

      const options = rule.options;
      const freq = RRule.FREQUENCIES[options.freq] || 'Unknown';
      const interval = options.interval || 1;
      const count = options.count || '';
      const until = options.until
        ? options.until.toISOString().slice(0, 10)
        : '';
      const bymonth = options.bymonth || [];
      const bymonthday = options.bymonthday || [];
      const byweekday = options.byweekday || [];
      const byyearday = options.byyearday || [];
      const bysetpos = options.bysetpos || [];

      const weekdaysMap: {[key: number]: string} = {
        6: 'Sunday',
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wednesday',
        3: 'Thursday',
        4: 'Friday',
        5: 'Saturday',
      };

      const monthsMap: {[key: number]: string} = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December',
      };

      // Kiểm tra giá trị trong `byweekday`
      const weekdayStrings = byweekday.map(day => {
        const dayString = weekdaysMap[day] || 'Unknown';
        if (dayString === 'Unknown') {
          console.warn(`Day ${day} not found in weekdaysMap.`);
        }
        return dayString;
      });

      // Kiểm tra giá trị trong `bymonth`
      const monthStrings = bymonth.map(month => {
        const monthString = monthsMap[month] || 'Unknown';
        if (monthString === 'Unknown') {
          console.warn(`Month ${month} not found in monthsMap.`);
        }
        return monthString;
      });

      const explanations = {
        en: {
          frequency: `Repeats ${freq.toLowerCase()} every ${interval} ${interval === 1 ? 'time' : 'times'}.`,
          count: count ? `Total repeats: ${count}.` : '',
          until: until ? `Ends on ${until}.` : '',
          bymonth:
            bymonth.length > 0
              ? `Occurs in months: ${bymonth.join(', ')}.`
              : '',
          bymonthday:
            bymonthday.length > 0
              ? `Occurs on days of the month: ${bymonthday.join(', ')}.`
              : '',
          byweekday:
            byweekday.length > 0
              ? `Occurs on weekdays: ${byweekday.map(day => weekdaysMap[day] || 'Unknown').join(', ')}.`
              : '',
          byyearday:
            byyearday.length > 0
              ? `Occurs on days of the year: ${byyearday.join(', ')}.`
              : '',
          bysetpos:
            bysetpos.length > 0
              ? `Occurs at positions: ${bysetpos.join(', ')}.`
              : '',
        },
        vi: {
          frequency: `Lặp lại ${translate(freq.toLowerCase())} mỗi ${interval} ${interval > 1 ? 'lần' : 'lần'}.`,

          count: count ? `Tổng số lần lặp lại: ${count}.` : '',
          until: until ? `Kết thúc vào ngày ${until}.` : '',
          bymonth:
            bymonth.length > 0
              ? `Xảy ra trong các tháng: ${bymonth.join(', ')}.`
              : '',
          bymonthday:
            bymonthday.length > 0
              ? `Xảy ra vào các ngày trong tháng: ${bymonthday.join(', ')}.`
              : '',
          byweekday:
            byweekday.length > 0
              ? `Xảy ra vào các ngày trong tuần: ${byweekday.map(day => translate(weekdaysMap[day]) || translate('Unknown')).join(', ')}.`
              : '',
          byyearday:
            byyearday.length > 0
              ? `Xảy ra vào các ngày trong năm: ${byyearday.join(', ')}.`
              : '',
          bysetpos:
            bysetpos.length > 0
              ? `Xảy ra tại các vị trí: ${bysetpos.join(', ')}.`
              : '',
        },
      };

      return Object.values(explanations[language])
        .filter(line => line)
        .join(' ');
    } catch (error) {
      //console.error('Error parsing recurrence rule:', error);
      return language === 'vi'
        ? 'Có lỗi khi phân tích quy tắc lặp lại.'
        : 'Error parsing recurrence rule.';
    }
  };

  const recurrenceDescription = explainRecurrenceRule(
    event.recurrence_rule,
    language,
  );

  const formatEventTime = (
    startTime: Date | string,
    endTime: Date | string,
  ) => {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const isSameDay = startDate.toDateString() === endDate.toDateString();
    const isSameMonth =
      startDate.getFullYear() === endDate.getFullYear() &&
      startDate.getMonth() === endDate.getMonth();

    const timeFormat = (date: Date) =>
      `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;

    const dateFormat = (date: Date) => format(date, 'yyyy/MM/dd');

    if (isSameDay) {
      return `${timeFormat(startDate)} - ${timeFormat(endDate)}`;
    }

    if (isSameMonth) {
      return `${dateFormat(startDate)} ${timeFormat(startDate)} - ${dateFormat(endDate)} ${timeFormat(endDate)}`;
    }

    return `${dateFormat(startDate)} ${timeFormat(startDate)} - ${dateFormat(endDate)} ${timeFormat(endDate)}`;
  };

  const handleNavigateItemDetail = (id_item: number) => {
    navigation.navigate('TodoListStack', {
      screen: 'TodoListItemDetail',
      params: {
        id_family: event.id_family,
        id_category: event.id_checklist_type,
        id_item: id_item,
      },
    });
  };

  const handleUpdateComplete = async (item: TodoListItem) => {
    try {
      const response = await TodoListServices.updateItem({
        id_checklist: item.id_checklist,
        id_family: item.id_family,
        id_checklist_type: item.id_checklist_type,
        task_name: item.task_name,
        description: item.description,
        due_date: item.due_date,
        is_completed: !item.is_completed,
      });

      if (response) {
        dispatch(
          doneTodoList({
            id_item: item.id_checklist,
          }),
        );
        dispatch(
          updateDoneTodoList({
            id_checklist: item.id_checklist,
            id_checklist_type: item.id_checklist_type,
          }),
        );
        Toast.show(translate('Update successful'), {
          type: 'success',
        });
      }
    } catch (error) {
      //console.error('Error updating checklist:', error);
      Toast.show(translate('Update failed'), {
        type: 'danger',
      });
    }
  };

  const buildItems = React.useCallback(() => {
    return (
      <View className="mx-2 my-2 ">
        {checkList &&
          checkList.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <TodoListCategoryItem
                  item={item}
                  handleNavigateItemDetail={handleNavigateItemDetail}
                  handleUpdateComplete={handleUpdateComplete}
                />
              </React.Fragment>
            );
          })}
      </View>
    );
  }, [checkList]);

  const renderChecklists = () => (
    <View
      style={[
        styles.container,
        {
          backgroundColor: color.white,
          borderRadius: 10,
          shadowColor: color.text,
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.2,
          shadowRadius: 8,

          elevation: 5,
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../../assets/images/pen.png')}
            resizeMode="stretch"
            style={{width: 25, height: 25}}
          />
          <Text
            style={[
              styles.header,
              {
                color: color.text,
                fontSize: 16,
                fontWeight: 'bold',
                fontStyle: 'italic',
              },
            ]}>
            {translate('ReminderPoint')}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TodoListStack', {
              screen: 'TodoListCategory',
              params: {
                id_family: event.id_family,
                id_category: event.id_checklist_type,
              },
            })
          }
          style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              left: 15,
            }}>
            <Text
              style={{color: color.BlueLight, fontWeight: '800', fontSize: 13}}>
              {translate('View More')}
            </Text>
            <Feather name="chevron-right" size={20} color={color.BlueLight} />
          </View>
        </TouchableOpacity>
      </View>
      {checkList && checkList.length > 0 ? (
        buildItems()
      ) : (
        <TouchableOpacity
          style={[styles.addButton, {backgroundColor: color.white}]}
          onPress={() =>
            navigation.navigate('TodoListStack', {
              screen: 'TodoListCategory',
              params: {
                id_family: event.id_family,
                id_category: event.id_checklist_type,
              },
            })
          }>
          <Text style={styles.addButtonText}>
            {translate('New Check List')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: color.background}]}>
      <ScrollView>
        <View style={[styles.header, {backgroundColor: color.background}]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={20} color={color.text} />
          </TouchableOpacity>
          <Text style={[styles.headerText, {color: color.text}]}>
            {translate('Event Detail')}
          </Text>
          <TouchableOpacity
            onPress={onUpdate}
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
            <Feather name="edit" size={20} color="white" />
            <Text style={{marginLeft: 10, fontWeight: '700', color: 'white'}}>
              {translate('Edit')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.card, {backgroundColor: color.white}]}>
          {event.title && (
            <Text style={[styles.title, {color: color.text}]}>
              {event.title}
            </Text>
          )}
          <Text style={[styles.description, {color: color.text}]}>
            {translate('Description')}: {event.description}
          </Text>
          <View style={styles.locationContainer}>
            <Text style={[styles.location, {color: color.text}]}>
              {translate('Location')}:
            </Text>
            <Text
              style={[styles.description, {fontSize: 16, color: color.text}]}>
              {' '}
              {event.location}
            </Text>
          </View>
          <View style={styles.locationContainer}>
            <Text style={[styles.location, {color: color.text}]}>
              {translate('Category')}:
            </Text>
            {event.categoryEvent && event.categoryEvent.title && (
              <Text style={{color: event.color, fontSize: 16}}>
                {' '}
                {event.categoryEvent.title}
              </Text>
            )}
          </View>
          {/* <View style={styles.locationContainer}>
          <Text style={[styles.location, {color: color.text}]}>
            {translate('Category')}:
          </Text>
          <Text style={{color: event.color, fontSize: 16}}>
            {' '}
            {event.time_start.toString()} {event.time_end.toString()}
          </Text>
        </View>
        {event.recurrence_rule
          ? explainRecurrenceRule(event.recurrence_rule, language)
          : null}
      </View> */}
          <View style={styles.locationContainer}>
            <Text style={[styles.location, {color: color.text}]}>
              {translate('Time')}:{' '}
            </Text>
            <Text style={styles.dateTime}>
              {event.is_all_day
                ? formatEventDate(startDate, endDate)
                : `${formatEventTime(startDate, endDate)}`}
            </Text>
          </View>

          {event && event.recurrence_rule !== null && (
            <Text style={[styles.detail, {color: color.text}]}>
              {recurrenceDescription}
            </Text>
          )}
        </View>
        {!event.checklistType ? (
          <View
            style={[
              styles.button,
              {
                backgroundColor: color.white,
                alignItems: 'center',
                borderRadius: 10,
                shadowColor: color.text,
                shadowOffset: {width: 0, height: 4},
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 5,
                flexDirection: 'column',
              },
            ]}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Image
                  source={require('../../../assets/images/pen.png')}
                  resizeMode="stretch"
                  style={{width: 25, height: 25}}
                />
                <Text
                  style={[
                    styles.header,
                    {
                      color: color.text,
                      fontSize: 16,
                      fontWeight: 'bold',
                      fontStyle: 'italic',
                    },
                  ]}>
                  {translate('ReminderPoint')}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TodoListStack', {
                    screen: 'TodoList',
                    params: {
                      id_family: event.id_family,
                      openSheet: true,
                      id_calendar: event.id_calendar,
                    },
                  })
                }>
                <Feather
                  name="plus"
                  size={28}
                  color={color.text}
                  style={{marginLeft: 'auto'}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'center',
                width: '80%',
                gap: 10,
                marginVertical: 20,
              }}>
              <Image
                source={require('../../../assets/images/free.png')}
                resizeMode="stretch"
                style={{width: 95, height: 160, right: 10}}
              />
              <Text
                style={{
                  color: color.text,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {translate('FreeAsBird')}
              </Text>
              <Text
                style={{
                  color: color.text,
                  fontSize: 13,
                  fontStyle: 'italic',
                  textAlign: 'center',
                }}>
                {translate('FreeAsBirdDetail')}
              </Text>
            </View>
          </View>
        ) : (
          renderChecklists()
        )}
      </ScrollView>
      <View
        style={[
          styles.containerBtnDelete,
          {backgroundColor: color.background},
        ]}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: color.background}]}
          onPress={onDelete}>
          <Text style={styles.textDelete}>{translate('Delete event')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EventDetailsScreen;
