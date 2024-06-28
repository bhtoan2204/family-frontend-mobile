import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, FlatList, TouchableOpacity, Modal, Image, ImageBackground, SafeAreaView } from 'react-native';
import moment from 'moment';
import { Expenditure } from 'src/interface/expense/getExpense';
import { Income } from 'src/interface/income/getIncome';
import { Family } from 'src/interface/family/family';
import { useSelector } from 'react-redux';
import { selectfamily } from 'src/redux/slices/FamilySlice';
import { ExpenseServices, IncomeServices } from 'src/services/apiclient';
import styles from './styles';
import { IncomeExpenseScreenProps } from 'src/navigation/NavigationTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from 'src/constants';

const screenWidth = Dimensions.get('window').width;

const IncomeExpenseScreen = ({ navigation }: IncomeExpenseScreenProps) => {
  const [expenses, setExpenses] = useState<Expenditure[]>([]);
  const [income, setIncome] = useState<Income[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expenditure[]>([]);
  const [filteredIncome, setFilteredIncome] = useState<Income[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
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

  const fetchDataExpense = async () => {
    try {
      const response = await ExpenseServices.getExpenseByDateRange(currentPage, itemsPerPage, selectedFilter, family.id_family);
      setTotalPageExpense(response.total_pages);
      setExpenses(prevExpenses => [...prevExpenses, ...response.expenses]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataIncome = async () => {
    try {
      const response = await IncomeServices.getIncomeByDateRange(currentPage, itemsPerPage, selectedFilter, family.id_family);
      setTotalPageIncome(response.total_pages);
      setIncome(prevIncome => [...prevIncome, ...response.income]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedCategoryType === 'Expense') {
      fetchDataExpense();
    }
  }, [selectedCategoryType, currentPage]);

  useEffect(() => {
    if (selectedCategoryType === 'Income') {
      fetchDataIncome();
    }
  }, [selectedCategoryType, currentPage]);

  const loadMoreData = () => {
    if (selectedCategoryType === 'Expense' && currentPage < totalPageExpense) {
      setCurrentPage(prevPage => prevPage + 1);
    } else if (selectedCategoryType === 'Income' && currentPage < totalPageIncome) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const filter = (option: number) => {
    setFilterModalVisible(false);
    setSelectedFilter(option);
    setCurrentPage(1); 
    if (selectedCategoryType === 'Expense') {
      setExpenses([]);
    } else {
      setIncome([]);
    }
  };

  const formatDate = (isoDateTime: string) => {
    return moment(isoDateTime).format('DD/MM/YYYY HH:mm');
  };

  const selectOption = (option: string) => {
    setSelectedCategoryType(option);
  };

  const renderExpenseItem = ({ item }: { item: Expenditure }) => (
    <TouchableOpacity style={styles.expenseItem}>
      <View style={styles.itemContainer}>
        <View style={styles.expenseContent}>
          <View>
            <Text style={styles.expenseCategory}>{item.expense_category}</Text>
            <View style={styles.row}>
              <Text>Amount: </Text>
              <Text style={styles.expenseAmount}>-{item.expense_amount}đ</Text>
            </View>
            <Text style={styles.expenseDescription}>{item.description}</Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <View style={styles.row}>
              <Text>By: </Text>
              <Text style={styles.expenseName}>{item.name}</Text>
            </View>
            <Text style={styles.expenseDate}>{formatDate(item.expenditure_date)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderIncomeItem = ({ item }: { item: Income }) => (
    <TouchableOpacity style={styles.expenseItem}>
      <View style={styles.itemContainer}>
        <View style={styles.expenseContent}>
          <View>
            <Text style={styles.expenseCategory}>{item.income_category}</Text>
            <View style={styles.row}>
              <Text>Amount: </Text>
              <Text style={styles.incomeAmount}>+{item.income_amount}đ</Text>
            </View>
            <Text style={styles.expenseDescription}>{item.description}</Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <View style={styles.row}>
              <Text>By: </Text>
              <Text style={styles.expenseName}>{item.name}</Text>
            </View>
            <Text style={styles.expenseDate}>{formatDate(item.income_date)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleFamilySelection = (selectedFamily: Family) => {
    setIsFamilyModalOpen(false);
    setSelectedFamily(selectedFamily.id_family);
  };


  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };
  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };
  
  const renderPagination = () => {
    const totalPages = totalPageExpense;
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
        <TouchableOpacity
          onPress={handlePrevPage}
          disabled={currentPage === 1}
          style={{ paddingHorizontal: 10 }}>
          <Text style={{ color: currentPage === 1 ? COLORS.gray : COLORS.primary }}>Prev</Text>
        </TouchableOpacity>
        <Text>{currentPage} / {totalPages}</Text>
        <TouchableOpacity
          onPress={handleNextPage}
          disabled={currentPage === totalPages}
          style={{ paddingHorizontal: 10 }}>
          <Text style={{ color: currentPage === totalPages ? COLORS.gray : COLORS.primary }}>Next</Text>
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
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
              <Icon name="arrow-back" size={30} style={styles.backButton} />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerText}>Expense Analysis</Text>
            </View>
            <TouchableOpacity style={styles.headerButton} onPress={() => setFilterModalVisible(!filterModalVisible)}>
              <Icon name="filter" size={30} style={styles.filterButton} />
            </TouchableOpacity>
          </View>

          <View style={styles.containerTab}>
            <TouchableOpacity
              onPress={() => selectOption('Income')}
              style={[styles.tabButton, selectedCategoryType === 'Income' && styles.selectedTabButton]}>
              <Text style={styles.tabButtonText}>Income</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => selectOption('Expense')}
              style={[styles.tabButton, selectedCategoryType === 'Expense' && styles.selectedTabButton]}>
              <Text style={styles.tabButtonText}>Expense</Text>
            </TouchableOpacity>
            <View style={[styles.bottomLine, { left: selectedCategoryType === 'Income' ? 0 : '50%' }]} />
          </View>
          {selectedCategoryType === 'Expense' && (
            <View style={styles.sumContainer}>
              <Text style={styles.sumText}>Total Expense: {sumExpense}</Text>
            </View>
          )}
          {selectedCategoryType === 'Income' && (
            <View style={styles.sumContainer}>
              <Text style={styles.sumText}>Total Income: {sumIncome}</Text>
            </View>
          )}
          {/* {selectedCategoryType === 'Expense' && (
            // <FlatList
            //   data={expenses}
            //   renderItem={renderExpenseItem}
            //   keyExtractor={(item, index) => `${item.id_expenditure}_${index}`}
            //   onEndReached={loadMoreData}
            //   onEndReachedThreshold={0.1}
            //   ListFooterComponent={renderPagination}
            //   />
          )}
          {selectedCategoryType === 'Income' && (
            // <FlatList
            //   data={income}
            //   renderItem={renderIncomeItem}
            //   keyExtractor={(item, index) => `${item.id_income_source}_${index}`}
            //   onEndReached={loadMoreData}
            //   onEndReachedThreshold={0.1}
            //   ListFooterComponent={renderPagination}
            //   />
          )} */}
          <Modal
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
          </Modal>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default IncomeExpenseScreen;
