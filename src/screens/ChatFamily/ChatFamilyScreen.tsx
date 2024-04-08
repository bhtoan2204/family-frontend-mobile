import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import io from 'socket.io-client';
import styles from './styles';
import {ChatFamilyScreenProps} from 'src/navigation/NavigationTypes';
import ChatServices from 'src/services/apiclient/ChatServices';
import LocalStorage from 'src/store/localstorage';
import {FamilyServices} from 'src/services/apiclient';
import {useMessageContext} from 'stream-chat-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Message {
  senderID: string;
  type: string;
  content: string;
}

interface Member {
  id_user: string;
  firstname: string;
  lastname: string;
  avatar: string;
}

const ChatFamilyScreen = ({navigation, route}: ChatFamilyScreenProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [members, setMembers] = useState<Member[]>([]);
  const {id_user, id_family} = route.params || {};

  useEffect(() => {
    fetchMember();
    fetchMessages(currentIndex);
  }, [id_family, currentIndex]);

  const fetchMember = async () => {
    try {
      const response = await FamilyServices.getAllMembers({
        id_family: id_family,
      });
      if (response) {
        setMembers(response);
      }
    } catch (error) {
      console.error('Error fetching member:', error);
    }
  };

  const fetchMessages = async (index: number) => {
    try {
      console.log(id_user);
      const response = await ChatServices.GetFamilyMessages({
        id_family: id_family,
        index: index,
      });
      if (response) {
        setMessages(response);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const loadMoreMessages = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const sendMessage = async () => {
    try {
      const accessToken = await LocalStorage.GetAccessToken();
      const socket = io('https://api.rancher.io.vn/chat', {
        transports: ['websocket'],
        extraHeaders: {Authorization: `Bearer ${accessToken}`},
      });

      socket.emit('newFamilyMessage', {
        message: message,
        familyId: id_family,
      });
      console.log('Message sent!');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const CustomMessage = () => {
    const {message, isMyMessage} = useMessageContext();

    return (
      <View
        style={{
          alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
          backgroundColor: isMyMessage ? '#ADD8E6' : '#ededed',
          padding: 10,
          margin: 10,
          borderRadius: 10,
          width: '70%',
        }}>
        <Text>{message.text}</Text>
      </View>
    );
  };
  const handleSendMessage = async () => {
    await sendMessage();
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        onScroll={event => {
          const {layoutMeasurement, contentOffset, contentSize} =
            event.nativeEvent;
          if (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 20
          ) {
            loadMoreMessages();
          }
        }}>
        {messages && messages.length > 0 ? (
          messages.reverse().map((msg, index) => (
            <View
              key={index}
              style={[
                styles.messageContainer,
                msg.senderID === id_user
                  ? styles.receiverContainer
                  : styles.senderContainer,
              ]}>
              {msg.senderID !== id_user && members.length > 0 && (
                // <TouchableOpacity>
                //   <Text
                //     style={
                //       styles.senderName
                //     }>{`${members[0].firstname} ${members[0].lastname}`}</Text>
                // </TouchableOpacity>
                <Text
                  style={
                    styles.senderName
                  }>{`${members[0].firstname} ${members[0].lastname}`}</Text>
              )}
              <Text style={styles.messageContent}>{msg.content}</Text>
            </View>
          ))
        ) : (
          <Text>No messages</Text>
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message here"
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatFamilyScreen;
