import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  contactCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgCon: {
    marginRight: 10,
  },
  placeholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  contactDat: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phoneNumber: {
    color: '#888',
  },
  userContact: {
    backgroundColor: '#f0f8ff',
  },
  normalContact: {
    backgroundColor: '#ffffff',
  },
  txt: {

  },
  appIndicator: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  avatarSmall: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  contactContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  appIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerText: {
    
  }
});
export default styles;
