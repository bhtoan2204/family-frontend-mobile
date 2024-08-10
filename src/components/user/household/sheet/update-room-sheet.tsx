import React, { useEffect } from 'react'
import { View, Text, Keyboard, Dimensions, Image, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native'
import { COLORS } from 'src/constants'
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetTextInput, } from '@gorhom/bottom-sheet';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';

import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import HouseHoldService from 'src/services/apiclient/HouseHoldService';
import { AppDispatch, RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addRoom } from 'src/redux/slices/RoomSlice';

import NewRoomImageSheet from 'src/assets/images/household_assets/new_room_image_sheet.png'
import Camera from 'src/assets/images/household_assets/Camera.png'
import Room2 from 'src/assets/images/household_assets/Room_2.png'
import EditDescriptionImage from 'src/assets/images/household_assets/edit_description_sheet_img.png'
import { updateDescription } from 'src/redux/slices/HouseHoldDetailSlice';
import { handleRestore } from 'src/utils/sheet/func';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';
import { useToast } from 'react-native-toast-notifications';
import { updateRoom } from 'src/redux/slices/HouseHoldDataSlice';
import { getTranslate } from 'src/redux/slices/languageSlice';

interface AddEditDescriptionSheetProps {
    bottomSheetRef: React.RefObject<BottomSheet>
    id_family: number,
    id_room: number,

}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const EditRoomNameSheet = ({
    bottomSheetRef,
    id_family,
    id_room,
}: AddEditDescriptionSheetProps) => {
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const toast = useToast()
    const [errorText, setErrorText] = React.useState('')
    const [showError, setShowError] = React.useState(false)
    const householdItem = useSelector((state: RootState) => state.household).rooms.find(room => room.id_room == id_room)
    const [inputName, setInputName] = React.useState(householdItem?.room_name ? householdItem.room_name ? householdItem.room_name : '' : '')
    const isDarkMode = useSelector(getIsDarkMode)
    const translate = useSelector(getTranslate)

    useEffect(() => {
        if (showError) {
            setTimeout(() => {
                setShowError(false)
                setErrorText('')
            }, 3000)
        }

    }, [showError])

    useEffect(() => {
        if (id_room != -1) {
            setInputName(
                householdItem?.room_name ? householdItem.room_name ? householdItem.room_name : '' : ''
            )
        }
    }, [id_room])

    const renderBackdrop = React.useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} pressBehavior={
            loading ? 'none' : undefined
        } />,
        []
    );

    const CallApi = async ({
        id_household_item,
        id_family,
        room_name,
        uri
    }: {
        id_household_item: number,
        id_family: number,
        room_name: string,
        uri: string | null
    }) => {
        console.log("CallApi", id_household_item, id_family, room_name)
        // await HouseHoldService.updateRoom(idFamily, pickedRoom, null, uri)
        const res = await HouseHoldService.updateRoom(
            id_family,
            id_room,
            room_name,
            null
        )
        if (res) {

            toast.show('Update successfully', {
                type: 'success',
                duration: 3000,
                icon: <Material name='check' size={24} color='white' />
            })
            bottomSheetRef.current?.close()
        } else {
            toast.show('Update failed', {
                type: 'error',
                duration: 3000,
                icon: <Material name='close' size={24} color='white' />
            })
        }
    }


    const handleSubmit = async () => {
        Keyboard.dismiss()
        await handleRestore()
        try {

            setLoading(true)
            await CallApi({
                id_family: id_family!,
                id_household_item: id_room!,
                room_name: inputName,
                uri: null
            })
            dispatch(updateRoom(
                {
                    id_family: id_family!,
                    id_room: id_room!,
                    room_name: inputName,
                }
            ))
            setLoading(false)


        } catch (error) {
            console.log(error)
            setLoading(false)
            setShowError(true)
            setErrorText('Something went wrong')
        }
    }

    const buildAddDesc = () => {
        return <BottomSheetTextInput
            placeholder='Give your item a description'
            value={inputName}
            onChangeText={(text) => {
                setInputName(text)
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



    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            enableOverDrag={true}
            enablePanDownToClose={loading ? false : true}
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

            <BottomSheetScrollView className='flex-1 bg-[#F7F7F7] dark:bg-[#0A1220]'
                automaticallyAdjustKeyboardInsets
                keyboardShouldPersistTaps='handled'
                style={{
                    backgroundColor: isDarkMode ? '#0A1220' : '#F7F7F7',
                }}
            >
                <View className='flex-1 '>
                    <View className='my-3 items-center'>
                        <Image source={EditDescriptionImage} style={{ width: screenWidth * 0.2, height: screenWidth * 0.2 }} />
                    </View>
                    <View className=' items-center'>
                        <Text className='text-base font-semibold text-[#2A475E] dark:text-white' >{
                            translate('household_detail_edit_description_title')
                        }</Text>
                        <Text className='text-sm my-3 text-[#2A475E] dark:text-[#8D94A5]' >{
                            translate('household_detail_edit_description_description')
                        }</Text>
                    </View>
                    {
                        buildAddDesc()
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
                            backgroundColor: inputName != '' ? COLORS.DenimBlue : iOSGrayColors.systemGray6.defaultLight,
                        }}
                            onPress={async () => {
                                await handleSubmit()
                            }}
                        >
                            <Material name='arrow-right' size={24} color={
                                inputName != '' ? 'white' : iOSGrayColors.systemGray.defaultDark
                            }
                            />
                        </TouchableOpacity>
                    </View>

                </View>
            </BottomSheetScrollView>
        </BottomSheet>
    )
}


export default EditRoomNameSheet