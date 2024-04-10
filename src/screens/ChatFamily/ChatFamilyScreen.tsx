import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Image, FlatList} from 'react-native';
import io from 'socket.io-client';
import styles from './styles';
import {ChatFamilyScreenProps} from 'src/navigation/NavigationTypes';
import ChatServices from 'src/services/apiclient/ChatServices';
import LocalStorage from 'src/store/localstorage';
import {FamilyServices} from 'src/services/apiclient';
import {useMessageContext} from 'stream-chat-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { sendFamilyMessage, sendFamilyImage, connectWebSocket } from 'src/redux/webSocketSlice';
import { RootState } from 'src/redux/rootReducer';
import ImageView from "react-native-image-viewing";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import Icon from 'react-native-vector-icons/Ionicons';

interface Message {
  senderID: string;
  type: string;
  content: string;
}

interface Member {
  id_user: string;
  firstname: string;
  lastname: string;
  avatar: string;
}
interface Family {
  id_family: string;
  name: string;
}
const ChatFamilyScreen = ({navigation, route}: ChatFamilyScreenProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [members, setMembers] = useState<Member[]>([]);
  const {id_user, id_family} = route.params || {};
  const [family, setFamily] = useState<Family | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const dispatch = useDispatch();
  const socket = useSelector((state: RootState) => state.webSocket.socket);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isTextInputEmpty, setIsTextInputEmpty] = useState(true);
  const avatar= 'https://storage.googleapis.com/famfund-bucket/chat/chat_28905675-858b-4a93-a283-205899779622_1712683096675';
  
  useEffect(() => {
    fetchMember();
    fetchFamily()
    fetchMessages();
    dispatch(connectWebSocket());
    setIsTextInputEmpty(message.trim() === '');
    if (!isSocketConnected) {
      dispatch(connectWebSocket());
      setIsSocketConnected(true);
      if (socket) {
        setIsSocketConnected(true);
      }
    }    
  }, [ currentIndex, message]);

  const fetchFamily = async () => {
    try {
      const response = await FamilyServices.getFamily({
        id_family: id_family,
      });
      if (response) {
        setFamily(response);
      }
    } catch (error) {
      console.error('Error fetching family:', error);
    }
  };
  const fetchMember = async () => {
    try {
      const response = await FamilyServices.getAllMembers({
        id_family: id_family,
      });
      if (response) {
        setMembers(response);
      }
    } catch (error) {
      console.error('Error fetching member:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await ChatServices.GetFamilyMessages({
        id_family: id_family,
        index: currentIndex,
      });
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

  const handleSendMessage = async () => {
    if (socket) {
      console.log(message);
      socket.emit('newFamilyMessage', {
        message: message,
        familyId: id_family,
      });
      console.log('Message sent!');

    }
  };
  const handleSendImage= async (imageData: string) => {
    if (socket) {
      socket.emit('newFamilyImageMessage', {
        familyId: id_family,

        imageData: imageData,
      });
      console.log('Message sent!');
      setMessage('');

    }
  };
  const handleImagePress = (item: Message) => {
    const itemIndex = messages.findIndex(message => message === item);
    if (itemIndex !== -1) {
      const newIndex = Math.max(0, itemIndex - 4);
      setSelectedImageIndex(newIndex);
    }
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
  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} style={styles.backButton} />
        </TouchableOpacity>
        <View style={styles.receiverInfo}>
          {family && (
            <>
              <Image source={{ uri: avatar }} style={styles.avatar} />
              <Text>{family.name}</Text>
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
            item.senderID === id_user ? styles.senderMessageContainer : styles.receiverMessageContainer,
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
        images={messages.filter(msg => msg.type === 'photo').map(msg => ({ uri: msg.content }))}
        imageIndex={selectedImageIndex || 0}
        visible={selectedImageIndex !== null}
        onRequestClose={handleCloseModal}
        backgroundColor="rgba(0, 0, 0, 0.8)"
      />
    </KeyboardAvoidingView>
  );
};

export default ChatFamilyScreen;