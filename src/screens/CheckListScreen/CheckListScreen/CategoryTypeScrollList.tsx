import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { ChecklistItemInterface, CheckListCategoryInterface } from 'src/interface/checklist/checklist';
import ChecklistItemDetail from '../CheckListItemDetail';
import ChecklistItemModal from '../AddItemCheckListSheet';
import { CheckListScreenProps } from 'src/navigation/NavigationTypes';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS } from 'src/constants';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import AddItemCheckListSheet from '../AddItemCheckListSheet';
import { compareDates } from 'src/utils/compareDate';
import { checklist_category_type } from '../constant/checklist_category_type';
import { shoppingListItemColor, shoppingListItemColorInside } from '../constant/color'
import CircularProgress from '../../EducationScreen/CircularProgress';

const CategoryTypeScrollList = ({ selectedCategory, setSelectedCategory, refRBSheet }: { selectedCategory: any, setSelectedCategory: any, refRBSheet: any }) => {
    return <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-2 my-2 " keyboardShouldPersistTaps="handled" >
        <TouchableOpacity
            key={-1}
            onPress={() => {
                refRBSheet.current?.open();
            }}
            className={`py-2 px-4 rounded-full mr-4 border-2 items-center justify-center h-auto`}
            style={{
                borderColor: shoppingListItemColor[shoppingListItemColor.length - 1],

            }}
        >
            <View className='h-auto flex-row items-center'>
                <Material name="plus" size={22} style={{ color: "black" }} />
                <Text className='text-sm ml-2'>Add a shoppinglist</Text>
            </View>
        </TouchableOpacity>
        {checklist_category_type.map(category => (
            <TouchableOpacity
                key={category.id_item_type}
                onPress={() => {
                    if (selectedCategory === category.id_item_type) {
                        setSelectedCategory(null)
                    } else {
                        setSelectedCategory(category.id_item_type)
                    }
                }}
                className={`py-2 px-4 rounded-full mr-4 border-2 items-center justify-center h-auto`}
                style={{
                    borderColor: shoppingListItemColor[category.id_item_type - 1],
                    backgroundColor: selectedCategory === category.id_item_type ? shoppingListItemColor[category.id_item_type - 1] : 'white',

                }}
            >
                <View className='h-auto'>
                    <Text className='text-sm' style={{
                        color: selectedCategory === category.id_item_type ? 'white' : 'black',
                        fontWeight: selectedCategory === category.id_item_type ? 'bold' : '400',
                    }}>{category.item_type_name}</Text>
                </View>
            </TouchableOpacity>
        ))}
    </ScrollView>

}

export default CategoryTypeScrollList
