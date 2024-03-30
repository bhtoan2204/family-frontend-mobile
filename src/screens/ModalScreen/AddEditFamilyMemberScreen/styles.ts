import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from 'src/constants';
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    height: screenHeight*0.3,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  headerfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    color: COLORS.black,
  },
  saveButton: {
    color: COLORS.Blue,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 20,
  },
  input: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputControl: {
    borderWidth: 1,
    borderColor: COLORS.EerieBlack,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
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
    color: COLORS.AliceBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  btnText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButtonContainer: {
    // Định nghĩa kiểu cho addButtonContainer tại đây
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
});

export default styles;
