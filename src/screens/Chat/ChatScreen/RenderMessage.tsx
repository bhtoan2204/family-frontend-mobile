import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { Message } from 'src/interface/chat/chat';
import styles from './styles'; 

interface Props {
  item: Message;
  profileId: string;
  onMessagePress: (messageId: string) => void;
  isSelected: boolean;
  formatDateTime: (dateTime: Date) => string;
}

const MessageItem: React.FC<Props> = ({
  item,
  profileId,
  onMessagePress,
  isSelected,
  formatDateTime,
}) => {
  return (
    <View
      style={[
        styles.messageWrapper,
        item.senderId === profileId ? styles.messageRight : styles.messageLeft,
      ]}>
      <TouchableOpacity
        onPress={() => onMessagePress(item._id)}
        style={[
          styles.messageContainer,
          item.senderId === profileId
            ? styles.senderMessageContainer
            : styles.receiverMessageContainer,
        ]}>
        <View style={styles.messageContainer}>
          {item.type === 'photo' ? (
            <View style={styles.messageContentContainer}>
              <Image source={{ uri: item.content }} style={styles.imageMessage} />
            </View>
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
            <Text
              style={[
                styles.senderMessageContent,
                {
                  color: item.senderId === profileId ? 'white' : 'black',
                },
              ]}
            >
              {item.content}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'column',
          marginHorizontal: 10,
          alignItems: item.senderId === profileId ? 'flex-end' : 'flex-start',
        }}>
        {isSelected && (
          <Text style={styles.timestamp}>
            {formatDateTime(item.timestamp)}
          </Text>
        )}
      </View>
    </View>
  );
};

export default MessageItem;
