import React from 'react'
import { View, Text } from 'react-native'
import { iOSGrayColors } from 'src/constants/ios-color'
import { HouseHoldItemDetailInterface } from 'src/interface/household/household_item_detail'
import { COLORS } from 'src/constants'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import DescriptionSkeleton from './description-skeleton'


interface DescriptionInfoProps {
    data: HouseHoldItemDetailInterface
}

const DescriptionInfo = ({ data }: DescriptionInfoProps) => {
    if (data.id_household_item == -1) {
        return <DescriptionSkeleton />
    }

    return (
        data.description != null && data.description != ''

            ? <View className='py-3 px-3 '>
                <Text className=' text-base font-semibold '
                    style={{
                        color: COLORS.Rhino,

                    }}>Description</Text>
                <Text className=' text-base font-semibold '
                    style={{
                        color: COLORS.Rhino,
                    }}>{data.description}</Text>
            </View> : <>
                <View className='py-3 px-3 disabled' >
                    <View className='justify-center'>
                        <View className=' items-center'>
                            {/* <Image source={QuantityIcon} style={{ width: 24, height: 24 }} /> */}
                            <Material name='plus' size={24} color={iOSGrayColors.systemGray.accessibleDark} />
                        </View>
                        <Text className=' text-center text-base py-5'
                            style={{
                                color: COLORS.Rhino,

                            }}
                        >Add description for this item</Text>
                    </View>
                </View>

            </>
    )
}

export default DescriptionInfo