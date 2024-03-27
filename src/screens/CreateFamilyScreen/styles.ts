import {StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  headerfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 27,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: COLORS.DarkGunmetal,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  exampleText: {
    width: 80, 
    marginRight: 10,
  },
 
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: COLORS.white,
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
  buttonSelected: {
    backgroundColor: 'coral',
    borderWidth: 0,
  },
  inputIOS: {
    height: 40,
    borderColor: COLORS.gray,
    borderWidth: 1,
    marginTop: 12,
    paddingHorizontal: 8,
    width: '100%',
    borderRadius: 4,
  },
  inputAndroid: {
    height: 40,
    borderColor: COLORS.gray,
    borderWidth: 1,
    marginTop: 12,
    paddingHorizontal: 8,
    width: '100%',
  },
  backButton: {
    color: COLORS.black,
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
  },

  inputControl: {
    height: 50,
    backgroundColor: COLORS.white,
    paddingHorizontal: 75,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: COLORS.ColumbiaBlue,
    borderStyle: 'solid',
  },
  /** Form */
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.BrandeisBlue,
    textAlign: 'center',
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.darkgray,
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  colorfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.darkgray,
    marginBottom: 8,
  },
  profile: {
    alignSelf: 'center',
    width: 27,
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    marginBottom: 24,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 7,
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
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
});

export default styles;
