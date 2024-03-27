import { StyleSheet } from 'react-native';
import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.EerieBlack,
    marginBottom: 12,
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  familyContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  iconDetail: {
    backgroundColor: COLORS.primaryLite,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: 100,
    height: 100, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: 'white', 
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  headerfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  backButton: {
    color: COLORS.black,
  },
});


export default styles;
