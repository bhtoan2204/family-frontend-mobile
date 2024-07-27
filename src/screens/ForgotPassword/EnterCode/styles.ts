
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
    countdownText: {
      fontSize: 16,
      marginBottom:10
    },
    countdownTime: {
      fontSize: 16,
    },
    TextContainer:{
      flexDirection: 'column',
      marginBottom: 30,
      width:'90%',
      alignSelf:'center',
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
    safeAreaStyle: {
      flex: 1,
    },
    container: {
      flex: 1,
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
      marginVertical:20,
    },
    input: {
      width: 48,
      height: 72,
      borderWidth: 2,
      borderColor: COLORS.gray,
      borderRadius: 8,
      textAlign: 'center',
      fontSize: 30,
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
    activeStep: {
      backgroundColor: COLORS.Rhino,
    },
  });
export default styles;