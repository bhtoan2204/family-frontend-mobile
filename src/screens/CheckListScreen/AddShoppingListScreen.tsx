import React, { useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Image, TextInput, KeyboardAvoidingView, Platform, } from 'react-native'
import { AddGuildLineScreenProps, AddShoppingListScreenProps } from 'src/navigation/NavigationTypes'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';
import ImageComponent from 'src/components/Image/Image';

import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';

import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';
import ShoppingListIcon from 'src/assets/images/checklist_assets/shopping_list.png';
import { addNewCheckListItem } from 'src/redux/slices/CheckListSlice';


const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

const AddShoppingListScreen: React.FC<AddShoppingListScreenProps> = ({ navigation, route }) => {
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

    const handleAddNewShoppingList = async () => {
        dispatch(addNewCheckListItem({
            id_list: Math.floor(Math.random() * 1000),
            id_family: id_family!,
            title: text,
            completed: 0,
            total: 0,
            checklistItems: []
        }))
        navigation.goBack()
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
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View className='flex-1 '>
                        <View className='w-full items-center mt-5 flex-row justify-between '>
                            <View style={{
                                width: 35,
                                height: 35
                            }}></View>
                            <Image source={ShoppingListIcon} style={{ width: screenWidth * 0.15, height: screenWidth * 0.15 }} />
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
                                Give us a name for your shoppinglist
                            </Text>
                            <Text className='text-center mx-4 mt-6' style={{
                                color: iOSGrayColors.systemGray6.accessibleDark,
                                fontSize: 16,
                            }}>
                                You can add a description to your shopping list, or just leave it empty

                            </Text>
                        </View>
                    </View>
                    <TextInput
                        placeholder="Grocery at the market, etc."
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
                        placeholder="Optional: describe your shopping list here"
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
                            await handleAddNewShoppingList()
                        }}
                        clearButtonMode="always"
                    />
                    <View className='flex-1 mt-2 h-20 justify-center items-center' >
                        <TouchableOpacity activeOpacity={0.65} disabled={
                            text.length == 0
                        } className='w-[50%] items-center py-4 rounded-lg' style={{
                            backgroundColor: text.length == 0 ? iOSGrayColors.systemGray.accessibleDark : iOSColors.systemBlue.defaultLight,
                        }} onPress={async () => {
                            await handleAddNewShoppingList()
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


export default AddShoppingListScreen