import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, TextInput, ScrollView, Keyboard, InputAccessoryView, } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import BottomSheet, { BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef } from 'react';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import AmountIcon from 'src/assets/images/household_assets/amount.png'

interface HouseHolditemDetailAmountPickProps {
    refRBSheet: React.RefObject<BottomSheet>
    onPick: (amount: number) => void
    amount: number
}

const screenWidth = Dimensions.get('screen').width


const HouseHolditemDetailAmountPick = ({
    refRBSheet, onPick, amount
}: HouseHolditemDetailAmountPickProps) => {
    const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);
    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    );



    const [amountSheet, setAmountSheet] = React.useState<number>(amount || 0)
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
            onChange={(index) => {
                if (index !== -1) {
                    inputRef.current?.focus()
                }
            }}
        >
            <ScrollView className='flex-1' keyboardShouldPersistTaps="handled">
                <View className='flex-1 '>
                    <View className='w-full flex justify-center items-center mt-3'>
                        <Image source={AmountIcon} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
                        <Text className='my-3 text-base'>Add amount</Text>
                        <BottomSheetTextInput style={{
                            marginTop: 8,
                            width: '90%',
                            marginHorizontal: 16,
                            marginBottom: 10,
                            borderRadius: 10,
                            fontSize: 16,
                            lineHeight: 20,
                            padding: 8,
                            paddingVertical: 14,
                            backgroundColor: iOSGrayColors.systemGray6.defaultLight,
                            color: iOSGrayColors.systemGray.accessibleDark,
                            textAlign: 'right',
                        }}
                            ref={inputRef}
                            value={amountSheet.toString()}
                            keyboardType='numeric'
                            onChangeText={(text) => {
                                setAmountSheet(parseInt(text))
                            }}
                            placeholder="Enter amount"
                            inputAccessoryViewID='amountSheet'
                        />
                        <InputAccessoryView nativeID='amountSheet'>
                            <View className='flex-row justify-between py-4' style={{
                                backgroundColor: iOSGrayColors.systemGray6.defaultLight,

                            }}>
                                <TouchableOpacity onPress={() => {
                                    Keyboard.dismiss()
                                }}>
                                    <Text style={{ color: iOSColors.systemRed.defaultLight, fontWeight: 'bold', marginLeft: 8 }}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    Keyboard.dismiss()
                                }}>
                                    <Text style={{ color: iOSColors.systemBlue.defaultLight, fontWeight: 'bold', marginRight: 8 }}>Done</Text>
                                </TouchableOpacity>
                            </View>
                        </InputAccessoryView>


                        {/* <TextInput
                            className='mx-4  w-[90%]  h-12 rounded-lg'
                            ref={inputRef}
                            autoFocus
                            style={{
                                backgroundColor: iOSGrayColors.systemGray6.defaultLight,
                                borderColor: iOSGrayColors.systemGray6.defaultLight,
                                borderWidth: 1,
                                borderRadius: 10,
                                padding: 10,
                                fontSize: 20,
                                color: iOSGrayColors.systemGray6.defaultDark,
                                textAlign: 'right'
                            }}
                            keyboardType='numeric'
                            value={amountSheet.toString()}
                            onChange={() => {
                                onPick(parseInt(amountSheet.toString()))
                            }}
                        /> */}
                    </View>
                </View>
            </ScrollView>
        </BottomSheet>
    )
}

export default HouseHolditemDetailAmountPick