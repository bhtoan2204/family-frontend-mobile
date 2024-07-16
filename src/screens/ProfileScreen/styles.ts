import { StyleSheet } from 'react-native';
import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    alignSelf : 'center'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  profileView: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor:  '#f0f0f0', 
    marginBottom: 20,

  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginRight: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 3,
  },
  emailText: {
    fontSize: 14,
    color: 'gray',
  },
  section: {
    marginBottom: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor:  '#f0f0f0', 
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontSize: 20,
    color: '#ccc',
    marginBottom: 10,
    
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#ccc',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  icon: {
    marginRight: 20,
  },
  itemText: {
    fontSize: 16,
    color: '#333333',
  },
  itemSubText: {
    fontSize: 12,
    color: 'gray',
  },
  iconChevron: {
    marginLeft: 'auto',
  },
});

export default styles;
