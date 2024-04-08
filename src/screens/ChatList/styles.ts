import { StyleSheet } from "react-native";
import { COLORS } from "src/constants";

const styles = StyleSheet.create({
    chatItem: {
      flexDirection: 'row',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    avatarContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    avatarText: {
      fontSize: 20,
    },
    messageContainer: {
      flex: 1,
    },
    username: {
      fontWeight: 'bold',
    },
    messageText: {
      marginTop: 5,
    },
    headerfile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
      },
    backButton: {
        color: COLORS.black,
    },
    container: {
        padding: 24,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 36,
      },
  });
  
  export default styles;