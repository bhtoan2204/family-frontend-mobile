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
import AddInfoImageSheet from 'src/assets/images/shoppinglist_assets/add_info_image_sheet.png'
import { BlurView } from 'expo-blur';
import { ShoppingList, ShoppingListItem, ShoppingListItemType } from 'src/interface/shopping/shopping_list';
import { addShoppingList, addShoppingListItem, updatePriceItem } from 'src/redux/slices/ShoppingListSlice';
import { to_vietnamese } from 'src/utils/currency-str';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';
import { handleRestore } from 'src/utils/sheet/func';



interface AddItemSheetProps {
    bottomSheetRef: React.RefObject<BottomSheet>
    id_family: number
    id_list: number
    id_shopping_list_type: number
    price: number
    id_item: number
    onUpdateSuccess: () => void
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const UpdatePriceSheet = ({
    bottomSheetRef,
    id_family,
    id_list,
    id_shopping_list_type,
    price,
    id_item,
    onUpdateSuccess
}: AddItemSheetProps) => {
    const snapPoints = React.useMemo(() => ['75%'], []);
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch<AppDispatch>()


    const [errorText, setErrorText] = React.useState('')
    const [showError, setShowError] = React.useState(false)


    const [inputPrice, setInputPrice] = React.useState<number>(price )


    const shoppingList = useSelector((state: RootState) => state.shoppinglist).shoppingList.filter(list => list.id_shopping_list_type == id_shopping_list_type)
    const listType = useSelector((state: RootState) => state.shoppinglist).shoppingListType.find(listType => listType.id_shopping_list_type == id_shopping_list_type)

    const [isKeyboardFocused, setIsKeyboardFocused] = React.useState(false)
    const isDarkMode = useSelector(getIsDarkMode)
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

    const Capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    const buildInputPrice = () => {
        return <View>

            <BottomSheetTextInput
                placeholder='Give your item a price'
                value={inputPrice.toString()}
                onChangeText={(text) => {
                    if (isNaN(Number(text))) {
                        setInputPrice(0)
                    } else {
                        setInputPrice(Number(text))
                    }
                }}
                numberOfLines={1}
                keyboardType='numeric'
                onFocus={() => {
                    setIsKeyboardFocused(true)
                }}
                onBlur={() => {
                    setIsKeyboardFocused(false)
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
            <Text style={{
                // marginVertical: 10,
                paddingVertical: screenHeight * 0.01,
                paddingHorizontal: screenWidth * 0.05,
                marginHorizontal: screenWidth * 0.05,
                // fontWeight: 'bold',
                fontSize: 15,
                color: isNaN(inputPrice) || inputPrice == 0 ? '#b0b0b0' : '#b0b0b0',
                // textTransform: 'capitalize'
            }}

            >{
                    Capitalize(to_vietnamese(inputPrice)) + ' Việt Nam Đồng'
                }</Text>
        </View>
    }

    const handleSubmit = async () => {
        Keyboard.dismiss()
        await handleRestore();
        dispatch(updatePriceItem({
            id_list: id_list,
            id_item: id_item,
            price: (inputPrice).toString(),
        }))
        bottomSheetRef.current?.close()
        onUpdateSuccess()
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            enableOverDrag={isKeyboardFocused ? false : true}
            enablePanDownToClose={isKeyboardFocused ? false : true}
            snapPoints={snapPoints}

            // handleComponent={null}
            handleIndicatorStyle={{ backgroundColor: iOSGrayColors.systemGray6.defaultLight, }}
            backdropComponent={renderBackdrop}
            onClose={() => {
                Keyboard.dismiss()
            }}
            onChange={(index) => {
                if (index == -1) {


                }
            }}
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
            backgroundStyle={{
                backgroundColor: isDarkMode ? '#0A1220' : '#f7f7f7'
            }}

        >
            <BottomSheetView className='flex-1 ' style={{
                flex: 1,
                backgroundColor: isDarkMode ? '#0A1220' : '#F7F7F7',
            }}>
                <BottomSheetScrollView className='' showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets keyboardShouldPersistTaps='handled'>

                    <View className='flex-1  mt-10'>
                        <View className='my-3 items-center'>
                            <Image source={AddInfoImageSheet} style={{ width: screenWidth * 0.2, height: screenWidth * 0.2 }} />
                        </View>
                        <View className=' items-center'>
                            <Text className='text-base font-semibold' style={{
                                color: iOSGrayColors.systemGray6.accessibleDark

                            }}>Add Item Information</Text>
                            <Text className='text-sm my-3' style={{
                                color: iOSGrayColors.systemGray6.accessibleDark

                            }}>Enter price and description for your item</Text>
                        </View>

                        {
                            buildInputPrice()
                        }

                        <View>
                            {
                                showError ? <Text className='text-center text-base text-red-500 py-3'>{errorText}</Text> : <></>
                            }
                        </View>

                        <View className='mx-[8%] mt-6 mb-12 '>
                            <TouchableOpacity style={{
                                backgroundColor: COLORS.DenimBlue,
                            }} className=' py-4 rounded-full items-center justify-center'
                                onPress={async () => {
                                    // console.log(selectDate)
                                    // await handleSubmit()
                                    // setSelectDate(new Date)
                                    // bottomSheetRef.current?.snapTo(0)
                                    handleSubmit()
                                }}
                            >
                                <Text className='text-white text-base font-semibold'>Save</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <View className='items-end pr-3 my-3 mt-12 '>
                            <TouchableOpacity className='items-center rounded-lg justify-center' style={{
                                width: screenWidth * 0.1,
                                height: screenWidth * 0.1,
                                backgroundColor: householdName != '' ? COLORS.DenimBlue : iOSGrayColors.systemGray6.defaultLight,
                            }}
                                onPress={async () => {
                                    await handleSubmit()
                                }}
                            >
                                <Material name='arrow-right' size={24} color={
                                    householdName != '' ? 'white' : iOSGrayColors.systemGray.defaultDark
                                }
                                />
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </BottomSheetScrollView>
            </BottomSheetView>

        </BottomSheet>
    )
}


export default UpdatePriceSheet