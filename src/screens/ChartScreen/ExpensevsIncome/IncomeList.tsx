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
import { IncomeExpenseScreenProps } from 'src/navigation/NavigationTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from 'src/constants';
import { selectProfile } from 'src/redux/slices/ProfileSclice';
import { setExpense } from 'src/redux/slices/ExpenseAnalysis';
import { setIncomeDetails } from 'src/redux/slices/IncomeAnalysis';
const screenWidth = Dimensions.get('window').width;
import DateTimePicker from '@react-native-community/datetimepicker';

const IncomeExpenseScreen = ({ navigation }: IncomeExpenseScreenProps) => {
  const [expenses, setExpenses] = useState<Expenditure[]>([]);
  const [income, setIncome] = useState<Income[]>([]);
  const [currentPageExpense, setCurrentPageExpense] = useState<number>(1);
  const [currentPageIncome, setCurrentPageIncome] = useState<number>(1);

  const [totalPageExpense, setTotalPageExpense] = useState<number>(1);
  const [totalPageIncome, setTotalPageIncome] = useState<number>(1);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<number>(30);
  const [selectedCategoryType, setSelectedCategoryType] = useState<string>('Income');
  const [sumIncome, setSumIncome] = useState<number>(0);
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

  const fetchDataExpense = async (page: number, reset: boolean = false) => {
    // setIsLoading(true);
    // try {
    //   console.log(page, itemsPerPage, selectedFilter, family.id_family)
    //   // const response = await ExpenseServices.getExpenseByDateRange(page, itemsPerPage, selectedFilter, family.id_family);
    //   setTotalPageExpense(response.total_pages);
    //   setExpenses(prevExpenses => reset ? response.expenses : [...prevExpenses, ...response.expenses]);
    //   setSumExpense(response.total_expense);
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const fetchDataIncome = async (page: number, reset: boolean = false) => {
    // setIsLoading(true);
    // try {
    //   const response = await IncomeServices.getIncomeByDateRange(page, itemsPerPage, selectedFilter, family.id_family);
    //   setTotalPageIncome(response.total_pages);
    //   setIncome(prevIncome => reset ? response.income : [...prevIncome, ...response.income]);
    //   setSumIncome(response.total_income);
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setIsLoading(false);
    // }
  };
  useEffect(() => {
    setCurrentPageExpense(1);

      fetchDataExpense(currentPageExpense, true);
    
  }, [selectedFilter]);

  useEffect(() => {

      fetchDataExpense(currentPageExpense, true);
    
  }, [currentPageExpense]);

  useEffect(() => {

      fetchDataIncome(currentPageIncome, true);
    
  }, [currentPageIncome]);

  useEffect(() => {
    setCurrentPageIncome(1);

      fetchDataIncome(currentPageIncome, true);
    
  }, [selectedFilter]);

  const filter = (option: number) => {
    setFilterModalVisible(false);
    setSelectedFilter(option);
    setCurrentPageExpense(1);
    setCurrentPageIncome(1);

  };

  const formatDate = (isoDateTime: string) => {
    return moment(isoDateTime).format('DD/MM/YYYY HH:mm');
  };

  const selectOption = (option: string) => {
    setSelectedCategoryType(option);
 

  };
  const formatCurrency = (amount: any) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };
  const handlePressExpenseItem = async (item: Expenditure)=> {
    await dispatch(setExpense(item));
    navigation.navigate('ExpenseDetailScreen');
  }
  const renderExpenseItem = ({ item }: { item: Expenditure }) => (
    <TouchableOpacity onPress={() => {handlePressExpenseItem(item)}} style={styles.expenseItem}>
      <View style={styles.itemContainer}>
        <View style={styles.expenseContent}>
          <View>
            <Text style={styles.expenseCategory}>{item.expense_category}</Text>
            <View style={styles.row}>
              
              <Text style={{color: 'gray', }}>By: </Text>
              <Text style={styles.expenseName}>{item.name}</Text>

            </View>
            <Text style={styles.expenseDescription}>{item.description}</Text>
          </View>
          <View style={{ justifyContent: 'center', flexDirection: 'row'}}>

            <View style={styles.rowInfo}>

              <Text style={styles.expenseAmount}>-{formatCurrency(item.expense_amount)}</Text>
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
  const handlePressIncomeItem = async (item: Income)=> {
    await dispatch(setIncomeDetails(item));
    navigation.navigate('IncomeStack', {screen: 'IncomeDetailScreen'});
  }
  
  const renderIncomeItem = ({ item }: { item: Income }) => (
    <TouchableOpacity onPress={() => {handlePressIncomeItem(item)}} style={styles.expenseItem}>
      <View style={styles.itemContainer}>
        <View style={styles.expenseContent}>
          <View>
            <Text style={styles.expenseCategory}>{item.income_category}</Text>
            <View style={styles.row}>
              
              <Text style={{color: 'gray', }}>By: </Text>
              <Text style={styles.expenseName}>{item.name}</Text>

            </View>
            <Text style={styles.expenseDescription}>{item.description}</Text>
          </View>
          <View style={{ justifyContent: 'center', flexDirection: 'row'}}>

            <View style={styles.rowInfo}>

              <Text style={styles.incomeAmount}>-{formatCurrency(item.income_amount)}</Text>
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

  const handleFamilySelection = (selectedFamily: Family) => {
    setIsFamilyModalOpen(false);
    setSelectedFamily(selectedFamily.id_family);
  };



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
              <Text style={styles.headerText}>Expense vs Income</Text>
            </View>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => setFilterModalVisible(!filterModalVisible)}>
              <Icon name="filter" size={30} style={styles.filterButton} />
            </TouchableOpacity>
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
              Hello, {profile.firstname}
            </Text>
            <Text style={{fontSize: 15, color: 'white'}}>
            Manage your finances efficiently with a clear view of your income and expenses.

            </Text>
          </View>
        <View style={{backgroundColor: '#f0f0f0', flex: 1,}}>
          <View style={styles.containerTab}>
            <TouchableOpacity
              onPress={() => selectOption('Income')}
              style={[
                styles.tabButton,
                selectedCategoryType === 'Income' && styles.selectedTabButton,
                { borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }
              ]}>
              <Text style={[styles.tabButtonText, selectedCategoryType === 'Income' && styles.selectedTabText]}>Income</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => selectOption('Expense')}
              style={[
                styles.tabButton,
                selectedCategoryType === 'Expense' && styles.selectedTabButton,
                { borderTopRightRadius: 20, borderBottomRightRadius: 20 }
              ]}>
              <Text style={[styles.tabButtonText, selectedCategoryType === 'Expense' && styles.selectedTabText]}>Expense</Text>
            </TouchableOpacity>
            <View
              style={[
                styles.bottomLine,
                { left: selectedCategoryType === 'Income' ? 0 : '50%', borderRadius: 20 }
              ]}
            />
          </View>


          {selectedCategoryType === 'Expense' && (
            <View style={styles.sumContainer}>
              <Text style={styles.sumText}>Total Expense: </Text>
              <Text style={[styles.sumText, { color: 'red' }]}>-{formatCurrency(sumExpense)} </Text>
              </View>
          )}
          {selectedCategoryType === 'Income' && (
            <View style={styles.sumContainer}>
              <Text style={styles.sumText}>Total Income: </Text>
              <Text style={[styles.sumText, { color: 'green' }]}> +{formatCurrency(sumIncome)} </Text>
              </View>
          )}
           {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          ) : selectedCategoryType === 'Expense' ? (
            <FlatList
              data={expenses}
              renderItem={renderExpenseItem}
              keyExtractor={(item, index) => `${item.id_expenditure}_${index}`}
              onEndReachedThreshold={0.1}
              ListFooterComponent={renderPaginationExpense}
            />
          ) : (
            <FlatList
              data={income}
              renderItem={renderIncomeItem}
              keyExtractor={(item, index) => `${item.id_income_source}_${index}`}
              onEndReachedThreshold={0.1}
              ListFooterComponent={renderPaginationIncome}
            />
          )}
       
          {/* <Modal
            visible={filterModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setFilterModalVisible(false)}>
            <TouchableOpacity
              style={styles.modalContainer}
              activeOpacity={1}
              onPress={() => setFilterModalVisible(false)}>
              <View style={styles.modalBackground}>
                <View style={styles.dropdownMenu}>
                  <TouchableOpacity
                    style={styles.filterItem}
                    onPress={() => filter(30)}>
                    <Image
                      source={{ uri: filterUri }}
                      style={styles.avatar}
                    />
                    <Text style={styles.text}>Last 30 Days</Text>
                    {selectedFilter === 30 && (
                      <Icon
                        name="checkmark"
                        size={20}
                        style={styles.checkIcon}
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.filterItem}
                    onPress={() => filter(60)}>
                    <Image
                      source={{ uri: filterUri }}
                      style={styles.avatar}
                    />
                    <Text style={styles.text}>Last 60 Days</Text>
                    {selectedFilter === 60 && (
                      <Icon
                        name="checkmark"
                        size={20}
                        style={styles.checkIcon}
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.filterItem}
                    onPress={() => filter(90)}>
                    <Image
                      source={{ uri: filterUri }}
                      style={styles.avatar}
                    />
                    <Text style={styles.text}>Last 90 Days</Text>
                    {selectedFilter === 90 && (
                      <Icon
                        name="checkmark"
                        size={20}
                        style={styles.checkIcon}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </Modal> */}
        </View>
        </View>

      </SafeAreaView>
      
    </ImageBackground>

  );
};

export default IncomeExpenseScreen;
