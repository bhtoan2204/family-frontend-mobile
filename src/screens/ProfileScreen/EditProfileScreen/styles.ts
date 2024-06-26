import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingBottom: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarButton: {
    position: 'relative',
  },
  avatarImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  editContainer: {
    position: 'absolute',
    bottom: 0,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    color: COLORS.white,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: '#0080FF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    backgroundColor: COLORS.lightGray,
    borderRadius: 5,
    justifyContent: 'center',
  },
  datePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    padding: 10,
    borderRadius: 5,
  },
  datePickerText: {
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.black,
  },
  radioText: {
    fontSize: 16,
    color: COLORS.black,
  },
  label: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 5,
  },
});

export default styles;
