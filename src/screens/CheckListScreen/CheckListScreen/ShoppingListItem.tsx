import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { shoppingListItemColor, shoppingListItemColorInside } from '../constant/color';
import CircularProgress from 'src/components/user/education/circular-progress';
import { CheckListCategoryInterface } from 'src/interface/checklist/checklist';
import { iOSGrayColors } from 'src/constants/ios-color';

interface ShoppingListItemProps {
    item: CheckListCategoryInterface;
    handleNavigateCheckListDetail: (id_checklist: number) => void;
    index: number
}

const ShoppingListItem = ({ item, handleNavigateCheckListDetail, index }: ShoppingListItemProps) => {

    const getColorIndex = (index: number) => {
        return index % shoppingListItemColor.length
    }

    return <TouchableOpacity key={item.id_list} onPress={() => {
        handleNavigateCheckListDetail(item.id_list)
    }}>
        <View className='px-4 py-4 my-2 rounded-xl' style={{
            // backgroundColor: shoppingListItemColorInside[getColorIndex(index)],
            backgroundColor: iOSGrayColors.systemGray6.defaultLight,
            // backgroundColor: shoppingListItemColorInside[rand],
        }}>
            <View style={{
                // backgroundColor: shoppingListItemColor[getColorIndex(index)],
                backgroundColor: iOSGrayColors.systemGray.defaultDark,
                // backgroundColor: shoppingListItemColor[rand],
                alignSelf: 'flex-start'
            }} className='w-auto px-2 py-1 rounded-2xl '>
                <Text className='text-xs text-white font-medium '>Grocery</Text>
            </View>
            <Text className='text-xl font-bold mt-2 mb-4'>{item.title} </Text>

            <View className='flex-row items-center'>
                <View className='mr-2'>
                    <CircularProgress
                        size={20}
                        progress={item.total === 0 ? 0 : item.completed / item.total * 100}
                        strokeWidth={2}
                        backgroundColor="#BEC8DF"
                        progressColor={iOSGrayColors.systemGray.defaultDark}
                        // progressColor={shoppingListItemColor[rand]}
                        disableProgressText={true}
                    />
                </View>
                <Text className='text-[#908B89] text-sm'>{item.completed}</Text>
                <Text className='text-[#908B89] text-sm'>/</Text>
                <Text className='text-[#908B89] text-sm'>{item.total}</Text>
                <Text className='text-[#908B89] ml-1 text-sm'>Complete</Text>
            </View>
        </View>
    </TouchableOpacity>


}

export default ShoppingListItem