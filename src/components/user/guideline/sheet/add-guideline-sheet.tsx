import React, { useEffect, useRef } from 'react'
import { View, Text, ScrollView, RefreshControl, Keyboard, Dimensions, Image, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, ImageBackground } from 'react-native'
import { COLORS } from 'src/constants'
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppDispatch, RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addRoom } from 'src/redux/slices/RoomSlice';
import { HouseHoldItemInterface } from 'src/interface/household/household_item';
import * as Animatable from 'react-native-animatable';
import CategoryIcon from 'src/assets/images/household_assets/category.png';


import AddCourseImage from 'src/assets/images/education_assets/add_course_img.png';
import { Subject } from 'src/interface/education/education';
import { GuideLineService } from 'src/services/apiclient';
import { addGuideline } from 'src/redux/slices/GuidelineSlice';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';


interface AddItemSheetProps {
    bottomSheetRef: React.RefObject<BottomSheet>
    id_family: number;
    id_household_item?: number;
    onAddSuccess: () => void;
    onAddSuccessCallback?: (id_guide_item: number) => void;
    onAddFailed: () => void;
    appearsOnIndex: boolean;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const AddGuidelineSheet = ({
    bottomSheetRef,
    id_family,
    appearsOnIndex,
    id_household_item,
    onAddSuccess,
    onAddFailed,
    onAddSuccessCallback
}: AddItemSheetProps) => {
    const snapPoints = React.useMemo(() => ['75%'], []);

    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch<AppDispatch>()


    const [errorText, setErrorText] = React.useState('')
    const [showError, setShowError] = React.useState(false)

    const [inputName, setInputName] = React.useState('')
    const [inputDescription, setInputDescription] = React.useState('')
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

        try {
            let id_household = id_household_item ? id_household_item : null
            const newGuildline = await GuideLineService.addGuildLine(id_family!, inputName, inputDescription, id_household)
            console.log(newGuildline)
            if (newGuildline) {
                dispatch(addGuideline(newGuildline))
                bottomSheetRef.current?.close()

                onAddSuccess()
                if (onAddSuccessCallback) {
                    console.log(newGuildline.id_guide_item)
                    onAddSuccessCallback(newGuildline.id_guide_item)
                }
            } else {
                setShowError(true)
                setErrorText('Failed to add new guideline')
                onAddFailed()
            }

        } catch (error) {
            console.log(error)
        }
    }

    const buildInputName = () => {
        return <BottomSheetTextInput
            placeholder='Give your new guideline a name'
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

    const buildInputDescription = () => {
        return <BottomSheetTextInput
            placeholder='Give your new guideline some description'
            value={inputDescription}
            onChangeText={(text) => {
                setInputDescription(text)
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
            index={appearsOnIndex ? 0 : -1}
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

                }
            }}
            style={{
                zIndex: 100
            }}
        // keyboardBehavior="extend"
        // keyboardBlurBehavior="restore"

        >
            <View className='flex-1 bg-[#F7F7F7] dark:bg-[#0A1220]'>
                <BottomSheetScrollView className='' showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets style={{}} keyboardShouldPersistTaps='handled'>

                    <View className='flex-1  mt-10'>
                        <View className='my-3 items-center'>
                            <Image source={AddCourseImage} style={{ width: screenWidth * 0.2, height: screenWidth * 0.2 }} />
                        </View>
                        <View className=' items-center'>
                            <Text className='text-base font-semibold text-[#2A475E] dark:text-white'>Add New Guideline</Text>
                            <Text className='text-sm my-3 text-[#2A475E] dark:text-[#8D94A5]' >Give your guideline a name and a description</Text>
                        </View>

                        {
                            buildInputName()
                        }

                        {
                            buildInputDescription()
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
                                backgroundColor: inputName != "" ? COLORS.DenimBlue : iOSGrayColors.systemGray6.defaultLight,
                            }}
                                onPress={async () => {
                                    await handleAddComponentScore()
                                }}
                            >
                                <Material name='arrow-right' size={24} color={
                                    inputName != "" ? 'white' : iOSGrayColors.systemGray.defaultDark
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


export default AddGuidelineSheet