import { StyleSheet } from 'react-native';
import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    shadowOffset: { width: 0, height: 2 }, 
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
    shadowOffset: { width: 0, height: 2 }, 
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
    color: '#ccc'
  },
  serviceItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  serviceItemActive: {
    borderColor: '#007bff', 
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  serviceNamePur: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray'
  },
  servicePrice: {
    fontSize: 14,
    color: COLORS.DenimBlue,
    marginTop: 5,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#999',
  },
  serviceActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  purchasedIndicator: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  purchaseButton: {
    backgroundColor: COLORS.DarkCharcoal, 
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row',
  },
  purchaseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 10,
  },
  headerSearchInput: {
    flex: 1, 
  },
  yourFamily: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 20,
    color: COLORS.Rhino,
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
});

export default styles;
