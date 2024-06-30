import {ImageBackground, StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const stylesChat = StyleSheet.create({
    background: {
        alignSelf: 'center',
        height: 575,
        width: 392,
        bottom: 2000,
        position: 'absolute',
    },
    elements: {
        height: 406,
        width: 360,
        position: 'absolute',
        bottom: 2100,
        zIndex: 8,
    },
    character: {
        height: 203,
        width: 324,
        position: 'absolute',
        bottom: 1880,
        left: 50,
        zIndex: 9,
    },
    bottomBack: {
        width: 430,
        height: 119,
        position: 'absolute',
        bottom: 1890,
        zIndex: 9,
    },
    bottomFront: {
        width: 420,
        height: 119,
        position: 'absolute',
        bottom: 1875,
        zIndex: 9,
    },
    backgroundBottom: {
        alignSelf: 'center',
        height: 190,
        width: 370,
        bottom: 1660,
        position: 'absolute',
    },
    title: {
        fontSize: 29,
        color: COLORS.white,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 25,
        bottom: 180,
        position: 'absolute',
    },
    detail: {
        fontSize: 16,
        color: COLORS.white,
        alignSelf: 'center',
        textAlign: 'center',
        width: '70%',
        lineHeight: 28,
        bottom: 95,
        position: 'absolute',
    },
    rec: {
        height: 332,
        width: '100%',
        position: 'absolute',
        bottom: 1550,
        alignSelf: 'center',
    },
    rec39: {
        height: 933,
        width: '100%',
        position: 'absolute',
        bottom: 610,
    },
    imageConnect: {
        height: 224,
        width: 487,
        position: 'absolute',
        bottom: 1440,
        zIndex: 10,
      },
});

export default stylesChat;
