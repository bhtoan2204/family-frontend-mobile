import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

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
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: screenWidth * 0.7,
    marginBottom: 60,    
  },
  forgotPasswordTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 16,
  },
  accountTitle: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 32,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 4,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginHorizontal: 5, 
  },
  selectedOption: {
    backgroundColor: COLORS.Rhino,
    borderColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    color: COLORS.gray,
  },
  selectedOptionText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
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
    marginBottom: 50,
  },
  arrowText: {
    fontSize: 16,
    color: COLORS.black,
    marginHorizontal: 8,
    fontWeight: 'bold',
  },
  backButton: {
    color: COLORS.black,
    marginLeft: 10,
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
});

export default styles;
