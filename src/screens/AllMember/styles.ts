import {COLORS} from 'src/constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  iconContainer:{
    flexDirection: 'row',

  },
  backButton: {
    color: COLORS.black,
  },
  InforContainer:{
    paddingVertical: 20,

  },
  headerAction: {
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerSearch: {
    position: 'relative',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerSearchIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  headerSearchInput: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    paddingLeft: 34,
    width: '100%',
    fontSize: 16,
    fontWeight: '500',
  },
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  text: {
    margin: 6,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: '100%',
  },
  buttonText: {
    color: '#FFF',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  card: {
    backgroundColor: COLORS.AliceBlue,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  nameText: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 5,
    fontWeight: 'bold',

  },

  cardText: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 5,

  },
  RoleText: {
    fontSize: 16,
    color: COLORS.PhilippineSilver,
    marginBottom: 5,
    fontWeight: 'bold',

  },
  rowFront: {
    backgroundColor: '#FFF',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  inputControl: {
    height: 50,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: COLORS.ColumbiaBlue,
    borderStyle: 'solid',
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.darkgray,
    marginBottom: 8,
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.black,
    backgroundColor: COLORS.black,
    marginBottom: 12,
  },
  headerfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: COLORS.DarkGunmetal,
    marginBottom: 6,
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  transparentButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderColor: '#000', // Change this to the color you want for the border
    borderWidth: 1,
    borderRadius: 5, // Adjust this to change the roundness of the button corners
    padding: 10, // Adjust this to change the size of the button
  },
});

export default styles;