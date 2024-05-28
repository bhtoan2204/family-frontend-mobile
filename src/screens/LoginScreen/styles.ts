import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from 'src/constants';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  TextInput: {
    height: screenHeight * 0.06,
    width: screenWidth * 0.85,
    borderWidth: 1.5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: screenWidth * 0.07,
    backgroundColor: COLORS.PaleAqua,
    color: COLORS.Rhino,
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  eyeIcon: {
    fontSize: screenHeight * 0.03,
    color: COLORS.Rhino,
  },
  Icon: {
    fontSize: screenHeight * 0.03,
    color: COLORS.Rhino,
  },
  button: {
    marginTop: screenHeight * 0.02,
    marginBottom: screenHeight * 0.01,
    borderColor: COLORS.Rhino,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    height: screenHeight * 0.08,
    width: screenWidth * 0.08,
  },
  logo: {
    height: screenHeight * 0.08,
    width: screenWidth * 0.15,
    top: screenHeight * 0.1,
    marginTop: screenHeight * 0.05,
    alignSelf: 'center',
  },
});

export default styles;
