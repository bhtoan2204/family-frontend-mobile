import {StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 160,
    paddingTop: 20,
    paddingBottom: 40,
  },
  comboList: {
    marginBottom: 20,
    padding: 10,
  },
  backButton: {
    color: 'gray',
  },
  horizontalScroll: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  familyCard: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: 151,
    height: 151,
  },
  addfamilyCard: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    marginLeft: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    height: 150,
    width: 150,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  familyCardSelected: {
    borderColor: '#007bff',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  avatarSelected: {
    width: 170,
    height: 170,
    borderRadius: 10,
  },
  familyName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },

  familyDetails: {
    fontSize: 14,
    color: '#666',
  },
  selectedIndicator: {
    position: 'absolute',
    bottom: -5,
    width: '100%',
    height: 2,
    backgroundColor: '#007bff',
  },
  serviceList: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ccc',
  },
  serviceItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  serviceItem1: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  serviceItemActive: {
    borderColor: '#007bff',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  serviceNamePur: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
  servicePrice: {
    fontSize: 14,
    color: COLORS.DenimBlue,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#999',
  },
  serviceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  purchasedIndicator: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  purchaseButton: {
    backgroundColor: COLORS.Rhino,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row',
    marginLeft: 40,
    gap: 8,
  },
  purchaseButtonText1: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 75,
  },
  purchaseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background
  },
  searchContainer: {
    width: '50%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
  },
  searchIconContainer: {
    borderRadius: 10,
  },
  searchIcon: {padding: 10},
  headerSearchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  yourFamily: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 20,
    color: '#ccc',
  },
  familyContainer: {
    alignItems: 'center', // Đảm bảo các thành phần được căn giữa theo chiều dọc
    marginRight: 10, // Khoảng cách giữa các card
  },
  familyNameOutside: {
    marginTop: 10, // Khoảng cách từ hình ảnh đến tên
    fontWeight: 'bold',
    color: '#5E5D5D',
  },
  mainContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingHorizontal: 5,
    paddingVertical: 20,
    height: '100%',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: 20,
    width: 415,
    alignSelf: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  button: {
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    gap: 10,
  },
  buttonActive: {
    borderBottomWidth: 4,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  serviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  rightSideService: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '60%',
    gap: 5,
  },
});

export default styles;
