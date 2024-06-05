import React, { useEffect, useState } from 'react';
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
import { ChatListProps, PurchasedScreenProps, ViewAllFamilyScreenProps } from 'src/navigation/NavigationTypes';
import ChatServices from 'src/services/apiclient/ChatServices';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { Profile } from 'src/interface/user/userProfile';
import { Swipeable } from 'react-native-gesture-handler';
import IconL from 'react-native-vector-icons/Ionicons';

export interface LastMessage {
  receiverId: string;
  _id: string;
  messages: Message[];
  user: User;
}
export interface Message {
  senderId: string;
  receiverId: string;
  type: string;
  content: string;
  isRead: boolean;
  timestamp: Date;
  _id: string;
}

export interface User {
  firstname: string;
  lastname: string;
  avatar: string | null;
}

const ChatListScreen = ({
  navigation,
}: PurchasedScreenProps & ViewAllFamilyScreenProps) => {
  const [chats, setChats] = useState<LastMessage[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [selectedButton, setSelectedButton] = useState<'Home' | 'Channels'>('Home');

  const fetchUser = async () => {
    try {
      const response = await ChatServices.GetAllUser({ index: 0 });
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

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const response = await ChatServices.GetUserChat({ index: page });
      const formattedResponse = response.map((item: LastMessage) => ({
        ...item,
        messages: item.messages.map((message) => ({
          ...message,
          timestamp: message.timestamp ? new Date(message.timestamp) : null,
        })),
      }));
      setChats((prevChats) => [...prevChats, ...formattedResponse]);
      setTotalPages(formattedResponse.length > 0 ? page + 1 : page);
    } catch (error) {
      console.error('Error fetching chat data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreMessages = () => {
    if (!loading && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchUser();
  }, []);

  const handlePressChat = (receiverId?: string) => {
    navigation.navigate('ChatStack', {screen: 'ChatUser', params: { receiverId: receiverId }});
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
          <TouchableOpacity key={index} onPress={() => handlePressChat(user.id_user)}>
            <View style={[styles.userContainer, !user.avatar && styles.userContainerWithoutAvatar]}>
              {user.avatar ? (
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>{`${user.firstname.charAt(0)}${user.lastname.charAt(0)}`}</Text>
                </View>
              )}
              <Text style={styles.userName}>{`${user.firstname} ${user.lastname}`}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
  const onDelete = async (event: Event) => {
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
                        Alert.alert('Error', 'An error occurred while deleting the event.');
                    }
                },
            },
        ],
        { cancelable: true }
    );
};

const onUpdate = (event: Event) => {
    //setEventDetails(event);
    //bottomSheetRef.current?.open();
};

  const renderRightActions = (event) => (
    <View style={styles.rightAction}>
        <IconL name="create-outline" size={35} color="gray" onPress={() => onUpdate(event)} />
        <IconL name="trash-outline" size={35} color="red" onPress={() => onDelete(event)} />
    </View>
);
  const renderChatItem = ({ item }: { item: LastMessage }) => (
    <Swipeable renderRightActions={() => renderRightActions(item)}>

    <TouchableOpacity onPress={() => handlePressChat(item.receiverId)}>
      <View style={styles.chatItem}>
        <View style={styles.avatarContainer}>
          {item.user.avatar ? (
            <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
          ) : (
            <Text style={styles.avatarText}>{`${item.user.firstname.charAt(0)}${item.user.lastname.charAt(0)}`}</Text>
          )}
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.username}>{`${item.user.firstname} ${item.user.lastname}`}</Text>
          {item.messages[0]?.type === 'photo' ? (
            <Text style={styles.messageText}>Sent image</Text>
          ) : (
            <Text style={styles.messageText}>{item.messages[0]?.content}</Text>
          )}
        </View>
        <Text style={styles.messageTimestamp}>
          {item.messages[0]?.timestamp ? formatDateTime(item.messages[0].timestamp) : ''}
        </Text>
      </View>
    </TouchableOpacity>
    </Swipeable>

  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} style={styles.backButton} />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Icon name="search" size={20} style={styles.searchIcon} />
        </View>
      </View>
      {renderAllUser()}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, selectedButton === 'Home' && styles.buttonSelected]}
          onPress={handlePressHome}
        >
          <Text style={[styles.buttonText, selectedButton === 'Home' && styles.buttonTextSelected]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedButton === 'Channels' && styles.buttonSelected]}
          onPress={handlePressChannels}
        >
          <Text style={[styles.buttonText, selectedButton === 'Channels' && styles.buttonTextSelected]}>Channels</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={chats}
        keyExtractor={(item) => item._id}
        renderItem={renderChatItem}
        onEndReached={loadMoreMessages}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </SafeAreaView>
  );
};

export default ChatListScreen;
