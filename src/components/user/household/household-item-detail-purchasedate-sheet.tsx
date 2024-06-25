import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import AutoHeightRBSheet from 'src/components/AutoHeightRBSheet/AutoHeightRBSheet';
import { COLORS } from 'src/constants';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import PurchaseDateIcon from 'src/assets/images/household_assets/purchase_date.png'
// export const TimePickerSheet = ({ refRBSheet, setSave, initialValue }: { refRBSheet: React.RefObject<any>, setSave: (dueDate: Date | null) => void, initialValue: Date | null }) => {

// }


interface HouseHoldItemDetailPurchaseSheetProps {
    sheetRef: React.RefObject<any>;
    initialValue: Date;
    onSave: (date: Date | null) => void;
}


const HouseHoldItemDetailPurchaseSheet = ({
    sheetRef, initialValue, onSave
}: HouseHoldItemDetailPurchaseSheetProps) => {
    // console.log(initialValue?.getFullYear().toString() || (new Date().getFullYear()).toString())
    const [selectedYear, setSelectedYear] = useState(initialValue?.getFullYear().toString() || (new Date().getFullYear()).toString());
    const [selectedMonth, setSelectedMonth] = useState(initialValue != null ? (initialValue!.getMonth() + 1).toString().padStart(2, '0') : (new Date().getMonth() + 1).toString().padStart(2, '0'));
    const [selectedDay, setSelectedDay] = useState(initialValue?.getDate().toString().padStart(2, '0') || (new Date().getDate()).toString().padStart(2, '0'));
    const [selectedDate, setSelectedDate] = useState<Date>();

    useEffect(() => {
        const newDate = new Date(
            parseInt(selectedYear),
            parseInt(selectedMonth) - 1,
            parseInt(selectedDay)
        )
        console.log(newDate.toLocaleDateString())
        console.log(new Date(newDate.toLocaleString("en-US", { timeZone: "America/New_York" })))
        setSelectedDate(newDate)

    }, [selectedDay, selectedMonth, selectedYear])
    const handleSave = () => {
        console.log('selectedDate', selectedDate)
        onSave(selectedDate || null)
    }


    return <AutoHeightRBSheet
        ref={sheetRef}
        closeOnPressMask
        onClose={() => {
            setSelectedDay((new Date().getDate()).toString().padStart(2, '0'))
            setSelectedMonth((new Date().getMonth() + 1).toString().padStart(2, '0'))
            setSelectedYear((new Date().getFullYear()).toString())
            setSelectedDate(undefined)
        }}
        customStyles={{
            container: {
                borderTopLeftRadius: 10,
                height: Dimensions.get('window').height * 0.4,
                borderTopRightRadius: 10,

            },
        }}
    >
        <View className='h-'>
            <View className='w-full  flex-row justify-between  items-center py-3 bg-white px-4 z-10'>
                <TouchableOpacity onPress={() => {

                    sheetRef.current?.close()
                }} className=' flex-row items-center ' >
                    <Text className='text-base font-medium' style={{ color: iOSColors.systemRed.defaultLight }}>Cancel</Text>
                </TouchableOpacity>
                <View className=' '>
                    {/* <Text className='text-base font-medium text-center' >Select purchase date</Text> */}
                    <Image source={PurchaseDateIcon} style={{ width: Dimensions.get('screen').height * 0.05, height: Dimensions.get('screen').height * 0.05 }} />
                </View>
                <TouchableOpacity className=' ' onPress={() => {
                    handleSave()
                    sheetRef.current?.close()
                }}>
                    <Text className='text-base font-medium ' style={{
                        textAlign: "right",
                        color: iOSColors.systemBlue.defaultLight
                    }}>Save</Text>
                </TouchableOpacity>
            </View>

            <View className='flex-row items-center'>
                <Picker
                    selectedValue={selectedDay}
                    onValueChange={(itemValue, itemIndex) => setSelectedDay(itemValue)}
                    style={[styles.picker, styles.dayPicker]}

                >
                    {[...Array(31).keys()].map(day => (
                        <Picker.Item key={day} label={`${day + 1}`.padStart(2, '0')} value={`${day + 1}`.padStart(2, '0')} />
                    ))}
                </Picker>

                <Picker
                    selectedValue={selectedMonth}
                    onValueChange={(itemValue, itemIndex) => setSelectedMonth(itemValue)}
                    style={[styles.picker, styles.monthPicker]}

                >
                    {[...Array(12).keys()].map(month => (
                        <Picker.Item key={month} label={`${month + 1}`.padStart(2, '0')} value={`${month + 1}`.padStart(2, '0')} />
                    ))}
                </Picker>
                <Picker
                    selectedValue={selectedYear}
                    onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}
                    style={[styles.picker, styles.yearPicker]}
                >
                    {[...Array(10).keys()].map(year => (
                        <Picker.Item key={year} label={`${2020 + year}`} value={`${2020 + year}`} />
                    ))}
                </Picker>
            </View>
        </View>

    </AutoHeightRBSheet>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    picker: {
        height: 150,
        fontSize: 20,
    },
    yearPicker: {
        flex: 1,
    },
    monthPicker: {
        flex: 1,
        // marginHorizontal: 5,
    },
    dayPicker: {
        flex: 1,
    },
    confirmButton: {
        marginTop: 20,
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default HouseHoldItemDetailPurchaseSheet