import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ExpenditureScreen from 'src/screens/ExpenseScreen';
import { ExpenditureScreenProps } from '../NavigationTypes';

const Stack = createNativeStackNavigator();

const ExpenseStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
     
     <Stack.Screen name="Expenditure">{(props) => <ExpenditureScreen {...props as ExpenditureScreenProps} />}</Stack.Screen>

    </Stack.Navigator>
  );
};

export default ExpenseStack;
