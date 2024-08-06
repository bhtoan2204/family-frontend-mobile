import {StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: 'gray',
  },
  time: {
    fontSize: 16,
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
  },
  location: {
    fontSize: 16,
    marginBottom: 10,
    color: 'gray',
  },
  editButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  textDelete: {
    color: 'red',
    fontSize: 17,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerp: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    marginBottom: 10,
  },
  buttonText: {
    marginLeft: 10,
  },
  containerBtnDelete: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  containerRule: {
    padding: 10,
    borderRadius: 8,
    margin: 10,
  },
  recurrenceContainer: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  recurrenceText: {
    fontSize: 16,
    color: '#333', // Hoặc sử dụng màu từ `color.text` nếu có
  },
  dateTime: {
    color: 'gray',
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  checklistText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  shoppingListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  shoppingListText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  addButtonText: {
    fontSize: 16,
    color: 'white',
  },
});
export default styles;
