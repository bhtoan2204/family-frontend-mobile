import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#F9FAFB',
  },
  headerContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    height: '7%',
    marginHorizontal: 15,
  },
  headerText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  backButton: {
    marginBottom: 10,
    marginTop: 10,
    color: 'white',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
    color: 'white',
  },
  welcomeTextDetail: {
    fontSize: 15,
    color: 'white',
  },
  textContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
    bottom: 5,
    marginBottom: 40,
    gap: 10,
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButton: {
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  assetList: {
    paddingTop: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 10,
    color: '#111827',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  assetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  assetImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 16,
  },
  assetInfo: {
    flex: 1,
  },
  assetName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  assetDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  assetValue: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  assetDate: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
export default styles;
