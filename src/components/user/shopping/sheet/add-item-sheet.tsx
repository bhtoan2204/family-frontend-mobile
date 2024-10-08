import React, { useEffect, useRef, useCallback } from 'react'
import { View, Text, ScrollView, RefreshControl, Keyboard, Dimensions, Image, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, ImageBackground } from 'react-native'
import { COLORS } from 'src/constants'
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';

import Material from 'react-native-vector-icons/MaterialCommunityIcons';

import { AppDispatch, RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import Ingredients from 'src/assets/images/household_assets/Ingredients.png'
import OpenedFolder from 'src/assets/images/household_assets/OpenedFolder.png'

import { ShoppingListItemType } from 'src/interface/shopping/shopping_list';
import { addShoppingList, addShoppingListItem } from 'src/redux/slices/ShoppingListSlice';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';
import { handleRestore } from 'src/utils/sheet/func';
import ShoppingListServices from 'src/services/apiclient/ShoppingListServices';



interface AddItemSheetProps {
    bottomSheetRef: React.RefObject<BottomSheet>
    id_family: number
    addRoomSheetRef: React.RefObject<BottomSheet>
    pickedCategory: number
    categories: ShoppingListItemType[],
    id_shopping_list_type: number,
    onAddSuccess: () => void
    onAddFailed: () => void
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const AddItemSheet = ({
    bottomSheetRef,
    id_family,
    addRoomSheetRef,
    pickedCategory,
    categories,
    id_shopping_list_type,
    onAddSuccess,
    onAddFailed


}: AddItemSheetProps) => {
    const snapPoints = React.useMemo(() => ['75%'], []);

    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch<AppDispatch>()


    const [errorText, setErrorText] = React.useState('')
    const [showError, setShowError] = React.useState(false)

    const [householdName, setHouseholdName] = React.useState('')
    const [householdCategory, setHouseholdCategory] = React.useState(-1)
    const shoppingList = useSelector((state: RootState) => state.shoppinglist).shoppingList.filter(list => list.id_shopping_list_type == id_shopping_list_type)
    const listType = useSelector((state: RootState) => state.shoppinglist).shoppingListType.find(listType => listType.id_shopping_list_type == id_shopping_list_type)
    const isDarkMode = useSelector(getIsDarkMode)
    // const {colorScheme}
    useEffect(() => {
        if (showError) {
            setTimeout(() => {
                setShowError(false)
                setErrorText('')
            }, 3000)
        }

    }, [showError])


    const renderBackdrop = React.useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} pressBehavior={
            loading ? 'none' : undefined
        } />,
        []
    );

    const addItem = useCallback(async (id_list: number) => {
        try {
            const res = await ShoppingListServices.createShoppingListItem({
                id_family: id_family,
                id_list: id_list,
                id_item_type: pickedCategory,
                item_name: householdName,
                description: householdName,
                quantity: 1,
                priority_level: 0,
                reminder_date: new Date().toISOString(),
                price: 0,
            });

            if (res) {
                dispatch(
                    addShoppingListItem({
                        id_item: res.id_item,
                        id_list: res.id_list,
                        id_item_type: res.id_item_type,
                        item_name: res.item_name,
                        description: res.description,
                        quantity: res.quantity,
                        is_purchased: res.is_purchased,
                        priority_level: res.priority_level,
                        reminder_date: res.reminder_date,
                        price: res.price,
                        created_at: res.created_at,
                        updated_at: res.updated_at,
                        itemType: categories.find(
                            (category) => category.id_item_type === res.id_item_type
                        )!,
                    })
                );
            } else {
                onAddFailed();
            }
        } catch (error) {
            console.error('Error adding item:', error);
            onAddFailed();
        }
    }, [id_family, pickedCategory, householdName, categories, onAddFailed, id_shopping_list_type]);

    const createAndAddToNewList = useCallback(async () => {
        try {
            const newList = await ShoppingListServices.createShoppingList({
                id_family: id_family,
                id_shopping_list_type: id_shopping_list_type,
                title: 'Shopping List ' + id_shopping_list_type,
                description: '',
            });

            if (newList) {
                dispatch(
                    addShoppingList({
                        id_list: newList.id_list,
                        id_family: id_family,
                        id_shopping_list_type: id_shopping_list_type,
                        title: 'Shopping List ' + id_shopping_list_type,
                        description: 'Shopping List ' + id_shopping_list_type,
                        status: '',
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                        listType: listType!,
                        items: [],
                    })
                );

                await addItem(newList.id_list);
                onAddSuccess();
            } else {
                onAddFailed();
            }
        } catch (error) {
            console.error('Error creating shopping list:', error);
            onAddFailed();
        } finally {
            // bottomSheetRef.current?.close();
        }
    }, [id_family, id_shopping_list_type, dispatch, listType, addItem, onAddSuccess, onAddFailed]);

    const addToExistingList = useCallback(async (id_list: number) => {
        try {
            await addItem(id_list);
            onAddSuccess();
        } catch (error) {
            console.error('Error adding to existing list:', error);
            onAddFailed();
        } finally {
            //   bottomSheetRef.current?.close();
        }
    }, [addItem, onAddSuccess, onAddFailed]);

    const handleSubmit = useCallback(async () => {
        Keyboard.dismiss()
        await handleRestore()
        if (householdName == '' || pickedCategory == -1) {
            setErrorText('Please fill in all the fields')
            setShowError(true)
            return
        }
        console.log(shoppingList)
        setLoading(true)
        if (shoppingList.length == 0) {
            await createAndAddToNewList();
        } else {
            await addToExistingList(shoppingList[0].id_list);
        }
        setLoading(false)
        bottomSheetRef.current?.close()
    }, [householdName, pickedCategory, shoppingList, createAndAddToNewList, addToExistingList, bottomSheetRef]);

    const onSetName = useCallback((name: string) => {
        setHouseholdName(name)
    }, []);

    const getCategoryName = useCallback((id_category: number) => {
        const category = categories.find(category => category.id_item_type == id_category)
        return category?.item_type_name_en
    }, [categories]);



    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            enableOverDrag={true}
            enablePanDownToClose={loading ? false : true}
            snapPoints={snapPoints}

            // handleComponent={null}
            backgroundStyle={{
                backgroundColor: isDarkMode ? '#0A1220' : '#F7F7F7'
            }}
            handleIndicatorStyle={{ backgroundColor: isDarkMode ? '#D9D9D9' : '#D9D9D9', }}
            backdropComponent={renderBackdrop}
            // backgroundComponent={null}
            onClose={() => {
                Keyboard.dismiss()
            }}
            onChange={(index) => {
                console.log(index)
                if (index == -1) {
                    setHouseholdName('')
                    setHouseholdCategory(-1)
                }
            }}
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"


        >
            <>
                {
                    loading && <View className='flex-1 absolute w-full h-full bg-white opacity-50 z-10 items-center justify-center'>
                        <View className='items-center justify-center bg-black  rounded-lg'
                            style={{
                                width: screenHeight * 0.1,
                                height: screenHeight * 0.1,
                            }}
                        >
                            <ActivityIndicator size='small' color={'white'} />
                        </View>
                    </View>
                }
            </>
            <View className='flex-1 bg-[#F7F7F7] dark:bg-[#0A1220] '>
                <BottomSheetScrollView className='' showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets style={{}} keyboardShouldPersistTaps='handled'>

                    <View className='flex-1  mt-10'>
                        <View className='my-3 items-center'>
                            <Image source={Ingredients} style={{ width: screenWidth * 0.2, height: screenWidth * 0.2 }} />
                        </View>
                        <View className=' items-center'>
                            <Text className='text-base font-semibold text-[#2A475E] dark:text-white' style={{


                            }}>Add New Item</Text>
                            <Text className='text-sm my-3 text-[#2A475E] dark:text-[#8D94A5]' style={{

                            }}>Pick a category and named for your new item</Text>
                        </View>
                        <BottomSheetTextInput
                            placeholder='Name of the item'
                            value={householdName}
                            onChangeText={(text) => {
                                onSetName(text)
                            }}
                            // className='rounded-lg'
                            style={{
                                backgroundColor: !isDarkMode ? '#f5f5f5' : '#171A21',
                                borderWidth: !isDarkMode ? 1 : 1.5,
                                borderColor: !isDarkMode ? '#DEDCDC' : '#66C0F4',
                                borderRadius: 10,
                                marginVertical: 10,
                                paddingVertical: screenHeight * 0.02,
                                paddingHorizontal: screenWidth * 0.05,
                                marginHorizontal: screenWidth * 0.05,
                                // fontWeight: 'bold',
                                fontSize: 15,
                                color: !isDarkMode ? '#b0b0b0' : '#A6A6A6'

                            }}
                        />
                        <TouchableOpacity className=' bg-white  mt-3 justify-center rounded-lg  ' style={{
                            backgroundColor: !isDarkMode ? '#f5f5f5' : '#171A21',
                            borderWidth: !isDarkMode ? 1 : 1.5,
                            borderColor: !isDarkMode ? '#DEDCDC' : '#66C0F4',
                            borderRadius: 10,
                            marginVertical: 10,
                            paddingVertical: screenHeight * 0.01,
                            paddingHorizontal: screenWidth * 0.05,
                            marginHorizontal: screenWidth * 0.05,

                        }} onPress={() => {
                            // pickCategorySheetRef.current?.expand()
                            Keyboard.dismiss()
                            addRoomSheetRef.current?.expand()
                        }}>
                            <View className='flex-row justify-between items-center'>
                                <View className='flex-row  items-center '>
                                    <Image source={OpenedFolder} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
                                    <Text className='pl-4' style={{
                                        color: "#b0b0b0",
                                        fontSize: 15,
                                        // fontWeight: 500

                                    }}>Category</Text>
                                </View>
                                <View className=''>
                                    <Text style={{
                                        color: householdCategory == -1 ? "#b0b0b0" : iOSColors.systemBlue.defaultLight,
                                        fontSize: 15,

                                    }}>{
                                            pickedCategory == -1 ? 'Pick a category' : getCategoryName(pickedCategory)

                                        }</Text>
                                </View>
                            </View>
                        </TouchableOpacity>



                        <View>
                            {
                                showError ? <Text className='text-center text-base text-red-500 py-3'>{errorText}</Text> : <></>
                            }
                        </View>

                        <View className='items-end pr-3 my-3 mt-12 '>
                            <TouchableOpacity className='items-center rounded-lg justify-center' style={{
                                width: screenWidth * 0.1,
                                height: screenWidth * 0.1,
                                backgroundColor: pickedCategory != -1 && householdName != '' ? COLORS.DenimBlue : iOSGrayColors.systemGray6.defaultLight,
                            }}
                                onPress={async () => {
                                    await handleSubmit()
                                }}
                            >
                                <Material name='arrow-right' size={24} color={
                                    pickedCategory != -1 && householdName != '' ? 'white' : iOSGrayColors.systemGray.defaultDark
                                }
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </BottomSheetScrollView>
            </View>

        </BottomSheet>
    )
}


export default AddItemSheet