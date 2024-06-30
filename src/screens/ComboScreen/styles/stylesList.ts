import {ImageBackground, StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const stylesChat = StyleSheet.create({
    background: {
        alignSelf: 'center',
        height: 607,
        width: 373,
        bottom: 2800,
    },
    redGradient: {
        height: 130,
        width: 100,
        position: 'absolute',
        bottom: 3380,
        left: 40,
        zIndex: 8,
    },
    checkList: {
        height: 242,
        width: 197,
        position: 'absolute',
        bottom: 3070,
        right: 30,
        zIndex: 9,
    },
    speechBubble: {
        height: 50,
        width: 55,
        position: 'absolute',
        bottom: 3260,
        left: 40,
        zIndex: 9,
    },
    character: {
        height: 494,
        width: 178,
        position: 'absolute',
        bottom: 2750,
        left: 50,
        zIndex: 9,
    },
    bulb: {
        height: 94,
        width: 81,
        position: 'absolute',
        bottom: 2930,
        right: 100,
        zIndex: 9,
    },
    bottomBack: {
        width: 470,
        height: 114,
        position: 'absolute',
        bottom: 2720,
        zIndex: 9,
    },
    bottomFront: {
        width: 470,
        height: 114,
        position: 'absolute',
        bottom: 2700,
        zIndex: 9,
    },
    title: {
        fontSize: 29,
        color: "#1E3648",
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 25,
        bottom: 180,
        position: 'absolute',
    },
    detail: {
        fontSize: 16,
        color: "#1E3648",
        alignSelf: 'center',
        textAlign: 'center',
        width: '70%',
        lineHeight: 28,
        bottom: 95,
        position: 'absolute',
    },

});

export default stylesChat;
