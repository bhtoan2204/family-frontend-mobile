import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarServices from 'src/services/apiclient/CalendarService';
import {CreateEventScreenProps} from 'src/navigation/NavigationTypes';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {AntDesign, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import ColorPicker from './ColorPicker';
import {useDispatch, useSelector} from 'react-redux';
import Custom from './Custom';
import {RRule, RRuleStrOptions} from 'rrule';
import {
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';
import {selectSelectedFamily} from 'src/redux/slices/FamilySlice';
import {CategoryEvent} from 'src/interface/calendar/CategoryEvent';
import {TEXTS} from 'src/constants';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {Toast} from 'react-native-toast-notifications';
import {addEvent} from 'src/redux/slices/CalendarSlice';

const CreateEventScreen: React.FC<CreateEventScreenProps> = ({
  navigation,
  route,
}) => {
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string | null>(null);
  const [chosenDateStart, setChosenDateStart] = useState(new Date());
  const [chosenDateEnd, setChosenDateEnd] = useState(new Date());
  const [isPickerRepeatOpen, setIsPickerRepeatOpen] = useState(false);
  const [isPickerEndRepeatOpen, setIsPickerEndRepeatOpen] = useState(false);
  const [selectedOptionRepeat, setSelectedOptionRepeat] = useState('none');
  const [selectedOptionEndRepeat, setSelectedOptionEndRepeat] =
    useState('never');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string | null>(null);
  const [selectedMonths, setSelectedMonths] = useState<string | null>(null);
  const [selectedYears, setSelectedYears] = useState<string | null>(null);
  const [number, setNumber] = useState<number>(1);
  const [isAllDay, setIsAllDay] = useState(false);
  const [repeatEndDate, setRepeatEndDate] = useState(new Date());
  const family = useSelector(selectSelectedFamily);
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  const translate = useSelector(getTranslate);
  const color = useThemeColors();
  const [selectedColor, setSelectedColor] = useState<string>('#2A475E');
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(
    null,
  );
  const [eventCategory, setEventCategory] = useState(null);
  const [availableColors, setAvailableColors] = useState([]);
  const handleDecrease = () => {
    setCount(prevCount => Math.max(1, prevCount - 1));
  };

  const handleIncrease = () => {
    setCount(prevCount => prevCount + 1);
  };

  const optionRepeat = [
    {label: 'None', value: 'none'},
    {label: 'Daily', value: 'daily'},
    {label: 'Weekly', value: 'weekly'},
    {label: 'Monthly', value: 'monthly'},
    {label: 'Yearly', value: 'yearly'},
    {label: 'Custom', value: 'custom'},
  ];

  const optionEndRepeat = [
    {label: 'Never', value: 'never'},
    {label: 'Until', value: 'date'},
    {label: 'Count', value: 'count'},
  ];

  const handleDateChangeStart = (
    event: any,
    selectedDate: Date | undefined,
  ) => {
    if (selectedDate) {
      setChosenDateStart(selectedDate);
    }
  };

  const handleDateChangeEnd = (event: any, selectedDate: Date | undefined) => {
    if (selectedDate) {
      setChosenDateEnd(selectedDate);
    }
  };

  const handleSubmit = async () => {
    const timeStart = chosenDateStart;
    const timeEnd = chosenDateEnd;
    const frequency = selectedOptionRepeat.toUpperCase();
    const interval = number === 0 ? 1 : number;

    let until;

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
        const daysMapping: {[key: string]: any} = {
          Monday: RRule.MO,
          Tuesday: RRule.TU,
          Wednesday: RRule.WE,
          Thursday: RRule.TH,
          Friday: RRule.FR,
          Saturday: RRule.SA,
          Sunday: RRule.SU,
        };
        options.byweekday = selectedDays.map(day => daysMapping[day]);
      }
      if (selectedMonths) {
        const parsedMonths = Array.isArray(selectedMonths)
          ? selectedMonths
          : selectedMonths.split(',').map(month => parseInt(month, 10));
        options.bymonthday = parsedMonths.filter(day => day >= 1 && day <= 31);
      }
      if (selectedYears) {
        const monthMapping: {[key: string]: number} = {
          Jan: 1,
          Feb: 2,
          Mar: 3,
          Apr: 4,
          May: 5,
          Jun: 6,
          Jul: 7,
          Aug: 8,
          Sep: 9,
          Oct: 10,
          Nov: 11,
          Dec: 12,
        };
        console.log(selectedYears);

        const parsedMonths = Array.isArray(selectedYears)
          ? selectedYears.map(month => monthMapping[month.trim()])
          : selectedYears.split(',').map(month => monthMapping[month.trim()]);
        console.log(parsedMonths);
        options.bymonth = parsedMonths.filter(
          month => month >= 1 && month <= 12,
        );
      }

      if (until) {
        options.until = until;
      }

      const rule = new RRule(options as RRuleStrOptions);
      recurrenceRule = rule.toString();
      recurrenceRule = recurrenceRule.replace(/^RRULE:/, '') + ';';
      console.log(recurrenceRule);
    }

    const eventDetails = {
      id_family: family?.id_family,
      title: title,
      time_start: chosenDateStart,
      time_end: chosenDateEnd,
      description: description,
      color: eventCategory?.color,
      is_all_day: isAllDay,
      category: eventCategory?.id_category_event,
      location: location,
      recurrence_exception: null,
      recurrence_id: null,
      recurrence_rule: recurrenceRule,
      start_timezone: null,
      end_timezone: null,
    };

    try {
      const message = await CalendarServices.CreateEvent(
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
        eventDetails.id_family,
      );
      if (message) {
        dispatch(addEvent(message));
        Toast.show(translate('Event created successfully'), {
          type: 'success',
        });
      }
    } catch (error) {
      Toast.show(translate('An error occurred while creating the event.'), {
        type: 'danger',
      });
    }
  };

  const handleRepeatEndDateChange = (
    event: any,
    selectedDate: Date | undefined,
  ) => {
    if (selectedDate) {
      setRepeatEndDate(selectedDate);
    }
  };

  const handleCustomModalSubmit = (
    unit: string,
    number: number,
    selectedDays: string,
    selectedMonths: string,
    selectedYears: string,
  ) => {
    setIsModalVisible(false);
    setSelectedOptionRepeat(unit);
    console.log(selectedYears);
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
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 60}>
      <View
        style={[styles.modalContainer, {backgroundColor: color.background}]}>
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <View style={{backgroundColor: selectedColor, padding: 20}}>
            <View
              style={{
                backgroundColor: 'transparent',
                borderBottomWidth: 1,
                borderBottomColor: '#fff',
                paddingVertical: 10,
                marginTop: 20,
              }}>
              <View style={[styles.row, {marginBottom: 20}]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon name="chevron-back" size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, {color: '#fff'}]}>
                  {translate('add_new_event')}
                </Text>
              </View>

              <View>
                <TextInput
                  style={[
                    styles.input1,
                    {backgroundColor: 'transparent', color: '#fff'},
                  ]}
                  placeholder={translate('enter_title')}
                  value={title}
                  onChangeText={setTitle}
                  placeholderTextColor="#fff"
                />
              </View>
            </View>
            <View style={styles.containerEnter}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View
                  style={{
                    ...styles.column,
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#fff',
                    paddingVertical: 10,
                    width: '48%',
                  }}>
                  <View style={[styles.row, {alignItems: 'center', flex: 1}]}>
                    <Icon
                      name="location"
                      size={28}
                      color="#fff"
                      style={{marginRight: 5}}
                    />
                    <TextInput
                      style={[
                        styles.input2,
                        {
                          backgroundColor: 'transparent',
                          color: '#fff',
                          flex: 1,
                          paddingLeft: 0,
                        },
                      ]}
                      placeholder={translate('enter_location')}
                      value={location}
                      onChangeText={setLocation}
                      placeholderTextColor="#fff"
                    />
                  </View>
                </View>
                <View
                  style={{
                    ...styles.column1,
                    backgroundColor: 'transparent',
                    borderBottomWidth: 1,
                    borderBottomColor: '#fff',
                    paddingVertical: 10,
                    width: '48%', // Set fixed width
                  }}>
                  <View style={[styles.row1, {alignItems: 'center', flex: 1}]}>
                    <MaterialCommunityIcons
                      name="playlist-edit"
                      size={30}
                      style={{color: '#fff', marginRight: 5}} // Adjust margin to move icon closer to TextInput
                    />
                    <TextInput
                      style={[
                        styles.input2,
                        {
                          backgroundColor: 'transparent',
                          color: '#fff',
                          flex: 1, // Ensure flex is set to take available space
                          paddingLeft: 0, // Remove padding to align placeholder closer to icon
                        },
                      ]}
                      placeholder={translate('Enter Description')}
                      value={description}
                      onChangeText={setDescription}
                      placeholderTextColor="#fff" // Ensure placeholder color is set
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.datetimeContainer}>
              <View style={styles.allDayConTainer}>
                <Text style={[styles.text, {color: '#fff'}]}>
                  {translate('all_day')}
                </Text>
                <View style={styles.switches}>
                  <Switch value={isAllDay} onValueChange={setIsAllDay} />
                </View>
              </View>
              <View>
                <View
                  style={[
                    styles.row,
                    {backgroundColor: 'transparent', alignItems: 'center'},
                  ]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons
                      name="clock-time-four-outline"
                      size={30}
                      style={{color: '#fff', marginRight: 10}}
                    />
                    <Text style={{fontSize: 16, color: '#fff'}}>
                      {translate('start')}
                    </Text>
                  </View>
                  <DateTimePicker
                    value={chosenDateStart}
                    mode={isAllDay ? 'date' : 'datetime'}
                    display="default"
                    onChange={handleDateChangeStart}
                    textColor="white"
                  />
                </View>
                <View
                  style={[
                    styles.row,
                    {
                      backgroundColor: 'transparent',
                      borderBottomColor: '#fff',
                      paddingVertical: 10,
                      alignItems: 'center',
                    },
                  ]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons
                      name="clock-time-four-outline"
                      size={30}
                      style={{color: '#fff', marginRight: 10}}
                    />
                    <Text style={{fontSize: 16, color: '#fff'}}>
                      {translate('end')}
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
          </View>
          <View
            style={[
              styles.row,
              {
                backgroundColor: color.background,
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
                paddingVertical: 5,
                alignItems: 'center',
                zIndex: isPickerRepeatOpen ? 1000 : 1,
                padding: 20,
              },
            ]}>
            <MaterialCommunityIcons
              name="repeat"
              size={30}
              style={{color: color.text}}
            />
            <Text style={{right: 30, fontSize: 16, color: color.text}}>
              {translate('repeat')}
            </Text>
            <DropDownPicker
              open={isPickerRepeatOpen}
              setOpen={setIsPickerRepeatOpen}
              value={selectedOptionRepeat}
              items={optionRepeat.map(item => ({
                ...item,
                labelStyle: {color: color.text},
                label: translate(item.label),
              }))}
              setValue={setSelectedOptionRepeat}
              placeholder={translate('None')}
              placeholderStyle={{color: color.text}}
              containerStyle={{
                height: TEXTS.SCEEN_HEIGHT * 0.05,
                width: TEXTS.SCREEN_WIDTH * 0.35,
                borderBottomWidth: 1,
                borderColor: color.textSubdued,
              }}
              style={{
                borderColor: color.background,
                borderWidth: 1,
                width: TEXTS.SCREEN_WIDTH * 0.35,
                backgroundColor: color.background,
              }}
              dropDownContainerStyle={{
                width: TEXTS.SCREEN_WIDTH * 0.35,
                borderColor: color.background,
                borderWidth: 1,
                backgroundColor: color.background,
                zIndex: 1000,
              }}
              ArrowUpIconComponent={({style}) => (
                <Ionicons name="chevron-up" size={24} color={color.text} />
              )}
              ArrowDownIconComponent={({style}) => (
                <Ionicons name="chevron-down" size={24} color={color.text} />
              )}
              TickIconComponent={({style}) => (
                <AntDesign name="check" size={24} color={color.text} />
              )}
              textStyle={{color: color.text}}
              zIndex={1000}
              zIndexInverse={1000}
              listMode="SCROLLVIEW"
            />
          </View>
          {selectedOptionRepeat !== 'none' && (
            <View
              style={[
                styles.row,
                {
                  backgroundColor: color.background,
                  borderBottomWidth: 1,
                  borderBottomColor: '#ccc',
                  paddingVertical: 5,
                  alignItems: 'center',
                  zIndex: isPickerEndRepeatOpen ? 1000 : 1,
                  padding: 20,
                },
              ]}>
              <MaterialCommunityIcons
                name="calendar-end"
                size={30}
                style={{color: color.text}}
              />
              <Text style={{right: 30, fontSize: 16, color: color.text}}>
                {translate('end_repeat')}
              </Text>
              <DropDownPicker
                open={isPickerEndRepeatOpen}
                setOpen={setIsPickerEndRepeatOpen}
                value={selectedOptionEndRepeat}
                items={optionEndRepeat.map(item => ({
                  ...item,
                  labelStyle: {color: color.text},
                  label: translate(item.label),
                }))}
                setValue={setSelectedOptionEndRepeat}
                placeholder={translate('Never')}
                placeholderStyle={{color: color.text}}
                containerStyle={{
                  height: TEXTS.SCEEN_HEIGHT * 0.05,
                  width: TEXTS.SCREEN_WIDTH * 0.35,
                  borderBottomWidth: 1,
                  borderColor: color.background,
                }}
                style={{
                  borderColor: color.background,
                  borderWidth: 1,
                  width: TEXTS.SCREEN_WIDTH * 0.35,
                  backgroundColor: color.background,
                }}
                dropDownContainerStyle={{
                  width: TEXTS.SCREEN_WIDTH * 0.35,
                  borderColor: color.background,
                  borderWidth: 1,
                  backgroundColor: color.background,
                  zIndex: 1000,
                }}
                ArrowUpIconComponent={({style}) => (
                  <Ionicons name="chevron-up" size={24} color={color.text} />
                )}
                ArrowDownIconComponent={({style}) => (
                  <Ionicons name="chevron-down" size={24} color={color.text} />
                )}
                TickIconComponent={({style}) => (
                  <AntDesign name="check" size={24} color={color.text} />
                )}
                zIndex={1000}
                zIndexInverse={1000}
                textStyle={{color: color.text}}
                listMode="SCROLLVIEW"
              />
            </View>
          )}
          {selectedOptionEndRepeat === 'date' && (
            <View
              style={[
                styles.row,
                {
                  backgroundColor: color.background,
                  borderBottomWidth: 1,
                  borderBottomColor: '#ccc',
                  paddingVertical: 5,
                  alignItems: 'center',
                  padding: 20,
                },
              ]}>
              <MaterialCommunityIcons
                name="calendar-end"
                size={30}
                color={color.text}
              />
              <Text style={{right: 30, fontSize: 16, color: color.text}}>
                {translate('End time')}
              </Text>
              <DateTimePicker
                value={repeatEndDate}
                mode="date"
                display="default"
                onChange={handleRepeatEndDateChange}
              />
            </View>
          )}
          {selectedOptionEndRepeat === 'count' && (
            <View
              style={[
                styles.row,
                {
                  backgroundColor: color.background,
                  borderBottomWidth: 1,
                  borderBottomColor: '#ccc',
                  paddingVertical: 5,
                  alignItems: 'center',
                  padding: 20,
                },
              ]}>
              <MaterialCommunityIcons
                name="calendar-end"
                size={30}
                color={color.text}
              />
              <Text style={{right: 30, fontSize: 16, color: color.text}}>
                {translate('End Count')}
              </Text>
              <TouchableOpacity onPress={handleDecrease}>
                <MaterialCommunityIcons
                  name="minus-circle"
                  size={30}
                  style={[styles.icon, {marginRight: 5}]}
                />
              </TouchableOpacity>
              <Text style={{color: color.text}}>{count}</Text>
              <TouchableOpacity onPress={handleIncrease}>
                <MaterialCommunityIcons
                  name="plus-circle"
                  size={30}
                  style={[styles.icon, {marginLeft: 5}]}
                />
              </TouchableOpacity>
            </View>
          )}

          <ColorPicker
            navigation={navigation}
            id_Family={family?.id_Family}
            selectedColorIndex={selectedColorIndex}
            setSelectedColorIndex={setSelectedColorIndex}
            setEventCategory={setEventCategory}
            setAvailableColors={setAvailableColors}
            setSelectedColor={setSelectedColor} // Pass the setter function
          />

          <View style={[styles.formAction, {paddingVertical: 10, padding: 20}]}>
            <TouchableOpacity onPress={handleSubmit}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>{translate('add_new_event')}</Text>
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
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateEventScreen;
