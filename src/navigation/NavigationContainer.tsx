import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './Routes/AuthStack';
import HomeTab from './Routes/HomeTab';
import FamilyStack from './Routes/FamilyStack';
import PackStack from './Routes/PackStack';
import CalendarStack from './Routes/CalendarStack';
import ChatStack from './Routes/ChatStack';
import ExpenseStack from './Routes/ExpenseStack';
import IncomeStack from './Routes/IncomeStack';
import MessageTab from './Routes/MessageTab';
import FamilyTab from './Routes/FamilyTab';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="HomeTab" component={HomeTab} />
        <Stack.Screen name="FamilyStack" component={FamilyStack} />
        <Stack.Screen name="PackStack" component={PackStack} />
        <Stack.Screen name="CalendarStack" component={CalendarStack} />
        <Stack.Screen name="ChatStack" component={ChatStack} />
        <Stack.Screen name="ExpenseStack" component={ExpenseStack} />
        <Stack.Screen name="IncomeStack" component={IncomeStack} />
        <Stack.Screen name="MessageTab" component={MessageTab} />
        <Stack.Screen name="FamilyTab" component={FamilyTab} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
