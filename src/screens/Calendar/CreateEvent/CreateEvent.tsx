import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Switch,
  SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarServices from 'src/services/apiclient/CalendarService';
import {CreateEventScreenProps} from 'src/navigation/NavigationTypes';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import * as CalendarEvents from 'react-native-calendar-events';
import ColorPicker from './ColorPicker';
import {useSelector} from 'react-redux';
import {getColor, getIDcate} from 'src/redux/slices/CalendarSlice';
import IconL from 'react-native-vector-icons/EvilIcons';

const CreateEventScreen: React.FC<CreateEventScreenProps> = ({
  navigation,
  route,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [chosenDateStart, setChosenDateStart] = useState(new Date());
  const [chosenDateEnd, setChosenDateEnd] = useState(new Date());
  const {id_family} = route.params;
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('none');
  const [isAllDay, setIsAllDay] = useState(false);
  const [repeatEndDate, setRepeatEndDate] = useState(new Date());
  let color = useSelector(getColor);
  let category = useSelector(getIDcate);

  const options = [
    {label: 'None', value: 'none'},
    {label: 'Daily', value: 'daily'},
    {label: 'Weekly', value: 'weekly'},
    {label: 'Monthly', value: 'monthly'},
    {label: 'Yearly', value: 'yearly'},
  ];

  const handleDateChangeStart = (event: any, selectedDate: any) => {
    if (selectedDate) {
      setChosenDateStart(selectedDate);
    }
  };

  const handleDateChangeEnd = (event: any, selectedDate: any) => {
    if (selectedDate) {
      setChosenDateEnd(selectedDate);
    }
  };

  const handleSubmit = async () => {
    const eventDetails = {
      id_family: id_family,
      title: title,
      time_start: chosenDateStart,
      time_end: chosenDateEnd,
      description: description,
      color: color,
      is_all_day: isAllDay,
      category: category,
      location: location,
      recurrence_exception: '',
      recurrence_id: 0,
      recurrence_rule:
        selectedOption !== 'none' ? 'FREQ=' + selectedOption.toUpperCase() : '',
      start_timezone: '',
      end_timezone: '',
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

  const handleRepeatEndDateChange = (event: any, selectedDate: any) => {
    if (selectedDate) {
      setRepeatEndDate(selectedDate);
    }
  };
  return (
    <View style={styles.modalContainer}>
      <View
        style={{
          paddingVertical: 10,
          padding: 20,
          paddingTop: 60,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.headerTitle}>Create New Event</Text>
        </View>
      </View>
      <View style={{padding: 20}}>
        <Text
          style={{
            color: '#858AA2',
            fontSize: 16,
            marginBottom: 10,
            fontWeight: '600',
          }}>
          TITLE
        </Text>
        <TextInput
          style={styles.input1}
          placeholderTextColor="white"
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View style={styles.datetimeContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <View style={styles.allDayConTainer}>
            <Text style={styles.text}> All day</Text>
          </View>
          <View style={styles.switches}>
            <Switch value={isAllDay} onValueChange={setIsAllDay} />
          </View>
        </View>
        <View>
          <View style={[styles.row, {alignItems: 'center'}]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="clock-time-four-outline"
                size={30}
                style={{color: 'white', marginRight: 10}}
              />
              <Text style={{fontSize: 16, color: 'white'}}>Start time</Text>
            </View>
            <DateTimePicker
              value={chosenDateStart}
              mode={isAllDay ? 'date' : 'datetime'}
              display="default"
              onChange={handleDateChangeStart}
            />
          </View>

          <View
            style={[
              styles.row,
              {
                borderBottomColor: '#ccc',
                paddingVertical: 10,
                alignItems: 'center',
              },
            ]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="clock-time-four-outline"
                size={30}
                style={{color: 'white', marginRight: 10}}
              />
              <Text style={{fontSize: 16, color: 'white'}}>End time</Text>
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
      <View style={{backgroundColor: 'white', padding: 20}}>
        <View
          style={{
            ...styles.column,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            paddingVertical: 10,
          }}>
          <View style={[styles.row, {alignItems: 'center'}]}>
            <Icon name="location" size={28} color="gray" />
          </View>
          <TextInput
            style={styles.input2}
            placeholder="Enter location"
            value={location}
            onChangeText={setLocation}
          />
        </View>
        <View
          style={{
            ...styles.column,
            backgroundColor: '#ffffff',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            paddingVertical: 10,
          }}>
          <View style={[styles.row, {alignItems: 'center'}]}>
            <MaterialCommunityIcons
              name="playlist-edit"
              size={30}
              style={{color: 'gray'}}
            />
          </View>
          <TextInput
            style={styles.input2}
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View
          style={[
            styles.row,
            {
              backgroundColor: '#ffffff',
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              paddingVertical: 10,
              alignItems: 'center',
              zIndex: isPickerOpen ? 1000 : 1,
            },
          ]}>
          <MaterialCommunityIcons
            name="repeat"
            size={30}
            style={{color: 'gray'}}
          />
          <Text style={{right: 30, fontSize: 16, color: 'gray'}}>Repeat</Text>
          <DropDownPicker
            open={isPickerOpen}
            setOpen={setIsPickerOpen}
            value={selectedOption}
            items={options}
            setValue={setSelectedOption}
            placeholder="None"
            containerStyle={{height: 40, width: 200}}
            style={{borderColor: 'white', borderWidth: 1}}
            dropDownContainerStyle={{
              borderColor: '#ccc',
              borderWidth: 1,
              zIndex: 1000,
            }}
            zIndex={1000}
            zIndexInverse={1000}
          />
        </View>
        {selectedOption !== 'none' && (
          <View style={styles.datetimeContainer}>
            <View style={[styles.row, {alignItems: 'center'}]}>
              <MaterialCommunityIcons
                name="calendar-end"
                size={30}
                style={styles.icon}
              />
              <Text style={styles.text}>Repeat End</Text>
              <DateTimePicker
                value={repeatEndDate}
                mode="date"
                display="default"
                onChange={handleRepeatEndDateChange}
              />
            </View>
          </View>
        )}
        <ColorPicker navigation={navigation} />

        <View style={[styles.formAction, {paddingVertical: 10}]}>
          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CreateEventScreen;
