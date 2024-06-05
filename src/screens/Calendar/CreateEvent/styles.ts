import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '500',
    color: '#fff',
    marginTop: 20,
  },
  headerfile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    color: COLORS.black,
  },
  inputControl: {
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  input1: {
    height: 30,
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
  },
  input2: {
    height: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 19,
    fontWeight: '500',
    color: '#333',
  },
  button: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '20%',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  containerBtn: {
    flexDirection: 'row',
    padding: 10,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    color: '#222',
  },

  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },

  viewSubmit: {
    alignItems: 'flex-end',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  modalBody: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    // backgroundColor: '#007bff',
    // borderColor: '#007bff',
    backgroundColor: '#66c0f4',
    borderColor: '#66c0f4',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  modalContainer: {
    backgroundColor: '#353952',
    flexDirection: 'column',
  },
  datetimeContainer: {
    flexDirection: 'column',
    padding: 20,
    paddingBottom: -10,
    bottom: 10,
  },
  allDayConTainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },

  text: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
  },
  switches: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  icon: {
    color: 'gray',
  },
});

export default styles;
