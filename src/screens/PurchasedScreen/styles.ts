import { StyleSheet } from 'react-native';
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
  safeArea: {
    marginTop: 20,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    
  },
  backButton: {
    marginLeft: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    justifyContent: 'space-between',
    
  },
  button: {
    flex: 1,
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
  },
  
  serviceButton: {
    backgroundColor: '#AEC6CF',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  packageName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
  },
  infoText: {
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#007BFF', 
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 5,
  },
  actionText: {
    color: '#fff',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  container: {
    padding: 16,
  },
  familyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor:'white'
  },
  familyAvatar: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 16,
  },
  defaultAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
    backgroundColor: '#ccc',
  },
  familyInfo: {
    flex: 1,
  },
  familyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  familyDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  familyQuantity: {
    fontSize: 14,
    color: '#777',
  },
  familyListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
  },
  familyList: {
  },
  renewButton: {
    backgroundColor: '#3F51B5', 
    paddingHorizontal: 16, 
    paddingVertical: 8,
    borderRadius: 10, 
    marginTop: 10, 
    alignSelf: 'flex-end', 
  },
  renewButtonText: {
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 14, 
  },
  buttonImage: {
    height: 240, 
    width: 370,
  },
  buttonAddFamily: {
    height: 30, 
    width: 150,
    alignSelf: 'flex-end', 
    marginTop: 10,
  }
});

export default styles;
