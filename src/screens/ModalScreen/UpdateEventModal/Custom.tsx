import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { RRule } from 'rrule';
import { useDispatch, useSelector } from 'react-redux';
import styles from './StyleCustom';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Event } from 'src/interface/calendar/Event';
import { selectSelectedEvent } from 'src/redux/slices/CalendarSlice';

const CustomRepeatScreen = ({ isVisible, onClose, onSave }) => {
  const [number, setNumber] = useState<number>(1);
  const [unit, setUnit] = useState('daily');
  const [isPickerRepeatOpen, setIsPickerRepeatOpen] = useState(false);
  const [customOptions, setCustomOptions] = useState([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const dispatch = useDispatch();
  const [isNumberPickerVisible, setIsNumberPickerVisible] = useState(false);
  const event = useSelector(selectSelectedEvent);

  const numbers = Array.from({ length: 999 }, (_, i) => i + 1);

  const optionRepeat = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' },
  ];

  useEffect(() => {
    switch (unit) {
      case 'daily':
        setCustomOptions([]);
        break;
      case 'weekly':
        setCustomOptions(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
        break;
      case 'monthly':
        setCustomOptions(Array.from({ length: 31 }, (_, i) => (i + 1).toString()));
        break;
      case 'yearly':
        setCustomOptions(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
        break;
      default:
        setCustomOptions([]);
    }
  }, [unit]);

  const renderCustomOptions = () => {
    if (unit === 'weekly') {
      return (
        <View style={styles.weeklyContainer}>
          {customOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleDayClick(option)}
              style={styles.weeklyDay}
            >
              <View style={styles.checkContainer}> 
              <Text style={styles.weeklyDayText}>{option}</Text>
              {selectedDays.includes(option) && (
                <Icon name="check" size={20} color="green" style={styles.checkIcon} />
              )}
            </View>
            </TouchableOpacity>
          ))}
        </View>
      );
    } else if (unit === 'monthly') {
      return (
        <View style={styles.monthlyContainer}>
          {customOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleMonthClick(option)}
              style={[
                styles.monthlyDay,
                selectedMonths.includes(option) && styles.selectedDay,
              ]}
            >
              <Text style={styles.monthlyDay}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    } else if (unit === 'yearly') {
      return (
        <View style={styles.yearlyContainer}>
          <View style={styles.yearlyRow}>
            {customOptions.slice(0, 4).map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleYearClick(option)}
                style={[
                  styles.yearlyMonth,
                  selectedYears.includes(option) && styles.selectedMonth,
                ]}
              >
                <Text style={styles.yearlyMonthText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.yearlyRow}>
            {customOptions.slice(4, 8).map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleYearClick(option)}
                style={[
                  styles.yearlyMonth,
                  selectedYears.includes(option) && styles.selectedMonth,
                ]}
              >
                <Text style={styles.yearlyMonthText}>{option}</Text>
                </TouchableOpacity>
            ))}
          </View>
          <View style={styles.yearlyRow}>
            {customOptions.slice(8, 12).map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleYearClick(option)}
                style={[
                  styles.yearlyMonth,
                  selectedYears.includes(option) && styles.selectedMonth,
                ]}
              >
                <Text style={styles.yearlyMonthText}>{option}</Text>
                </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }
  };

  const handleDayClick = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((item) => item !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleMonthClick = (month) => {
    if (selectedMonths.includes(month)) {
      setSelectedMonths(selectedMonths.filter((item) => item !== month));
    } else {
      setSelectedMonths([...selectedMonths, month]);
    }
  };

  const handleYearClick = (year) => {
    if (selectedYears.includes(year)) {
      setSelectedYears(selectedYears.filter((item) => item !== year));
    } else {
      setSelectedYears([...selectedYears, year]);
    }
  };

  const handleSave = () => {
    const freqMap = {
      daily: RRule.DAILY,
      weekly: RRule.WEEKLY,
      monthly: RRule.MONTHLY,
      yearly: RRule.YEARLY,
    };

    const byweekday = selectedDays.map((day) => RRule[day.toUpperCase().slice(0, 2)]);
    const bymonthday = selectedMonths.map(Number);
    const bymonth = selectedYears.map((month) => customOptions.indexOf(month) + 1);

    const rule = new RRule({
      freq: freqMap[unit],
      interval: number,
      byweekday: byweekday.length > 0 ? byweekday : null,
      bymonthday: bymonthday.length > 0 ? bymonthday : null,
      bymonth: bymonth.length > 0 ? bymonth : null,
    });

    onSave(unit, number, selectedDays, selectedMonths, selectedYears);
  };

  const getUnitLabel = () => {
    switch (unit) {
      case 'daily':
        return number > 1 ? 'days' : 'day';
      case 'weekly':
        return number > 1 ? 'weeks' : 'week';
      case 'monthly':
        return number > 1 ? 'months' : 'month';
      case 'yearly':
        return number > 1 ? 'years' : 'year';
      default:
        return '';
    }
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.customModalContainer}>
          <Text style={styles.modalTitle}>Custom Repeat</Text>

        <View style={styles.container1}> 

        <View style={[styles.row, { zIndex: 3000, borderBottomWidth: 1, borderColor: '#ccc' }]}>
         <Text style={styles.label}>Frequency</Text>
            <DropDownPicker
              open={isPickerRepeatOpen}
              setOpen={setIsPickerRepeatOpen}
              value={unit}
              items={optionRepeat}
              setValue={setUnit}
              placeholder="Daily"
              containerStyle={styles.dropDownContainer}
              style={styles.dropDown}
              dropDownContainerStyle={styles.dropDownPicker}
              zIndex={1000}
              zIndexInverse={1000}
            />
          </View>

          <TouchableOpacity  style={[styles.row, { zIndex: 1000 }]} onPress={() => setIsNumberPickerVisible(!isNumberPickerVisible)}>
            <Text style={styles.label}>Every</Text>
            <Text style={styles.label}>{number} {getUnitLabel()}</Text>
          </TouchableOpacity>


          {isNumberPickerVisible && (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={number}
                style={styles.picker}
                onValueChange={(itemValue) => setNumber(itemValue)}
              >
                {numbers.map((num) => (
                  <Picker.Item key={num} label={num.toString()} value={num} />
                ))}
              </Picker>
              <Text style={styles.unitLabel }>{getUnitLabel()}</Text>

            </View>
          )}
            </View>
          {renderCustomOptions()}
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalCancelButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.modalSubmitButton}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};


export default CustomRepeatScreen;
