import { StyleSheet } from 'react-native';
import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    height: '7%',
    marginHorizontal: 10,
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 25,
  },
  headerButton: {
    paddingHorizontal: 0,
  },
  headerText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },

  containerTab: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  selectedTabButton: {
    backgroundColor: COLORS.BlueLight,
  },
  tabButtonText: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: '500',
  },
  selectedTabText: {
    color: COLORS.white,
  },
  bottomLine: {
    position: 'absolute',
    bottom: 0,
    width: '50%',
    height: 4,
    backgroundColor: COLORS.primary,
    transition: 'left 0.3s',
  },
  container: {
    flex: 1,
  },
  
  backButton: {
    color: 'white',
  },
  filterButton:{
    color: 'white',
  },
  forwardIcon: {
   marginLeft: 10,
  },
  sumContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0', 
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', 
    flexDirection: 'row',
  },
  sumText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray', 
  },
  expenseItem: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  expenseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#333333', 
  },

  expenseDate: {
    fontSize: 14,
    color: 'gray', 
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  dropdownMenu: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
  },

  avatar: {
    width: 24,
    height: 24,
    marginRight: 10,
    borderRadius: 12,
  },
  text: {
    fontSize: 16,
  },
  expenseContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  expenseCategory: {
    fontSize: 16,
    color: COLORS.Rhino,
    fontWeight: '500',
  },
  expenseDescription: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight:'bold',
    color: 'red',
  },  
  amount: {
    fontSize: 14,
  },  
  incomeAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  expenseName: {
    fontSize: 14,
    color: COLORS.DenimBlue,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    
  },
  modalBackground: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  checkIcon: {
    marginLeft: 'auto',
    color: '#4CAF50',
  },
  selectedFilterItem: {
    backgroundColor: '#e1e1e1',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rowInfo: {
    marginTop: 5,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  paginationText: {
    marginHorizontal: 8,
    fontSize: 16,
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
