import React, {useState, useEffect, useRef, useCallback} from 'react';
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
  Alert,
  ActivityIndicator,
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
import {Message, User} from 'src/interface/chat/chat';
import {Ionicons} from '@expo/vector-icons';
import {COLORS} from 'src/constants';
import EmojiPicker from '../EmojiPicker';
import * as MediaLibrary from 'expo-media-library';
import {Video} from 'expo-av';
import MessageItem from './RenderMessage';
import {selectLastMessage, selectReceiver} from 'src/redux/slices/MessageUser';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {getTranslate} from 'src/redux/slices/languageSlice';

const ChatScreen = ({navigation, route}: ChatScreenProps) => {
  const profile = useSelector(selectProfile);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [receiver, setReceiver] = useState<User>();

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
  const [hasReceivedMessage, setHasReceivedMessage] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const user = useSelector(selectReceiver);
  let socket = getSocket();
  const color = useThemeColors();
  const translate = useSelector(getTranslate);
  const [loading, setLoading] = useState(false);

  const markSeenMessage = async (receiverId?: string) => {
    try {
      await ChatServices.markSeenMessage({receiver_id: receiverId});
    } catch (error) {
      console.error('Error markSeenMessage:', error);
    }
  };

  const fetchMessages = useCallback(async () => {
    setReceiver(user);
    setLoading(true);

    try {
      const response = await ChatServices.GetMessages({
        id_user: receiverId,
        index: currentIndex,
      });
      if (response && response.length > 0) {
        markSeenMessage(receiverId);
        const newMessages = response.map((message: Message) => {
          if (message.type === 'photo') {
            setImages(prevImages => [...prevImages, message.content]);
          }
          return {...message, timestamp: new Date(message.timestamp)};
        });

        if (currentIndex === 0) {
          setMessages(newMessages);
        } else {
          setMessages(prevMessages => [...prevMessages, ...newMessages]);
        }

        setHasReceivedMessage(true);
        setCurrentIndex(currentIndex + 1);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  }, [receiverId, currentIndex]);

  useEffect(() => {
    fetchMessages();
  }, [currentIndex]);

  const sendMessage = async () => {
    try {
      const response = await ChatServices.sendMessages({
        message: message,
        receiverId: receiverId,
      });
    } catch (error) {
      console.error('Error sending messages:', error);
    }
  };

  const sendImage = async (uri: string) => {
    try {
      const response = await ChatServices.sendImageMessage({
        uri: uri,
        receiverId: receiverId,
      });
    } catch (error) {
      console.error('Error sendImage:', error);
    }
  };

  const fetchNewMessages = (newMessage: Message) => {
    setMessages(prevMessages => [newMessage, ...prevMessages]);
  };

  const sendVideoMessage = async (uri: any) => {
    setLoading(true);
    try {
      const response = await ChatServices.sendVideoMessage(receiverId, uri);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSendImage = async (uri: string) => {
    await sendImage(uri);
  };

  const handleSendMessage = async () => {
    await sendMessage();
    setMessage('');
  };

  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const handleOpenImageLibrary = async () => {
    try {
      const {status: mediaLibraryStatus} =
        await MediaLibrary.requestPermissionsAsync();
      if (mediaLibraryStatus !== 'granted') {
        Alert.alert(
          'Permission required',
          'Permission to access media library is required.',
        );
        return;
      }

      const {status: imagePickerStatus} =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (imagePickerStatus !== 'granted') {
        Alert.alert(
          'Permission required',
          'Permission to access image library is required.',
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const uri = asset.uri;
        console.log('Selected URI:', uri);

        if (asset.type === 'image') {
          const compressedImage = await ImageManipulator.manipulateAsync(
            uri,
            [],
            {compress: 0.5},
          );

          console.log('Compressed Image URI:', compressedImage.uri);

          const fileInfo = await FileSystem.getInfoAsync(compressedImage.uri);
          console.log('File info:', fileInfo);

          if (
            fileInfo.exists &&
            fileInfo.size &&
            fileInfo.size < MAX_FILE_SIZE
          ) {
            await handleSendImage(compressedImage.uri);
          } else {
            Alert.alert(
              'Selected file size exceeds the limit or could not determine file size',
            );
          }
        } else if (asset.type === 'video') {
          const savedAsset = await MediaLibrary.createAssetAsync(uri);

          if (!savedAsset) {
            return;
          }

          const assetInfo = await MediaLibrary.getAssetInfoAsync(savedAsset.id);

          if (assetInfo && assetInfo.localUri) {
            const fileInfo = await FileSystem.getInfoAsync(assetInfo.localUri);
            console.log('File info:', fileInfo);

            if (
              fileInfo.exists &&
              fileInfo.size &&
              fileInfo.size < MAX_FILE_SIZE
            ) {
              await sendVideoMessage(uri);
            } else {
              Alert.alert(
                'Selected file size exceeds the limit or could not determine file size',
              );
            }
          } else {
            Alert.alert('Error', 'Failed to retrieve local URI for the video.');
          }
        } else {
          Alert.alert('Unsupported file type');
        }
      } else {
        Alert.alert('Error', 'No valid assets returned from ImagePicker');
      }
    } catch (error) {
      Alert.alert('Error. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const onMessagePress = (item: Message) => {
    if (item.type === 'photo') {
      const itemIndex = images.findIndex(iamge => iamge === item.content);
      console.log(itemIndex);
      setSelectedImageIndex(itemIndex);
    }
    setSelectedMessageId(prevId => (prevId === item._id ? null : item._id));
  };

  useEffect(() => {
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
  }, [message]);

  useEffect(() => {
    if (socket) {
      socket.on('onNewMessage', fetchNewMessages);
    }

    return () => {
      if (socket) {
        socket.off('onNewMessage', fetchNewMessages);
      }
    };
  }, [socket, fetchNewMessages]);

  const handleVideoCall = (receiverId?: string) => {
    navigation.navigate('ChatStack', {
      screen: 'CallVideo',
      params: {receiverId: receiverId},
    });
  };

  const handleEmojiChange = emoji => {
    setSelectedEmoji(emoji);
    setMessage(prevMessage => prevMessage + emoji);
  };

  const formatDateTime = (dateTime: Date | null | undefined) => {
    if (!(dateTime instanceof Date) || isNaN(dateTime.getTime())) {
      return 'Invalid date';
    }

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
      return `${translate('Yesterday')} ${dateTime.getHours()}:${dateTime
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

  const loadMoreMessages = () => {};

  {
    loading && (
      <ActivityIndicator
        size="large"
        color={color.text}
        style={{backgroundColor: color.text}}
      />
    );
  }

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
        backgroundColor: color.chatBackground,
      }}>
      <View style={[styles.header, {backgroundColor: color.chatBackground}]}>
        <View
          style={[
            styles.receiverInfo,
            {backgroundColor: color.chatBackground},
          ]}>
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
                style={{color: COLORS.DenimBlue}}
              />
            </TouchableOpacity>
            {receiver && (
              <>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={{uri: receiver.avatar}}
                    style={styles.avatar}
                  />
                  {/* <View style={[styles.activeDot, {top: 15, right: 10}]} /> */}
                  <Text style={[styles.avatarText, {color: color.text}]}>
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
          contentContainerStyle={[
            styles.contentContainer,
            {backgroundColor: color.chatBackground},
          ]}
          data={messages}
          inverted
          renderItem={({item, index}) => (
            <MessageItem
              item={item}
              profileId={profile.id_user}
              onMessagePress={onMessagePress}
              isSelected={selectedMessageId === item._id}
              formatDateTime={formatDateTime}
            />
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
            <View
              style={[
                styles.introContainer,
                {backgroundColor: color.chatBackground},
              ]}>
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
                    {/* <View
                      style={[styles.activeDotBig, {bottom: 40, left: 55}]}
                    /> */}
                    <Text style={[styles.avatarTextFirst, {color: color.text}]}>
                      {' '}
                      {receiver.firstname} {receiver.lastname}
                    </Text>
                  </View>
                </>
              )}
              <Text style={[styles.introText, {color: color.chatdetail}]}>
                {translate('You havent received any message from')}{' '}
                {receiver?.firstname} {receiver?.lastname} {translate('yet')}.
              </Text>
              <Text style={[styles.introText, {color: color.chatdetail}]}>
                {translate('ChatDetailFirst')}
              </Text>
              <View
                style={{
                  backgroundColor: color.chatBackground,
                  minHeight: 470,
                }}></View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
      <View
        style={[
          styles.inputContainer,
          {backgroundColor: color.chatBackground},
          keyboardIsOpen && {paddingBottom: 20},
        ]}>
        <TouchableOpacity
          onPress={handleOpenImageLibrary}
          style={{marginRight: 15}}>
          <Ionicons name="image" size={30} color={COLORS.DenimBlue} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <TextInput
            style={[
              styles.input,
              {flex: 1, backgroundColor: color.searchChat, color: color.text},
            ]}
            value={message}
            onChangeText={setMessage}
            placeholder="Aa"></TextInput>

          <EmojiPicker onChange={handleEmojiChange} />
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
