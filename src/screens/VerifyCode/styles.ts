import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from 'src/constants';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  textContainer: {
    alignSelf: 'center',
    marginBottom: 56,
    flexDirection: 'column',
    
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  arrowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginLeft: 30,
    marginTop: 20,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonGroup: {
    width: '90%',
    alignSelf: 'center',
  },
  optionEmailButton: {
    marginBottom: 20,
    padding: 13,
  },
  selectedOption: {
    borderColor: '#f0f0f0',
  },
  selectedOptionText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
    padding: 5,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 18,
    borderRadius: 8,
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 16,
  },
  OTPContainer: {
    width: '90%',
    alignSelf: 'center',
  }
});

export default styles;
