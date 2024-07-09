import { addMonths, endOfMonth, format, startOfMonth, subMonths } from 'date-fns'
import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, Dimensions, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Agenda, AgendaSchedule, Calendar, CalendarList } from 'react-native-calendars'
import { useSelector } from 'react-redux'
import { ShoppingListCategoryScreenProps, TodoListCategoryScreenProps } from 'src/navigation/NavigationTypes'
import { RootState } from 'src/redux/store'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS } from 'src/constants'
import { colors, textColors } from '../const/color'

import GroceryImage from 'src/assets/images/shoppinglist_assets/grocery.png'
import ElectronicsImage from 'src/assets/images/shoppinglist_assets/Electronics.png'
import ClothingImage from 'src/assets/images/shoppinglist_assets/Clothing.png'
import FurnitureImage from 'src/assets/images/shoppinglist_assets/Furniture.png'
import PharmacyImage from 'src/assets/images/shoppinglist_assets/Pharmacy.png'
import OtherImage from 'src/assets/images/shoppinglist_assets/Other.png'
import GroceryBgImage from 'src/assets/images/shoppinglist_assets/grocery_bg_image.png'
import ElectronicsBgImage from 'src/assets/images/shoppinglist_assets/electronics_bg_image.png'
import ClothingBgImage from 'src/assets/images/shoppinglist_assets/clothing_bg_image.png'
import FurnitureBgImage from 'src/assets/images/shoppinglist_assets/furniture_bg_image.png'
import PharmacyBgImage from 'src/assets/images/shoppinglist_assets/pharmacy_bg_image.png'
import OtherBgImage from 'src/assets/images/shoppinglist_assets/other_bg_image.png'
import GamingIcon from 'src/assets/images/shoppinglist_assets/gaming_icon.png'
import EmptyListIcon from 'src/assets/images/shoppinglist_assets/empty_list_icon.png'

import { ListItem } from '@rneui/themed';
import { gradients_list } from 'src/assets/images/gradients'
import { ScreenWidth } from '@rneui/base'
import { ShoppingListItemInterface } from 'src/interface/checklist/checklist'
import ShoppingListServices from 'src/services/apiclient/ShoppingListServices'
import { ShoppingList, ShoppingListItem, ShoppingListItemType } from 'src/interface/shopping/shopping_list'
import ShoppingListCategoryItem from 'src/components/user/shopping/shopping-list-category/shopping-list-category-item'
import BottomSheet from '@gorhom/bottom-sheet'
import AddItemSheet from 'src/components/user/shopping/sheet/add-item-sheet'
import AddCategorySheet from 'src/components/user/shopping/sheet/add-category-sheet'
import ShoppingListPickCategorySheet from 'src/components/user/shopping/sheet/add-category-sheet'
import { categoriesImage } from '../const/image'


const screenHeight = Dimensions.get('screen').height;

// tạo item theo item type trong 1 list trống
// tạo list với category đó trước param id_category, "id_family": 0,"id_shopping_list_type": 0"title": "string", "description": "string"
// add item vào list đó với param id_list, id_family,item_name,id_item_type

// tạo item với list có rồi với param id_list, id_family,item_name,id_item_type


const TodoListCategoryScreen = ({ navigation, route }: TodoListCategoryScreenProps) => {
    const { id_family, id_category } = route.params
    // console.log('id_family', id_family, 'id_category', id_category)
    const familyInfo = useSelector((state: RootState) => state.family).family
    // const shoppingListInfo = useSelector((state: RootState) => state.shoppinglist).shoppingList.filter((item) => item.id_shopping_list_type === id_category)
    const todoCategories = useSelector((state: RootState) => state.todoList).todoListType



    const addItemBottomSheetRef = React.useRef<BottomSheet>(null)
    const addCategoryBottomSheetRef = React.useRef<BottomSheet>(null)


    // const items: ShoppingListItem[] = []





    const getImage = (id_category: number) => {
        // if (id_category === 1) {
        //     return GroceryBgImage
        // }
        // if (id_category === 2) {
        //     return ElectronicsBgImage
        // }
        // if (id_category === 3) {
        //     return ClothingBgImage
        // }
        // if (id_category === 4) {
        //     return FurnitureBgImage
        // }
        // if (id_category === 5) {
        //     return PharmacyBgImage
        // }
        // return OtherBgImage
        return categoriesImage[id_category - 1]
    }

    const getCategoryName = (id_category: number) => {
        // if (id_category === 1) {
        //     return 'Grocery'
        // }
        // if (id_category === 2) {
        //     return 'Electronics'
        // }
        // if (id_category === 3) {
        //     return 'Clothing'
        // }
        // if (id_category === 4) {
        //     return 'Furniture'
        // }
        // if (id_category === 5) {
        //     return 'Pharmacy'
        // }
        // return 'Other'
        return todoCategories.find((item) => item.id_checklist_type === id_category)!.name_en
    }

    const handleNavigateItemDetail = (id_list: number, id_item: number) => {
        console.log('id_list', id_list, 'id_item', id_item)
        navigation.navigate('TodoListItemDetail', {
            id_family: id_family,
            id_list: id_list,
            id_category: id_category,
            id_item: id_item,
        })
    }

    const buildEmptyList = () => {
        return (
            <View className='flex-1 justify-center items-center '>
                <View className='justify-center items-center mt-[-4%]'>
                    <View className='mb-4'>
                        <Image source={EmptyListIcon} style={{
                            height: screenHeight * 0.2,
                            width: screenHeight * 0.2,
                        }} />
                    </View>
                    <Text className='text-[#747474] my-2 font-bold text-lg'>Nothing to buy?</Text>
                    <Text className='mx-[15%] text-center text-sm text-[#747474]'>Tap on the button to add product to your shopping list</Text>
                </View>
            </View>
        )
    }

    const buildItems = () => {
        return (
            <>
                <Text>hi</Text>
            </>
        )
    }



    return (
        <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
            <View className='py-6 h-[29%] ' style={{
                backgroundColor: colors[id_category - 1],
            }}>

                <View className='flex-row  ml-3'>
                    <TouchableOpacity className='flex-1 ' onPress={() => {
                        navigation.goBack()
                    }}>
                        <Material name='chevron-left' size={35} color={COLORS.Rhino} />
                    </TouchableOpacity>
                    {/* <Text className='flex-1 text-center text-lg'
                        style={{ color: COLORS.Rhino, fontWeight: 'bold' }}
                    >Shopping List</Text> */}
                    <View className='absolute top-[200%] right-[-20] '>
                        <Image source={getImage(id_category)} style={{
                            height: screenHeight * 0.2,
                            width: screenHeight * 0.2,
                            transform: [{ rotate: '-20deg' }]

                            // position: 'absolute',
                            // right: 0,
                        }} />
                    </View>
                </View>
                <View className='ml-3 mt-10'>
                    <Text className='' style={{
                        fontSize: 40,
                        color: textColors[id_category - 1],
                        fontWeight: '600',
                    }}>{
                            getCategoryName(id_category)
                        }</Text>
                </View>
            </View>

            <View className='flex-1 mt-[-5%] rounded-tl-xl rounded-tr-xl r bg-white overflow-hidden z-100'>
                <TouchableOpacity activeOpacity={0.65} className='absolute rounded-full bottom-10 right-3 z-10  items-center justify-center' style={{
                    height: screenHeight * 0.08,
                    width: screenHeight * 0.08,
                    backgroundColor: COLORS.DenimBlue
                }}
                    onPress={() => {
                        addItemBottomSheetRef.current?.expand()
                    }}
                >
                    <Material name='plus' size={35} color={'white'} />
                </TouchableOpacity>
                <View className='bg-white flex-1 '>
                    {
                        1 == 1 ?
                            <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
                                <View style={{
                                }} className='flex-1 py-4 '>
                                    {/* <View className='my-4'></View> */}
                                    {
                                        buildItems()
                                        // shoppingListInfo.map((item, index) => {
                                        //     return (
                                        //         <ShoppingListCategoryItem item={item} handleNavigateItemDetail={handleNavigateItemDetail} />

                                        //     )
                                        // })
                                    }
                                </View>

                            </ScrollView>
                            : buildEmptyList()
                    }

                </View>
            </View>
            {/* <AddItemSheet addRoomSheetRef={addCategoryBottomSheetRef} id_family={id_family!} bottomSheetRef={addItemBottomSheetRef}
                pickedCategory={pickedCategory}
                categories={categories}
                id_shopping_list_type={id_category!}
            /> */}
            {/* <AddCategorySheet bottomSheetRef={addCategoryBottomSheetRef} id_family={id_family!} /> */}

        </View>

    )
}



export default TodoListCategoryScreen