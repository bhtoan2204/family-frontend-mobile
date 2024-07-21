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


interface AddItemSheetProps {
    bottomSheetRef: React.RefObject<BottomSheet>
    id_family: number;
    members: Member[];
    pickedIdUser: string;
    setPickedIdUser: (id: string) => void;
    pickMemberBottomSheetRef: React.RefObject<BottomSheet>
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const AddProgressSheet = ({
    bottomSheetRef,
    id_family,
    members,
    pickMemberBottomSheetRef,
    pickedIdUser,
}: AddItemSheetProps) => {
    const snapPoints = React.useMemo(() => ['75%'], []);

    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch<AppDispatch>()


    const [errorText, setErrorText] = React.useState('')
    const [showError, setShowError] = React.useState(false)

    const [inputTitle, setInputTitle] = React.useState('')
    const [inputProgressNotes, setInputProgressNotes] = React.useState('')
    const [inputSchoolInfo, setInputSchoolInfo] = React.useState('')
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
        await handleRestore()
        await handleAdd()

    }

    const getMemberName = (id: string) => {
        const memberData = members.find(member => member.id_user === id)
        return memberData?.user.firstname + ' ' + memberData?.user.lastname
    }
    const getMemberAvatar = (id: string) => {
        const memberData = members.find(member => member.id_user === id)
        return memberData?.user.avatar
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
        const memberData = members.find(member => member.id_user === pickedIdUser)
        const res = await EducationServices.createEducation(
            id_family!,
            pickedIdUser,
            inputTitle,
            inputProgressNotes,
            inputSchoolInfo
        )
        if (res) {
            const newEducation: Education = {
                id_education_progress: res.id_education_progress,
                id_family: id_family!,
                id_user: pickedIdUser,
                created_at: res.created_at,
                updated_at: res.updated_at,
                title: res.title,
                progress_notes: res.progress_notes,
                school_info: res.school_info,
                subjects: [],
                user: {
                    avatar: memberData?.user.avatar || '',
                    birthdate: memberData?.user.birthdate || null,
                    firstname: memberData?.user.firstname || '',
                    lastname: memberData?.user.lastname || '',
                    genre: memberData?.user.genre || '',
                }
            }
            dispatch(addEducation(newEducation))
            bottomSheetRef.current?.close()
        } else {
            console.log("error")
            bottomSheetRef.current?.close()
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

    const buildPickMember = () => {
        return <TouchableOpacity className=' bg-white  mt-3 justify-center rounded-lg  ' style={{
            backgroundColor: !isDarkMode ? '#f5f5f5' : '#171A21',
            borderWidth: !isDarkMode ? 1 : 1.5,
            borderColor: !isDarkMode ? '#DEDCDC' : '#66C0F4',
            borderRadius: 10,
            marginVertical: 10,
            paddingVertical: screenHeight * 0.008,
            paddingHorizontal: screenWidth * 0.05,
            marginHorizontal: screenWidth * 0.05,
            // fontWeight: 'bold',
        }} onPress={() => {
            // pickCategorySheetRef.current?.expand()
            // addRoomSheetRef.current?.expand()
            pickMemberBottomSheetRef.current?.expand()
        }}>
            <View className='flex-row justify-between items-center'>
                <View className='flex-row  items-center '>
                    <Image source={
                        pickedIdUser == "" ? OpenedFolder : { uri: getMemberAvatar(pickedIdUser) }
                    } style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
                    <Text className='pl-4' style={{
                        color: "#b0b0b0",
                        fontSize: 15,
                        // fontWeight: 500

                    }}>{
                            pickedIdUser == "" ? 'Pick a member' : getMemberName(pickedIdUser)

                        }</Text>
                </View>
                {/* <View className=''>
                    <Text style={{
                        color: pickedIdUser == "" ? "#b0b0b0" : iOSColors.systemBlue.defaultLight,
                        fontSize: 15,

                    }}>{
                            pickedIdUser == "" ? 'Pick a category' : getMemberName(pickedIdUser)

                        }</Text>
                </View> */}
            </View>
        </TouchableOpacity>
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

                }
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
                            <Text className='text-base font-semibold text-[#2A475E] dark:text-white' style={{
                                

                            }}>Add New Education Progress</Text>
                            <Text className='text-sm my-3 mx-5 text-center text-[#2A475E] dark:text-[#8D94A5]' style={{
                                

                            }}>Give your education progress a name and some description</Text>
                        </View>

                        {
                            buildPickMember()
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