import React, { useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Image, Button, Pressable, TextInput, KeyboardAvoidingView, Platform, Keyboard, StyleSheet } from 'react-native'
import { AddEducationScreenProps, AddGuildLineScreenProps, AddHouseHoldItemScreenProps, AddSubjectScreenProps, UpdateGuildLineScreenProps } from 'src/navigation/NavigationTypes'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';
import ImageComponent from 'src/components/Image/Image';
import FamilyImage from 'src/assets/images/household.png';
// import AddHouseHoldItemSheet from './AddHouseHoldItemSheet/AddHouseHoldItemSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
// import HouseHoldItem from './HouseHoldItem/HouseHoldItem';
// import { household_category_dat } from './const/data';
import HouseHoldFilterBar from 'src/components/user/household/household-filter-bar';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import RoomIcon from 'src/assets/images/household_assets/room.png';
// import AddHouseHoldItemInfoSheet from './AddHouseHoldItemInfoSheet/AddHouseHoldItemInfoSheet';
// import StepIndicator from './AddHouseHoldItemInfoSheet/StepIndicator';
import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';
import CourseIcon from 'src/assets/images/education_assets/course.png';
import HelpIcon from 'src/assets/images/guideline_assets/help.png';
import UpdateIcon from 'src/assets/images/guideline_assets/update.png';
import { updateGuideline, updateGuidelineTitleAndDescription } from 'src/redux/slices/GuidelineSlice';

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

const UpdateGuildLineScreen: React.FC<UpdateGuildLineScreenProps> = ({ navigation, route }) => {
    const { id_family, id_item, title, description } = route.params
    // const [rooms, setRooms] = React.useState(roomsData)
    // const ItemData = household_items.find(item => item.id_household_item === id_item)
    // const isKeyboardVisible = useKeyboardVisible()
    const textInputRef = useRef<TextInput>(null)
    const descriptionInputRef = useRef<TextInput>(null)

    const [isFocused, setIsFocused] = React.useState(false)
    const [descriptionIsFocused, setDescriptionIsFocused] = React.useState(false)
    const [text, setText] = React.useState(title || "")
    const [desc, setDesc] = React.useState(description || "")
    const dispatch = useDispatch<AppDispatch>()

    const handleUpdateGuildLine = async () => {
        dispatch(updateGuidelineTitleAndDescription({
            id_guide_item: id_item,
            title: text,
            description: desc
        }))
        navigation.goBack()
    }

    return (
        <SafeAreaView className="flex-1 bg-[#FBF8F1]">
            <KeyboardAvoidingView className='bg-[#F9F6F2] pt-8 rounded-tl-xl rounded-tr-xl flex-1 '
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView className='flex-1 ' automaticallyAdjustKeyboardInsets={true} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                    <View className='flex-1 '>
                        <View className='w-full items-center mt-5 flex-row justify-between '>
                            <View style={{
                                width: 35,
                                height: 35
                            }}></View>
                            <Image source={UpdateIcon} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
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
                        <View className='content-center my-6 mx-2'>
                            <Text className='text-center' style={{
                                color: iOSGrayColors.systemGray6.accessibleDark,
                                fontSize: 20,
                                fontWeight: 'bold'

                            }}>Update your guideline's title and description</Text>
                            <Text className='text-center mx-4 mt-6' style={{
                                color: iOSGrayColors.systemGray6.accessibleDark,
                                fontSize: 16,


                            }}>
                                Give us a few words about your guideline and its title

                            </Text>
                        </View>
                    </View>
                    <TextInput
                        placeholder="How to cook a delicious meal, ..."
                        ref={textInputRef}
                        autoFocus
                        returnKeyType='next'
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
                        onSubmitEditing={() => {
                            // dispatch(addRoom({
                            //     id_room: fakeId, room_name: text
                            // }))
                            // onAddRoom ? ({
                            //     id_room: Math.random(), room_name: text
                            // })
                            // navigation.goBack()
                            descriptionInputRef.current?.focus()
                        }}
                        clearButtonMode="always"
                    />
                    <TextInput
                        className=' transition-all duration-300 ease-in-out'
                        placeholder="A few words about your guideline (optional)"
                        ref={descriptionInputRef}
                        returnKeyType='done'
                        onFocus={() => {
                            setDescriptionIsFocused(true)
                        }}
                        onBlur={() => {
                            setDescriptionIsFocused(false)
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
                            borderWidth: descriptionIsFocused ? 1 : 0,
                            borderColor: descriptionIsFocused ? iOSColors.systemBlue.defaultLight : 'transparent'

                        }}
                        value={desc}
                        onChangeText={(text) => {
                            setDesc(text)
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
                            await handleUpdateGuildLine()
                        }}
                        clearButtonMode="always"
                    />
                    <View className='flex-1 mt-2 h-20 justify-center items-center' >
                        <TouchableOpacity className='w-[50%] items-center py-4 rounded-lg' activeOpacity={0.65} disabled={
                            title == text && description == desc
                        } style={{
                            backgroundColor: title == text && description == desc ? iOSGrayColors.systemGray.accessibleDark : iOSColors.systemBlue.defaultLight,
                        }} onPress={async () => {
                            await handleUpdateGuildLine()
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


export default UpdateGuildLineScreen