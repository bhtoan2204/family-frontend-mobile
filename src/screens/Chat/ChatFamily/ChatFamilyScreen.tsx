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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import ImageView from 'react-native-image-viewing';
import {FamilyServices, ChatServices} from 'src/services/apiclient';
import {ChatFamilyScreenProps} from 'src/navigation/NavigationTypes';
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

const ChatFamilyScreen = ({navigation, route}: ChatFamilyScreenProps) => {
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
  let family = useSelector(selectSelectedFamily);
  const color = useThemeColors();
  const translate = useSelector(getTranslate);

  useEffect(() => {
    fetchMember();
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
    if (socket) {
      socket.on('onNewFamilyMessage', fetchNewMessages);
    }

    return () => {
      if (socket) {
        socket.off('onNewFamilyMessage', fetchNewMessages);
      }
    };
  }, [socket]);

  useEffect(() => {
    const lookup: {[key: string]: Member} = {};
    members.forEach(member => {
      lookup[member.id_user] = member;
    });
    setMemberLookup(lookup);
  }, [members]);

  const fetchMember = async () => {
    try {
      const response = await FamilyServices.getAllMembers({
        id_family: family.id_family,
      });
      if (Array.isArray(response)) {
        setMembers(response);
      }
    } catch (error) {
      //console.error('Error fetching member:', error);
    }
  };

  const fetchMessages = useCallback(async () => {
    try {
      const response = await ChatServices.GetFamilyMessages({
        id_family: family.id_family,
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
      //('Error fetching messages:', error);
    }
  }, [currentIndex]);

  const fetchNewMessages = (newMessage: Message) => {
    setMessages(prevMessages => [newMessage, ...prevMessages]);
  };

  const loadMoreMessages = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const sendImage = async (uri: string) => {
    try {
      const response = await ChatServices.sendFamilyImage({
        uri: uri,
        familyId: family.id_family,
      });
    } catch (error) {
      //console.error('Error sendImage:', error);
    }
  };

  const sendMessage = async () => {
    try {
      const response = await ChatServices.sendFamilyMessage({
        message: message,
        familyId: family.id_family,
      });
    } catch (error) {
      //console.error('Error sending messages:', error);
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
      const response = await ChatServices.sendFamilyVideo(
        family.id_family,
        uri,
      );
    } catch (error) {
      //throw new Error('API request failed');
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
    console.log(item);
    const member = memberLookup[item.senderId];
    if (member) {
      return (
        <View>
          <View style={[styles.container, {alignItems: 'flex-end'}]}>
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
          text: translate('Delete'),
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
      <View style={[styles.header, {backgroundColor: color.background}]}>
        <View
          style={[styles.receiverInfo, {backgroundColor: color.background}]}>
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
            {family && (
              <>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image source={{uri: family.avatar}} style={styles.avatar} />
                  <Text style={[styles.avatarText, {color: color.text}]}>
                    {' '}
                    {family.name}
                  </Text>
                </View>
              </>
            )}
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => handleVideoCall(family.id_family)}
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
          style={[
            styles.messagesContainer,
            {backgroundColor: color.background},
          ]}
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
            <View style={styles.introContainer}>
              {family && (
                <>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{uri: family.avatar}}
                      style={styles.avatarFirst}
                    />
                    {/* <View
                      style={[styles.activeDotBig, {bottom: 40, left: 55}]}
                    /> */}
                    <Text style={styles.avatarTextFirst}> {family.name}</Text>
                  </View>
                </>
              )}
              <Text style={[styles.introText, {color: color.text}]}>
                {translate('You havent received any message from')}{' '}
                {family?.name} {translate('yet')}.
              </Text>
              <Text style={[styles.introText, {color: color.textSubdued}]}>
                {translate('Start the conversation by sending a message.')}
              </Text>
              <View style={{backgroundColor: 'white', minHeight: 470}}></View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
      <View
        style={[
          styles.inputContainer,
          {backgroundColor: color.background},
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
              {backgroundColor: color.white, color: color.text},
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
  );
};

export default ChatFamilyScreen;
