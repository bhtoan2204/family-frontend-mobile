import React, { useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Image, Button, Pressable, TextInput, KeyboardAvoidingView, Platform, Keyboard, StyleSheet } from 'react-native'
import { AddEducationScreenProps, AddHouseHoldItemScreenProps, AddSubjectScreenProps, EditDescriptionHouseHoldItemScreenProps, EditDescriptionScreenProps } from 'src/navigation/NavigationTypes'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
// import AddHouseHoldItemSheet from './AddHouseHoldItemSheet/AddHouseHoldItemSheet';
// import HouseHoldItem from './HouseHoldItem/HouseHoldItem';
// import { household_category_dat } from './const/data';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import RoomIcon from 'src/assets/images/household_assets/room.png';
// import AddHouseHoldItemInfoSheet from './AddHouseHoldItemInfoSheet/AddHouseHoldItemInfoSheet';
// import StepIndicator from './AddHouseHoldItemInfoSheet/StepIndicator';
import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';
import CourseIcon from 'src/assets/images/education_assets/course.png';
import { updateDescription } from 'src/redux/slices/HouseHoldDetailSlice';
import EditImage from 'src/assets/images/household_assets/edit.png';
import { COLORS } from 'src/constants';


const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

const EditHouseHoldDescriptionScreen: React.FC<EditDescriptionScreenProps> = ({ navigation, route }) => {
    const { id_family, description, id_category, id_item } = route.params
    // const [rooms, setRooms] = React.useState(roomsData)
    // const ItemData = household_items.find(item => item.id_household_item === id_item)
    // const isKeyboardVisible = useKeyboardVisible()
    const [isFocused, setIsFocused] = React.useState(false)
    const [text, setText] = React.useState(description || "")
    const dispatch = useDispatch<AppDispatch>()

    const handleSubmit = async () => {
        dispatch(updateDescription(text))
        navigation.goBack()
    }

    // const handleAddSubject = async () => {
    //     // const response = await EducationServices.createEducation(id_family, id_user, title, progress_notes, school_info)
    //     const response = await EducationServices.createSubject(
    //         id_education_progress,
    //         id_family!,
    //         text,
    //         ""
    //     )
    //     if (response) {
    //         // console.log(response)
    //         const newSubject: Subject = {
    //             component_scores: response.component_scores,
    //             id_education_progress: id_education_progress,
    //             id_subject: response.id_subject,
    //             subject_name: response.subject_name,
    //             description: response.description,
    //             final_score: {
    //                 score: response.final_score,
    //                 // expected_score: response.final_score.expected_score
    //                 component_name: "Final"
    //             },
    //             midterm_score: {
    //                 score: response.midterm_score,
    //                 // expected_score: response.midterm_score.expected_score
    //                 component_name: "Midterm"

    //             },
    //             bonus_score: response.bonus_score,
    //             status: response.status
    //         }
    //         dispatch(addSubject(newSubject))
    //         navigation.goBack()
    //     }
    //     else {
    //         console.log('error')
    //         navigation.goBack()
    //     }
    //     // dispatch(addEducation(response))
    //     // navigation.goBack()
    // }

    return (
        <SafeAreaView className="flex-1 bg-[#FBF8F1]">
            <View className='bg-[#F9F6F2] rounded-tl-xl rounded-tr-xl flex-1' >
                <ScrollView className='flex-1 '
                    automaticallyAdjustKeyboardInsets
                    keyboardShouldPersistTaps="handled"
                >
                    <View className='flex-1 '>
                        <View className='w-full items-center mt-5 flex-row justify-between '>

                            <TouchableOpacity className=' rounded-full border-[1px] z-10 ml-2' style={{
                                borderColor: iOSGrayColors.systemGray.accessibleDark,
                                backgroundColor: iOSGrayColors.systemGray.accessibleLight
                            }} onPress={() => {
                                navigation.goBack()
                            }} >
                                <Material name="close" size={23} color={'white'} />
                            </TouchableOpacity>
                            <Image source={EditImage} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
                            {/* <Material name="package-variant" size={35} style={{ color: iOSGrayColors.systemGray6.accessibleDark, fontWeight: "bold" }} /> */}
                            <View style={{
                                width: 35,
                                height: 35
                            }}></View>
                        </View>
                        <View className='content-center my-6'>
                            <Text className='text-center' style={{
                                color: iOSGrayColors.systemGray6.accessibleDark,
                                fontSize: 20,
                                fontWeight: 'bold'

                            }}>
                                Edit Description
                            </Text>
                            {/* <Text className='text-center mx-4 mt-6' style={{
                                color: iOSGrayColors.systemGray6.accessibleDark,
                                fontSize: 16,
                            }}>
                                Type in the new description for your item

                            </Text> */}
                        </View>
                    </View>
                    <View className='flex-1 h-full flex-row items-center justify-center w-full '>
                        <TextInput
                            className='flex-1 w-[90%]'
                            placeholder="Introduction to Computer Science, ..."
                            autoFocus
                            multiline={false}
                            returnKeyType={text == "" || text == description ? "default" : "done"}
                            // returnKeyLabel={text != "" && text != description ? "Done" : "Next"}
                            onFocus={() => {
                                setIsFocused(true)
                            }}
                            onBlur={() => {
                                setIsFocused(false)
                            }}
                            style={{
                                height: screenHeight * 0.08,
                                backgroundColor: 'white',
                                borderRadius: 10,
                                margin: 10,
                                padding: 10,
                                paddingLeft: 16,
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: iOSGrayColors.systemGray2.accessibleLight,
                                borderWidth: isFocused ? 1 : 0,
                                borderColor: isFocused ? iOSColors.systemBlue.defaultLight : 'transparent'
                            }}
                            value={text}
                            onChangeText={(text) => {
                                setText(text)
                            }}
                            keyboardType='default'
                            keyboardAppearance='default'
                            onSubmitEditing={async () => {
                                await handleSubmit()
                            }}
                            clearButtonMode="always"
                        />
                        <TouchableOpacity
                            activeOpacity={0.65}
                            disabled={text == "" || text == description}
                            onPress={async () => {
                                await handleSubmit()
                            }}
                            className=' bg-blue-200 items-center justify-center' style={{
                                width: screenHeight * 0.08,
                                height: screenHeight * 0.08,
                                backgroundColor: text != "" && text != description ? COLORS.DenimBlue : iOSGrayColors.systemGray.defaultLight,
                                borderRadius: 10,
                                marginRight: 10,
                                padding: 10,
                                
                                // paddingLeft: 16,

                            }}>
                            <Material name="arrow-left" size={25} color={"white"} />
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        </SafeAreaView>
    )
}


export default EditHouseHoldDescriptionScreen