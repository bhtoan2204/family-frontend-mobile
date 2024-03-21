import {StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const styles = StyleSheet.create({
  keyboardView: {
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
    justifyContent: 'center',
  },
  marginVertical: {
    marginVertical: 22,
  },
  forgotPasswordTitle: {
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
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  button: {
    marginTop: 18,
    marginBottom: 4,
  },
  marginVerticalCenterSmall: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
  },
  backText: {
    marginTop: 20,
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
