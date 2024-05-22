import {StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#05141c',
    padding: 10,
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerTitle1: {
    color: '#66c0f4',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
    marginTop: 15,
  },
  editDeleteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  inputWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: '#332E59',
    backgroundColor: 'rgba(42, 71, 94, 0.5)',
    borderRadius: 15,
    paddingHorizontal: 15,
    width: '65%',
  },
  input: {
    flex: 1,
    height: 40,
  },
  inputIcon: {
    marginLeft: 5,
  },
  addButton: {
    backgroundColor: '#4884D3',
    borderRadius: 20,
    padding: 10,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  familyBigCard: {
    padding: 11,
    paddingHorizontal: 11,
  },
  card: {
    // backgroundColor: 'rgba(42, 71, 94, 0.5)',
    backgroundColor: '#D9E3EA',
    paddingTop: 20,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.25,
  },
  cardBody: {
    marginBottom: 10,
  },
  cardTitle: {
    color: '#1b2838',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 16,
    color: '#1b2838',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  viewButton: {
    backgroundColor: '#4884D3',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconWrapper: {
    marginLeft: 10,
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(42, 71, 94, 0.5)',
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
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  buttonPos: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
  },
  button: {
    //width: 120,
    width: '75%',
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  button1: {
    width: 120, // Đảm bảo không xếp chồng
    height: 30,
    borderRadius: 20, // Hình tròn
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    //elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.25,
  },
  buttonText: {
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonTextChoosen: {
    fontWeight: '700',
    textAlign: 'center',
  },
  image: {
    padding: 10,
    marginLeft: 15,
    width: 100,
    height: 100,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  color: {
    width: 35,
    height: 35,
    borderRadius: 25,
    backgroundColor: '#F81004',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    //overflow: 'hidden',
  },
  description: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: 120,
  },
  ColorAndDescription: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  detailButton: {
    right: 10,
  },
  editButton: {
    left: -2,
  },
  cardContainer2: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    left: 20,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.25,
  },
  // card: {
  //   backgroundColor: '#332E59',
  //   paddingTop: 20,
  //   paddingHorizontal: 5,
  //   justifyContent: 'space-between',
  //   flexDirection: 'row',
  //   borderRadius: 10,
  //   marginHorizontal: 10,
  //   shadowColor: '#000',
  //   shadowOffset: {width: 0, height: 6},
  //   shadowOpacity: 0.25,
  // },
  text: {
    color: '#2a475e',
    fontWeight: '700',
    fontSize: 16,
  },
  icon: {
    color: '#2a475e',
  },
});

export default styles;
