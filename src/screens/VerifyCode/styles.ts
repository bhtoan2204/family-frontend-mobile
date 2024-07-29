import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from 'src/constants';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
    width: '80%',
    textAlign: 'center',
  },

});

export default styles;
