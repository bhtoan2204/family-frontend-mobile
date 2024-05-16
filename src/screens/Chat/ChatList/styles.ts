import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  backButton: {
    color: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 10,
    flex: 1,
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
    width: 50,
    height: 50,
    borderRadius: 100,
    borderColor: 'blue', 

  },
  avatarText: {
    fontSize: 18,
    color: '#fff',
  },
  messageContainer: {
    flex: 1,
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
});

export default styles;
