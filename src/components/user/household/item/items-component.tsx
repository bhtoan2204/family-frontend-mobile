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
import { setHouseholdItems, setLoading, setTotalItem, addHouseholdItems } from 'src/redux/slices/HouseHoldDataSlice'
import { getTranslate } from 'src/redux/slices/languageSlice'
interface ItemComponentProps {
    items: HouseHoldItemInterface[]
    handleNavigateItemDetail: (id_item: number) => void
    addItemSheetRef: React.RefObject<BottomSheet>
    addRoomSheetRef: React.RefObject<BottomSheet>
    id_family: number
}

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};

const ItemComponent = ({
    items, handleNavigateItemDetail, addItemSheetRef, id_family
}: ItemComponentProps) => {
    const loading = useSelector((state: RootState) => state.household).loading
    const isDarkMode = useSelector(getIsDarkMode)

    const dispatch = useDispatch<AppDispatch>()
    const translate = useSelector(getTranslate)

    const [page, setPage] = React.useState(2)
    const [hasMore, setHasMore] = React.useState(false);
    const [isLoadingMore, setIsLoadingMore] = React.useState(false);

    const refetchData = React.useCallback(async () => {
        console.log("calling refetch")
        const fetchData = async () => {
            const itemData = await HouseHoldService.getHouseHoldItems(id_family!, 1, 12)
            if (itemData.data.length < 12) {
                setHasMore(false)
            } else {
                setHasMore(true)
                setPage(prev => prev + 1)
            }
            dispatch(setHouseholdItems(itemData.data))
            dispatch(setTotalItem(itemData.total))
        }
        dispatch(setLoading(true))
        await fetchData()
        dispatch(setLoading(false))
    }, [])

    const fetchMoreData = React.useCallback(async () => {
        if (!isLoadingMore && hasMore) {
            console.log("calling fetchMoreData")
            const fetchRooms = async () => {
                const itemData = await HouseHoldService.getHouseHoldItems(id_family!, page, 12)
                if (itemData.data.length < 12) {
                    setHasMore(false)
                } else {
                    setHasMore(true)
                }
                dispatch(addHouseholdItems(itemData.data))
                dispatch(setTotalItem(itemData.total))
            }

            await fetchRooms()
        }
    }, [id_family, page])

    const handleReachBottom = async () => {
        setIsLoadingMore(true)
        await fetchMoreData()
        setIsLoadingMore(false)
        setPage(page + 1)
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refetchData} />
            }
            className='flex-1 bg-[#F7F7F7] dark:bg-[#0A1220]'
            showsVerticalScrollIndicator={false}
            onScroll={async ({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                    console.log('end')
                    // await handleReachBottom()
                }
            }}
            scrollEventThrottle={700}
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