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
import { useDispatch } from 'react-redux';
import { setLastMessage } from 'src/redux/slices/MessageUser';
import { setFamilyLastMessage } from 'src/redux/slices/MessageFamily';
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
      const response = await ChatServices.GetUserChat({ index: currentPage });
  
      if (Array.isArray(response)) {
        if (response.length > 0) {
          const formattedResponse = response.map((item) => ({
            ...item,
            latestMessage: {
              ...item.latestMessage,
              timestamp: item.latestMessage.timestamp ? new Date(item.latestMessage.timestamp) : null,
            },
          }));
          setChats((prevChats) => [...prevChats, ...formattedResponse]);
          setCurrentPage(currentPage + 1);
        } else {
          setCurrentPage(currentPage);
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
        setCurrentPage(currentPage + 1);
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
    dispatch(setLastMessage(message));
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

  const renderAllUser = () => (
    <View style={styles.userHeaderContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {users.map((user, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePressChat(user.id_user)}>
            <View
              style={[
                styles.userContainer,
                !user.avatar && styles.userContainerWithoutAvatar,
              ]}>
              {user.avatar ? (
                <Image source={{uri: user.avatar}} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text
                    style={
                      styles.avatarText
                    }>{`${user.firstname.charAt(0)}${user.lastname.charAt(0)}`}</Text>
                </View>
              )}
              {/* {user.isActive && <View style={styles.activeDot} />}  Chỉ hiển thị khi user.isActive là true */}
              <View style={styles.activeDot} />
              <Text
                style={
                  styles.userName
                }>{`${user.firstname} ${user.lastname}`}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
  const onDelete = async (event: any) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this event?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              //await CalendarServices.DeleteEvent(event.id_calendar);
              Alert.alert('Success', 'Event has been deleted successfully.');
              //await handleGetCalendar();
            } catch (error) {
              console.error('Error deleting event:', error);
              Alert.alert(
                'Error',
                'An error occurred while deleting the event.',
              );
            }
          },
        },
      ],
      {cancelable: true},
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
  const renderChatItem = ({item}: {item: LastMessage}) => (
    <Swipeable renderRightActions={() => renderRightActions(item)}>
      <TouchableOpacity onPress={() => handlePressChat(item)}>
        <View style={styles.chatItem}>
          <View style={styles.avatarContainer}>
            {item.latestMessage.receiver.avatar ? (
              <>
                <Image
                  source={{uri: item.latestMessage.receiver.avatar}}
                  style={[styles.avatar, {top: 5}]}
                />
                <View style={[styles.activeDot, {bottom: 15}]} />
              </>
            ) : (
              <>
                <Text style={styles.avatarText}>
                  {`${item.latestMessage.receiver.firstname.charAt(0)}${item.latestMessage.receiver.lastname.charAt(0)}`}
                </Text>
                <View style={[styles.activeDot, {bottom: 15}]} />
              </>
            )}
          </View>

          <View style={styles.messageContainer}>
            <Text
              style={
                styles.username
              }>{`${item.latestMessage.receiver.firstname} ${item.latestMessage.receiver.lastname}`}</Text>
            {item.latestMessage.type === 'photo' ? (
            <Text style={styles.messageText}>Sent image</Text>
          ) : item.latestMessage.type === 'video' ? (
            <Text style={styles.messageText}>Sent video</Text>
          ) : (
            <Text style={[styles.messageText, !item.latestMessage.isRead && styles.boldText]}>
              {item.latestMessage.content}
            </Text>
          )}
          </View>
          <Text style={styles.messageTimestamp}>
            {item.latestMessage.timestamp
              ? formatDateTime(item.latestMessage.timestamp)
              : ''}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
  const handlePressChatFamily = (message: FamilyLastMessage) => {
    dispatch(setFamilyLastMessage(message))
    navigation.navigate('ChatStack', {
      screen: 'ChatFamily',
      params: { id_family: message.familyId },
    });  
  }
  const renderChatFamilyItem = ({ item }: { item: FamilyLastMessage }) => (
    <Swipeable renderRightActions={() => renderRightActions(item)}>
      <TouchableOpacity onPress={() => handlePressChatFamily(item)}>
        <View style={styles.chatItem}>
          <View style={styles.avatarContainer}>
            {item.avatar ? (
              <>
                <Image
                  source={{ uri: item.avatar }}
                  style={[styles.avatar, { top: 5 }]}
                />
                <View style={[styles.activeDot, { bottom: 15 }]} />
              </>
            ) : (
              <>
                <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
                <View style={[styles.activeDot, { bottom: 15 }]} />
              </>
            )}
          </View>
  
          <View style={styles.messageContainer}>
          <Text style={styles.username}>{item.name}</Text>
          {item.lastMessage.type === 'photo' ? (
            <Text style={styles.messageText}>Sent image</Text>
          ) : item.lastMessage.type === 'video' ? (
            <Text style={styles.messageText}>Sent video</Text>
          ) : (
            <Text style={[styles.messageText, !item.lastMessage.isRead && styles.boldText]}>
              {item.lastMessage.content}
            </Text>
          )}
        </View>
          <Text style={styles.messageTimestamp}>
            {item.lastMessage.timestamp ? formatDateTime(new Date(item.lastMessage.timestamp)) : ''}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
  

  return (
    <SafeAreaView style={styles.container}>
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
        <Text style={{fontSize: 24, fontWeight: '600'}}>Chats</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="chat-plus-outline"
            size={28}
            style={styles.backButton}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#999999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Icon name="search" size={20} style={styles.searchIcon} />
        </View>
      </View>
      {/* {renderAllUser()} */}
      <View style={styles.buttonContainer}>
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
            Home
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
            Channels
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
