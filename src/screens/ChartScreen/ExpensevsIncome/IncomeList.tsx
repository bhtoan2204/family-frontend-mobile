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
import {useDispatch, useSelector} from 'react-redux';
import {selectSelectedFamily} from 'src/redux/slices/FamilySlice';
import {IncomeServices} from 'src/services/apiclient';
import styles from './styles';
import {IncomeScreenProps} from 'src/navigation/NavigationTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from 'src/constants';
import {selectProfile} from 'src/redux/slices/ProfileSclice';
import DateTimePicker from '@react-native-community/datetimepicker';
import {DailyIncome} from 'src/interface/income/IncomeDaily';
import {
  getIncomeList,
  getSumIncome,
  setIncomeList,
  setSelectedIncome,
  setSumIncome,
} from 'src/redux/slices/IncomeAnalysis';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {getTranslate, selectLocale} from 'src/redux/slices/languageSlice';

const IncomeScreen = ({navigation}: IncomeScreenProps) => {
  const income = useSelector(getIncomeList);

  const [currentPageIncome, setCurrentPageIncome] = useState<number>(1);

  const [totalPageIncome, setTotalPageIncome] = useState<number>(1);
  const [selectedCategoryType, setSelectedCategoryType] =
    useState<string>('Income');
  const sumIncome = useSelector(getSumIncome);
  const family = useSelector(selectSelectedFamily);
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let profile = useSelector(selectProfile);
  const dispatch = useDispatch();
  const translate = useSelector(getTranslate);
  const color = useThemeColors();
  const [dateTo, setDateTo] = useState(new Date());
  const location = useSelector(selectLocale);

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
      const response = await IncomeServices.getIncomeByDateRange(
        page,
        itemsPerPage,
        family.id_family,
        formattedDateFrom,
        formattedDateTo,
      );
      if (response) {
        setTotalPageIncome(Math.ceil(response.total / itemsPerPage));
        dispatch(setIncomeList(response.data));
        dispatch(setSumIncome(response.sum));
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
  }, [dateFrom, dateTo]);

  const formatDate = (isoDateTime: string) => {
    return moment(isoDateTime).format('DD/MM/YYYY HH:mm');
  };

  const formatCurrency = (amount: any) => {
    return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  };

  const handlePressIncomeItem = async (item: DailyIncome) => {
    await dispatch(setSelectedIncome(item));
    navigation.navigate('IncomeStack', {screen: 'IncomeDetailScreen'});
  };

  const renderIncomeItem = ({item}: {item: DailyIncome}) => (
    <TouchableOpacity
      onPress={() => {
        handlePressIncomeItem(item);
      }}
      style={[styles.expenseItem, {backgroundColor: color.white}]}>
      <View style={styles.itemContainer}>
        <View style={styles.expenseContent}>
          <View>
            <Text style={[styles.expenseCategory, {color: color.text}]}>
              {item.financeIncomeSource &&
              item.financeIncomeSource.income_source_name
                ? location === 'en'
                  ? item.financeIncomeSource.income_source_name
                  : item.financeIncomeSource.income_source_name_vn
                : translate('Other')}
            </Text>
            <View style={styles.row}>
              <Text style={{color: 'gray'}}>{translate('Create by')}: </Text>
              <Text style={styles.expenseName}>
                {item.users && item.users.firstname && item.users.lastname
                  ? `${item.users.firstname} ${item.users.lastname}`
                  : ''}
              </Text>
            </View>
            <Text
              style={[styles.expenseDescription, {color: color.textSubdued}]}>
              {item.description}
            </Text>
          </View>
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            <View style={styles.rowInfo}>
              <Text style={styles.incomeAmount}>
                +{formatCurrency(item.amount)}
              </Text>
              <Text style={[styles.expenseDate, {color: color.textSubdued}]}>
                {formatDate(item.income_date)}
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

  const renderPaginationIncome = () => {
    const totalPages = totalPageIncome;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 10,
        }}>
        <TouchableOpacity
          onPress={() => setCurrentPageIncome(currentPageIncome - 1)}
          disabled={currentPageIncome === 1}
          style={{paddingHorizontal: 10}}>
          <Text
            style={{color: currentPageIncome === 1 ? COLORS.gray : color.text}}>
            {translate('Prev')}
          </Text>
        </TouchableOpacity>
        <Text style={{color: color.text}}>
          {currentPageIncome} / {totalPages}
        </Text>
        <TouchableOpacity
          onPress={() => setCurrentPageIncome(currentPageIncome + 1)}
          disabled={currentPageIncome === totalPages}
          style={{paddingHorizontal: 10}}>
          <Text
            style={{
              color:
                currentPageIncome === totalPages ? COLORS.gray : color.text,
            }}>
            {translate('Next')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/income-detail-bg.png')}
      style={{flex: 1}}
      resizeMode="stretch">
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.headerButton}>
              <Icon name="arrow-back" size={30} style={styles.backButton} />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerText}>
                {translate('Income Analysis')}
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
            <Text style={{fontSize: 15, color: 'white'}}>
              {translate('ExpensevsIncomeDetailIncome')}
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

            <View style={styles.containerTab}>
              <View
                style={[
                  styles.bottomLine,
                  {
                    left: selectedCategoryType === 'Income' ? 0 : '50%',
                    borderRadius: 20,
                  },
                ]}
              />
            </View>

            <View
              style={[
                styles.sumContainer,
                {backgroundColor: color.background},
              ]}>
              <Text style={[styles.sumText, {color: color.text}]}>
                {translate('Total Income')}:{' '}
              </Text>
              <Text style={[styles.sumText, {color: 'green'}]}>
                {' '}
                +{formatCurrency(sumIncome)}{' '}
              </Text>
            </View>

            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
              </View>
            ) : (
              <FlatList
                data={income}
                renderItem={renderIncomeItem}
                keyExtractor={(item, index) =>
                  `${item.id_income_source}_${index}`
                }
                onEndReachedThreshold={0.1}
                ListFooterComponent={renderPaginationIncome}
              />
            )}
          </View>
          <View style={{backgroundColor: color.background, height: 100}}></View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default IncomeScreen;
