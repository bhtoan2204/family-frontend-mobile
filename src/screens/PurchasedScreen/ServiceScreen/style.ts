import { StyleSheet } from 'react-native';
import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 2,
    width: 160,
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
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 2,
    height: 170,
    width: 120,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  familyCardSelected: {
    borderColor: '#007bff', 
  },
  avatar: {
    width: 100,
    height: 100,
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
});

export default styles;
