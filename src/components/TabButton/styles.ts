import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

const animate1 = {
  0: {scale: 0.5, translateY: 7},
  0.92: {translateY: -34},
  1: {scale: 1.2, translateY: -24},
};
const animate2 = {
  0: {scale: 1.2, translateY: -24},
  1: {scale: 1, translateY: 7},
};

const circle1 = {
  0: {scale: 0},
  0.3: {scale: 0.9},
  0.5: {scale: 0.2},
  0.8: {scale: 0.7},
  1: {scale: 1},
};
const circle2 = {0: {scale: 1}, 1: {scale: 0}};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    alignSelf: 'stretch',
  },
  animated: {
    width: 50,
    height: 50,
    borderRadius: 100,
    position: 'absolute',
    backgroundColor: COLORS.primary,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 25,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    color: COLORS.primary,
    fontWeight: '500',
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.primary,
    position: 'absolute',
    bottom: 20,
  },
});

export default styles;

export {animate1, animate2, circle1, circle2};
