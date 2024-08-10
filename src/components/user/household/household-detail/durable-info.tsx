import React from 'react'
import { View, Text, Image, TextInput, Keyboard } from 'react-native'
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
import HouseHoldService from 'src/services/apiclient/HouseHoldService'
import { useToast } from 'react-native-toast-notifications'
const durableDat = [
    'new',
    'good',
    'fair',
    'poor',
    'refurbished',
    'worn'
]


interface ConsumableInfoProps {
    data: HouseHoldItemDetailInterface,
    id_family: number
}
const Divider = () => {
    return (
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#7F8487', opacity: 0.3 }} />
    )
}
const DurableInfo = ({ data, id_family }: ConsumableInfoProps) => {
    const [condition, setCondition] = React.useState<string>(data.durableItem?.condition || 'good')
    const [durableData, setDurableData] = React.useState(durableDat)
    const isDarkMode = useSelector(getIsDarkMode)
    const toast = useToast()
    const handleChangeRemindValue = React.useCallback(async (value: string) => {
        console.log(data.id_household_item, id_family, value)
        const res = await HouseHoldService.updateDurableItem(data.id_household_item, id_family, value)
        if (res) {
            toast.show('Update condition successfully', {
                type: 'success',
                icon: <Material name='check' size={24} color={'white'} />
            })
            setCondition(value)
        } else {
            toast.show('Update condition failed', {
                type: 'error',
                icon: <Material name='close' size={24} color={'white'} />
            })
        }


    }, [data.id_household_item, id_family])

    // const handleChangeText = React.useCallback((value: string) => {
    //     // setValue(value)
    //     if (!value || value.trim() === '') {
    //         return '0';
    //     }
    //     // Xóa các số 0 ở đầu chuỗi, nếu tất cả đều là số 0 thì trả về "0"
    //     const processedValue = value.replace(/^0+/, '');
    //     return processedValue === '' ? '0' : processedValue;
    // }, [])




    if (data.id_household_item == -1) {
        return <ConsumableSkeleton data={data} />
    }
    return (
        data.durableItem ? <>
            <View className='py-3 px-3 '>
                <View className='flex-row justify-between'>
                    <Text className='font-semibold text-[#959595] dark:text-[#8D94A5]'>Condition</Text>
                    <View className='flex-row items-center'>

                        <View className=' pl-1'>
                            <Text style={{
                                textTransform: 'capitalize'
                            }} className='font-semibold text-[#2A475E] dark:text-white'>
                                {
                                    durableData.find(item => item === condition) || 'good'
                                }
                                {/* Month */}
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
                                    {durableData.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <MenuOption onSelect={async () => {
                                                // setIsEditing(true)
                                                await handleChangeRemindValue(item)
                                            }} >
                                                <View className='flex-row items-center justify-between'>
                                                    <Text className='text-base text-[#606060] dark:text-[#A6A6A6] ' >{item}</Text>
                                                    {
                                                        condition == item ? <Material name="check" size={21} style={{ color: iOSGrayColors.systemGray.defaultLight }} /> : <></>
                                                    }
                                                </View>
                                            </MenuOption>

                                            <Divider />
                                        </React.Fragment>
                                    ))}


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

                    >Add durable for this item</Text>
                </View>
            </View>
        </>
    )

}

export default DurableInfo