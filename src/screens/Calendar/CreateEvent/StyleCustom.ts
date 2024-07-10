import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    customModalContainer: {
      width: '90%',
      height: '90%',
      padding: 20,
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    container1: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        zIndex: 2000,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: 20,
      marginLeft: 15,
    },
    label: {
      fontSize: 16,
      color: 'gray',
      marginRight: screenWidth*0.05,
    },
    dropDownContainer: {
      width: 150,
    },
    dropDown: {
      borderColor: 'white',
    },
    dropDownPicker: {
      borderColor: '#ccc',
      zIndex: 1000,
    },
    pickerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: screenHeight*0.05,
        borderTopWidth: 1, 
        borderColor: '#ccc',
        marginLeft:10,
    },
    picker: {
      flex: 1,
      height: 150,
    },
    unitLabel: {
      fontSize: 24,
      color: 'gray',
      marginLeft: 10,
      marginTop: 60,
    },
    weeklyContainer: {
      height: '45%',
      width: '105%',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: COLORS.white,
      marginTop: 20,
    },
    weeklyDay: {
      fontSize: 16,
      color: 'black',
      marginLeft: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginTop: 20,

    },
    weeklyDayText: {
        marginBottom: 10,
    },
    monthlyContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      //justifyContent: 'space-between',
      width: '105%',
      height: '40%',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      marginTop: 20,
      backgroundColor: COLORS.white,
    },
    monthlyDay: {
      fontSize: 16,
      color: 'black',
      marginRight: screenWidth*0.02,
      marginTop: screenWidth*0.025,
      marginBottom: screenWidth*0.025,
      marginLeft:  screenWidth*0.02,

    },
    yearlyContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '105%',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 20,
      marginTop: 20,
      backgroundColor: COLORS.white,
    },

      yearlyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '30%', 
        marginBottom: screenHeight*0.015,

        marginTop: screenHeight *0.015,
      },
      yearlyMonth: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        paddingVertical: 5,
        lineHeight: 50,
        height: 50,
        width: 50,
        borderRadius: 100,
        borderColor: '#ccc',
        marginRight: screenWidth*0.05,
        marginLeft: screenWidth*0.04,
      },
      selectedMonth: {
        backgroundColor: 'lightblue',
      },
      yearlyMonthText: {
        alignItems: 'center',
        justifyContent:'center',
        marginLeft: screenWidth*0.03,
        marginTop: screenHeight*0.01,
      },
    modalButtonContainer: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
      width: '100%',
      flexDirection: 'row',
    },
    modalCancelButton: {
      color: 'red',
      fontSize: 16,
      marginRight: 100,
    },
    modalSubmitButton: {
      color: 'green',
      fontSize: 16,
    },
    selectedDay: {
      backgroundColor: 'lightblue',
      borderRadius: 100,
      paddingHorizontal: 5,
    },

    checkIcon: {
        marginRight: 10,
      },
    checkContainer: {
        flexDirection: 'row',
        justifyContent:'space-between'
    },
  });
  export default styles;