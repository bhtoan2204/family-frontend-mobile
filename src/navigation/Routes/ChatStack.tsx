import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatFamilyScreen from 'src/screens/Chat';
import { ChatFamilyScreenProps } from '../NavigationTypes';

const Stack = createNativeStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
     
     <Stack.Screen name="ChatFamily">{(props) => <ChatFamilyScreen {...props as ChatFamilyScreenProps} />}</Stack.Screen>


    </Stack.Navigator>
  );
};

export default ChatStack;
