import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';
const halfScreenHeight = Dimensions.get('window').height / 2;

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
    //backgroundColor: '#F4F7FF',
    backgroundColor: '#1D1441',
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
    width: '30%', // Đảm bảo không xếp chồng
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
    fontSize: 15,
    //color: '#6C6D71',
    color: '#fff',
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
    backgroundColor: '#332E59',
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
    //overflow: 'hidden',
  },
  image: {
    width: '55%',
    height: '55%',
  },

  walletBox: {
    elevation: 5,
    padding: 15,
    margin: 20,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: '#332E59',
    justifyContent: 'space-between',
    shadowRadius: 3.84,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
  },
  balance: {
    fontSize: 16,
    marginBottom: 10,
    //color: '#6C6D71',
    color: '#fff',
  },
  numberBalance: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    paddingRight: 10,
    color: '#fff',
  },
  balanceBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  walletButton: {
    backgroundColor: '#56409e',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonTxt: {
    color: '#fff',
    textAlign: 'center',
  },
  columnStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: -15,
  },
  columnStyle1: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  rowStyle1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  rowStyle2: {
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    flexWrap: 'wrap',
  },
  buttonStyle: {
    //padding: 3,
    margin: 5,
    alignItems: 'center',
  },
  pictureBox: {
    width: 375,
    elevation: 5,
    padding: 15,
    margin: 20,
    borderColor: '#000',
    borderRadius: 10,
    //backgroundColor: '#5785FD',
    justifyContent: 'space-between',
    shadowRadius: 3.84,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    //overflow: 'hidden',
  },
  pictureBox2: {
    width: 375,
    elevation: 5,
    padding: 15,
    margin: 20,
    borderColor: '#000',
    borderRadius: 10,
    //backgroundColor: '#5785FD',
    justifyContent: 'center',
    shadowRadius: 3.84,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    //overflow: 'hidden',
  },
  text: {
    color: '#fff',
    fontSize: 45,
    fontWeight: 'bold',
  },
  text2: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
    //marginRight: 10,
    //marginTop: 10,
  },
  familyImage: {
    marginTop: -70,
    width: 450,
    height: 300,
    marginLeft: -8,
  },
  familyImage2: {
    marginTop: 27,
    transform: [{translateY: 15}, {translateX: 5}],
    width: 280,
    height: 350,
    marginLeft: -120,
  },
  familyImage3: {
    marginTop: 3,
    transform: [{translateY: -30}, {translateX: 30}],
    width: 300,
    height: 280,
    //marginLeft: -120,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    margin: 5,
    fontSize: 20,
    color: '#888',
  },
  activeDot: {
    //color: '#000',
    color: '#fff',
    transform: [{scale: 1.6}],
  },
  containerBottom: {
    height: halfScreenHeight,
    backgroundColor: '#332E59',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowRadius: 3.84,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    marginTop: 25,
    padding: 20, // Xếp hàng
    justifyContent: 'space-between',
  },
  button1: {
    width: 60, // Đảm bảo không xếp chồng
    height: 60,
    backgroundColor: COLORS.primary, // Màu primary
    borderRadius: 100, // Hình tròn
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText1: {
    fontSize: 15,
    //color: '#6C6D71',
    color: '#fff', // Màu trắng
    textAlign: 'center', // Canh giữa văn bản
  },
  buttonIcon1: {
    color: '#fff', // Màu trắng
  },
  buttonContainer: {
    flexDirection: 'row', // Xếp hàng
    justifyContent: 'space-between', // Khoảng cách giữa các nút
  },
});

export default styles;
