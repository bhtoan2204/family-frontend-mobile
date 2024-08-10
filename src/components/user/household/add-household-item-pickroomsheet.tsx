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
import { useSelector } from 'react-redux';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';
import { getTranslate } from 'src/redux/slices/languageSlice';



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
    // console.log(roomsData)
    const snapPoints = useMemo(() => ['95%'], []);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    );
    const [pickRoom, setPickRoom] = React.useState<number>(room)
    const isDarkMode = useSelector(getIsDarkMode)
    const translate = useSelector(getTranslate)
    const [key, setKey] = React.useState<boolean>(false)

    return (
        <BottomSheet
            ref={refRBSheet}
            enableOverDrag
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            backgroundStyle={{
                backgroundColor: isDarkMode ? '#0A1220' : '#F7F7F7'
            }}
            handleIndicatorStyle={{ backgroundColor: isDarkMode ? '#D9D9D9' : '#D9D9D9', }}
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
                    setKey(!key)
                } else {
                    setKey(!key)
                }
            }}

        >
            <View className='flex-1 items-center bg-[#F7F7F7] dark:bg-[#0A1220]'>
                <View className='py-4'>
                    {/* <Image source={RoomIcon} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} /> */}
                </View>
                <View className='flex-row justify-between  w-full'>
                    <View style={{
                        height: 50,
                        width: 50,
                    }} className=''>

                    </View>
                    <Text className=' font-bold text-black dark:text-white ' style={{
                        fontSize: 18,
                    }}>{
                            translate('pick_room_for_item')
                        }</Text>
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

                        <ItemItems
                            data={roomsData || []}
                            addRoomSheetRef={addRoomSheetRef}
                            onNavigateCreateRoom={onNavigateCreateRoom}
                            pickRoom={pickRoom}
                            setPickRoom={setPickRoom}
                            onSetRoom={(room: number) => {
                                onSetRoom(room)
                                refRBSheet.current?.close()
                            }}
                            k={key}
                            isDark={isDarkMode}
                        />

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
    k: boolean,
    isDark: boolean
    // handleNavigateHouseHoldDetail: (id_item: number) => void;
}

const ItemItems = ({ data, addRoomSheetRef, onNavigateCreateRoom, pickRoom, setPickRoom, onSetRoom, k, isDark }: ItemItemsProps) => {
    const translate = useSelector(getTranslate)
    const addRoomObj: RoomInterface = {
        room_name: "",
        room_image: "",
        id_family: -1,
        id_room: -1,
        created_at: "",
        updated_at: "",
    }
    const newData = [addRoomObj, ...data]
    const renderItem2 = React.useCallback((item: RoomInterface, index: number) => {
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
                            backgroundColor: isDark ? '#0A1220' : '#e1e1e1',
                            width: '100%',
                            height: undefined,
                            borderRadius: 15,
                            borderWidth: 1,
                            borderColor: !isDark ? '#DEDCDC' : '#66C0F4',
                            // height: screenHeight * 0.2,
                            aspectRatio: 1,
                        }}>
                            <Material name='plus' size={screenWidth * 0.12} color={iOSGrayColors.systemGray.defaultLight} style={{
                                textAlign: 'center',

                            }} />
                        </View>
                        <Text style={{
                            textAlign: 'center',
                            color: isDark ? 'white' : COLORS.Rhino,
                            fontSize: 16,
                            fontWeight: 500,
                            marginTop: 10,
                        }}>{
                                translate('add_new_room_text')
                            }</Text>
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
                            source={item.room_image ? { uri: item.room_image, cache: 'force-cache' } : gradients_list[index - 1 % gradients_list.length]}
                            style={{
                                width: '100%',
                                height: undefined,
                                borderRadius: 15,
                                borderWidth: 1,
                                borderColor: !isDark ? '#DEDCDC' : '#66C0F4',
                                aspectRatio: 1,
                            }}
                        />
                        <Text style={{
                            textAlign: 'center',
                            color: item.id_room == pickRoom ? iOSColors.systemBlue.defaultLight : (isDark ? 'white' : COLORS.Rhino),
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
    }, [pickRoom, isDark])
    return (
        <View className=' items-center flex-1  mx-[10%]'>
            <FlatGrid
                key={k.toString()}
                itemDimension={screenWidth * 0.35}
                maxItemsPerRow={2}
                data={newData}

                spacing={0}

                renderItem={({ item, index }) => renderItem2(item, index)}
                scrollEnabled={false}
                removeClippedSubviews={true}
                initialNumToRender={2}
                maxToRenderPerBatch={4}
                updateCellsBatchingPeriod={100}
                windowSize={7}
            />
        </View>
    )
}

export default AddHouseHoldItemPickRoomSheet