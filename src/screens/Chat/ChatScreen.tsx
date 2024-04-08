
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import io from 'socket.io-client';
import styles from './styles';
import { ChatScreenProps } from 'src/navigation/NavigationTypes';
import ChatServices from 'src/services/apiclient/ChatServices';
import { FamilyServices } from 'src/services/apiclient';
import { AxiosResponse } from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { connectWebSocket } from 'src/redux/webSocketSlice';

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

const ChatScreen = ({ navigation, route }: ChatScreenProps) => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [receiver, setReceiver] = useState<Member>();
  const [sender, setSender] = useState<Member>();
  const [accessToken, setAccessToken] = useState<string>('');
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

  const sendImage = async () => {
    if (socket) {
      socket.emit('newImageMessage', {
        receiverId: receiverId,
        imageData: image,
      });
      console.log('Message sent!');
    }
  };

  const handleSendImage = async () => {
    await sendImage();
    setImage('');
    await fetchMessages();
  };

  const handleSendMessage = async () => {
    await sendMessage();
    setMessage('');
    await fetchMessages();
  };

  const imageToBase64 = async (imageUrl: string): Promise<string> => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64Data = reader.result as string;
          if (base64Data) {
            resolve(base64Data);
          } else {
            reject(new Error('Failed to read image data.'));
          }
        };
        reader.onerror = (error) => {
          reject(error);
        };
      });
    } catch (error) {
      throw new Error('Error fetching image data: ' + error);
    }
  };

  const handleOpenImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const base64Image = await imageToBase64(result.assets[0].uri);
      if (base64Image !== null) {
        setImage(base64Image);
        handleSendImage();
      } else {
        console.log('Error converting image to base64');
      }
    }
  };

  const renderMessageItem = ({ item }: { item: Message }) => {
    if (item.type === 'photo') {
      return (
        <View
          style={[
            styles.messageContainer,
            item.senderId === id_user ? styles.senderMessageContainer : styles.receiverMessageContainer,
          ]}
        >
          <View style={styles.messageContentContainer}>
            <Image source={{ uri: item.content }} style={styles.imageMessage} />
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={[
            styles.messageContainer,
            item.senderId === id_user ? styles.senderMessageContainer : styles.receiverMessageContainer,
          ]}
        >
          <Text style={styles.senderMessageContent}>{item.content}</Text>
        </View>
      );
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchMember(receiverId, id_user);
    dispatch(connectWebSocket());

  }, [message]); 

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <View style={styles.receiverInfo}>
          <Text>{receiver?.firstname} {receiver?.lastname}</Text>
        </View>
      </View>
      <FlatList
        ref={flatListRef}
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
          style={styles.input}
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