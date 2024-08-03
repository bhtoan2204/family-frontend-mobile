import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  title: {
    fontSize: screenHeight * 0.03,
    color: COLORS.Rhino,
    textAlign: 'center',
    marginBottom: screenHeight * 0.02,
    lineHeight: screenHeight * 0.045,
    fontWeight: '600',
  },
  text: {
    fontSize: screenHeight * 0.018,
    lineHeight: screenHeight * 0.03,
    fontWeight: '600',
    color: COLORS.PaleAqua,
    textAlign: 'center',
  },
  /** Hero */
  hero: {
    backgroundColor: COLORS.PaleAqua,
    margin: screenHeight * 0.02,
    borderRadius: 16,
    padding: screenHeight * 0.02,
  },
  heroImage: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.3,
  },
  /** Content */
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: screenHeight * 0.02,
    paddingHorizontal: screenHeight * 0.023,
  },
  contentHeader: {
    paddingHorizontal: screenHeight * 0.02,
  },
  appName: {
    backgroundColor: COLORS.SpringWood,
    transform: [
      {
        rotate: '-5deg',
      },
    ],
    paddingHorizontal: screenHeight * 0.01,
  },
  appNameText: {
    fontSize: screenHeight * 0.03,
    fontWeight: '700',
    color: COLORS.DenimBlue,
  },
  button: {
    backgroundColor: COLORS.Rhino,
    paddingVertical: 12,
    paddingHorizontal: screenWidth * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    width: screenWidth * 0.9,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: screenHeight * 0.018,
    fontWeight: '500',
    color: COLORS.white,
  },
  icon: {left: screenWidth * 0.3},
});

export default styles;
