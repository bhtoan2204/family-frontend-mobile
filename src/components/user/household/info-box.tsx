import React from 'react'
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native'
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color'
interface InfoBoxProps {
    title: string,
    iconImage: ImageSourcePropType,
    children: React.ReactNode
}

const InfoBox = ({ title, iconImage, children }: InfoBoxProps) => {
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
                <View className='my-3'>
                    {children}

                </View>

            </View>

        </View>
    )
}

export default InfoBox