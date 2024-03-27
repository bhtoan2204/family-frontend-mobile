import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },

  familyItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },
  familyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  familyQuantity: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  familyDescription: {
    fontSize: 14,
    color: '#666666',
  },
});

export default styles;
