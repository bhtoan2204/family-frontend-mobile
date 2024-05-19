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
    color: '#2A475E',
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
    height: 48,
    width: '100%',
    borderWidth: 1.5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#C7D5E0',
    flexDirection: 'row',
  },
  touchable: {
    position: 'absolute',
    right: 12,
  },
  Icon: {
    fontSize: 24,
    color: '#2A475E',
  },
  eyeIcon: {
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
  checkbox: {
    marginRight: 8,
    color: '#2A475E',
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
    color: '#66C0F4',
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
