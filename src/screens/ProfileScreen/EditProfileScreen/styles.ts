import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
  container: {
    width: 415,
          height: 900,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          alignSelf: 'center',
          bottom: 10,
          paddingHorizontal: 20,
  },
  header: {
   
    paddingBottom: 0,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  backgroundImage:{flex: 1,
    backgroundColor: '#fff',
    padding: 10,},
  backButton: {
    position: 'absolute',
    top: 40,
    left: 5,
    zIndex: 1,
  },
  avatarButton: {
    position: 'relative',
  },
  avatarImage: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  editContainer: {
    position: 'absolute',
    bottom: 10,
    right: 5,
    width: 35,
    height: 35,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    color: COLORS.white,
  },
  inputContainer: {
    marginBottom: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: COLORS.Rhino,
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
