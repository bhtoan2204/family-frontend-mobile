import React, { Fragment, useEffect, useRef } from 'react'
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
import { addComponentScoreToSubject, addSubject } from 'src/redux/slices/EducationSlice';
import AddCourseImage from 'src/assets/images/education_assets/add_course_img.png';
import TargetImage from 'src/assets/images/education_assets/target.png'
import { Subject } from 'src/interface/education/education';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';
import { handleRestore } from 'src/utils/sheet/func';
import { getTranslate } from 'src/redux/slices/languageSlice';


interface AddItemSheetProps {
    bottomSheetRef: React.RefObject<BottomSheet>
    id_education_progress: number;
    id_family: number;
    targets: {
        id: number;
        title: string;
        color: string;
    }[]
    pickedTargets: string[];
    pickTargetBottomSheetRef: React.RefObject<BottomSheet>;
    onAddSuccess: () => void;
    onAddFailed: () => void;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const AddCourseSheet = ({
    bottomSheetRef,
    id_education_progress,
    id_family,
    onAddSuccess,
    onAddFailed,
    pickTargetBottomSheetRef,
    pickedTargets,
    targets

}: AddItemSheetProps) => {
    const snapPoints = React.useMemo(() => ['75%'], []);

    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch<AppDispatch>()


    const [errorText, setErrorText] = React.useState('')
    const [showError, setShowError] = React.useState(false)

    const [inputName, setInputName] = React.useState('')
    const [inputDescription, setInputDescription] = React.useState('')
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



    const renderBackdrop = React.useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1}
            {...props}
        // pressBehavior={
        //     loading ? 'none' : undefined
        // }
        />,
        []
    );

    const handleAddComponentScore = async () => {
        Keyboard.dismiss()
        await handleRestore()
        const targetsArr = pickedTargets.map(target => {
            return {
                id: parseInt(target),
                title: targets.find(t => t.id == parseInt(target))!.title,
                color: targets.find(t => t.id == parseInt(target))!.color
            }
        })
        targetsArr.sort((a, b) => {
            return a.id - b.id
        })
        console.log(targetsArr)
        console.log({
            id_education_progress,
            id_family,
            inputName,
            inputDescription,
            targetsArr
        })
        // onAddSuccess()
        setLoading(true)
        const response = await EducationServices.createSubjectAndComponentScores(
            id_education_progress,
            id_family!,
            inputName,
            inputDescription,
            targetsArr
        )
        setLoading(false)
        if (response) {
            setInputName("")
            dispatch(addSubject(response))
            onAddSuccess()
            bottomSheetRef.current?.close()
        } else {
            onAddFailed()
        }


    }
    const checkCondition = React.useCallback(({
        inputValue,
        pickedTargets
    }: {
        inputValue: string,
        pickedTargets: string[]
    }) => {
        if (inputValue == '') {
            return false;
        }
        if (pickedTargets.length == 0) {
            return false;
        }
        return true
    }, [])
    const buildInputName = React.useCallback(() => {
        return <BottomSheetTextInput
            placeholder={translate('progress_screen_new_course_title_placeholder')}
            value={inputName}
            onChangeText={(text) => {
                setInputName(text)
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
    }, [isDarkMode, inputName, translate])


    const buildInputDescription = React.useCallback(() => {
        return <BottomSheetTextInput
            placeholder={translate('progress_screen_new_course_description_placeholder')}
            value={inputDescription}
            onChangeText={(text) => {
                setInputDescription(text)
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
    }, [isDarkMode, inputDescription, translate])

    const findTargetById = React.useCallback((id: number) => {
        return targets.find(target => target.id == id)
    }, [targets])

    const buildPickTargets = React.useCallback(() => {
        return <TouchableOpacity className='   mt-3 justify-center rounded-lg  ' style={{
            backgroundColor: !isDarkMode ? '#f5f5f5' : '#171A21',
            borderWidth: !isDarkMode ? 1 : 1.5,
            borderColor: !isDarkMode ? '#DEDCDC' : '#66C0F4',
            borderRadius: 10,
            marginVertical: 10,
            paddingVertical: screenHeight * 0.008,
            // paddingHorizontal: screenWidth * 0.05,
            marginHorizontal: screenWidth * 0.05,
            // fontWeight: 'bold',
        }} onPress={() => {
            Keyboard.dismiss()
            pickTargetBottomSheetRef.current?.expand()
        }}>
            <View>
                <View className='flex-row justify-between items-center mx-3 '>
                    <View className='flex-row  items-center '>
                        <Image source={
                            TargetImage
                        } style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
                        <Text className='pl-3 text-[#2A475E] dark:text-white font-semibold' style={{
                            fontSize: 15,
                            // fontWeight: 500

                        }}>{
                                translate("Targets")

                            }</Text>
                    </View>
                    <View className=''>
                        <Text className='text-[#b0b0b0] dark:text-white'>{
                            translate("progress_screen_new_course_choose_targets")
                        }</Text>
                    </View>

                </View>
                {
                    pickedTargets.length > 0 && <View className='mx-3 my-3 flex-wrap flex-row'>
                        {
                            pickedTargets.map((target, index) => {
                                return <Fragment key={index}>
                                    <TargetItem data={findTargetById(parseInt(target))!} onPress={() => { }} />
                                </Fragment>
                            })
                        }
                    </View>
                }
            </View>
        </TouchableOpacity>
    }, [isDarkMode, pickedTargets, translate])


    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            enableOverDrag={true}
            enablePanDownToClose={true}
            // enablePanDownToClose={loading ? false : true}
            // enableDynamicSizing={true}
            snapPoints={snapPoints}
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
                    setLoading(false)
                }
            }}
        // keyboardBehavior="extend"
        // keyboardBlurBehavior="restore"

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
            <View className='flex-1 bg-[#F7F7F7] dark:bg-[#0A1220]'>
                <BottomSheetScrollView className='' showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets style={{}} keyboardShouldPersistTaps='handled'>

                    <View className='flex-1  mt-10'>
                        <View className='my-3 items-center'>
                            <Image source={AddCourseImage} style={{ width: screenWidth * 0.2, height: screenWidth * 0.2 }} />
                        </View>
                        <View className=' items-center'>
                            <Text className='text-base font-semibold text-[#2A475E] dark:text-white' style={{

                            }}>
                                {
                                    translate("progress_screen_new_course_title")
                                }
                            </Text>
                            <Text className='text-sm my-3 text-[#2A475E] dark:text-[#8D94A5]' style={{

                            }}>{
                                    translate("progress_screen_new_course_description")
                                }</Text>
                        </View>

                        {
                            buildInputName()
                        }

                        {
                            buildInputDescription()
                        }

                        {
                            buildPickTargets()
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
                                backgroundColor: checkCondition({ inputValue: inputName, pickedTargets }) == true ? COLORS.DenimBlue : iOSGrayColors.systemGray6.defaultLight,
                            }}
                                disabled={checkCondition({ inputValue: inputName, pickedTargets }) == false}
                                onPress={async () => {
                                    await handleAddComponentScore()
                                }}
                            >
                                <Material name='arrow-right' size={24} color={
                                    checkCondition({ inputValue: inputName, pickedTargets }) == true ? 'white' : iOSGrayColors.systemGray.defaultDark
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

const TargetItem = ({ data, onPress }: {
    data: {
        id: number;
        title: string;
        color: string;
    }, onPress: () => void
}) => {
    return (
        <TouchableOpacity className='flex-row justify-between items-center px-1 py-2' onPress={onPress}>
            <View className='flex-row items-center'>
                <View className='rounded-xl px-3 py-4' style={{
                    backgroundColor: data.color,

                    // width: 20,
                    // height: 20
                }}>
                    <Text className='px-3 text-white text-sm' style={{
                        fontSize: 15,
                        // fontWeight: 500

                    }}>{data.title}</Text>

                </View>

            </View>

        </TouchableOpacity>
    )
}

export default AddCourseSheet