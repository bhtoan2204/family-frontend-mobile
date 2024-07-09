import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, TextInput, ScrollView, Keyboard, InputAccessoryView, } from 'react-native'
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { useCallback, useMemo, } from 'react';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import { gradients_list } from 'src/assets/images/gradients';
import { FlatGrid } from 'react-native-super-grid';
import { COLORS } from 'src/constants';
import { RoomInterface } from 'src/interface/household/room';



const screenWidth = Dimensions.get('screen').width

interface AddHouseHoldItemPickRoomSheetProps {
    refRBSheet: React.RefObject<BottomSheet>;
    roomsData?: RoomInterface[];
    onNavigateCreateRoom?: () => void
    room: number
    onSetRoom: (room: number) => void;
    addRoomSheetRef: React.RefObject<BottomSheet>

}
const AddHouseHoldItemPickRoomSheet = ({
    refRBSheet, roomsData, onNavigateCreateRoom, room, onSetRoom, addRoomSheetRef
}: AddHouseHoldItemPickRoomSheetProps) => {
    const snapPoints = useMemo(() => ['95%'], []);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    );
    const [pickRoom, setPickRoom] = React.useState<number>(room)
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
            onChange={(index) => {
                if (index == -1) {
                    if (pickRoom !== -1) {
                        setPickRoom(room)
                    }
                }
            }}

        >
            <View className='flex-1 items-center bg-[#F7F7F7]'>
                <View className='py-4'>
                    {/* <Image source={RoomIcon} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} /> */}
                </View>
                <View className='flex-row justify-between  w-full'>
                    <View style={{
                        height: 50,
                        width: 50,
                    }} className=''>

                    </View>
                    <Text className=' font-bold ' style={{
                        fontSize: 18,
                    }}>Pick room for item</Text>
                    <TouchableOpacity style={{
                        height: 50,
                        width: 50,
                    }} className='' onPress={() => {
                        refRBSheet.current?.close()
                    }}>
                        <Material name='close' size={24} color={iOSGrayColors.systemGray.defaultLight} />
                    </TouchableOpacity>
                </View>

                <BottomSheetScrollView snapToInterval={Dimensions.get('screen').width} showsHorizontalScrollIndicator={false} contentContainerStyle={{ minHeight: '100%' }}>
                    <View className='mt-5'>

                        <ItemItems data={roomsData || []} addRoomSheetRef={addRoomSheetRef} onNavigateCreateRoom={onNavigateCreateRoom} pickRoom={pickRoom} setPickRoom={setPickRoom} onSetRoom={onSetRoom} />

                    </View>
                </BottomSheetScrollView >


            </View>

        </BottomSheet>
    )
}

interface ItemItemsProps {
    data: RoomInterface[],
    addRoomSheetRef?: React.RefObject<BottomSheet>
    onNavigateCreateRoom?: () => void
    pickRoom: number
    setPickRoom: (room: number) => void
    onSetRoom: (room: number) => void
    // handleNavigateHouseHoldDetail: (id_item: number) => void;
}

const ItemItems = ({ data, addRoomSheetRef, onNavigateCreateRoom, pickRoom, setPickRoom, onSetRoom }: ItemItemsProps) => {
    const addRoomObj: RoomInterface = {
        room_name: 'Add room',
        room_image: "",
        id_family: -1,
        id_room: -1,
        created_at: "",
        updated_at: "",
    }
    const newData = [addRoomObj, ...data]
    const renderItem = (item: RoomInterface, index: number) => {
        return (
            item.id_room == -1 ? <>
                <View className='items-center ' style={{
                    // flex: 1,
                    marginRight: index % 2 == 0 ? 10 : 0,
                    marginLeft: index % 2 == 1 ? 10 : 0,
                    marginBottom: 20,
                    borderColor: iOSGrayColors.systemGray5.defaultLight,
                }}>
                    <TouchableOpacity onPress={() => {
                        console.log('navigate')
                        addRoomSheetRef?.current?.expand()
                    }}>
                        <View className='items-center justify-center' style={{
                            // width: screenWidth * 0.3,
                            backgroundColor: '#e1e1e1',
                            width: '100%',
                            height: undefined,
                            borderRadius: 15,
                            // height: screenHeight * 0.2,
                            aspectRatio: 1,
                        }}>
                            <Material name='plus' size={screenWidth * 0.12} color={iOSGrayColors.systemGray.defaultLight} style={{
                                textAlign: 'center',

                            }} />
                        </View>
                        <Text style={{
                            textAlign: 'center',
                            color: COLORS.Rhino,
                            fontSize: 16,
                            fontWeight: 500,
                            marginTop: 10,
                        }}>Add new room</Text>
                    </TouchableOpacity>
                </View>
            </> : <>
                <View className='items-center ' style={{
                    // flex: 1,
                    marginRight: index % 2 == 0 ? 10 : 0,
                    marginLeft: index % 2 == 1 ? 10 : 0,
                    marginBottom: 20,
                    borderColor: iOSGrayColors.systemGray5.defaultLight,
                }}>
                    <TouchableOpacity onPress={() => {
                        setPickRoom(item.id_room)
                        onSetRoom(item.id_room)
                        addRoomSheetRef?.current?.close()
                        // handleNavigateHouseHoldDetail(item.id_household_item)
                    }}>
                        <Image
                            source={item.room_image ? { uri: item.room_image } : gradients_list[index - 1 % gradients_list.length]}
                            style={{
                                // width: screenWidth * 0.3,
                                width: '100%',
                                height: undefined,
                                borderRadius: 15,
                                // height: screenHeight * 0.2,
                                aspectRatio: 1,
                            }}
                        />
                        <Text style={{
                            textAlign: 'center',
                            color: item.id_room == pickRoom ? iOSColors.systemBlue.defaultLight : COLORS.Rhino,
                            fontSize: 16,
                            fontWeight: 500,
                            marginTop: 10,

                        }}>{item.room_name} {
                                item.id_room == pickRoom ? <Material name='check' size={20} color={iOSColors.systemBlue.defaultLight} /> : null

                            }</Text>
                    </TouchableOpacity>
                </View>
            </>
        )
    }
    return (
        <View className=' items-center flex-1  mx-[10%]'>
            <FlatGrid
                itemDimension={screenWidth * 0.35}
                maxItemsPerRow={2}
                data={newData}

                spacing={0}

                renderItem={({ item, index }) => renderItem(item, index)}
                scrollEnabled={false}
            />
        </View>
    )
}

export default AddHouseHoldItemPickRoomSheet