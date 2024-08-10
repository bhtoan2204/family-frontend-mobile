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
import EducationServices from 'src/services/apiclient/EducationService';
import { addComponentScoreToSubject, addEducation, addSubject, updateEducation } from 'src/redux/slices/EducationSlice';
import AddProgressImage from 'src/assets/images/education_assets/add_progress_img.png';
import { Education, Subject } from 'src/interface/education/education';
import { Member } from 'src/interface/member/member';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';


interface AddItemSheetProps {
    bottomSheetRef: React.RefObject<BottomSheet>
    id_family: number;
    id_progress: number;
    title: string;
    progressNotes: string;
    schoolInfo: string;
    onUpdateSuccess: () => void
    onUpdateFailed: () => void
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const UpdateProgressSheet = ({
    bottomSheetRef,
    id_family,
    id_progress,
    title,
    progressNotes,
    schoolInfo,
    onUpdateSuccess,
    onUpdateFailed
}: AddItemSheetProps) => {
    const snapPoints = React.useMemo(() => ['75%'], []);

    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch<AppDispatch>()


    const [errorText, setErrorText] = React.useState('')
    const [showError, setShowError] = React.useState(false)

    const [inputTitle, setInputTitle] = React.useState(title != "" ? title : "")
    const [inputProgressNotes, setInputProgressNotes] = React.useState(progressNotes != "" ? progressNotes : "")
    const [inputSchoolInfo, setInputSchoolInfo] = React.useState(schoolInfo != "" ? schoolInfo : "")
    // const [pickedIdUser, setPickedIdUser] = React.useState<string>("")
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

    const handleAddComponentScore = async () => {
        Keyboard.dismiss()
        await Promise.resolve(
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve('1')
                }, 100)
            })
        )
        await handleAdd()

    }



    const handleAdd = async () => {
        console.log('add')
        // const newHouseholdItem: HouseHoldItemInterface = {
        //     id_family: id_family!,
        //     item_name: householdName,
        //     item_description: '',
        //     item_imageurl: '',
        //     id_category: householdCategory,
        //     id_household_item: Math.floor(Math.random() * 1000)
        // }
        // dispatch(addHouseholdItem(newHouseholdItem))
        console.log(
            id_progress,
            id_family!,
            inputTitle,
            inputProgressNotes,
            inputSchoolInfo
        )
        const res = await EducationServices.updateEducation(
            id_progress,
            id_family!,
            inputTitle,
            inputProgressNotes,
            inputSchoolInfo,
            null
        )
        if (res) {
            dispatch(updateEducation({
                id_education_progress: id_progress,
                id_family: id_family!,
                title: inputTitle,
                progress_notes: inputProgressNotes,
                school_info: inputSchoolInfo,
                is_shared: null
            }))
            bottomSheetRef.current?.close()
            onUpdateSuccess()
        } else {
            console.log("error")
            bottomSheetRef.current?.close()
            onUpdateFailed()
        }
    }

    const buildInputTitle = () => {
        return <BottomSheetTextInput
            placeholder='Give your new progress a title'
            value={inputTitle}
            onChangeText={(text) => {
                setInputTitle(text)
            }}
            placeholderTextColor={!isDarkMode ? '#b0b0b0' : '#A6A6A6'}

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

    const buildInputSchoolInfo = () => {
        return <BottomSheetTextInput
            placeholder='Give this progress some school info'
            value={inputSchoolInfo}
            onChangeText={(text) => {
                setInputSchoolInfo(text)
            }}
            placeholderTextColor={!isDarkMode ? '#b0b0b0' : '#A6A6A6'}
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
    const buildInputProgressNote = () => {
        return <BottomSheetTextInput
            placeholder='Give your progress a note'
            value={inputProgressNotes}
            onChangeText={(text) => {
                setInputProgressNotes(text)
            }}
            placeholderTextColor={!isDarkMode ? '#b0b0b0' : '#A6A6A6'}
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
            onClose={() => {
                Keyboard.dismiss()
            }}
            onChange={(index) => {
                console.log(index)
                if (index == -1) {
                    setInputTitle("")
                    setInputProgressNotes("")
                    setInputSchoolInfo("")
                }
                else {
                    setInputTitle(title)
                    setInputProgressNotes(progressNotes)
                    setInputSchoolInfo(schoolInfo)
                }
            }}
        // keyboardBehavior="extend"
        // keyboardBlurBehavior="restore"

        >
            <View className='flex-1 bg-[#F7F7F7] dark:bg-[#0A1220]'>
                <BottomSheetScrollView className='' showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets style={{}} keyboardShouldPersistTaps='handled'>

                    <View className='flex-1  mt-10'>
                        <View className='my-3 items-center'>
                            <Image source={AddProgressImage} style={{ width: screenWidth * 0.2, height: screenWidth * 0.2 }} />
                        </View>
                        <View className=' items-center'>
                            <Text className='text-base font-semibold text-[#2A475E] dark:text-white' style={{

                            }}>Update Education Progress</Text>
                            <Text className='text-sm my-3  text-[#2A475E] dark:text-[#8D94A5]' style={{

                            }}>Give us a new name and some description</Text>
                        </View>


                        {
                            buildInputTitle()
                        }
                        {
                            buildInputSchoolInfo()
                        }
                        {
                            buildInputProgressNote()
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
                                backgroundColor: inputTitle != "" ? COLORS.DenimBlue : iOSGrayColors.systemGray6.defaultLight,
                            }}
                                onPress={async () => {
                                    await handleAddComponentScore()
                                }}
                            >
                                <Material name='arrow-right' size={24} color={
                                    inputTitle != "" ? 'white' : iOSGrayColors.systemGray.defaultDark
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


export default UpdateProgressSheet