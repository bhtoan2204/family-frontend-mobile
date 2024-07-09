import React, { useCallback, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, ImageSourcePropType, SafeAreaView, KeyboardAvoidingView, ScrollView, Dimensions, StyleSheet, TextInput, InputAccessoryView, Keyboard, TouchableWithoutFeedback, Touchable, Platform, Button } from 'react-native'
import { AddConsumableHouseHoldItemScreenProps, AddConsumableItemScreenProps, EditConsumableHouseHoldItemScreenProps, EditExpenseHouseHoldItemScreenProps } from 'src/navigation/NavigationTypes'
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { TimePickerSheet } from '../CheckListScreen/AddItemCheckListSheet'


import ExpiredDateIcon from 'src/assets/images/household_assets/expired.png';
import AmountIcon from 'src/assets/images/household_assets/amount.png';
import ThresholdIcon from 'src/assets/images/household_assets/threshhold.png';

import HouseHoldItemDetailPurchaseSheet from 'src/components/user/household/household-item-detail-purchasedate-sheet'
import HouseHolditemDetailAmountPick from 'src/components/user/household/household-item-detail-amount-pick'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import NumberPickerSheet from 'src/components/user/sheet/number-picker'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { updateComsumableItem } from 'src/redux/slices/HouseHoldDetailSlice'
import { COLORS } from 'src/constants'



const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

const AddConsumableHouseHoldItemScreen = ({ navigation, route }: AddConsumableItemScreenProps) => {
    const { id_family, id_item, id_category } = route.params
    const timePickerSheetRef = React.useRef<any>(null)
    const amountPickerSheetRef = React.useRef<BottomSheet>(null)

    const quantityPickerSheetRef = React.useRef<any>(null)
    const threshholdPickerSheetRef = React.useRef<any>(null)

    const [quantityInput, setQuantityInput] = React.useState<number>(0)
    const [threshholdInput, setThreshholdInput] = React.useState<number>(0)
    const [expiredDateInput, setExpiredDateInput] = React.useState<Date>(new Date())
    const consumableData = useSelector((state: RootState) => state.householdItemDetail.consumableItem)
    const dispatch = useDispatch<AppDispatch>()

    const handleSavePurchaseDate = (date: Date | null) => {
        if (date) {
            setExpiredDateInput(date)
        }

    }

    const handleCancel = () => {
        // setQuantityInput(0)
        // setThreshholdInput(0)
        // setExpiredDateInput(new Date())
        navigation.goBack()
    }

    const handleSave = () => {
        dispatch(
            updateComsumableItem({
                id_household_item: id_item!,
                expired_date: expiredDateInput.toDateString(),
                quantity: quantityInput,
                threshold: threshholdInput
            })
        )
        navigation.goBack()

    }

    const buildDate = useCallback(() => {
        return `${expiredDateInput.getDate()}/${expiredDateInput.getMonth() + 1}/${expiredDateInput.getFullYear()}`
    }, [expiredDateInput])

    return (
        <SafeAreaView className='flex-1 bg-[#f7f7f7]'>
            <KeyboardAvoidingView className='flex-1'
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                {/* <View>
                    <View className='w-full  flex-row justify-between items-center py-3 '>
                        <>
                            <TouchableOpacity onPress={() => {
                                handleCancel()
                            }} className=' flex-row items-center'>
                                <Text className='text-base font-semibold text-gray-600 pl-3' style={{ color: iOSColors.systemRed.defaultLight }}>Cancel</Text>
                            </TouchableOpacity>
                            <Text className='text-base font-medium  '>Add consumable item</Text>
                            <View className='mr-3'>
                                <TouchableOpacity onPress={() => {
                                    handleSave()
                                }} >
                                    <Text className='text-base font-semibold text-gray-600 pl-3' style={{ color: iOSColors.systemBlue.defaultLight }}>Save</Text>
                                </TouchableOpacity>
                            </View></>
                    </View>
                </View> */}
                <TouchableOpacity className='mx-4 mt-4' onPress={() => {
                    navigation.goBack()
                }}>
                    <Material name='close' size={24} color={iOSGrayColors.systemGray.accessibleDark} />
                </TouchableOpacity>

                <TouchableOpacity className='p-4 absolute bottom-6 z-10 right-6 rounded-lg' onPress={async () => {
                    // navigation.goBack()
                    await handleSave()
                }}
                    style={{
                        backgroundColor: COLORS.DenimBlue
                    }}
                >
                    <Material name='arrow-left' size={24} color={'white'} />
                </TouchableOpacity>

                <ScrollView className='flex-1 ' showsVerticalScrollIndicator={false}>

                    <View className='mt-10'>

                    </View>
                    <TouchableOpacity className=' bg-[#F5F5F5]  mt-3 mx-8 justify-center rounded-lg ' style={styles.item} onPress={() => {
                        // amountPickerSheetRef.current?.expand()
                        quantityPickerSheetRef.current?.open()
                    }}>
                        <View className='flex-row justify-between items-center'>

                            <View className='flex-row px-4 items-center '>
                                <Image source={AmountIcon} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
                                <Text className='pl-4 text-base'>Quantity</Text>
                            </View>
                            <View className='mr-4'>
                                <Text style={{
                                    color: iOSGrayColors.systemGray3.defaultLight,
                                    fontSize: 15,
                                    fontWeight: 500

                                }}>{
                                        quantityInput != 0 ? quantityInput : 'Enter'
                                    }</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className='   mt-5 mx-8 justify-center rounded-lg ' style={styles.item} onPress={() => {
                        threshholdPickerSheetRef.current?.open()
                    }}>
                        <View className='flex-row justify-between items-center'>

                            <View className='flex-row px-4 items-center '>
                                <Image source={ThresholdIcon} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
                                <Text className='pl-4 text-base'>Threshhold</Text>
                            </View>
                            <View className='mr-4'>
                                <Text style={{
                                    color: iOSGrayColors.systemGray3.defaultLight,
                                    fontSize: 15,
                                    fontWeight: 500

                                }}>{
                                        threshholdInput != 0 ? threshholdInput : 'Enter'
                                    }</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className='  mt-5 mx-8 justify-center rounded-lg ' style={styles.item} onPress={() => {
                        timePickerSheetRef.current?.open()
                    }}>
                        <View className='flex-row justify-between items-center'>
                            <View className='flex-row px-4 items-center '>
                                <Image source={ExpiredDateIcon} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
                                <Text className='pl-4 text-base'>Expired date</Text>
                            </View>
                            <View className='mr-4'>
                                <Text style={{
                                    color: iOSGrayColors.systemGray3.defaultLight,
                                    fontSize: 15,
                                    fontWeight: 500

                                }}>{
                                        buildDate()
                                    }</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </ScrollView>

            </KeyboardAvoidingView>
            {/* <TimePickerSheet refRBSheet={timePickerSheetRef} setSave={handleSavePurchaseDate} initialValue={purchaseDate} /> */}
            <HouseHoldItemDetailPurchaseSheet sheetRef={timePickerSheetRef} onSave={handleSavePurchaseDate} initialValue={expiredDateInput} />
            <NumberPickerSheet refRBSheet={quantityPickerSheetRef} initialNumber={quantityInput}
                onSetNumber={(number) => {
                    setQuantityInput(number)
                }}
            />
            <NumberPickerSheet refRBSheet={threshholdPickerSheetRef} initialNumber={threshholdInput}
                onSetNumber={(number) => {
                    setThreshholdInput(number)
                }}
            />
            {/* <HouseHolditemDetailAmountPick refRBSheet={amountPickerSheetRef} amount={amount} onPick={() => {
                handlePickAmount(amount)
            }} /> */}

        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    receipt: {
        height: screenHeight * 0.12
    },
    item: {
        height: screenHeight * 0.1,
        borderWidth: 1,
        borderColor: iOSGrayColors.systemGray5.defaultLight,
        backgroundColor: '#f5f5f5'
    }
})
export default AddConsumableHouseHoldItemScreen