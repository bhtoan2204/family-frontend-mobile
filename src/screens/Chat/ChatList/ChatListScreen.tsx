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
const ChatListScreen = ({
  navigation,
}: PurchasedScreenProps & ViewAllFamilyScreenProps) => {
  const [chats, setChats] = useState<LastMessage[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [selectedButton, setSelectedButton] = useState<'Home' | 'Channels'>(
    'Home',
  );
  let socket = getSocket();

  const fetchUser = async () => {
    try {
      const response = await ChatServices.GetAllUser({index: 0});
      setUsers(response);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

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

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await ChatServices.GetUserChat({ index: currentPage });
      const formattedResponse = response.map((item: { messages: any[]; }) => ({
        ...item,
        messages: item.messages.map((message) => ({
          ...message,
          timestamp: message.timestamp ? new Date(message.timestamp) : null,
        })),
      }));
      setChats((prevChats) => [...prevChats, ...formattedResponse]);
      setTotalPages(formattedResponse.length > 0 ? currentPage + 1 : currentPage);
    } catch (error) {
      console.error('Error fetching chat data:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const loadMoreMessages = () => {
    if (!loading && currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    fetchUser();
  }, []);

  const handlePressChat = (receiverId?: string) => {
    navigation.navigate('ChatStack', {
      screen: 'ChatUser',
      params: {receiverId: receiverId},
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

  const renderRightActions = (event: LastMessage) => (
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
      <TouchableOpacity onPress={() => handlePressChat(item.receiverId)}>
        <View style={styles.chatItem}>
          <View style={styles.avatarContainer}>
            {item.user.avatar ? (
              <>
                <Image
                  source={{uri: item.user.avatar}}
                  style={[styles.avatar, {top: 5}]}
                />
                <View style={[styles.activeDot, {bottom: 15}]} />
              </>
            ) : (
              <>
                <Text style={styles.avatarText}>
                  {`${item.user.firstname.charAt(0)}${item.user.lastname.charAt(0)}`}
                </Text>
                <View style={[styles.activeDot, {bottom: 15}]} />
              </>
            )}
          </View>

          <View style={styles.messageContainer}>
            <Text
              style={
                styles.username
              }>{`${item.user.firstname} ${item.user.lastname}`}</Text>
            {item.messages[0]?.type === 'photo' ? (
              <Text style={styles.messageText}>Sent image</Text>
            ) : (
              <Text style={styles.messageText}>
                {item.messages[0]?.content}
              </Text>
            )}
          </View>
          <Text style={styles.messageTimestamp}>
            {item.messages[0]?.timestamp
              ? formatDateTime(item.messages[0].timestamp)
              : ''}
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
      {renderAllUser()}
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
      <FlatList
        data={chats}
        keyExtractor={item => item._id}
        renderItem={renderChatItem}
        onEndReached={loadMoreMessages}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </SafeAreaView>
  );
};

export default ChatListScreen;
