import {StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerButton: {
    padding: 10,
  },
  backButton: {
    color: '#333333',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  addImage: {
    color: '#333333',
  },

  bottomLine: {
    position: 'absolute',
    bottom: 0,
    width: '50%',
    height: 4,
    backgroundColor: COLORS.primary,
    transition: 'left 0.3s',
  },
  categoryItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  categoryName: {
    fontSize: 16,
    flex: 1,
    marginLeft: 20,
  },
  deleteButton: {
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLORS.Rhino,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
});

export default styles;
