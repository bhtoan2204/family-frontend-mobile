import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, FlatList, TouchableOpacity, Modal, Image, ImageBackground, SafeAreaView, ActivityIndicator } from 'react-native';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedFamily } from 'src/redux/slices/FamilySlice';
import {  IncomeServices } from 'src/services/apiclient';
import styles from './styles';
import { IncomeScreenProps } from 'src/navigation/NavigationTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from 'src/constants';
import { selectProfile } from 'src/redux/slices/ProfileSclice';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DailyIncome } from 'src/interface/income/IncomeDaily';
import { getIncomeList, getSumIncome, setIncomeList, setSelectedIncome, setSumIncome } from 'src/redux/slices/IncomeAnalysis';

const IncomeScreen = ({ navigation }: IncomeScreenProps) => {
  const income = useSelector(getIncomeList);

  const [currentPageIncome, setCurrentPageIncome] = useState<number>(1);

  const [totalPageIncome, setTotalPageIncome] = useState<number>(1);
  const [selectedCategoryType, setSelectedCategoryType] = useState<string>('Income');
  const sumIncome = useSelector(getSumIncome);
  const family = useSelector(selectSelectedFamily);
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let profile = useSelector(selectProfile);
  const dispatch = useDispatch();
  const [dateTo, setDateTo] = useState(new Date());
  const [dateFrom, setDateFrom] = useState(() => {
    const date = new Date(dateTo);
    date.setDate(date.getDate() - 30);
    return date;
  });
 

  const fetchDataIncome = async (page: number, reset: boolean = false) => {
    setIsLoading(true);
    try {
        const formattedDateFrom = moment(dateFrom).format('YYYY-MM-DD');
        const formattedDateTo = moment(dateTo).format('YYYY-MM-DD');
      const response = await IncomeServices.getIncomeByDateRange(page, itemsPerPage, family.id_family,formattedDateFrom, formattedDateTo );
      if (response){
        setTotalPageIncome(Math.ceil(response.total / itemsPerPage));
        dispatch(setIncomeList(reset ? response.data : [...income, ...response.data]));
        dispatch(setSumIncome(response.sum))
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {

      fetchDataIncome(currentPageIncome, true);
    
  }, [currentPageIncome]);

  useEffect(() => {
    setCurrentPageIncome(1);

      fetchDataIncome(currentPageIncome, true);
    
  }, [ dateFrom,dateTo]);



  const formatDate = (isoDateTime: string) => {
    return moment(isoDateTime).format('DD/MM/YYYY HH:mm');
  };


  const formatCurrency = (amount: any) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };


  const handlePressIncomeItem = async (item: DailyIncome)=> {
    await dispatch(setSelectedIncome(item));
    navigation.navigate('IncomeStack', {screen: 'IncomeDetailScreen'});
  }
  
  const renderIncomeItem = ({ item }: { item: DailyIncome }) => (
    <TouchableOpacity onPress={() => {handlePressIncomeItem(item)}} style={styles.expenseItem}>
      <View style={styles.itemContainer}>
        <View style={styles.expenseContent}>
          <View>
          <Text style={styles.expenseCategory}>
            {item.financeIncomeSource && item.financeIncomeSource.income_source_name
              ? item.financeIncomeSource.income_source_name
              : 'Other'}
          </Text>
            <View style={styles.row}>
              
              <Text style={{color: 'gray', }}>By: </Text>
              <Text style={styles.expenseName}>    {item.users && item.users.firstname && item.users.lastname
                ? `${item.users.firstname} ${item.users.lastname}`
                : ''}</Text>

            </View>
            <Text style={styles.expenseDescription}>{item.description}</Text>
          </View>
          <View style={{ justifyContent: 'center', flexDirection: 'row'}}>

            <View style={styles.rowInfo}>

              <Text style={styles.incomeAmount}>+{formatCurrency(item.amount)}</Text>
              <Text style={styles.expenseDate}>{formatDate(item.income_date)}</Text>

            </View>
          <View style={{ justifyContent: 'center', }}>
            <Icon name="chevron-forward" size={20} style={styles.forwardIcon} />
           </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );






  const renderPaginationIncome = () => {
    const totalPages = totalPageIncome;
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
        <TouchableOpacity
          onPress={() => setCurrentPageIncome(currentPageIncome - 1)}
          disabled={currentPageIncome === 1}
          style={{ paddingHorizontal: 10 }}>
          <Text style={{ color: currentPageIncome === 1 ? COLORS.gray : COLORS.primary }}>Prev</Text>
        </TouchableOpacity>
        <Text>{currentPageIncome} / {totalPages}</Text>
        <TouchableOpacity
          onPress={() => setCurrentPageIncome(currentPageIncome + 1)}
          disabled={currentPageIncome === totalPages}
          style={{ paddingHorizontal: 10 }}>
          <Text style={{ color: currentPageIncome === totalPages ? COLORS.gray : COLORS.primary }}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/income-detail-bg.png')}
      style={{ flex: 1 }}
      resizeMode="stretch">
      <SafeAreaView style={{ flex: 1 }}>
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
            <Text style={{fontSize: 15, color: 'white'}}>
            Below is a detailed list of your incomes for the selected date range.

            </Text>
          </View>
        <View style={{backgroundColor: '#f0f0f0', flex: 1,}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 15, marginLeft: 20 }}>From: </Text>
            <DateTimePicker
                style={{ flex: 1 }}
                value={dateFrom}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                const currentDate = selectedDate || dateFrom;
                setDateFrom(currentDate);
                }}
            />
            <Text style={{ fontSize: 15, marginLeft: 20 }}>To: </Text>
            <DateTimePicker
                style={{ flex: 1, marginRight: 20}}
                value={dateTo}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                const currentDate = selectedDate || dateTo;
                setDateTo(currentDate);
                }}
            />
            </View>


          <View style={styles.containerTab}>
            <View
              style={[
                styles.bottomLine,
                { left: selectedCategoryType === 'Income' ? 0 : '50%', borderRadius: 20 }
              ]}
            />
          </View>



            <View style={styles.sumContainer}>
              <Text style={styles.sumText}>Total Income: </Text>
              <Text style={[styles.sumText, { color: 'green' }]}> +{formatCurrency(sumIncome)} </Text>
              </View>
          
           {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          ) : (
            <FlatList
              data={income}
              renderItem={renderIncomeItem}
              keyExtractor={(item, index) => `${item.id_income_source}_${index}`}
              onEndReachedThreshold={0.1}
              ListFooterComponent={renderPaginationIncome}
            />
          )}
       
         
        </View>
        </View>

      </SafeAreaView>
      
    </ImageBackground>

  );
};

export default IncomeScreen;


