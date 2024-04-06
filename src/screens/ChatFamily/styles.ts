import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messagesContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  messageContainer: {
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  senderContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  receiverContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  senderName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageContent: {
    fontSize: 16,
  },
});
export default styles;