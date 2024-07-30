import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {EventDetailsScreenProps} from 'src/navigation/NavigationTypes';
import {useSelector, useDispatch} from 'react-redux';
import {Feather} from '@expo/vector-icons';
import {COLORS} from 'src/constants';
import {
  deleteEventOnly,
  selectSelectedEvent,
  setOnly,
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

const EventDetailsScreen = ({route, navigation}: EventDetailsScreenProps) => {
  const {id_family} = route.params;
  const event = useSelector(selectSelectedEvent);
  const dispatch = useDispatch();
  const translate = useSelector(getTranslate);
  const color = useThemeColors();
  const language = useSelector(selectLocale);
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
                await dispatch(deleteEvent(event?.id_calendar));
                Toast.show(translate('Event has been deleted successfully.'), {
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
                await CalendarServices.UpdateEvent(
                  event.id_calendar,
                  id_family,
                  event.title,
                  event.description,
                  event.time_start,
                  event.time_end,
                  event.color,
                  event.is_all_day,
                  event.category,
                  event.location,
                  moment(event.time_start).toISOString() + ',',
                  event.recurrence_id,
                  event.recurrence_rule,
                  event.start_timezone,
                  event.end_timezone,
                );
                dispatch(
                  deleteEventOnly({
                    id_calendar: event.id_calendar,
                    time_start: event.time_start,
                  }),
                );
                Toast.show(translate('Event has been deleted successfully.'), {
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
    return rule.replace(/\s+/g, '').replace(/;$/, '');
  };

  const explainRecurrenceRule = (ruleString: string, language: 'en' | 'vi') => {
    const cleanedRecurrenceRule = cleanRecurrenceRule(ruleString);
    console.log('Cleaned Rule String:', cleanedRecurrenceRule);

    try {
      const rule = rrulestr(cleanedRecurrenceRule);

      if (!rule || !rule.options) {
        throw new Error('RRule or RRule options are undefined or not valid.');
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
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
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
          frequency: `Lặp lại ${freq.toLowerCase()} mỗi ${interval} ${interval > 1 ? 'lần' : 'lần'}.`,
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
              ? `Xảy ra vào các ngày trong tuần: ${byweekday.map(day => weekdaysMap[day] || 'Unknown').join(', ')}.`
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

      const explanationParts = [
        explanations[language].frequency,
        explanations[language].count,
        explanations[language].until,
        explanations[language].bymonth,
        explanations[language].bymonthday,
        explanations[language].byweekday,
        explanations[language].byyearday,
        explanations[language].bysetpos,
      ];

      const explanation = explanationParts.filter(part => part).join('\n');

      return (
        <Text style={[styles.recurrenceText, {color: color.textSubdued}]}>
          {explanation}
        </Text>
      );
    } catch (error) {
      console.error('Error explaining recurrence rule:', error);
      return (
        <View style={styles.recurrenceContainer}>
          <Text style={[styles.recurrenceText, {color: color.text}]}>
            {translate('Unknown')}
          </Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: color.background}]}>
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
        <Text style={[styles.title, {color: color.text}]}>{event.title}</Text>
        <Text style={[styles.description, {color: color.text}]}>
          {translate('Description')}: {event.description}
        </Text>
        <View style={styles.locationContainer}>
          <Text style={[styles.location, {color: color.text}]}>
            {translate('Location')}:
          </Text>
          <Text style={[styles.description, {fontSize: 16, color: color.text}]}>
            {' '}
            {event.location}
          </Text>
        </View>
        <View style={styles.locationContainer}>
          <Text style={[styles.location, {color: color.text}]}>
            {translate('Category')}:
          </Text>
          <Text style={{color: event.color, fontSize: 16}}>
            {' '}
            {event.categoryEvent.title}
          </Text>
        </View>
        {event.recurrence_rule
          ? explainRecurrenceRule(event.recurrence_rule, language)
          : null}
      </View>
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
