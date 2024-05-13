import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatFamilyScreen from 'src/screens/Chat/ChatFamily';
import { CallVideoProps, ChatFamilyScreenProps, ChatListProps, ChatScreenProps } from '../NavigationTypes';
import ChatScreen from 'src/screens/Chat';
import ChatListScreen from 'src/screens/ChatList/ChatListScreen';
import VideoCallScreen from 'src/screens/VideoCallScreen';
const Stack = createNativeStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
     
     <Stack.Screen name="ChatFamily">{(props) => <ChatFamilyScreen {...props as ChatFamilyScreenProps} />}</Stack.Screen>
     <Stack.Screen name="ChatUser">{(props) => <ChatScreen {...props as ChatScreenProps} />}</Stack.Screen>

     <Stack.Screen name="ChatList">{(props) => <ChatListScreen {...props as ChatListProps} />}</Stack.Screen>
     <Stack.Screen name="CallVideo">{(props) => <VideoCallScreen {...props as CallVideoProps} />}</Stack.Screen>

    </Stack.Navigator>
  );
};

export default ChatStack;
