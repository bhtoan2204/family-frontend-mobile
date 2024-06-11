import React from 'react'
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native'
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color'
interface InfoBoxProps {
    title: string,
    iconImage: ImageSourcePropType,
    children: React.ReactNode
    onPress?: () => void
}

const InfoBox = ({ title, iconImage, children, onPress }: InfoBoxProps) => {
    return (
        <TouchableOpacity className='px-3 mt-3 shadow-lg overflow-hidden rounded-lg ' activeOpacity={0.5} disabled={onPress === undefined} style={{ width: '100%', height: 'auto' }} onPress={() => {
            onPress && onPress()
        }} >
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
                <View className='my-3'>
                    {children}

                </View>

            </View>

        </TouchableOpacity>
    )
}

export default InfoBox