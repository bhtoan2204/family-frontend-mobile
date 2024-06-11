import React, { useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Image, Button, Pressable, TextInput, KeyboardAvoidingView, Platform, Keyboard, StyleSheet } from 'react-native'
import { AddHouseHoldItemScreenProps, AddHouseHoldRoomScreenProps } from 'src/navigation/NavigationTypes'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';
import ImageComponent from 'src/components/Image/Image';
import FamilyImage from 'src/assets/images/household.png';
import AddHouseHoldItemSheet from './AddHouseHoldItemSheet/AddHouseHoldItemSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import HouseHoldItem from './HouseHoldItem/HouseHoldItem';
import { household_category_dat } from './const/data';
import HouseHoldFilterBar from 'src/components/user/household/household-filter-bar';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import useImageValid from 'src/hooks/useImageValid';

import BoxImage from 'src/assets/images/household_assets/box.png';
import InfoIcon from 'src/assets/images/household_assets/info.png';
import BillsIcon from 'src/assets/images/household_assets/bills.png';
import CategoryIcon from 'src/assets/images/household_assets/category.png';
import ImageIcon from 'src/assets/images/household_assets/image.png';
import RoomIcon from 'src/assets/images/household_assets/room.png';
import ReceiptImage from 'src/assets/images/household_assets/receipt.png';
import AddHouseHoldItemInfoSheet from './AddHouseHoldItemInfoSheet/AddHouseHoldItemInfoSheet';
import StepIndicator from './AddHouseHoldItemInfoSheet/StepIndicator';
import AddHouseholdStepIndicator from 'src/components/user/household/add-household-step-indicator';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import AddHouseHoldItemStep1Sheet from 'src/components/user/household/add-household-item-step1-sheet';
import * as Animatable from 'react-native-animatable';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AddHouseHoldItemPickRoomSheet from 'src/components/user/household/add-household-item-pickroomsheet';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/store';
import { addRoom } from 'src/redux/slices/RoomSlice';



const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

const AddRoomScreen: React.FC<AddHouseHoldRoomScreenProps> = ({ navigation, route }) => {
    const { id_family } = route.params
    // const ItemData = household_items.find(item => item.id_household_item === id_item)
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
                            <Image source={RoomIcon} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
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

                            }}>Name your room</Text>
                            <Text className='text-center mx-4 mt-6' style={{
                                color: iOSGrayColors.systemGray6.accessibleDark,
                                fontSize: 16,


                            }}>A folder groups information about rooms, items, projects and other things</Text>
                        </View>
                    </View>
                    <View className='flex-1 h-full'>
                        <TextInput
                            placeholder="Give your room a name"
                            autoFocus
                            returnKeyType='done'
                            style={{
                                height: screenHeight * 0.08,
                                backgroundColor: 'white',
                                borderRadius: 10,
                                margin: 10,
                                padding: 10,
                                paddingLeft: 16,
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: iOSGrayColors.systemGray2.accessibleLight

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
                                dispatch(addRoom({
                                    id_room: fakeId, room_name: text
                                }))
                                // onAddRoom ? ({
                                //     id_room: Math.random(), room_name: text
                                // })
                                navigation.goBack()
                            }}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    receipt: {
        height: screenHeight * 0.12
    },
    item: {
        height: screenHeight * 0.1,
        width: screenWidth * 0.9,
    }
})
export default AddRoomScreen