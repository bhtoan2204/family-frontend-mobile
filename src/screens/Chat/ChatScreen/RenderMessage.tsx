import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Video} from 'expo-av';
import {Message} from 'src/interface/chat/chat';
import styles from './styles';
import {COLORS} from 'src/constants';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {useSelector} from 'react-redux';
import {selectProfile} from 'src/redux/slices/ProfileSclice';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {MaterialIcons} from '@expo/vector-icons';

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
  const translate = useSelector(getTranslate);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({top: 0, left: 0});
  const [isLeftSide, setIsLeftSide] = useState(false);

  const handleLongPress = (event: any) => {
    const {pageY, pageX} = event.nativeEvent;
    setModalPosition({top: pageY, left: pageX});

    // Kiểm tra vị trí để xác định xem modal nên xuất hiện bên trái hay bên phải
    const screenWidth = Dimensions.get('window').width;
    const isLeft = pageX > screenWidth / 2;

    setIsLeftSide(isLeft); // Cập nhật trạng thái isLeftSide
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
            <View style={localStyles.modalOverlay}>
              <View
                style={[
                  localStyles.modalContent,
                  {
                    top: modalPosition.top,
                    left: isLeftSide
                      ? modalPosition.left - 150 // Dịch modal qua trái nếu bấm vào tin nhắn bên phải
                      : modalPosition.left,
                  },
                ]}>
                <TouchableOpacity
                  onPress={handleRemoveMessage}
                  style={localStyles.modalOption}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={[localStyles.modalOptionText, {color: 'red'}]}>
                      {translate('DeleteMessage')}
                    </Text>
                    <MaterialIcons
                      name="delete"
                      size={20}
                      color="red"
                      style={{marginLeft: 10}}
                    />
                  </View>
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    position: 'absolute',
  },
  modalOption: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalOptionText: {
    fontSize: 16,
  },
});

export default MessageItem;
