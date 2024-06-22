import React, { useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Image, KeyboardAvoidingView, Platform, } from 'react-native'
import { TextInput } from 'react-native-paper';
import { AddGuildLineScreenProps, EditEducationScreenProps } from 'src/navigation/NavigationTypes'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';
import ImageComponent from 'src/components/Image/Image';
import { useHeaderHeight } from '@react-navigation/elements'

import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';

import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';
import HelpIcon from 'src/assets/images/guideline_assets/help.png';
import { updateEducation } from 'src/redux/slices/EducationSlice';
import { Education } from 'src/interface/education/education';
import EducationServices from 'src/services/apiclient/EducationService';



const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

const EditEducationScreen: React.FC<EditEducationScreenProps> = ({ navigation, route }) => {
    const { id_family, id_education_progress, progress_notes, title, school_info } = route.params
    // const [rooms, setRooms] = React.useState(roomsData)
    // const ItemData = household_items.find(item => item.id_household_item === id_item)
    // const isKeyboardVisible = useKeyboardVisible()
    const titleInputRef = useRef<any>(null)
    const progressNoteInputRef = useRef<any>(null)
    const schoolInfoInputRef = useRef<any>(null)

    const [titleInput, setTitleInput] = React.useState(title || '')
    const [progressNotesInput, setProgressNotesInput] = React.useState(progress_notes || '')
    const [schoolInfoInput, setSchoolInfoInput] = React.useState(school_info || '')

    const [titleFocused, setTitleFocused] = React.useState(false)
    const [progressNoteFocused, setProgressNoteFocused] = React.useState(false)
    const [schoolInfoFocused, setSchoolInfoFocused] = React.useState(false)
    // const [isFocused, setIsFocused] = React.useState(false)
    // const [descriptionIsFocused, setDescriptionIsFocused] = React.useState(false)
    const dispatch = useDispatch<AppDispatch>()
    // const educationData = useSelector((state: RootState) => state.educations).find((item) => item.id_education_progress === id_education_progress)
    const handleUpdateEdu = async () => {
        const res = await EducationServices.updateEducation(id_education_progress, id_family!, titleInput, progressNotesInput, schoolInfoInput)
        if (res) {
            dispatch(updateEducation({
                id_education_progress: id_education_progress,
                id_family: id_family!,
                title: titleInput,
                progress_notes: progressNotesInput,
                school_info: schoolInfoInput
            }))
            navigation.goBack()
        } else {
            console.log('error')
            navigation.goBack()
        }
        // const newEducation: Education = {
        //     id_education_progress: id_education_progress,
        //     id_family: id_family!,
        //     title: titleInput,
        //     progress_notes: progressNotesInput,
        //     school_info: schoolInfoInput,
        //     created_at: educationData.created_at,
        // }
        // dispatch(updateEducation({

        // }))

    }

    return (
        <SafeAreaView className="flex-1 bg-[#FBF8F1] ">
            <KeyboardAvoidingView className='bg-[#F9F6F2] pt-8 flex-1  '
                enabled={true}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView className='flex-1'
                    automaticallyAdjustKeyboardInsets={true}
                    automaticallyAdjustsScrollIndicatorInsets={true}
                    automaticallyAdjustContentInsets={true}
                    keyboardShouldPersistTaps="handled">
                    <View className='flex-1 '>
                        <View className='w-full items-center mt-5 flex-row justify-between '>
                            <View style={{
                                width: 35,
                                height: 35
                            }}></View>
                            <Image source={HelpIcon} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
                            {/* <Material name="package-variant" size={35} style={{ color: iOSGrayColors.systemGray6.accessibleDark, fontWeight: "bold" }} /> */}
                            <TouchableOpacity className=' rounded-full border-[1px] z-10 mr-2' style={{
                                borderColor: iOSGrayColors.systemGray.accessibleDark,
                                backgroundColor: iOSGrayColors.systemGray.accessibleLight
                            }} onPress={() => {
                                navigation.goBack()
                            }} >
                                <Material name="close" size={23} color={'white'} />
                            </TouchableOpacity>
                        </View>
                        <View className='content-center my-6 mx-8'>
                            <Text className='text-center' style={{
                                color: iOSGrayColors.systemGray6.accessibleDark,
                                fontSize: 20,
                                fontWeight: 'bold'

                            }}>
                                Edit education data
                            </Text>
                            <Text className='text-center mx-4 mt-6' style={{
                                color: iOSGrayColors.systemGray6.accessibleDark,
                                fontSize: 16,


                            }}>
                                Fill in the form below to update your education data

                            </Text>
                        </View>
                    </View>
                    <TextInput
                        // mode='outlined'
                        outlineColor="transparent"
                        selectionColor={iOSColors.systemBlue.defaultLight}
                        label={"Title"}
                        placeholder="How to cook a delicious meal, ..."
                        ref={titleInputRef}
                        autoFocus
                        returnKeyType='next'
                        onFocus={() => {
                            setTitleFocused(true)
                        }}
                        onBlur={() => {
                            setTitleFocused(false)
                        }}
                        style={{
                            height: screenHeight * 0.08,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            margin: 10,
                            padding: 10,
                            paddingLeft: 16,
                            fontSize: 16,
                            // fontWeight: 'bold',
                            color: iOSGrayColors.systemGray2.accessibleLight,
                            // borderWidth: titleFocused ? 1 : 0,
                            // borderColor: titleFocused ? iOSColors.systemBlue.defaultLight : 'transparent'
                        }}
                        value={titleInput}
                        onChangeText={(text) => {
                            setTitleInput(text)
                        }}
                        keyboardType='default'
                        keyboardAppearance='default'
                        onSubmitEditing={() => {
                            // dispatch(addRoom({
                            //     id_room: fakeId, room_name: text
                            // }))
                            // onAddRoom ? ({
                            //     id_room: Math.random(), room_name: text
                            // })
                            // navigation.goBack()
                            progressNoteInputRef.current?.focus()
                        }}
                        clearButtonMode="always"
                    />
                    <TextInput
                        outlineColor="transparent"
                        selectionColor={iOSColors.systemBlue.defaultLight}
                        label={"Notes"}
                        className=' transition-all duration-300 ease-in-out'
                        placeholder="A few words about your guideline (optional)"
                        ref={progressNoteInputRef}
                        returnKeyType='done'
                        onFocus={() => {
                            setProgressNoteFocused(true)
                        }}
                        onBlur={() => {
                            setProgressNoteFocused(false)
                        }}
                        style={{
                            height: screenHeight * 0.08,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            margin: 10,
                            padding: 10,
                            paddingLeft: 16,
                            fontSize: 16,
                            // fontWeight: 'bold',
                            color: iOSGrayColors.systemGray2.accessibleLight,
                            // borderWidth: progressNoteFocused ? 1 : 0,
                            // borderColor: progressNoteFocused ? iOSColors.systemBlue.defaultLight : 'transparent'

                        }}
                        value={progressNotesInput}
                        onChangeText={(text) => {
                            setProgressNotesInput(text)
                        }}
                        keyboardType='default'
                        keyboardAppearance='default'
                        onSubmitEditing={async () => {
                            // console.log(1)
                            // const fakeId = Math.floor(Math.random() * 1000)
                            // console.log({ id_room: fakeId, room_name: text })
                            // // dispatch(addRoom({
                            // //     id_room: fakeId, room_name: text
                            // // }))
                            // // onAddRoom ? ({
                            // //     id_room: Math.random(), room_name: text
                            // // })
                            // navigation.goBack()
                            // await handleAddGuildLine()
                            schoolInfoInputRef.current?.focus()
                        }}
                        clearButtonMode="always"
                    />
                    <TextInput
                        outlineColor="transparent"
                        selectionColor={iOSColors.systemBlue.defaultLight}
                        label={"School"}
                        className=' transition-all duration-300 ease-in-out'
                        placeholder="A few words about your guideline (optional)"
                        ref={schoolInfoInputRef}
                        returnKeyType='done'
                        onFocus={() => {
                            setProgressNoteFocused(true)
                        }}
                        onBlur={() => {
                            setProgressNoteFocused(false)
                        }}
                        style={{
                            height: screenHeight * 0.08,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            margin: 10,
                            padding: 10,
                            paddingLeft: 16,
                            fontSize: 16,
                            // fontWeight: 'bold',
                            color: iOSGrayColors.systemGray2.accessibleLight,
                            // borderWidth: progressNoteFocused ? 1 : 0,
                            // borderColor: progressNoteFocused ? iOSColors.systemBlue.defaultLight : 'transparent'

                        }}
                        value={schoolInfoInput}
                        onChangeText={(text) => {
                            setSchoolInfoInput(text)
                        }}
                        keyboardType='default'
                        keyboardAppearance='default'
                        onSubmitEditing={async () => {
                            // console.log(1)
                            // const fakeId = Math.floor(Math.random() * 1000)
                            // console.log({ id_room: fakeId, room_name: text })
                            // // dispatch(addRoom({
                            // //     id_room: fakeId, room_name: text
                            // // }))
                            // // onAddRoom ? ({
                            // //     id_room: Math.random(), room_name: text
                            // // })
                            // navigation.goBack()
                            // await handleAddGuildLine()
                        }}
                        clearButtonMode="always"
                    />
                    <View className='flex-1 mt-2 h-20 justify-center items-center' >
                        <TouchableOpacity activeOpacity={0.65} disabled={
                            titleInput.length == 0 || progressNotesInput.length == 0 || schoolInfoInput.length == 0
                        } className='w-[50%] items-center py-4 rounded-lg' style={{
                            backgroundColor: titleInput.length == 0 || progressNotesInput.length == 0 || schoolInfoInput.length == 0 ? iOSGrayColors.systemGray.accessibleDark : iOSColors.systemBlue.defaultLight,
                        }} onPress={async () => {
                            await handleUpdateEdu()
                        }}>
                            <Text className='text-base text-white font-medium'>Update</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View className='flex-1'>

                    </View> */}
                </ScrollView>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}


export default EditEducationScreen