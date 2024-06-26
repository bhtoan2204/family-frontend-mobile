import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CalendarScreen from 'src/screens/Calendar';
import { CalendarScreenProps, CreateCategoryEventScreenProps, CreateEventScreenProps, EventDetailsScreenProps, EventListScreenProps, ScheduleScreenProps, UpdateEventScreenProps } from '../NavigationTypes';
import CreateEventModal from 'src/screens/Calendar/CreateEvent';
import CreateEventScreen from 'src/screens/Calendar/CreateEvent/CreateEvent';
import CreateCategoryEventScreen from 'src/screens/Calendar/CreateCategoryEvent/CreateCategoryEvent';
import EventListScreen from 'src/screens/Calendar/EventSchedule/EventList';
import ScheduleScreen from 'src/screens/Calendar/Schedule/Schedule';
import EventDetailsScreen from 'src/screens/Calendar/EventDetails/EventDetails';
import UpdateEventScreen from 'src/screens/ModalScreen/UpdateEventModal/UpdateEvent';

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

        <Stack.Screen name="EventDetailsScreen">
        {(props) => <EventDetailsScreen {...props as EventDetailsScreenProps} />}
        </Stack.Screen>

        <Stack.Screen name="UpdateEvent">
        {(props) => <UpdateEventScreen {...props as UpdateEventScreenProps} />}
        </Stack.Screen>

    </Stack.Navigator>
  );
};

export default CalendarStack;
