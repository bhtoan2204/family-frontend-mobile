import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { RRule, RRuleSet } from 'rrule';
import { useDispatch } from 'react-redux';
import { setFreq} from 'src/redux/slices/CalendarSlice';

const CustomRepeatScreen = ({ isVisible, onClose, onSave }) => {
  const [number, setNumber] = useState<number>(1);
  const [unit, setUnit] = useState('daily');
  const [isPickerRepeatOpen, setIsPickerRepeatOpen] = useState(false);
  const [customOptions, setCustomOptions] = useState([]);
  const [selectedDays, setSelectedDays] = useState<string>('');
  const [selectedMonths, setSelectedMonths] = useState<string>('');
  const [selectedYears, setSelectedYears] =useState<string>('');
  const dispatch = useDispatch();

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
    if (unit === 'daily') {
      return customOptions.map((option, index) => (
        <Text key={index} style={styles.customOption}>{option}</Text>
      ));
    } else if (unit === 'weekly') {
      return (
        <View style={styles.weeklyContainer}>
          {customOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleDayClick(option)}
              style={[
                styles.weeklyDay,
                selectedDays.includes(option) && styles.selectedDay,
              ]}
            >
              <Text>{option}</Text>
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
                  selectedYears.includes(option) && styles.selectedDay,
                ]}
              >
                <Text>{option}</Text>
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
                  selectedYears.includes(option) && styles.selectedDay,
                ]}
              >
                <Text>{option}</Text>
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
                  selectedYears.includes(option) && styles.selectedDay,
                ]}
              >
                <Text>{option}</Text>
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
    //const freq= 'Event will occur every ' +{unit} + 'on'
    //dispatch(setFreq());
    
    onSave(unit, number, selectedDays, selectedMonths, selectedYears);
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.customModalContainer}>
          <Text style={styles.modalTitle}>Custom Repeat</Text>

          <View style={[styles.row, { zIndex: 1000 }]}>
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

          <View style={[styles.row, { zIndex: 1000 }]}>
            <Text style={styles.label}>Every</Text>
            <Text style={styles.label}>{number} {unit}</Text>
          </View>

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
            <Text style={styles.unitLabel}>{unit}</Text>
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

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customModalContainer: {
    width: '90%',
    height: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: 'gray',
  },
  dropDownContainer: {
    width: 150,
  },
  dropDown: {
    borderColor: 'white',
  },
  dropDownPicker: {
    borderColor: '#ccc',
    zIndex: 1000,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  picker: {
    flex: 1,
    height: 150,
  },
  unitLabel: {
    fontSize: 16,
    color: 'gray',
    marginLeft: 10,
  },
  customOptionsContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  customOption: {
    fontSize: 16,
    color: 'black',
  },
  weeklyContainer: {
    height: '40%',
    width: '110%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    flexDirection: 'column',
    justifyContent: 'space-between',

  },
  weeklyDay: {
    fontSize: 16,
    color: 'black',
    marginLeft: 20,
    //borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  monthlyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    height: '40%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginTop: 30,

  },
  monthlyDay: {
    fontSize: 16,
    color: 'black',
    marginBottom: 18,
    marginRight : 15,
  },
  yearlyContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 'auto',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginTop : 80
  },
  yearlyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    marginLeft: 20
    
  },
  yearlyMonth: {
    fontSize: 16,
    color: 'black',
    width: '22%', 
  },
  modalButtonContainer: {
    flex: 1,
    alignItems: 'flex-end', 
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  modalCancelButton: {
    color: 'red',
    fontSize: 16,
    marginRight: 100,
  },
  modalSubmitButton: {
    color: 'green',
    fontSize: 16,
  },
  selectedDay: {
    backgroundColor: 'lightblue', 
    borderRadius: 100,
    paddingHorizontal: 5,
  },
});

export default CustomRepeatScreen;
