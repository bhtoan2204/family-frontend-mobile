import {StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    //backgroundColor: COLORS.white,
    width: '100%',
    height: '100%',
  },
  animatedView: {
    height: 50,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    height: 50,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    //shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  headerText: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
    shadowColor: COLORS.AuroMetalSaurus,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 10,
    shadowRadius: 2,
    padding: 15,
  },
  section: {
    marginBottom: 20,
  },
  button: {
    width: '48%', // Đảm bảo không xếp chồng
    aspectRatio: 1, // Hình vuông
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 18,
    color: '#333',
  },
  buttonIcon: {
    marginRight: 10, // Đảm bảo khoảng cách giữa biểu tượng và văn bản
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default styles;
