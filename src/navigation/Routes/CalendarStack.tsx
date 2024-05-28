import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CalendarScreen from 'src/screens/Calendar';
import { CalendarListScreenProps, CalendarScreenProps, CreateCategoryEventScreenProps, CreateEventScreenProps } from '../NavigationTypes';
import CreateEventModal from 'src/screens/Calendar/CreateEvent';
import CalendarListScreen from 'src/screens/Calendar/CalendarList/CalendarList';
import CreateEventScreen from 'src/screens/Calendar/CreateEvent/CreateEvent';
import CreateCategoryEventScreen from 'src/screens/Calendar/CreateCategoryEvent/CreateCategoryEvent';

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

        <Stack.Screen name="CreateEvent">
        {(props) => <CreateEventScreen {...props as CreateEventScreenProps} />}
        </Stack.Screen>

        <Stack.Screen name="CreateCategoryEvent">
        {(props) => <CreateCategoryEventScreen {...props as CreateCategoryEventScreenProps} />}
        </Stack.Screen>
    </Stack.Navigator>
  );
};

export default CalendarStack;
