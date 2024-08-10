import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import ImageView from 'react-native-image-viewing';
import {FamilyServices, ChatServices} from 'src/services/apiclient';
import {
  ChatFamilyLastScreenProps,
  ChatFamilyScreenProps,
} from 'src/navigation/NavigationTypes';
import styles from './styles';
import {Keyboard} from 'react-native';
import {getSocket} from '../../../services/apiclient/Socket';
import {selectProfile} from 'src/redux/slices/ProfileSclice';
import EmojiPicker from '../EmojiPicker';
import {Ionicons} from '@expo/vector-icons';
import {COLORS} from 'src/constants';
import * as MediaLibrary from 'expo-media-library';
import {Video} from 'expo-av';
import {selectFamilyLastMessage} from 'src/redux/slices/MessageFamily';
import {Message} from 'src/interface/chat/family';
import {Member} from 'src/interface/member/member';
import {selectSelectedFamily} from 'src/redux/slices/FamilySlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {getTranslate} from 'src/redux/slices/languageSlice';
import MessageItem from '../ChatScreen/RenderMessage';
import {Toast} from 'react-native-toast-notifications';

const ChatFamilyLastScreen = ({
  navigation,
  route,
}: ChatFamilyLastScreenProps) => {
  const profile = useSelector(selectProfile);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [images, setImages] = useState<string[]>([]);
  const [isTextInputEmpty, setIsTextInputEmpty] = useState(true);
  const dispatch = useDispatch();

  const [memberLookup, setMemberLookup] = useState<{[key: string]: Member}>({});
  const [refreshFlatList, setRefreshFlatList] = useState(false);
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
  let socket = getSocket();
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null,
  );
  let LastMessageFamily = useSelector(selectFamilyLastMessage);
  const color = useThemeColors();
  const translate = useSelector(getTranslate);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMessages();

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
    const lookup: {[key: string]: Member} = {};
    members.forEach(member => {
      lookup[member.id_user] = member;
    });
    setMemberLookup(lookup);
  }, [members]);

  useEffect(() => {
    if (socket) {
      socket.on('onNewFamilyMessage', fetchNewMessages);
    }

    return () => {
      if (socket) {
        socket.off('onNewFamilyMessage', fetchNewMessages);
      }
    };
  }, [socket]);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await ChatServices.GetFamilyMessages({
        id_family: LastMessageFamily.familyId,
        index: currentIndex,
      });
      if (response.length > 0) {
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

        setCurrentIndex(currentIndex + 1);
        console.log(currentIndex);
      }
    } catch (error) {}
  }, [currentIndex]);

  const fetchNewMessages = (newMessage: Message) => {
    setMessages(prevMessages => [newMessage, ...prevMessages]);
  };

  const loadMoreMessages = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const sendImage = async (uri: string) => {
    try {
      setIsLoading(true);
      const response = await ChatServices.sendFamilyImage({
        uri: uri,
        familyId: LastMessageFamily.familyId,
      });
    } catch (error) {
      //console.error('Error sendImage:', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    try {
      setIsLoading(true);

      const response = await ChatServices.sendFamilyMessage({
        message: message,
        familyId: LastMessageFamily.familyId,
      });
    } catch (error) {
      //console.error('Error sending messages:', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSendMessage = async () => {
    await sendMessage();
    setMessage('');
  };

  const handleSendImage = async (uri: string) => {
    await sendImage(uri);
  };

  const sendVideoMessage = async (uri: any) => {
    try {
      setIsLoading(true);
      const response = await ChatServices.sendFamilyVideo(
        LastMessageFamily.familyId,
        uri,
      );
      const data = await response.json();
      if (response) {
      } else {
        throw new Error('Failed to send video');
      }
    } catch (error) {
      throw new Error('API request failed');
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
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
          await sendVideoMessage(uri);
        }
      }
    } catch (error) {
      Alert.alert('Error. Please try again.');
    }
  };

  const renderMemberMessage = (item: Message) => {
    const member = memberLookup[item.senderId];
    if (member) {
      return (
        <View>
          <View style={styles.container}>
            <View style={styles.avatarContainer}>
              <Image source={{uri: member.user.avatar}} style={styles.avatar} />
            </View>
            <View style={styles.textContainer}>
              <Text style={{color: 'gray', fontSize: 14, marginLeft: 5}}>
                {member.user.firstname}
              </Text>
              <View
                style={[
                  styles.messageContainer,
                  styles.receiverMessageContainer,
                ]}>
                {item.type === 'photo' ? (
                  <TouchableOpacity onPress={() => onMessagePress(item)}>
                    <View style={styles.messageContentContainer}>
                      <Image
                        source={{uri: item.content}}
                        style={styles.imageMessage}
                      />
                    </View>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.senderMessageContent}>
                    {item.content}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      );
    }
    return null;
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handleVideoCall = (familyId: number) => {};

  const handleEmojiChange = emoji => {
    setSelectedEmoji(emoji);
    setMessage(prevMessage => prevMessage + emoji);
  };

  const onMessagePress = (item: Message) => {
    if (item.type === 'photo') {
      const itemIndex = images.findIndex(iamge => iamge === item.content);
      console.log(itemIndex);
      setSelectedImageIndex(itemIndex);
    }
    setSelectedMessageId(prevId => (prevId === item._id ? null : item._id));
  };
  {
    isLoading && (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={color.text} />
      </View>
    );
  }
  const formatDateTime = (dateTime: Date | null | undefined) => {
    if (!(dateTime instanceof Date) || isNaN(dateTime.getTime())) {
      return 'Invalid date';
    }
  };
  const onDeleteFamily = async (message: Message) => {
    Alert.alert(
      translate('confirmDelete'),
      translate('confirmDeleteChat'),
      [
        {
          text: translate('Cancel'),
          style: 'cancel',
        },
        {
          text: translate('Cancel'),
          onPress: async () => {
            try {
              const respone = await ChatServices.removeMessageFamily(
                LastMessageFamily.familyId,
                message._id,
              );
              if (respone) {
                setMessages(prevMessages =>
                  prevMessages.filter(msg => msg._id !== message._id),
                );
                Toast.show(translate('deleteSuccess'), {
                  type: 'success',
                  duration: 2000,
                });
              } else {
                Toast.show(translate('deleteError'), {
                  type: 'danger',
                  duration: 2000,
                });
              }
            } catch (error) {
              //console.error('Error deleting event:', error);
              Toast.show('Delete deleteError', {
                type: 'danger',
                duration: 2000,
              });
            }
          },
        },
      ],
      {cancelable: true},
    );
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: color.white,
        }}>
        <View style={[styles.header, {backgroundColor: color.white}]}>
          <View style={[styles.receiverInfo, {backgroundColor: color.white}]}>
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
              {LastMessageFamily && (
                <>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={{uri: LastMessageFamily.avatar}}
                      style={styles.avatar}
                    />
                    {/* <View style={[styles.activeDot, {top: 15, right: 10}]} /> */}
                    <Text style={[styles.avatarText, {color: color.text}]}>
                      {' '}
                      {LastMessageFamily.name}
                    </Text>
                  </View>
                </>
              )}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => handleVideoCall(LastMessageFamily.familyId)}
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
        {messages ? (
          <FlatList
            style={[styles.messagesContainer, {backgroundColor: color.white}]}
            contentContainerStyle={[
              styles.contentContainer,
              {backgroundColor: color.white},
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
                onRemoveMessage={onDeleteFamily}
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
                style={[styles.introContainer, {backgroundColor: color.white}]}>
                {LastMessageFamily && (
                  <>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{uri: LastMessageFamily.avatar}}
                        style={styles.avatarFirst}
                      />
                      <View
                        style={[styles.activeDotBig, {bottom: 40, left: 55}]}
                      />
                      <Text style={styles.avatarTextFirst}>
                        {' '}
                        {LastMessageFamily.name}
                      </Text>
                    </View>
                  </>
                )}
                <Text style={styles.introText}>
                  {translate('You havent received any message from')}{' '}
                  {LastMessageFamily?.name} {translate('yet')}.
                </Text>
                <Text style={styles.introText}>
                  {translate('Start the conversation by sending a message.')}
                </Text>
                <View
                  style={{
                    backgroundColor: color.white,
                    minHeight: 470,
                  }}></View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        )}
        <View
          style={[
            styles.inputContainer,
            {backgroundColor: color.white},
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
                {backgroundColor: color.background, color: color.text},
                {flex: 1},
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
    </TouchableWithoutFeedback>
  );
};

export default ChatFamilyLastScreen;
