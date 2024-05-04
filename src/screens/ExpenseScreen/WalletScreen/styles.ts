import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    headcontainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 3,
        paddingTop: 20,
    },
    header: {
        backgroundColor: 'rgba(128, 50, 128, 0.5)', 
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        height: '8%',
      },
    headerButton: {
        padding: 10,
    },
    backButton: {
        color: 'white',
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 50
    },
    headerText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default styles;
