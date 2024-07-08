import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import styles from './styles';
import { ExpenditureScreenProps } from 'src/navigation/NavigationTypes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from 'src/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { setSelectedOption } from 'src/redux/slices/ExpenseAnalysis';

const ReportScreen = ({ navigation }: ExpenditureScreenProps) => {
  const dispatch = useDispatch();

  const pressExVsIn = () => {
    navigation.navigate('ExpenseStack', { screen: 'ChartExpense' });
    dispatch(setSelectedOption('Day'));
  };

  const pressExpenseAnalysis = () => {
    dispatch(setSelectedOption('Month'));
    navigation.navigate('ExpenseStack', { screen: 'ChartExpense' });
  };

  const pressIncomeAnalysis = () => {
    dispatch(setSelectedOption('Year'));
    navigation.navigate('ExpenseStack', { screen: 'ChartExpense' });
  };

  const scaleAnim = new Animated.Value(1);

  const [selectedButton, setSelectedButton] = useState('expenseAnalysis');
  const [currentScreen, setCurrentScreen] = useState('expenseAnalysis');

  const handleButtonPress = (
    buttonName: 'expenseAnalysis' | 'incomeAnalysis' | 'expenseIncome' | 'asset',
  ) => {
    setSelectedButton(buttonName);
    setCurrentScreen(buttonName);
  };

  const renderExpenseAnalysisScreen = () => (
    <View style={{ flex: 1 }}>
      <Image
        source={require('../../assets/images/expense-bg.png')}
        style={{ flex: 1, width: '100%', height: '100%' }}
        resizeMode="contain"
      />
      <TouchableOpacity
        onPress={pressExVsIn}
        style={{
          position: 'absolute',
          right: 110,
          bottom: 170,
          width: 150,
          height: 150,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Animated.Image
          source={require('../../assets/images/bar-chart.png')}
          style={{
            width: '100%',
            height: '100%',
            transform: [{ scale: scaleAnim }],
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={pressExpenseAnalysis}
        style={{
          position: 'absolute',
          left: 190,
          bottom: 350,
          width: 210,
          height: 210,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Animated.Image
          source={require('../../assets/images/pie-chart.png')}
          style={{
            width: '100%',
            height: '100%',
            transform: [{ scale: scaleAnim }],
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={pressIncomeAnalysis}
        style={{
          position: 'absolute',
          right: 180,
          top: 35,
          width: 250,
          height: 150,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Animated.Image
          source={require('../../assets/images/line-chart.png')}
          style={{
            width: '100%',
            height: '100%',
            transform: [{ scale: scaleAnim }],
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );

  const renderIncomeAnalysisScreen = () => (
    <View style={{ flex: 1 }}>
      <Image
        source={require('../../assets/images/income-bg.png')}
        style={{ flex: 1, width: '100%', height: '100%' }}
        resizeMode="contain"
      />
      <TouchableOpacity
        onPress={pressExVsIn}
        style={{
          position: 'absolute',
          right: 120,
          bottom: 180,
          width: 145,
          height: 145,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Animated.Image
          source={require('../../assets/images/income-bar-chart.png')}
          style={{
            width: '100%',
            height: '100%',
            transform: [{ scale: scaleAnim }],
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={pressExpenseAnalysis}
        style={{
          position: 'absolute',
          right: 180,
          bottom: 350,
          width: 210,
          height: 210,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Animated.Image
          source={require('../../assets/images/income-month-chart.png')}
          style={{
            width: '100%',
            height: '100%',
            transform: [{ scale: scaleAnim }],
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={pressIncomeAnalysis}
        style={{
          position: 'absolute',
          left: 130,
          top: 15,
          width: 250,
          height: 150,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Animated.Image
          source={require('../../assets/images/income-line-chart.png')}
          style={{
            width: '100%',
            height: '100%',
            transform: [{ scale: scaleAnim }],
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );

  const renderExVsInScreen = () => navigation.navigate('IncomeStack', { screen: 'IncomeScreen' });

  const renderAsset = () => navigation.navigate('ExpenseStack', { screen: 'AssetScreen' });

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
          <TouchableOpacity
            onPress={() => handleButtonPress('expenseAnalysis')}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: selectedButton === 'expenseAnalysis' ? '#4480A2' : '#FFFFFF',
              padding: 18,
              borderRadius: 30,
              paddingHorizontal: 30,
              shadowColor: selectedButton === 'expenseAnalysis' ? '#4480A2' : 'transparent',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.35,
              shadowRadius: 3.84,
            }}
          >
            <Text style={{ color: selectedButton === 'expenseAnalysis' ? '#FFFFFF' : '#ccc', fontWeight: '700', fontSize: 14 }}>
              Expense Analysis
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleButtonPress('incomeAnalysis')}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: selectedButton === 'incomeAnalysis' ? '#E77F27' : '#FFFFFF',
              padding: 18,
              borderRadius: 30,
              paddingHorizontal: 30,
              shadowColor: selectedButton === 'incomeAnalysis' ? '#E77F27' : 'transparent',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.35,
              shadowRadius: 3.84,
            }}
          >
            <Text style={{ color: selectedButton === 'incomeAnalysis' ? '#FFFFFF' : '#ccc', fontWeight: '700', fontSize: 14 }}>
              Income Analysis
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
          <TouchableOpacity
            onPress={() => handleButtonPress('expenseIncome')}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: selectedButton === 'expenseIncome' ? '#80C694' : '#FFFFFF',
              padding: 18,
              borderRadius: 30,
              shadowColor: selectedButton === 'expenseIncome' ? '#80C694' : 'transparent',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.35,
              shadowRadius: 3.84,
            }}
          >
            <Text style={{ color: selectedButton === 'expenseIncome' ? '#FFFFFF' : '#ccc', fontWeight: '700', fontSize: 14 }}>
              Expense & Income
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleButtonPress('asset')}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: selectedButton === 'asset' ? '#80C694' : '#FFFFFF',
              padding: 18,
              borderRadius: 30,
              shadowColor: selectedButton === 'asset' ? '#80C694' : 'transparent',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.35,
              shadowRadius: 3.84,
            }}
          >
            <Text style={{ color: selectedButton === 'asset' ? '#FFFFFF' : '#ccc', fontWeight: '700', fontSize: 14 }}>
              Asset
            </Text>
          </TouchableOpacity>
        </View>

        {renderScreen()}
      </View>
    </SafeAreaView>
  );
};

export default ReportScreen;
