import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Video} from 'expo-av';
import {Message} from 'src/interface/chat/chat';
import styles from './styles';
import {COLORS} from 'src/constants';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {useSelector} from 'react-redux';
import {selectProfile} from 'src/redux/slices/ProfileSclice';

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
  const color = useThemeColors();
  const profile = useSelector(selectProfile);
  const isSender = item.senderId === profileId;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 0,
      }}>
      {item.userInfo &&
        item.userInfo.avatar &&
        item.userInfo.id_user != profile.id_user && (
          <Image source={{uri: item.userInfo.avatar}} style={styles.avatar} />
        )}

      <View style={{flex: 1, marginLeft: isSender ? 0 : 10}}>
        <TouchableOpacity
          onPress={() => onMessagePress(item)}
          style={[
            isSender
              ? [
                  styles.senderMessageContainer,
                  item.type === 'text' && {backgroundColor: COLORS.DenimBlue},
                ]
              : styles.receiverMessageContainer,
          ]}>
          <View style={styles.messageContainer}>
            {item.type === 'photo' ? (
              <View style={styles.messageContentContainer}>
                <Image
                  source={{uri: item.content}}
                  style={styles.imageMessage}
                />
              </View>
            ) : item.type === 'video' ? (
              <View style={styles.messageContentContainer}>
                <Video
                  source={{uri: item.content}}
                  useNativeControls
                  resizeMode="contain"
                  style={{width: 300, height: 200}}
                />
              </View>
            ) : (
              <Text
                style={[
                  styles.senderMessageContent,
                  {
                    color: isSender ? 'white' : 'black',
                  },
                ]}>
                {item.content}
              </Text>
            )}
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'column',
            marginHorizontal: 10,
            alignItems: isSender ? 'flex-end' : 'flex-start',
          }}>
          {isSelected && (
            <Text style={styles.timestamp}>
              {formatDateTime(new Date(item.timestamp))}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default MessageItem;
