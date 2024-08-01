import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ExpenditureScreen from 'src/screens/ExpenseScreen/CreateExpense';
import CategoryExpenseScreen from 'src/screens/ExpenseScreen/CategoryScreen';
import FamilySpec from 'src/screens/ExpenseScreen/FamilySpec';
import ChartExpenseScreen from 'src/screens/ChartScreen/ChartExpense';
import IncomeExpenseScreen from 'src/screens/ChartScreen/ExpensevsIncome/ExpensevsIncome';
import ExpenseDetailScreen from 'src/screens/ChartScreen/Details/ExpenseDetails';
import AssetScreen from 'src/screens/Asset/AssetScreen';
import AssetDetailScreen from 'src/screens/Asset/AssetDetails/AssetDetails';
import AddAssetScreen from 'src/screens/Asset/CreateAsset/CreateAsset';
import ExpenseScreen from 'src/screens/ChartScreen/ExpensevsIncome/ExpenseList';
import {ExpenseStackParamList} from '../NavigationTypes';

const Stack = createNativeStackNavigator<ExpenseStackParamList>();

const ExpenseStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Expenditure" component={ExpenditureScreen} />
      <Stack.Screen name="CategoryExpense" component={CategoryExpenseScreen} />
      <Stack.Screen name="FamilySpec" component={FamilySpec} />
      <Stack.Screen name="ChartExpense" component={ChartExpenseScreen} />
      <Stack.Screen
        name="IncomeExpenseScreen"
        component={IncomeExpenseScreen}
      />
      <Stack.Screen
        name="ExpenseDetailScreen"
        component={ExpenseDetailScreen}
      />
      <Stack.Screen name="AssetScreen" component={AssetScreen} />
      <Stack.Screen name="AssetDetailScreen" component={AssetDetailScreen} />
      <Stack.Screen name="AddAssetScreen" component={AddAssetScreen} />
      <Stack.Screen name="ExpenseScreen" component={ExpenseScreen} />
    </Stack.Navigator>
  );
};

export default ExpenseStack;
