import { StyleSheet } from "react-native";
import { COLORS } from "src/constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
    headerTitle: {
        fontWeight: 'bold',
    },
    headerfile: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 0,
      },
      backButton: {
        color: COLORS.black,
        padding: 10,
      },
    input: {
        width: '60%',
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray', 
        borderRadius: 5,
    },
    button: {
        backgroundColor: 'lightgray', 
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        width: '20%', 
        alignItems: 'center',
        fontWeight : 'bold',
    },
    containerBtn:{
        flexDirection: 'row',
        padding: 10,

    }
});

export default styles;