import {StyleSheet, Dimensions} from 'react-native';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  touchable: {
    width: screenWidth * 0.85,
    height: screenHeight * 0.06,
    padding: 10,
    paddingBottom: 16,
    paddingVertical: 10,
    //borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default styles;
