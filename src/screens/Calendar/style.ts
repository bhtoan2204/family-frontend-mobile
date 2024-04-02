import {COLORS} from 'src/constants';
import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
  calendar: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 300,
  },
  modalIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  editIcon: {
    marginRight: 10,
  },
  noEventText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  eventInfo: { 
    marginLeft: 10,
  },
  eventTitle: {
    fontWeight: 'bold',

  },
});

export default styles;
