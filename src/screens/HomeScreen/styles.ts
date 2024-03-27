import {StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const styles = StyleSheet.create({
  animatedView: {
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center', // Căn giữa các phần tử theo chiều dọc
  },
  
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    color: COLORS.primary,
  },
  scrollView: {},
  content: {
    height: 1000,
  },
  subContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    alignSelf: 'center',
    color: COLORS.primary,
  },
  touchableOpacity: {
    alignItems: 'center',
  },
  iconBorder: {
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.primary,
    padding: 3,
  },
  iconDetail: {
    backgroundColor: COLORS.primaryLite,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: 100,
    height: 100, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: 'white', 
  },
});

export default styles;
