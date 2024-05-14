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
import { useDispatch, useSelector } from 'react-redux';
import { getOption, setSelectedOption } from 'src/redux/slices/ExpenseAnalysis';

const ChartExpenseScreen = ({ navigation }: ChartExpenseProps) => {
  const [selectedCategoryType, setSelectedCategoryType] = useState<string>('Day');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [currentIndex, setCurrentIndex] = useState(1);
  const [families, setFamilies] = useState<Family[]>([]);
  const [selectedFamily, setSelectedFamily] = useState<number | undefined>(undefined);
  const [expenses, setExpenses] = useState<Expenditure[]>([]);
  const moment = require('moment');
  let option = useSelector(getOption);
  const dispatch = useDispatch();

  useEffect(() => {

    fetchAllFamily();
  },[]);

  useEffect(() => {
    setSelectedCategoryType( option);
  });

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



  const selectOption = (option: 'Day' | 'Month' | 'Year') => {
    setSelectedCategoryType(option);
    dispatch(setSelectedOption(option));
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
 
          <BarChartScreen/>

        </View>
      )}
     {selectedCategoryType === 'Month' && (
        <View>
            <PieChartComponent />
            
        </View>
        
      )}
      {selectedCategoryType === 'Year' && (
        <View>
          
        <LineChartScreen/>
       
        </View>
      )}
    </View>
  );
};

export default ChartExpenseScreen;

