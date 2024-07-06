import {ImageBackground, StyleSheet} from 'react-native';
import {COLORS} from 'src/constants';

const stylesChat = StyleSheet.create({
    background: {
        alignSelf: 'center',
        height: 607,
        width: 373,
        bottom: 850,
        position: 'absolute',   
        zIndex: 1,
    },
    character: {
        height: 348,
        width: 394,
        position: 'absolute',
        bottom: 980,
        zIndex: 2,
        alignSelf: 'center',
    },
    imageLeftSide: {
        height: 143,
    width: 62,
    zIndex: 6,
    left: 0,
        bottom: 800,
    position: 'absolute',
    },
    bottomBack: {
        width: 487,
        height: 119,
        position: 'absolute',
        bottom: 690,
        zIndex: 9,
    },
    bottomFront: {
        width: 487,
        height: 119,
        position: 'absolute',
        bottom: 675,
        zIndex: 9,
    },
    oval: {
        width: 103,
        height: 132,
        position: 'absolute',
        bottom: 620,
        zIndex: 13,
        left: 70,
    },
    upSideDown: { 
        width: 487,
        height: 112,
        position: 'absolute',
        bottom: 510,
        zIndex: 12,
    },
    rec38: {
        height: 103,
        width: '100%',
        position: 'absolute',
        bottom: 610,
    },
});

export default stylesChat;
