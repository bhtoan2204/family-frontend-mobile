import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {COLORS} from 'src/constants';
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  headcontainer: {
    paddingBottom: 50,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberItem: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  dot: {
    width: 13,
    height: 2,
    borderRadius: 5,
    margin: 5,
  },
  inputContainer: {
    //borderWidth: 1,
    //borderColor: '#ccc',
    padding: 15,
    fontSize: 16,
    width: '100%',
    flexDirection: 'column',
    marginBottom: 10,
    backgroundColor: 'white',
  },

  inputAmount: {
    //borderBottomWidth: 1,
    //borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    width: '100%',
    textAlign: 'right',
  },
  currency: {
    fontSize: 16,
    justifyContent: 'center',
    padding: screenWidth * 0.04,
  },
  inputWrapper: {
    flex: 1,
    borderWidth: 0,
  },
  header: {
    //backgroundColor: 'rgba(128, 50, 128, 0.5)',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    height: '6%',
  },
  headerText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  expenseItem: {
    //marginLeft: 5,
    fontSize: 16,
    justifyContent: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginBottom: 5,
  },
  categoryContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  ContainerCategory: {
    //borderWidth: 1,
    borderColor: '#ccc',
    //borderRadius: 25,
    fontSize: 16,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  selectedItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //borderBottomWidth: 2,
    // borderBottomColor: '#ccc',
    padding: 10,
  },
  mostUsedButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#878C9A',
    borderRadius: 5,
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  cameraButton: {
    marginRight: 20,
  },
  descriptionAndDatePickerContainer: {
    marginBottom: 10,
  },

  container: {
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    flexDirection: 'column',
    marginBottom: 0,
    backgroundColor: 'white',
  },
  datePickerText: {
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
  },

  datePickerContainer: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 0,
    fontSize: 20,
    width: '100%',
    flexDirection: 'row',
  },

  titleText: {
    fontSize: 16,
    color: '#ccc',
  },
  icon: {
    //marginRight: 20,
  },

  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevronContainer: {
    position: 'absolute',
    right: screenWidth * 0.005,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  iconMoney: {
    position: 'absolute',
    left: screenWidth * 0.05,
    marginRight: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
  },
  imageContainer1: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 50,
  },
  imageContainer2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 50,
  },
  inputControl: {
    borderWidth: 1,
    borderColor: '#3498db',
    borderRadius: 80,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '30%',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    width: '100%',
    borderRadius: 0,
  },
  menuItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#2a475e',
    flexDirection: 'row',
    padding: 10,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  text: {
    color: '#1b2838',
    fontSize: 18,
    alignContent: 'center',
    padding: 15,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 100,
  },
  checkIcon: {
    position: 'absolute',
    right: screenWidth * 0.005,
    padding: screenWidth * 0.05,
  },
  circle: {
    width: 180,
    height: 38,
    borderRadius: 15,
    backgroundColor: 'rgba(128, 50, 128, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  familyScrollContainer: {
    flexGrow: 1,
  },
  familycontainer: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },

  family: {
    backgroundColor: '#E1E1E3',
    padding: 10,
    borderRadius: 30,
  },
  familyText: {
    fontSize: 16,
  },
  selectedFamily: {
    backgroundColor: '#2a475e',
  },
  image: {
    height: 100,
    width: 100,
  },
  largeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 180,
    right: 15,
  },
  modalImageContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  removeIconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 12,
  },
  invoiceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
