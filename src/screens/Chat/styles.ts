import { StyleSheet } from 'react-native';
import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      backgroundColor: '#fff',
    },
    videoCallIcon: {
      width: 24,
      height: 24,
    },

    receiverInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    messagesContainer: {
      flex: 1,
      backgroundColor: '#fff',
    },
    contentContainer: {
      flexGrow: 1,
      justifyContent: 'flex-end',
    },
    messageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      maxWidth: '80%',
      marginVertical: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
    },
    senderMessageContainer: {
      alignSelf: 'flex-end',
      backgroundColor: '#DCF8C5',
      marginLeft: 'auto',
      marginRight: 16,
    },
    receiverMessageContainer: {
      alignSelf: 'flex-start',
      backgroundColor: '#EDEDED',
      marginLeft: 16,
      marginRight: 'auto',
    },
    senderMessageContent: {
      color: '#000', 
    },
    receiverMessageSenderName: {
      fontWeight: 'bold',
      marginBottom: 4,
      color: '#333',
    },
    receiverMessageContent: {
      color: '#000', 
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 8,
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
  });
export default styles;
