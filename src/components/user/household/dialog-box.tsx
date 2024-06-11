import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, ImageSourcePropType } from 'react-native'
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color'
import * as Animatable from 'react-native-animatable';

interface DialogBoxProps {
    children?: React.ReactNode
    className?: string
}

const DialogBox = ({ children, className }: DialogBoxProps) => {
    const ref = React.useRef<any>(null);
    React.useEffect(() => {
        return () => {
            ref.current?.fadeOut()
        }
    }, []);
    return (
        <Animatable.View ref={ref} animation={"fadeIn"} className={className}>
            {/* <TouchableOpacity className='flex-1 bg-blue-100 py-3 items-center justify-center' style={{
                backgroundColor: iOSGrayColors.systemGray6.defaultLight
            }} onPress={() => {

            }}>
                <Text style={{
                    color: iOSColors.systemRed.defaultLight,
                    fontWeight: 'bold'
                }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity className='flex-1 bg-blue-100 py-3 items-center justify-center' style={{
                backgroundColor: iOSGrayColors.systemGray6.defaultLight
            }} activeOpacity={0.8} onPress={() => {

            }}>
                <Text style={{
                    color: iOSColors.systemBlue.defaultLight,
                    fontWeight: 'bold'
                }}>Save</Text>
            </TouchableOpacity> */}
            {children}
        </Animatable.View>
    )
}

export default DialogBox