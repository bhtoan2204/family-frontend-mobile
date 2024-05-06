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
        flex: 1,
        backgroundColor: 'white', 
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
      circle: {
        width: 140, 
        height: 40, 
        borderRadius: 15, 
        backgroundColor: 'rgba(128, 50, 128, 0.2)', 
        justifyContent: 'center', 
        alignItems: 'center',
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
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    closeModalButton: {
        fontSize: 16,
        color: 'red',
        marginBottom: 20,
    },
    filterOption: {
        fontSize: 16,
        marginBottom: 10,
        color: 'blue',
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

});
export default styles;