import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button, Modal, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../ChartExpense/styles';
import { IncomeServices, FamilyServices } from 'src/services/apiclient';
import { Family } from "src/interface/family/family";
import { Income } from "src/interface/income/getIncome";
import MonthPicker from 'react-native-month-picker';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { getOption, setSelectedOption } from 'src/redux/slices/IncomeAnalysis';
import { ChartIncomeScreenProps } from 'src/navigation/NavigationTypes';
import BarChartScreen from './BarChart';
import PieChartComponent from './PieChart';
import LineChartScreen from './LineChart';

const ChartIncomeScreen = ({ navigation }: ChartIncomeScreenProps) => {
  const [selectedCategoryType, setSelectedCategoryType] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [currentIndex, setCurrentIndex] = useState(1);
  const [families, setFamilies] = useState<Family[]>([]);
  const [selectedFamily, setSelectedFamily] = useState<number | undefined>(undefined);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const moment = require('moment');
  let option = useSelector(getOption);
  const dispatch = useDispatch();
  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);
  const familyUri = 'https://t3.ftcdn.net/jpg/06/75/38/14/360_F_675381468_yjYEK9SvCRYpRUyKNRWsnArIalbMeBU4.jpg';

  const [isFamilyDataLoaded, setIsFamilyDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllFamily();
      setIsFamilyDataLoaded(true);
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    if (isFamilyDataLoaded) {
      setSelectedCategoryType(option);
    }
  }, [isFamilyDataLoaded, option]);

  const fetchAllFamily = async () => {
    try {
      const result = await FamilyServices.getAllFamily();
      setFamilies(result);
      setSelectedFamily(result[0]?.id_family || null); 
    } catch (error: any) {
      console.log('FamilyServices.getAllFamily error:', error);
    }
  };

  const selectOption = (option: 'Day' | 'Month' | 'Year') => {
    setSelectedCategoryType(option);
    dispatch(setSelectedOption(option));
  };

  const handleFamilySelection = (selectedFamily: Family) => {
    setIsFamilyModalOpen(false);
    setSelectedFamily(selectedFamily.id_family);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeTab', { screen: 'Income' })} style={styles.headerButton}>
          <Icon name="arrow-back" size={30} style={styles.backButton} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerText}>Income Analysis</Text>
        </View>
        <TouchableOpacity style={styles.headerButton} onPress={() => setIsFamilyModalOpen(!isFamilyModalOpen)}>
          <Icon name="filter" size={30} style={styles.filterButton} />
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
          <BarChartScreen id_family={selectedFamily} />
        </View>
      )}
      {selectedCategoryType === 'Month' && (
        <View>
          <PieChartComponent id_family={selectedFamily} />
        </View>
      )}
      {selectedCategoryType === 'Year' && (
        <View>
          <LineChartScreen id_family={selectedFamily} />
        </View>
      )}
      <Modal
        visible={isFamilyModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsFamilyModalOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => setIsFamilyModalOpen(!isFamilyModalOpen)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.dropdownMenu}>
              <FlatList
                data={families}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.filterItem} onPress={() => handleFamilySelection(item)}>
                    <Image source={{ uri: familyUri }} style={styles.avatar} />
                    <Text style={styles.text}>{item.name}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ChartIncomeScreen;
