import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TextInput, Button, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Dimensions } from 'react-native';
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
import ImageView from "react-native-image-viewing";

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [receiver, setReceiver] = useState<Member>();
  const { id_user, receiverId } = route.params || {};
  const dispatch = useDispatch();
  const socket = useSelector((state: RootState) => state.webSocket.socket);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isTextInputEmpty, setIsTextInputEmpty] = useState(true);

  const fetchMember = async (receiverId?: string, id_user?: string) => {
    try {
      const response1: AxiosResponse<Member[]> = await FamilyServices.getMember({ id_user: receiverId });
      if (response1) {
        setReceiver(response1.data[0]);
      }
    } catch (error) {
      console.error('Error fetching member:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await ChatServices.GetMessages({ id_user: receiverId, index: currentIndex });
      if (response) {
        const newMessages = response.map((message: any) => {
          if (message.type === 'photo') {
            setImages(prevImages => [...prevImages, message.content]);
          }
          return message;
        });
        setMessages(prevMessages => [...prevMessages, ...newMessages]);
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
        const compressedImage = await ImageManipulator.manipulateAsync(result.assets[0].uri, [], { compress: 0.5 });
        const fileInfo = await FileSystem.getInfoAsync(compressedImage.uri);

        if (fileInfo.exists && fileInfo.size) {
          if (fileInfo.size < 50000) {
            const base64 = await FileSystem.readAsStringAsync(compressedImage.uri, { encoding: 'base64' });
            await handleSendImage(base64);
          } else {
            alert('Selected image size exceeds 50KB limit');
          }
        } else {
          console.error('File does not exist or size cannot be determined');
        }
      }
    } catch (error) {
      console.error('Error opening image library:', error);
    }
  };

  const handleImagePress = (item: Message) => {
    const itemIndex = messages.findIndex(message => message === item);
    if (itemIndex !== -1) {
      const newIndex = Math.max(0, itemIndex - 4);
      setSelectedImageIndex(newIndex);
    }
  };
  
  
  
  

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  useEffect(() => {
    fetchMessages();
    fetchMember(receiverId, id_user);
    dispatch(connectWebSocket());
    setIsTextInputEmpty(message.trim() === '');
  }, [message]);

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', function(msg) {
        console.log('Tin nhắn từ phía máy chủ: ', msg);
        setMessages(prevMessages => [...prevMessages, msg]);
      });
    }
  }, [socket]);

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} style={styles.backButton} />
        </TouchableOpacity>
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
        renderItem={({ item, index }) => (
          <View style={[
            styles.messageContainer,
            item.senderId === id_user ? styles.senderMessageContainer : styles.receiverMessageContainer,
            { flex: 1 },
          ]}>
            {item.type === 'photo' ? (
              <TouchableOpacity onPress={() => handleImagePress(item)}>
                <View style={styles.messageContentContainer}>
                  <Image source={{ uri: item.content }} style={styles.imageMessage} />
                </View>
              </TouchableOpacity>
            ) : (
              <Text style={styles.senderMessageContent}>{item.content}</Text>
            )}
          </View>
        )}
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
        <Button title="Send" onPress={handleSendMessage} disabled={isTextInputEmpty} />
      </View>
      
      <ImageView
        images={images.map(image => ({ uri: image }))}
        imageIndex={selectedImageIndex || 0}
        visible={selectedImageIndex !== null}
        onRequestClose={handleCloseModal}
        backgroundColor="rgba(0, 0, 0, 0.8)" 
      />


      

    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
