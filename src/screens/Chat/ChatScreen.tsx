import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TextInput, Button, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import styles from './styles';
import { ChatScreenProps } from 'src/navigation/NavigationTypes';
import ChatServices from 'src/services/apiclient/ChatServices';
import { FamilyServices } from 'src/services/apiclient';
import { AxiosResponse } from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { connectWebSocket } from 'src/redux/webSocketSlice';
import { RootState } from 'src/redux/rootReducer';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';


interface Message {
  senderId: string;
  type: string;
  content: string;
  receiverId: string;
}

interface Member {
  id_user: string;
  email: string;
  phone: string;
  language: string | null;
  firstname: string;
  lastname: string;
  avatar: string;
}
interface ImageResultWithoutCancelled {
  uri?: string;
  base64?: string;
}
const ChatScreen = ({ navigation, route }: ChatScreenProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [receiver, setReceiver] = useState<Member>();
  const [sender, setSender] = useState<Member>();
  const { id_user, receiverId } = route.params || {};
  const flatListRef = useRef<FlatList>(null);
  const dispatch = useDispatch();
  const socket = useSelector((state: RootState) => state.webSocket.socket);
  
  const fetchMember = async (receiverId?: string, id_user?: string) => {
    try {
      const response1: AxiosResponse<Member[]> = await FamilyServices.getMember({ id_user: receiverId });
      if (response1) {
        setReceiver(response1.data[0]);
      }
      const response2: AxiosResponse<Member[]> = await FamilyServices.getMember({ id_user: id_user });
      if (response2) {
        setSender(response2.data[0]);
      }
    } catch (error) {
      console.error('Error fetching member:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await ChatServices.GetMessages({ id_user: receiverId, index: currentIndex });
      if (response) {
        setMessages(prevMessages => [...prevMessages, ...response]);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const loadMoreMessages = () => {
    setCurrentIndex(currentIndex + 1);
    fetchMessages();
  };

  const sendMessage = async () => {
    if (socket) {
      console.log(message);
      socket.emit('newMessage', {
        message: message,
        receiverId: receiverId,
      });
      console.log('Message sent!');
    }
  };
  const sendImage = async (base64Image: string) => {
    try {
      if (socket) {
        socket.emit('newImageMessage', {
          receiverId: receiverId,
          imageData: base64Image,
        });
        console.log('Message sent!');
      }
    } catch (error) {
      console.error('Error sending image:', error);
    }
  };
  

  const handleSendImage = async (base64Image: string) => {
    await sendImage(base64Image);
    await fetchMessages();
  };
  
  const handleSendMessage = async () => {
    await sendMessage();
    setMessage('');
    await fetchMessages();
  };

  

 
  const handleOpenImageLibrary = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        // Nén hình ảnh
        const compressedImage = await ImageManipulator.manipulateAsync(result.assets[0].uri, [], { compress: 0.5 });
        const base64 = await FileSystem.readAsStringAsync(compressedImage.uri, { encoding: 'base64' });
  
        // Gửi base64 qua socket
        await handleSendImage(base64);
      }
    } catch (error) {
      console.error('Error opening image library:', error);
    }
  };

  const renderMessageItem = ({ item }: { item: Message }) => {
    return (
      <View
        style={[
          styles.messageContainer,
          item.senderId === id_user ? styles.senderMessageContainer : styles.receiverMessageContainer,
          { flex: 1 }, 
        ]}
      >
        {item.type === 'photo' ? (
          <View style={styles.messageContentContainer}>
            <Image source={{ uri: item.content }} style={styles.imageMessage} />
          </View>
        ) : (
          <Text style={styles.senderMessageContent}>{item.content}</Text>
        )}
      </View>
    );
  };
  

  useEffect(() => {
    fetchMessages();
    fetchMember(receiverId, id_user);
    dispatch(connectWebSocket());
  }, [message]);

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', function(data: any) {
        console.log('Received new message:', data);
        setMessages(prevMessages => [data, ...prevMessages]);
        if (flatListRef.current) {
          flatListRef.current.scrollToEnd();
        }
      });
    }
  }, [socket]);
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
    <View style={styles.header}>
        <View style={styles.receiverInfo}>
          {receiver && (
            <>
              <Image source={{ uri: receiver.avatar }} style={styles.avatar} />
              <Text>{receiver.firstname} {receiver.lastname}</Text>
            </>
          )}
        </View>
      </View>
      <FlatList
        style={styles.messagesContainer}
        contentContainerStyle={styles.contentContainer}
        data={messages}
        inverted
        renderItem={renderMessageItem}
        keyExtractor={(item, index) => index.toString()}
        keyboardShouldPersistTaps="handled"
        onEndReached={loadMoreMessages}
        onEndReachedThreshold={0.1}
      />
      <View style={styles.inputContainer}>
        <TextInput
        style={[styles.input, { flexGrow: 1, marginBottom: Platform.OS === 'ios' ? 0 : 10 }]}
        value={message}
          onChangeText={setMessage}
          placeholder="Type your message here"
        />
        <TouchableOpacity onPress={handleOpenImageLibrary}>
          <Icon name="images" size={36} />
        </TouchableOpacity>
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
  
  
};

export default ChatScreen;
