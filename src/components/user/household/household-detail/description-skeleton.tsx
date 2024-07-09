import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { iOSGrayColors } from 'src/constants/ios-color'
import { HouseHoldItemDetailInterface } from 'src/interface/household/household_item_detail'
import { COLORS } from 'src/constants'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { Skeleton } from '@rneui/themed'
import { LinearGradient } from 'expo-linear-gradient'

const screenHeight = Dimensions.get('window').height;

const DescriptionSkeleton = () => {
    return (
        <>
            <View className='px-3 py-3'>
                <Skeleton width={'50%'} height={screenHeight * 0.03} style={{
                    borderRadius: 5
                }} />
            </View>
            <View className='px-3 py-3'>
                <Skeleton width={'80%'} height={screenHeight * 0.03} style={{
                    borderRadius: 5
                }} />
            </View>
        </>
    )
}

export default DescriptionSkeleton