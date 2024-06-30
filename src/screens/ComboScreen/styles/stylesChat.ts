import {StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const stylesChat = StyleSheet.create({
  header: {
    height: 112,
    width: '100%',
    position: 'absolute',
    top:20,
  },
  imageConnect: {
    height: 224,
    width: 487,
    position: 'absolute',
    top: 800,
    zIndex: 7,
  },
  main: {
    flex: 1,
    backgroundColor: COLORS.Rhino,
  },
  chat: { zIndex: 6,
    backgroundColor: COLORS.Rhino,
    top: 780,
    height: 1000,
  position: 'absolute',},
  imageBig: {
    height: 561,
    width: 360,
    zIndex: 5,
    top: 220,
    left: 25,
  },
  imageThumbUp: {
    height: 50,
    width: 55,
    zIndex: 6,
    bottom: 140,
    left: 290,
  },
  imageLike: {
    height: 40,
    width: 40,
    zIndex: 6,
    bottom: 200,
    left: 90,
  },
  imageLeftSide: {
    height: 143,
    width: 62,
    zIndex: 6,
    left: 0,
    top: 20,
  },
  title: {
    fontSize: 29,
    color: COLORS.white,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 25,
    bottom: 180,
    position: 'absolute',
    right: 145,
  },
  detail: {
    fontSize: 16,
    color: COLORS.white,
    alignSelf: 'center',
    textAlign: 'center',
    width: '65%',
    lineHeight: 28,
    bottom: 95,
    position: 'absolute',
    right: 120,
  },
  imageOval: {
    height: 50,
    width: 44,
    zIndex: 6,
    top: 70,
    left: 355,
    
  },
  imageBottomBack: {
    height: 119,
    width: 487,
    zIndex: 6,
    top: 50,
  },
  imageBottomFront: {
    height: 119,
    width: 487,
    zIndex: 7,
    bottom: 50,
  },
});

export default stylesChat;
