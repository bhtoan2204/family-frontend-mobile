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
    padding: 5,
    marginLeft:10,
    marginTop:20,
  },
  backButton: {
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  familyCard: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  familyAvatarContainer: {
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  familyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  defaultAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#CCCCCC',
  },
  familyInfo: {
    flex: 1,
  },
  familyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  familyDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  familyQuantity: {
    fontSize: 14,
    color: '#666666',
  },
  expiredAtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  expiredAtText: {
    color: '#3B5998',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  buttonContainerFamily: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-end'
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  renewButton: {
    backgroundColor: '#3B5998',
  },
  renewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buyServiceButton: {
    backgroundColor: 'lightblue',

    alignSelf: 'flex-end',


  },
  buyServiceButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10, 
    color: 'black', 
    alignContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    justifyContent: 'center',
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
 
  familyListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
    color: '#ccc'
  },
  familyList: {
  },
 
  buttonImage: {
    height: 260, 
    width: 370,
  },
  buttonAddFamily: {
    height: 30, 
    width: 150,
    alignSelf: 'flex-end', 
    marginTop: 10,
  },
  settingsIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  settingsIcon: {
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalOptionText: {
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default styles;
