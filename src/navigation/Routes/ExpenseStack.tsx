import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ExpenditureScreen from 'src/screens/ExpenseScreen';
import { CategoryExpenseScreenProps, ChartExpenseProps, ExpenditureScreenProps, FamilySpecProps } from '../NavigationTypes';
import CategoryExpenseScreen from 'src/screens/ExpenseScreen/CategoryScreen';
import FamilySpec from 'src/screens/ExpenseScreen/FamilySpec';
import ChartExpenseScreen from 'src/screens/ChartScreen/ChartExpense';
import IncomeExpenseScreen from 'src/screens/ChartScreen/ExpensevsIncome/Details';

const Stack = createNativeStackNavigator();

const ExpenseStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
     
     <Stack.Screen name="Expenditure">{(props) => <ExpenditureScreen {...props as ExpenditureScreenProps} />}</Stack.Screen>
     
     <Stack.Screen name="CategoryExpense">{(props) => <CategoryExpenseScreen {...props as CategoryExpenseScreenProps} />}</Stack.Screen>
     <Stack.Screen name="FamilySpec">{(props) => <FamilySpec {...props as FamilySpecProps} />}</Stack.Screen>
     <Stack.Screen name="ChartExpense">{(props) => <ChartExpenseScreen {...props as ChartExpenseProps} />}</Stack.Screen>
     <Stack.Screen name="IncomeExpenseScreen">{(props) => <IncomeExpenseScreen {...props as IncomeExpenseScreen} />}</Stack.Screen>

    </Stack.Navigator>
  );
};

export default ExpenseStack;
