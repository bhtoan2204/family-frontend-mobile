import React from 'react'
import { View, Text, Image } from 'react-native'
import { iOSGrayColors } from 'src/constants/ios-color'
import { HouseHoldItemDetailInterface } from 'src/interface/household/household_item_detail'
import { COLORS } from 'src/constants'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import DescriptionSkeleton from './description-skeleton'
import EmptyDescriptionIcon from 'src/assets/images/household_assets/empty_description_icon.png'
import { ScreenHeight } from 'react-native-elements/dist/helpers'

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
                            {/* <Material name='plus' size={24} color={iOSGrayColors.systemGray.accessibleDark} /> */}
                            <Image source={EmptyDescriptionIcon} style={{ width: ScreenHeight * 0.08, height: ScreenHeight * 0.08 }} />
                        </View>
                        <Text className=' text-center text-base pt-5 pb-2 font-semibold '
                            style={{
                                color: COLORS.Rhino,

                            }}
                        >Nothing to note?</Text>
                        <Text className=' text-center text-sm pb-5'
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