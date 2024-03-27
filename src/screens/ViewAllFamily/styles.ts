import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#05141c',
    padding: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  cardBody: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 16,
    color: '#555',
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
});

export default styles;
