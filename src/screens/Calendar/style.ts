import { StyleSheet } from 'react-native';
import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
  calendar: {
    flex: 1,
},
header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
},
headerText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
},
subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
},
dateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
},
plusIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#00adf5',
    borderRadius: 50,
    padding: 15,
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
},
});

export default styles;
