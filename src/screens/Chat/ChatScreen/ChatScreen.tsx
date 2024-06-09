import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TextInput, Button, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Dimensions, ScrollView } from 'react-native';
import styles from './styles';
import { ChatScreenProps } from 'src/navigation/NavigationTypes';
import ChatServices from 'src/services/apiclient/ChatServices';
import { FamilyServices } from 'src/services/apiclient';
import { AxiosResponse } from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import ImageView from "react-native-image-viewing";
import { Keyboard } from 'react-native';
import { getSocket } from 'src/services/apiclient/Socket';
import { useSelector } from 'react-redux';
import { selectProfile } from 'src/redux/slices/ProfileSclice';
import { Message } from 'src/interface/chat/chat';

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
  const profile = useSelector(selectProfile);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [receiver, setReceiver] = useState<Member>();
  const { receiverId } = route.params || {};
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isTextInputEmpty, setIsTextInputEmpty] = useState(true);
  const [refreshFlatList, setRefreshFlatList] = useState(false); 
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false); 
  let socket = getSocket();

  const markSeenMessage = async (receiverId?: string) => {
    try {
      await ChatServices.markSeenMessage({ receiver_id: receiverId });
  
    } catch (error) {
      console.error('Error markSeenMessage:', error);
    }
  };

  const fetchMember = async (receiverId?: string, id_user?: string) => {
    try {
      const response: AxiosResponse<Member[]> = await FamilyServices.getMember({ id_user: receiverId });
      if (response && response.data.length > 0) {
        setReceiver(response.data[0]);
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
          return { ...message, timestamp: new Date(message.timestamp) };
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
      socket.emit('newMessage', {
        message: message,
        receiverId: receiverId,
      });
    }
    else {
      console.log('socket error');
    }
  };

  const sendImage = async (base64Image: string) => {
    try {
      if (socket) {
        socket.emit('newImageMessage', {
          receiverId: receiverId,
          imageData: base64Image,
        });
      }
    } catch (error) {
      console.error('Error sending image:', error);
    }
  };

  const fetchNewMessages = async () => {
    setRefreshFlatList(prevState => !prevState); 
    try {
      const response = await ChatServices.GetMessages({ id_user: receiverId, index: 0 });
      if (response && response.length > 0) { 
        const firstMessage = response[0]; 
        if (firstMessage.type === 'photo') {
          setImages(prevImages => [firstMessage.content, ...prevImages]); 
        }
        setMessages(prevMessages => [firstMessage, ...prevMessages]);
      }
    } catch (error) {
      console.error('Error fetching new messages:', error);
    }
  };

  const handleSendImage = async (base64Image: string) => {
    await sendImage(base64Image);
    await fetchMessages();
    await fetchNewMessages(); 
  };

  const handleSendMessage = async () => {
    await sendMessage();
    setMessage('');
    await fetchNewMessages(); 
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
    const itemIndex = messages.findIndex(message => message.senderId === item.senderId && message.content === item.content);
    setSelectedImageIndex(itemIndex-1);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  useEffect(() => {
    fetchMessages();
    fetchMember(receiverId, profile.id_user);
    setIsTextInputEmpty(message.trim() === '');

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsOpen(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsOpen(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
    markSeenMessage();
  }, [message]);

  useEffect(() => {
    markSeenMessage(receiverId);
  },[receiverId]);

  useEffect(() => {
    if (socket) {
      socket.on('onNewMessage', fetchNewMessages);
      socket.on('onNewImageMessage', fetchNewMessages);
    }

    return () => {
      if (socket) {
        socket.off('onNewMessage', fetchNewMessages);
        socket.off('onNewImageMessage', fetchNewMessages);
      }
    };
  }, [socket]);

  const handleVideoCall = (receiverId?: string) => {
    navigation.navigate('ChatStack', { screen: 'CallVideo', params: { receiverId: receiverId } });
  }

  const formatDateTime = (dateTime: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (
      dateTime.getDate() === today.getDate() &&
      dateTime.getMonth() === today.getMonth() &&
      dateTime.getFullYear() === today.getFullYear()
    ) {
      return `${dateTime.getHours()}:${dateTime
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
    } else if (
      dateTime.getDate() === yesterday.getDate() &&
      dateTime.getMonth() === yesterday.getMonth() &&
      dateTime.getFullYear() === yesterday.getFullYear()
    ) {
      return `Yesterday ${dateTime.getHours()}:${dateTime
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
    } else {
      return `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()} ${dateTime.getHours()}:${dateTime
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <View style={styles.header}>
       
        <View style={styles.receiverInfo}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}> 
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} style={styles.backButton} />
            </TouchableOpacity>
            {receiver && (
              <>
              <View style={{    flexDirection: 'row',alignItems: 'center',}}> 
                <Image source={{ uri: receiver.avatar }} style={styles.avatar} />
                <Text style={styles.avatarText}> {receiver.firstname} {receiver.lastname}</Text>
              </View>
              </>
            )}
          </View>
           <TouchableOpacity onPress={() => handleVideoCall(receiverId)}>
          <Icon name="videocam" size={36} style={styles.videoCallButton} />
        </TouchableOpacity>
        </View>
       
      </View>
      <FlatList
        key={refreshFlatList ? 'refresh' : 'no-refresh'}
        style={styles.messagesContainer}
        contentContainerStyle={styles.contentContainer}
        data={messages}
        inverted
        renderItem={({ item, index }) => (
          <View style={[
            styles.messageContainer,
            item.senderId === profile.id_user ? styles.senderMessageContainer : styles.receiverMessageContainer
          ]}>
            {item.type === 'photo' ? (
              <TouchableOpacity onPress={() => handleImagePress(item)}>
                <View style={styles.messageContentContainer}>
                  <Image source={{ uri: item.content }} style={styles.imageMessage} />
                </View>
              </TouchableOpacity>
            ) : (
              <>
                <Text style={styles.senderMessageContent}>{item.content}</Text>
                <Text style={styles.timestamp}>{formatDateTime(item.timestamp)}</Text>
              </>
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        keyboardShouldPersistTaps="handled"
        onEndReached={loadMoreMessages}
        onEndReachedThreshold={0.1}
      />
      <View style={[styles.inputContainer, keyboardIsOpen && { paddingBottom: 60 }]}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message here"
        />
        <TouchableOpacity onPress={handleOpenImageLibrary} style={{ marginLeft: 10 }}>
          <Icon name="images" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSendMessage} disabled={isTextInputEmpty} style={{ marginLeft: 10 }}>
          <Icon name="send" size={30} />
        </TouchableOpacity>
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
