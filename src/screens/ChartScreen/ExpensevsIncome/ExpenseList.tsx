import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import {Expenditure} from 'src/interface/expense/getExpense';
import {Income} from 'src/interface/income/getIncome';
import {Family} from 'src/interface/family/family';
import {useDispatch, useSelector} from 'react-redux';
import {selectSelectedFamily} from 'src/redux/slices/FamilySlice';
import {ExpenseServices, IncomeServices} from 'src/services/apiclient';
import styles from './styles';
import {ExpenseScreenProps} from 'src/navigation/NavigationTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from 'src/constants';
import {selectProfile} from 'src/redux/slices/ProfileSclice';
import {
  getSumExpense,
  selectExpenses,
  setExpenses,
  setSelectedExpense,
  setSumExpense,
} from 'src/redux/slices/ExpenseAnalysis';
const screenWidth = Dimensions.get('window').width;
import DateTimePicker from '@react-native-community/datetimepicker';
import {DailyExpense} from 'src/interface/expense/DailyExpense';
import {setDate} from 'date-fns';
import {getTranslate, selectLocale} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';

const ExpenseScreen = ({navigation}: ExpenseScreenProps) => {
  const expenses = useSelector(selectExpenses);
  const [currentPageExpense, setCurrentPageExpense] = useState<number>(1);

  const [totalPageExpense, setTotalPageExpense] = useState<number>(1);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<number>(30);
  const sumExpense = useSelector(getSumExpense);
  const [selectedFamily, setSelectedFamily] = useState<number | undefined>(
    undefined,
  );
  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);
  const filterUri =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL0i6wYs08kFWJKDu9843LWdW43Xom8IW89cIZREgBKg&s';
  const familyUri =
    'https://t3.ftcdn.net/jpg/06/75/38/14/360_F_675381468_yjYEK9SvCRYpRUyKNRWsnArIalbMeBU4.jpg';
  const family = useSelector(selectSelectedFamily);
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let profile = useSelector(selectProfile);
  const dispatch = useDispatch();
  const translate = useSelector(getTranslate);
  const color = useThemeColors();
  const location = useSelector(selectLocale);

  const [dateTo, setDateTo] = useState(new Date());
  const [dateFrom, setDateFrom] = useState(() => {
    const date = new Date(dateTo);
    date.setDate(date.getDate() - 30);
    return date;
  });

  const fetchDataExpense = async (page: number, reset: boolean = false) => {
    setIsLoading(true);
    try {
      const formattedDateFrom = moment(dateFrom).format('YYYY-MM-DD');
      const formattedDateTo = moment(dateTo).format('YYYY-MM-DD');
      const response = await ExpenseServices.getExpenseByDateRange(
        page,
        itemsPerPage,
        family.id_family,
        formattedDateFrom,
        formattedDateTo,
      );
      if (response) {
        dispatch(setExpenses(response.data));
        setTotalPageExpense(Math.ceil(response.total / itemsPerPage));
        dispatch(setSumExpense(response.sum));
      }
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

  const formatDate = (isoDateTime: string) => {
    return moment(isoDateTime).format('DD/MM/YYYY HH:mm');
  };

  const formatCurrency = (amount: any) => {
    return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  };
  const handlePressExpenseItem = async (item: DailyExpense) => {
    await dispatch(setSelectedExpense(item));
    navigation.navigate('ExpenseDetailScreen');
  };
  const renderExpenseItem = ({item}: {item: DailyExpense}) => (
    <TouchableOpacity
      onPress={() => {
        handlePressExpenseItem(item);
      }}
      style={[styles.expenseItem, {backgroundColor: color.white}]}>
      <View style={styles.itemContainer}>
        <View style={styles.expenseContent}>
          <View>
            {item.financeExpenditureType ? (
              <Text style={[styles.expenseCategory, {color: color.text}]}>
                {location === 'en'
                  ? item.financeExpenditureType.expense_type_name
                  : item.financeExpenditureType.expense_type_name_vn}
              </Text>
            ) : (
              <Text style={[styles.expenseCategory, {color: color.text}]}>
                {translate('Other')}
              </Text>
            )}
            {item.users && (
              <View style={styles.row}>
                <Text style={{color: 'gray'}}>{translate('Create by')}: </Text>

                <Text style={styles.expenseName}>
                  {item.users.firstname} {item.users.lastname}
                </Text>
              </View>
            )}
            {item.utilities && (
              <View style={styles.row}>
                {/* <Text style={{color: 'gray'}}>
                  {translate('Category utility')}:{' '}
                </Text> */}

                <Text style={styles.expenseName}>{/* {item} */}</Text>
              </View>
            )}
            <Text style={styles.expenseDescription}>{item.description}</Text>
          </View>
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            <View style={styles.rowInfo}>
              <Text style={styles.expenseAmount}>
                -{formatCurrency(item.amount)}
              </Text>
              <Text style={styles.expenseDate}>
                {formatDate(item.expenditure_date)}
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Icon name="chevron-forward" size={20} color={color.text} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderPaginationExpense = () => {
    const totalPages = totalPageExpense;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 10,
        }}>
        <TouchableOpacity
          onPress={() => setCurrentPageExpense(currentPageExpense - 1)}
          disabled={currentPageExpense === 1}
          style={{paddingHorizontal: 10}}>
          <Text
            style={{
              color: currentPageExpense === 1 ? COLORS.gray : color.text,
            }}>
            {translate('Prev')}
          </Text>
        </TouchableOpacity>
        <Text style={{color: color.text}}>
          {currentPageExpense} / {totalPages}
        </Text>
        <TouchableOpacity
          onPress={() => setCurrentPageExpense(currentPageExpense + 1)}
          disabled={currentPageExpense === totalPages}
          style={{paddingHorizontal: 10}}>
          <Text
            style={{
              color:
                currentPageExpense === totalPages ? COLORS.gray : color.text,
            }}>
            {translate('Next')}
          </Text>
        </TouchableOpacity>
      </View>
    );
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
              <Text style={styles.headerText}>
                {translate('ExpenseAnalysis')}
              </Text>
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
              {translate('Hello')}, {profile.firstname} {profile.lastname}
            </Text>
            <Text style={{fontSize: 15, color: '#ccc'}}>
              {translate('ExpensevsIncomeDetail')}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: color.background,
              height: 660,
              borderTopRightRadius: 40,
              borderTopLeftRadius: 40,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text style={{fontSize: 15, marginLeft: 20, color: color.text}}>
                {translate('From')}{' '}
              </Text>
              <DateTimePicker
                style={{flex: 1}}
                value={dateFrom}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || dateFrom;
                  setDateFrom(currentDate);
                }}
              />
              <Text style={{fontSize: 15, marginLeft: 20, color: color.text}}>
                {translate('To')}{' '}
              </Text>
              <DateTimePicker
                style={{flex: 1, marginRight: 20}}
                value={dateTo}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || dateTo;
                  setDateTo(currentDate);
                }}
              />
            </View>

            <View
              style={[
                styles.sumContainer,
                {backgroundColor: color.background},
              ]}>
              <Text style={[styles.sumText, {color: color.text}]}>
                Total Expense:{' '}
              </Text>
              <Text style={[styles.sumText, {color: 'red'}]}>
                -{formatCurrency(sumExpense)}{' '}
              </Text>
            </View>

            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
              </View>
            ) : (
              <FlatList
                data={expenses}
                renderItem={renderExpenseItem}
                keyExtractor={(item, index) =>
                  `${item.id_expenditure}_${index}`
                }
                onEndReachedThreshold={0.1}
                ListFooterComponent={renderPaginationExpense}
              />
            )}
          </View>
          <View style={{backgroundColor: color.background, height: 100}}></View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ExpenseScreen;
