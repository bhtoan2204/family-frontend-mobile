import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, TextInput, ScrollView, Keyboard, InputAccessoryView, } from 'react-native'
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { useCallback, useMemo, useRef } from 'react';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import BulbIcon from 'src/assets/images/household_assets/bulb.png'
import RoomIcon from 'src/assets/images/household_assets/category.png'

import { COLORS } from 'src/constants';
import { gradients_list } from 'src/assets/images/gradients';
import { HouseHoldCategoryInterface } from 'src/interface/household/household_category';
import { FlatGrid } from 'react-native-super-grid';
import { useSelector } from 'react-redux';
import { ShoppingListItemType } from 'src/interface/shopping/shopping_list';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';


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
    categories: ShoppingListItemType[],
    onSetCategory: (category: number) => void
}
const ShoppingListPickCategorySheet = ({
    refRBSheet, onNavigateCreateCategory, category, onSetCategory, categories
}: AddHouseHoldItemPickCategorySheetProps) => {
    const snapPoints = useMemo(() => ['90%'], []);
    // console.log(categories)
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    );
    // const [rooms, setRooms] = React.useState(roomsData || [])
    // const categories = useSelector((state: any) => state.household_category)
    const [pickCategory, setPickCategory] = React.useState<number>(category)
    const addRoomSheetRef = useRef<BottomSheet>(null)
    const isDarkMode = useSelector(getIsDarkMode)

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
            backgroundStyle={{
                backgroundColor: isDarkMode ? '#0A1220' : '#F7F7F7'
            }}
            keyboardBehavior="extend"
            keyboardBlurBehavior="restore"
            onChange={(index) => {
                // console.log(categories)
                if (index == -1) {
                    if (pickCategory === -1) {
                        setPickCategory(-1)
                    }
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
                    <Text className=' font-bold ' style={{
                        fontSize: 18,
                    }}>Pick category for item</Text>
                    <TouchableOpacity style={{
                        height: 50,
                        width: 50,
                    }} className='' onPress={() => {
                        refRBSheet.current?.close()
                    }}>
                        <Material name='close' size={24} color={
                            isDarkMode ? 'white' : iOSGrayColors.systemGray.defaultLight
                        } />
                    </TouchableOpacity>
                </View>
                <BottomSheetScrollView snapToInterval={Dimensions.get('screen').width} showsHorizontalScrollIndicator={false} contentContainerStyle={{ minHeight: '100%' }}>
                    <View className='mt-5'>
                        <ItemItems
                            data={categories} addRoomSheetRef={addRoomSheetRef} onNavigateCreateRoom={onNavigateCreateCategory} pickRoom={pickCategory} setPickCategory={setPickCategory} onSetCategory={onSetCategory}
                            isDarkMode={isDarkMode}
                        />

                    </View>
                </BottomSheetScrollView >


            </View>

        </BottomSheet>
    )
}

interface ItemItemsProps {
    data: ShoppingListItemType[],
    addRoomSheetRef?: React.RefObject<BottomSheet>
    onNavigateCreateRoom?: () => void
    pickRoom: number
    setPickCategory: (id: number) => void
    onSetCategory: (id: number) => void
    isDarkMode: boolean
    // handleNavigateHouseHoldDetail: (id_item: number) => void;
}

const ItemItems = ({ data, addRoomSheetRef, onNavigateCreateRoom, pickRoom, setPickCategory, onSetCategory, isDarkMode }: ItemItemsProps) => {
    // const addRoomObj: ShoppingListItemType = {
    //     category_image: "",
    //     category_name: "",
    //     id_household_item_category: -1,
    // }
    const renderItem = (item: ShoppingListItemType, index: number) => {
        return (
            item.id_item_type == -1 ? <>
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
                            backgroundColor: isDarkMode ? '#252D3B' : '#e1e1e1',
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
                        setPickCategory(item.id_item_type)
                        onSetCategory(item.id_item_type)
                        addRoomSheetRef?.current?.close()
                        // handleNavigateHouseHoldDetail(item.id_household_item)
                    }}>
                        <View className='bg-[#EAEAEA] dark:bg-[#252D3B] justify-center items-center rounded-xl'
                            style={{
                                // width: screenWidth * 0.3,
                                width: '100%',
                                height: undefined,
                                borderRadius: 15,
                                // height: screenHeight * 0.2,
                                aspectRatio: 1,
                            }}
                        >
                            <Image
                                source={item.icon_url ? { uri: item.icon_url } : gradients_list[index % gradients_list.length]}
                                style={{
                                    // width: screenWidth * 0.3,
                                    width: '80%',
                                    height: undefined,
                                    borderRadius: 15,
                                    // height: screenHeight * 0.2,
                                    aspectRatio: 1,
                                }}
                            />
                        </View>
                        <Text style={{
                            textAlign: 'center',
                            color: item.id_item_type === pickRoom ? iOSColors.systemBlue.defaultLight : (isDarkMode ? 'white' : '#2A475E'),

                            fontSize: 16,
                            fontWeight: 500,
                            marginTop: 10,

                        }}
                        >{item.item_type_name_en} {
                                item.id_item_type == pickRoom ? <Material name='check' size={20} color={iOSColors.systemBlue.defaultLight} /> : null
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
                data={data}

                spacing={0}

                renderItem={({ item, index }) => renderItem(item, index)}
                scrollEnabled={false}
            />
        </View>
    )
}

export default ShoppingListPickCategorySheet