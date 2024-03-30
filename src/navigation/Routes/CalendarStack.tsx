import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CalendarScreen from 'src/screens/Calendar';
import { CalendarScreenProps } from '../NavigationTypes';
const Stack = createNativeStackNavigator();

const CalendarStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>

       <Stack.Screen name="CalendarScreen">
        {(props) => <CalendarScreen {...props as CalendarScreenProps} />}
        </Stack.Screen>

    </Stack.Navigator>
  );
};

export default CalendarStack;
