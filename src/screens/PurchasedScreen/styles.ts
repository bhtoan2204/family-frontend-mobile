import {StyleSheet} from 'react-native';
import {ScreenHeight} from 'react-native-elements/dist/helpers';
import {COLORS} from 'src/constants';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  placeholder: {
    width: 30,
  },
  backButton: {
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  familyCard: {
    flexDirection: 'column',
    padding: 15,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  familyAvatarContainer: {
    marginRight: 15,
    alignItems: 'center',
  },
  familyAvatar: {
    width: 80,
    height: 80,
    borderRadius: 10,
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
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '100%',
    marginTop: 10,
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
  flexButton: {
    flex: 1,
  },
  buyServiceButton: {
    backgroundColor: 'lightblue',
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  buyPackageButton: {
    backgroundColor: COLORS.Rhino,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  buyServiceButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 12,
    alignSelf: 'center',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',

    paddingTop: 30,
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  packageName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {},
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
  },
  familyList: {},

  buttonImage: {
    height: 220,
    width: 350,
  },
  imageWrapper: {
    position: 'relative',
  },
  buttonAddFamily: {
    height: 55,
    width: 55,
    position: 'absolute',
    top: 24,
    right: 1,
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
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'column',
  },
  imageButton: {
    gap: 10,
  },
  imageSearch: {
    width: 100,
    height: 100,
  },
  noFamilyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 100,
    gap: 10,
  },
  noFamilyText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  noFamilyTextDescription: {
    fontSize: 16,
  },
  modalBackground1: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer1: {
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    backgroundColor: COLORS.Rhino,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default styles;
