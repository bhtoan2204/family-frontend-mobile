import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { COLORS } from 'src/constants';
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', 
    },
    familyItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    header: {
        backgroundColor: 'rgba(128, 50, 128, 0.5)', 
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        height: '8%',
      },
      headerText: {
        flexDirection: 'column',
        fontSize: 20,
        color: '#ffffff', 
        fontWeight: 'bold',
        marginLeft: 0
      },
      circle: {
        width: 140, 
        height: 40, 
        borderRadius: 15, 
        backgroundColor: '#66C0F4', 
        justifyContent: 'center', 
        alignItems: 'center',
      },
      itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    
      },
      headerButton: {
        alignItems: 'center',
        justifyContent: 'center', 
        alignContent: 'center',
    },
   
    
      backButton: {
        color: 'white',
        right: screenWidth*0.25,
        marginRight: 'auto',
    
      },
});
export default styles;