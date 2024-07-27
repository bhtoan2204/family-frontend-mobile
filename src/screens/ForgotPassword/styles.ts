import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const progressBarWidth = screenWidth*0.9; 
const progressBarHeight = 10; 

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  safeAreaStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
    
  },
  image: {
    width: '100%',
    height: screenWidth * 0.7,
    marginBottom: 60,    
  },
  forgotPasswordTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  accountTitle: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 82,
    fontWeight: 'semibold',
  },
  optionContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 4,
  },
  optionEmailButton: {
    marginBottom: 20,
    padding: 10,
  },
  optionEmailButton1: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  optionPhoneButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#f0f0f0',
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
  inputContainer: {
    marginBottom: 16,
  },
  inputContainerFlex: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    color: "gray",
    marginBottom: 8,
  },
  placeholder: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  textInput: {
    fontSize: 16,
    color: COLORS.black,
    flex: 1, 
  },
  errorText: {
    color: COLORS.red,
    fontSize: 14,
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
  },
  backToLoginContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  backToLoginText: {
    fontSize: 16,
    color: COLORS.blue,
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    marginTop: 20, 
  },
  arrowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  arrowText: {
    fontSize: 16,
    color: COLORS.black,
    marginHorizontal: 8,
    fontWeight: 'bold',
  },
  backButton: {
    marginLeft: 30,
    marginTop: 20,
  },
  enterCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: COLORS.Rhino,
  },
  enterCodeButtonText: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
  },
  enterCodeButtonIcon: {
    marginLeft: 5,
  },
  countryCode: {
    fontSize: 16,
    color: '#333',
    marginRight: 5,
  },
  progressBar: {
    flexDirection: 'row',
    width: progressBarWidth,
    height: progressBarHeight,
    backgroundColor: '#ddd', 
    borderRadius: 5, 
    overflow: 'hidden', 
    marginLeft: 20,
  },
  progressStep: {
    flex: 1,
    height: '100%', 
  },
  activeStep: {
    backgroundColor: COLORS.Rhino,
  },
});

export default styles;
