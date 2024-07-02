import React from 'react'
import { View, Text } from 'react-native'
import { iOSGrayColors } from 'src/constants/ios-color'
import { HouseHoldItemDetailInterface } from 'src/interface/household/household_item_detail'
import { COLORS } from 'src/constants'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import ConsumableSkeleton from './consumable-skeleton'


interface ConsumableInfoProps {
    data: HouseHoldItemDetailInterface
}

const ConsumableInfo = ({ data }: ConsumableInfoProps) => {
    const buildDate = (date: string) => {
        const dateObj = new Date(date)
        return `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`
    }
    if (data.id_household_item == -1) {
        return <ConsumableSkeleton data={data} />
    }
    return (
        data.consumableItem ? <>
            <View className='py-3 px-3 '>
                <View className='flex-row justify-between'>
                    <Text className='font-semibold' style={{
                        color: iOSGrayColors.systemGray.accessibleDark,

                    }}>Quantity</Text>
                    <Text className='font-semibold'
                        style={{
                            color: COLORS.Rhino,

                        }}
                    >
                        {
                            data.consumableItem?.quantity ? data.consumableItem?.quantity : 'No quantity'
                        }</Text>
                </View>
            </View>
            <View className='py-3 px-3 '>
                <View className='flex-row justify-between'>
                    <Text className='font-semibold' style={{
                        color: iOSGrayColors.systemGray.accessibleDark,

                    }}>Threshhold</Text>
                    <Text className='font-semibold'
                        style={{
                            color: COLORS.Rhino,

                        }}
                    >{
                            data.consumableItem?.threshold ? data.consumableItem?.threshold : 'No threshold'
                        }</Text>
                </View>
            </View>
            <View className='py-3 px-3 '>
                <View className='flex-row justify-between'>
                    <Text className='font-semibold' style={{
                        color: iOSGrayColors.systemGray.accessibleDark,

                    }}>Expired date</Text>
                    <Text className='font-semibold'
                        style={{
                            color: COLORS.Rhino,

                        }}
                    >{
                            data.consumableItem?.expired_date ? buildDate(data.consumableItem?.expired_date) : 'No expired date'
                        }</Text>
                </View>
            </View>
        </> : <>
            <View className='py-3 px-3 '>
                <View className='justify-center'>
                    <View className=' items-center'>
                        {/* <Image source={QuantityIcon} style={{ width: 24, height: 24 }} /> */}
                        <Material name='plus' size={24} color={iOSGrayColors.systemGray.accessibleDark} />
                    </View>
                    <Text className=' text-center text-base py-5'
                        style={{
                            color: COLORS.Rhino,

                        }}
                    >Add consumable item</Text>
                </View>
            </View>
        </>
    )

}

export default ConsumableInfo