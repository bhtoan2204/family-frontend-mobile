import React, { useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Image, TextInput, KeyboardAvoidingView, Platform, } from 'react-native'
import { AddGuildLineScreenProps } from 'src/navigation/NavigationTypes'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';
import ImageComponent from 'src/components/Image/Image';
import { useHeaderHeight } from '@react-navigation/elements'

import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';

import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';
import HelpIcon from 'src/assets/images/guideline_assets/help.png';
import { addGuideline } from 'src/redux/slices/GuidelineSlice';
import { GuideLineService } from 'src/services/apiclient';


const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

const AddGuildLineScreen: React.FC<AddGuildLineScreenProps> = ({ navigation, route }) => {
    const { id_family } = route.params
    // const [rooms, setRooms] = React.useState(roomsData)
    // const ItemData = household_items.find(item => item.id_household_item === id_item)
    // const isKeyboardVisible = useKeyboardVisible()
    const textInputRef = useRef<TextInput>(null)
    const descriptionInputRef = useRef<TextInput>(null)

    const [isFocused, setIsFocused] = React.useState(false)
    const [descriptionIsFocused, setDescriptionIsFocused] = React.useState(false)
    const [text, setText] = React.useState('')
    const [description, setDescription] = React.useState('')
    const dispatch = useDispatch<AppDispatch>()

    const handleAddGuildLine = async () => {
        console.log("add guildline")
        // setGuidelines((prev: Guildline[]) => {
        //     return [...prev, {
        //         id_item: Math.floor(Math.random()) * 100,
        //         name: name,
        //         description: description,
        //         created_at: "",
        //         updated_at: ""
        //     }];
        // });
        try {
            const newGuildline = await GuideLineService.addGuildLine(id_family!, text, description)
            console.log(newGuildline)
            if (newGuildline) {
                dispatch(addGuideline(newGuildline))
            }
            navigation.goBack()
        } catch (error) {
            console.log(error)
        }

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

                            }}>Input guideline's title and description</Text>
                            <Text className='text-center mx-4 mt-6' style={{
                                color: iOSGrayColors.systemGray6.accessibleDark,
                                fontSize: 16,


                            }}>
                                Describe your guideline in a few words. This will help others to understand what your guideline is about.

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
                        value={description}
                        onChangeText={(text) => {
                            setDescription(text)
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
                            await handleAddGuildLine()
                        }}
                        clearButtonMode="always"
                    />
                    <View className='flex-1 mt-2 h-20 justify-center items-center' >
                        <TouchableOpacity activeOpacity={0.65} disabled={
                            text.length == 0
                        } className='w-[50%] items-center py-4 rounded-lg' style={{
                            backgroundColor: text.length == 0 ? iOSGrayColors.systemGray.accessibleDark : iOSColors.systemBlue.defaultLight,
                        }} onPress={async () => {
                            await handleAddGuildLine()
                        }}>
                            <Text className='text-base text-white font-medium'>Create</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View className='flex-1'>

                    </View> */}
                </ScrollView>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}


export default AddGuildLineScreen