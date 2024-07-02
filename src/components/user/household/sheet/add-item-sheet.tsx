import React, { useEffect, useRef } from 'react'
import { View, Text, ScrollView, RefreshControl, Keyboard, Dimensions, Image, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, ImageBackground } from 'react-native'
import { COLORS } from 'src/constants'
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import RoomIcon from 'src/assets/images/household_assets/room.png';
import ImageIcon from 'src/assets/images/household_assets/image.png';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import PickImageSheet from '../household-item-stack/pick-image-sheet';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import HouseHoldService from 'src/services/apiclient/HouseHoldService';
import { AppDispatch, RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addRoom } from 'src/redux/slices/RoomSlice';
import { HouseHoldItemInterface } from 'src/interface/household/household_item';
import AddHouseholdStepIndicator from '../add-household-step-indicator';
import AddHouseHoldItemStep1Sheet from '../add-household-item-step1-sheet';
import * as Animatable from 'react-native-animatable';
import { household_category_dat } from '../const/data';
import CategoryIcon from 'src/assets/images/household_assets/category.png';
import AddHouseHoldItemPickCategorySheet from '../add-household-item-pickcategorysheet';
import AddHouseHoldItemPickRoomSheet from '../add-household-item-pickroomsheet';
import NewItemImageSheet from 'src/assets/images/household_assets/new_item_image_sheet.png'
import Camera from 'src/assets/images/household_assets/Camera.png'
import Ingredients from 'src/assets/images/household_assets/Ingredients.png'
import OpenedFolder from 'src/assets/images/household_assets/OpenedFolder.png'
import Room2 from 'src/assets/images/household_assets/Room_2.png'

import { BlurView } from 'expo-blur';
interface AddRoomSheetProps {
    bottomSheetRef: React.RefObject<BottomSheet>
    id_family: number
    addRoomSheetRef: React.RefObject<BottomSheet>
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;



// const household_items = [
//     {
//         "id_household_item": 4,
//         "id_family": 96,
//         "item_name": "Máy giặt",
//         "item_description": "máy giặt toshiba nhà tao",
//         "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713451417048",
//         "id_category": 1
//     },
//     {
//         "id_household_item": 5,
//         "id_family": 96,
//         "item_name": "Hủ muối tiêu",
//         "item_description": "ai mà ăn muối tiêu chanh này sẽ bị ám suốt đời",
//         "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713451468168",
//         "id_category": 1
//     },

//     {
//         "id_household_item": 10,
//         "id_family": 96,
//         "item_name": "tủ lạnh cùi",
//         "item_description": "cái tủ lạnh cùi vãi",
//         "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713454576319",
//         "id_category": 1
//     },
//     {
//         "id_household_item": 11,
//         "id_family": 96,
//         "item_name": "eulaaaaa",
//         "item_description": "đây là bé eula dễ thương",
//         "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713502246879",
//         "id_category": 1
//     },
//     {
//         "id_household_item": 13,
//         "id_family": 96,
//         "item_name": "Adudu",
//         "item_description": "lalala",
//         "item_imageurl": null,
//         "id_category": 2
//     }
// ]

// const steps = [
//     {
//         title: "Step 0",
//         description: "Intro"
//     },
//     {
//         title: "Step 1",
//         description: "Enter name"
//     },
//     {
//         title: "Step 2",
//         description: "Enter room and category"
//     },
//     {
//         title: "Step 3",
//         description: "Enter image",
//     }

// ]

// const roomsData = [
//     {
//         id_room: 2,
//         room_name: "Living Room"
//     }
// ]

const AddItemSheet = ({
    bottomSheetRef,
    id_family,
    addRoomSheetRef
}: AddRoomSheetProps) => {
    const snapPoints = React.useMemo(() => ['95%'], []);
    const [text, setText] = React.useState('')
    const [step, setStep] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch<AppDispatch>()


    const [errorText, setErrorText] = React.useState('')
    const [showError, setShowError] = React.useState(false)

    const [householdName, setHouseholdName] = React.useState('')
    const [householdCategory, setHouseholdCategory] = React.useState(-1)
    const [householdRoom, setHouseholdRoom] = React.useState(-1)
    const [imageUri, setImageUri] = React.useState('')

    const rooms = useSelector((state: RootState) => state.room)
    const categories = useSelector((state: RootState) => state.category)

    const pickRoomSheetRef = useRef<BottomSheet>(null)
    const pickCategorySheetRef = useRef<BottomSheet>(null)
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
        return () => {
            setStep(0)
            setHouseholdName('')
            setHouseholdCategory(-1)
            setHouseholdRoom(-1)
        }
    }, [])

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

    const onSetCategory = (category: number) => {
        console.log("category ", category)
        console.log("room ", householdRoom)
        setHouseholdCategory(category)
    }

    const onSetRoom = (room: number) => {
        console.log("room ", room)
        setHouseholdRoom(room)
    }
    const findRoomText = (id: number) => {
        return rooms.find((room: any) => room.id_room === id)?.room_name
    }
    const findCategoryText = (id: number) => {
        return household_category_dat.find((category: any) => category.id_category === id)?.category_name
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            enableOverDrag={true}
            enablePanDownToClose={loading ? false : true}
            snapPoints={snapPoints}

            // handleComponent={null}
            // handleIndicatorStyle={{ backgroundColor: iOSGrayColors.systemGray6.defaultLight, }}
            backdropComponent={renderBackdrop}
            onClose={() => {
                Keyboard.dismiss()
            }}
            onChange={(index) => {
                console.log(index)
                if (index == -1) {
                    setStep(0)
                    setHouseholdName('')
                    setHouseholdCategory(-1)
                    setHouseholdRoom(-1)
                }
            }}

        >
            <BottomSheetScrollView className='' showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets>
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
                    <TouchableOpacity className=' bg-white  mt-3 justify-center rounded-lg  ' style={{
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

                    <TouchableOpacity className=' bg-white  mt-3 justify-center rounded-lg  ' style={{
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
            <AddHouseHoldItemPickRoomSheet refRBSheet={pickRoomSheetRef} roomsData={rooms} onNavigateCreateRoom={() => {
                addRoomSheetRef.current?.expand()
            }} room={householdRoom} onSetRoom={onSetRoom} />
            <AddHouseHoldItemPickCategorySheet refRBSheet={pickCategorySheetRef} category={householdCategory} onSetCategory={onSetCategory} categories={categories} />
            <PickImageSheet bottomSheetRef={pickImageSheetRef} handlePickImage={handlePickImage} handleTakePhoto={handleTakePhoto} />

        </BottomSheet>
    )
}


// const Step1Component = ({ setStep }: any) => {
//     const bottomSheetRef = useRef<BottomSheet>(null);
//     return (
//         <>
//             <View className=' flex  items-center flex-1'>
//                 <View className='mt-10 items-center'>
//                     <Text className='text-2xl font-bold' style={{
//                         color: iOSGrayColors.systemGray6.accessibleDark

//                     }}>Great</Text>
//                     <Text className='text-2xl font-bold' style={{
//                         color: iOSGrayColors.systemGray6.accessibleDark

//                     }}>Lets add an item</Text>
//                 </View>
//                 <View className='my-3'>
//                     <Text className='text-lg' style={{
//                         color: iOSGrayColors.systemGray.defaultDark

//                     }}>It only takes a few minutes</Text>
//                 </View>
//                 <TouchableOpacity style={{
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     borderRadius: 12,
//                     elevation: 3,
//                     backgroundColor: iOSColors.systemBlue.defaultLight,
//                 }} onPress={() => {
//                     setStep((prev: any) => prev + 1)
//                 }} className='w-[45%] py-2'>
//                     <Text className='text-white text-base font-bold'>Let's start</Text>
//                 </TouchableOpacity>
//                 {/* <TouchableOpacity style={{
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     borderRadius: 12,
//                     elevation: 3,
//                 }} onPress={() => {
//                     // console.log(1)
//                     bottomSheetRef.current?.expand()
//                 }} className='w-[45%] py-2 mt-6'>
//                     <Text className='text-sm font-bold' style={{
//                         color: iOSColors.systemBlue.defaultLight
//                     }} >Why should i do this</Text>
//                 </TouchableOpacity> */}

//             </View>
//             <AddHouseHoldItemStep1Sheet refRBSheet={bottomSheetRef} />
//         </>
//     )
// }

// const Step2Component = ({ setStep, name, onSetName }: any) => {
//     const [text, setText] = React.useState(name || '')
//     const [isEmpty, setIsEmpty] = React.useState(0)

//     React.useEffect(() => {
//         if (text.length == 0) {
//             setIsEmpty(1)
//         }

//     }, [text])



//     return (
//         <>
//             <Animatable.View animation={"slideInRight"} duration={400} className=' flex  items-center flex-1 w-full '>
//                 <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'height'} className='flex-1'>
//                     <View className='flex-1 mt-24 items-center w-full h-full content-center'>
//                         <View className='mb-6 mx-16' style={{}}>
//                             <Text className='text-2xl font-bold  text-center' style={{
//                                 color: iOSGrayColors.systemGray6.accessibleDark

//                             }}>Name of the item you want to add?</Text>
//                         </View>
//                         <TextInput
//                             style={{
//                                 width: '90%',
//                                 fontSize: 18,
//                                 backgroundColor: 'white',
//                                 borderRadius: 12,

//                             }}
//                             className='mb-6 py-5 pl-5 font-bold'
//                             value={text}
//                             placeholder='TV, Heat pump, Dishwasher, etc...'
//                             onChangeText={(text) => {
//                                 setText(text)
//                                 // onSetName(text)
//                             }}
//                         />
//                         <Animatable.View animation={text.length == 0 || text.length == 1 ? 'fadeIn' : undefined} key={text} className='w-[55%] py-2 mb-2 '>
//                             <TouchableOpacity style={{
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 borderRadius: 12,
//                                 elevation: 3,
//                                 backgroundColor: text == '' ? '#EEECEC' : iOSColors.systemBlue.defaultLight,
//                             }} onPress={() => {
//                                 if (text == '') {
//                                     // console.log('1')
//                                     // onSetName(text)
//                                 }
//                                 else {
//                                     onSetName(text)
//                                     setStep((prev: any) => prev + 1)
//                                 }
//                             }} className='py-2 mb-2 '>
//                                 <Text className='text-white text-base font-bold' style={{
//                                     color: text == '' ? iOSColors.systemBlue.defaultLight : 'white'
//                                 }}>
//                                     Next

//                                 </Text>
//                             </TouchableOpacity>
//                         </Animatable.View>
//                     </View>
//                 </KeyboardAvoidingView>

//             </Animatable.View>
//         </>
//     )
// }
// const Step3Component = ({ setStep, rooms, onNavigateCreateRoom, room, category, onSetRoom, onSetCategory, handleAdd, navigationBack, addRoomSheetRef }: any) => {
//     const roomPickRef = useRef<BottomSheet>(null);
//     const categoryPickRef = useRef<BottomSheet>(null);

//     const dispatch = useDispatch<AppDispatch>()

//     const findRoomText = (id: number) => {
//         return rooms.find((room: any) => room.id_room === id)?.room_name
//     }
//     const findCategoryText = (id: number) => {
//         return household_category_dat.find((category: any) => category.id_category === id)?.category_name
//     }


//     return (
//         <>
//             <Animatable.View animation={"slideInRight"} duration={400} className=' flex justify-center items-center flex-1 w-full'>
//                 <View className='flex-1   items-center w-full h-full content-center'>
//                     <View className='my-6 mx-16' style={{}}>
//                         <Text className='text-xl font-bold  text-center' style={{
//                             color: iOSGrayColors.systemGray6.accessibleDark

//                         }}>Pick room and category</Text>
//                     </View>
//                     <TouchableOpacity className=' bg-white  mt-3 justify-center rounded-lg  ' style={{
//                         height: screenHeight * 0.1,
//                         width: screenWidth * 0.9,
//                         borderWidth: category != -1 ? 2 : 0,
//                         borderColor: iOSColors.systemBlue.defaultLight,
//                     }} onPress={() => {
//                         categoryPickRef.current?.expand()
//                     }}>
//                         <View className='flex-row justify-between items-center'>
//                             <View className='flex-row px-4 items-center '>
//                                 <Image source={CategoryIcon} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
//                                 <Text className='pl-4 text-base'>Category</Text>
//                             </View>
//                             <View className='mr-4'>
//                                 <Text style={{
//                                     color: category == -1 ? iOSGrayColors.systemGray3.defaultLight : iOSColors.systemBlue.defaultLight,
//                                     fontSize: 15,
//                                     fontWeight: 500

//                                 }}>{
//                                         category == -1 ? "Choose room" : findCategoryText(category)
//                                     }</Text>
//                             </View>
//                         </View>
//                     </TouchableOpacity>

//                     <TouchableOpacity className=' bg-white  mt-3 justify-center rounded-lg  ' style={{
//                         height: screenHeight * 0.1,
//                         width: screenWidth * 0.9,
//                         borderWidth: room != -1 ? 2 : 0,
//                         borderColor: iOSColors.systemBlue.defaultLight,
//                     }} onPress={() => {
//                         roomPickRef.current?.expand()
//                     }}>
//                         <View className='flex-row justify-between items-center'>
//                             <View className='flex-row px-4 items-center '>
//                                 <Image source={RoomIcon} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
//                                 <Text className='pl-4 text-base'>Choose room</Text>
//                             </View>
//                             <View className='mr-4'>
//                                 <Text style={{
//                                     color: room == -1 ? iOSGrayColors.systemGray3.defaultLight : iOSColors.systemBlue.defaultLight,
//                                     fontSize: 15,
//                                     fontWeight: 500

//                                 }}>{
//                                         room == -1 ? "Choose" : findRoomText(room)
//                                     }</Text>
//                             </View>
//                         </View>
//                     </TouchableOpacity>
//                     {
//                         room != -1 && category != -1 && <Animatable.View
//                             animation={
//                                 room != -1 && category != -1 ? 'fadeIn' : undefined
//                             }
//                             duration={400}
//                             className='w-[55%] py-2 mb-2 '

//                         >
//                             <TouchableOpacity style={{
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 borderRadius: 12,
//                                 elevation: 3,
//                                 backgroundColor: iOSColors.systemBlue.defaultLight,
//                             }} onPress={async () => {
//                                 setStep((prev: any) => prev + 1)
//                             }} className='py-2 my-3 '>
//                                 <Text className='text-white text-base font-bold' style={{
//                                     color: 'white'
//                                 }}>
//                                     Next

//                                 </Text>
//                             </TouchableOpacity>
//                         </Animatable.View>
//                     }
//                 </View>

//             </Animatable.View>
//             <AddHouseHoldItemPickCategorySheet refRBSheet={categoryPickRef} category={category} onSetCategory={onSetCategory} />
//             <AddHouseHoldItemPickRoomSheet refRBSheet={roomPickRef} roomsData={rooms} onNavigateCreateRoom={onNavigateCreateRoom} room={room} onSetRoom={onSetRoom} />
//         </>
//     )
// }

// const Step4Component = ({ setStep, setImageUri, name, showError, errorText, handleSubmit, setShowError, setErrorText }: any) => {
//     const pickImageSheet = useRef<any>(null)
//     const [imageUriInput, setImageUriInput] = React.useState('')

//     const handleTakePhoto = async () => {
//         console.log("Take photo")
//         const { status } = await ImagePicker.requestCameraPermissionsAsync();
//         if (status === 'granted') {
//             const result = await ImagePicker.launchCameraAsync({
//                 mediaTypes: ImagePicker.MediaTypeOptions.Images,
//                 allowsEditing: true,
//                 aspect: [3, 3],
//                 quality: 1,
//             });

//             if (!result.canceled) {
//                 if (result.assets[0].fileSize! * (10 ** -6) > 10) {
//                     setShowError(true)
//                     setErrorText('Image size must be less than 10MB')

//                 }
//                 else {
//                     console.log(result.assets[0].fileSize! * (10 ** -6))
//                     setImageUri(result.assets[0].uri)
//                     setImageUriInput(result.assets[0].uri)

//                 }
//             }
//             pickImageSheet.current?.close()
//         } else {
//             alert('Permission to access camera was denied');
//         }
//     }

//     const handlePickImage = async () => {
//         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status === 'granted') {
//             const result = await ImagePicker.launchImageLibraryAsync({
//                 mediaTypes: ImagePicker.MediaTypeOptions.Images,
//                 allowsEditing: true,
//                 aspect: [3, 3],
//                 quality: 1,
//             });

//             if (!result.canceled) {
//                 if (result.assets[0].fileSize! * (10 ** -6) > 10) {
//                     setShowError(true)
//                     setErrorText('Image size must be less than 10MB')
//                 }
//                 else {
//                     console.log(result.assets[0].fileSize! * (10 ** -6))
//                     setImageUri(result.assets[0].uri)
//                     setImageUriInput(result.assets[0].uri)

//                 }
//             }
//             pickImageSheet.current?.close()
//         }
//         else {
//             alert('Permission to access camera was denied');
//         }
//     }


//     return <>
//         <Animatable.View animation={"slideInRight"} duration={400} className=' flex  flex-1 w-full '>
//             <View className='content-center mt-4'>
//                 <Text className='text-center' style={{
//                     color: iOSGrayColors.systemGray6.accessibleDark,
//                     fontSize: 20,
//                     fontWeight: 'bold'

//                 }}>Pick image for {name} </Text>
//                 <Text className='text-center mx-10 my-6' style={{
//                     color: iOSGrayColors.systemGray6.accessibleDark,
//                     fontSize: 16,


//                 }}>
//                     You can add an image for this item to make it more recognizable
//                 </Text>
//             </View>
//             <View className='items-center rounded-lg'>
//                 <TouchableOpacity className='items-center justify-center p-4 bg-white ' style={{
//                     width: screenWidth * 0.4,
//                     height: screenWidth * 0.4,
//                 }}
//                     onPress={() => {
//                         pickImageSheet.current?.open()
//                     }}
//                 >
//                     {/* <Image source={RoomIcon} style={{ width: screenWidth * 0.3, height: screenWidth * 0.3, borderRadius: 10 }} /> */}
//                     {
//                         imageUriInput != '' ?
//                             <Image source={{ uri: imageUriInput }} style={{ width: screenWidth * 0.3, height: screenWidth * 0.3, borderRadius: 10 }} />
//                             :
//                             <Material name='image-plus' size={screenWidth * 0.15} color={iOSGrayColors.systemGray.defaultLight} />
//                     }
//                 </TouchableOpacity>
//             </View>
//             {
//                 showError ? <Text className='text-center text-base text-red-500 py-3'>{errorText}</Text> : <></>
//             }
//             <View className='items-center mt-10'>
//                 <TouchableOpacity className='py-2 mb-4  w-[40%] items-center rounded-lg' style={{
//                     backgroundColor: iOSColors.systemBlue.defaultLight,
//                 }}
//                     onPress={async () => {
//                         await handleSubmit()
//                     }}
//                 >
//                     <Text className='text-center text-base text-white font-semibold'>Add</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={async () => {
//                     await handleSubmit()
//                 }}>
//                     <Text className='text-center text-base text-blue-500'>Skip </Text>
//                 </TouchableOpacity>
//             </View>
//             <PickImageSheet bottomSheetRef={pickImageSheet} handleTakePhoto={handleTakePhoto} handlePickImage={handlePickImage} />

//         </Animatable.View>

//     </>
// }

// const styles = StyleSheet.create({
//     receipt: {
//         height: screenHeight * 0.12
//     },
//     item: {
//         height: screenHeight * 0.1,
//         width: screenWidth * 0.9,
//     }
// })

export default AddItemSheet