import { StyleSheet } from 'react-native';
import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    marginTop: 16, 
  },
  subtitle: {
    fontSize: 12,
    color: '#555',
    marginBottom: 16,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  feedbackInput: {
    width: '100%',
    minHeight: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 31,
    marginTop: 16,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: COLORS.Rhino,
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 1,
  },
});

export default styles;
