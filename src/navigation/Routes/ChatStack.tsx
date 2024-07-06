import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatFamilyScreen from 'src/screens/Chat/ChatFamily';
import { CallVideoProps, ChatFamilyLastScreenProps, ChatFamilyScreenProps, ChatListProps, ChatScreenProps } from '../NavigationTypes';
import ChatScreen from 'src/screens/Chat/ChatScreen/ChatScreen';
import ChatListScreen from 'src/screens/Chat/ChatList/ChatListScreen';
import VideoCallScreen from 'src/screens/VideoCallScreen';
import ChatFamilyLastScreen from 'src/screens/Chat/ChatFamily/ChatFamilyLast';
const Stack = createNativeStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
     
     
     <Stack.Screen name="ChatFamily">{(props) => <ChatFamilyScreen {...props as ChatFamilyScreenProps} />}</Stack.Screen>
     <Stack.Screen name="ChatFamilyLast">{(props) => <ChatFamilyLastScreen {...props as ChatFamilyLastScreenProps} />}</Stack.Screen>
     <Stack.Screen name="ChatUser">{(props) => <ChatScreen {...props as ChatScreenProps} />}</Stack.Screen>

     <Stack.Screen name="CallVideo">{(props) => <VideoCallScreen {...props as CallVideoProps} />}</Stack.Screen>

    </Stack.Navigator>
  );
};

export default ChatStack;
