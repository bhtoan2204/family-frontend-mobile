import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  image: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.5,
    alignSelf: 'center',
    marginBottom: -120,
  },
  textLogo: {
    width: screenWidth * 0.4,
    height: screenHeight * 0.2,
    alignSelf: 'center',
  },
  welcomeText: {
    fontSize: screenHeight * 0.018,
    alignSelf: 'center',
    color: COLORS.black,
  },
  buttonLogin: {
    backgroundColor: '#2a475e',
    width: screenWidth * 0.8,
    height: screenHeight * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
    borderColor: '#171a21',
    borderWidth: 1.2,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
  buttonSignUp: {
    backgroundColor: 'transparent',
    width: screenWidth * 0.8,
    height: screenHeight * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
    borderColor: '#171a21',
    borderWidth: 1.2,
  },
  btnLogin: {
    fontSize: screenHeight * 0.022,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  btnSignUp: {
    fontSize: screenHeight * 0.022,
    color: '#2a475e',
    fontWeight: 'bold',
  },
});

export default styles;
