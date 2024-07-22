import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarServices from 'src/services/apiclient/CalendarService';
import { UpdateEventScreenProps } from 'src/navigation/NavigationTypes';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import ColorPicker from './ColorPicker';
import { useDispatch, useSelector } from 'react-redux';
import {  getOnly, selectSelectedEvent } from 'src/redux/slices/CalendarSlice';
import Custom from './Custom';
import { RRule, RRuleStrOptions } from 'rrule';
import { differenceInDays, differenceInWeeks, differenceInMonths, differenceInYears } from 'date-fns';
import { Event } from 'src/interface/calendar/Event';
import { CategoryEvent } from 'src/interface/calendar/CategoryEvent';

const UpdateEventScreen: React.FC<UpdateEventScreenProps> = ({ navigation, route }) => {
  const { id_family } = route.params || {};
  const [chosenDate, setChosenDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const event = useSelector(selectSelectedEvent);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [chosenDateStart, setChosenDateStart] = useState(new Date());
  const [chosenDateEnd, setChosenDateEnd] = useState(new Date());
  const [isPickerRepeatOpen, setIsPickerRepeatOpen] = useState(false);
  const [isPickerEndRepeatOpen, setIsPickerEndRepeatOpen] = useState(false);
  const [selectedOptionRepeat, setSelectedOptionRepeat] = useState('none');
  const [selectedOptionEndRepeat, setSelectedOptionEndRepeat] = useState('never');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string>('');
  const [selectedMonths, setSelectedMonths] = useState<string>('');
  const [selectedYears, setSelectedYears] = useState<string>('');
  const [number, setNumber] = useState<number>(1);
  const [isAllDay, setIsAllDay] = useState(false);
  const [repeatEndDate, setRepeatEndDate] = useState(new Date());
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(event?.category);
  const [color, setColor] = useState<number | null>(event?.color);

  const [count, setCount] = useState(1);
  const isOnly = useSelector(getOnly);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setLocation(event.location);
      setChosenDateStart(new Date(event.time_start));
      setChosenDateEnd(new Date(event.time_end));
      setIsAllDay(event.is_all_day);
    }
  }, [event]);

  const handleDecrease = () => {
    setCount(prevCount => Math.max(1, prevCount - 1));
  };

  const handleIncrease = () => {
    setCount(prevCount => prevCount + 1);
  };

  const optionRepeat = [
    { label: 'None', value: 'none' },
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' },
    { label: 'Custom', value: 'custom' },
  ];

  const optionEndRepeat = [
    { label: 'Never', value: 'never' },
    { label: 'Until', value: 'date' },
    { label: 'Count', value: 'count' },

  ];

  const handleDateChangeStart = (event: any, selectedDate: Date | undefined) => {
    if (selectedDate) {
      setChosenDateStart(selectedDate);
    }
  };
 

  const handleDateChangeEnd = (event: any, selectedDate: Date | undefined) => {
    if (selectedDate) {
      setChosenDateEnd(selectedDate);
    }
  };
  
  const handleEditOnlyEvent = async () => {

    const updatedRecurrenceException = event?.recurrence_exception 
    ? `${event.recurrence_exception},${new Date(event.time_start).toISOString()}`
    : new Date(event?.time_start).toISOString();


    const formatDateToString = (date: Date | string) => {
        return date instanceof Date ? date.toISOString() : date;
    };
    
    const eventDetails2 = {
        id_calendar: event?.id_calendar,
        title: event?.title,
        time_start: event?.time_start,
        time_end: event?.time_end,
        description: event?.description,
        color: event?.color,
        is_all_day: event?.is_all_day,
        category: selectedColorIndex,
        location: event?.location,
        recurrence_exception: formatDateToString(updatedRecurrenceException),
        recurrence_id: event?.recurrence_id,
        recurrence_rule: event?.recurrence_rule,
        start_timezone: event?.start_timezone,
        end_timezone: event?.end_timezone,
        id_family: id_family,
    };

    const eventDetails1 = {
        title: title,
        time_start: chosenDateStart,
        time_end: chosenDateEnd,
        description: description,
        color: color,
        is_all_day: isAllDay,
        category: event?.category,
        location: location,
        recurrence_exception: null,
        recurrence_id: event?.id_calendar,
        recurrence_rule: null,
        start_timezone: null,
        end_timezone: null,
        id_family: id_family,
    };
    console.log(eventDetails2)
    try {
        const message1 = await CalendarServices.CreateEvent(
            eventDetails1.title,
            eventDetails1.description,
            eventDetails1.time_start,
            eventDetails1.time_end,
            eventDetails1.color,
            eventDetails1.is_all_day,
            eventDetails1.category,
            eventDetails1.location,
            eventDetails1.recurrence_exception,
            eventDetails1.recurrence_id,
            eventDetails1.recurrence_rule,
            eventDetails1.start_timezone,
            eventDetails1.end_timezone,
            eventDetails1.id_family,
        );
     

        const message2 = await CalendarServices.UpdateEvent(
            eventDetails2?.id_calendar,
            eventDetails2.id_family,
            eventDetails2.title,
            eventDetails2.description,
            eventDetails2.time_start,
            eventDetails2.time_end,
            eventDetails2.color,
            eventDetails2.is_all_day,
            eventDetails2.category,
            eventDetails2.location,
            eventDetails2.recurrence_exception,
            eventDetails2.recurrence_id,
            eventDetails2.recurrence_rule,
            eventDetails2.start_timezone,
            eventDetails2.end_timezone,
        );

        Alert.alert('Inform', 'Successfully', [
            {
                text: 'OK',
                onPress: () => {
                    navigation.goBack();
                },
            },
        ]);
    } catch (error) {
        try {
            await CalendarServices.DeleteEvent(eventDetails2.id_calendar);
        } catch (rollbackError: any) {
            console.error('Rollback failed:', rollbackError.message);
        }

        Alert.alert('Error', 'An error occurred. The transaction has been rolled back.', [
            {
                text: 'OK',
            },
        ]);
    }
};
  const handleEditAllFutureEvents = async () => {
    const timeStart = chosenDateStart;
    const timeEnd = chosenDateEnd;
    const frequency = selectedOptionRepeat.toUpperCase();
    const interval = number === 0 ? 1 : number; 
  
    let count;
    let until;
  
    if (timeEnd) {
      switch (frequency) {
        case 'DAILY':
          count = Math.floor(differenceInDays(timeEnd, timeStart) / interval);
          break;
        case 'WEEKLY':
          count = Math.floor(differenceInWeeks(timeEnd, timeStart) / interval);
          break;
        case 'MONTHLY':
          count = Math.floor(differenceInMonths(timeEnd, timeStart) / interval);
          break;
        case 'YEARLY':
          count = Math.floor(differenceInYears(timeEnd, timeStart) / interval);
          break;
        default:
          count = 1;
      }
    }
  
    if (selectedOptionEndRepeat === 'date') {
      until = repeatEndDate;
    } else if (selectedOptionEndRepeat === 'count') {
      until = null;
    }
  
    let recurrenceRule = '';
  
    if (selectedOptionRepeat !== 'none') {
      const options: Partial<RRuleStrOptions> = {
        freq: RRule[frequency],
        interval: interval,
      };
  
      if (count && selectedOptionEndRepeat === 'count') {
        options.count = count;
      }
  
      if (selectedDays && selectedDays.length > 0) {
        const daysMapping: { [key: string]: any } = {
          'Monday': RRule.MO,
          'Tuesday': RRule.TU,
          'Wednesday': RRule.WE,
          'Thursday': RRule.TH,
          'Friday': RRule.FR,
          'Saturday': RRule.SA,
          'Sunday': RRule.SU,
        };
        options.byweekday = selectedDays.map(day => daysMapping[day]);
      }
      if (selectedMonths) {
        const parsedMonths = Array.isArray(selectedMonths) ? selectedMonths : selectedMonths.split(',').map(month => parseInt(month, 10));
        options.bymonth = parsedMonths.filter(month => !isNaN(month));
      }
      if (selectedYears) {
        const parsedYears = Array.isArray(selectedYears) ? selectedYears : selectedYears.split(',').map(year => parseInt(year, 10));
        options.byyearday = parsedYears.filter(year => !isNaN(year));
      }
  
      if (until) {
        options.until = until;
      }
  
      const rule = new RRule(options as RRuleStrOptions);
      recurrenceRule = rule.toString();
      recurrenceRule = recurrenceRule.replace(/^RRULE:/, '');
      recurrenceRule= recurrenceRule+';';
    }
    
    const eventDetails = {
      id_calendar: event?.id_calendar,
      id_family: id_family,
      title: title,
      time_start: chosenDateStart,
      time_end: chosenDateEnd,
      description: description,
      color: color,
      is_all_day: isAllDay,
      category: selectedColorIndex,
      location: location,
      recurrence_exception: null,
      recurrence_id: event?.recurrence_id,
      recurrence_rule: recurrenceRule,
      start_timezone: null,
      end_timezone: null
    };
    try {
      const message = await CalendarServices.UpdateEvent(
        eventDetails.id_calendar,
        eventDetails.id_family,
        eventDetails.title,
        eventDetails.description,
        eventDetails.time_start,
        eventDetails.time_end,
        eventDetails.color,
        eventDetails.is_all_day,
        eventDetails.category,
        eventDetails.location,
        eventDetails.recurrence_exception,
        eventDetails.recurrence_id,
        eventDetails.recurrence_rule,
        eventDetails.start_timezone,
        eventDetails.end_timezone,

      );
  
      Alert.alert('Inform', message, [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

   const handleSubmit = async () => {
    if (!isOnly) {
      await handleEditAllFutureEvents();
    } else {
      await handleEditOnlyEvent();
    }
  };

  

  const handleRepeatEndDateChange = (event: any, selectedDate: Date | undefined) => {
    if (selectedDate) {
      setRepeatEndDate(selectedDate);
    }
  };

  const handleCustomModalSubmit = (unit: string, number: number, selectedDays: string, selectedMonths: string, selectedYears: string) => {
    setIsModalVisible(false);
    setSelectedOptionRepeat(unit);
    console.log(unit)
    setNumber(number);
    switch (unit) {
      case 'weekly':
        setSelectedDays(selectedDays);
        setSelectedMonths('');
        setSelectedYears('');
        break;
      case 'monthly':
        setSelectedDays('');
        setSelectedMonths(selectedMonths);
        setSelectedYears('');
        break;
      case 'yearly':
        setSelectedDays('');
        setSelectedMonths('');
        setSelectedYears(selectedYears);
        break;
      default:
        setSelectedDays('');
        setSelectedMonths('');
        setSelectedYears('');
        break;
    }
  };

  useEffect(() => {
    if (selectedOptionRepeat === 'custom') {
      setIsModalVisible(true);
    }
  }, [selectedOptionRepeat]);

  return (
    <View style={styles.modalContainer}>
      <View style={{ backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 10 }}>
        <View style={styles.row}>
          <Text style={styles.headerTitle}>Edit Event</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="close" size={30} style={styles.backButton} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ color: 'gray', fontSize: 16 }}>Title</Text>
          <TextInput
            style={styles.input1}
            placeholder="Enter title"
            value={title}
            onChangeText={setTitle}
          />
        </View>
      </View>
      <View style={styles.containerEnter}>
        <View style={{ ...styles.column, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 10 }}>
          <View style={[styles.row, { alignItems: 'center' }]}>
            <Icon name="location" size={28} color="gray" />
          </View>
          <TextInput
            style={styles.input2}
            placeholder="Enter location"
            value={location}
            onChangeText={setLocation}
          />
        </View>
        <View style={{ ...styles.column, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 10 }}>
          <View style={[styles.row, { alignItems: 'center' }]}>
            <MaterialCommunityIcons
              name="playlist-edit"
              size={30}
              style={{ color: 'gray' }}
            />
          </View>
          <TextInput
            style={styles.input2}
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>
      <View style={styles.datetimeContainer}>
        <View style={styles.allDayConTainer}>
          <Text style={styles.text}>All day</Text>
          <View style={styles.switches}>
            <Switch
              value={isAllDay}
              onValueChange={setIsAllDay}
            />
          </View>
        </View>
        <View>
          <View style={[styles.row, { backgroundColor: '#ffffff', alignItems: 'center' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons
                name="clock-time-four-outline"
                size={30}
                style={{ color: 'gray' }}
              />
              <Text style={{ fontSize: 16, color: 'gray' }}>
                Start
              </Text>
            </View>
            <DateTimePicker
              value={chosenDateStart}
              mode={isAllDay ? 'date' : 'datetime'}
              display="default"
              onChange={handleDateChangeStart}
            />
          </View>
          <View style={[styles.row, { backgroundColor: '#ffffff', borderBottomColor: '#ccc', paddingVertical: 10, alignItems: 'center' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons
                name="clock-time-four-outline"
                size={30}
                style={{ color: 'gray' }}
              />
              <Text style={{ fontSize: 16, color: 'gray' }}>
                End
              </Text>
            </View>
            <DateTimePicker
              value={chosenDateEnd}
              mode={isAllDay ? 'date' : 'datetime'}
              display="default"
              onChange={handleDateChangeEnd}
            />
          </View>
        </View>
      </View>
      {isOnly===false && (
  <View style={[styles.row, { backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 5, alignItems: 'center', zIndex: isPickerRepeatOpen ? 1000 : 1 }]}>
    <MaterialCommunityIcons
      name="repeat"
      size={30}
      style={{ color: 'gray' }}
    />
    <Text style={{ fontSize: 16, color: 'gray' }}>Repeat</Text>
    <DropDownPicker
      open={isPickerRepeatOpen}
      setOpen={setIsPickerRepeatOpen}
      value={selectedOptionRepeat}
      items={optionRepeat}
      setValue={setSelectedOptionRepeat}
      placeholder="None"
      containerStyle={{ height: 40, width: 100 }}
      style={{ borderColor: 'white', borderWidth: 1 }}
      dropDownContainerStyle={{ borderColor: '#ccc', borderWidth: 1, zIndex: 1000, width: 100 }}
      zIndex={1000}
      zIndexInverse={1000}
    />
  </View>
)}


      {selectedOptionRepeat !== 'none' && (
        <View style={[styles.row, { backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 5, alignItems: 'center', zIndex: isPickerEndRepeatOpen ? 1000 : 1 }]}>
          <MaterialCommunityIcons
            name="calendar-end"
            size={30}
            style={{ color: 'gray' }}
          />
          <Text style={{ right: 30, fontSize: 16, color: 'gray' }}>
            End Repeat
          </Text>
          <DropDownPicker
            open={isPickerEndRepeatOpen}
            setOpen={setIsPickerEndRepeatOpen}
            value={selectedOptionEndRepeat}
            items={optionEndRepeat}
            setValue={setSelectedOptionEndRepeat}
            placeholder="Never"
            containerStyle={{ height: 40, width: 100 }}
            style={{ borderColor: 'white', borderWidth: 1 }}
            dropDownContainerStyle={{ borderColor: '#ccc', borderWidth: 1, zIndex: 1000, width: 100 }}
            zIndex={1000}
            zIndexInverse={1000}
          />
        </View>
      )}
      {selectedOptionEndRepeat === 'date' && (
        <View style={[styles.row, { backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 5, alignItems: 'center' }]}>
          <MaterialCommunityIcons
            name="calendar-end"
            size={30}
            style={styles.icon}
          />
          <Text style={{ right: 30, fontSize: 16, color: 'gray' }}>End Date</Text>
          <DateTimePicker
            value={repeatEndDate}
            mode="date"
            display="default"
            onChange={handleRepeatEndDateChange}
          />
        </View>
      )}
     {selectedOptionEndRepeat === 'count' && (
  <View style={[styles.row, { backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 5, alignItems: 'center' }]}>
    <MaterialCommunityIcons
      name="calendar-end"
      size={30}
      style={styles.icon}
    />
    <Text style={{ right: 30, fontSize: 16, color: 'gray' }}>End Count</Text>
    <TouchableOpacity onPress={handleDecrease}>
      <MaterialCommunityIcons
        name="minus-circle"
        size={30}
        style={[styles.icon, { marginRight: 5 }]}
      />
    </TouchableOpacity>
    <Text>{count}</Text>
    <TouchableOpacity onPress={handleIncrease}>
      <MaterialCommunityIcons
        name="plus-circle"
        size={30}
        style={[styles.icon, { marginLeft: 5 }]}
      />
    </TouchableOpacity>
  </View>
)}



      <ColorPicker navigation={navigation} selectedColorIndex={selectedColorIndex} 
      setSelectedColorIndex= {setSelectedColorIndex}
      setColor={setColor}
       />
      <View style={[styles.formAction, { paddingVertical: 10 }]}>
        <TouchableOpacity onPress={handleSubmit}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
           
      {selectedOptionRepeat === 'custom' && (
        <Custom
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSave={handleCustomModalSubmit}
        />
      )}
      
    </View>
  );
};

export default UpdateEventScreen;