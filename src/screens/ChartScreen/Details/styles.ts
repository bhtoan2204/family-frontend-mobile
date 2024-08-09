import {StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

export const styles = StyleSheet.create({
  editButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  inner: {
    flex: 1,
  },
  editIcon: {
    color: 'gray',
    marginRight: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  headerButton: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    padding: 0,
  },
  backButton: {
    color: '#333',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  editContainer: {
    backgroundColor: 'lightblue',
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#00adf5',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },

  editButton: {
    color: '#333',
    marginRight: 5,
  },
  editText: {
    color: 'gray',
    fontSize: 18,
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
  amountContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  valueAmount: {
    color: 'red',
    fontSize: 40,
    fontWeight: 'bold',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  valueContainer: {
    flexDirection: 'column',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  ValueName: {
    fontSize: 16,
    color: COLORS.DenimBlue,
  },
  input: {
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 2,
  },
  picker: {
    color: '#333',
    width: 200,
    justifyContent: 'space-between',
  },
  imageContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  imageWrapper: {
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  changeImageButton: {
    marginBottom: 5,
  },
  changeImageText: {
    color: '#007BFF',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
    borderRadius: 10,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    paddingHorizontal: 10,
    elevation: 5,
  },
  deleteImageButton: {
    marginBottom: 5,
  },
  deleteText: {
    color: 'white',
    fontSize: 17,
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
  },

  saveButton: {
    backgroundColor: '#4CAF50',
  },

  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemContainer: {
    marginBottom: 12,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 15,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  itemReminderDate: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  itemStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 8,
  },
  addButton: {
    padding: 16,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
