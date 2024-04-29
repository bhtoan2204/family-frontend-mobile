import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

const styles = StyleSheet.create({
  messagesContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  senderMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.AliceBlue,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 'auto',
  },
  receiverMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#EDEDED',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 'auto',
  },
  senderMessageContent: {
    color: COLORS.black,
  },
  receiverMessageSenderName: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  receiverMessageContent: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginRight: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 30,
    //arginRight: 10,
  },
  header: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  receiverInfo: {
    backgroundColor: COLORS.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    color: COLORS.black,
  },
  imageMessage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  receiverName: {
    fontWeight: '600',
    fontSize: 16,
    color: COLORS.black,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  videoCallButton: {
    marginLeft: 10,
  },
  nameText: {

  }
});
export default styles;
