import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    position: 'relative',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 20,
  },
  text: {
    fontSize: 15,
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: 'semibold',
    color: 'white',
  },
  icon: {
    marginLeft: 5,
  },
  imageContainer: {position: 'relative', alignSelf: 'center', marginTop: 40},
  image2: {
    width: 87,
    height: 218,
    alignSelf: 'flex-start',
    bottom: 155,
    right: 15,
  },
  paging: {width: 81, height: 27, alignSelf: 'center'},
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 100,
  },
  skip: {padding: 10, paddingHorizontal: 30},
  calendarImage: {
    width: 400,
    height: 280,
    alignSelf: 'center',
    top: 40,

    zIndex: 1,
  },
  overlayImage: {
    position: 'absolute',
    top: 120,
    left: 85,
    width: 265,
    height: 223,
    zIndex: 3,
  },
});

export default styles;
