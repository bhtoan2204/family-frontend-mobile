import {StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarText: {
    fontSize: 20,
  },
  messageContainer: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
  },
  messageText: {
    marginTop: 5,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
  },
  backButton: {
    color: COLORS.primary,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  addButton: {
    color: COLORS.primary,
  },
});

export default styles;
