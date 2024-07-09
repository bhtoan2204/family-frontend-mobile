import {ImageBackground, StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const stylesChat = StyleSheet.create({
  imageBackground: {
    justifyContent: 'center',
    height: 348,
    width: 382,
    bottom: 900,
    left: 20,
  },
  imageTablet: {
    height: 177,
    width: 276,
    bottom: 1212,
    alignSelf: 'center',
  },
  imageRightSide: {
    height: 120,
    width: 75,
    zIndex: 6,
    alignSelf: 'flex-end',
    bottom: 1130,
  },
  imageCharacter: {
    height: 240,
    width: 245,
    bottom: 1320,
    left: 70,
    zIndex: 1,
  },
  imageBottomBack: {
    height: 114,
    width: 420,
    bottom: 1410,
  },
  imageFrontBack: {
    height: 114,
    width: 425,
    bottom: 1510,
  },
  bottomField: {
    height: 500,
    width: 420,
    backgroundColor: '#ADBFCC',
    bottom: 1510,
  },
  imageBlueGradient: {
    height: 34,
    width: 34,
    bottom: 2020,
    left: 35,
  },
  title: {
    fontSize: 29,
    color: COLORS.Rhino,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 25,
  },
  detail: {
    fontSize: 16,
    color: COLORS.Rhino,
    alignSelf: 'center',
    textAlign: 'center',
    width: '70%',
    lineHeight: 28,
  },
  imageLeftSide: { 
    height: 143, 
    width: 52, 
    zIndex: 6, 
    alignSelf: 'flex-start',
    bottom: 2100,
  },
  imageBottomWave: {
    height: 116,
    width: 430,
    bottom: 2150,
  },
});

export default stylesChat;
