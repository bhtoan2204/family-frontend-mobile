import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';
const halfScreenHeight = Dimensions.get('window').height / 2;
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

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
    right: 10,
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
    top: 70,
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
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    alignSelf: 'flex-start',
    color: '#2a475e',
    padding: 15,
  },
  titleBottom: {
    fontSize: 30,
    textAlign: 'center',
    alignSelf: 'flex-start',
    color: COLORS.white,
    padding: 5,
    marginBottom: 15,
  },
  touchableOpacity: {
    alignItems: 'center',
  },
  iconBorder: {
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    //borderColor: COLORS.primary,
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
    padding: screenWidth * 0.03,
    bottom: screenHeight * 0.025,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    //backgroundColor: '#2a475e',
    backgroundColor: 'transparent',
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
    //backgroundColor: '#2a475e',
    backgroundColor: 'rgba(42, 71, 94, 0.5)',
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
  numberBalanceVisible: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    paddingRight: 10,
    color: '#66c0f4',
  },
  numberBalanceHidden: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    paddingRight: 10,
    color: 'white',
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
    alignItems: 'center',
    alignContent: 'center',
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
    width: screenWidth * 0.9,
    //height: screenHeight * 0.3,
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
    width: screenWidth * 0.9,
    //height: screenHeight * 0.3,
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
    color: '#c7d5e0',
  },
  activeDot: {
    color: '#1b2838',
    transform: [{scale: 1.6}],
  },
  containerBottom: {
    height: halfScreenHeight,
    //backgroundColor: '#2a475e',
    backgroundColor: 'rgba(42, 71, 94, 0.5)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowRadius: 3.84,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    marginTop: 25,
    padding: 20, // Xếp hàng
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  button1: {
    width: 60, // Đảm bảo không xếp chồng
    height: 60,
    //backgroundColor: COLORS.primary, // Màu primary
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
    fontWeight: '500', // Độ đậm của văn bản
    //color: '#6C6D71',
    color: '#fff', // Màu trắng
    textAlign: 'center', // Canh giữa văn bản
  },
  buttonIcon1: {
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row', // Xếp hàng
    justifyContent: 'space-between', // Khoảng cách giữa các nút
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonTexttest: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  colorLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#4c669f',
    opacity: 0.33,
  },
  imageCombo: {
     width: screenWidth * 0.8, 
    height: screenWidth * 0.5, 
     marginRight: 20,
  },
  scrollViewContainer: {
    marginLeft: 20,
  },
  textCombo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.Rhino,
    marginLeft: 20,
    marginBottom: 20,
  },
  comboContainer: {
    marginBottom: 40,
  },
});

export default styles;
