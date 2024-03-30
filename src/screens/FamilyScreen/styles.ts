import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from 'src/constants';

const screenHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1, 
  },
  headerfile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    color: COLORS.AliceBlue,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardContainer: {
    backgroundColor: COLORS.AliceBlue,
    borderRadius: 10,
    marginVertical: 12,
    marginHorizontal: 10,
    shadowColor: COLORS.Blue,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    borderWidth: 1,
    borderColor: COLORS.gray,
    alignItems: 'center',
    padding: 16,
    flexDirection: 'row',

  },
  cardBackground: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center', 
  },
  text: {
    fontSize: 16,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold'

  },
  functionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
    marginBottom: screenHeight*0.55,

  },
  fucntionText :{
    fontWeight: 'bold',
    fontSize: 14,
    padding:10,
    flexDirection: 'row',

  },
  iconContainer:{
    alignItems: 'center',

  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    marginLeft: 10,
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default styles;
