import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 50,
    },
    messagesContainer: {
      flex: 1,
      paddingHorizontal: 10,
    },
    message: {
      marginBottom: 10,
    },
    sender: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
    },
    input: {
      flex: 1,
      marginRight: 10,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
    },
  });

export default styles;