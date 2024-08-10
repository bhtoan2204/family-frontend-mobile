import React from 'react'
import { View, Text, ScrollView, RefreshControl } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ItemItems from 'src/components/user/household/item/items-item'
import { CategoryDetailScreenProps, RoomDetailScreenProps } from 'src/navigation/NavigationTypes'
import { AppDispatch, RootState } from 'src/redux/store'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { iOSGrayColors } from 'src/constants/ios-color'
import { COLORS } from 'src/constants'
import { updateImageProp } from 'src/redux/slices/HouseHoldDetailSlice'
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice'
import HouseHoldService from 'src/services/apiclient/HouseHoldService'
import { setHouseholdItems, setLoading, setTotalItem } from 'src/redux/slices/HouseHoldDataSlice'


const CategoryDetailScreen = ({ navigation, route, setAddItemType, setPickedCategory, addItemSheetRef }: CategoryDetailScreenProps) => {
    const { id_family, id_category } = route.params
    console.log("huhu", id_category)
    const householdItems = useSelector((state: RootState) => state.household).items.filter(item => item.id_category == id_category)
    const categoryInfo = useSelector((state: RootState) => state.household).categories.find(category => category.id_household_item_category == id_category)
    const isDarkMode = useSelector(getIsDarkMode)
    const dispatch = useDispatch<AppDispatch>()
    const loading = useSelector((state: RootState) => state.household).loading

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


    React.useEffect(() => {
        // setAddItemType(1)
        setPickedCategory(id_category!)
        return () => {
            // setAddItemType(0)
            setPickedCategory(-1)
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
                <View className='py-4 flex-row items-center justify-between border-b-[1.5px] mx-[10%] border-[#DEDCDC] dark:border-[#232A3D]'

                >
                    <Text className='text-lg text-[#2A475E] dark:text-white'

                    >
                        {categoryInfo?.category_name}
                    </Text>

                    <View className=' p-1 border-[1px] rounded-lg border-[#DEDCDC] dark:border-[#232A3D]'

                    >
                        <Material name='magnify' size={24} color={
                            isDarkMode ? '#909093' : COLORS.Rhino
                        } />
                    </View>
                </View>
                <View className='py-4 flex-row items-center justify-between px-[10%] '

                >
                    <Text className='text-sm text-[#2A475E] dark:text-[#8D94A5]'

                    >{householdItems.length} {householdItems.length > 1 ? "items" :
                        "item"} add</Text>


                    <Text className='text-sm font-semibold'
                        style={{
                            color: COLORS.Azure,
                        }}
                        onPress={() => {
                            addItemSheetRef!.current?.expand()
                        }}
                    >Add item</Text>

                </View>
                <ItemItems data={householdItems}
                    handleNavigateHouseHoldDetail={(id: number) => {
                        // const img = householdItems.find(item => item.id_household_item === id)!.item_image!
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

export default CategoryDetailScreen