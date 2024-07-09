import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './Routes/AuthStack';
import HomeTab from './Routes/HomeTab';
import FamilyStack from './Routes/FamilyStack';
import PackStack from './Routes/PackStack';
import CalendarStack from './Routes/CalendarStack';
import ChatStack from './Routes/ChatStack';
import ExpenseStack from './Routes/ExpenseStack';
import IncomeStack from './Routes/IncomeStack';
import MessageTab from './Routes/MessageTab';
import HouseHoldStack from './Routes/HouseHoldStack';
import HouseHoldItemStack from './Routes/HouseHoldItemStack';
import ShoppingListStack from './Routes/ShoppingListStack';
import ShoppingListCategoryStack from './Routes/ShoppingListCategoryStack';
import TodoListStack from './Routes/TodoListStack';

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
        <Stack.Screen name="HouseHoldStack" component={HouseHoldStack} />
        <Stack.Screen name="HouseHoldItemStack" component={HouseHoldItemStack} />
        <Stack.Screen name="ShoppingListStack" component={ShoppingListStack} />
        <Stack.Screen name="TodoListStack" component={TodoListStack} />

        {/* <Stack.Screen name="ShoppingListCategoryStack" component={ShoppingListCategoryStack}/> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
