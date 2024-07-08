import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import ImageView from 'react-native-image-viewing';
import { FamilyServices, ChatServices } from 'src/services/apiclient';
import { ChatFamilyScreenProps } from 'src/navigation/NavigationTypes';
import styles from './styles';
import { Keyboard } from 'react-native';
import { getSocket } from '../../../services/apiclient/Socket';
import { selectProfile } from 'src/redux/slices/ProfileSclice';
import EmojiPicker from '../EmojiPicker';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from 'src/constants';
import * as MediaLibrary from 'expo-media-library';
import { Video } from 'expo-av';
import { selectFamilyLastMessage } from 'src/redux/slices/MessageFamily';
import { Message } from 'src/interface/chat/family';
import { Member } from 'src/interface/member/member';
import { selectSelectedFamily } from 'src/redux/slices/FamilySlice';



const ChatFamilyScreen = ({ navigation, route }: ChatFamilyScreenProps) => {
  const profile = useSelector(selectProfile);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isTextInputEmpty, setIsTextInputEmpty] = useState(true);
  const dispatch = useDispatch();

  const [memberLookup, setMemberLookup] = useState<{ [key: string]: Member }>({});
  const [refreshFlatList, setRefreshFlatList] = useState(false); 
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false); 
  let socket = getSocket();
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null,
  );
  let family = useSelector(selectSelectedFamily);


  useEffect(() => {
    fetchMember();
    fetchMessages();

    setIsTextInputEmpty(message.trim() === '');
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsOpen(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsOpen(false);
    });
    if (socket) {
    socket.on('onNewFamilyMessage', fetchNewMessages);
    socket.on('onNewFamilyImageMessage', fetchNewMessages);

    }

    return () => {
      if (socket) {
      socket.off('onNewFamilyMessage', fetchNewMessages);
      socket.off('onNewFamilyImageMessage', fetchNewMessages);

    }
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


  const fetchMember = async () => {
    try {
      const response = await FamilyServices.getAllMembers({ id_family: family.id_family });
      if (Array.isArray(response)) {
        setMembers(response);
      }
    } catch (error) {
      console.error('Error fetching member:', error);
    }
  };

  const fetchMessages = useCallback(async () => {
    try {
      const response = await ChatServices.GetFamilyMessages({ id_family:  family.id_family, index: currentIndex });
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
  }, [currentIndex]);

  const fetchNewMessages = (newMessage: Message) => {
    console.log(newMessage)
    setMessages(prevMessages => [newMessage, ...prevMessages]);
  };
  
  
  const loadMoreMessages = () => {
    setCurrentIndex(currentIndex + 1);
  };
  
  const sendImage = async (uri: string) => {
    try {
      const response = await ChatServices.sendFamilyImage({
        uri: uri,
        familyId:  family.id_family,
      });
      fetchNewMessages(response);
    } catch (error) {
      console.error('Error sendImage:', error);
    }
  };


  const sendMessage = async () => {
    try {
      const response = await ChatServices.sendFamilyMessage({
        message: message,
        familyId:  family.id_family,
      });
      fetchNewMessages(response);
    } catch (error) {
      console.error('Error sending messages:', error);
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
      
      const response = await ChatServices.sendFamilyVideo( family.id_family, uri)
      const data = await response.json();
      if (response) {

      } else {
        throw new Error('Failed to send video');
      }
    } catch (error) {
      throw new Error('API request failed');
    }
  };

  const MAX_FILE_SIZE = 10 * 1024 * 1024; 

  const handleOpenImageLibrary = async () => {
    try {
      const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();
      if (mediaLibraryStatus !== 'granted') {
        Alert.alert('Permission required', 'Permission to access media library is required.');
        return;
      }
  
      const { status: imagePickerStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (imagePickerStatus !== 'granted') {
        Alert.alert('Permission required', 'Permission to access image library is required.');
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
  
        if (!uri) {
          console.error('No URI returned from ImagePicker');
          Alert.alert('Error', 'Failed to pick an image or video.');
          return;
        }
  
        if (asset.type === 'image') {
          const compressedImage = await ImageManipulator.manipulateAsync(
            uri,
            [],
            { compress: 0.5 },
          );
  
          console.log('Compressed Image URI:', compressedImage.uri);
  
          const fileInfo = await FileSystem.getInfoAsync(compressedImage.uri);
          console.log('File info:', fileInfo);
  
          if (fileInfo.exists && fileInfo.size && fileInfo.size < MAX_FILE_SIZE) {
            
            await handleSendImage(compressedImage.uri);
          } else {
            Alert.alert('Selected file size exceeds the limit or could not determine file size');
          }
        } else if (asset.type === 'video') {
          const savedAsset = await MediaLibrary.createAssetAsync(uri);
          console.log('Created Asset info:', savedAsset);
  
          if (!savedAsset) {
            console.error('No asset information returned from MediaLibrary');
            Alert.alert('Error', 'Failed to save video to media library.');
            return;
          }
  
          const assetInfo = await MediaLibrary.getAssetInfoAsync(savedAsset.id);
          console.log('Asset Info:', assetInfo);
  
          if (assetInfo && assetInfo.localUri) {
            const fileInfo = await FileSystem.getInfoAsync(assetInfo.localUri);
            console.log('File info:', fileInfo);
  
            if (fileInfo.exists && fileInfo.size && fileInfo.size < MAX_FILE_SIZE) {
              await sendVideoMessage(assetInfo.localUri);
            } else {
              Alert.alert('Selected file size exceeds the limit or could not determine file size');
            }
          } else {
            console.error('Could not retrieve local URI for the video');
            Alert.alert('Error', 'Failed to retrieve local URI for the video.');
          }
        } else {
          Alert.alert('Unsupported file type');
        }
      } else {
        console.error('No valid assets returned from ImagePicker');
        Alert.alert('Error', 'No valid assets returned from ImagePicker');
      }
    } catch (error) {
      console.error('Error opening image library:', error);
      Alert.alert('Error opening image library. Please try again.');
    }
  };

  const renderMemberMessage = (item: Message) => {
    const member = memberLookup[item.senderId];
    if (member) {
      return (
        <View>
          <View style={styles.container}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: member.user.avatar }} style={styles.avatar} />
          </View>
          <View style={styles.textContainer}>
            <Text style={{color: 'gray', fontSize: 14, marginLeft: 5,}}>{member.user.firstname}</Text>
            <View style={[styles.messageContainer, styles.receiverMessageContainer]}>
              {item.type === 'photo' ? (
                <TouchableOpacity onPress={() => onMessagePress(item)}>
                  <View style={styles.messageContentContainer}>
                    <Image source={{ uri: item.content }} style={styles.imageMessage} />
                  </View>
                </TouchableOpacity>
              ) : (
                <Text style={styles.senderMessageContent}>{item.content}</Text>
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

  const handleEmojiChange = (emoji) => {
    setSelectedEmoji(emoji);
    setMessage((prevMessage) => prevMessage + emoji);
  };

  const onMessagePress = (item: Message) => {
    if( item.type === 'photo'){

    const itemIndex = messages.findIndex(
      message =>
        message.senderId === item.senderId && message.content === item.content,
    );
  
    setSelectedImageIndex(itemIndex );
  }
    setSelectedMessageId(prevId => (prevId === item._id ? null : item._id));
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
            {family && (
              <>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={{uri: family.avatar}}
                    style={styles.avatar}
                  />
                  <View style={[styles.activeDot, {top: 15, right: 10}]} />
                  <Text style={styles.avatarText}>
                    {' '}
                    {family.name}
                  </Text>
                </View>
              </>
            )
            }
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
        key={refreshFlatList ? 'refresh' : 'no-refresh'}
        style={styles.messagesContainer}
        contentContainerStyle={styles.contentContainer}
        data={messages}
        inverted
        renderItem={({ item, index }) => (
          <TouchableOpacity         onPress={() => onMessagePress(item)}
> 

          <View>
            {item.senderId !== profile.id_user ? renderMemberMessage(item) : (
              <View style={[styles.messageContainer, styles.senderMessageContainer]}>
                {item.type === 'photo' ? (
                  <TouchableOpacity onPress={() => onMessagePress(item)}>
                    <View style={styles.messageContentContainer}>
                      <Image source={{ uri: item.content }} style={styles.imageMessage} />
                    </View>
                  </TouchableOpacity>
                ) : item.type === 'video' ? (
                  <View style={styles.messageContentContainer}>
                    <Video
                      source={{ uri: item.content }}
                      useNativeControls
                      resizeMode='contain'
                      style={{ width: 300, height: 200 }}
                    />
                  </View>
                ) : (
                  <Text style={styles.senderMessageContent}>{item.content}</Text>
                )}
              </View>

            )}
          </View>
        </TouchableOpacity>

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
                    <View
                      style={[styles.activeDotBig, {bottom: 40, left: 55}]}
                    />
                    <Text style={styles.avatarTextFirst}>
                      {' '}
                      {family.name}
                    </Text>
                  </View>
                </>
              )}
              <Text style={styles.introText}>
                You haven't received any message from  {family?.name} yet.
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
