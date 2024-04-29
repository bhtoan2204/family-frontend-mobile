import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

const styles = StyleSheet.create({
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
        elevation: 5,
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      },
      button: { 
        color: COLORS.AliceBlue,
        width: '100%', 
        borderRadius: 20 
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      closeButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
      },
      closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      textError:{
        color: 'red' ,
      }
    });
    
export default styles;