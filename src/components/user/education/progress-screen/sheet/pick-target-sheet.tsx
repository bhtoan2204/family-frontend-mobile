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
import { Member } from 'src/interface/member/member';
import { useSelector } from 'react-redux';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';
import NoMemberImage from 'src/assets/images/education_assets/no_member.png'
import TargetImage from 'src/assets/images/education_assets/target.png'
import { goal_data } from '../const/color';

const screenWidth = Dimensions.get('screen').width

interface AddCoursesPickTargetsSheetProps {
    refRBSheet: React.RefObject<BottomSheet>;
    targets: {
        id: number;
        title: string;
        color: string;
    }[],
    pickedTargets: string[],
    setPickedTargets: (id: string) => void,
    removePickedTargets: (id: string) => void,
    addCourseBottomSheetRef: React.RefObject<BottomSheet>

}
const AddCoursesPickTargetsSheet = ({
    refRBSheet, targets, pickedTargets, setPickedTargets, addCourseBottomSheetRef, removePickedTargets
}: AddCoursesPickTargetsSheetProps) => {
    const snapPoints = useMemo(() => ['95%'], []);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    );
    const isDarkMode = useSelector(getIsDarkMode)
    // const [key, setKey] = React.useState<boolean>(false)

    // const [pickedUser, setPickedUser] = React.useState<string>(pickedIdUser)
    return (
        <BottomSheet
            ref={refRBSheet}
            enableOverDrag
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            handleIndicatorStyle={{ backgroundColor: iOSGrayColors.systemGray6.defaultLight, }}
            backgroundStyle={{
                backgroundColor: isDarkMode ? '#0A1220' : '#F7F7F7',
            }} backdropComponent={renderBackdrop}
            onClose={() => {
                Keyboard.dismiss()
            }}
            keyboardBehavior="extend"
            keyboardBlurBehavior="restore"
            onChange={(index) => {
                // if (index == -1) {
                //     setKey((prev) => !prev)
                // } else {
                //     setKey((prev) => !prev)
                // }
            }}

        >
            <View className='flex-1 items-center bg-[#F7F7F7] dark:bg-[#0A1220] '>
                <View className='py-4'>
                    {/* <Image source={RoomIcon} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} /> */}
                </View>
                <View className='flex-row justify-between  w-full'>
                    <View style={{
                        height: 50,
                        width: 50,
                    }} className=''>

                    </View>
                    <Text className=' font-bold text-black dark:text-white' style={{
                        fontSize: 18,
                    }}>Pick member</Text>
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
                    <View className='mt-5' >

                        {
                            targets.length > 0 ? <ItemItems data={targets}
                                pickedTargets={pickedTargets}
                                setPickedTargets={setPickedTargets}
                                removePickedTargets={removePickedTargets}
                                // setPickedUser={setPickedUser}
                                pickTargetsSheetRef={refRBSheet}
                                isDark={isDarkMode}
                                addCourseBottomSheetRef={addCourseBottomSheetRef}
                            /> : <>
                                <View className='mx-6 justify-center items-center'>
                                    <View className='my-3'>
                                        <Image source={NoMemberImage} style={{ width: screenWidth * 0.2, height: screenWidth * 0.2 }} />
                                    </View>
                                    <Text className='text-base text-black dark:text-white text-center '>
                                        Family currently has no member please add member and come back later


                                    </Text>
                                </View>
                            </>
                        }
                    </View>
                </BottomSheetScrollView >


            </View>

        </BottomSheet>
    )
}

interface ItemItemsProps {
    data: {
        id: number;
        title: string;
        color: string;
    }[],
    pickedTargets: string[],
    setPickedTargets: (id: string) => void,
    removePickedTargets: (id: string) => void,
    // setPickedUser: (id: string) => void,
    pickTargetsSheetRef: React.RefObject<BottomSheet>
    isDark: boolean;
    addCourseBottomSheetRef: React.RefObject<BottomSheet>
    // handleNavigateHouseHoldDetail: (id_item: number) => void;
}

const ItemItems = ({ data, pickedTargets, setPickedTargets, removePickedTargets, pickTargetsSheetRef, isDark, addCourseBottomSheetRef }: ItemItemsProps) => {
    console.log('data', data)
    const renderItem = (item: {
        id: number;
        title: string;
        color: string;
    }, index: number) => {
        return (
            <View className='items-center ' style={{
                // flex: 1,
                marginRight: index % 2 == 0 ? 10 : 0,
                marginLeft: index % 2 == 1 ? 10 : 0,
                marginBottom: 20,
            }}>
                <TouchableOpacity onPress={() => {
                    if (pickedTargets.includes(item.id.toString())) {
                        removePickedTargets(item.id.toString())
                    } else {
                        setPickedTargets(item.id.toString())
                    }
                    // setPickedUser(item.id_user)
                    // if (pickedIdUser == item.id_user) {
                    //     // setPickedIdUser('')

                    //     pickMemberSheetRef.current?.close()
                    //     addProgressBottomSheetRef.current?.expand()

                    // } else {
                    //     setPickedIdUser(item.id_user)
                    //     pickMemberSheetRef.current?.close()
                    //     addProgressBottomSheetRef.current?.expand()
                    // }
                    // handleNavigateHouseHoldDetail(item.id_household_item)
                }}>
                    <View className='border-[1px] border-[#f7f7f7] dark:border-[#2A475E] ' style={{
                        borderRadius: 15,
                        overflow: 'hidden',
                    }}>
                        {/* <Image
                            source={item.user.avatar ? { uri: item.user.avatar } : gradients_list[index - 1 % gradients_list.length]}
                            style={{
                                width: '100%',
                                height: undefined,
                                aspectRatio: 1,
                            }}
                        /> */}
                        <View style={{
                            width: '100%',
                            height: undefined,
                            aspectRatio: 1,
                            backgroundColor: item.color,
                        }}>

                        </View>
                        {/* <View className='w-full h-full z-[-10] absolute bg-[#A6A6A6] dark:bg-[#2A475E]'>

                        </View> */}
                    </View>
                    <Text style={{
                        textAlign: 'center',
                        color: pickedTargets.includes(item.id.toString()) ? iOSColors.systemBlue.defaultLight : (isDark ? 'white' : COLORS.Rhino),
                        fontSize: 16,
                        fontWeight: 500,
                        marginTop: 10,

                    }}>
                        {item.title}
                        {/* <Text className='opacity-1'>x</Text> */}
                        {
                            pickedTargets.includes(item.id.toString()) ? <Material name='check' size={20} color={iOSColors.systemBlue.defaultLight} /> : null

                        }
                    </Text>
                </TouchableOpacity>
            </View >
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

export default AddCoursesPickTargetsSheet