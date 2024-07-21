import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ExpenditureScreen from 'src/screens/ExpenseScreen/CreateExpense';
import { AddAssetScreenProps, AssetDetailScreenProps, AssetScreenProps, CategoryExpenseScreenProps, ChartExpenseProps, ExpenditureScreenProps, ExpenseDetailScreenProps, ExpenseScreenProps, FamilySpecProps, IncomeExpenseScreenProps } from '../NavigationTypes';
import CategoryExpenseScreen from 'src/screens/ExpenseScreen/CategoryScreen';
import FamilySpec from 'src/screens/ExpenseScreen/FamilySpec';
import ChartExpenseScreen from 'src/screens/ChartScreen/ChartExpense';
import IncomeExpenseScreen from 'src/screens/ChartScreen/ExpensevsIncome/ExpensevsIncome';
import ExpenseDetailScreen from 'src/screens/ChartScreen/Details/ExpenseDetails';
import AssetScreen from 'src/screens/Asset/AssetScreen';
import AssetDetailScreen from 'src/screens/Asset/AssetDetails/AssetDetails';
import AddAssetScreen from 'src/screens/Asset/CreateAsset/CreateAsset';
import ExpenseScreen from 'src/screens/ChartScreen/ExpensevsIncome/ExpenseList';
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
     <Stack.Screen name="IncomeExpenseScreen">{(props) => <IncomeExpenseScreen {...props as IncomeExpenseScreenProps} />}</Stack.Screen>
     <Stack.Screen name="ExpenseDetailScreen">{(props) => <ExpenseDetailScreen {...props as ExpenseDetailScreenProps} />}</Stack.Screen>
     <Stack.Screen name="AssetScreen">{(props) => <AssetScreen {...props as AssetScreenProps} />}</Stack.Screen>
     <Stack.Screen name="AssetDetailScreen">{(props) => <AssetDetailScreen {...props as AssetDetailScreenProps} />}</Stack.Screen>
     <Stack.Screen name="AddAssetScreen">{(props) => <AddAssetScreen {...props as AddAssetScreenProps} />}</Stack.Screen>
     <Stack.Screen name="ExpenseScreen">{(props) => <ExpenseScreen {...props as ExpenseScreenProps} />}</Stack.Screen>

    </Stack.Navigator>
  );
};

export default ExpenseStack;
