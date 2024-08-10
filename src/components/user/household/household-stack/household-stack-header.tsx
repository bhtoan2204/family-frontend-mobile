import React from 'react'
import { HouseHoldItemDetailInterface } from 'src/interface/household/household_item_detail'
import { View, Text, Image, Dimensions, TouchableOpacity, ImageBackground } from 'react-native'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuOptionsCustomStyle,

} from 'react-native-popup-menu';
import { COLORS } from 'src/constants'
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color'
import { BlurView } from 'expo-blur'
import ImageComponent from 'src/components/Image/Image'
import FamilyImage from 'src/assets/images/household_assets/add_room.png'
import { gradients_list } from 'src/assets/images/gradients'
import * as ImagePicker from 'expo-image-picker';
import HouseHoldService from 'src/services/apiclient/HouseHoldService'
import PickImageSheet from '../household-item-stack/pick-image-sheet'
import { updateRoom } from 'src/redux/slices/HouseHoldDataSlice'
import BottomSheet from '@gorhom/bottom-sheet'
import { useToast } from 'react-native-toast-notifications'

interface HouseHoldStackHeaderProps {
    imageUrl?: string
    idFamily: number
    type: number;
    pickedRoom: number;
    pickedCategory: number;
    handleEditImage?: () => void
    handleEditTitle?: () => void
    handleDeleteItem?: () => void
    navigationBack?: () => void
    onUpdateRoomImageSuccess?: () => void
    onUpdateRoomImageFailed?: () => void
    editRoomNameSheetRef: React.RefObject<BottomSheet>
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Divider = () => {
    return (
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#7F8487', opacity: 0.3 }} />
    )
}

const HouseHoldStackHeader = ({
    imageUrl, idFamily, handleEditImage, handleEditTitle, handleDeleteItem, navigationBack,
    pickedCategory, pickedRoom, type, editRoomNameSheetRef
}: HouseHoldStackHeaderProps) => {
    console.log("type", type)
    const pickPhotoSheetRef = React.useRef<any>()
    const dispatch = useDispatch<AppDispatch>()
    const toast = useToast()
    console.log(pickedCategory, pickedRoom)
    const handleSubmitPhoto = React.useCallback(async (uri: string) => {
        if (pickedCategory == -1 && pickedRoom != -1) {
            console.log({
                id_family: idFamily,
                id_room: pickedRoom,
                room_image: uri
            })
            console.log(1)
            const res = await HouseHoldService.updateRoom(idFamily, pickedRoom, null, uri)
            // console.log(2)
            if (res) {
                dispatch(updateRoom({
                    id_family: idFamily,
                    id_room: pickedRoom,
                    room_image: uri
                }))
                toast.show("Update image successfully", {
                    type: 'success',
                    duration: 3000
                })
            } else {
                toast.show("Update image failed", {
                    type: 'error',
                    duration: 3000
                })
            }


        }

    }, [idFamily, pickedRoom, pickedCategory])

    const handleTakePhoto = React.useCallback(async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status === 'granted') {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [3, 3],
                quality: 1,
            });

            if (!result.canceled) {
                await handleSubmitPhoto(result.assets[0].uri)
            }
            pickPhotoSheetRef.current?.close()
        } else {
            alert('Permission to access camera was denied');
        }
    }, [idFamily, pickedRoom, pickedCategory])

    const handlePickImage = React.useCallback(async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === 'granted') {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [3, 3],
                quality: 1,
            });

            if (!result.canceled) {
                await handleSubmitPhoto(result.assets[0].uri)

            }
            pickPhotoSheetRef.current?.close()
        }
        else {
            alert('Permission to access camera was denied');
        }
    }, [idFamily, pickedRoom, pickedCategory])

    const handleOpenUpdateSheet = React.useCallback(() => {
        if (pickedCategory == -1 && pickedRoom != -1) {
            editRoomNameSheetRef.current?.expand()
        }
    }, [pickedCategory, pickedRoom])

    return (
        <>
            <ImageBackground
                source={imageUrl ? { uri: imageUrl } : gradients_list[idFamily % gradients_list.length]}
                style={{ width: screenWidth, height: screenHeight * 0.3 }}
            >
                <View className='w-full absolute z-10 flex-row justify-between items-center py-3 mt-5'>
                    <BlurView intensity={35} tint='dark' className=' ml-1 rounded-lg overflow-hidden'>
                        <TouchableOpacity onPress={navigationBack} className=' flex-row items-center'>
                            <Material name="chevron-left" size={30} style={{ color: "white", fontWeight: "bold" }} />
                            {/* <Text className='text-lg font-semibold text-gray-600' style={{ color: COLORS.AliceBlue }}>Back</Text> */}
                        </TouchableOpacity>

                    </BlurView>

                    <BlurView intensity={35} tint='dark' className='px-3 overflow-hidden rounded-lg '>
                        <View >
                            <Text className='text-lg font-semibold text-white' >HouseHold</Text>
                        </View>
                    </BlurView>


                    <BlurView intensity={35} tint='dark' className='flex-row items-center  mr-1 rounded-lg overflow-hidden'>
                        <Menu >
                            <MenuTrigger>
                                <View className=''>
                                    <Material name="dots-horizontal" size={29} style={{ color: 'white', fontWeight: "bold" }} />
                                </View>
                            </MenuTrigger>
                            <MenuOptions customStyles={optionsStyles} >
                                {
                                    type == 2 && pickedRoom != -1 && pickedCategory == -1 ? <>
                                        <MenuOption onSelect={() => {
                                            // handleIsAddingStep()
                                            // handleEditImage()
                                            pickPhotoSheetRef.current?.open()
                                        }} >

                                            <View className='flex-row items-center justify-between'>
                                                <Text className='text-base' style={{ color: iOSGrayColors.systemGray.defaultLight }}>Edit Image</Text>
                                                <Material name="pencil" size={20} style={{ color: iOSGrayColors.systemGray.defaultLight, fontWeight: "bold" }} />
                                            </View>
                                        </MenuOption>
                                        <Divider />
                                    </> : <></>
                                }
                                {
                                    type == 2 && pickedRoom != -1 && pickedCategory == -1 ? <>
                                        <MenuOption onSelect={() => {
                                            // setIsEditing(true)
                                            handleOpenUpdateSheet()
                                        }} >
                                            <View className='flex-row items-center justify-between'>
                                                <Text className='text-base' style={{ color: iOSGrayColors.systemGray.defaultLight }}>Edit name</Text>
                                                <Material name="pencil" size={20} style={{ color: iOSGrayColors.systemGray.defaultLight, fontWeight: "bold" }} />
                                            </View>
                                        </MenuOption>

                                        <Divider />
                                    </> : <></>
                                }
                                {
                                    type == 2 && pickedRoom != -1 && pickedCategory == -1 ? <>
                                        <MenuOption onSelect={async () => {
                                        }} >
                                            <View className='flex-row items-center justify-between'>
                                                <Text className='text-base ' style={{ color: iOSColors.systemRed.defaultLight }}>Delete</Text>
                                                <Material name="trash-can-outline" size={20} style={{ color: iOSColors.systemRed.defaultLight, fontWeight: "bold" }} />
                                            </View>
                                        </MenuOption>
                                        <Divider />
                                    </> : <></>
                                }
                            </MenuOptions>
                        </Menu>

                    </BlurView>
                </View>
            </ImageBackground>

            <PickImageSheet bottomSheetRef={pickPhotoSheetRef} handleTakePhoto={handleTakePhoto} handlePickImage={handlePickImage} />

        </>

    )
}

const optionsStyles: MenuOptionsCustomStyle = {
    optionsContainer: {
        borderRadius: 10,
        marginTop: screenHeight * 0.04,
        // backgroundColor: 'white',
        // opacity: 0.9,
    },
    optionWrapper: {
        padding: 10,
    },

};

export default HouseHoldStackHeader