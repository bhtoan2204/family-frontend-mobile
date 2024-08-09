import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, Dimensions, SafeAreaView, TouchableOpacity, Image, ScrollView, StatusBar, ActivityIndicator, RefreshControl } from 'react-native'
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
import { setLoading, setShoppingList, setShoppingListItemType, setShoppingListType, updatePurchasedItem } from 'src/redux/slices/ShoppingListSlice'
import ShoppingListServices from 'src/services/apiclient/ShoppingListServices'

const screenHeight = Dimensions.get('screen').height;

// tạo item theo item type trong 1 list trống
// tạo list với category đó trước param id_category, "id_family": 0,"id_shopping_list_type": 0"title": "string", "description": "string"
// add item vào list đó với param id_list, id_family,item_name,id_item_type

// tạo item với list có rồi với param id_list, id_family,item_name,id_item_type

// const mapByItemType = (items: ShoppingListItem[]): Map<ShoppingListItemType, ShoppingListItem[]> => {
//     const data: ShoppingListItem[] = JSON.parse(JSON.stringify(items))
//     return data.reduce((map, item) => {
//         const itemType = item.itemType;

//         // Nếu chưa có entry cho itemType này, tạo một entry mới
//         if (!map.has(itemType)) {
//             map.set(itemType, []);
//         }

//         // Thêm id_item vào mảng tương ứng
//         map.get(itemType)?.push(item);

//         return map;
//     }, new Map<ShoppingListItemType, ShoppingListItem[]>());
// }

const mapByItemType = (items: ShoppingListItem[]): Map<string, ShoppingListItem[]> => {
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
    const loading = useSelector((state: RootState) => state.shoppinglist).loading
    const shoppingListInfo = useSelector((state: RootState) => state.shoppinglist).shoppingList.filter((item) => item.id_shopping_list_type === id_category)
    const shoppingListType = useSelector((state: RootState) => state.shoppinglist).shoppingListType
    const items: Map<string, ShoppingListItem[]> = React.useMemo(() => mapByItemType(
        shoppingListInfo[0]?.items || []
    ), [shoppingListInfo])
    const categories = useSelector((state: RootState) => state.shoppinglist).shoppingListItemType
    const addItemBottomSheetRef = React.useRef<BottomSheet>(null)
    const addCategoryBottomSheetRef = React.useRef<BottomSheet>(null)
    const [pickedCategory, setPickedCategory] = useState<number>(-1)

    const dispatch = useDispatch<AppDispatch>()

    const isDarkMode = useSelector(getIsDarkMode)
    const toast = useToast()

    const fetchDatas = useCallback(async () => {
        const fetchShoppingList = async () => {
            const data = await ShoppingListServices.getShoppingDetail(id_family!)
            dispatch(setShoppingList(data))
        }
        const fetchShoppingListType = async () => {
            const data = await ShoppingListServices.getShoppingListType()
            dispatch(setShoppingListType(data))
        }
        const fetchItemType = async () => {
            const data = await ShoppingListServices.getShoppingItemType()
            dispatch(setShoppingListItemType(data))
        }
        dispatch(setLoading(true))
        await fetchShoppingList()
        await fetchShoppingListType()
        await fetchItemType()
        dispatch(setLoading(false))
    }, [])

    const getImage = React.useCallback((id_category: number) => {
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
    }, [])

    const getCategoryName = React.useCallback((id_category: number) => {
        const category = shoppingListType.find((item) => item.id_shopping_list_type === id_category)
        if (category) {
            return category.type_name_en
        } else {
            return "Other"
        }

    }, [shoppingListType])

    const handleNavigateItemDetail = React.useCallback((id_list: number, id_item: number) => {
        console.log('id_list', id_list, 'id_item', id_item)
        navigation.navigate('ShoppingListDetail', {
            id_family: id_family,
            id_shopping_list: id_list,
            id_category: id_category,
            id_item: id_item,
        })
    }, [])

    const ApiCall = React.useCallback(async (item: ShoppingListItem) => {
        const res = await ShoppingListServices.updateShoppingListItem({
            id_family: id_family!,
            id_item: item.id_item,
            id_list: item.id_list,
            is_purchased: !item.is_purchased
        })
        if (res) {
            return true

        } else {
            return false
        }
    }, [])

    const handleCompleteItem = React.useCallback(async (id_list: number, item: ShoppingListItem) => {
        dispatch(updatePurchasedItem({
            id_item: item.id_item,
            id_list: id_list,
        }))
        const res = await ApiCall(item)
        if (res) {
            toast.show('Purchase', {
                duration: 2000,
                icon: <Material name='check' size={24} color={'white'} />,
                type: 'success',
            })
        } else {
            toast.show('Un-purchased', {
                duration: 2000,
                icon: <Material name='close' size={24} color={'white'} />,
                type: 'error',
            })
        }
        // console.log('id_list', id_list, 'id_item', id_item)

    }, [])

    const buildEmptyList = React.useCallback(() => {
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
    }, [])

    const buildItems = React.useCallback(() => {
        return (
            Array.from(items.entries()).map(([item, index]) => {
                return (
                    <React.Fragment key={item}>
                        <ShoppingListCategoryItem
                            item_type={JSON.parse(item)}
                            items={
                                items.get(item) || []
                            }
                            handleNavigateItemDetail={handleNavigateItemDetail}
                            handleCompleteItem={handleCompleteItem}
                            onPurchase={() => {
                            }}
                            onUnpurchase={() => {
                            }}
                        />
                    </React.Fragment>
                )
            })
        )
    }, [items])



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

                    <View className='absolute top-[200%] right-[-20] '>
                        <Image source={getImage(id_category)} style={{
                            height: screenHeight * 0.2,
                            width: screenHeight * 0.2,
                            transform: [{ rotate: '-20deg' }]

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
                        loading ? <>
                            <View className='flex-1 absolute w-full h-full bg-white dark:bg-[#0A1220] opacity-50 z-10 items-center justify-center'>
                                <View className='items-center justify-center bg-black  rounded-lg'
                                    style={{
                                        width: screenHeight * 0.1,
                                        height: screenHeight * 0.1,
                                    }}
                                >
                                    <ActivityIndicator size='small' color={'white'} />
                                </View>
                            </View>
                        </> : <>
                            {
                                items && items.size > 0 ?
                                    <ScrollView className='flex-1 bg-white dark:bg-[#0A1220]' showsVerticalScrollIndicator={false}
                                        refreshControl={
                                            <RefreshControl refreshing={loading} onRefresh={fetchDatas} />
                                        }
                                    >
                                        <View style={{
                                        }} className='flex-1 py-4 '>
                                            {/* <View className='my-4'></View> */}
                                            {
                                                buildItems()
                                            }
                                        </View>

                                    </ScrollView>
                                    : buildEmptyList()
                            }
                        </>
                    }

                </View>
            </View>
            <AddItemSheet
                addRoomSheetRef={addCategoryBottomSheetRef}
                id_family={id_family!}
                bottomSheetRef={addItemBottomSheetRef}
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