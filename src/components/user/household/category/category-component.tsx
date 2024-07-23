import React from 'react'
import { View, Text, ScrollView, RefreshControl } from 'react-native'
import { COLORS } from 'src/constants'
import { HouseHoldItemInterface } from 'src/interface/household/household_item'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { iOSGrayColors } from 'src/constants/ios-color'
import { HouseHoldCategoryInterface } from 'src/interface/household/household_category'
import CategoryItems from './category-item'
import BottomSheet from '@gorhom/bottom-sheet'
import { useSelector } from 'react-redux'
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice'
interface ItemComponentProps {
    items: HouseHoldCategoryInterface[]
    handleNavigateCategoryDetail: (id_household_item_category: number) => void
    addCategorySheetRef: React.RefObject<BottomSheet>
}

const CategoryComponent = ({
    items, handleNavigateCategoryDetail, addCategorySheetRef
}: ItemComponentProps) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const isDarkMode = useSelector(getIsDarkMode)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            className='flex-1 bg-[#F7F7F7] dark:bg-[#0A1220]'
            showsVerticalScrollIndicator={false}

        >
            <View>
                <View className='py-4 flex-row items-center justify-between border-b-[1.5px] mx-[10%] border-[#DEDCDC] dark:border-[#232A3D]'
                    
                >
                    <Text className='text-lg text-[#2A475E] dark:text-white'
                       
                    >Categories</Text>

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
                        
                    >{items.length} items add</Text>


                    <Text className='text-sm font-semibold'
                        style={{
                            color: COLORS.Azure,
                        }}
                        onPress={() => {
                            addCategorySheetRef.current?.expand()
                            console.log('add item')
                        }}
                    >Add item</Text>

                </View>
                <CategoryItems data={items} handleNavigateHouseHoldDetail={handleNavigateCategoryDetail} />
            </View>
        </ScrollView>
    )
}

export default CategoryComponent