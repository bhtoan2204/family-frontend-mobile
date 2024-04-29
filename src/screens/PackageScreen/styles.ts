import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.EerieBlack,
    marginBottom: 12,
  },
  /** Radio */
  radio: {
    position: 'relative',
    backgroundColor: COLORS.white,
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    alignItems: 'flex-start',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  radioActive: {
    borderColor: COLORS.BrandeisBlue1,
  },
  radioLabel: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1.2,
    color: COLORS.gray,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  radioPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.DarkCharcoal,
    marginBottom: 12,
  },
  radioBadge: {
    backgroundColor: COLORS.AzureishWhite,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  radioBadgeText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.BrandeisBlue1,
  },
  radioDescription: {
    fontSize: 15,
    fontWeight: '500',
    color: '#848a96',
  },
  radioInput: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: COLORS.SilverFoil,
  },
  radioInputActive: {
    borderWidth: 7,
    borderColor: COLORS.BrandeisBlue1,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.BrandeisBlue1,
    backgroundColor: COLORS.BrandeisBlue1,
    marginBottom: 12,
  },
  btnText: {
    fontSize: 19,
    fontWeight: '600',
    color: COLORS.white,
  },
  backButton: {
    color: COLORS.black,
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
});

export default styles;
