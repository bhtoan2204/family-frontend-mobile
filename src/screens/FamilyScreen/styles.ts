import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';
const halfScreenHeight = Dimensions.get('window').height / 1.8;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    // marginBottom: 26,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    color: 'white',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  imageBackgroundDescription: {
    color: '#ccc',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
    marginBottom: 200,
  },
  card: {
    width: '48%', // Giả sử mỗi card chiếm khoảng 48% chiều rộng của container để có chút không gian giữa chúng
    height: 130, // Đặt chiều cao cố định cho mỗi card
    marginBottom: 15, // Khoảng cách giữa các hàng
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  icon: {
    width: 50, // Kích thước icon
    height: 50, // Kích thước icon
    marginBottom: 5,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 20,
    position: 'absolute',
    top: 10,
    left: 15,
    right: 15,
  },
  detail: {
    textAlign: 'left',
    fontSize: 13,
    width: '70%',
    position: 'absolute',
    top: 40,
    left: 15,
    right: 15,
  },
  fullScreenImage: {
    height: 461,
    width: 357,
    alignSelf: 'center',
    top: Dimensions.get('window').height / 2 - 250,
  },
  cancelImage: {
    height: 40,
    width: 40,
    zIndex: 10,
  },
  cancel: {
    position: 'absolute',
    top: 200,
    right: 20,
  },
  explore: {
    position: 'absolute',
    bottom: 160,
    alignSelf: 'center',
  },
  exploreImage: {
    width: 161,
    height: 36,
  },
});

export default styles;
