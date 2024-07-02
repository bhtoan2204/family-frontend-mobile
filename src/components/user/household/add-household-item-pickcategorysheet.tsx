import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, TextInput, ScrollView, Keyboard, InputAccessoryView, } from 'react-native'
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { useCallback, useMemo, useRef } from 'react';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import BulbIcon from 'src/assets/images/household_assets/bulb.png'
import RoomIcon from 'src/assets/images/household_assets/category.png'
import AddRoomSheet from './add-room-sheet';
import { household_category_dat } from './const/data';
import { COLORS } from 'src/constants';
import { gradients_list } from 'src/assets/images/gradients';
import { HouseHoldCategoryInterface } from 'src/interface/household/household_category';
import { FlatGrid } from 'react-native-super-grid';
import { useSelector } from 'react-redux';


const screenWidth = Dimensions.get('screen').width

// const roomsData = [
//     {
//         id_room: 2,
//         room_name: 'Living room'
//     },


// ]

interface AddHouseHoldItemPickCategorySheetProps {
    refRBSheet: React.RefObject<BottomSheet>;
    onNavigateCreateCategory?: () => void,
    category: number,
    categories: HouseHoldCategoryInterface[],
    onSetCategory: (category: number) => void
}
const AddHouseHoldItemPickCategorySheet = ({
    refRBSheet, onNavigateCreateCategory, category, onSetCategory, categories
}: AddHouseHoldItemPickCategorySheetProps) => {
    const snapPoints = useMemo(() => ['100%'], []);
    console.log(categories)
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    );
    // const [rooms, setRooms] = React.useState(roomsData || [])
    // const categories = useSelector((state: any) => state.household_category)
    const [pickCategory, setPickCategory] = React.useState<number>(category)
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
            onChange={(index) => {
                if (index == -1) {
                    if (pickCategory !== -1) {
                        setPickCategory(-1)
                    }
                }
            }}
        >
            <View className='flex-1 items-center bg-[#FBF8F1]'>
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
                    }}>Pick category for item</Text>
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
                        <ItemItems data={categories} addRoomSheetRef={addRoomSheetRef} onNavigateCreateRoom={onNavigateCreateCategory} pickRoom={pickCategory} setPickCategory={setPickCategory} onSetCategory={onSetCategory} />

                    </View>
                </BottomSheetScrollView >
                {/* <TouchableOpacity className='w-[60%] h-14 rounded-lg my-3 justify-center items-center' style={{
                    backgroundColor: iOSColors.systemBlue.defaultLight,
                }} onPress={() => {
                    onSetCategory(pickCategory)
                    refRBSheet.current?.close()
                }}>
                    <Text className='font-bold text-white'>OK</Text>
                </TouchableOpacity> */}

            </View>
            <AddRoomSheet refRBSheet={addRoomSheetRef} />
        </BottomSheet>
    )
}

interface ItemItemsProps {
    data: HouseHoldCategoryInterface[],
    addRoomSheetRef?: React.RefObject<BottomSheet>
    onNavigateCreateRoom?: () => void
    pickRoom: number
    setPickCategory: (id: number) => void
    onSetCategory: (id: number) => void
    // handleNavigateHouseHoldDetail: (id_item: number) => void;
}

const ItemItems = ({ data, addRoomSheetRef, onNavigateCreateRoom, pickRoom, setPickCategory, onSetCategory }: ItemItemsProps) => {
    const addRoomObj: HouseHoldCategoryInterface = {
        category_image: "",
        category_name: "",
        id_household_item_category: -1,
    }
    const newData = [addRoomObj, ...data]
    const renderItem = (item: HouseHoldCategoryInterface, index: number) => {
        return (
            item.id_household_item_category == -1 ? <>
                <View className='items-center ' style={{
                    // flex: 1,
                    marginRight: index % 2 == 0 ? 10 : 0,
                    marginLeft: index % 2 == 1 ? 10 : 0,
                    marginBottom: 20,
                    borderColor: iOSGrayColors.systemGray5.defaultLight,
                }}>
                    <TouchableOpacity onPress={onNavigateCreateRoom}>
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
                        }}>Add new category</Text>
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
                        setPickCategory(item.id_household_item_category)
                        onSetCategory(item.id_household_item_category)
                        addRoomSheetRef?.current?.close()
                        // handleNavigateHouseHoldDetail(item.id_household_item)
                    }}>
                        <Image
                            source={item.category_image ? { uri: item.category_image } : gradients_list[index - 1 % gradients_list.length]}
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
                            color: item.id_household_item_category == pickRoom ? iOSColors.systemBlue.defaultLight : COLORS.Rhino,
                            fontSize: 16,
                            fontWeight: 500,
                            marginTop: 10,

                        }}>{item.category_name} {
                                item.id_household_item_category == pickRoom ? <Material name='check' size={20} color={iOSColors.systemBlue.defaultLight} /> : null

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

export default AddHouseHoldItemPickCategorySheet