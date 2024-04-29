import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const styles = StyleSheet.create({
  calendar: {
  },
  centeredView: {
    position: 'absolute',
    bottom: -200,
    width: '100%', 
    height: '50%',

    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  modalView: {
    width: '100%', 
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  modalIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  plusIcon: {
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    marginRight: 20, 
  },
  noEventText: {
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  editIcon: {
    marginLeft: 10,
  },
});

export default styles;
