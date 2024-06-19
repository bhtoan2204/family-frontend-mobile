import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Image, Animated} from 'react-native';
import styles from './styles';
import {ExpenditureScreenProps} from 'src/navigation/NavigationTypes';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from 'src/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

  const scaleAnim = useRef(new Animated.Value(1)).current; // Phóng to/thu nhỏ
  const [selectedButton, setSelectedButton] = useState('expenseAnalysis');
  const [currentScreen, setCurrentScreen] = useState('expenseAnalysis');

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

  // Hàm render cho Expense Analysis Screen
  const renderExpenseAnalysisScreen = () => (
    <View style={{flex: 1}}>
      <Image
        source={require('../../assets/images/report-bg.png')}
        style={{flex: 1, width: '100%', height: '100%'}}
        resizeMode="contain"
      />
      <TouchableOpacity
        onPress={pressExVsIn}
        style={{
          flex: 1,
          position: 'absolute',
          left: 200,
          width: 150,
          height: 150,
          bottom: 385,
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
        onPress={pressExpenseAnalysis}
        style={{
          flex: 1,
          position: 'absolute',
          right: 185,
          width: 200,
          height: 200,
          bottom: 230,
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
        onPress={pressIncomeAnalysis}
        style={{
          flex: 1,
          position: 'absolute',
          left: 210,
          width: 150,
          height: 150,
          top: 375,
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
  const renderIncomeAnalysisScreen = () => <Text>Income Analysis Screen</Text>;

  // Hàm render cho Expense vs Income Screen
  const renderExVsInScreen = () => <Text>Expense vs Income Screen</Text>;

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
        {/* <TouchableOpacity style={styles.expenseContainer} onPress={pressExVsIn}>
          <Icon
            name="compare-arrows"
            size={35}
            color={COLORS.black}
            style={styles.icon}
          />
          <Text style={styles.heading}>Expense vs Income</Text>
        </TouchableOpacity>

        <View style={styles.analysisContainer}>
          <TouchableOpacity
            style={styles.expenseAnalysis}
            onPress={pressExpenseAnalysis}>
            <Icon
              name="show-chart"
              size={35}
              color={COLORS.black}
              style={styles.icon}
            />
            <Text style={styles.heading}>Expense Analysis</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.incomeAnalysis}
            onPress={pressIncomeAnalysis}>
            <Icon
              name="bar-chart"
              size={35}
              color={COLORS.black}
              style={styles.icon}
            />
            <Text style={styles.heading}>Income Analysis</Text>
          </TouchableOpacity>
        </View> */}

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
