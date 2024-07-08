import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button, Modal, FlatList, Image, SafeAreaView, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../ChartExpense/styles';
import { IncomeServices, FamilyServices } from 'src/services/apiclient';
import { Family } from "src/interface/family/family";
import { Income } from "src/interface/income/getIncome";
import MonthPicker from 'react-native-month-picker';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedOption } from 'src/redux/slices/IncomeAnalysis';
import { ChartIncomeScreenProps } from 'src/navigation/NavigationTypes';
import BarChartScreen from './BarChart';
import PieChartComponent from './PieChart';
import LineChartScreen from './LineChart';
import { DailyIncome } from 'src/interface/income/IncomeDaily';
import { selectProfile } from 'src/redux/slices/ProfileSclice';
import { selectSelectedFamily } from 'src/redux/slices/FamilySlice';

const ChartIncomeScreen = ({ navigation }: ChartIncomeScreenProps) => {
  const [selectedCategoryType, setSelectedCategoryType] = useState<string>('');
  let option = useSelector(getSelectedOption);
  const profile = useSelector(selectProfile);
  let family =useSelector(selectSelectedFamily);
  
  useEffect(() => {
      setSelectedCategoryType(option);
    
  }, [ option]);




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
                navigation.goBack()
              }
              style={styles.headerButton}>
              <Icon name="arrow-back" size={30} style={styles.backButton} />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerText}>Income Analysis</Text>
            </View>

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
              Here you can view a brief overview of your income for the year.
            </Text>
            )}
            {selectedCategoryType === 'Month' && (
              <Text style={{fontSize: 16, color: '#ccc'}}>
               For each month, you can see a summary of your income.
              </Text>
            )}
            {selectedCategoryType === 'Day' && (
                <Text style={{fontSize: 16, color: '#ccc'}}>
                  Here you can view detailed incomes for each day.
                </Text>
              )}
          </View>



      {selectedCategoryType === 'Day' && (
        <View>
          <BarChartScreen id_family={family?.id_family} navigation={navigation}/>
        </View>
      )}
      {selectedCategoryType === 'Month' && (
        <View>
          <PieChartComponent id_family={family?.id_family} />
        </View>
      )}
      {selectedCategoryType === 'Year' && (
        <View>
          <LineChartScreen id_family={family?.id_family}  />
        </View>
      )}


      
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ChartIncomeScreen;
