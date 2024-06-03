import { StyleSheet } from 'react-native';
import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
      backgroundColor: '#fff',
    },
    scrollContainer: {
      paddingBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      marginBottom: 10,
    },
    time: {
      fontSize: 16,
      marginBottom: 10,
    },
    location: {
      fontSize: 16,
      marginBottom: 10,
    },
    editButton: {
      backgroundColor: 'blue',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
    },
    textDelete: {
        color: 'red',
        fontSize: 17,
    },
    headerText: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
    
    },
    headerp: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: 'white', 
        padding: 10, 
        borderRadius: 5,
      },
    containerBtnDelete: {
        flex: 1,
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        paddingBottom: 30, 
        
    },
});
export default styles;
