import React, { useEffect, useRef } from 'react'
import { View, Text, ScrollView, RefreshControl, Keyboard, Dimensions, Image, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, ImageBackground } from 'react-native'
import { COLORS } from 'src/constants'
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import RoomIcon from 'src/assets/images/household_assets/room.png';
import ImageIcon from 'src/assets/images/household_assets/image.png';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import HouseHoldService from 'src/services/apiclient/HouseHoldService';
import { AppDispatch, RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addRoom } from 'src/redux/slices/RoomSlice';
import { HouseHoldItemInterface } from 'src/interface/household/household_item';
import * as Animatable from 'react-native-animatable';
import CategoryIcon from 'src/assets/images/household_assets/category.png';

import NewItemImageSheet from 'src/assets/images/household_assets/new_item_image_sheet.png'
import Camera from 'src/assets/images/household_assets/Camera.png'
import Ingredients from 'src/assets/images/household_assets/Ingredients.png'
import OpenedFolder from 'src/assets/images/household_assets/OpenedFolder.png'
import Room2 from 'src/assets/images/household_assets/Room_2.png'

import { BlurView } from 'expo-blur';
import { ShoppingList, ShoppingListItem, ShoppingListItemType } from 'src/interface/shopping/shopping_list';
import { addShoppingList, addShoppingListItem } from 'src/redux/slices/ShoppingListSlice';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';
import { handleRestore } from 'src/utils/sheet/func';



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
    const [text, setText] = React.useState('')
    const [step, setStep] = React.useState(0)
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

    const handleSubmit = async () => {
        Keyboard.dismiss()
        await handleRestore()
        if (householdName == '' || pickedCategory == -1) {
            setErrorText('Please fill in all the fields')
            setShowError(true)
            return
        }
        console.log(shoppingList)
        const addItem = async (id_list: number) => {
            const newShoppingItem: ShoppingListItem = {
                id_item: Math.floor(Math.random() * 1000),
                id_list: id_list,
                id_item_type: pickedCategory,
                item_name: householdName,
                description: '',
                quantity: 1,
                is_purchased: false,
                priority_level: 100,
                reminder_date: new Date().toISOString(),
                price: '$0.00',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                itemType: categories.find(category => category.id_item_type == pickedCategory)!,
                shoppingList: shoppingList[0]
            }
            dispatch(addShoppingListItem(newShoppingItem))
        }
        if (shoppingList.length == 0) {
            const id_list = Math.floor(Math.random() * 1000)
            const newShoppingList: ShoppingList = {
                id_list: id_list,
                id_family: id_family,
                id_shopping_list_type: id_shopping_list_type,
                title: 'Shopping List ' + id_shopping_list_type,
                description: '',
                status: '',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                listType: listType!,
                items: []
            }
            dispatch(addShoppingList(newShoppingList))
            await addItem(id_list)
            bottomSheetRef.current?.close()
            onAddSuccess()
        } else {
            await addItem(shoppingList[0].id_list)
            bottomSheetRef.current?.close()
            onAddSuccess()

        }

    }
    const onSetName = (name: string) => {
        setHouseholdName(name)
    }

    const getCategoryName = (id_category: number) => {
        const category = categories.find(category => category.id_item_type == id_category)
        return category?.item_type_name_en
    }



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
                    setStep(0)
                    setHouseholdName('')
                    setHouseholdCategory(-1)
                }
            }}
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"

        >
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