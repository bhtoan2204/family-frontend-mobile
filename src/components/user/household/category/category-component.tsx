import React from 'react'
import { View, Text, ScrollView, RefreshControl } from 'react-native'
import { COLORS } from 'src/constants'
import { HouseHoldItemInterface } from 'src/interface/household/household_item'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { iOSGrayColors } from 'src/constants/ios-color'
import { HouseHoldCategoryInterface } from 'src/interface/household/household_category'
import CategoryItems from './category-item'
import BottomSheet from '@gorhom/bottom-sheet'
interface ItemComponentProps {
    items: HouseHoldCategoryInterface[]
    handleNavigateCategoryDetail: (id_household_item_category: number) => void
    addCategorySheetRef: React.RefObject<BottomSheet>
}

const CategoryComponent = ({
    items, handleNavigateCategoryDetail, addCategorySheetRef
}: ItemComponentProps) => {
    const [refreshing, setRefreshing] = React.useState(false);

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
            className='flex-1'
            showsVerticalScrollIndicator={false}

        >
            <View>
                <View className='py-4 flex-row items-center justify-between border-b-[1.5px] mx-[10%]'
                    style={{
                        borderColor: iOSGrayColors.systemGray4.defaultLight,
                    }}
                >
                    <Text className='text-lg'
                        style={{
                            color: COLORS.Rhino,
                        }}
                    >Categories</Text>

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
                    <Text className='text-sm'
                        style={{
                            color: COLORS.Rhino,
                        }}
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