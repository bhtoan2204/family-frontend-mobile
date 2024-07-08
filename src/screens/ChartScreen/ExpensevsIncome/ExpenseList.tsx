import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, FlatList, TouchableOpacity, Modal, Image, ImageBackground, SafeAreaView, ActivityIndicator } from 'react-native';
import moment from 'moment';
import { Expenditure } from 'src/interface/expense/getExpense';
import { Income } from 'src/interface/income/getIncome';
import { Family } from 'src/interface/family/family';
import { useDispatch, useSelector } from 'react-redux';
import { selectfamily } from 'src/redux/slices/FamilySlice';
import { ExpenseServices, IncomeServices } from 'src/services/apiclient';
import styles from './styles';
import { ExpenseScreenProps } from 'src/navigation/NavigationTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from 'src/constants';
import { selectProfile } from 'src/redux/slices/ProfileSclice';
import { setExpense } from 'src/redux/slices/ExpenseAnalysis';
import { setIncomeDetails } from 'src/redux/slices/IncomeAnalysis';
const screenWidth = Dimensions.get('window').width;
import DateTimePicker from '@react-native-community/datetimepicker';
import { DailyExpense } from 'src/interface/expense/DailyExpense';

const ExpenseScreen = ({ navigation }: ExpenseScreenProps) => {
  const [expenses, setExpenses] = useState<DailyExpense[]>([]);
  const [currentPageExpense, setCurrentPageExpense] = useState<number>(1);

  const [totalPageExpense, setTotalPageExpense] = useState<number>(1);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<number>(30);
  const [sumExpense, setSumExpense] = useState<number>(0);
  const [selectedFamily, setSelectedFamily] = useState<number | undefined>(undefined);
  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);
  const filterUri = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL0i6wYs08kFWJKDu9843LWdW43Xom8IW89cIZREgBKg&s';
  const familyUri = 'https://t3.ftcdn.net/jpg/06/75/38/14/360_F_675381468_yjYEK9SvCRYpRUyKNRWsnArIalbMeBU4.jpg';
  const family = useSelector(selectfamily);
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let profile = useSelector(selectProfile);
  const dispatch = useDispatch();
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());


  const fetchDataExpense = async (page: number, reset: boolean = false) => {
    setIsLoading(true);
    try {
        const formattedDateFrom = moment(dateFrom).format('YYYY-MM-DD');
        const formattedDateTo = moment(dateTo).format('YYYY-MM-DD');
      const response = await ExpenseServices.getExpenseByDateRange(page, itemsPerPage, family.id_family, formattedDateFrom, formattedDateTo )
      console.log(response.data)
      setTotalPageExpense(Math.ceil(response.total / itemsPerPage));
      setExpenses(prevExpenses => reset ? response.data : [...prevExpenses, ...response.data]);
     
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    setCurrentPageExpense(1);

      fetchDataExpense(currentPageExpense, true);
    
  }, [dateFrom, dateTo]);

  useEffect(() => {

      fetchDataExpense(currentPageExpense, true);
    
  }, [currentPageExpense]);



  const filter = (option: number) => {
    setFilterModalVisible(false);
    setSelectedFilter(option);
    setCurrentPageExpense(1);

  };

  const formatDate = (isoDateTime: string) => {
    return moment(isoDateTime).format('DD/MM/YYYY HH:mm');
  };

  const formatCurrency = (amount: any) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };
  const handlePressExpenseItem = async (item: Expenditure)=> {
    await dispatch(setExpense(item));
    navigation.navigate('ExpenseDetailScreen');
  }
  const renderExpenseItem = ({ item }: { item: DailyExpense }) => (
    <TouchableOpacity onPress={() => {handlePressExpenseItem(item)}} style={styles.expenseItem}>
      <View style={styles.itemContainer}>
        <View style={styles.expenseContent}>
          <View>
            <Text style={styles.expenseCategory}>{item.financeExpenditureType.expense_type_name}</Text>
            <View style={styles.row}>
              
              <Text style={{color: 'gray', }}>By: </Text>
              <Text style={styles.expenseName}>{item.users.firstname} {item.users.lastname}</Text>

            </View>
            <Text style={styles.expenseDescription}>{item.description}</Text>
          </View>
          <View style={{ justifyContent: 'center', flexDirection: 'row'}}>

            <View style={styles.rowInfo}>

              <Text style={styles.expenseAmount}>-{formatCurrency(item.amount)}</Text>
              <Text style={styles.expenseDate}>{formatDate(item.expenditure_date)}</Text>

            </View>
          <View style={{ justifyContent: 'center', }}>
            <Icon name="chevron-forward" size={20} style={styles.forwardIcon} />
           </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  






  const renderPaginationExpense = () => {
    const totalPages = totalPageExpense;
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
        <TouchableOpacity
          onPress={ () => setCurrentPageExpense(currentPageExpense - 1)}
          disabled={currentPageExpense === 1}
          style={{ paddingHorizontal: 10 }}>
          <Text style={{ color: currentPageExpense === 1 ? COLORS.gray : COLORS.primary }}>Prev</Text>
        </TouchableOpacity>
        <Text>{currentPageExpense} / {totalPages}</Text>
        <TouchableOpacity
          onPress={()=> setCurrentPageExpense(currentPageExpense + 1)}
          disabled={currentPageExpense === totalPages}
          style={{ paddingHorizontal: 10 }}>
          <Text style={{ color: currentPageExpense === totalPages ? COLORS.gray : COLORS.primary }}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  };



  return (
    <ImageBackground
      source={require('../../../assets/images/background-expense-chart1.png')}
      style={{ flex: 1 }}
      resizeMode="stretch">
      <SafeAreaView style={{ flex: 1 }}>
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
            <Text style={{fontSize: 15, color: '#ccc'}}>
            Manage your finances efficiently with a clear view of your income and expenses.

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
            <Text style={{ fontSize: 15, marginLeft: 20, marginRight: 20 }}>To: </Text>
            <DateTimePicker
                style={{ flex: 1 }}
                value={dateTo}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                const currentDate = selectedDate || dateTo;
                setDateTo(currentDate);
                }}
            />
            </View>


            <View style={styles.sumContainer}>
              <Text style={styles.sumText}>Total Expense: </Text>
              <Text style={[styles.sumText, { color: 'red' }]}>-{(sumExpense)} </Text>
              </View>
          
       
           {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          ) :  (
            <FlatList
              data={expenses}
              renderItem={renderExpenseItem}
              keyExtractor={(item, index) => `${item.id_expenditure}_${index}`}
              onEndReachedThreshold={0.1}
              ListFooterComponent={renderPaginationExpense}
            />
          ) }
       
         
        </View>
        </View>

      </SafeAreaView>
      
    </ImageBackground>

  );
};

export default ExpenseScreen;
