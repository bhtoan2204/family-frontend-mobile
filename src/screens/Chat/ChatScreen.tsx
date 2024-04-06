import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import io from 'socket.io-client';
import styles from './styles';
import { ChatScreenProps } from 'src/navigation/NavigationTypes';
import ChatServices from 'src/services/apiclient/ChatServices';
import LocalStorage from 'src/store/localstorage';
import { FamilyServices } from 'src/services/apiclient';
import { useMessageContext } from 'stream-chat-react-native';
import { AxiosResponse } from 'axios';

interface Message {
  senderId: string;
  type: string;
  content: string;
  receiverId: string;
}

interface Member {
  id_user: string;
  email: string;
  phone: string;
  language: string | null;
  firstname: string;
  lastname: string;
  avatar: string ;
}

const ChatScreen = ({ navigation, route }: ChatScreenProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [receiver, setReceiver] = useState<Member>();
  const [sender, setSender] = useState<Member>();
  const [accessToken, setAccessToken] = useState<string>('');

  const { id_user } = route.params || {};
  const receiverId = '28905675-858b-4a93-a283-205899779622';
  
  useEffect(() => {
    fetchMember(receiverId, id_user);
    fetchMessages(currentIndex);
    fetchAccessToken();
  }, [currentIndex]); 

  const fetchMember = async (receiverId: string, id_user?: string) => {
    try {
      const response1: AxiosResponse<Member[]> = await FamilyServices.getMember({id_user: receiverId});
      if (response1) {
        setReceiver(response1.data[0]);
      }
      const response2: AxiosResponse<Member[]> = await FamilyServices.getMember({id_user: id_user});
      if (response2) {
        setSender(response2.data[0]);
      }
    } catch (error) {
      console.error('Error fetching member:', error);
    }
  };

  const fetchMessages = async (index: number) => {
    try {
      const response = await ChatServices.GetMessages({ id_user: receiverId, index: index });
      if (response) {
          setMessages(response); 
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchAccessToken = async () => {
    try {
      const token = await LocalStorage.GetAccessToken();
      if (token) {
        setAccessToken(token);
      }    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  const loadMoreMessages = () => {
    setCurrentIndex(currentIndex + 1); 
  };

  const sendMessage = async () => {
    try {
      const socket = io('https://api.rancher.io.vn/chat', {
        transports: ['websocket'],
        extraHeaders: { Authorization:  `Bearer ${accessToken}` } 
      });  

      socket.emit('newMessage', {
        message: message,
        receiverId: receiverId,
      });
      console.log('Message sent!'); 
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  
  const handleSendMessage = async () => {
    await sendMessage();
  };
  
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => console.log('Call video')}>
          <Image source={require('./video-call-icon.png')} style={styles.videoCallIcon} />
        </TouchableOpacity> */}
        <View style={styles.receiverInfo}>
          <Text>{receiver?.firstname} {receiver?.lastname}</Text>
        </View>
      </View>
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        onScroll={(event) => {
          const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
          if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
            loadMoreMessages();
          }
        }}
      >
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.messageContainer,
                msg.senderId === id_user ? styles.senderMessageContainer : styles.receiverMessageContainer
              ]}
            >
              {msg.senderId === id_user ? (
                <Text style={styles.senderMessageContent}>{msg.content}</Text>
              ) : (
                <>
                  <Image source={{ uri: receiver?.avatar }} style={styles.avatar} />
                    <Text style={styles.receiverMessageSenderName}>{`${receiver?.firstname} ${receiver?.lastname}`}</Text>
                    <Text>{msg.content}</Text>
                </>
              )}

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
export default ChatScreen;

