import { StyleSheet } from 'react-native';
import { COLORS } from 'src/constants';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    expenseContainer: {
      marginBottom: 20,
      backgroundColor: '#f2dede',
      padding: 15,
      borderRadius: 10,
      flexDirection:'row',
    },
    incomeContainer: {
      marginBottom: 20,
      backgroundColor: '#dff0d8',
      padding: 15,
      borderRadius: 10,
    },
    analysisContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    expenseAnalysis: {
      flex: 1,
      marginRight: 10,
      backgroundColor: '#d9edf7',
      padding: 15,
      borderRadius: 10,
      flexDirection:'row',
    },
    incomeAnalysis: {
      flex: 1,
      marginLeft: 10,
      backgroundColor: '#fcf8e3',
      padding: 15,
      borderRadius: 10,
      flexDirection:'row',

    },
    icon: {
      marginRight:10,  
    },
    progressStep: {
      flex: 1,
      height: 5,
      backgroundColor: COLORS.gray,
      marginHorizontal: 5,
      borderRadius: 10,
    },
    activeStep: {
      backgroundColor: COLORS.primary,
    },
  
  });
export default styles;