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
    // const [pickedUser, setPickedUser] = React.useState<string>(pickedIdUser)
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
                    }}>Pick member</Text>
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

                        <ItemItems data={members || []}
                            pickedIdUser={pickedIdUser}
                            setPickedIdUser={setPickedIdUser}
                            // setPickedUser={setPickedUser}
                            pickMemberSheetRef={refRBSheet}
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
    // handleNavigateHouseHoldDetail: (id_item: number) => void;
}

const ItemItems = ({ data, pickedIdUser, setPickedIdUser, pickMemberSheetRef }: ItemItemsProps) => {
    const renderItem = (item: Member, index: number) => {
        return (
            <View className='items-center ' style={{
                // flex: 1,
                marginRight: index % 2 == 0 ? 10 : 0,
                marginLeft: index % 2 == 1 ? 10 : 0,
                marginBottom: 20,
                borderColor: iOSGrayColors.systemGray5.defaultLight,
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
                    <Image
                        source={item.user.avatar ? { uri: item.user.avatar } : gradients_list[index - 1 % gradients_list.length]}
                        style={{
                            width: '100%',
                            height: undefined,
                            borderRadius: 15,
                            aspectRatio: 1,
                        }}
                    />
                    <Text style={{
                        textAlign: 'center',
                        color: item.id_user == pickedIdUser ? iOSColors.systemBlue.defaultLight : COLORS.Rhino,
                        fontSize: 16,
                        fontWeight: 500,
                        marginTop: 10,

                    }}>
                        {item.user.firstname} {item.user.lastname}
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