import React, { useEffect, useRef } from 'react'
import { View, Text, Keyboard, Dimensions, Image, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native'
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
import { HouseHoldItemInterface } from 'src/interface/household/household_item';
// import { addHouseholdItem } from 'src/redux/slices/HouseHoldSlice';
import HouseHoldService from 'src/services/apiclient/HouseHoldService';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';
import { handleRestore } from 'src/utils/sheet/func';
import { getTranslate } from 'src/redux/slices/languageSlice';
import { addHouseholdItem } from 'src/redux/slices/HouseHoldDataSlice';

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
    resetPickedRoom: () => void
    resetPickedCategory: () => void
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
    categories,
    resetPickedRoom,
    resetPickedCategory,

    // type,
    // setPickedType,
    // addRoomSheetRef
}: AddRoomSheetProps) => {
    const snapPoints = React.useMemo(() => ['95%'], []);

    const dispatch = useDispatch<AppDispatch>()
    const [loading, setLoading] = React.useState(false)


    const [errorText, setErrorText] = React.useState('')
    const [showError, setShowError] = React.useState(false)

    const [householdName, setHouseholdName] = React.useState('')
    const [householdCategory, setHouseholdCategory] = React.useState(-1)
    const [householdRoom, setHouseholdRoom] = React.useState(-1)
    const [householdType, setHouseholdType] = React.useState<"consumable" | "durable">("consumable")
    const [isExpanded, setIsExpanded] = React.useState(false)

    const [imageUri, setImageUri] = React.useState('')
    const isDarkMode = useSelector(getIsDarkMode)
    const translate = useSelector(getTranslate)
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
    }, [])

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
    }, [])

    const handleSubmit = async (
        id_family: number,
        imageUri: string,
        householdName: string,
        pickedCategory: number,
        pickedRoom: number,
        pickedType: "consumable" | "durable"
    ) => {
        try {
            Keyboard.dismiss()
            await handleRestore()
            setLoading(true)
            console.log("submitting")
            console.log("id_family", id_family)
            console.log("imageUri", imageUri)
            console.log("householdName", householdName)
            console.log("pickedCategory", pickedCategory)
            console.log("pickedRoom", pickedRoom)
            console.log("pickedType", pickedType)


            const data = await HouseHoldService.createHouseholdItem(id_family, imageUri, householdName, pickedCategory, "", pickedRoom, pickedType)
            if (data) {
                const newItem: HouseHoldItemInterface = {
                    id_household_item: data.id_household_item,
                    item_name: householdName,
                    id_category: pickedCategory,
                    id_room: pickedRoom,
                    item_imageurl: imageUri,
                    room: rooms.find((room) => room.id_room === pickedRoom),
                    category: categories.find((category) => category.id_household_item_category === pickedCategory),
                    description: '',
                    id_family: id_family,
                    durableItem: pickedType == 'durable' ? {
                        id_household_item: data.id_household_item,
                        condition: "good"
                    } : undefined,
                    consumableItem: pickedType == 'consumable' ? {
                        id_household_item: data.id_household_item,
                        quantity: 0,
                        threshold: 0,
                        expired_date: null
                    } : undefined
                }
                if (addItemType == 0) {
                    setHouseholdCategory(-1)
                    setHouseholdRoom(-1)
                } else if (addItemType == 1) {
                    setHouseholdRoom(-1)
                    resetPickedRoom()
                    setHouseholdCategory(pickedCategory)
                } else if (addItemType == 2) {
                    setHouseholdCategory(-1)
                    resetPickedCategory()
                    setHouseholdRoom(pickedRoom)
                }
                console.log("new item ne", newItem)
                dispatch(addHouseholdItem(newItem))
                setLoading(false)
                bottomSheetRef.current?.close()

            } else {
                bottomSheetRef.current?.close()

            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            setShowError(true)
            setErrorText('Something went wrong')
        }
    }

    const onSetName = React.useCallback((name: string) => {
        setHouseholdName(name)
    }, [])

    const findRoomText = React.useCallback((id: number) => {
        return rooms.find((room) => room.id_room === id)?.room_name
    }, [rooms])

    const findCategoryText = React.useCallback((id: number) => {
        return categories.find((category) => category.id_household_item_category === id)?.category_name
    }, [categories])

    const buildPickCategory = React.useCallback(() => {
        return <TouchableOpacity className=' bg-white  mt-3 justify-center rounded-lg  ' style={{
            backgroundColor: !isDarkMode ? '#f5f5f5' : '#171A21',
            borderWidth: !isDarkMode ? 1 : 1.5,
            borderColor: !isDarkMode ? '#DEDCDC' : '#66C0F4',
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

                    }}>{
                            translate('Category')
                        }</Text>
                </View>
                <View className=''>
                    <Text style={{
                        color: pickedCategory == -1 ? "#b0b0b0" : iOSColors.systemBlue.defaultLight,
                        fontSize: 15,

                    }}>{
                            pickedCategory == -1 ? translate('choose_category_text') : findCategoryText(pickedCategory)
                        }</Text>
                </View>
            </View>
        </TouchableOpacity>
    }, [
        pickCategorySheetRef,
        pickedCategory,
        findCategoryText,
        isDarkMode,
        translate
    ])


    const buildPickRoom = React.useCallback(() => {
        return <TouchableOpacity className=' bg-white mt-3 justify-center rounded-lg  ' style={{
            backgroundColor: !isDarkMode ? '#f5f5f5' : '#171A21',
            borderWidth: !isDarkMode ? 1 : 1.5,
            borderColor: !isDarkMode ? '#DEDCDC' : '#66C0F4',
            borderRadius: 10,
            marginVertical: 10,
            paddingVertical: screenHeight * 0.01,
            paddingHorizontal: screenWidth * 0.05,
            marginHorizontal: screenWidth * 0.05,
        }} onPress={() => {
            pickRoomSheetRef.current?.expand()
        }}>
            <View className='flex-row justify-between items-center'>
                <View className='flex-row items-center '>
                    <Image source={Room2} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
                    <Text className='pl-4' style={{
                        color: "#b0b0b0",
                        fontSize: 15,
                        // fontWeight: 500

                    }}>{
                            translate('household_room_text')
                        }</Text>
                </View>
                <View className=''>
                    <Text style={{
                        color: pickedRoom == -1 ? "#b0b0b0" : iOSColors.systemBlue.defaultLight,
                        fontSize: 15,

                    }}>{
                            pickedRoom == -1 ? translate('choose_room_text') : findRoomText(pickedRoom)
                        }</Text>
                </View>
            </View>
        </TouchableOpacity>
    }, [
        isDarkMode,
        translate,
        pickedRoom,
        findRoomText,
    ])


    const buildPickType = React.useCallback(() => {
        return <>
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
                setIsExpanded(prev => !prev)
                console.log(householdType)
            }}>
                <View className='flex-row justify-between items-center'>
                    <View className='flex-row  items-center py-3'>
                        {/* <Image source={OpenedFolder} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} /> */}
                        <Text className='' style={{
                            color: "#b0b0b0",
                            fontSize: 15,

                        }}>Item Type</Text>
                    </View>
                    <View className=''>
                        <Text style={{
                            color: iOSColors.systemBlue.defaultLight,
                            fontSize: 15,

                        }}>{
                                householdType == 'consumable' ? 'Consumable' : 'Durable'
                            }</Text>
                    </View>
                </View>
            </TouchableOpacity>
            {
                isExpanded && <View className=' bg-white  mt-3 justify-center rounded-lg py-4 ' style={{
                    backgroundColor: !isDarkMode ? '#f5f5f5' : '#171A21',
                    borderWidth: !isDarkMode ? 1 : 1.5,
                    borderColor: !isDarkMode ? '#DEDCDC' : '#66C0F4',
                    borderRadius: 10,
                    marginVertical: 10,
                    paddingVertical: screenHeight * 0.01,
                    paddingHorizontal: screenWidth * 0.05,
                    marginHorizontal: screenWidth * 0.05,
                }}>
                    <TouchableOpacity onPress={() => {
                        const type = householdType == 'consumable' ? 'durable' : 'consumable'
                        console.log(type)
                        setHouseholdType(type)
                        // setHouseholdType((prev) => {
                        //     console.log(prev)
                        //     return prev == 'consumable' ? 'durable' : 'consumable'

                        // },)
                        setIsExpanded(false)
                    }}>
                        <Text className='' style={{
                            color: iOSColors.systemBlue.defaultLight,
                            fontSize: 15,
                        }}>{
                                householdType == 'consumable' ? 'Durable' : 'Consumable'
                            }</Text>
                    </TouchableOpacity>
                </View>
            }

        </>
    }, [
        isDarkMode,
        translate,
        householdType,
        isExpanded
    ])

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
            onClose={() => {
                Keyboard.dismiss()
            }}
            onChange={(index) => {
                console.log(householdCategory, householdRoom, householdName)
                if (index == -1) {
                    setImageUri('')
                    setHouseholdName('')
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
            keyboardBehavior='interactive'
            keyboardBlurBehavior='restore'

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
            <BottomSheetScrollView className='' showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets style={{
                backgroundColor: !isDarkMode ? '#f7f7f7' : '#0A1220',
            }}>
                <View className=''>
                    <ImageBackground source={
                        imageUri ? { uri: imageUri } : NewItemImageSheet
                    } style={{ width: '100%', height: Dimensions.get('screen').height * 0.3 }} className='rounded-lg ' resizeMethod='resize' resizeMode='cover'>
                        <TouchableOpacity className=' rounded-lg items-center justify-center' style={{ width: '100%', height: Dimensions.get('screen').height * 0.3 }} activeOpacity={0.6} onPress={() => {
                            pickImageSheetRef.current?.open()
                        }}>

                            <View className="items-center justify-center w-full h-full ">
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
                        <Text className='text-base font-semibold text-[#2A475E] dark:text-white' >{
                            translate('household_add_item_title')
                        }</Text>
                        <Text className='text-sm my-3 text-[#2A475E] dark:text-[#8D94A5]' >{
                            translate('household_add_item_description')
                        }</Text>
                    </View>
                    <BottomSheetTextInput
                        placeholder={translate('household_add_category_placeholder')}
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
                            color: '#b0b0b0'
                        }}
                    />
                    {
                        buildPickType()
                    }
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
                            backgroundColor: householdName != '' && pickedCategory != -1 && pickedRoom != -1 ? COLORS.DenimBlue : iOSGrayColors.systemGray6.defaultLight,
                        }}
                            onPress={async () => {
                                if (householdName != '' && pickedCategory != -1 && pickedRoom != -1) {
                                    await handleSubmit(
                                        id_family,
                                        imageUri,
                                        householdName,
                                        pickedCategory,
                                        pickedRoom,
                                        householdType
                                    )
                                }
                            }}
                        >
                            <Material name='arrow-right' size={24} color={
                                householdName != '' && pickedCategory != -1 && pickedRoom != -1 ? 'white' : iOSGrayColors.systemGray.defaultDark
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