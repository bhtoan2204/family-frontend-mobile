import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {ExpenditureScreenProps} from 'src/navigation/NavigationTypes';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from 'src/constants';

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
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.expenseContainer}
          onPress={() => pressExVsIn()}>
          <Text style={styles.heading}>Expense vs Income</Text>
        </TouchableOpacity>

        <View style={styles.analysisContainer}>
          <TouchableOpacity
            style={styles.expenseAnalysis}
            onPress={() => pressExpenseAnalysis()}>
            <Text style={styles.heading}>Expense Analysis</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.incomeAnalysis}
            onPress={() => pressIncomeAnalysis()}>
            <Text style={styles.heading}>Income Analysis</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ReportScreen;
