import React from 'react'
import { View, Text, ScrollView, RefreshControl } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ItemItems from 'src/components/user/household/item/items-item'
import { RoomDetailScreenProps } from 'src/navigation/NavigationTypes'
import { AppDispatch, RootState } from 'src/redux/store'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { iOSGrayColors } from 'src/constants/ios-color'
import { COLORS } from 'src/constants'
import { updateImageProp } from 'src/redux/slices/HouseHoldDetailSlice'
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice'
import HouseHoldService from 'src/services/apiclient/HouseHoldService'
import { setHouseholdItems, setLoading, setRoom, setTotalItem, setTotalRoom } from 'src/redux/slices/HouseHoldDataSlice'
import { getTranslate } from 'src/redux/slices/languageSlice'


const RoomDetailScreen = ({ navigation, route, setAddItemType, setPickedRoom, addItemSheetRef }: RoomDetailScreenProps) => {
    const { id_room, id_family } = route.params
    const householdItems = useSelector((state: RootState) => state.household).items.filter(item => item.id_room == id_room)
const roomInfo = useSelector((state: RootState) => state.household).rooms.find(room => room.id_room == id_room)
    const dispatch = useDispatch<AppDispatch>()
    const loading = useSelector((state: RootState) => state.household).loading
    const translate = useSelector(getTranslate)
    const refetchData = React.useCallback(async () => {
        const fetchData = async () => {
            const roomData = await HouseHoldService.getAllRoom(id_family!, 1, 100)
            dispatch(setRoom(roomData.data))
            dispatch(setTotalRoom(roomData.total))
        }
        const fetchItems = async () => {
            const itemData = await HouseHoldService.getHouseHoldItems(id_family!, 1, 12)
            dispatch(setHouseholdItems(itemData.data))
            dispatch(setTotalItem(itemData.total))
        }
        dispatch(setLoading(true))
        await fetchData()
        await fetchItems()
        dispatch(setLoading(false))
    }, [])

    React.useEffect(() => {
        setPickedRoom(id_room!)
        return () => {
            setPickedRoom(-1)
        }
    })



    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refetchData} />
            }
            className='flex-1 bg-[#F7F7F7] dark:bg-[#0A1220]'
            showsVerticalScrollIndicator={false}

        >
            <View>
                <View className='py-4 flex-row items-center justify-between border-b-[1.5px] mx-[10%] bg-[#f7f7f7] dark:bg-[#0A1220]'
                    style={{
                        borderColor: iOSGrayColors.systemGray4.defaultLight,
                    }}
                >
                    <Text className='text-lg text-[#2A475E] dark:text-white'

                    >
                        {roomInfo?.room_name}
                    </Text>

                    <View className=' p-1 border-[1px] rounded-lg'
                        style={{
                            borderColor: iOSGrayColors.systemGray4.defaultLight,
                        }}
                    >
                        <Material name='magnify' size={24} color={iOSGrayColors.systemGray.defaultLight} />
                    </View>
                </View>
                <View className='py-4 flex-row items-center justify-between px-[10%]'

                >
                    <Text className='text-sm text-[#434343] dark:text-[#8D94A5]'

                    >{householdItems.length} {
                            translate('item_added_text')
                        }</Text>


                    <Text className='text-sm font-semibold'
                        style={{
                            color: COLORS.Azure,
                        }}
                        onPress={() => {
                            // console.log('add item')
                            addItemSheetRef!.current?.expand()
                        }}
                    >{
                            translate('add_item_text')
                        }</Text>

                </View>
                <ItemItems data={householdItems}
                    handleNavigateHouseHoldDetail={(id: number) => {
                        // const index = householdItems.findIndex(item => item.id_household_item === id)!
                        // if (index != -1) {
                        //     if (data[index])
                        // }
                        // console.log(img, id)
                        // dispatch(updateImageProp(
                        //     householdItems.find(item => item.id_household_item === id)!.item_image!
                        // ))
                        navigation.navigate('HouseHoldItemStack', {
                            screen: 'HouseHoldItem',
                            params: {
                                id_family: id_family,
                                id_item: id
                            },
                        });
                        console.log('navigate to item detail')
                    }}
                />
            </View>
        </ScrollView>
    )
}

export default RoomDetailScreen