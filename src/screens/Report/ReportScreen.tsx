import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {ExpenditureScreenProps} from 'src/navigation/NavigationTypes';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from 'src/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  getSumExpense,
  setExpenses,
  setSelectedOption,
  setSumExpense,
} from 'src/redux/slices/ExpenseAnalysis';
import {
  getSumIncome,
  setSelectedOptionIncome,
  setSumIncome,
} from 'src/redux/slices/IncomeAnalysis';
import moment from 'moment';
import {ExpenseServices, IncomeServices} from 'src/services/apiclient';
import {selectSelectedFamily} from 'src/redux/slices/FamilySlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import i18n from 'src/components/i18next/i18n';
import {getTranslate, selectLocale} from 'src/redux/slices/languageSlice';

const ReportScreen = ({navigation}: ExpenditureScreenProps) => {
  const appCurrentLocale = useSelector(selectLocale);
  const color = useThemeColors();
  const dispatch = useDispatch();
  const family = useSelector(selectSelectedFamily);
  const sumExpense = useSelector(getSumExpense);
  const sumIncome = useSelector(getSumIncome);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dateTo, setDateTo] = useState(new Date());
  const translate = useSelector(getTranslate);
  const [dateFrom, setDateFrom] = useState(() => {
    const date = new Date(dateTo);
    date.setDate(date.getDate() - 30);
    return date;
  });
  useEffect(() => {
    fetchDataExpense();
    fetchDataIncome();
  }, []);
  const fetchDataExpense = async () => {
    setIsLoading(false);
    try {
      const formattedDateFrom = moment(dateFrom).format('YYYY-MM-DD');
      const formattedDateTo = moment(dateTo).format('YYYY-MM-DD');
      const response = await ExpenseServices.getExpenseByDateRange(
        1,
        10,
        family.id_family,
        formattedDateFrom,
        formattedDateTo,
      );
      if (response) {
        dispatch(setSumExpense(response.sum));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchDataIncome = async () => {
    setIsLoading(false);
    try {
      const formattedDateFrom = moment(dateFrom).format('YYYY-MM-DD');
      const formattedDateTo = moment(dateTo).format('YYYY-MM-DD');
      const response = await IncomeServices.getIncomeByDateRange(
        1,
        10,
        family.id_family,
        formattedDateFrom,
        formattedDateTo,
      );
      if (response) {
        dispatch(setSumIncome(response.sum));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const pressExpenseDay = () => {
    dispatch(setSelectedOption('Day'));
    navigation.navigate('ExpenseStack', {screen: 'ChartExpense'});
  };
  const pressExpenseMonth = () => {
    dispatch(setSelectedOption('Month'));
    navigation.navigate('ExpenseStack', {screen: 'ChartExpense'});
  };

  const pressExpenseYear = () => {
    dispatch(setSelectedOption('Year'));
    navigation.navigate('ExpenseStack', {screen: 'ChartExpense'});
  };

  const pressIncomeDay = () => {
    dispatch(setSelectedOptionIncome('Day'));
    navigation.navigate('IncomeStack', {screen: 'ChartIncomeScreen'});
  };
  const pressIncomeMonth = () => {
    dispatch(setSelectedOptionIncome('Month'));
    navigation.navigate('IncomeStack', {screen: 'ChartIncomeScreen'});
  };

  const pressIncomeYear = () => {
    dispatch(setSelectedOptionIncome('Year'));
    navigation.navigate('IncomeStack', {screen: 'ChartIncomeScreen'});
  };

  const scaleAnim = new Animated.Value(1);
  const scaleAnimation = useRef(new Animated.ValueXY({x: 1, y: 1})).current;

  const [selectedButton, setSelectedButton] = useState('expenseAnalysis');
  const [currentScreen, setCurrentScreen] = useState('expenseAnalysis');
  const [currentLocale, setCurrentLocale] = useState(i18n.locale);
  const handleButtonPress = (
    buttonName:
      | 'expenseAnalysis'
      | 'incomeAnalysis'
      | 'expenseIncome'
      | 'asset',
  ) => {
    setSelectedButton(buttonName);
    setCurrentScreen(buttonName);
  };

  const renderExpenseAnalysisScreen = () => (
    <View style={{flex: 1}}>
      <Image
        source={require('../../assets/images/expense-bg.png')}
        style={{flex: 1, width: '100%', height: '100%'}}
        resizeMode="contain"
      />
      <TouchableOpacity
        onPress={pressExpenseDay}
        style={{
          position: 'absolute',
          right: 110,
          bottom: 170,
          width: 150,
          height: 150,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animated.Image
          source={
            appCurrentLocale === 'en'
              ? require('../../assets/images/bar-chart.png')
              : require('../../assets/images/bar-chart-vn.png') // Assuming you have a Vietnamese version of the image
          }
          style={{
            width: '100%',
            height: '100%',
            transform: [{scale: scaleAnim}],
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={pressExpenseMonth}
        style={{
          position: 'absolute',
          left: 190,
          bottom: 350,
          width: 210,
          height: 210,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animated.Image
          source={
            appCurrentLocale === 'en'
              ? require('../../assets/images/pie-chart.png')
              : require('../../assets/images/pie-chart-vn.png') // Assuming you have a Vietnamese version of the image
          }
          style={{
            width: '100%',
            height: '100%',
            transform: [{scale: scaleAnim}],
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={pressExpenseYear}
        style={{
          position: 'absolute',
          right: 180,
          top: 35,
          width: 250,
          height: 150,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animated.Image
          source={
            appCurrentLocale === 'en'
              ? require('../../assets/images/line-chart.png')
              : require('../../assets/images/line-chart-vn.png') // Assuming you have a Vietnamese version of the image
          }
          style={{
            width: '100%',
            height: '100%',
            transform: [{scale: scaleAnim}],
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );

  const renderIncomeAnalysisScreen = () => (
    <View style={{flex: 1}}>
      <Image
        source={require('../../assets/images/income-bg.png')}
        style={{flex: 1, width: '100%', height: '100%'}}
        resizeMode="contain"
      />
      <TouchableOpacity
        onPress={pressIncomeDay}
        style={{
          position: 'absolute',
          right: 120,
          bottom: 180,
          width: 145,
          height: 145,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animated.Image
          source={
            appCurrentLocale === 'en'
              ? require('../../assets/images/income-bar-chart.png')
              : require('../../assets/images/income-bar-chart-vn.png') // Assuming you have a Vietnamese version of the image
          }
          style={{
            width: '100%',
            height: '100%',
            transform: [{scale: scaleAnim}],
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={pressIncomeMonth}
        style={{
          position: 'absolute',
          right: 180,
          bottom: 350,
          width: 210,
          height: 210,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animated.Image
          source={
            appCurrentLocale === 'en'
              ? require('../../assets/images/income-month-chart.png')
              : require('../../assets/images/income-month-chart-vn.png') // Assuming you have a Vietnamese version of the image
          }
          style={{
            width: '100%',
            height: '100%',
            transform: [{scale: scaleAnim}],
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={pressIncomeYear}
        style={{
          position: 'absolute',
          left: 130,
          top: 15,
          width: 250,
          height: 150,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animated.Image
          source={
            appCurrentLocale === 'en'
              ? require('../../assets/images/income-line-chart.png')
              : require('../../assets/images/income-line-chart-vn.png') // Assuming you have a Vietnamese version of the image
          }
          style={{
            width: '100%',
            height: '100%',
            transform: [{scale: scaleAnim}],
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
  const formatCurrency = (amount: any) => {
    return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  };
  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1.2,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  }, [sumIncome, sumExpense]);

  const renderExVsInScreen = () => (
    //navigation.navigate('ExpenseStack', {screen: 'ExpenseScreen'});
    <View style={{flex: 1}}>
      <Image
        source={require('../../assets/images/expense_income.png')}
        style={{flex: 1, width: '100%', height: '100%'}}
        resizeMode="contain"
      />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ExpenseStack', {screen: 'ExpenseScreen'})
        }
        style={{
          position: 'absolute',
          right: 160,
          bottom: 130,
          width: 210,
          height: 210,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animated.Image
          source={
            appCurrentLocale === 'en'
              ? require('../../assets/images/expense.png')
              : require('../../assets/images/expense-vn.png') // Assuming you have a Vietnamese version of the image
          }
          style={{
            width: '100%',
            height: '100%',
            transform: [{scale: scaleAnim}],
          }}
          resizeMode="contain"
        />
        <Animated.Text
          style={[
            styles.animatedTextExpense,
            {
              transform: [{scale: scaleAnim}],
            },
          ]}>
          -{formatCurrency(sumExpense)}
        </Animated.Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('IncomeStack', {screen: 'IncomeScreen'})
        }
        style={{
          position: 'absolute',
          right: 140,
          bottom: 380,
          width: 210,
          height: 210,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.Image
          source={
            appCurrentLocale === 'en'
              ? require('../../assets/images/income.png')
              : require('../../assets/images/income-vn.png') // Assuming you have a Vietnamese version of the image
          }
          style={{
            width: '100%',
            height: '100%',
            transform: [{scale: scaleAnim}],
          }}
          resizeMode="contain"
        />
        <Animated.Text
          style={[
            styles.animatedTextIncome,
            {
              transform: [{scale: scaleAnim}],
            },
          ]}>
          + {formatCurrency(sumIncome)}
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );

  const renderAsset = () => (
    //navigation.navigate('ExpenseStack', {screen: 'AssetScreen'});

    <View style={{flex: 1}}>
      <View style={{marginTop: 35, marginLeft: 15}}>
        <Text
          style={{
            color: '#BD9BCD',
            fontWeight: 'bold',
            fontSize: 40,
            width: '80%',
            marginBottom: 15,
          }}>
          {translate('AssetDetail1')}
        </Text>
        <Text style={{color: color.textSubdued, fontSize: 14}}>
          {translate('AssetDetail')}
        </Text>
      </View>
      <Image
        source={require('../../assets/images/asset-bg.png')}
        style={{
          position: 'absolute',
          width: 350,
          height: 500,
          left: 20,
          top: 65,
        }}
        resizeMode="contain"
      />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ExpenseStack', {screen: 'AssetScreen'})
        }
        style={{
          position: 'absolute',
          right: 105,
          bottom: 160,
          width: 210,
          height: 210,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animated.Image
          source={require('../../assets/images/asset-car.png')}
          style={{
            position: 'absolute',
            width: 340,
            height: 340,
            transform: [{scale: scaleAnim}],
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case 'expenseAnalysis':
        return renderExpenseAnalysisScreen();
      case 'incomeAnalysis':
        return renderIncomeAnalysisScreen();
      case 'expenseIncome':
        return renderExVsInScreen();
      case 'asset':
        return renderAsset();
    }
  };

  useEffect(() => {
    // Animation for scaleAnim remains the same
    const loopAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );

    // Adjusted Animation for scaleAnimation
    const movingAnimationX = Animated.timing(scaleAnimation.x, {
      toValue: -100,
      duration: 1000,
      useNativeDriver: true,
    });

    const movingAnimationY = Animated.timing(scaleAnimation.y, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    });

    // Run both animations for X and Y together, along with the loop animation
    Animated.parallel([
      loopAnimation,
      movingAnimationX,
      movingAnimationY,
    ]).start();
  }, [scaleAnim, scaleAnimation]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.background}}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={() => handleButtonPress('expenseAnalysis')}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor:
                selectedButton === 'expenseAnalysis'
                  ? '#4480A2'
                  : 'transparent',
              padding: 18,
              borderRadius: 30,
              shadowColor:
                selectedButton === 'expenseAnalysis'
                  ? '#4480A2'
                  : 'transparent',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.35,
              shadowRadius: 3.84,
            }}>
            <Text
              style={{
                color:
                  selectedButton === 'expenseAnalysis' ? '#FFFFFF' : '#ccc',
                fontWeight: '700',
                fontSize: 14,
              }}>
              {translate('ExpenseAnalysis')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleButtonPress('incomeAnalysis')}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor:
                selectedButton === 'incomeAnalysis' ? '#80C694' : 'transparent',
              padding: 18,
              borderRadius: 30,
              shadowColor:
                selectedButton === 'incomeAnalysis' ? '#80C694' : 'transparent',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.35,
              shadowRadius: 3.84,
            }}>
            <Text
              style={{
                color: selectedButton === 'incomeAnalysis' ? '#FFFFFF' : '#ccc',
                fontWeight: '700',
                fontSize: 14,
              }}>
              {translate('IncomeAnalysis')}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={() => handleButtonPress('expenseIncome')}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor:
                selectedButton === 'expenseIncome' ? '#E77F27' : 'transparent',
              padding: 18,
              borderRadius: 30,
              shadowColor:
                selectedButton === 'expenseIncome' ? '#E77F27' : 'transparent',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.35,
              shadowRadius: 3.84,
            }}>
            <Text
              style={{
                color: selectedButton === 'expenseIncome' ? '#FFFFFF' : '#ccc',
                fontWeight: '700',
                fontSize: 14,
              }}>
              {translate('ExpensevsIncome')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleButtonPress('asset')}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor:
                selectedButton === 'asset' ? '#BD9BCD' : 'transparent',
              padding: 18,
              borderRadius: 30,
              shadowColor:
                selectedButton === 'asset' ? '#BD9BCD' : 'transparent',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.35,
              shadowRadius: 3.84,
            }}>
            <Text
              style={{
                color: selectedButton === 'asset' ? '#FFFFFF' : '#ccc',
                fontWeight: '700',
                fontSize: 14,
              }}>
              {translate('Asset')}
            </Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color={color.primary} />
        ) : (
          renderScreen()
        )}
      </View>
    </SafeAreaView>
  );
};

export default ReportScreen;
