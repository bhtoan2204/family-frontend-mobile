import {StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 21,
    fontWeight: '300',
    color: COLORS.EerieBlack,
    marginBottom: 12,
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.BrandeisBlue1,
    backgroundColor: COLORS.BrandeisBlue1,
    marginBottom: 12,
  },
  btnText: {
    fontSize: 19,
    fontWeight: '600',
    color: COLORS.white,
  },
  backButton: {
    color: COLORS.black,
    fontWeight: '400',
  },

  headerfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: -40,
  },
  searchview: {
    backgroundColor: '#93D2FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 10,
    marginTop: -40,
  },
  touchable: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#D3D3D3', // Light gray color
    borderWidth: 1, // Adjust as needed
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 110,
    height: 50,
    borderRadius: 10,
  },
  /** Input */
  input: {
    height: 44,
    width: 380,
    backgroundColor: COLORS.white,
    paddingLeft: 44,
    paddingRight: 24,
    marginBottom: 7,
    borderRadius: 10,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  inputIcon: {
    position: 'absolute',
    width: 44,
    height: 44,
    top: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
    fontWeight: '500',
  },
});

export default styles;
