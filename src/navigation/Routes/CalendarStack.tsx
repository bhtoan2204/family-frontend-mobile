import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CalendarScreen from 'src/screens/Calendar';
import { CalendarScreenProps, CreateCategoryEventScreenProps, CreateEventScreenProps, EventListScreenProps, ScheduleScreenProps } from '../NavigationTypes';
import CreateEventModal from 'src/screens/Calendar/CreateEvent';
import CreateEventScreen from 'src/screens/Calendar/CreateEvent/CreateEvent';
import CreateCategoryEventScreen from 'src/screens/Calendar/CreateCategoryEvent/CreateCategoryEvent';
import EventListScreen from 'src/screens/Calendar/EventList/EventList';
import ScheduleScreen from 'src/screens/Calendar/Schedule/Schedule';

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

        <Stack.Screen name="ScheduleScreen">
        {(props) => <ScheduleScreen {...props as ScheduleScreenProps} />}
        </Stack.Screen>

        <Stack.Screen name="CreateEvent">
        {(props) => <CreateEventScreen {...props as CreateEventScreenProps} />}
        </Stack.Screen>

        <Stack.Screen name="CreateCategoryEvent">
        {(props) => <CreateCategoryEventScreen {...props as CreateCategoryEventScreenProps} />}
        </Stack.Screen>

        <Stack.Screen name="EventListScreen">
        {(props) => <EventListScreen {...props as EventListScreenProps} />}
        </Stack.Screen>
    </Stack.Navigator>
  );
};

export default CalendarStack;
