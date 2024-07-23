import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {
  ChatListProps,
  PurchasedScreenProps,
  ViewAllFamilyScreenProps,
} from 'src/navigation/NavigationTypes';
import ChatServices from 'src/services/apiclient/ChatServices';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {Swipeable} from 'react-native-gesture-handler';
import IconL from 'react-native-vector-icons/Ionicons';
import {getSocket} from 'src/services/apiclient/Socket';
import {LastMessage} from 'src/interface/chat/chat';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import { UserProfile } from 'src/interface/user/userProfile';
import { FamilyLastMessage } from 'src/interface/chat/family';
import { useDispatch, useSelector } from 'react-redux';
import { setLastMessage, setUserMessage } from 'src/redux/slices/MessageUser';
import { setFamilyLastMessage } from 'src/redux/slices/MessageFamily';
import { selectProfile } from 'src/redux/slices/ProfileSclice';
import { getTranslate } from 'src/redux/slices/languageSlice';
import { useThemeColors } from 'src/hooks/useThemeColor';


const ChatListScreen = ({
  navigation,
}: PurchasedScreenProps & ViewAllFamilyScreenProps) => {
  const [chatsFamily, setChatsFamily] = useState<FamilyLastMessage[]>([]);

  const [chats, setChats] = useState<LastMessage[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [selectedButton, setSelectedButton] = useState<'Home' | 'Channels'>(
    'Home',
  );
  let socket = getSocket();
  const dispatch = useDispatch();
  const profile=useSelector(selectProfile);
  const translate = useSelector(getTranslate);
  const color = useThemeColors();

  const formatDateTime = (dateTime: Date) => {
    if (!dateTime) {
      return '';
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
  const fetchMessageFamily = async() => {
    try{
      const response = await ChatServices.getFamilyChats();
      console.log(response)
      setChatsFamily(response);

    } catch (error){
      console.error('Error in getFamilyChats:', error.message);

    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      if (currentPage === 0) {
        setChats([]);
      }
      const response = await ChatServices.GetUserChat({ index: currentPage });
  
      if (Array.isArray(response)) {
        if (response.length > 0) {
          response.sort((a, b) => new Date(b.latestMessage.timestamp) - new Date(a.latestMessage.timestamp));
  
          const uniqueMessages = [];
          const seenPairs = new Set();
  
          response.forEach((item) => {
            const pair = `${item.latestMessage.senderId}-${item.latestMessage.receiverId}`;
            if (!seenPairs.has(pair)) {
              seenPairs.add(pair);
              uniqueMessages.push(item);
            }
          });
  
          const formattedResponse = uniqueMessages.map((item) => ({
            ...item,
            latestMessage: {
              ...item.latestMessage,
              timestamp: item.latestMessage.timestamp ? new Date(item.latestMessage.timestamp) : null,
            },
          }));
  
          setChats((prevChats) => [...prevChats, ...formattedResponse]);
          setCurrentPage(currentPage + 1);
        }
      } else if (typeof response === 'object' && response.latestMessage) {
        const formattedResponse = {
          ...response,
          latestMessage: {
            ...response.latestMessage,
            timestamp: response.latestMessage.timestamp ? new Date(response.latestMessage.timestamp) : null,
          },
        };
        setChats((prevChats) => [...prevChats, formattedResponse]);
      } else {
        console.error('Unexpected response format:', response);
        Alert.alert('Error', 'Unexpected response format. Please try again.');
      }
  
    } catch (error) {
      console.error('Error fetching chat data:', error);
      Alert.alert('Error', 'Failed to fetch user data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  
  
  const loadMoreMessages = () => {
    // if (!loading && currentPage < totalPages) {
    //   setCurrentPage(prevPage => prevPage + 1);
    // }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    fetchMessageFamily();
  }, []);

  const handlePressChat = (message: LastMessage) => {
    dispatch(setUserMessage(message.latestMessage.receiver));
    navigation.navigate('ChatStack', {
      screen: 'ChatUser',
      params: {receiverId: message.receiverId},
    });
  };


  const handlePressHome = () => {
    setSelectedButton('Home');
  };

  const handlePressChannels = () => {
    setSelectedButton('Channels');
  };

  const onDelete = async (message) => {
    Alert.alert(
      translate('confirmDelete'),
      translate('confirmDeleteMessage'),
      [
        {
          text: translate('cancel'),
          style: 'cancel',
        },
        {
          text: translate('delete'),
          onPress: async () => {
            try {
              await ChatServices.removeMessage(receiverId, message._id);
              Alert.alert(translate('success'), translate('deleteSuccessMessage'));
              //await handleGetCalendar();
            } catch (error) {
              console.error('Error deleting event:', error);
              Alert.alert(translate('error'), translate('deleteErrorMessage'));
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  useEffect(() => {
    if (socket) {
      socket.on('onNewMessage', fetchData);
      socket.on('onNewImageMessage', fetchData);
    }

    return () => {
      if (socket) {
        socket.off('onNewMessage', fetchData);
        socket.off('onNewImageMessage', fetchData);
      }
    };
  }, [socket]);

  const renderRightActions = (event: any) => (
    <View style={styles.rightAction}>
      <Ionicons
        name="trash-sharp"
        size={30}
        color="#fff"
        onPress={() => onDelete(event)}
      />
      <Text style={{color: '#fff', marginTop: 5, fontWeight: '600'}}>
        Delete
      </Text>
    </View>
  );
  const renderChatItem = ({ item }: { item: LastMessage }) => (
    <Swipeable renderRightActions={() => renderRightActions(item)}>
      <TouchableOpacity onPress={() => handlePressChat(item)}>
        <View style={styles.chatItem}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: item.latestMessage.receiver.avatar }}
              style={styles.avatar}
            />
          </View>
  
          <View style={styles.messageContainer}>
            <Text style={[styles.username, {color: color.text}]}>
              {item.latestMessage.receiver.firstname}{' '}
              {item.latestMessage.receiver.lastname}
            </Text>
            {item.latestMessage.type === 'photo' ? (
              <Text style={[styles.messageText, {color: color.textSubdued}]}>{translate('Sent image')}</Text>
            ) : item.latestMessage.type === 'video' ? (
              <Text style={[styles.messageText, {color: color.textSubdued}]}>{translate('Sent video')}</Text>
            ) : (
              <Text
                style={[
                  styles.messageText, {color: color.textSubdued},
                  !item.latestMessage.isRead && styles.boldText,
                ]}
              >
                {item.latestMessage.senderId === profile.id_user ? 'You: ' : item.latestMessage.receiver.firstname + ': '}
                {item.latestMessage.content}
              </Text>
            )}
          </View>
          
          <Text style={[styles.messageTimestamp, {color: color.textSubdued}]}>
            {item.latestMessage.timestamp
              ? formatDateTime(item.latestMessage.timestamp)
              : ''}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
  
  const handlePressChatFamily = async (message: FamilyLastMessage) => {
    await dispatch(setFamilyLastMessage(message));
    navigation.navigate('ChatStack', {
      screen: 'ChatFamilyLast'
    });  
  }

  const renderChatFamilyItem = ({ item }: { item: FamilyLastMessage }) => (
    <Swipeable renderRightActions={() => renderRightActions(item)}>
      <TouchableOpacity onPress={() => handlePressChatFamily(item)}>
        <View style={styles.chatItem}>
          <View style={styles.avatarContainer}>
          
              <>
                <Image
                  source={{ uri: item.avatar }}
                  style={[styles.avatar, { top: 5 }]}
                />
              </>
            
          </View>
  
          <View style={styles.messageContainer}>
          <Text style={[styles.username, {color: color.text}]}>{item.name}</Text>
          {item.lastMessage.type === 'photo' ? (
            <Text style={styles.messageText}>{translate('Sent image')}</Text>
          ) : item.lastMessage.type === 'video' ? (
            <Text style={styles.messageText}>{translate('Sent video')}</Text>
          ) : (
            <Text style={[styles.messageText, {color: color.textSubdued}, !item.lastMessage.isRead && styles.boldText]}>
              {item.lastMessage.content}
            </Text>
          )}
        </View>
          <Text style={[styles.messageTimestamp, {color: color.textSubdued}]}>
            {item.lastMessage.timestamp ? formatDateTime(new Date(item.lastMessage.timestamp)) : ''}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
  

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: color.background}]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          paddingVertical: 10,
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={{fontSize: 24, fontWeight: '600', color: color.text}}>{translate('Chat')}</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="chat-plus-outline"
            size={28}
            style={styles.backButton}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.header, {backgroundColor: color.background}]}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={translate('SEARCH')}
            placeholderTextColor="#999999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Icon name="search" size={20} style={styles.searchIcon} />
        </View>
      </View>
      {/* {renderAllUser()} */}
      <View style={[styles.buttonContainer, {backgroundColor: color.background}]}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === 'Home' && styles.buttonSelected,
          ]}
          onPress={handlePressHome}>
          <Text
            style={[
              styles.buttonText,
              selectedButton === 'Home' && styles.buttonTextSelected,
            ]}>
            {translate('Home')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === 'Channels' && styles.buttonSelected,
          ]}
          onPress={handlePressChannels}>
          <Text
            style={[
              styles.buttonText,
              selectedButton === 'Channels' && styles.buttonTextSelected,
            ]}>
            {translate('Channels')}
          </Text>
        </TouchableOpacity>
      </View>
    {selectedButton === 'Home' && (
      <FlatList
        data={chats}
        keyExtractor={item => item._id}
        renderItem={renderChatItem}
        onEndReached={loadMoreMessages}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    )}
    {selectedButton === 'Channels' && (
      <FlatList
        data={chatsFamily}
        keyExtractor={item => item._id}
        renderItem={renderChatFamilyItem}
        onEndReached={loadMoreMessages}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    )}

    </SafeAreaView>
  );
};

export default ChatListScreen;
