import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, Dimensions, SafeAreaView, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ShoppingListCategoryScreenProps } from 'src/navigation/NavigationTypes'
import { AppDispatch, RootState } from 'src/redux/store'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS } from 'src/constants'
import { colors, textColors } from '../const/color'


import GroceryBgImage from 'src/assets/images/shoppinglist_assets/grocery_bg_image.png'
import ElectronicsBgImage from 'src/assets/images/shoppinglist_assets/electronics_bg_image.png'
import ClothingBgImage from 'src/assets/images/shoppinglist_assets/clothing_bg_image.png'
import FurnitureBgImage from 'src/assets/images/shoppinglist_assets/furniture_bg_image.png'
import PharmacyBgImage from 'src/assets/images/shoppinglist_assets/pharmacy_bg_image.png'
import OtherBgImage from 'src/assets/images/shoppinglist_assets/other_bg_image.png'
import EmptyListIcon from 'src/assets/images/shoppinglist_assets/empty_list_icon.png'


import { ShoppingList, ShoppingListItem, ShoppingListItemType } from 'src/interface/shopping/shopping_list'
import ShoppingListCategoryItem from 'src/components/user/shopping/shopping-list-category/shopping-list-category-item'
import BottomSheet from '@gorhom/bottom-sheet'
import AddItemSheet from 'src/components/user/shopping/sheet/add-item-sheet'
import ShoppingListPickCategorySheet from 'src/components/user/shopping/sheet/add-category-sheet'
import { useColorScheme } from 'nativewind'
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice'
import { useToast } from 'react-native-toast-notifications'
import { updatePurchasedItem } from 'src/redux/slices/ShoppingListSlice'

const screenHeight = Dimensions.get('screen').height;

// tạo item theo item type trong 1 list trống
// tạo list với category đó trước param id_category, "id_family": 0,"id_shopping_list_type": 0"title": "string", "description": "string"
// add item vào list đó với param id_list, id_family,item_name,id_item_type

// tạo item với list có rồi với param id_list, id_family,item_name,id_item_type

const mapByItemType = (items: ShoppingListItem[]): Map<ShoppingListItemType, ShoppingListItem[]> => {
    const data: ShoppingListItem[] = JSON.parse(JSON.stringify(items))
    return data.reduce((map, item) => {
        const itemType = item.itemType;

        // Nếu chưa có entry cho itemType này, tạo một entry mới
        if (!map.has(itemType)) {
            map.set(itemType, []);
        }

        // Thêm id_item vào mảng tương ứng
        map.get(itemType)?.push(item);

        return map;
    }, new Map<ShoppingListItemType, ShoppingListItem[]>());
}

const mapByItemType2 = (items: ShoppingListItem[]): Map<string, ShoppingListItem[]> => {
    const data: ShoppingListItem[] = JSON.parse(JSON.stringify(items))
    const map = new Map<string, ShoppingListItem[]>()
    for (let i = 0; i < data.length; i++) {
        const itemType = JSON.stringify(data[i].itemType)
        console.log("yuwu", data[i].itemType)
        if (!map.has(JSON.stringify(data[i].itemType))) {
            const arr = [data[i]]
            map.set(itemType, arr)
        } else {
            console.log("?")
            map.get(itemType)?.push(data[i])
        }
    }
    return map
}

const ShoppingListCategoryScreen = ({ navigation, route }: ShoppingListCategoryScreenProps) => {
    const { id_family, id_category } = route.params
    // console.log('id_family', id_family, 'id_category', id_category)
    const familyInfo = useSelector((state: RootState) => state.family).selectedFamily
    const shoppingListInfo = useSelector((state: RootState) => state.shoppinglist).shoppingList.filter((item) => item.id_shopping_list_type === id_category)
    const [mapItems, setMapItems] = useState<Map<ShoppingListItemType, ShoppingListItem[]>>(new Map())
    console.log('cout', shoppingListInfo)
    const items: Map<string, ShoppingListItem[]> = mapByItemType2(
        shoppingListInfo[0]?.items || []
    )
    const categories = useSelector((state: RootState) => state.shoppinglist).shoppingListItemType
    const addItemBottomSheetRef = React.useRef<BottomSheet>(null)
    const addCategoryBottomSheetRef = React.useRef<BottomSheet>(null)
    const [pickedCategory, setPickedCategory] = useState<number>(-1)
    const dispatch = useDispatch<AppDispatch>()

    const isDarkMode = useSelector(getIsDarkMode)
    const toast = useToast()

    // const items: ShoppingListItem[] = []
    useEffect(() => {
        console.log("shopping list", shoppingListInfo)
        console.log(items)
    }, [shoppingListInfo])

    useEffect(() => {
    }, [])


    const getImage = (id_category: number) => {
        if (id_category === 1) {
            return GroceryBgImage
        }
        if (id_category === 2) {
            return ElectronicsBgImage
        }
        if (id_category === 3) {
            return ClothingBgImage
        }
        if (id_category === 4) {
            return FurnitureBgImage
        }
        if (id_category === 5) {
            return PharmacyBgImage
        }
        return OtherBgImage
    }

    const getCategoryName = (id_category: number) => {
        if (id_category === 1) {
            return 'Grocery'
        }
        if (id_category === 2) {
            return 'Electronics'
        }
        if (id_category === 3) {
            return 'Clothing'
        }
        if (id_category === 4) {
            return 'Furniture'
        }
        if (id_category === 5) {
            return 'Pharmacy'
        }
        return 'Other'
    }

    const handleNavigateItemDetail = (id_list: number, id_item: number) => {
        console.log('id_list', id_list, 'id_item', id_item)
        navigation.navigate('ShoppingListDetail', {
            id_family: id_family,
            id_shopping_list: id_list,
            id_category: id_category,
            id_item: id_item,
        })
    }

    const handleCompleteItem = (id_list: number, id_item: number) => {
        console.log('id_list', id_list, 'id_item', id_item)
        dispatch(updatePurchasedItem({
            id_item: id_item,
            id_list: id_list,
        }))
    }

    const buildEmptyList = () => {
        return (
            <View className='flex-1 justify-center items-center bg-white dark:bg-[#0A1220] '>
                <View className='justify-center items-center mt-[-4%]'>
                    <View className='mb-4'>
                        <Image source={EmptyListIcon} style={{
                            height: screenHeight * 0.2,
                            width: screenHeight * 0.2,
                        }} />
                    </View>
                    <Text className='text-[#747474] my-2 font-bold text-lg dark:text-[#d8d8d8]'>Nothing to buy?</Text>
                    <Text className='mx-[15%] text-center text-sm text-[#747474] dark:text-[#d8d8d8]'>Tap on the button to add product to your shopping list</Text>
                </View>
            </View>
        )
    }

    const buildItems = () => {
        return (
            Array.from(items.entries()).map(([item, index]) => {
                return (
                    <React.Fragment key={item}>
                        <ShoppingListCategoryItem
                            item_type={JSON.parse(item)} items={
                                items.get(item) || []
                            }
                            handleNavigateItemDetail={handleNavigateItemDetail}
                            handleCompleteItem={handleCompleteItem}
                            onPurchase={() => {
                                toast.show("Purchased", {
                                    type: "success",
                                    duration: 2000,
                                    icon: <Material name="check" size={24} color={"white"} />,
                                })
                            }}
                            onUnpurchase={() => {
                                toast.show("Unpurchased", {
                                    type: "success",
                                    duration: 2000,
                                    icon: <Material name="close" size={24} color={"white"} />,
                                })
                            }}
                        />
                    </React.Fragment>
                )
            })
        )
    }



    return (
        <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
            <StatusBar barStyle={!isDarkMode ? 'dark-content' : 'dark-content'} />
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

            <View className='flex-1 mt-[-5%] rounded-tl-xl rounded-tr-xl r bg-white dark:bg-[#0A1220] overflow-hidden z-100'>
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
                        items && items.size > 0 ?
                            <ScrollView className='flex-1 bg-white dark:bg-[#0A1220]' showsVerticalScrollIndicator={false}>
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
            <AddItemSheet addRoomSheetRef={addCategoryBottomSheetRef} id_family={id_family!} bottomSheetRef={addItemBottomSheetRef}
                pickedCategory={pickedCategory}
                categories={categories}
                id_shopping_list_type={id_category!}
                onAddSuccess={
                    () => {
                        toast.show("New shopping item added", {
                            type: "success",
                            duration: 2000,
                            icon: <Material name="check" size={24} color={"white"} />,
                        });
                    }
                }
                onAddFailed={
                    () => {
                        toast.show("Failed to add item", {
                            type: "error",
                            duration: 2000,
                            icon: <Material name="close" size={24} color={"white"} />,
                        });
                    }
                }
            />
            {/* <AddCategorySheet bottomSheetRef={addCategoryBottomSheetRef} id_family={id_family!} /> */}
            <ShoppingListPickCategorySheet refRBSheet={addCategoryBottomSheetRef}
                categories={categories}
                onSetCategory={(id_category) => {
                    console.log('id_category', id_category)
                    setPickedCategory(id_category)
                    addCategoryBottomSheetRef.current?.close()
                }}
                category={pickedCategory}
                onNavigateCreateCategory={() => {
                    console.log('lol')
                }}
            />
        </View>

    )
}



export default ShoppingListCategoryScreen