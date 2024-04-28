import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b2838',
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: '#c7d5e0',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 40,
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '400',
    color: '#c7d5e0',
    textAlign: 'center',
  },
  /** Hero */
  hero: {
    backgroundColor: '#2a475e',
    margin: 12,
    borderRadius: 16,
    padding: 16,
  },
  heroImage: {
    width: '100%',
    height: screenHeight * 0.3,
  },
  /** Content */
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  contentHeader: {
    paddingHorizontal: 24,
  },
  appName: {
    backgroundColor: '#66c0f4',
    transform: [
      {
        rotate: '-5deg',
      },
    ],
    paddingHorizontal: 6,
  },
  appNameText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#171a21',
  },
  /** Button */
  button: {
    backgroundColor: '#66c0f4',
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
  },
});

export default styles;
