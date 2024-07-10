import {StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const styles = StyleSheet.create({
    bottomComboImage: {
        height: 337,
        width: 370,
        left: 10,
        bottom: 500,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 35,
        color: COLORS.Rhino,
        bottom: 470,
        textAlign: 'center',
        width: '70%',
        alignSelf: 'center',
        marginBottom: 10,
    },
    description: {
        bottom: 460,
        fontSize: 15,
        textAlign: 'center',
        alignSelf: 'center',
        color: COLORS.Rhino,
        width: '80%',
    },
    comboButton: {
        bottom: 400,
    },
    packageButton: {
        bottom: 380,
        borderWidth: 1.5,
        width: '85%',
        alignSelf: 'center',
        borderRadius: 10,
        borderColor: COLORS.Rhino,
    },
    packageText: {
        textAlign: 'center',
        fontSize: 18,
        color: COLORS.Rhino,
        padding: 15,
        fontWeight: 'bold',
    },
});

export default styles;
