import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, TextInput, ScrollView, Keyboard, InputAccessoryView, } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import BottomSheet, { BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef } from 'react';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import AmountIcon from 'src/assets/images/household_assets/amount.png'
import BulbIcon from 'src/assets/images/household_assets/bulb.png'
interface AddHouseHoldItemStep1SheetProps {
    refRBSheet: React.RefObject<BottomSheet>

}

const screenWidth = Dimensions.get('screen').width


const AddHouseHoldItemStep1Sheet = ({
    refRBSheet
}: AddHouseHoldItemStep1SheetProps) => {
    const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    );




    const inputRef = useRef<any>(null)

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

        >
            <View className='flex-1 items-center bg-[#FBF8F1]'>
                <View className='py-4'>
                    <Image source={BulbIcon} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
                </View>
                <Text className=' font-bold' style={{
                    fontSize: 18,
                }}>Why should i add my items</Text>
                <View>
                    <View className='px-6 text-start py-3  content-start'>
                        <Text className='text-start  ' style={{
                            fontSize: 16,
                            color: iOSGrayColors.systemGray2.defaultDark
                        }}>
                            Items and products, like appliances, machines, furniture, tools etc, are a major part of the total value in a home
                        </Text>
                    </View>
                    <View className='px-6 text-start py-3 '>
                        <Text className='text-start  ' style={{
                            fontSize: 16,
                            color: iOSGrayColors.systemGray2.defaultDark
                        }}>
                            All items have a cost (or value), maybe a warranty, and often comes with a user manual. It could need repair or come with maintenance instruction

                        </Text>
                    </View>
                    <View className='px-6 text-start py-3 '>
                        <Text className='text-start ' style={{
                            fontSize: 16,
                            color: iOSGrayColors.systemGray2.defaultDark
                        }}>
                            When you add an item in Homer, you can get the manual automagically
                            Add the receipt for warranty or insurance
                        </Text>
                    </View>

                </View>
                <TouchableOpacity className='w-[60%] h-14 rounded-lg my-3 justify-center items-center' style={{
                    backgroundColor: iOSColors.systemBlue.defaultLight,
                }} onPress={() => {
                    refRBSheet.current?.close()
                }}>
                    <Text className='font-bold text-white'>OK</Text>
                </TouchableOpacity>

            </View>
        </BottomSheet>
    )
}

export default AddHouseHoldItemStep1Sheet