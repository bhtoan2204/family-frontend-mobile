import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { ChartExpenseProps } from 'src/navigation/NavigationTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ExpenseServices, FamilyServices } from 'src/services/apiclient';
import { Family } from "src/interface/family/family";
import { Expenditure } from "src/interface/expense/getExpense";
import MonthPicker from 'react-native-month-picker';
import { Picker } from '@react-native-picker/picker';
import renderPieChart from './PieChart';
import PieChartComponent from './PieChart';
import LineChartScreen from './LineChart';
import BarChartScreen from './BarChart';

const ChartExpenseScreen = ({ navigation }: ChartExpenseProps) => {
  const [selectedCategoryType, setSelectedCategoryType] = useState<string>('Day');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [currentIndex, setCurrentIndex] = useState(1);
  const [families, setFamilies] = useState<Family[]>([]);
  const [selectedFamily, setSelectedFamily] = useState<number | undefined>(undefined);
  const [expenses, setExpenses] = useState<Expenditure[]>([]);
  const [isMonthPickerVisible, setMonthPickerVisible] = useState<boolean>(false);
  const [isYearPickerVisible, setYearPickerVisible] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [isOpen, toggleOpen] = useState(false);
  const [value, onChange] = useState(null);
  const moment = require('moment');
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
    fetchAllFamily();
  },[]);
  const generateRecentYears = () => {
    const currentYear = moment().year();
    const recentYears = [];
    for (let i = currentYear - 2; i <= currentYear; i++) {
      recentYears.push(i);
    }
    return recentYears;
  };

  useEffect(() => {
    const recentYears = generateRecentYears();
    setYears(recentYears);
  }, []);

  const handleYearChange = (year: any) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    if(selectedFamily != undefined){
      fetchExpenses();
    }
  }, [currentIndex, selectedFamily]);

  const fetchAllFamily = async () => {
    try {
      const result = await FamilyServices.getAllFamily();
      setFamilies(result);
      setSelectedFamily(result[0]?.id_family || null); 
    } catch (error: any) {
      console.log('FamilyServices.getAllFamily error:', error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const result: Expenditure[] = await ExpenseServices.getExpense(currentIndex, 10, selectedFamily);
      if (result) {
        setExpenses(prevExpenses => [...prevExpenses, ...result]);
      }
    } catch (error) {
      console.log('fetchExpenses error:', error);
    }
  }

  const data = [
    {
      name: 'Food',
      expense: 4000,
      color: '#FF5733',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Transportation',
      expense: 2000,
      color: '#33FFB4',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Housing',
      expense: 3000,
      color: '#338DFF',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  const selectOption = (option: string) => {
    setSelectedCategoryType(option);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setSelectedDate(currentDate);
  };

  const handleMonthPickerConfirm = (newDate: Date) => {
    console.log(newDate)
    setSelectedMonth(newDate);
    setMonthPickerVisible(false);
  };

  const handleMonthPickerCancel = () => {
    setMonthPickerVisible(false);

  };
  const formatMonthYear = (date: Date): string => {
    const dateString = moment(date).toDate();

    const month = dateString.getMonth() + 1;
    const year = dateString.getFullYear();

    return `${month}/${year}`;
  };
  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setMonthPickerVisible(false); // Close the picker after selecting the year
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeTab', { screen: 'Expense' })} style={styles.headerButton}>
          <Icon name="arrow-back" size={30} style={styles.backButton} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerText}>Expense Analysis</Text>
        </View>
        <TouchableOpacity onPress={toggleModal} style={styles.headerButton}>
          <Icon name="add" size={30} style={styles.addImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerTab}>
        <TouchableOpacity
          onPress={() => selectOption('Day')}
          style={[styles.tabButton, selectedCategoryType === 'Day' && styles.selectedTabButton]}
        >
          <Text style={styles.tabButtonText}>Day</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectOption('Month')}
          style={[styles.tabButton, selectedCategoryType === 'Month' && styles.selectedTabButton]}
        >
          <Text style={styles.tabButtonText}>Month</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectOption('Year')}
          style={[styles.tabButton, selectedCategoryType === 'Year' && styles.selectedTabButton]}
        >
          <Text style={styles.tabButtonText}>Year</Text>
        </TouchableOpacity>
      </View>
      {selectedCategoryType === 'Day' && (
        <View>
        <View style={styles.itemContainer} >
            <Icon name="calendar" size={25} color="black" style={styles.icon} />
            <Text style={styles.text}>Select Date</Text>
        </View>
          <View style={styles.datePickerContainer}>
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          </View>
          <BarChartScreen/>

        </View>
      )}
     {selectedCategoryType === 'Month' && (
        <View>
        <View style={styles.itemContainer} >
            <Icon name="calendar" size={25} color="black" style={styles.icon} />
            <Text style={styles.text}>Select Month</Text>
        </View>
          <TouchableOpacity style={styles.monthPickerContainer} onPress={() => setMonthPickerVisible(!isMonthPickerVisible)}>
            <View style={styles.monthContainer}>
                 <Text style={styles.monthText}>{formatMonthYear(selectedMonth)}</Text>
            </View>
          </TouchableOpacity>
          
          {isMonthPickerVisible && (
            <MonthPicker
              mode="number"
              selectedDate={selectedMonth}
              onMonthChange={handleMonthPickerConfirm}
            />

          )}
            <PieChartComponent />
            
        </View>
        
      )}
      {selectedCategoryType === 'Year' && (
        <View>
          <View style={styles.itemContainer} >
            <Icon name="calendar" size={25} color="black" style={styles.icon} />
            <Text style={styles.text}>Select Year</Text>
          </View>
          <TouchableOpacity style={styles.monthPickerContainer} onPress={() => setYearPickerVisible(!isYearPickerVisible)}>
            <View style={styles.monthContainer}>
                 <Text style={styles.monthText}>{selectedYear}</Text>
            </View>
          </TouchableOpacity>
          {isYearPickerVisible && (

         <View style={styles.yearPickerContainer}>
          <Picker
            selectedValue={selectedYear}
            style={styles.dropdownYear}
            onValueChange={(itemValue) => handleYearChange(itemValue)}>
            {years.map((year: number) => (
                <Picker.Item key={year} label={year.toString()} value={year} />
                ))}

          </Picker>

          
          </View>

          )}
        <LineChartScreen/>
       
        </View>
      )}
    </View>
  );
};

export default ChartExpenseScreen;
