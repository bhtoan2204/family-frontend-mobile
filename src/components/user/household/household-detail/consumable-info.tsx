import React from 'react'
import { View, Text, Image } from 'react-native'
import { iOSGrayColors } from 'src/constants/ios-color'
import { HouseHoldItemDetailInterface } from 'src/interface/household/household_item_detail'
import { COLORS } from 'src/constants'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import ConsumableSkeleton from './consumable-skeleton'
import EmptyConsumableIcon from 'src/assets/images/household_assets/edit_consumable_sheet_img.png'
import { ScreenHeight } from '@rneui/base'

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
                    <Text className='font-semibold text-[#959595] dark:text-[#8D94A5]' style={{
                        // color: iOSGrayColors.systemGray.accessibleDark,

                    }}>Quantity</Text>
                    <Text className='font-semibold text-[#2A475E] dark:text-white'
                    >
                        {
                            data.consumableItem?.quantity ? data.consumableItem?.quantity : 'No quantity'
                        }</Text>
                </View>
            </View>
            <View className='py-3 px-3 '>
                <View className='flex-row justify-between'>
                    <Text className='font-semibold text-[#959595] dark:text-[#8D94A5]' >Threshhold</Text>
                    <Text className='font-semibold text-[#2A475E] dark:text-white'>
                        {
                            data.consumableItem?.threshold ? data.consumableItem?.threshold : 'No threshold'
                        }
                    </Text>
                </View>
            </View>
            <View className='py-3 px-3 '>
                <View className='flex-row justify-between'>
                    <Text className='font-semibold text-[#959595] dark:text-[#8D94A5]'>Expired date</Text>
                    <Text className='font-semibold text-[#2A475E] dark:text-white'

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
                        {/* <Material name='plus' size={24} color={iOSGrayColors.systemGray.accessibleDark} /> */}
                        <Image source={EmptyConsumableIcon} style={{ width: ScreenHeight * 0.08, height: ScreenHeight * 0.08 }} />
                    </View>
                    <Text className=' text-center text-base pt-5 pb-2 font-semibold text-[#606060] dark:text-[#8D94A5] '

                    >You forgot somthing?</Text>
                    <Text className=' text-center text-sm pb-5 text-[#606060] dark:text-[#8D94A5]'

                    >Add consumable for this item</Text>
                </View>
            </View>
        </>
    )

}

export default ConsumableInfo