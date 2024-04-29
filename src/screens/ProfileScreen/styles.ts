import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backgroundImageView: {
    width: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: 130,
    backgroundColor: COLORS.primary,
  },
  profileView: {
    flex: 1,
    alignItems: 'center',
  },
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 999,
    borderColor: COLORS.primary,
    borderWidth: 2,
    marginTop: -80,
    backgroundColor: COLORS.white,
  },
  locationView: {
    flexDirection: 'row',
    marginVertical: 6,
    alignItems: 'center',
  },
  infoView: {
    paddingVertical: 8,
    flexDirection: 'row',
  },
  nameText: {
    marginVertical: 8,
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 22,
  },
  emailText: {
    color: COLORS.black,
    fontSize: 18,
    lineHeight: 22,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    lineHeight: 20,
  },
  infoItemView: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  numberText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    lineHeight: 30,
    fontSize: 20,
  },
  infoItemText: {
    color: COLORS.black,
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    width: 124,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 14,
    lineHeight: 20,
  },
  buttonView: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  signOutView: {
    width: '80%',
    marginHorizontal: 15,
    flexDirection: 'column',
  },
  signoutButton: {
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.red,
    borderRadius: 10,
  },
  changePasswordButton: {
    marginBottom: 10,
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryLite,
    borderRadius: 10,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.gray,
    marginVertical: 20,
  },
});

export default styles;
