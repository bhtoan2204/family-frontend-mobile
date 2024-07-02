import React, { useEffect } from 'react'
import { View, Text, ScrollView, RefreshControl, Keyboard, Dimensions, Image, TouchableOpacity, TextInput, ActivityIndicator, ImageBackground } from 'react-native'
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
import { AppDispatch } from 'src/redux/store';
import { useDispatch } from 'react-redux';
import { addRoom } from 'src/redux/slices/RoomSlice';

import NewRoomImageSheet from 'src/assets/images/household_assets/new_room_image_sheet.png'
import OpenedFolder from 'src/assets/images/household_assets/OpenedFolder.png'
import Camera from 'src/assets/images/household_assets/Camera.png'
import Room2 from 'src/assets/images/household_assets/Room_2.png'

interface AddRoomSheetProps {
    bottomSheetRef: React.RefObject<BottomSheet>
    id_family: number
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const AddRoomSheet = ({
    bottomSheetRef,
    id_family
}: AddRoomSheetProps) => {
    const snapPoints = React.useMemo(() => ['95%'], []);
    const [text, setText] = React.useState('')
    const [imageUri, setImageUri] = React.useState('')
    const [step, setStep] = React.useState(0)
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

    useEffect(() => {
        return () => {
            setText('')
            setImageUri('')
            setStep(0)
        }
    }, [])

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
            const newRoomDat = await HouseHoldService.createRoom(id_family, text, imageUri)
            if (newRoomDat) {
                console.log(newRoomDat)
                dispatch(addRoom(newRoomDat))
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
                    setStep(0)
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
            <BottomSheetScrollView className='flex-1' automaticallyAdjustKeyboardInsets
                keyboardShouldPersistTaps='handled'
            >

                <View className='flex-1'>
                    <ImageBackground source={
                        imageUri != '' ? { uri: imageUri } : NewRoomImageSheet
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
                        <Image source={Room2} style={{ width: screenWidth * 0.2, height: screenWidth * 0.2 }} />
                    </View>
                    <View className=' items-center'>
                        <Text className='text-base font-semibold' style={{
                            color: iOSGrayColors.systemGray6.accessibleDark

                        }}>Add New Room</Text>
                        <Text className='text-sm my-3' style={{
                            color: iOSGrayColors.systemGray6.accessibleDark

                        }}>Type in the new room for your rooms list</Text>
                    </View>
                    <BottomSheetTextInput
                        placeholder='Give your new room a name'
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
                            backgroundColor: text != '' ? COLORS.DenimBlue : iOSGrayColors.systemGray6.defaultLight,
                        }}
                            onPress={async () => {
                                await handleSubmit()
                            }}
                        >
                            <Material name='arrow-right' size={24} color={
                                text != '' ? 'white' : iOSGrayColors.systemGray.defaultDark
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

// interface AddNameProps {
//     text: string
//     setText: (name: string) => void,
//     setStep: (step: number) => void
// }

// const AddName = ({ text, setText, setStep }: AddNameProps) => {
//     const [inputText, setInputText] = React.useState(text)
//     const [isFocused, setIsFocused] = React.useState(false)

//     const opacity = useSharedValue(0);

//     React.useEffect(() => {
//         opacity.value = withTiming(1, { duration: 500 });
//         return () => {
//             opacity.value = withTiming(0, { duration: 500 });
//             setInputText('')
//         };
//     }, []);

//     const animatedStyle = useAnimatedStyle(() => {
//         return {
//             opacity: opacity.value,
//         };
//     });

//     return <Animated.View style={[{}, animatedStyle]}>
//         <View className='content-center my-6'>
//             <Text className='text-center' style={{
//                 color: iOSGrayColors.systemGray6.accessibleDark,
//                 fontSize: 20,
//                 fontWeight: 'bold'

//             }}>Add new room</Text>
//             <Text className='text-center mx-4 mt-6' style={{
//                 color: iOSGrayColors.systemGray6.accessibleDark,
//                 fontSize: 16,


//             }}>A folder groups information about rooms, items, projects and other things</Text>
//         </View>
//         <View className='flex-1 h-full flex-row items-center justify-center w-full '>
//             <TextInput
//                 className='flex-1 w-[90%]'
//                 placeholder="You can name your room as 'Living Room', 'Bedroom', ..."
//                 // autoFocus
//                 multiline={false}
//                 returnKeyType={inputText == "" ? "default" : "done"}
//                 // returnKeyLabel={text != "" && text != description ? "Done" : "Next"}
//                 onFocus={() => {
//                     setIsFocused(true)
//                 }}
//                 onBlur={() => {
//                     setIsFocused(false)
//                 }}
//                 style={{
//                     height: screenHeight * 0.08,
//                     backgroundColor: 'white',
//                     borderRadius: 10,
//                     margin: 10,
//                     padding: 10,
//                     paddingLeft: 16,
//                     fontSize: 16,
//                     fontWeight: 'bold',
//                     color: iOSGrayColors.systemGray2.accessibleLight,
//                     borderWidth: isFocused ? 1 : 0,
//                     borderColor: isFocused ? COLORS.DenimBlue : 'transparent'
//                 }}
//                 value={inputText}
//                 onChangeText={(text) => {
//                     setInputText(text)
//                 }}
//                 keyboardType='default'
//                 keyboardAppearance='default'
//                 onSubmitEditing={async () => {
//                     // await handleSubmit()
//                 }}
//                 clearButtonMode="always"
//             />
//             <TouchableOpacity
//                 activeOpacity={0.65}
//                 disabled={inputText == ""}
//                 onPress={async () => {
//                     setText(inputText)
//                     setStep(1)
//                 }}
//                 className=' bg-blue-200 items-center justify-center' style={{
//                     width: screenHeight * 0.08,
//                     height: screenHeight * 0.08,
//                     backgroundColor: inputText != "" ? COLORS.DenimBlue : iOSGrayColors.systemGray.defaultLight,
//                     borderRadius: 10,
//                     marginRight: 10,
//                     padding: 10,

//                     // paddingLeft: 16,

//                 }}>
//                 <Material name="arrow-right" size={25} color={"white"} />
//             </TouchableOpacity>
//         </View>

//     </Animated.View>
// }

// interface AddImageProps {
//     // imageUri: string
//     name: string
//     setImageUri: (uri: string) => void
//     handleSubmit: (image: string) => Promise<void>
//     errorText: string
//     setErrorText: (text: string) => void
//     showError: boolean
//     setShowError: (show: boolean) => void
// }

// const AddImage = ({ setImageUri, name, handleSubmit, errorText, setErrorText, showError, setShowError }: AddImageProps) => {
//     const pickImageSheet = React.useRef<any>(null)
//     const [imageUriInput, setImageUriInput] = React.useState('')
//     // const [errorText, setErrorText] = React.useState('')
//     // const [showError, setShowError] = React.useState(false)
//     const opacity = useSharedValue(0);

//     useEffect(() => {
//         opacity.value = withTiming(1, { duration: 500 });
//         return () => {
//             opacity.value = withTiming(0, { duration: 500 });
//         };
//     }, []);

//     useEffect(() => {
//         if (showError) {
//             setTimeout(() => {
//                 setShowError(false)
//                 setErrorText('')
//             }, 3000)
//         }
//     }, [showError])

//     const animatedStyle = useAnimatedStyle(() => {
//         return {
//             opacity: opacity.value,
//         };
//     });


//     React.useEffect(() => {
//         return () => {
//             setImageUriInput('')
//         }
//     }, [])

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

//     return (
//         <Animated.View style={[{}, animatedStyle]}>
//             <View className='content-center my-6'>
//                 <Text className='text-center' style={{
//                     color: iOSGrayColors.systemGray6.accessibleDark,
//                     fontSize: 20,
//                     fontWeight: 'bold'

//                 }}>Pick image for {name}</Text>
//                 <Text className='text-center mx-4 mt-6' style={{
//                     color: iOSGrayColors.systemGray6.accessibleDark,
//                     fontSize: 16,


//                 }}>
//                     You can add an image for this room to make it more recognizable
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
//                         await handleSubmit(imageUriInput)
//                     }}
//                 >
//                     <Text className='text-center text-base text-white font-semibold'>Confirm</Text>
//                 </TouchableOpacity>
//                 {/* <TouchableOpacity onPress={async () => {
//                     await handleSubmit("")
//                 }}>
//                     <Text className='text-center text-base text-blue-500'>Skip this step</Text>
//                 </TouchableOpacity> */}
//             </View>
//             <PickImageSheet bottomSheetRef={pickImageSheet} handleTakePhoto={handleTakePhoto} handlePickImage={handlePickImage} />
//         </Animated.View>
//     )

// }

export default AddRoomSheet