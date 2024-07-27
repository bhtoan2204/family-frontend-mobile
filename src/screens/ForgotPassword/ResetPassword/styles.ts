import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from 'src/constants';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const progressBarWidth = screenWidth*0.9; 
const progressBarHeight = 10; 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  keyboardView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  progressBar: {
    flexDirection: 'row',
    width: progressBarWidth,
    height: progressBarHeight,
    borderRadius: 5, 
    overflow: 'hidden', 
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  progressStep: {
    flex: 1,
    borderRadius: 5, 
    height: '50%',
    marginHorizontal: 3, // Thêm khoảng cách giữa các bước
    backgroundColor: 'grey', // Màu nền cho các bước chưa hoàn thành
  },
  progressStepActive: {
    borderRadius: 5,
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
  TextContainer:{
    flexDirection: 'column',
    marginBottom: 30,
    width:'90%',
    alignSelf:'center',
  },
  emailTitle:{
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emailDetail:{
    fontSize: 15,
    fontWeight: 'semibold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TextInput: {
    height: screenHeight * 0.06,
    width: screenWidth * 0.9,
    borderWidth: 1.5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: screenWidth * 0.07,
    backgroundColor: COLORS.PaleAqua,
    color: COLORS.Rhino,
    alignSelf: 'center',
  },
  optionContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 4,
    width: screenWidth * 0.9,
    marginTop: 20,
  },
  optionEmailButton: {
    marginBottom: 20,
    padding: 10,
  },
  selectedOption: {
    borderColor: '#f0f0f0',
  },
  selectedOptionText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
    padding: 5,
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: COLORS.black,
  },
  changePasswordButton: {
    backgroundColor: COLORS.AliceBlue,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
  },
  arrowButton: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    padding: 10,
    backgroundColor: 'transparent',
  },
  backButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
