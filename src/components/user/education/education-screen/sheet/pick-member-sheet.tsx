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



const screenWidth = Dimensions.get('screen').width

interface AddProgressPickMemberSheetProps {
    refRBSheet: React.RefObject<BottomSheet>;
    members: Member[],
    pickedIdUser: string,
    setPickedIdUser: (id: string) => void,

}
const AddProgressPickMemberSheet = ({
    refRBSheet, members, pickedIdUser, setPickedIdUser
}: AddProgressPickMemberSheetProps) => {
    const snapPoints = useMemo(() => ['95%'], []);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    );
    const isDarkMode = useSelector(getIsDarkMode)
    const [memberList, setMemberList] = React.useState<Member[]>(members)
    const [key, setKey] = React.useState<boolean>(false)
    React.useEffect(() => {
        setMemberList(members)
    }, [members])
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
                if (index == -1) {
                    setKey((prev)=>!prev)
                } else {
                    setKey((prev)=>!prev)
                }
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
                    <View className='mt-5' key={key.toString()}>

                        <ItemItems data={memberList}
                            pickedIdUser={pickedIdUser}
                            setPickedIdUser={setPickedIdUser}
                            // setPickedUser={setPickedUser}
                            pickMemberSheetRef={refRBSheet}
                            isDark={isDarkMode}
                        />
                    </View>
                </BottomSheetScrollView >


            </View>

        </BottomSheet>
    )
}

interface ItemItemsProps {
    data: Member[],
    pickedIdUser: string
    setPickedIdUser: (id: string) => void,
    // setPickedUser: (id: string) => void,
    pickMemberSheetRef: React.RefObject<BottomSheet>;
    isDark: boolean;
    // handleNavigateHouseHoldDetail: (id_item: number) => void;
}

const ItemItems = ({ data, pickedIdUser, setPickedIdUser, pickMemberSheetRef, isDark }: ItemItemsProps) => {
    console.log('data', data)
    const renderItem = (item: Member, index: number) => {
        return (
            <View className='items-center ' style={{
                // flex: 1,
                marginRight: index % 2 == 0 ? 10 : 0,
                marginLeft: index % 2 == 1 ? 10 : 0,
                marginBottom: 20,
            }}>
                <TouchableOpacity onPress={() => {
                    // setPickedUser(item.id_user)
                    if (pickedIdUser == item.id_user) {
                        setPickedIdUser('')
                        // pickMemberSheetRef.current?.close()

                    } else {
                        setPickedIdUser(item.id_user)
                        pickMemberSheetRef.current?.close()
                    }
                    // handleNavigateHouseHoldDetail(item.id_household_item)
                }}>
                    <View className='border-[1px] border-[#f7f7f7] dark:border-[#2A475E] ' style={{
                        borderRadius: 15,
                        overflow: 'hidden',
                    }}>
                        <Image
                            source={item.user.avatar ? { uri: item.user.avatar } : gradients_list[index - 1 % gradients_list.length]}
                            style={{
                                width: '100%',
                                height: undefined,
                                aspectRatio: 1,
                            }}
                        />
                        <View className='w-full h-full z-[-10] absolute bg-[#A6A6A6] dark:bg-[#2A475E]'>

                        </View>
                    </View>
                    <Text style={{
                        textAlign: 'center',
                        color: item.id_user == pickedIdUser ? iOSColors.systemBlue.defaultLight : (isDark ? 'white' : COLORS.Rhino),
                        fontSize: 16,
                        fontWeight: 500,
                        marginTop: 10,

                    }}>
                        {item.user.firstname ? item.user.firstname : ""} {item.user.lastname ? item.user.lastname : ""}
                        {/* <Text className='opacity-1'>x</Text> */}
                        {
                            item.id_user == pickedIdUser ? <Material name='check' size={20} color={iOSColors.systemBlue.defaultLight} /> : null

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

export default AddProgressPickMemberSheet