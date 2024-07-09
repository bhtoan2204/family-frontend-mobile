import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ExpenditureScreen from 'src/screens/ExpenseScreen';
import { CategoryExpenseScreenProps, ChartExpenseProps, ChartIncomeScreenProps, ExpenditureScreenProps, FamilySpecProps, IncomeDetailScreenProps, IncomeScreenProps } from '../NavigationTypes';
import CategoryExpenseScreen from 'src/screens/ExpenseScreen/CategoryScreen';
import FamilySpec from 'src/screens/ExpenseScreen/FamilySpec';
import ChartExpenseScreen from 'src/screens/ChartScreen/ChartExpense';
import ChartIncomeScreen from 'src/screens/ChartScreen/ChartIncome';
import IncomeDetailScreen from 'src/screens/ChartScreen/Details/IncomeDetails';
import IncomeScreen from 'src/screens/ChartScreen/ExpensevsIncome/IncomeList';

const Stack = createNativeStackNavigator();

const IncomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
     
     <Stack.Screen name="ChartIncomeScreen">{(props) => <ChartIncomeScreen {...props as ChartIncomeScreenProps} />}</Stack.Screen>
     <Stack.Screen name="IncomeDetailScreen">{(props) => <IncomeDetailScreen {...props as IncomeDetailScreenProps} />}</Stack.Screen>
     <Stack.Screen name="IncomeScreen">{(props) => <IncomeScreen {...props as IncomeScreenProps} />}</Stack.Screen>

    
    </Stack.Navigator>
  );
};

export default IncomeStack;
