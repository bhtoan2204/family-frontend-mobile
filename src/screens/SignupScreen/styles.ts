import {StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const styles = StyleSheet.create({
  keyboardView: {
    //flex: 1,
    //backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
    //backgroundColor: COLORS.white,
  },
  safeAreaStyle: {
    flex: 1,
    //backgroundColor: COLORS.white,
  },
  marginHorizontal: {
    //flex: 1,
    marginHorizontal: 30,
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
    color: '#747474',
  },
  marginBottom: {
    marginBottom: 20,
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
    flexDirection: 'row',
    width: '100%',
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 30,
  },
  touchable: {
    position: 'absolute',
    right: 12,
  },
  Icon: {
    fontSize: 24,
    color: '#A3A3A3',
  },
  eyeIcon: {
    fontSize: 24,
    color: '#747474',
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
  checkbox: {
    marginRight: 8,
  },
  button: {
    marginTop: 18,
    marginBottom: 4,
  },
  lineStyle: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray,
    marginHorizontal: 10,
  },
  loginText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
});

export default styles;
