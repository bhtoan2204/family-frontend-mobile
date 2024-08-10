import React from 'react'
import { View, Text, ScrollView, RefreshControl } from 'react-native'
import { COLORS } from 'src/constants'
import { HouseHoldItemInterface } from 'src/interface/household/household_item'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { iOSGrayColors } from 'src/constants/ios-color'
import ItemItems from './items-item'
import BottomSheet from '@gorhom/bottom-sheet'
import { useDispatch, useSelector } from 'react-redux'
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice'
import HouseHoldService from 'src/services/apiclient/HouseHoldService'
import { AppDispatch, RootState } from 'src/redux/store'
import { setHouseholdItems, setLoading, setTotalItem } from 'src/redux/slices/HouseHoldDataSlice'
import { getTranslate } from 'src/redux/slices/languageSlice'
interface ItemComponentProps {
    items: HouseHoldItemInterface[]
    handleNavigateItemDetail: (id_item: number) => void
    addItemSheetRef: React.RefObject<BottomSheet>
    addRoomSheetRef: React.RefObject<BottomSheet>
    id_family: number
}

const ItemComponent = ({
    items, handleNavigateItemDetail, addItemSheetRef, id_family
}: ItemComponentProps) => {
    const loading = useSelector((state: RootState) => state.household).loading
    const isDarkMode = useSelector(getIsDarkMode)

    const dispatch = useDispatch<AppDispatch>()
    const translate = useSelector(getTranslate)

    const refetchData = React.useCallback(async () => {
        const fetchData = async () => {
            const roomData = await HouseHoldService.getHouseHoldItems(id_family!, 1, 12)
            dispatch(setHouseholdItems(roomData.data))
            dispatch(setTotalItem(roomData.total))
        }
        dispatch(setLoading(true))
        await fetchData()
        dispatch(setLoading(false))
    }, [])

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refetchData} />
            }
            className='flex-1 bg-[#F7F7F7] dark:bg-[#0A1220]'
            showsVerticalScrollIndicator={false}

        >
            <View>
                <View className='py-4 flex-row items-center justify-between border-b-[1.5px] mx-[10%] border-[#DEDCDC] dark:border-[#232A3D]'

                >
                    <Text className='text-lg text-[#2A475E] dark:text-white'
                    >Items</Text>

                    <View className=' p-1 border-[1px] rounded-lg border-[#DEDCDC] dark:border-[#232A3D]'
                    >
                        <Material name='magnify' size={24} color={
                            isDarkMode ? '#909093' : COLORS.Rhino
                        } />
                    </View>
                </View>
                <View className='py-4 flex-row items-center justify-between px-[10%]'

                >
                    <Text className='text-sm text-[#2A475E] dark:text-[#8D94A5]'

                    >{items.length} {
                            translate('item_added_text')
                        }</Text>


                    <Text className='text-sm font-semibold'
                        style={{
                            color: COLORS.Azure,
                        }}
                        onPress={() => {
                            addItemSheetRef.current?.expand()
                            console.log('add item')
                        }}
                    >{
                            translate('add_item_text')
                        }</Text>

                </View>
                <ItemItems data={items} handleNavigateHouseHoldDetail={handleNavigateItemDetail} />
            </View>
        </ScrollView>
    )
}

export default ItemComponent