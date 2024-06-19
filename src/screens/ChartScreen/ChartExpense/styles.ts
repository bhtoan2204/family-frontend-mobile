import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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
    marginLeft: 15,
  },
  headerButton: {
    paddingHorizontal: 0,
  },
  headerText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
  },
  backButton: {
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 10,
    color: 'white',
  },

  categoryItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  categoryImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  categoryName: {
    fontSize: 16,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginTop: screenHeight * 0.115,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    marginBottom: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImage: {
    marginBottom: 10,
    marginRight: 10,
    marginTop: 10,
    color: 'white',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    width: '100%',
  },
  tabButton: {
    paddingVertical: 10,
    alignItems: 'center',
    width: '30%',
    height: '70%',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  tabButtonContent: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  selectedTabButton: {
    backgroundColor: '#CCEAFB',
  },
  selectedTabButtonText: {
    color: '#2a475e',
    fontWeight: '600',
  },

  tabButtonText: {
    color: '#696969',
    fontSize: 16,
    alignSelf: 'center',
  },
  containerTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '95%',
    alignSelf: 'center',
    color: 'transparent',
  },
  bottomLine: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: 'gray',
    width: '30%',
  },
  datePickerText: {
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
  },

  datePickerContainer: {
    //paddingVertical: 10,
    top: 10,
    paddingHorizontal: 0,
    fontSize: 20,
    alignSelf: 'center',
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '30%',
    height: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },

  titleText: {
    fontSize: 16,
    color: '#ccc',
  },
  icon: {
    marginRight: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 16,
    alignContent: 'center',
    padding: 10,
  },
  legendContainer: {
    flexDirection: 'column',
    //justifyContent: 'center',
    alignItems: 'flex-start',
    //flexGrow: 1,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginVertical: 5,
  },
  legendColor: {
    width: 20,
    height: 3,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 16,
    color:'#fff',
  },
  selectedLegendItem: {
    backgroundColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
  },
  chartContainer: {
    bottom: 30,
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'column',
    height: '50%',
  },
  chartBarContainer: {
    bottom: 30,
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 20,
    borderTopRightRadius: 60,
    width: '100%',
    alignSelf: 'center',

    flexDirection: 'column',
  },
  chartLineContainer: {
    bottom: 30,
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    borderTopLeftRadius: 60,
    width: '100%',
    alignSelf: 'center',

    flexDirection: 'column',
  },
  buttonContainer: {
    marginTop: screenHeight * 0.005,
  },
  ContainerCategory: {
    // borderWidth: 1,
    // borderColor: '#ccc',
    // borderRadius: 20,
    flexGrow: 1,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  expenseDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expenseText: {
    fontSize: 16,
    padding: 10,
  },
  expenseAmount: {
    fontSize: 15,
    color: 'red',
    marginRight: 10,
  },
  monthText: {
    color: 'white',
    fontSize: 16,
    alignContent: 'center',
    padding: 10,
    fontWeight: 'bold',
  },
  monthPickerContainer: {
    width: '100%',
    alignItems: 'flex-end',
    // borderColor: '#ccc',
    // borderBottomWidth: 1,
    paddingVertical: 10,
    right: 165,
  },
  monthContainer: {
    borderRadius: 10,
    alignItems: 'center',
    borderColor: '#ccc',
    backgroundColor: COLORS.DenimBlue,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  yearPickerContainer: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    marginBottom: 70,
  },

  dropdownYear: {
    height: 30,
    width: 150,
  },

  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
  },

  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryItem: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  selectedCategoryItem: {
    backgroundColor: 'lightblue',
  },
  categoryList: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },

  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },

  linechart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  flatListContent: {
    paddingBottom: 20,
  },

  legendColorBox: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 25,
  },
  detailsContainer: {
    marginTop: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  filterItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
  },
  filterButton: {
    color: 'white',
  },
  expenseDateItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  containerTextName: {
    color: 'blue',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  noDataText: {
    fontSize: 18,
    color: 'red',
  },
  outerContainer: {
    flex: 0.7,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
  },

  selectedDataPointContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 2,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedDataPointText: {
    fontSize: 14,
    marginBottom: 5,
  },
  dotContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5, 
    padding: 5, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    fontSize: 12, 
  },
});
export default styles;
