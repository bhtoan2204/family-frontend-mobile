import React, { useEffect, useRef } from 'react'
import { View, Text, Keyboard, Dimensions, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { COLORS } from 'src/constants'
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import PickImageSheet from '../household-item-stack/pick-image-sheet';
import { AppDispatch, RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { household_category_dat } from '../const/data';
import NewItemImageSheet from 'src/assets/images/household_assets/new_item_image_sheet.png'
import Camera from 'src/assets/images/household_assets/Camera.png'
import Ingredients from 'src/assets/images/household_assets/Ingredients.png'
import OpenedFolder from 'src/assets/images/household_assets/OpenedFolder.png'
import Room2 from 'src/assets/images/household_assets/Room_2.png'
import { RoomInterface } from 'src/interface/household/room';
import { HouseHoldCategoryInterface } from 'src/interface/household/household_category';

interface AddRoomSheetProps {
    bottomSheetRef: React.RefObject<BottomSheet>
    id_family: number
    pickRoomSheetRef: React.RefObject<BottomSheet>
    pickCategorySheetRef: React.RefObject<BottomSheet>
    addItemType: number
    pickedRoom: number
    pickedCategory: number
    rooms: RoomInterface[]
    categories: HouseHoldCategoryInterface[]
    // addRoomSheetRef: React.RefObject<BottomSheet>
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;



const AddItemSheet = ({
    bottomSheetRef,
    id_family,
    pickRoomSheetRef,
    pickCategorySheetRef,
    addItemType,
    pickedCategory,
    pickedRoom,
    rooms,
    categories
    // addRoomSheetRef
}: AddRoomSheetProps) => {
    const snapPoints = React.useMemo(() => ['95%'], []);

    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch<AppDispatch>()


    const [errorText, setErrorText] = React.useState('')
    const [showError, setShowError] = React.useState(false)

    const [householdName, setHouseholdName] = React.useState('')
    // const [householdCategory, setHouseholdCategory] = React.useState(
    //     addItemType == 0 ? -1 : addItemType == 1 ? pickedCategory : -1)
    // const [householdRoom, setHouseholdRoom] = React.useState(
    //     addItemType == 0 ? -1 : addItemType == 2 ? pickedRoom : -1
    // )
    const [householdCategory, setHouseholdCategory] = React.useState(-1)
    const [householdRoom, setHouseholdRoom] = React.useState(-1)
    const [imageUri, setImageUri] = React.useState('')

    // const rooms = useSelector((state: RootState) => state.room)
    // const categories = useSelector((state: RootState) => state.category)

    const pickImageSheetRef = useRef<any>(null)

    useEffect(() => {
        if (showError) {
            setTimeout(() => {
                setShowError(false)
                setErrorText('')
            }, 3000)
        }

    }, [showError])

    useEffect(() => {
        if (addItemType == 0) {
            setHouseholdCategory(-1)
            setHouseholdRoom(-1)
        } else if (addItemType == 1) {
            setHouseholdRoom(-1)
            setHouseholdCategory(pickedCategory)
        } else if (addItemType == 2) {
            setHouseholdCategory(-1)
            setHouseholdRoom(pickedRoom)
        }
    }, [addItemType])

    const renderBackdrop = React.useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} pressBehavior={
            loading ? 'none' : undefined
        } />,
        []
    );

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

    const handleSubmit = async () => {
        try {
            console.log(
                id_family,
                householdName,
                householdCategory,
                householdRoom,
                imageUri,
            )
            // setLoading(true)
            // console.log({ id_family, text, image_uri })
            // const newRoomDat = await HouseHoldService.createRoom(id_family, text, image_uri)
            // if (newRoomDat) {
            //     console.log(newRoomDat)
            //     dispatch(addRoom(newRoomDat))
            //     setLoading(false)
            //     bottomSheetRef.current?.close()
            // } else {
            //     setLoading(false)
            //     setShowError(true)
            //     setErrorText('Something went wrong')
            // }
        } catch (error) {
            console.log(error)
            setLoading(false)
            setShowError(true)
            setErrorText('Something went wrong')
        }
        // console.log({ id_family: 1, room_name: text, room_image: image_uri })
    }
    const onSetName = (name: string) => {
        setHouseholdName(name)
    }


    const findRoomText = (id: number) => {
        return rooms.find((room) => room.id_room === id)?.room_name
    }
    const findCategoryText = (id: number) => {
        return categories.find((category) => category.id_household_item_category === id)?.category_name
    }

    const buildPickCategory = () => {
        return <TouchableOpacity className=' bg-white  mt-3 justify-center rounded-lg  ' style={{
            backgroundColor: '#f5f5f5',
            borderWidth: 1.4,
            borderColor: iOSGrayColors.systemGray6.defaultLight,
            borderRadius: 10,
            marginVertical: 10,
            paddingVertical: screenHeight * 0.01,
            paddingHorizontal: screenWidth * 0.05,
            marginHorizontal: screenWidth * 0.05,
        }} onPress={() => {
            pickCategorySheetRef.current?.expand()
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
                            householdCategory == -1 ? "Choose category" : findCategoryText(householdCategory)
                        }</Text>
                </View>
            </View>
        </TouchableOpacity>
    }

    const buildPickRoom = () => {
        return <TouchableOpacity className=' bg-white  mt-3 justify-center rounded-lg  ' style={{
            backgroundColor: '#f5f5f5',
            borderWidth: 1.4,
            borderColor: iOSGrayColors.systemGray6.defaultLight,
            borderRadius: 10,
            marginVertical: 10,
            paddingVertical: screenHeight * 0.01,
            paddingHorizontal: screenWidth * 0.05,
            marginHorizontal: screenWidth * 0.05,
        }} onPress={() => {
            // roomPickRef.current?.expand()
            pickRoomSheetRef.current?.expand()
        }}>
            <View className='flex-row justify-between items-center'>
                <View className='flex-row items-center '>
                    <Image source={Room2} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
                    <Text className='pl-4' style={{
                        color: "#b0b0b0",
                        fontSize: 15,
                        // fontWeight: 500

                    }}>Choose room</Text>
                </View>
                <View className=''>
                    <Text style={{
                        color: householdRoom == -1 ? "#b0b0b0" : iOSColors.systemBlue.defaultLight,
                        fontSize: 15,

                    }}>{
                            householdRoom == -1 ? "Choose room" : findRoomText(householdRoom)
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
            enablePanDownToClose={loading ? false : true}
            snapPoints={snapPoints}

            // handleComponent={null}
            handleIndicatorStyle={{ backgroundColor: iOSGrayColors.systemGray6.defaultLight, }}
            backdropComponent={renderBackdrop}
            onClose={() => {
                Keyboard.dismiss()
            }}
            onChange={(index) => {
                console.log(householdCategory, householdRoom, householdName)
                if (index == -1) {
                    if (addItemType == 0) {
                        setHouseholdName('')
                        setHouseholdCategory(-1)
                        setHouseholdRoom(-1)
                    } else if (addItemType == 1) {
                        setHouseholdName('')
                        setHouseholdRoom(-1)
                    } else if (addItemType == 2) {
                        setHouseholdName('')
                        setHouseholdCategory(-1)
                    }
                }
            }}

        >
            <BottomSheetScrollView className='' showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets style={{

            }}>
                <View className=''>
                    <ImageBackground source={
                        imageUri ? { uri: imageUri } : NewItemImageSheet
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
                        <Image source={Ingredients} style={{ width: screenWidth * 0.2, height: screenWidth * 0.2 }} />
                    </View>
                    <View className=' items-center'>
                        <Text className='text-base font-semibold' style={{
                            color: iOSGrayColors.systemGray6.accessibleDark

                        }}>Add New Item</Text>
                        <Text className='text-sm my-3' style={{
                            color: iOSGrayColors.systemGray6.accessibleDark

                        }}>Pick a room and category for your new item</Text>
                    </View>
                    <BottomSheetTextInput
                        placeholder='Name of the item'
                        value={householdName}
                        onChangeText={(text) => {
                            onSetName(text)
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

                    {
                        addItemType == 0
                            ? buildPickCategory()
                            : addItemType == 1 ? buildPickRoom() : <></>
                    }

                    {
                        addItemType == 0
                            ? buildPickRoom()
                            : addItemType == 2 ? buildPickCategory() : <></>
                    }


                    <View>
                        {
                            showError ? <Text className='text-center text-base text-red-500 py-3'>{errorText}</Text> : <></>
                        }
                    </View>

                    <View className='items-end pr-3 my-3 mt-12 '>
                        <TouchableOpacity className='items-center rounded-lg justify-center' style={{
                            width: screenWidth * 0.1,
                            height: screenWidth * 0.1,
                            backgroundColor: householdName != '' && householdCategory != -1 && householdRoom != -1 ? COLORS.DenimBlue : iOSGrayColors.systemGray6.defaultLight,
                        }} >
                            <Material name='arrow-right' size={24} color={
                                householdName != '' && householdCategory != -1 && householdRoom != -1 ? 'white' : iOSGrayColors.systemGray.defaultDark
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

export default AddItemSheet