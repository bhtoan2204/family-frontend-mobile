import {StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const stylesAnalysis = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  imageTop: {
    height: 390,
    width: 402,
    top: 180,
    left: 5,
  },
  redGradient: {
    height: 130,
    width: 90,
    position: 'absolute',
    top: 0,
    right: 100,
  },
  imageCharacter: {
    height: 450,
    width: 206,
    bottom: 200,
    zIndex:1,
  },
  imageInformation: {
    height: 55,
    width: 85,
    position: 'absolute',
    top: 100,
    left: 50,
  },
  imageLineChart: {
    height: 112,
    width: 151,
    position: 'absolute',
    top: 180,
    right: 125,
  },
  imagePieChart: {
    height: 61,
    width: 95,
    position: 'absolute',
    top: 210,
    right: 15,
  },
  imageBarChart: {
    height: 87,
    width: 180,
    position: 'absolute',
    top: 315,
    right: 45,
  },
  imageBack: {
    height: 119,
    width: 420,
    position: 'absolute',
    top: 518,
    left:0,
    zIndex:2,
  },
  imageFront: {
    height: 119,
    width: 420,
    position: 'absolute',
    top: 535,
    right:-6,
    zIndex:3,
  },
  bottomField: {
    height: 300,
    width: '100%',
    position: 'absolute',
    top: 640,
    left: 0,
    zIndex:1,
    backgroundColor: COLORS.Rhino,
  },
  imageBottom: {
    height: 227,
    width: 378,
    position: 'absolute',
    bottom: 110,
    right: 10,
  },
  imageBottomWave: {
    height: 116,
    width: '100%',
    position: 'absolute',
    bottom: -60,
    zIndex:5,
  },
  title: {
    fontSize: 29,
    color: COLORS.white,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 25,
  },
  detail: {
    fontSize: 16,
    color: COLORS.white,
    alignSelf: 'center',
    textAlign: 'center',
    width: '75%',
    lineHeight: 28,
  },
  analysis:{flex: 1, position: 'relative'},
});

export default stylesAnalysis;
