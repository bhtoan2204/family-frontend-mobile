
import {StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const styles = StyleSheet.create({
    keyboardView: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    safeAreaStyle: {
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    arrowButton: {
      position: 'absolute',
      top: 20,
      left: 20,
    },
    backButton: {
      color: COLORS.black,
      marginLeft: 0,
      marginTop: 30,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: COLORS.black,
      marginBottom: 16,
    },
    subtitle: {
      fontSize: 16,
      color: COLORS.gray,
      marginBottom: 32,
      textAlign: 'center',
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 32,
    },
    input: {
      width: 40,
      height: 40,
      borderWidth: 1,
      borderColor: COLORS.gray,
      borderRadius: 8,
      textAlign: 'center',
      fontSize: 18,
      marginHorizontal: 5,
    },
    submitButton: {
      backgroundColor: COLORS.blue,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    submitButtonText: {
      color: COLORS.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
    countdown: {
      fontSize: 16,
      color: 'red',
      textAlign: 'center',
      marginVertical: 10,
    },
  });
export default styles;