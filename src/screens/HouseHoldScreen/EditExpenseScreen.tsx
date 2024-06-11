import React, { useCallback, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, ImageSourcePropType, SafeAreaView, KeyboardAvoidingView, ScrollView, Dimensions, StyleSheet, TextInput, InputAccessoryView, Keyboard, TouchableWithoutFeedback, Touchable, Platform, Button } from 'react-native'
import { EditExpenseHouseHoldItemScreenProps } from 'src/navigation/NavigationTypes'
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { TimePickerSheet } from '../CheckListScreen/AddItemCheckListSheet'

import ExpenseIcon from 'src/assets/images/household_assets/expense.png';
import VendorIcon from 'src/assets/images/household_assets/vendor.png';
import PurchaseDateIcon from 'src/assets/images/household_assets/purchase_date.png';
import AmountIcon from 'src/assets/images/household_assets/amount.png';
import HouseHoldItemDetailPurchaseSheet from 'src/components/user/household/household-item-detail-purchasedate-sheet'
import HouseHolditemDetailAmountPick from 'src/components/user/household/household-item-detail-amount-pick'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';



const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

const EditExpenseScreen = ({ navigation, route }: EditExpenseHouseHoldItemScreenProps) => {

    const timePickerSheetRef = React.useRef<any>(null)
    const amountPickerSheetRef = React.useRef<BottomSheet>(null)

    const [inputVendor, setInputVendor] = React.useState<string>('')
    const [isEditingVendor, setIsEditingVendor] = React.useState<boolean>(false)
    const [purchaseDate, setPurchaseDate] = React.useState<Date>(new Date())
    const [amount, setAmount] = React.useState<number>(0)


    const handleSavePurchaseDate = (date: Date | null) => {
        if (date) {
            setPurchaseDate(date)
        }

    }
    const handlePickAmount = (amount: number) => {
        setAmount(amount)
    }

    return (
        <SafeAreaView className='flex-1 bg-[#FBF8F1]'>
            <KeyboardAvoidingView className='flex-1'
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View>
                    <View className='w-full  flex-row justify-between items-center py-3 '>
                        {
                            isEditingVendor ? <>
                                <TouchableOpacity onPress={() => {
                                    setIsEditingVendor(false)
                                    setInputVendor('')
                                }} className=' flex-row items-center'>
                                    {/* <Material name="chevron-left" size={30} style={{ color: iOSGrayColors.systemGray2.defaultDark, fontWeight: "bold" }} /> */}
                                    <Text className='text-base font-semibold text-gray-600 pl-3' style={{ color: iOSColors.systemRed.defaultLight }}>Cancel</Text>
                                </TouchableOpacity>
                                <Text className='text-base font-medium  '>Edit receipt info</Text>
                                <View className='mr-3'>
                                    <TouchableOpacity onPress={() => {
                                    }} >
                                        <Text className='text-base font-semibold text-gray-600 pl-3' style={{ color: iOSColors.systemBlue.defaultLight }}>Save</Text>
                                    </TouchableOpacity>
                                </View></> : <>
                                <TouchableOpacity onPress={() => {
                                    navigation.goBack()
                                }} className=' flex-row items-center'>
                                    <Material name="chevron-left" size={30} style={{ color: iOSGrayColors.systemGray2.defaultDark, fontWeight: "bold" }} />
                                    {/* <Text className='text-base font-semibold text-gray-600 pl-3' style={{ color: iOSGrayColors.systemGray2.defaultDark }}>Back</Text> */}
                                </TouchableOpacity>
                                <Text className='text-base font-medium  '>Edit receipt info</Text>
                                <View className='mr-3'>
                                    <TouchableOpacity onPress={() => {
                                    }} >
                                        <Material name="dots-horizontal" size={30} style={{ color: iOSGrayColors.systemGray2.defaultDark, fontWeight: "bold" }} />
                                    </TouchableOpacity>
                                </View></>
                        }
                    </View>
                </View>
                <ScrollView className='flex-1 ' showsVerticalScrollIndicator={false}>
                    <View className=' bg-white mt-10 mx-4 justify-center rounded-lg shadow-xl'
                        style={styles.receipt}
                    >
                        <View className='flex-row px-4 items-center '>
                            <Image source={ExpenseIcon} style={{ width: screenWidth * 0.12, height: screenWidth * 0.12 }} />
                            <Text className='pl-4 text-base'>Add a receipt</Text>
                        </View>
                        {/* <View className='flex-row justify-between items-center'>
                            <View className='mr-4'>
                                <Text style={{
                                    color: iOSGrayColors.systemGray3.defaultLight,
                                    fontSize: 15,
                                    fontWeight: 500

                                }}>Enter</Text>
                            </View>
                        </View> */}
                    </View>
                    <View className=' bg-white  mt-3 mx-4 justify-center rounded-lg ' style={styles.item}>
                        <TouchableOpacity className='flex-row justify-between items-center' activeOpacity={0.6} onPress={() => {
                            setIsEditingVendor(true)
                        }}>

                            <View className='flex-row px-4 items-center '>
                                <Image source={VendorIcon} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
                                <Text className='pl-4 text-base'>Vendor</Text>
                            </View>
                            {
                                isEditingVendor ?
                                    <TextInput
                                        className=' text-base pl-4 mr-5 flex-1 content-end'
                                        style={{
                                            color: iOSGrayColors.systemGray6.defaultDark,
                                            fontWeight: 500
                                        }}
                                        maxLength={130}
                                        autoFocus
                                        returnKeyType='done'
                                        placeholder='Enter vendor'
                                        onChangeText={text => setInputVendor(text)}
                                        value={inputVendor}
                                        onFocus={() => {
                                            setIsEditingVendor(true)
                                        }}
                                        onBlur={() => {

                                            setIsEditingVendor(false)
                                        }}
                                        numberOfLines={1}
                                    />
                                    : <View className='mr-4'>
                                        <Text style={{
                                            color: iOSGrayColors.systemGray3.defaultLight,
                                            fontSize: 15,
                                            fontWeight: 500

                                        }}>{
                                                inputVendor === '' ? 'Enter' : inputVendor

                                            }</Text>
                                    </View>
                            }

                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity className=' bg-white  mt-3 mx-4 justify-center rounded-lg ' style={styles.item} onPress={() => {
                        timePickerSheetRef.current?.open()
                    }}>
                        <View className='flex-row justify-between items-center'>
                            <View className='flex-row px-4 items-center '>
                                <Image source={PurchaseDateIcon} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
                                <Text className='pl-4 text-base'>Purchase date</Text>
                            </View>
                            <View className='mr-4'>
                                <Text style={{
                                    color: iOSGrayColors.systemGray3.defaultLight,
                                    fontSize: 15,
                                    fontWeight: 500

                                }}>Enter</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className=' bg-white  mt-3 mx-4 justify-center rounded-lg ' style={styles.item} onPress={() => {
                        amountPickerSheetRef.current?.expand()
                    }}>
                        <View className='flex-row justify-between items-center'>

                            <View className='flex-row px-4 items-center '>
                                <Image source={AmountIcon} style={{ width: screenWidth * 0.1, height: screenWidth * 0.1 }} />
                                <Text className='pl-4 text-base'>Amount</Text>
                            </View>
                            <View className='mr-4'>
                                <Text style={{
                                    color: iOSGrayColors.systemGray3.defaultLight,
                                    fontSize: 15,
                                    fontWeight: 500

                                }}>Enter</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </ScrollView>

            </KeyboardAvoidingView>
            {/* <TimePickerSheet refRBSheet={timePickerSheetRef} setSave={handleSavePurchaseDate} initialValue={purchaseDate} /> */}
            <HouseHoldItemDetailPurchaseSheet sheetRef={timePickerSheetRef} onSave={handleSavePurchaseDate} initialValue={purchaseDate} />
            <HouseHolditemDetailAmountPick refRBSheet={amountPickerSheetRef} amount={amount} onPick={() => {
                handlePickAmount(amount)
            }} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    receipt: {
        height: screenHeight * 0.12
    },
    item: {
        height: screenHeight * 0.1
    }
})
export default EditExpenseScreen