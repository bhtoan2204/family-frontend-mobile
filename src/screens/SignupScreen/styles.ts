import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    color: COLORS.black,
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
