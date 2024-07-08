import React, {useEffect, useState} from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  Modal,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {ChartExpenseProps} from 'src/navigation/NavigationTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ExpenseServices, FamilyServices} from 'src/services/apiclient';
import {Family} from 'src/interface/family/family';
import {Expenditure} from 'src/interface/expense/getExpense';
import MonthPicker from 'react-native-month-picker';
import {Picker} from '@react-native-picker/picker';
import renderPieChart from './PieChart';
import PieChartComponent from './PieChart';
import LineChartScreen from './LineChart';
import BarChartScreen from './BarChart';
import {useDispatch, useSelector} from 'react-redux';
import {getOption, setSelectedOption} from 'src/redux/slices/ExpenseAnalysis';
import {SafeAreaView} from 'react-native-safe-area-context';
import { selectProfile } from 'src/redux/slices/ProfileSclice';

const ChartExpenseScreen = ({navigation}: ChartExpenseProps) => {
  const [selectedCategoryType, setSelectedCategoryType] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [currentIndex, setCurrentIndex] = useState(1);
  const [families, setFamilies] = useState<Family[]>([]);
  const [selectedFamily, setSelectedFamily] = useState<number | undefined>(
    undefined,
  );
  const [expenses, setExpenses] = useState<Expenditure[]>([]);
  const moment = require('moment');
  let option = useSelector(getOption);
  const dispatch = useDispatch();
  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);
  const familyUri =
    'https://t3.ftcdn.net/jpg/06/75/38/14/360_F_675381468_yjYEK9SvCRYpRUyKNRWsnArIalbMeBU4.jpg';

  const [isFamilyDataLoaded, setIsFamilyDataLoaded] = useState(false);
  const profile = useSelector(selectProfile);
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
    <ImageBackground
      source={require('../../../assets/images/background-expense-chart1.png')}
      style={{flex: 1}}
      resizeMode="stretch">
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
        <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() =>
                //navigation.navigate('HomeTab', {screen: 'Expense'})
                navigation.goBack()
              }
              style={styles.headerButton}>
              <Icon name="arrow-back" size={30} style={styles.backButton} />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerText}>Expense Analysis</Text>
            </View>
            {/* <TouchableOpacity
              style={styles.headerButton}
              onPress={() => setIsFamilyModalOpen(!isFamilyModalOpen)}>
              <Icon name="filter" size={30} style={styles.filterButton} />
            </TouchableOpacity> */}
          </View>
          <View
            style={{
              flexDirection: 'column',
              marginHorizontal: 20,
              bottom: 5,
              marginBottom: 20,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                marginBottom: 5,
                color: 'white',
              }}>
              Hello, {profile.firstname} {profile.lastname}
            </Text>
            {selectedCategoryType === 'Year' && (
            <Text style={{fontSize: 16, color: '#ccc'}}>
              Here you can view a brief overview of your expenses for the year.
            </Text>
            )}
          </View>
          {/* <View style={styles.containerTab}>
            <TouchableOpacity
              onPress={() => selectOption('Day')}
              style={[
                styles.tabButton,
                selectedCategoryType === 'Day' && styles.selectedTabButton,
              ]}>
              <Text
                style={[
                  styles.tabButtonText,
                  selectedCategoryType === 'Day' &&
                    styles.selectedTabButtonText,
                ]}>
                Day
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => selectOption('Month')}
              style={[
                styles.tabButton,
                selectedCategoryType === 'Month' && styles.selectedTabButton,
              ]}>
              <Text
                style={[
                  styles.tabButtonText,
                  selectedCategoryType === 'Month' &&
                    styles.selectedTabButtonText,
                ]}>
                Month
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => selectOption('Year')}
              style={[
                styles.tabButton,
                selectedCategoryType === 'Year' && styles.selectedTabButton,
              ]}>
              <Text
                style={[
                  styles.tabButtonText,
                  selectedCategoryType === 'Year' &&
                    styles.selectedTabButtonText,
                ]}>
                Year
              </Text>
            </TouchableOpacity>
          </View> */}
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
          {/* <Modal
            visible={isFamilyModalOpen}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsFamilyModalOpen(false)}>
            <TouchableOpacity
              style={styles.modalContainer}
              activeOpacity={1}
              onPress={() => setIsFamilyModalOpen(!isFamilyModalOpen)}>
              <View style={styles.modalBackground}>
                <View style={styles.dropdownMenu}>
                  <FlatList
                    data={families}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        style={styles.filterItem}
                        onPress={() => handleFamilySelection(item)}>
                        <Image
                          source={{uri: familyUri}}
                          style={styles.avatar}
                        />
                        <Text style={styles.text}>{item.name}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </Modal> */}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ChartExpenseScreen;
