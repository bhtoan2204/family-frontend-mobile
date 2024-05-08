import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { COLORS } from 'src/constants';
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({


      filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#f0f0f0',
        marginBottom: 10,
      },
      filterLabel: {
        fontSize: 16,
        marginRight: 10,
      },
      filterTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
      },
      filterTypeButton: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: 'lightblue',
        marginHorizontal: 5,
      },
      filterTypeText: {
        fontSize: 14,
        color: 'black',
        marginLeft: 50,
      },
      filterInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
      },
    container: {
      backgroundColor: 'white', 
      paddingHorizontal: 3,
      height: '100%',
    },
    headcontainer: {
      backgroundColor: 'white', 
      paddingHorizontal: 3,
      height: '100%',
    },
    familyItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    header: {
      backgroundColor: 'rgba(128, 50, 128, 0.5)', 
      alignItems: 'center',
      marginBottom: 20,
      justifyContent: 'center',
      flexDirection: 'row',
      height: '8%',
      },
      headerText: {
        flexDirection: 'column',
        fontSize: 20,
        color: '#ffffff', 
        fontWeight: 'bold',
        marginLeft: 0
      },
      chevronContainer: {
        position: 'absolute',
        right: screenWidth*0.005,
        marginRight: 10,
    },
      circle: {
        width: 140, 
        height: 40, 
        borderRadius: 15, 
        backgroundColor: 'rgba(128, 50, 128, 0.2)', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginRight: 20
      },
      square: {
        width: 70, 
        height: 40,
        borderRadius: 8, 

        backgroundColor: '#ccc', 
         justifyContent: 'center', 
         alignItems: 'center',
        marginRight: 10
      },
      itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    
      },
      headerButton: {
        alignItems: 'center',
        justifyContent: 'center', 
        alignContent: 'center',
    },
   
    
      backButton: {
        color: 'white',
        right: screenWidth*0.25,
        marginRight: 'auto',
    
      },
      expenseItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },

    expenseTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    expenseAmount: {
        fontSize: 16,
        color: 'green',
    },
    expenseTitleStyle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'blue',
    },
    expenseTypeContainer: {
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    expenseTypeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    filterButton: {
      color: 'white'
    },
    
    datePickerContainer: {

      fontSize: 20,
      //width: '100%', 
      justifyContent: 'center',
      alignItems: 'center',
      
  },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        height: '40%',
        //width: '%',

        flexDirection: 'row',
    },
    closeModalButton: {
        fontSize: 16,
        color: 'red',
        marginBottom: 20,
    },
    filterOption: {
        fontSize: 16,
        marginBottom: 10,
        color: 'white',
    },
    pickerContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },

    menuItem: {
      paddingVertical: 10,
      borderBottomWidth: 1, 
      borderBottomColor: '#ccc',
      flexDirection: 'row',
    
    },
    text: {
      fontSize: 16,
      borderBottomColor: 'gray',
    },
    checkIcon: {
      position: 'absolute',
      right: screenWidth*0.005,
      padding: screenWidth*0.05,
    },
    dropdownMenu: {
      position: 'absolute',
      top: 0,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#ccc',
      width: '100%',
    
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      marginTop: 112, 
    },
    expenseContent: {
      flex: 1,
  },
  expenseDate: {
      color: 'gray',
  },
  containerTab: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    borderBottomWidth: 1, 
    borderBottomColor: 'gray', 
    width: '100%',
  } ,
  tabButton: {
    paddingVertical: 10, 
  },
  selectedTabButton: {
      borderBottomWidth: 0, 
      borderBottomColor: COLORS.primary,
      paddingBottom: 0,
    },
  tabButtonText: {
      fontSize: 16, 
  }, 
  bottomLine: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: 'gray',
    width: '50%', 
  },
  sumContainer: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    },
    sumText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    avatar: {
      width: 30,
      height: 30,
      borderRadius: 25,
    },
    filterItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        flexDirection: 'row',
    }
});
export default styles;