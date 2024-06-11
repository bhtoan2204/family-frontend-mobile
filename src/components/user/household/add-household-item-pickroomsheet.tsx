import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, TextInput, ScrollView, Keyboard, InputAccessoryView, } from 'react-native'
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { useCallback, useMemo, useRef } from 'react';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import BulbIcon from 'src/assets/images/household_assets/bulb.png'
import RoomIcon from 'src/assets/images/household_assets/room.png'
import AddRoomSheet from './add-room-sheet';



const screenWidth = Dimensions.get('screen').width

interface AddHouseHoldItemPickRoomSheetProps {
    refRBSheet: React.RefObject<BottomSheet>;
    roomsData?: { id_room: number, room_name: string }[];
    onNavigateCreateRoom?: () => void
    room: number
    onSetRoom: (room: number) => void

}
const AddHouseHoldItemPickRoomSheet = ({
    refRBSheet, roomsData, onNavigateCreateRoom, room, onSetRoom
}: AddHouseHoldItemPickRoomSheetProps) => {
    const snapPoints = useMemo(() => ['70%'], []);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    );
    // const [rooms, setRooms] = React.useState(roomsData || [])
    const [pickRoom, setPickRoom] = React.useState<number>(room)
    const addRoomSheetRef = useRef<BottomSheet>(null)
    return (
        <BottomSheet
            ref={refRBSheet}
            enableOverDrag
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            handleIndicatorStyle={{ backgroundColor: iOSGrayColors.systemGray6.defaultLight, }}
            backdropComponent={renderBackdrop}
            onClose={() => {
                Keyboard.dismiss()
            }}
            keyboardBehavior="extend"
            keyboardBlurBehavior="restore"
        // onChange={(index) => {
        //     if (index == -1) {
        //         if (pickRoom !== -1) {
        //             setPickRoom(room)
        //         }
        //     }
        // }}

        >
            <View className='flex-1 items-center bg-[#FBF8F1]'>
                <View className='py-4'>
                    <Image source={RoomIcon} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
                </View>
                <Text className=' font-bold' style={{
                    fontSize: 18,
                }}>Pick room for item</Text>
                <BottomSheetScrollView horizontal snapToInterval={Dimensions.get('screen').width} showsHorizontalScrollIndicator={false} contentContainerStyle={{ minHeight: '100%' }}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                            // addRoomSheetRef.current?.expand()
                            onNavigateCreateRoom?.()
                        }}
                        style={{

                            backgroundColor: 'white',
                            width: Dimensions.get('screen').width * 0.33,
                            height: Dimensions.get('screen').width * 0.5,


                        }}
                        className='border-[0.1px] shadow-md my-4 mx-2 rounded-lg '
                    // className={`${choosenCategoryIndex === index ? 'border-b-2 border-[#56409e]' : ''}`}
                    >
                        <View className='flex-1'>
                            <View className='content-center items-center justify-center py-2  ' >
                                <View style={{
                                    width: '75%', height: '75%'
                                }} className='justify-center items-center'>

                                    <Material name="plus" size={50} color={iOSGrayColors.systemGray6.accessibleLight} />
                                </View>
                            </View>
                            <View className='flex-1 justify-start '>
                                <Text className=' text-sm justify-center  pl-3' style={{
                                    color: iOSGrayColors.systemGray6.accessibleDark,
                                }}>Add</Text>
                                <Text className=' text-sm justify-center font-medium  pl-3' style={{
                                    color: iOSGrayColors.systemGray6.accessibleDark,
                                }}>Anything</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {roomsData && roomsData.map((room, index) => (
                        <TouchableOpacity
                            activeOpacity={0.5}
                            key={room.id_room}
                            onPress={() => {
                                if (pickRoom === room.id_room) {
                                    setPickRoom(-1)
                                } else {
                                    setPickRoom(room.id_room)
                                }
                            }}
                            style={{
                                backgroundColor: 'white',
                                width: Dimensions.get('screen').width * 0.33,
                                height: Dimensions.get('screen').width * 0.5,
                                borderColor: pickRoom === room.id_room ? iOSColors.systemBlue.defaultLight : iOSGrayColors.systemGray6.defaultLight,
                                borderWidth: pickRoom === room.id_room ? 2 : 0,
                            }}
                            className=' shadow-md my-4 mx-2 rounded-lg '
                        // className={`${choosenCategoryIndex === index ? 'border-b-2 border-[#56409e]' : ''}`}
                        >
                            <View className='flex-1'>
                                <View className='content-center items-center py-2  '>
                                    <Image source={RoomIcon} style={{ width: '75%', height: '75%' }} />
                                </View>
                                <View className='flex-1 justify-start '>
                                    <Text className=' text-sm justify-center  pl-3' style={{
                                        color: iOSGrayColors.systemGray6.accessibleDark,
                                    }}>Add</Text>
                                    <Text className=' text-sm font-medium justify-center  pl-3' style={{
                                        color: iOSGrayColors.systemGray6.accessibleDark,
                                    }}>{room.room_name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </BottomSheetScrollView >
                <TouchableOpacity className='w-[60%] h-14 rounded-lg my-3 justify-center items-center' style={{
                    backgroundColor: iOSColors.systemBlue.defaultLight,
                }} onPress={() => {
                    onSetRoom(pickRoom)
                    refRBSheet.current?.close()
                }}>
                    <Text className='font-bold text-white'>OK</Text>
                </TouchableOpacity>

            </View>
            <AddRoomSheet refRBSheet={addRoomSheetRef} />
        </BottomSheet>
    )
}

export default AddHouseHoldItemPickRoomSheet