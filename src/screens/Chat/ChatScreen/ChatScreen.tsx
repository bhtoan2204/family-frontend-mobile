import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './styles';
import {ChatScreenProps} from 'src/navigation/NavigationTypes';
import ChatServices from 'src/services/apiclient/ChatServices';
import {FamilyServices} from 'src/services/apiclient';
import {AxiosResponse} from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import ImageView from 'react-native-image-viewing';
import {Keyboard} from 'react-native';
import {getSocket} from 'src/services/apiclient/Socket';
import {useSelector} from 'react-redux';
import {selectProfile} from 'src/redux/slices/ProfileSclice';
import {Message} from 'src/interface/chat/chat';
import {Ionicons} from '@expo/vector-icons';
import {COLORS} from 'src/constants';

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
  const profile = useSelector(selectProfile);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [receiver, setReceiver] = useState<Member>();
  const {receiverId} = route.params || {};
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [images, setImages] = useState<string[]>([]);
  const [isTextInputEmpty, setIsTextInputEmpty] = useState(true);
  const [refreshFlatList, setRefreshFlatList] = useState(false);
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null,
  );
  const [hasReceivedMessage, setHasReceivedMessage] = useState(false); // State to track if the user has received a message

  let socket = getSocket();

  const markSeenMessage = async (receiverId?: string) => {
    try {
      await ChatServices.markSeenMessage({receiver_id: receiverId});
    } catch (error) {
      console.error('Error markSeenMessage:', error);
    }
  };

  const fetchMember = async (receiverId?: string, id_user?: string) => {
    try {
      const response: AxiosResponse<Member[]> = await FamilyServices.getMember({
        id_user: receiverId,
      });
      if (response && response.data.length > 0) {
        setReceiver(response.data[0]);
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
        const newMessages = response.map((message: any) => {
          if (message.type === 'photo') {
            setImages(prevImages => [...prevImages, message.content]);
          }
          return {...message, timestamp: new Date(message.timestamp)};
        });
        setMessages(prevMessages => [...prevMessages, ...newMessages]);
        setHasReceivedMessage(true); // Set to true once messages are fetched
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
    } else {
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
      const response = await ChatServices.GetMessages({
        id_user: receiverId,
        index: 0,
      });
      if (response && response.length > 0) {
        const firstMessage = response[0];
        if (firstMessage.type === 'photo') {
          setImages(prevImages => [firstMessage.content, ...prevImages]);
        }
        setMessages(prevMessages => [firstMessage, ...prevMessages]);
        setHasReceivedMessage(true); // Set to true once new messages are fetched
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
        const compressedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [],
          {compress: 0.5},
        );
        const fileInfo = await FileSystem.getInfoAsync(compressedImage.uri);

        if (fileInfo.exists && fileInfo.size) {
          if (fileInfo.size < 50000) {
            const base64 = await FileSystem.readAsStringAsync(
              compressedImage.uri,
              {encoding: 'base64'},
            );
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
    const itemIndex = messages.findIndex(
      message =>
        message.senderId === item.senderId && message.content === item.content,
    );
    setSelectedImageIndex(itemIndex - 1);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handlePressMessage = (messageId: string) => {
    setSelectedMessageId(prevId => (prevId === messageId ? null : messageId));
  };

  useEffect(() => {
    fetchMessages();
    fetchMember(receiverId, profile.id_user);
    setIsTextInputEmpty(message.trim() === '');

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardIsOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardIsOpen(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
    markSeenMessage();
  }, [message]);

  useEffect(() => {
    markSeenMessage(receiverId);
  }, [receiverId]);

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

  useEffect(() => {
    // Check if the user has received any message from this receiver
    if (!hasReceivedMessage) {
      return () => {}; // Return an empty function as cleanup
    }

    // Ensure to return a cleanup function when effect dependencies change
    return () => {
      // Perform cleanup logic here if needed
    };
  }, [hasReceivedMessage]); // Include dependencies here if needed

  const handleVideoCall = (receiverId?: string) => {
    navigation.navigate('ChatStack', {
      screen: 'CallVideo',
      params: {receiverId: receiverId},
    });
  };

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
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}>
      <View style={styles.header}>
        <View style={styles.receiverInfo}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                size={30}
                style={styles.backButton}
              />
            </TouchableOpacity>
            {receiver && (
              <>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={{uri: receiver.avatar}}
                    style={styles.avatar}
                  />
                  <View style={[styles.activeDot, {top: 15, right: 10}]} />
                  <Text style={styles.avatarText}>
                    {' '}
                    {receiver.firstname} {receiver.lastname}
                  </Text>
                </View>
              </>
            )}
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => handleVideoCall(receiverId)}
              style={{
                marginTop: 10,
                marginRight: 10,
              }}>
              <Ionicons
                name="videocam"
                size={29}
                style={styles.videoCallButton}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 10,
                marginRight: 10,
              }}>
              <Ionicons
                name="settings-sharp"
                size={25}
                style={styles.videoCallButton}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {hasReceivedMessage ? (
        <FlatList
          style={styles.messagesContainer}
          contentContainerStyle={styles.contentContainer}
          data={messages}
          inverted
          renderItem={({item, index}) => (
            <View
              style={[
                styles.messageWrapper,
                item.senderId === profile.id_user
                  ? styles.messageRight
                  : styles.messageLeft,
              ]}>
              <TouchableOpacity
                onPress={() => handlePressMessage(item.id)}
                style={[
                  styles.messageContainer,
                  item.senderId === profile.id_user
                    ? styles.senderMessageContainer
                    : styles.receiverMessageContainer,
                ]}>
                {item.type === 'photo' ? (
                  <View style={styles.messageContentContainer}>
                    <Image
                      source={{uri: item.content}}
                      style={styles.imageMessage}
                    />
                  </View>
                ) : (
                  <Text
                    style={[
                      styles.senderMessageContent,
                      {
                        color:
                          item.senderId === profile.id_user ? 'white' : 'black',
                      },
                    ]}>
                    {item.content}
                  </Text>
                )}
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'column',
                  marginHorizontal: 10,
                  alignItems:
                    item.senderId === profile.id_user
                      ? 'flex-end'
                      : 'flex-start',
                }}>
                {selectedMessageId === item.id && (
                  <Text style={styles.timestamp}>
                    {formatDateTime(item.timestamp)}
                  </Text>
                )}
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          keyboardShouldPersistTaps="handled"
          onEndReached={loadMoreMessages}
          onEndReachedThreshold={0.1}
        />
      ) : (
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flex: 1,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.introContainer}>
              {receiver && (
                <>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{uri: receiver.avatar}}
                      style={styles.avatarFirst}
                    />
                    <View
                      style={[styles.activeDotBig, {bottom: 40, left: 55}]}
                    />
                    <Text style={styles.avatarTextFirst}>
                      {' '}
                      {receiver.firstname} {receiver.lastname}
                    </Text>
                  </View>
                </>
              )}
              <Text style={styles.introText}>
                You haven't received any message from {receiver?.firstname}{' '}
                {receiver?.lastname} yet.
              </Text>
              <Text style={styles.introText}>
                Start the conversation by sending a message.
              </Text>
              <View style={{backgroundColor: 'white', minHeight: 470}}></View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
      <View
        style={[styles.inputContainer, keyboardIsOpen && {paddingBottom: 20}]}>
        <TouchableOpacity
          onPress={handleOpenImageLibrary}
          style={{marginRight: 15}}>
          <Ionicons name="image" size={30} color={COLORS.DenimBlue} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <TextInput
            style={[styles.input, {flex: 1}]}
            value={message}
            onChangeText={setMessage}
            placeholder="Aa"></TextInput>
          <TouchableOpacity style={{marginHorizontal: 15}}>
            <Ionicons name="happy" size={30} color={COLORS.DenimBlue} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleSendMessage}
          disabled={isTextInputEmpty}>
          <Ionicons name="send" size={30} color={COLORS.DenimBlue} />
        </TouchableOpacity>
      </View>
      <ImageView
        images={images.map(image => ({uri: image}))}
        imageIndex={selectedImageIndex || 0}
        visible={selectedImageIndex !== null}
        onRequestClose={handleCloseModal}
        backgroundColor="rgba(0, 0, 0, 0.8)"
      />
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
