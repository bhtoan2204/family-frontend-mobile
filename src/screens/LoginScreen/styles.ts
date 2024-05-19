import {StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  TextInput: {
    height: 48,
    width: '100%',
    borderWidth: 1.5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#C7D5E0',
    color: '#2A475E',
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  marginHorizontal: {
    flex: 1,
    marginHorizontal: 22,
  },
  marginVertical: {
    marginVertical: 22,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.black,
  },
  accountTitle: {
    fontSize: 16,
    color: COLORS.black,
  },
  marginBottom: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
  },
  textInput: {
    width: '100%',
  },
  placeholder: {
    width: '100%',
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
  },
  touchable: {
    position: 'absolute',
    right: 12,
  },
  eyeIcon: {
    fontSize: 24,
    color: '#2A475E',
  },
  Icon: {
    fontSize: 24,
    color: '#2A475E',
  },
  marginVerticalFlex: {
    flexDirection: 'row',
    marginVertical: 6,
    alignItems: 'center',
  },
  marginVerticalFlexMax: {
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
  },
  marginVerticalCenter: {
    flexDirection: 'row',
    marginVertical: 22,
    justifyContent: 'center',
  },
  marginVerticalCenterSmall: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  checkbox: {
    marginRight: 8,
  },
  button: {
    marginTop: 18,
    marginBottom: 4,
    borderColor: '#2A475E',
  },
  lineStyle: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray,
    marginHorizontal: 10,
  },
  loginOption: {fontSize: 14},
  socialLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.gray,
    marginRight: 4,
    borderRadius: 10,
  },
  imageStyle: {
    height: 36,
    width: 36,
    marginRight: 8,
  },
  signupText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  forgotText: {
    fontSize: 16,
    color: COLORS.black,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  icon: {
    flex: 1,
    height: 52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 1,
    borderColor: 'gray',
    //marginHorizontal: 10,
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    height: 36,
    width: 36,
  },
});

export default styles;
