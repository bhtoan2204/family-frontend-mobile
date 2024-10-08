import React, { useEffect } from 'react'
import { View, Text, Keyboard, Dimensions, Image, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native'
import { COLORS } from 'src/constants'
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetTextInput, } from '@gorhom/bottom-sheet';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';

import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import HouseHoldService from 'src/services/apiclient/HouseHoldService';
import { AppDispatch } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addRoom } from 'src/redux/slices/RoomSlice';

import NewRoomImageSheet from 'src/assets/images/household_assets/new_room_image_sheet.png'
import Camera from 'src/assets/images/household_assets/Camera.png'
import Room2 from 'src/assets/images/household_assets/Room_2.png'
import EditConsumableImage from 'src/assets/images/household_assets/edit_consumable_sheet_img.png'
import { updateComsumableItem } from 'src/redux/slices/HouseHoldDetailSlice';
import { handleRestore } from 'src/utils/sheet/func';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';
import { useToast } from 'react-native-toast-notifications';
import { getTranslate } from 'src/redux/slices/languageSlice';

interface AddEditConsumableSheetProps {
    bottomSheetRef: React.RefObject<BottomSheet>
    id_family: number,
    id_item: number,
    updateExpiredDateSheet: React.RefObject<BottomSheet>
    consumableItem: {
        id_household_item: number;
        quantity: number;
        threshold: number;
        expired_date: string;
    } | null,
    expired_date: string
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const AddEditConsumableSheet = ({
    bottomSheetRef,
    id_family,
    id_item,
    updateExpiredDateSheet,
    consumableItem,
    expired_date
}: AddEditConsumableSheetProps) => {
    const snapPoints = React.useMemo(() => ['95%'], []);
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch<AppDispatch>()

    const [errorText, setErrorText] = React.useState('')
    const [showError, setShowError] = React.useState(false)

    const [quantity, setQuantity] = React.useState(consumableItem ? consumableItem.quantity : 0)
    const [threshhold, setThreshhold] = React.useState(consumableItem ? consumableItem.threshold : 0)
    const isDarkMode = useSelector(getIsDarkMode)
    const translate = useSelector(getTranslate)

    const toast = useToast()

    useEffect(() => {
        if (showError) {
            setTimeout(() => {
                setShowError(false)
                setErrorText('')
            }, 3000)
        }

    }, [showError])

    useEffect(() => {
        // setInputDescription(title)
        setQuantity(consumableItem ? consumableItem.quantity : 0)
        setThreshhold(consumableItem ? consumableItem.threshold : 0)
    }, [consumableItem])


    const renderBackdrop = React.useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} pressBehavior={
            loading ? 'none' : undefined
        } />,
        []
    );

    const CallApi = async ({
        id_household_item,
        id_family,
        quantity,
        threshold,
        expired_date
    }: {
        id_household_item: number,
        id_family: number,
        quantity: number,
        threshold: number,
        expired_date: string
    }) => {
        // console.log("CallApi", id_household_item, id_family, image_uri, title, description)
        console.log("CallApi", id_household_item, id_family, quantity, threshold, expired_date)
        const res = await HouseHoldService.updateConsumableItem(
            id_household_item,
            id_family,
            quantity,
            expired_date,
            threshold,
        )
        if (res) {
            toast.show('Update successfully', {
                type: 'success',
                duration: 3000,
                icon: <Material name='check' size={24} color='white' />
            })
            bottomSheetRef.current?.close()
        } else {
            // toast.show('Update failed', {
            //     type: 'error',
            //     duration: 3000,
            //     icon: <Material name='close' size={24} color='white' />
            // })
        }
    }

    const handleSubmit = async () => {
        Keyboard.dismiss()
        await handleRestore()
        try {

            dispatch(updateComsumableItem({
                id_household_item: id_item,
                quantity: quantity,
                threshold: threshhold,
                expired_date: expired_date
            }))
            setLoading(true)
            await CallApi({
                id_household_item: id_item,
                id_family: id_family,
                quantity: quantity,
                threshold: threshhold,
                expired_date: expired_date
            })
            setLoading(false)
            bottomSheetRef.current?.close()
        } catch (error) {
            console.log(error)
            setLoading(false)
            setShowError(true)
            setErrorText('Something went wrong')
        }
        // console.log({ id_family: 1, room_name: text, room_image: image_uri })
    }

    const buildAddQuantity = () => {
        return <BottomSheetTextInput
            placeholder={consumableItem ? 'Edit' + translate('household_detail_quantity_text') : translate('household_detail_quantity_text')}
            keyboardType='numeric'
            value={quantity.toString()}
            onChangeText={(text) => {
                if (isNaN(parseInt(text))) {
                    setQuantity(0)
                }
                else setQuantity(parseInt(text))
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
    }

    const buildAddThreshhold = () => {
        return <BottomSheetTextInput
            placeholder={consumableItem ? 'Edit' + translate('household_detail_threshold_text') : translate('household_detail_threshold_text')}
            keyboardType='numeric'
            value={threshhold.toString()}
            onChangeText={(text) => {
                if (isNaN(parseInt(text))) {
                    setThreshhold(0)
                }
                else setThreshhold(parseInt(text))
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
    }

    const buildAddExpiredDate = () => {
        return <TouchableOpacity className=' bg-white  mt-3 justify-center rounded-lg  ' style={{
            backgroundColor: !isDarkMode ? '#f5f5f5' : '#171A21',
            borderWidth: !isDarkMode ? 1 : 1.5,
            borderColor: !isDarkMode ? '#DEDCDC' : '#66C0F4',
            borderRadius: 10,
            marginVertical: 10,
            paddingVertical: screenHeight * 0.02,
            paddingHorizontal: screenWidth * 0.05,
            marginHorizontal: screenWidth * 0.05,
        }} onPress={() => {
            Keyboard.dismiss()
            updateExpiredDateSheet.current?.expand()
            // roomPickRef.current?.expand()
            // pickRoomSheetRef.current?.expand()
        }}>
            <View className='flex-row justify-between items-center'>
                <View className='flex-row items-center '>
                    <Text className='' style={{
                        color: "#b0b0b0",
                        fontSize: 15,
                        // fontWeight: 500

                    }}>{
                            expired_date ? expired_date : 'Give your item a expired date'
                        }</Text>
                </View>

            </View>
        </TouchableOpacity>
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            enableOverDrag={true}
            // enablePanDownToClose={loading ? false : true}
            enableDynamicSizing={true}
            // snapPoints={snapPoints}

            // handleComponent={null}
            handleIndicatorStyle={{ backgroundColor: iOSGrayColors.systemGray6.defaultLight, }}
            backgroundStyle={{
                backgroundColor: isDarkMode ? '#0A1220' : '#F7F7F7',
            }}
            backdropComponent={renderBackdrop}
            keyboardBehavior='interactive'
            keyboardBlurBehavior='restore'
            android_keyboardInputMode='adjustResize'
            onClose={() => {
                Keyboard.dismiss()
            }}
            onChange={(index) => {
                console.log(index)
                if (index == -1) {

                }
            }}

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

            <BottomSheetScrollView className='flex-1 ' automaticallyAdjustKeyboardInsets
                keyboardShouldPersistTaps='handled'
                style={{
                    backgroundColor: isDarkMode ? '#0A1220' : '#F7F7F7',
                }}
            >
                <View className='flex-1 bg-[#F7F7F7] dark:bg-[#0A1220]'>
                    <View className='my-3 items-center'>
                        <Image source={EditConsumableImage} style={{ width: screenWidth * 0.2, height: screenWidth * 0.2 }} />
                    </View>
                    <View className=' items-center'>
                        <Text className='text-base font-semibold text-[#2A475E] dark:text-white' >{
                            consumableItem ? translate('household_detail_edit_consumable_title') : translate('household_detail_add_consumable_title')
                        }
                        </Text>
                        <Text className='text-sm my-3 text-[#2A475E] dark:text-[#8D94A5]' >{
                            consumableItem ? translate('household_detail_edit_consumable_description') : translate('household_detail_add_consumable_description')
                        }</Text>
                    </View>
                    {
                        buildAddQuantity()
                    }
                    {
                        buildAddThreshhold()
                    }
                    {
                        buildAddExpiredDate()
                    }
                    <View>
                        {
                            showError ? <Text className='text-center text-base text-red-500 py-3'>{errorText}</Text> : <></>
                        }
                    </View>
                    <View className='flex-1  items-end pr-6 my-3 mt-12 '>
                        <TouchableOpacity className='items-center rounded-lg justify-center' style={{
                            width: screenWidth * 0.1,
                            height: screenWidth * 0.1,
                            backgroundColor: COLORS.DenimBlue,
                        }}
                            onPress={async () => {
                                await handleSubmit()
                            }}
                        >
                            <Material name='arrow-right' size={24} color={
                                'white'
                            }
                            />
                        </TouchableOpacity>
                    </View>

                </View>
            </BottomSheetScrollView>
        </BottomSheet>
    )
}


export default AddEditConsumableSheet