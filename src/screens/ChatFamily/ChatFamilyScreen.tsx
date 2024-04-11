import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { connectWebSocket } from 'src/redux/webSocketSlice';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import ImageView from 'react-native-image-viewing';
import { FamilyServices, ChatServices } from 'src/services/apiclient';
import { ChatFamilyScreenProps } from 'src/navigation/NavigationTypes';
import styles from './styles';
import { Keyboard } from 'react-native';

interface Message {
  senderId: string;
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
  id_family: number;
  name: string;
}

const ChatFamilyScreen = ({ navigation, route }: ChatFamilyScreenProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [members, setMembers] = useState<Member[]>([]);
  const [family, setFamily] = useState<Family>();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isTextInputEmpty, setIsTextInputEmpty] = useState(true);
  const dispatch = useDispatch();
  const socket = useSelector((state: RootState) => state.webSocket.socket);
  const { id_user, id_family } = route.params || {};
  const [memberLookup, setMemberLookup] = useState<{ [key: string]: Member }>({});
  const avatar = 'https://storage.googleapis.com/famfund-bucket/chat/chat_28905675-858b-4a93-a283-205899779622_1712683096675';
  const [refreshFlatList, setRefreshFlatList] = useState(false); 
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false); 

  useEffect(() => {
    fetchMember();
    fetchFamily();
    fetchMessages();
    dispatch(connectWebSocket());
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
  }, [ message]);

  useEffect(() => {
    const lookup: { [key: string]: Member } = {};
    members.forEach(member => {
      lookup[member.id_user] = member;
    });
    setMemberLookup(lookup);
  }, [members]);

  const fetchFamily = async () => {
    try {
      const response = await FamilyServices.getFamily({ id_family: id_family });
      if (response[0]) {
        setFamily(response[0]);
      }
    } catch (error) {
      console.error('Error fetching family:', error);
    }
  };

  const fetchMember = async () => {
    try {
      const response = await FamilyServices.getAllMembers({ id_family: id_family });
      if (Array.isArray(response)) {
        setMembers(response);
      }
    } catch (error) {
      console.error('Error fetching member:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await ChatServices.GetFamilyMessages({ id_family: id_family, index: currentIndex });
      if (response) {
        const newMessages = response.map((message: any) => {
          if (message.type === 'photo') {
            setImages(prevImages => [message.content, ...prevImages]);
          }
          return message;
        });
        setMessages(prevMessages => [...prevMessages, ...newMessages]);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchNewMessages = async () => {
    try {
      const response = await ChatServices.GetFamilyMessages({ id_family: id_family, index: 0 });
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
  
  
  const loadMoreMessages = () => {
    setCurrentIndex(currentIndex + 1);
    fetchMessages();
  };
  
  const sendImage = async (base64Image: string) => {
    try {
      if (socket) {
        socket.emit('newFamilyImageMessage', {
          familyId: id_family,
          imageData: base64Image,
        });
        console.log('Message sent!');
      }
    } catch (error) {
      console.error('Error sending image:', error);
    }
  };

  const sendMessage = async () => {
    if (socket) {
      socket.emit('newFamilyMessage', {
        message: message,
        familyId: id_family,
      });
      console.log('Message sent!');
    } else {
      console.log('socket error');
    }
  };

  const handleSendMessage = async () => {
    await sendMessage();
    setMessage('');
    setRefreshFlatList(prevState => !prevState); 
    await fetchNewMessages(); 
  };

  const handleSendImage = async (imageData: string) => {
    await sendImage(imageData);
    setRefreshFlatList(prevState => !prevState); 
    await fetchNewMessages(); 
  };
  
  const handleImagePress = (item: Message) => {
    const itemIndex = messages.findIndex(message => message === item);
    setSelectedImageIndex(itemIndex);
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

  const renderMemberMessage = (item: Message) => {
    const member = memberLookup[item.senderId];
    if (member) {
      return (
        <View style={{ flexDirection: 'row', marginVertical: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <Image source={{ uri: member.avatar }} style={styles.avatar} />
          </View>
          <View style={[styles.messageContainer, styles.receiverMessageContainer]}>
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
        </View>
      );
    }
    return null;
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handleVideoCall = () => {};

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
              <Text style={styles.nameText}> {family.name}</Text>
            </>
          )}
        </View>
        <TouchableOpacity onPress={handleVideoCall}>
          <Icon name="videocam" size={36} style={styles.videoCallButton} />
        </TouchableOpacity>
      </View>
      <FlatList
        key={refreshFlatList ? 'refresh' : 'no-refresh'}
        style={styles.messagesContainer}
        contentContainerStyle={styles.contentContainer}
        data={messages}
        inverted
        renderItem={({ item, index }) => (
          <View>
            {item.senderId !== id_user ? renderMemberMessage(item) : (
              <View style={[styles.messageContainer, styles.senderMessageContainer]}>
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
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        keyboardShouldPersistTaps="handled"
        onEndReached={loadMoreMessages}
        onEndReachedThreshold={0.1}
      />
      <View style={[styles.inputContainer, keyboardIsOpen && { paddingBottom: 60 }]}>
        <TextInput
          style={[styles.input, { flexGrow: 1, marginBottom: Platform.OS === 'ios' ? 0 : 10 }]}
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

export default ChatFamilyScreen;
