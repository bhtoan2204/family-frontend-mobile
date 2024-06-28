import { StyleSheet } from 'react-native';
import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#ccc', 
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc', 
  },
  headerButton: {
    padding: 10,
  },
  backButton: {
    color: '#333333',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333', 
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  filterButton: {
    color: '#333333', 
  },
  containerTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f0f0f0', 
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  selectedTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#333333',
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  bottomLine: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    width: '50%',
    backgroundColor: '#333333', 
  },
  sumContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white', 
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', 
  },
  sumText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333', 
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
    color: '#666666', 
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
    fontWeight: 'bold',
    color: '#333',
  },
  expenseDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  expenseAmount: {
    fontSize: 14,
    color: 'red',
  },  
  incomeAmount: {
    fontSize: 14,
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
});

export default styles;
