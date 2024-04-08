import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {ChatListProps} from 'src/navigation/NavigationTypes';
import ChatServices from 'src/services/apiclient/ChatServices';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

interface LastMessage {
  senderId: string;
  receiverId: string;
  type: string;
  content: string;
  isRead: boolean;
  timestamp: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  firstname: string;
  lastname: string;
  avatar: string | null;
}

interface ChatItem {
  _id: string;
  lastMessage: LastMessage;
  user: User;
}

const ChatListScreen = ({navigation}: ChatListProps) => {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const response = await ChatServices.GetUserChat({index: page});
      setChats(prevChats => [...prevChats, ...response]);
      setTotalPages(response.length > 0 ? page + 1 : page);
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
    fetchData(currentPage);
  }, [currentPage]);

  const handlePressChat = (id_user: string) => {
    navigation.navigate('ChatUser', {id_user: id_user});
  };

  const renderChatItem = ({item}: {item: ChatItem}) => (
    <TouchableOpacity onPress={() => handlePressChat(item._id)}>
      <View style={styles.chatItem}>
        <View style={styles.avatarContainer}>
          {item.user.avatar ? (
            <Image source={{uri: item.user.avatar}} style={styles.avatar} />
          ) : (
            <Text
              style={
                styles.avatarText
              }>{`${item.user.firstname.charAt(0)}${item.user.lastname.charAt(0)}`}</Text>
          )}
        </View>
        <View style={styles.messageContainer}>
          <Text
            style={
              styles.username
            }>{`${item.user.firstname} ${item.user.lastname}`}</Text>
          {item.lastMessage.type === 'photo' ? (
            <Text style={styles.messageText}>Sent image</Text>
          ) : (
            <Text style={styles.messageText}>{item.lastMessage.content}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-back-outline"
            size={24}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.headerText}>Message</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="add-circle" size={24} style={styles.addButton} />
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
