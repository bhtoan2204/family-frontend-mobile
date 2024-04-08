import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import io from 'socket.io-client';
import styles from './styles';
import {ChatScreenProps} from 'src/navigation/NavigationTypes';
import ChatServices from 'src/services/apiclient/ChatServices';
import LocalStorage from 'src/store/localstorage';
import {FamilyServices} from 'src/services/apiclient';
import {AxiosResponse} from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import RNFS from 'react-native-fs';
import {COLORS} from 'src/constants';

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

const ChatScreen = ({navigation, route}: ChatScreenProps) => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [receiver, setReceiver] = useState<Member>();
  const [sender, setSender] = useState<Member>();
  const [accessToken, setAccessToken] = useState<string>('');
  const {id_user} = route.params || {};
  const receiverId = '28905675-858b-4a93-a283-205899779622';
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    fetchMember(receiverId, id_user);
    fetchMessages();
    fetchAccessToken();
  }, [currentIndex]);

  const fetchMember = async (receiverId: string, id_user?: string) => {
    try {
      const response1: AxiosResponse<Member[]> = await FamilyServices.getMember(
        {id_user: receiverId},
      );
      if (response1) {
        setReceiver(response1.data[0]);
      }
      const response2: AxiosResponse<Member[]> = await FamilyServices.getMember(
        {id_user: id_user},
      );
      if (response2) {
        setSender(response2.data[0]);
      }
    } catch (error) {
      console.error('Error fetching member:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await ChatServices.GetMessages({
        id_user: receiverId,
        index: currentIndex,
      });
      if (response) {
        setMessages(prevMessages => [...prevMessages, ...response]);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchAccessToken = async () => {
    try {
      const token = await LocalStorage.GetAccessToken();
      if (token) {
        setAccessToken(token);
      }
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  const loadMoreMessages = () => {
    setCurrentIndex(currentIndex + 1);
    fetchMessages();
  };

  const sendMessage = async () => {
    try {
      const socket = io('https://api.rancher.io.vn/chat', {
        transports: ['websocket'],
        extraHeaders: {Authorization: `Bearer ${accessToken}`},
      });

      socket.emit('newMessage', {
        message: message,
        receiverId: receiverId,
      });
      console.log('Message sent!');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  const sendImage = async () => {
    try {
      const socket = io('https://api.rancher.io.vn/chat', {
        transports: ['websocket'],
        extraHeaders: {Authorization: `Bearer ${accessToken}`},
      });

      socket.emit('newImageMessage', {
        receiverId: receiverId,
        imageData: image,
      });
      console.log('Message sent!');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  const handleSendImage = async () => {
    await sendImage();
    setImage('');
    fetchMessages();
  };
  const handleSendMessage = async () => {
    await sendMessage();
    setMessage('');
    fetchMessages();
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
        reader.onerror = error => {
          reject(error);
        };
      });
    } catch (error) {
      throw new Error('Error fetching image data: ' + error);
    }
  };

  // const base64ToUint8Array = async (base64: string): Promise<Uint8Array> => {
  //   const buffer = Buffer.from(base64, 'base64');
  //   return new Uint8Array(buffer);
  // }

  const handleOpenImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      //console.log(result.assets[0].uri)
      const base64Image = await imageToBase64(result.assets[0].uri);
      if (base64Image !== null) {
        //console.log(base64ToUint8Array(base64Image));
        //console.log(base64Image)
        setImage(base64Image);
        handleSendImage();
      } else {
        console.log('Error converting image to base64');
      }
    }
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.receiverInfo}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: 'https://qph.cf2.quoracdn.net/main-qimg-b64dc16e0d814330a7b20cad5e3eac5e-lq',
              }}
              style={styles.avatar}
            />
          </View>
          <Text
            style={[styles.receiverName, {marginTop: 10}, {marginRight: 5}]}>
            {receiver?.firstname} {receiver?.lastname}
          </Text>
        </View>
      </View>
      <FlatList
        ref={flatListRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.contentContainer}
        data={messages}
        inverted
        renderItem={({item}) => {
          if (item.type === 'photo') {
            return (
              <View
                style={[
                  styles.messageContainer,
                  item.Id === id_user
                    ? styles.senderMessageContainer
                    : styles.receiverMessageContainer,
                ]}>
                <View style={styles.messageContentContainer}>
                  {/* <Image source={{ uri: item.content }} style={styles.imageMessage} /> */}
                  <Text> {item.content}</Text>
                </View>
              </View>
            );
          } else {
            return (
              <View
                style={[
                  styles.messageContainer,
                  item.senderId === id_user
                    ? styles.senderMessageContainer
                    : styles.receiverMessageContainer,
                ]}>
                <Text
                  style={
                    item.senderId === id_user
                      ? styles.senderMessageContent
                      : styles.receiverMessageContent
                  }>
                  {item.content}
                </Text>
              </View>
            );
          }
        }}
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
        <TouchableOpacity
          onPress={handleOpenImageLibrary}
          style={{marginRight: 15}}>
          <Icon name="images" size={30} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSendMessage}>
          <Icon name="send" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
