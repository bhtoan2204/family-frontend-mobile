import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
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
  onRemoveMessage: (message: Message) => void;
}

const MessageItem: React.FC<Props> = ({
  item,
  profileId,
  onMessagePress,
  isSelected,
  formatDateTime,
  onRemoveMessage,
}) => {
  const color = useThemeColors();
  const profile = useSelector(selectProfile);
  const isSender = item.senderId === profileId;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({top: 0, left: 0});

  const handleLongPress = (event: any) => {
    const {pageY, pageX} = event.nativeEvent;
    setModalPosition({top: pageY, left: pageX});
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleRemoveMessage = () => {
    onRemoveMessage(item);
    handleCloseModal();
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginVertical: 0,
          opacity: isModalVisible ? 0.5 : 1,
        }}>
        {item.userInfo &&
          item.userInfo.avatar &&
          item.userInfo.id_user != profile.id_user && (
            <Image source={{uri: item.userInfo.avatar}} style={styles.avatar} />
          )}

        <View style={{flex: 1, marginLeft: isSender ? 0 : 10}}>
          <TouchableOpacity
            onPress={() => onMessagePress(item)}
            onLongPress={handleLongPress}
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

      {isModalVisible && (
        <Modal
          animationType="none"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={handleCloseModal}>
          <TouchableWithoutFeedback onPress={handleCloseModal}>
            <View
              style={[
                localStyles.modalOverlay,
                {top: modalPosition.top, left: modalPosition.left},
              ]}>
              <View style={localStyles.modalContent}>
                <TouchableOpacity
                  onPress={handleRemoveMessage}
                  style={localStyles.modalOption}>
                  <Text style={localStyles.modalOptionText}>Gỡ tin nhắn</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCloseModal}
                  style={localStyles.modalOption}>
                  <Text style={localStyles.modalOptionText}>Hủy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </>
  );
};

const localStyles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalMessageText: {
    marginBottom: 10,
    fontSize: 16,
    color: 'black',
  },
  modalOption: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalOptionText: {
    fontSize: 16,
    color: COLORS.primary,
  },
});

export default MessageItem;
