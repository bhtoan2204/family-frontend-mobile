import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ExpenditureScreen from 'src/screens/ExpenseScreen';
import { CategoryExpenseScreenProps, ExpenditureScreenProps, FamilySpecProps } from '../NavigationTypes';
import CategoryExpenseScreen from 'src/screens/ExpenseScreen/CategoryScreen';
import FamilySpec from 'src/screens/ExpenseScreen/FamilySpec';

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

    </Stack.Navigator>
  );
};

export default ExpenseStack;
