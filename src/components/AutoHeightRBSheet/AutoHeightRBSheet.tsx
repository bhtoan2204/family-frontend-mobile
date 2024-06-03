// This is basically a copy of
// https://github.com/nysamnang/react-native-raw-bottom-sheet
// but using only translate animations instead of height

import React, {
    forwardRef, ReactNode,
    ForwardRefRenderFunction,
    useImperativeHandle,
    useState
} from 'react'
import {
    Animated,
    Modal,
    // eslint-disable-next-line react-native/split-platform-components
    ModalPropsIOS,
    PanResponder,
    StyleSheet,
    TouchableOpacity,
    View, ViewProps, ViewStyle
} from 'react-native'

const styles = StyleSheet.create({
    // eslint-disable-next-line react-native/no-color-literals
    wrapper: {
        flex: 1,
        backgroundColor: '#00000077'
    },
    // eslint-disable-next-line react-native/no-color-literals
    mask: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    // eslint-disable-next-line react-native/no-color-literals
    container: {
        backgroundColor: '#fff',
        width: '100%',
        overflow: 'hidden'
    }
})

const SUPPORTED_ORIENTATIONS: ModalPropsIOS['supportedOrientations'] = [
    'portrait',
    'portrait-upside-down',
    'landscape',
    'landscape-left',
    'landscape-right'
]

interface IAutoHeightRBSheetProps {
    animationType?: 'none' | 'fade' | 'slide'
    height?: number
    minClosingHeight?: number
    duration?: number
    closeOnSwipeDown?: boolean
    closeOnPressMask?: boolean
    onClose?: () => void
    children?: ReactNode
    customStyles?: {
        wrapper?: ViewStyle
        container?: ViewStyle
    }
}

export type AutoHeightRBSheetRef = {
    close: () => void,
    open: () => void
}

export type AutoHeightRBSheet = ForwardRefRenderFunction<
    AutoHeightRBSheetRef,
    IAutoHeightRBSheetProps
>

const AutoHeightRBSheet: AutoHeightRBSheet = (props, ref) => {
    const closeOnPressMask = 'closeOnPressMask' in props
        ? props.closeOnPressMask
        : true
    const duration = props.duration || 200
    const [modalVisible, setModalVisibility] = useState(false)
    const [currentHeight, setCurrentHeight] = useState(props.height || 260)
    const [pan] = useState(new Animated.ValueXY({
        x: 0,
        y: currentHeight
    }))

    const setModalVisible = (visible: boolean) => {
        if (visible) {
            setModalVisibility(true)
            Animated.timing(pan, {
                toValue: { x: 0, y: 0 },
                duration,
                useNativeDriver: false
            }).start()
        } else {
            Animated.timing(pan, {
                toValue: { x: 0, y: currentHeight },
                duration,
                useNativeDriver: false
            }).start(() => {
                setModalVisibility(false)
                if (typeof props.onClose === 'function') {
                    props.onClose()
                }
            })
        }
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => !!props.closeOnSwipeDown,
        onPanResponderMove: (e, gestureState) => {
            if (gestureState.dy > 0) {
                Animated.event([null, { dy: pan.y }])(e, gestureState)
            }
        },
        onPanResponderRelease: (_e, gestureState) => {
            const distanceToClose = currentHeight * 0.4

            if (gestureState.dy > distanceToClose || gestureState.vy > 0.5) {
                setModalVisible(false)
            } else {
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false
                }).start()
            }
        }
    })

    const handleChildrenLayout: ViewProps['onLayout'] = event => {
        setCurrentHeight(event.nativeEvent.layout.height)
    }

    const open = () => {
        setModalVisible(true)
    }

    const close = () => {
        setModalVisible(false)
    }

    useImperativeHandle(ref, () => ({
        close, open
    }))

    const animatedViewStyles = {
        transform: pan.getTranslateTransform()
    }

    return (
        <Modal
            transparent
            animationType={props.animationType || 'none'}
            visible={modalVisible}
            supportedOrientations={SUPPORTED_ORIENTATIONS}
            onRequestClose={() => {
                setModalVisible(false)
            }}>
            <View
                style={[
                    styles.wrapper,
                    (props.customStyles || {}).wrapper
                ]}>
                <TouchableOpacity
                    style={styles.mask}
                    activeOpacity={1}
                    onPress={() => (closeOnPressMask ? close() : {})}
                />
                <View
                    onLayout={handleChildrenLayout}>
                    <Animated.View
                        {...panResponder.panHandlers}
                        style={[
                            styles.container,
                            animatedViewStyles
                        ]}>
                        {props.children || <View />}
                    </Animated.View>
                </View>
            </View>
        </Modal>
    )
}

export default forwardRef(AutoHeightRBSheet)