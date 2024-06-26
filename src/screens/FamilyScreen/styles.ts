import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';
const halfScreenHeight = Dimensions.get('window').height / 1.8;


const styles = {
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  backButton: {
    color: 'white',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  headerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarButton: {
    width: 190,
    height: 120,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  editContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 8,
    borderRadius: 15,
  },
  editIcon: {
    color: 'white',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 24,
  },
  touchableOpacity: {
    marginTop: 30,
    marginBottom: 40,
  },
  imageBackground: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  imageBackgroundIcon: {
    width: 60,
    height: 60,
  },
  imageBackgroundTextContainer: {
    flex: 3,
    marginLeft: 16,
  },
  imageBackgroundText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  imageBackgroundDescription:{
    color: '#ccc',

  }
};

export default styles;