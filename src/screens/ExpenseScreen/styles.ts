import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { COLORS } from 'src/constants';
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1, 
    paddingHorizontal: 20, 
    paddingTop: 10, 
},
  headcontainer: {
    flex: 1,
    backgroundColor: 'white', 
    paddingHorizontal: 3,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    padding: 20,
    fontSize: 16,
    width: '100%',
    flexDirection: 'row', 
    marginBottom: 20, 
    backgroundColor: 'white', 


  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
},
  inputAmount: {
    borderBottomWidth: 1,
    borderColor: '#ccc', 
    padding: 10,
    fontSize: 16,
    width: '100%', 
  },
  currency: {
    marginLeft: 5,
    fontSize: 16,
    justifyContent: 'center', 
  },
  inputWrapper: {
    flex: 1, 
    borderWidth: 0,

  },
  header: {
    backgroundColor: COLORS.BlueLight,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  
  },
  headerText: {
    fontSize: 20,
    color: '#ffffff', 
    fontWeight: 'bold',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  expenseItem: {
    marginLeft: 5,
    fontSize: 16,
    justifyContent: 'center', 
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 25,
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    backgroundColor: 'white', 
    width: '100%'
  },
  ContainerCategory: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    padding: 10,
    fontSize: 16,
    flexDirection: 'column', 
    marginBottom: 20, 
    backgroundColor: 'white', 

  },
  selectedItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    padding: 10, 
},
  mostUsedButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#ccc',
    borderRadius: 5,
    marginVertical: 10,
    fontWeight: 'bold',

  },
  descriptionAndDatePickerContainer: {
    marginBottom: 20, 
  },

  container: {
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    flexDirection: 'column', 
    marginBottom: 20, 
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
    
},

  titleText: {
    fontSize: 16,
    color: '#ccc',
  },
  icon: {
    marginRight: 10,
  },

  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevronContainer: {
    position: 'absolute',
    right: screenWidth*0.005,
},
imageContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center', 
  paddingHorizontal: screenWidth*0.25 , 
  marginHorizontal: 10, 
},
inputControl: {
  borderWidth: 1,
  borderColor: '#3498db',
  borderRadius: 80,
  paddingVertical: 10,
  paddingHorizontal: 15,
  width: '30%',

},
});

export default styles;
