import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from 'src/constants';
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    padding: 15,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 20,
    height: screenHeight * 0.3,
    backgroundColor: COLORS.white,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
  },
  headerfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    color: COLORS.Rhino,
  },
  // saveButton: {
  //   color: COLORS.Blue,
  // },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
    marginTop: 20,
  },
  form: {
    marginTop: 20,
  },
  input: {
    marginBottom: 20,
    width : 380
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputPhone: {
    borderWidth: 1.5,
    borderColor: COLORS.Rhino,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 50,
    width: '95%',
    backgroundColor: COLORS.PaleAqua,
    paddingLeft: 45,
  },
  inputControl: {
    borderWidth: 1.5,
    borderColor: COLORS.Rhino,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: COLORS.PaleAqua,
    height: 50,
    paddingLeft: 45,
    width: '95%',
    alignSelf: 'center',
    zIndex: 0,
  },
  errorText: {
    color: COLORS.red,
  },
  colorfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profile: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  dropDownStyle: {
    backgroundColor: COLORS.white,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  itemStyle: {
    justifyContent: 'flex-start',
  },
  searchableStyle: {
    borderRadius: 5,
    borderColor: COLORS.black,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    marginRight: 10,
  },
  circleInside: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  btn: {
    marginTop: screenHeight * 0.02,
    marginBottom: screenHeight * 0.01,
    borderColor: COLORS.Rhino,
  },
  btnText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButtonContainer: {
  },
  contactIcon: {
    color: COLORS.Rhino,
  },
  sheetHeader: {
    backgroundColor: COLORS.darkgray,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  sheetHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sheetBody: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  profileText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  group: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  Contactcontainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 14,
    color: '#666',
  },
  contactCon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  imgCon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  contactDat: {
    flex: 1,
    marginLeft: 20,
  },

  phoneNumber: {
    fontSize: 14,
    color: '#666',
  },
});

export default styles;
