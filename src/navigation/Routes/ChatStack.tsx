import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatFamilyScreen from 'src/screens/ChatFamily';
import { ChatFamilyScreenProps, ChatScreenProps } from '../NavigationTypes';
import ChatScreen from 'src/screens/Chat';
const Stack = createNativeStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
     
     <Stack.Screen name="ChatFamily">{(props) => <ChatFamilyScreen {...props as ChatFamilyScreenProps} />}</Stack.Screen>
     <Stack.Screen name="ChatUser">{(props) => <ChatScreen {...props as ChatScreenProps} />}</Stack.Screen>


    </Stack.Navigator>
  );
};

export default ChatStack;
