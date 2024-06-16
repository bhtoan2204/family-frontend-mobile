import { StyleSheet } from 'react-native';
import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  backButton: {
    color: COLORS.Rhino,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
    flex: 1,
    padding: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchIcon: {
    color: '#999',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    marginRight: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 120, 
  },
  avatarText: {
    fontSize: 18,
    color: '#fff',
  },
  messageContainer: {
    flex: 1,
    marginLeft: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 14,
    color: '#777',
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#999',
  },
  userName: {
    fontSize: 12,
    marginTop: 10,
  },
  userContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  userHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  userContainerWithoutAvatar: {
    borderColor: '#ccc', 
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25, 
    backgroundColor: '#ccc', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    padding: 5,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 100,
    alignItems: 'center',

  },
  buttonSelected: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 100,
    alignItems: 'center',
    backgroundColor: '#f2f2f2'
  },
  buttonTextSelected: {
    color: '#000',
  },
  buttonText: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rightAction: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf:'center', 
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: '#A9A9A9',
  },
  activeDot: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    backgroundColor: 'green',
    borderWidth: 2,
    borderColor: 'white',
    zIndex: 1,
    bottom: 20,
    left: 25,
  },
});

export default styles;
