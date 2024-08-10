import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {RRule} from 'rrule';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './StyleCustom';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import {TEXTS} from 'src/constants';

const CustomRepeatScreen = ({isVisible, onClose, onSave}) => {
  const [number, setNumber] = useState<number>(1);
  const [unit, setUnit] = useState('daily');
  const [isPickerRepeatOpen, setIsPickerRepeatOpen] = useState(false);
  const [customOptions, setCustomOptions] = useState([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const dispatch = useDispatch();
  const [isNumberPickerVisible, setIsNumberPickerVisible] = useState(false);
  const translate = useSelector(getTranslate);
  const color = useThemeColors();
  const numbers = Array.from({length: 999}, (_, i) => i + 1);

  const optionRepeat = [
    {label: 'Daily', value: 'daily'},
    {label: 'Weekly', value: 'weekly'},
    {label: 'Monthly', value: 'monthly'},
    {label: 'Yearly', value: 'yearly'},
  ];

  useEffect(() => {
    switch (unit) {
      case 'daily':
        setCustomOptions([]);
        break;
      case 'weekly':
        setCustomOptions([
          translate('Sunday'),
          translate('Monday'),
          translate('Tuesday'),
          translate('Wednesday'),
          translate('Thursday'),
          translate('Friday'),
          translate('Saturday'),
        ]);
        break;
      case 'monthly':
        setCustomOptions(
          Array.from({length: 31}, (_, i) => (i + 1).toString()),
        );
        break;
      case 'yearly':
        setCustomOptions([
          translate('Jan'),
          translate('Feb'),
          translate('Mar'),
          translate('Apr'),
          translate('May'),
          translate('Jun'),
          translate('Jul'),
          translate('Aug'),
          translate('Sep'),
          translate('Oct'),
          translate('Nov'),
          translate('Dec'),
        ]);
        break;
      default:
        setCustomOptions([]);
    }
  }, [unit, translate]);

  const renderCustomOptions = () => {
    if (unit === 'weekly') {
      return (
        <View style={[styles.weeklyContainer, {backgroundColor: color.white}]}>
          {customOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleDayClick(option)}
              style={styles.weeklyDay}>
              <View style={styles.checkContainer}>
                <Text style={[styles.weeklyDayText, {color: color.text}]}>
                  {option}
                </Text>
                {selectedDays.includes(option) && (
                  <Icon
                    name="check"
                    size={20}
                    color="green"
                    style={styles.checkIcon}
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      );
    } else if (unit === 'monthly') {
      return (
        <View style={[styles.monthlyContainer, {backgroundColor: color.white}]}>
          {customOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleMonthClick(option)}
              style={[
                styles.monthlyDay,
                selectedMonths.includes(option) && styles.selectedDay,
              ]}>
              <Text style={[styles.monthlyDay, {color: color.text}]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    } else if (unit === 'yearly') {
      return (
        <View style={[styles.yearlyContainer, {backgroundColor: color.white}]}>
          <View style={styles.yearlyRow}>
            {customOptions.slice(0, 4).map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleYearClick(option)}
                style={[
                  styles.yearlyMonth,
                  selectedYears.includes(option) && styles.selectedMonth,
                ]}>
                <Text style={[styles.yearlyMonthText, {color: color.text}]}>
                  {option}
                </Text>
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
                ]}>
                <Text style={[styles.yearlyMonthText, {color: color.text}]}>
                  {option}
                </Text>
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
                ]}>
                <Text style={[styles.yearlyMonthText, {color: color.text}]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }
  };

  const handleDayClick = day => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(item => item !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleMonthClick = month => {
    if (selectedMonths.includes(month)) {
      setSelectedMonths(selectedMonths.filter(item => item !== month));
    } else {
      setSelectedMonths([...selectedMonths, month]);
    }
  };

  const handleYearClick = year => {
    if (selectedYears.includes(year)) {
      setSelectedYears(selectedYears.filter(item => item !== year));
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

    const byweekday = selectedDays.map(
      day => RRule[day.toUpperCase().slice(0, 2)],
    );
    const bymonthday = selectedMonths.map(Number);
    const bymonth = selectedYears.map(
      month => customOptions.indexOf(month) + 1,
    );

    const rule = new RRule({
      freq: freqMap[unit],
      interval: number,
      byweekday: byweekday.length > 0 ? byweekday : null,
      bymonthday: bymonthday.length > 0 ? bymonthday : null,
      bymonth: bymonth.length > 0 ? bymonth : null,
    });
    console.log(selectedDays);
    onSave(unit, number, selectedDays, selectedMonths, selectedYears);
  };

  const getUnitLabel = () => {
    switch (unit) {
      case 'daily':
        return number > 1 ? translate('days') : translate('day');
      case 'weekly':
        return number > 1 ? translate('weeks') : translate('week');
      case 'monthly':
        return number > 1 ? translate('months') : translate('month');
      case 'yearly':
        return number > 1 ? translate('years') : translate('year');
      default:
        return '';
    }
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={[styles.modalOverlay, {backgroundColor: color.background}]}>
        <View
          style={[
            styles.customModalContainer,
            {backgroundColor: color.background},
          ]}>
          <Text style={[styles.modalTitle, {color: color.text}]}>
            {translate('Custom Repeat')}
          </Text>

          <View style={[styles.container1, {backgroundColor: color.white}]}>
            <View
              style={[
                styles.row,
                {zIndex: 3000, borderBottomWidth: 1, borderColor: '#ccc'},
              ]}>
              <Text style={[styles.label, {color: color.text}]}>
                {translate('Frequency')}
              </Text>
              <DropDownPicker
                open={isPickerRepeatOpen}
                setOpen={setIsPickerRepeatOpen}
                value={unit}
                items={optionRepeat.map(item => ({
                  ...item,
                  label: translate(item.label),
                  labelStyle: {color: color.text},
                }))}
                setValue={setUnit}
                placeholder={translate('Daily')}
                placeholderStyle={{color: color.text}}
                containerStyle={{
                  height: TEXTS.SCEEN_HEIGHT * 0.05,
                  width: TEXTS.SCREEN_WIDTH * 0.35,
                  borderBottomWidth: 1,
                  borderColor: color.white,
                }}
                style={{
                  borderColor: color.white,
                  borderWidth: 1,
                  width: TEXTS.SCREEN_WIDTH * 0.35,
                  backgroundColor: color.white,
                }}
                dropDownContainerStyle={{
                  width: TEXTS.SCREEN_WIDTH * 0.35,
                  borderColor: color.white,
                  borderWidth: 1,
                  backgroundColor: color.white,
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
                zIndex={3000}
                zIndexInverse={3000}
              />
            </View>

            <TouchableOpacity
              style={[styles.row, {zIndex: 0}]}
              onPress={() => setIsNumberPickerVisible(!isNumberPickerVisible)}>
              <Text style={[styles.label, {color: color.text}]}>
                {translate('Every')}
              </Text>
              <Text style={[styles.label, {color: color.text}]}>
                {number} {getUnitLabel()}
              </Text>
            </TouchableOpacity>

            {isNumberPickerVisible && (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={number}
                  style={[styles.picker, {color: color.text}]}
                  onValueChange={itemValue => setNumber(itemValue)}>
                  {numbers.map(num => (
                    <Picker.Item
                      key={num}
                      label={num.toString()}
                      value={num}
                      color={color.text}
                    />
                  ))}
                </Picker>
                <Text style={[styles.unitLabel, {color: color.textSubdued}]}>
                  {getUnitLabel()}
                </Text>
              </View>
            )}
          </View>

          {renderCustomOptions()}

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalCancelButton}>
                {translate('Cancel')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.modalSubmitButton}>{translate('Save')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomRepeatScreen;
