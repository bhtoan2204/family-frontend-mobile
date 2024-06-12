import React, { useEffect, useState } from 'react'
import { Dimensions, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS } from 'src/constants';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { ChecklistItemInterface } from 'src/interface/checklist/checklist';
import { Picker } from '@react-native-picker/picker';
import { AppDispatch } from 'src/redux/store';
import { useDispatch } from 'react-redux';
import { addNewCheckListItemToCheckList } from 'src/redux/slices/CheckListSlice';
import AutoHeightRBSheet from 'src/components/AutoHeightRBSheet/AutoHeightRBSheet';


const CheckListTimePickerSheet = ({ refRBSheet, setSave, initialValue }: { refRBSheet: React.RefObject<any>, setSave: (dueDate: Date | null) => void, initialValue: Date | null }) => {
    const [selectedYear, setSelectedYear] = useState(initialValue?.getFullYear().toString() || (new Date().getFullYear()).toString());
    const [selectedMonth, setSelectedMonth] = useState(initialValue != null ? (initialValue!.getMonth() + 1).toString().padStart(2, '0') : (new Date().getMonth() + 1).toString().padStart(2, '0'));
    const [selectedDay, setSelectedDay] = useState(initialValue?.getDate().toString().padStart(2, '0') || (new Date().getDate()).toString().padStart(2, '0'));
    const [selectedDate, setSelectedDate] = useState<Date>();

    useEffect(() => {
        setSelectedDate(new Date(
            parseInt(selectedYear),
            parseInt(selectedMonth) - 1,
            parseInt(selectedDay)
        ))

    }, [selectedDay, selectedMonth, selectedYear])
    const handleSave = () => {
        setSave(selectedDate || null)
    }

    return <AutoHeightRBSheet
        ref={refRBSheet}
        onClose={() => {
            setSelectedDay((new Date().getDate()).toString().padStart(2, '0'))
            setSelectedMonth((new Date().getMonth() + 1).toString().padStart(2, '0'))
            setSelectedYear((new Date().getFullYear()).toString())
            setSelectedDate(undefined)
        }}
        customStyles={{
            container: {
                borderTopLeftRadius: 10,
                height: Dimensions.get('window').height * 0.45,
                borderTopRightRadius: 10,

            },
            // draggableIcon: {
            //     display: "none",
            // }
        }}
    >
        <View>
            <View className='w-full  flex-row justify-between  items-center py-3 bg-white px-4 z-10'>
                <TouchableOpacity onPress={() => {

                    refRBSheet.current?.close()
                }} className=' flex-row items-center ' >
                    <Text className='text-base font-medium' style={{ color: COLORS.red }}>Cancel</Text>
                </TouchableOpacity>
                <View className=' '>
                    <Text className='text-base font-medium text-center' >Pick Time</Text>
                </View>
                <TouchableOpacity className=' ' onPress={() => {
                    handleSave()
                    refRBSheet.current?.close()
                }}>
                    <Text className='text-base font-medium ' style={{
                        textAlign: "right",
                        color: COLORS.AuroMetalSaurus
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
                        <Picker.Item key={year} label={`${2024 + year}`} value={`${2024 + year}`} />
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
export default CheckListTimePickerSheet