import React, { useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Image, Button, Pressable, TextInput, KeyboardAvoidingView, Platform, Keyboard, StyleSheet } from 'react-native'
import { AddEducationScreenProps, AddHouseHoldItemScreenProps, AddSubjectScreenProps } from 'src/navigation/NavigationTypes'
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
import { useKeyboardVisible } from 'src/hooks/useKeyboardVisible';



const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

const AddSubjectScreen: React.FC<AddSubjectScreenProps> = ({ navigation, route }) => {
    const { id_family } = route.params
    // const [rooms, setRooms] = React.useState(roomsData)
    // const ItemData = household_items.find(item => item.id_household_item === id_item)
    // const isKeyboardVisible = useKeyboardVisible()
    const [isFocused, setIsFocused] = React.useState(false)
    const [text, setText] = React.useState('')
    const dispatch = useDispatch<AppDispatch>()

    return (
        <SafeAreaView className="flex-1 bg-[#FBF8F1]">
            <View className='bg-[#F9F6F2] pt-8 rounded-tl-xl rounded-tr-xl flex-1' >
                <ScrollView className='flex-1 ' automaticallyAdjustKeyboardInsets keyboardShouldPersistTaps="handled">
                    <View className='flex-1 '>
                        <View className='w-full items-center mt-5 flex-row justify-between '>
                            <View style={{
                                width: 35,
                                height: 35
                            }}></View>
                            <Image source={CourseIcon} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
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
                        <View className='content-center my-6'>
                            <Text className='text-center' style={{
                                color: iOSGrayColors.systemGray6.accessibleDark,
                                fontSize: 20,
                                fontWeight: 'bold'

                            }}>Input course name</Text>
                            <Text className='text-center mx-4 mt-6' style={{
                                color: iOSGrayColors.systemGray6.accessibleDark,
                                fontSize: 16,


                            }}>It only takes a moment</Text>
                        </View>
                    </View>
                    <View className='flex-1 h-full flex-row items-center justify-center w-full '>
                        <TextInput
                            className='flex-1 w-[90%]'
                            placeholder="Introduction to Computer Science, ..."
                            autoFocus
                            multiline={false}
                            returnKeyType='done'
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
                                console.log(1)
                                const fakeId = Math.floor(Math.random() * 1000)
                                console.log({ id_room: fakeId, room_name: text })
                                // dispatch(addRoom({
                                //     id_room: fakeId, room_name: text
                                // }))
                                // onAddRoom ? ({
                                //     id_room: Math.random(), room_name: text
                                // })
                                navigation.goBack()
                            }}
                            clearButtonMode="always"
                        />
                        <TouchableOpacity
                            activeOpacity={0.65}
                            disabled={text == ""}
                            onPress={() => {

                            }}
                            className=' bg-blue-200 items-center justify-center' style={{
                                width: screenHeight * 0.08,
                                height: screenHeight * 0.08,
                                backgroundColor: text != "" ? iOSColors.systemBlue.defaultLight : iOSGrayColors.systemGray.defaultLight,
                                borderRadius: 10,
                                marginRight: 10,
                                padding: 10,
                                paddingLeft: 16,

                            }}>
                            <Material name="arrow-right" size={25} color={"white"} />
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        </SafeAreaView>
    )
}


export default AddSubjectScreen