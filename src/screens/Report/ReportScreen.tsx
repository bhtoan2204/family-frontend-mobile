import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Image, Animated} from 'react-native';
import styles from './styles';
import {ExpenditureScreenProps} from 'src/navigation/NavigationTypes';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from 'src/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {getOption, setSelectedOption} from 'src/redux/slices/ExpenseAnalysis';

const ReportScreen = ({navigation}: ExpenditureScreenProps) => {
  const pressExVsIn = () => {
    navigation.navigate('ExpenseStack', {
      screen: 'FamilySpec',
      params: {id_family: 0},
    });
  };
  const pressExpenseAnalysis = () => {
    navigation.navigate('ExpenseStack', {screen: 'ChartExpense'});
  };
  const pressIncomeAnalysis = () => {
    navigation.navigate('IncomeStack', {screen: 'ChartInomeScreen'});
  };

  const scaleAnim = new Animated.Value(1); // Phóng to/thu nhỏ
  const [selectedButton, setSelectedButton] = useState('expenseAnalysis');
  const [currentScreen, setCurrentScreen] = useState('expenseAnalysis');
  const [selectedCategoryType, setSelectedCategoryType] = useState<string>('');
  let option = useSelector(getOption);
  const dispatch = useDispatch();

  const handleButtonPress = (
    buttonName: 'expenseAnalysis' | 'incomeAnalysis' | 'expenseIncome',
  ) => {
    setSelectedButton(buttonName);
    setCurrentScreen(buttonName);
    switch (buttonName) {
      case 'expenseAnalysis':
        renderExpenseAnalysisScreen();
        break;
      case 'incomeAnalysis':
        renderIncomeAnalysisScreen();
        break;
      case 'expenseIncome':
        renderExVsInScreen();
        break;
      default:
        console.log('Invalid button name');
    }
  };

  const selectOption = (option: 'Day' | 'Month' | 'Year') => {
    setSelectedCategoryType(option);
    dispatch(setSelectedOption(option));
  };

  // Hàm render cho Expense Analysis Screen
  const renderExpenseAnalysisScreen = () => (
    <View style={{flex: 1}}>
      <Image
        source={require('../../assets/images/expense-bg.png')}
        style={{flex: 1, width: '100%', height: '100%'}}
        resizeMode="contain"
      />
      <TouchableOpacity
        onPress={() => selectOption('Day')}
        style={{
          flex: 1,
          position: 'absolute',
          right: 110,
          width: 150,
          height: 150,
          bottom: 170,
        }}>
        <Animated.Image
          source={require('../../assets/images/bar-chart.png')}
          style={{
            width: '100%',
            height: '100%',
            transform: [{scale: scaleAnim}],
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => selectOption('Month')}
        style={{
          flex: 1,
          position: 'absolute',
          left: 190,
          width: 210,
          height: 210,
          bottom: 350,
          zIndex: 2,
        }}>
        <Animated.Image
          source={require('../../assets/images/pie-chart.png')}
          style={{
            width: '100%',
            height: '100%',
            transform: [{scale: scaleAnim}],
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => selectOption('Year')}
        style={{
          flex: 1,
          position: 'absolute',
          right: 180,
          width: 250,
          height: 150,
          top: 35,
          zIndex: 2,
        }}>
        <Animated.Image
          source={require('../../assets/images/line-chart.png')}
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

  // Hàm render cho Income Analysis Screen
  const renderIncomeAnalysisScreen = () => (
    <View style={{flex: 1}}>
      <Image
        source={require('../../assets/images/income-bg.png')}
        style={{flex: 1, width: '100%', height: '100%'}}
        resizeMode="contain"
      />
      <TouchableOpacity
        onPress={pressExVsIn}
        style={{
          flex: 1,
          position: 'absolute',
          right: 120,
          width: 145,
          height: 145,
          bottom: 180,
        }}>
        <Animated.Image
          source={require('../../assets/images/income-bar-chart.png')}
          style={{
            width: '100%',
            height: '100%',
            transform: [{scale: scaleAnim}],
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={pressExpenseAnalysis}
        style={{
          flex: 1,
          position: 'absolute',
          right: 180,
          width: 210,
          height: 210,
          bottom: 350,
          zIndex: 2,
        }}>
        <Animated.Image
          source={require('../../assets/images/income-month-chart.png')}
          style={{
            width: '100%',
            height: '100%',
            transform: [{scale: scaleAnim}],
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={pressIncomeAnalysis}
        style={{
          flex: 1,
          position: 'absolute',
          left: 130,
          width: 250,
          height: 150,
          top: 15,
          zIndex: 2,
        }}>
        <Animated.Image
          source={require('../../assets/images/income-line-chart.png')}
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

  // Hàm render cho Expense vs Income Screen
  const renderExVsInScreen = () => (
    <View style={{flex: 1}}>
      <Image
        source={require('../../assets/images/expense_income.png')}
        style={{flex: 1, width: '100%', height: '100%'}}
        resizeMode="contain"
      />
    </View>
  );

  // Hàm chính để quyết định màn hình nào được hiển thị
  const renderScreen = () => {
    switch (currentScreen) {
      case 'expenseAnalysis':
        return renderExpenseAnalysisScreen();
      case 'incomeAnalysis':
        return renderIncomeAnalysisScreen();
      case 'expenseIncome':
        return renderExVsInScreen();
    }
  };

  useEffect(() => {
    // Tạo animation phóng to/thu nhỏ liên tục
    Animated.loop(
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
    ).start();
  }, [scaleAnim]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            marginVertical: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 20,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => handleButtonPress('expenseAnalysis')}
              style={{
                alignItems: 'center',
                backgroundColor:
                  selectedButton === 'expenseAnalysis' ? '#4480A2' : '#FFFFFF',
                padding: 18,
                borderRadius: 30,
                paddingHorizontal: 30,
                shadowColor:
                  selectedButton === 'expenseAnalysis'
                    ? '#4480A2'
                    : 'transparent',
                shadowOffset: {width: 0, height: 10},
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
                Expense Analysis
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleButtonPress('incomeAnalysis')}
              style={{
                alignItems: 'center',
                backgroundColor:
                  selectedButton === 'incomeAnalysis' ? '#E77F27' : '#FFFFFF',
                padding: 18,
                borderRadius: 30,
                paddingHorizontal: 30,
                shadowColor:
                  selectedButton === 'incomeAnalysis'
                    ? '#E77F27'
                    : 'transparent',
                shadowOffset: {width: 0, height: 4},
                shadowOpacity: 0.35,
                shadowRadius: 3.84,
              }}>
              <Text
                style={{
                  color:
                    selectedButton === 'incomeAnalysis' ? '#FFFFFF' : '#ccc',
                  fontWeight: '700',
                  fontSize: 14,
                }}>
                Income Analysis
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => handleButtonPress('expenseIncome')}
            style={{
              alignItems: 'center',
              backgroundColor:
                selectedButton === 'expenseIncome' ? '#80C694' : '#FFFFFF',
              padding: 18,
              borderRadius: 30,
              shadowColor:
                selectedButton === 'expenseIncome' ? '#80C694' : 'transparent',
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
              Expense & Income
            </Text>
          </TouchableOpacity>
        </View>
        {renderScreen()}
      </View>
    </SafeAreaView>
  );
};

export default ReportScreen;
