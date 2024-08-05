import {Dimensions, StyleSheet} from 'react-native';
import {COLORS, TEXTS} from 'src/constants';
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerfile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  backButton: {
    color: COLORS.black,
  },
  inputControl: {

    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  containerEnter: {

    marginLeft:screenWidth*0.025,
  },
  input1: {
    height: TEXTS.SCEEN_HEIGHT*0.05,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 25,
    fontWeight: '500',
    color: '#333',
    right: 10,
  },
  input2: {
    height: TEXTS.SCEEN_HEIGHT*0.02,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 19,
    fontWeight: '500',
    color: '#333',
  },
  button: {
    backgroundColor: 'lightgray',
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
    marginTop: 20,
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
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: COLORS.Rhino,
    borderColor: COLORS.Rhino
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
    height: '100%', 
    width: '100%', 
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: 20,
  },
   datetimeContainer: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
   },
   allDayConTainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', 
    marginBottom: 10,
    alignItems: 'center',

   },

   text: {
    textAlign: 'center',
    fontSize: 16,
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