import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, TextInput, ScrollView, Keyboard, InputAccessoryView, } from 'react-native'
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { useCallback, useMemo, useRef } from 'react';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import AddRoomSheet from './add-room-sheet';
import { COLORS } from 'src/constants';
import { gradients_list } from 'src/assets/images/gradients';
import { HouseHoldCategoryInterface } from 'src/interface/household/household_category';
import { FlatGrid } from 'react-native-super-grid';
import { useSelector } from 'react-redux';
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
    categories: HouseHoldCategoryInterface[],
    onSetCategory: (category: number) => void,
    addCategorySheetRef?: React.RefObject<BottomSheet>
}
const AddHouseHoldItemPickCategorySheet = ({
    refRBSheet, onNavigateCreateCategory, category, onSetCategory, categories, addCategorySheetRef
}: AddHouseHoldItemPickCategorySheetProps) => {
    const snapPoints = useMemo(() => ['95%'], []);
    console.log(categories)
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    );

    const [pickCategory, setPickCategory] = React.useState<number>(category)
    const addRoomSheetRef = useRef<BottomSheet>(null)
    const [key, setKey] = React.useState(false)
    const isDarkMode = useSelector(getIsDarkMode)

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
                    if (pickCategory !== -1) {
                        setPickCategory(-1)
                    }
                    setKey(prev => !prev)
                } else {
                    setKey(prev => !prev)
                }
            }}
        >
            <View className='flex-1 items-center bg-[#f7f7f7] dark:bg-[#0A1220]'>
                <View className='py-4'>
                </View>
                <View className='flex-row justify-between  w-full'>
                    <View style={{
                        height: 50,
                        width: 50,
                    }} className=''>

                    </View>
                    <Text className=' font-bold text-black dark:text-white' style={{
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
                        <ItemItems data={categories} addRoomSheetRef={addCategorySheetRef} onNavigateCreateRoom={onNavigateCreateCategory} pickRoom={pickCategory} setPickCategory={setPickCategory}
                            onSetCategory={(id: number) => {
                                onSetCategory(id)
                                refRBSheet.current?.close()
                            }}
                            k={key}
                            isDark={isDarkMode}
                        />

                    </View>
                </BottomSheetScrollView >


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
    k: boolean
    isDark: boolean
    // handleNavigateHouseHoldDetail: (id_item: number) => void;
}

const ItemItems = ({ data, addRoomSheetRef, onNavigateCreateRoom, pickRoom, setPickCategory, onSetCategory, k, isDark }: ItemItemsProps) => {
    const addRoomObj: HouseHoldCategoryInterface = {
        category_image: "",
        category_name: "",
        id_household_item_category: -1,
    }
    const newData = [addRoomObj, ...data]
    const renderItem2 = React.useCallback((item: HouseHoldCategoryInterface, index: number) => {
        return (
            item.id_household_item_category == -1 ? <>
                <View className='items-center ' style={{
                    // flex: 1,
                    marginRight: index % 2 == 0 ? 10 : 0,
                    marginLeft: index % 2 == 1 ? 10 : 0,
                    marginBottom: 20,
                    borderColor: iOSGrayColors.systemGray5.defaultLight,
                }}>
                    <TouchableOpacity onPress={() => {
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
                            color: item.id_household_item_category == pickRoom ? iOSColors.systemBlue.defaultLight : (isDark ? 'white' : COLORS.Rhino),
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

export default AddHouseHoldItemPickCategorySheet