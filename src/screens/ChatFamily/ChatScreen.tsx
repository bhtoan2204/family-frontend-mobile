import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import io from 'socket.io-client';
import styles from './styles';
import { ChatFamilyScreenProps } from 'src/navigation/NavigationTypes';
import ChatServices from 'src/services/apiclient/ChatServices';


const ChatFamilyScreen= ({navigation, route}: ChatFamilyScreenProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const {id_user, id_family} =route.params || {};

//   useEffect(() => {
//     const response = await ChatServices.GetFamilyMessages({ id_family: id_family });

//   }, [messages]);



  return (
    <View style={styles.container}>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={styles.message}>
             {/* <Text style={styles.sender}>{msg.sender}</Text>
             <Text>{msg.text}</Text> */}
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message here"
        />
        <Button title="Send"  />
      </View>
    </View>
  );
};
export default ChatFamilyScreen;