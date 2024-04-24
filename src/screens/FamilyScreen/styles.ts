import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const screenHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1D1441',
  },
  settingItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    padding: 0,
    paddingHorizontal: 20,
  },

  headerfile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  icon: {
    shadowColor: COLORS.AuroMetalSaurus,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 10,
    shadowRadius: 2,
    padding: 15,
  },
  backButton: {
    color: COLORS.black,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardContainer: {
    backgroundColor: '#332E59',
    borderRadius: 20,
    marginVertical: 0,
    marginHorizontal: 10,
    shadowColor: COLORS.Blue,
    shadowOffset: {
      width: 20,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    borderWidth: 0,
    borderColor: COLORS.gray,
    alignItems: 'center',
    padding: 16,
    flexDirection: 'row',
  },
  menuContainer: {
    backgroundColor: '#332E59',
    borderRadius: 20,
    marginVertical: 0,
    marginHorizontal: 10,
    alignItems: 'center',
    padding: 1,
    flexDirection: 'row',
    width: '90%',
  },
  cardBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: COLORS.white,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  functionContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 1,
    //marginBottom: screenHeight * 0.35,
    marginBottom: 240,
  },
  fucntionText: {
    fontWeight: 'bold',
    fontSize: 14,
    padding: 10,
    flexDirection: 'row',
  },
  iconContainer: {
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
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#332E59',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    //overflow: 'hidden',
  },
});

export default styles;
