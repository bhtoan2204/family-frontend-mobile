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
});

export default styles;
