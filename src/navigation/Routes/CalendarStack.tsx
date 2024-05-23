import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CalendarScreen from 'src/screens/Calendar';
import { CalendarListScreenProps, CalendarScreenProps } from '../NavigationTypes';
import CreateEventModal from 'src/screens/ModalScreen/CreateEvent';
import CalendarListScreen from 'src/screens/Calendar/CalendarList/CalendarList';

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

        <Stack.Screen name="CalendarList">
        {(props) => <CalendarListScreen {...props as CalendarListScreenProps} />}
        </Stack.Screen>

        <Stack.Screen
        name="CreateEvent"
        component={CreateEventModal}
      />

    </Stack.Navigator>
  );
};

export default CalendarStack;
