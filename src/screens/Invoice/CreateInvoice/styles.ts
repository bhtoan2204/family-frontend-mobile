import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {COLORS} from 'src/constants';
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  containerinput: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 20,
  },
  input: {
    borderColor: 'gray',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    left: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 5,
  },
});

export default styles;
