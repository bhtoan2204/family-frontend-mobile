import React, { useEffect, useRef } from 'react'
import { View, Text, ScrollView, RefreshControl, Keyboard, Dimensions, Image, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, ImageBackground } from 'react-native'
import { COLORS } from 'src/constants'
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

import { AppDispatch, RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';


import OpenedFolder from 'src/assets/images/household_assets/OpenedFolder.png'

import EducationServices from 'src/services/apiclient/EducationService';
import { addComponentScoreToSubject, addEducation, addSubject } from 'src/redux/slices/EducationSlice';
import AddProgressImage from 'src/assets/images/education_assets/add_progress_img.png';
import { Education, Subject } from 'src/interface/education/education';
import { Member } from 'src/interface/member/member';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';
import { handleRestore } from 'src/utils/sheet/func';
import { getTranslate } from 'src/redux/slices/languageSlice';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

interface AddItemSheetProps {
    bottomSheetRef: React.RefObject<BottomSheet>
    id_family: number;
    members: Member[];
    pickedIdUser: string;
    setPickedIdUser: (id: string) => void;
    onAddSuccess: (id_progress: number) => void;
    onAddFailed: () => void;
    // pickMemberBottomSheetRef: React.RefObject<BottomSheet>
}


const AddProgressSheet = ({
    bottomSheetRef,
    id_family,
    members,
    // pickMemberBottomSheetRef,
    pickedIdUser,
    onAddSuccess,
    onAddFailed
}: AddItemSheetProps) => {
    const snapPoints = React.useMemo(() => ['75%'], []);

    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const [errorText, setErrorText] = React.useState('')
    const [showError, setShowError] = React.useState(false)

    const [inputTitle, setInputTitle] = React.useState('')
    const [inputProgressNotes, setInputProgressNotes] = React.useState('')
    const [inputSchoolInfo, setInputSchoolInfo] = React.useState('')
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
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} pressBehavior={
            loading ? 'none' : undefined
        } />,
        []
    );

    const handleAddComponentScore = async () => {
        Keyboard.dismiss()
        await handleRestore()
        await handleAdd()

    }

    const getMemberName = React.useCallback((id: string) => {
        const memberData = members.find(member => member.id_user === id)
        return memberData?.user.firstname + ' ' + memberData?.user.lastname
    }, [])

    const getMemberAvatar = React.useCallback((id: string) => {
        const memberData = members.find(member => member.id_user === id)
        return memberData?.user.avatar
    }, [])

    // const getMemberAvatar = (id: string) => {
    //     const memberData = members.find(member => member.id_user === id)
    //     return memberData?.user.avatar
    // }

    const handleAdd = async () => {
        console.log('add')
        Keyboard.dismiss()
        await handleRestore()
        const res = await EducationServices.createEducation(
            id_family!,
            pickedIdUser,
            inputTitle,
            inputProgressNotes,
            inputSchoolInfo
        )
        if (res) {
            const memberData = members.find(member => member.id_user === res.id_user)
            const newEducation: Education = {
                id_education_progress: res.id_education_progress,
                id_family: id_family!,
                id_user: res.id_user,
                created_at: res.created_at,
                updated_at: res.updated_at,
                is_shared: res.is_shared,
                title: res.title,
                progress_notes: res.progress_notes,
                school_info: res.school_info,
                subjects: [],
                users: {
                    idUser: memberData?.id_user || '',
                    email: memberData?.user.email || '',
                    phone: memberData?.user.phone || '',
                    avatar: memberData?.user.avatar || '',
                    birthdate: memberData?.user.birthdate || null,
                    firstname: memberData?.user.firstname || '',
                    lastname: memberData?.user.lastname || '',
                    genre: memberData?.user.genre || '',
                }
            }
            dispatch(addEducation(newEducation))
            bottomSheetRef.current?.close()
            onAddSuccess(res.id_education_progress)
        } else {
            console.log("error")
            bottomSheetRef.current?.close()
            onAddFailed()
        }
    }

    const buildInputTitle = () => {
        return <BottomSheetTextInput
            placeholder={translate('edu_screen_new_progress_title_placeholder')}
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
            placeholder={translate('edu_screen_new_progress_school_info_placeholder')}
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
            placeholder={translate('edu_screen_new_progress_note_placeholder')}
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

            }}
        // keyboardBehavior="extend"
        // keyboardBlurBehavior="restore"

        >
            <View className='flex-1 bg-[#F7F7F7] dark:bg-[#0A1220] '>
                <BottomSheetScrollView className='' showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets style={{}} keyboardShouldPersistTaps='handled'>

                    <View className='flex-1  mt-10'>
                        <View className='my-3 items-center'>
                            <Image source={AddProgressImage} style={{ width: screenWidth * 0.2, height: screenWidth * 0.2 }} />
                        </View>
                        <View className=' items-center'>
                            <Text className='text-base font-semibold text-[#2A475E] dark:text-white'>{
                                translate("edu_screen_new_progress_title")
                                }</Text>
                            <Text className='text-sm my-3 mx-5 text-center text-[#2A475E] dark:text-[#8D94A5]'>{
                                translate("edu_screen_new_progress_description")
                                }</Text>
                        </View>

                        {
                            // buildPickMember()
                        }
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


export default AddProgressSheet