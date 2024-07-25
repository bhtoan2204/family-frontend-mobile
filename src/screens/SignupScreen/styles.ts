import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from 'src/constants';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  marginHorizontal: {
    marginHorizontal: screenWidth * 0.06,
  },
  marginVertical: {
    marginVertical: screenHeight * 0.02,
  },
  accountTitle: {
    fontSize: screenHeight * 0.018,
  },
  marginBottom: {
    marginBottom: screenHeight * 0.02,
  },
  textInput: {
    width: '100%',
  },
  placeholder: {
    height: screenHeight * 0.05,
    width: screenWidth * 0.88,
    borderWidth: 1.5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: screenWidth * 0.07,
    backgroundColor: COLORS.PaleAqua,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  touchable: {
    position: 'absolute',
    right: screenWidth * 0.03,
  },
  Icon: {
    fontSize: screenHeight * 0.03,
    color: COLORS.Rhino,
  },
  eyeIcon: {
    fontSize: screenHeight * 0.03,
    color: COLORS.Rhino,
  },
  marginVerticalFlex: {
    flexDirection: 'row',
    marginVertical: screenHeight * 0.01,
    alignItems: 'center',
  },
  marginVerticalCenter: {
    flexDirection: 'row',
    marginVertical: screenHeight * 0.02,
    justifyContent: 'center',
  },
  checkbox: {
    marginRight: screenHeight * 0.01,
    color: COLORS.Rhino,
  },
  button: {
    marginTop: screenHeight * 0.02,
    marginBottom: screenHeight * 0.01,
  },
  loginText: {
    fontSize: screenHeight * 0.018,
    color: COLORS.DenimBlue,
    fontWeight: 'bold',
    marginLeft: screenHeight * 0.01,
  },
  errorText: {
    color: COLORS.red,
    fontSize: screenHeight * 0.015,
    marginTop: screenHeight * 0.01,
    marginLeft: screenHeight * 0.01,
  },
  backIcon: {
    fontSize: screenHeight * 0.05,
    padding: screenHeight * 0.02,
  },
  logo: {
    height: screenHeight * 0.1,
    width: screenHeight * 0.1,
    top: screenHeight * 0.12,
    marginTop: screenHeight * 0.09,
    alignSelf: 'center',
  },
});

export default styles;
