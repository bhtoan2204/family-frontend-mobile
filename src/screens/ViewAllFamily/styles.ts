import {StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#05141c',
    padding: 10,
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editDeleteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  inputWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#332E59',
    borderRadius: 15,
    paddingHorizontal: 15,
    width: '65%',
  },
  input: {
    flex: 1,
    height: 40,
  },
  inputIcon: {
    marginLeft: 5,
  },
  addButton: {
    backgroundColor: '#4884D3',
    borderRadius: 20,
    padding: 10,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  familyCard: {
    padding: 1,
    paddingHorizontal: 0,
  },
  card: {
    backgroundColor: '#332E59',
    paddingTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cardBody: {
    marginBottom: 10,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 16,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  viewButton: {
    backgroundColor: '#4884D3',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconWrapper: {
    marginLeft: 10,
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
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
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  buttonPos: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
  },
  button: {
    width: 100, // Đảm bảo không xếp chồng
    height: 30,
    backgroundColor: COLORS.primary, // Màu primary
    borderRadius: 20, // Hình tròn
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontWeight: '500', // Độ đậm của văn bản
    //color: '#6C6D71',
    color: '#fff', // Màu trắng
    textAlign: 'center', // Canh giữa văn bản
  },
  image: {
    padding: 10,
    marginLeft: 20,
    marginTop: 20,
  },
  color: {
    width: 40,
    height: 40,
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
  description: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: 120,
  },
  ColorAndDescription: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default styles;
