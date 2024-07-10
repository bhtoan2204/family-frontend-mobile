import React, { useEffect } from 'react'
import { View, Text, ScrollView, RefreshControl, Keyboard, Dimensions, Image, TouchableOpacity, TextInput, ActivityIndicator, ImageBackground } from 'react-native'
import { COLORS } from 'src/constants'
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import PickImageSheet from '../household-item-stack/pick-image-sheet';
import HouseHoldService from 'src/services/apiclient/HouseHoldService';
import { AppDispatch } from 'src/redux/store';
import { useDispatch } from 'react-redux';
import { addRoom } from 'src/redux/slices/RoomSlice';

import NewCategoryImageSheet from 'src/assets/images/household_assets/new_category_image_sheet.png'
import OpenedFolder from 'src/assets/images/household_assets/OpenedFolder.png'
import Camera from 'src/assets/images/household_assets/Camera.png'
import { HouseHoldCategoryInterface } from 'src/interface/household/household_category';
import { addCategories } from 'src/redux/slices/CategorySlice';

interface AddRoomSheetProps {
    bottomSheetRef: React.RefObject<BottomSheet>
    id_family: number
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const AddCategorySheet = ({
    bottomSheetRef,
    id_family
}: AddRoomSheetProps) => {
    const snapPoints = React.useMemo(() => ['95%'], []);
    const [text, setText] = React.useState('')
    const [imageUri, setImageUri] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch<AppDispatch>()

    const [errorText, setErrorText] = React.useState('')
    const [showError, setShowError] = React.useState(false)

    const pickImageSheetRef = React.useRef<any>(null)

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
        try {
            setLoading(true)
            console.log({ id_family, text, imageUri })
            // const newRoomDat = await HouseHoldService.createRoom(id_family, text, imageUri)
            const newCategoryDat: HouseHoldCategoryInterface = {
                category_image: imageUri,
                category_name: text,
                id_household_item_category: Math.floor(Math.random() * 1000),
            }
            if (newCategoryDat) {
                console.log(newCategoryDat)
                dispatch(addCategories(newCategoryDat))
                setLoading(false)
                bottomSheetRef.current?.close()
            } else {
                setLoading(false)
                setShowError(true)
                setErrorText('Something went wrong')
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            setShowError(true)
            setErrorText('Something went wrong')
        }
        // console.log({ id_family: 1, room_name: text, room_image: image_uri })
    }

    const handleTakePhoto = async () => {
        console.log("Take photo")
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status === 'granted') {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [3, 3],
                quality: 1,
            });

            if (!result.canceled) {
                const fileSize = result.assets[0].fileSize! * (10 ** -6)
                console.log(fileSize);
                if (fileSize > 10) {
                    setShowError(true)
                    setErrorText('Image size too large')
                } else {
                    setImageUri(result.assets[0].uri)
                }

            }
            pickImageSheetRef.current?.close()
        } else {
            alert('Permission to access camera was denied');
        }
    }

    const handlePickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === 'granted') {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [3, 3],
                quality: 1,
            });

            if (!result.canceled) {
                const fileSize = result.assets[0].fileSize! * (10 ** -6)
                console.log(fileSize);
                if (fileSize > 10) {
                    setShowError(true)
                    setErrorText('Image size too large')
                } else {
                    setImageUri(result.assets[0].uri)
                }

            }
            pickImageSheetRef.current?.close()
        }
        else {
            alert('Permission to access camera was denied');
        }
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            enableOverDrag={true}
            enablePanDownToClose={loading ? false : true}
            snapPoints={snapPoints}

            // handleComponent={null}
            handleIndicatorStyle={{ backgroundColor: iOSGrayColors.systemGray6.defaultLight, }}
            backdropComponent={renderBackdrop}
            onClose={() => {
                Keyboard.dismiss()
            }}
            onChange={(index) => {
                console.log(index)
                if (index == -1) {
                    setText('')
                    setImageUri('')
                }
            }}

        >
            {/* <>
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
            </> */}
            <BottomSheetScrollView className='flex-1' automaticallyAdjustKeyboardInsets keyboardShouldPersistTaps='handled'
                style={{
                    backgroundColor: '#f7f7f7',
                }}>

                <View className='flex-1'>
                    <ImageBackground source={
                        imageUri != '' ? { uri: imageUri } : NewCategoryImageSheet
                    } style={{ width: '100%', height: Dimensions.get('screen').height * 0.3 }} className='rounded-lg ' resizeMethod='resize' resizeMode='cover'>
                        <TouchableOpacity className=' rounded-lg items-center justify-center' style={{ width: '100%', height: Dimensions.get('screen').height * 0.3 }} activeOpacity={0.6} onPress={() => {
                            pickImageSheetRef.current?.open()
                        }}>

                            <View className="items-center justify-center w-full h-full ">
                                {/* <View className='my-2'>
                                    <Material name="camera-iris" size={30} style={{ color: "white", fontWeight: "bold" }} />
                                </View>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: 'white'
                                }}>Add Image</Text> */}
                                <Image source={Camera} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
                            </View>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <View className='flex-1 '>
                    <View className='my-3 items-center'>
                        <Image source={OpenedFolder} style={{ width: screenWidth * 0.2, height: screenWidth * 0.2 }} />
                    </View>
                    <View className=' items-center'>
                        <Text className='text-base font-semibold' style={{
                            color: iOSGrayColors.systemGray6.accessibleDark

                        }}>Add New Category</Text>
                        <Text className='text-sm my-3' style={{
                            color: iOSGrayColors.systemGray6.accessibleDark

                        }}>Type in the new category for your categories list</Text>
                    </View>
                    <BottomSheetTextInput
                        placeholder='Give your new category a name'
                        value={text}
                        onChangeText={(text) => {
                            setText(text)
                        }}
                        // className='rounded-lg'
                        style={{
                            backgroundColor: '#f5f5f5',
                            borderWidth: 1.4,
                            borderColor: iOSGrayColors.systemGray6.defaultLight,
                            borderRadius: 10,
                            marginVertical: 10,
                            paddingVertical: screenHeight * 0.02,
                            paddingHorizontal: screenWidth * 0.05,
                            marginHorizontal: screenWidth * 0.05,
                            // fontWeight: 'bold',
                            fontSize: 15,
                            color: '#b0b0b0'
                        }}
                    />
                    <View>
                        {
                            showError ? <Text className='text-center text-base text-red-500 py-3'>{errorText}</Text> : <></>
                        }
                    </View>

                    <View className='flex-1  items-end pr-6 my-3 mt-12 '>
                        <TouchableOpacity className='items-center rounded-lg justify-center' style={{
                            width: screenWidth * 0.1,
                            height: screenWidth * 0.1,
                            backgroundColor: text != '' && imageUri != "" ? COLORS.DenimBlue : iOSGrayColors.systemGray6.defaultLight,
                        }}
                            onPress={async () => {
                                await handleSubmit()
                            }}
                            disabled={text == '' || imageUri == ''}
                        >
                            <Material name='arrow-right' size={24} color={
                                text != '' && imageUri != "" ? 'white' : iOSGrayColors.systemGray.defaultDark
                            }
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheetScrollView>
            <PickImageSheet bottomSheetRef={pickImageSheetRef} handlePickImage={handlePickImage} handleTakePhoto={handleTakePhoto} />
        </BottomSheet>
    )
}

export default AddCategorySheet