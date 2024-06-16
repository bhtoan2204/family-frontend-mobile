import {StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

export default StyleSheet.create({
  headerContainer: {
    //backgroundColor: 'rgba(128, 50, 128, 0.5)',
    alignItems: 'center',
    //marginBottom: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    height: '6%',
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
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  backButton: {
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 10,
    color: 'black',
  },
  selectedTabText: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    fontWeight: 'bold',
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
    color: 'black',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    width: '100%',
  },
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
    color: '#ccc',
  },
  containerTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width: '100%',
  },
  bottomLine: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: 'gray',
    width: '50%',
  },
  rightAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginVertical: 5,
    backgroundColor: 'lightgray',
    borderRadius: 5,
},
});
