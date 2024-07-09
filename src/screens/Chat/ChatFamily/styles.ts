import {StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  avatarContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  receiverMessageContainer: {
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 10,
    width: 'auto',
    backgroundColor: '#f0f0f0',
  },
  messageContentContainer: {
    alignItems: 'center',
  },
  imageMessage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  senderMessageContent: {
    color: '#000',
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flexGrow: 1,
  },

  senderMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.DenimBlue,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 'auto',
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
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f2f2f2',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginLeft: 10,
  },
  avatarFirst: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginLeft: 10,
    marginVertical: 10,
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  receiverInfo: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    flexDirection: 'row',
  },
 
  backButton: {
    color: COLORS.DenimBlue,
  },
 
  receiverName: {
    fontWeight: '600',
    fontSize: 16,
    color: COLORS.black,
  },
  
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  avatarTextFirst: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
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
    color: COLORS.DenimBlue,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  timestamp: {
    color: '#cccccc',
    fontSize: 12,
  },
  messageWrapper: {
    flexDirection: 'column',
    marginVertical: 4,
  },
  messageRight: {
    justifyContent: 'flex-end',
  },
  messageLeft: {
    justifyContent: 'flex-start',
  },
  introContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
  },
  introText: {
    fontSize: 14,
    color: '#8E8E8E',
    width: '80%',
    textAlign: 'center',
  },
  activeDot: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    backgroundColor: 'green',
    borderWidth: 2,
    borderColor: 'white',
    zIndex: 1,
  },
  activeDotBig: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: 'green',
    borderWidth: 2,
    borderColor: 'white',
    zIndex: 1,
  },
  videoMessage: {
    width: '100%',
    height: '100%',
  },
});
export default styles;
