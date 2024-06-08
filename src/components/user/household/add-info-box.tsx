import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, ImageSourcePropType } from 'react-native'
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color'
import InfoIcon from 'src/assets/images/household_assets/info.png'
import BoxImage from 'src/assets/images/household_assets/box.png'

interface AddInfoBoxProps {
    title: string,
    iconImage: ImageSourcePropType,
    boxImage: ImageSourcePropType,
    description: string,
    button1Text: string,
    button2Text: string,
    button1Callback: () => void,
    button2Callback: () => void,
}
const screenWidth = Dimensions.get('screen').width


const AddInfoBox = ({
    title,
    iconImage,
    boxImage,
    description,
    button1Text,
    button2Text,
    button1Callback,
    button2Callback
}: AddInfoBoxProps) => {
    return (
        <View className='px-3 mt-3 shadow-lg overflow-hidden rounded-lg ' style={{ width: '100%', height: 'auto' }} >
            <View className='w-full h-auto bg-white p-3 rounded-lg'>
                <View className='flex-row items-center'>
                    <Image source={iconImage} style={{ width: 20, height: 20 }} />
                    <Text style={{
                        fontSize: 15,
                        marginLeft: 5,
                        fontWeight: 500,
                        color: iOSGrayColors.systemGray6.defaultDark

                    }}>{title}</Text>
                </View>
                <View className='flex-row items-start my-3'>
                    <Image source={boxImage} style={{ width: screenWidth * 0.2, height: screenWidth * 0.2 }} />
                    <View className='ml-3 flex-1 wrap' >
                        <Text style={{
                            fontSize: 15,
                            marginLeft: 7,
                            fontWeight: 400,
                            color: iOSGrayColors.systemGray6.defaultDark

                        }}>{description}</Text>
                    </View>
                </View>
                <View className='gap-3 flex-row '>
                    <TouchableOpacity className='flex-1 bg-blue-100 py-3 items-center justify-center' style={{
                        backgroundColor: iOSGrayColors.systemGray6.defaultLight
                    }}>
                        <Text style={{
                            color: iOSColors.systemBlue.defaultLight,
                            fontWeight: 'bold'
                        }}>{button1Text}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='flex-1 bg-blue-100 py-3 items-center justify-center' style={{
                        backgroundColor: iOSColors.systemGreen.defaultLight
                    }} activeOpacity={0.8} onPress={() => {
                        // addProductInfoSheetRef.current?.open()
                        button2Callback()
                    }}>
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold'
                        }}>{button2Text}</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default AddInfoBox