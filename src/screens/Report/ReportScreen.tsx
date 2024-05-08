import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { ExpenditureScreenProps } from 'src/navigation/NavigationTypes';

const ReportScreen = ({navigation}: ExpenditureScreenProps) => {
    const pressExVsIn = () => {
        navigation.navigate('ExpenseStack', {screen: 'FamilySpec', params: {id_family: 0}});
    }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.expenseContainer} onPress={()=>pressExVsIn()}>
        <Text style={styles.heading}>Expense vs Income</Text>
      </TouchableOpacity>
  
      <View style={styles.analysisContainer}>
        <View style={styles.expenseAnalysis}>
          <Text style={styles.heading}>Expense Analysis</Text>
        </View>
        <View style={styles.incomeAnalysis}>
          <Text style={styles.heading}>Income Analysis</Text>
        </View>
      </View>
    </View>
  );
};
export default ReportScreen;