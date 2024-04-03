import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    height: 35
  },
  descriptionInput: {
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonCard: {
    flex: 1,
    marginHorizontal: 2,
  },
  buttonCardActions: {
    marginHorizontal: 2,
  },
  button: {
    flex: 1,
  },
  dateTimePickerContainer: {
    marginTop: 10,
  },
});

export default styles;
