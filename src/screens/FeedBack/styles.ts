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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    marginTop: 16, 
  },
  subtitle: {
    fontSize: 18,
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
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: COLORS.BlueLight,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
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
