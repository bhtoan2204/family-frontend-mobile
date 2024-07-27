
import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const progressBarWidth = screenWidth*0.9; 
const progressBarHeight = 10; 

const styles = StyleSheet.create({
    keyboardView: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    safeAreaStyle: {
      flex: 1,
    },
    TextContainer:{
      flexDirection: 'column',
      marginBottom: 30,
      width:'90%',
      alignSelf:'center',
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
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      bottom: 20,
      left: 20,
      padding: 10,
      backgroundColor: 'transparent',
    },
    backButtonText: {
      marginLeft: 10,
      fontSize: 16,
      fontWeight: 'bold',
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
    progressBar: {
      flexDirection: 'row',
      width: progressBarWidth,
      height: progressBarHeight,
      borderRadius: 5, 
      overflow: 'hidden', 
      marginLeft: 20,
      marginTop: 20,
      marginBottom: 20,
    },
    progressStep: {
      flex: 1,
      borderRadius: 5, 
      height: '50%',
      marginHorizontal: 3, // Thêm khoảng cách giữa các bước
      backgroundColor: 'grey', // Màu nền cho các bước chưa hoàn thành
    },
    progressStepActive: {
      borderRadius: 5,
    },
    emailTitle:{
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    emailDetail:{
      fontSize: 15,
      fontWeight: 'semibold',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    optionContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      marginBottom: 4,
    },
    optionEmailButton: {
      marginBottom: 20,
      padding: 10,
      width: screenWidth*0.9,
      alignSelf: 'center',
    },
    selectedOption: {
      borderColor: '#f0f0f0',
    },
    optionText: {
      fontSize: 16,
      color: COLORS.gray,
      padding: 5,
      alignSelf: 'center',
      fontWeight: 'bold',
    },
    selectedOptionText: {
      fontSize: 16,
      color: COLORS.white,
      fontWeight: 'bold',
      padding: 5,
      alignSelf: 'center',
    },
    TextInput: {
      height: screenHeight * 0.06,
      width: screenWidth * 0.9,
      borderWidth: 1.5,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: screenWidth * 0.07,
      backgroundColor: COLORS.PaleAqua,
      color: COLORS.Rhino,
      alignSelf: 'center',
    },
    Icon: {
      fontSize: screenHeight * 0.03,
    },  });
export default styles;