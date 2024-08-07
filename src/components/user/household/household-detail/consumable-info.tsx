import React from 'react'
import { View, Text, Image, TextInput } from 'react-native'
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color'
import { HouseHoldItemDetailInterface } from 'src/interface/household/household_item_detail'
import { COLORS } from 'src/constants'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import ConsumableSkeleton from './consumable-skeleton'
import EmptyConsumableIcon from 'src/assets/images/household_assets/edit_consumable_sheet_img.png'
import { ScreenHeight } from '@rneui/base'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuOptionsCustomStyle,

} from 'react-native-popup-menu';
import { useSelector } from 'react-redux'
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice'

interface ConsumableInfoProps {
    data: HouseHoldItemDetailInterface
}
const Divider = () => {
    return (
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#7F8487', opacity: 0.3 }} />
    )
}
const ConsumableInfo = ({ data }: ConsumableInfoProps) => {
    const [value, setValue] = React.useState<string>('')
    const [remindValue, setRemindValue] = React.useState<string>('days')
    const buildDate = React.useCallback((date: string) => {
        const dateObj = new Date(date)
        // console.log(dateObj)
        // const text = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`
        // console.log(text)
        return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`
    }, [])
    // const buildDate = (date: string) => {
    //     const dateObj = new Date(date)
    //     return `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`
    // }
    const isDarkMode = useSelector(getIsDarkMode)
    if (data.id_household_item == -1) {
        return <ConsumableSkeleton data={data} />
    }
    const handleChangeRemindValue = React.useCallback(async (value: string) => {
        setRemindValue(value)
    }, [])
    const handleChangeText = React.useCallback((value: string) => {
        // setValue(value)
        if (!value || value.trim() === '') {
            return '0';
        }
        // Xóa các số 0 ở đầu chuỗi, nếu tất cả đều là số 0 thì trả về "0"
        const processedValue = value.replace(/^0+/, '');
        return processedValue === '' ? '0' : processedValue;
    }, [])

    const buildRemindDate = React.useCallback(() => {
        if (remindValue == 'days') {
            if (value.length > 1) {
                return "Days"
            } else {
                return "Day"
            }
        }
        if (remindValue == 'months') {
            if (value.length > 1) {
                return "Months"
            } else {
                return "Month"
            }
        }
        if (remindValue == 'years') {
            if (value.length > 1) {
                return "Years"
            } else {
                return "Year"
            }
        }
    }, [remindValue, value])

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
            <View className='py-3 px-3 '>
                <View className='flex-row justify-between'>
                    <Text className='font-semibold text-[#959595] dark:text-[#8D94A5]'>Remind in</Text>
                    <View className='flex-row items-center'>
                        <TextInput
                            value={value}
                            className=' text-end placeholder-[#2A475E] dark:placeholder-white font-semibold text-[#2A475E] dark:text-white px-2 '
                            keyboardType='numeric'
                            onChangeText={(e) => {
                                setValue(handleChangeText(e))
                            }}
                            placeholder={'0'}

                        />
                        <View className=' pl-1'>
                            <Text className='font-semibold text-[#2A475E] dark:text-white'>
                                {
                                    buildRemindDate()
                                }
                            </Text>
                        </View>
                        <View>
                            <Menu >
                                <MenuTrigger>
                                    <View className=''>
                                        <Material name="chevron-down" size={29} color={
                                            isDarkMode ? iOSGrayColors.systemGray.accessibleDark : iOSGrayColors.systemGray.defaultLight
                                        } />
                                    </View>
                                </MenuTrigger>
                                <MenuOptions customStyles={{
                                    optionsContainer: {
                                        width: ScreenHeight * 0.2,
                                        borderRadius: 10,
                                        marginTop: ScreenHeight * 0.04,
                                        backgroundColor: isDarkMode ? '#252D3B' : 'white',
                                        // opacity: 0.9,
                                    },
                                    optionWrapper: {
                                        padding: 10,
                                    },
                                }} >

                                    <MenuOption onSelect={async () => {
                                        // setIsEditing(true)
                                        await handleChangeRemindValue('days')
                                    }} >
                                        <View className='flex-row items-center justify-between'>
                                            <Text className='text-base text-[#606060] dark:text-[#A6A6A6] ' >Day(s)</Text>
                                            {
                                                remindValue == 'days' ? <Material name="check" size={21} style={{ color: iOSGrayColors.systemGray.defaultLight }} /> : <></>
                                            }
                                        </View>
                                    </MenuOption>

                                    <Divider />
                                    <MenuOption onSelect={async () => {
                                        await handleChangeRemindValue('months')
                                    }} >

                                        <View className='flex-row items-center justify-between'>
                                            <Text className='text-base text-[#606060] dark:text-[#A6A6A6] ' >Month(s)</Text>
                                            {
                                                remindValue == 'months' ? <Material name="check" size={21} style={{ color: iOSGrayColors.systemGray.defaultLight }} /> : <></>
                                            }
                                        </View>
                                    </MenuOption>
                                    <Divider />
                                    <MenuOption onSelect={async () => {
                                        await handleChangeRemindValue('years')
                                    }} >

                                        <View className='flex-row items-center justify-between'>
                                            <Text className='text-base text-[#606060] dark:text-[#A6A6A6] ' >Years(s)</Text>
                                            {
                                                remindValue == 'years' ? <Material name="check" size={21} style={{ color: iOSGrayColors.systemGray.defaultLight }} /> : <></>
                                            }
                                        </View>
                                    </MenuOption>
                                    <Divider />
                                </MenuOptions>
                            </Menu>
                        </View>
                    </View>
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