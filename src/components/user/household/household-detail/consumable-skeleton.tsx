import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { iOSGrayColors } from 'src/constants/ios-color'
import { HouseHoldItemDetailInterface } from 'src/interface/household/household_item_detail'
import { COLORS } from 'src/constants'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { Skeleton } from '@rneui/themed'
import { LinearGradient } from 'expo-linear-gradient'

interface ConsumableInfoProps {
    data: HouseHoldItemDetailInterface
}
const screenHeight = Dimensions.get('window').height;

const ConsumableSkeleton = ({ data }: ConsumableInfoProps) => {
    const buildDate = (date: string) => {
        const dateObj = new Date(date)
        return `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`
    }
    return (
        <>
            <View className='py-3 px-3 '>
                <View className='flex-row justify-between'>
                    <Skeleton width={'100%'} height={screenHeight * 0.03} style={{
                        borderRadius: 5
                    }} />
                </View>
            </View>
            <View className='py-3 px-3 '>
                <View className='flex-row justify-between'>
                    <Skeleton width={'100%'} height={screenHeight * 0.03} style={{
                        borderRadius: 5
                    }} />
                </View>
            </View>
            <View className='py-3 px-3 '>
                <View className='flex-row justify-between'>
                    <Skeleton width={'100%'} height={screenHeight * 0.03} style={{
                        borderRadius: 5
                    }} />
                </View>
            </View>
        </>
    )

}

export default ConsumableSkeleton