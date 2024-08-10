import React from 'react'
import { View, Text, ScrollView, RefreshControl } from 'react-native'
import { COLORS } from 'src/constants'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { HouseHoldCategoryInterface } from 'src/interface/household/household_category'
import CategoryItems from './category-item'
import BottomSheet from '@gorhom/bottom-sheet'
import { useDispatch, useSelector } from 'react-redux'
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice'
import { AppDispatch, RootState } from 'src/redux/store'
import HouseHoldService from 'src/services/apiclient/HouseHoldService'
import { setCategories, setLoading, setTotalCategory } from 'src/redux/slices/HouseHoldDataSlice'
import { getTranslate } from 'src/redux/slices/languageSlice'
interface ItemComponentProps {
    items: HouseHoldCategoryInterface[]
    handleNavigateCategoryDetail: (id_household_item_category: number) => void
    addCategorySheetRef: React.RefObject<BottomSheet>
    id_family: number
}

const CategoryComponent = ({
    items, handleNavigateCategoryDetail, addCategorySheetRef, id_family
}: ItemComponentProps) => {

    const isDarkMode = useSelector(getIsDarkMode)
    const loading = useSelector((state: RootState) => state.household).loading

    const dispatch = useDispatch<AppDispatch>()
    const translate = useSelector(getTranslate)
    const refetchData = React.useCallback(async () => {
        const fetchData = async () => {
            const data = await HouseHoldService.getAllHouseHoldCategory()
            dispatch(setCategories(data.data))
            dispatch(setTotalCategory(data.total))
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

                    >{
                            translate('household_categories_text')
                        }</Text>

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
                            addCategorySheetRef.current?.expand()
                            console.log('add item')
                        }}
                    >{
                            translate('add_item_text')
                        }</Text>

                </View>
                <CategoryItems data={items} handleNavigateHouseHoldDetail={handleNavigateCategoryDetail} />
            </View>
        </ScrollView>
    )
}

export default CategoryComponent