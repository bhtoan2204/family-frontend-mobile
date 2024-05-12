import React, { useEffect, useState } from 'react'
import { Dimensions, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS } from 'src/constants';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { ChecklistItemInterface } from 'src/interface/checklist/checklist';
import { Picker } from '@react-native-picker/picker';

const priorityColors = ['#D74638', '#EB8909', '#007BFF', '#808080'];
const priorityColorsInside = ['#F9EAE3', '#FAEFD1', '#EAF0FB', '#000'];

const AddItemCheckListSheet = ({ refRBSheet, setChecklist }: { refRBSheet: React.RefObject<RBSheet>, setChecklist: React.Dispatch<React.SetStateAction<ChecklistItemInterface[]>> }) => {
    const timePickerRef = React.useRef<RBSheet>(null);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [priority, setPriority] = React.useState(4);
    const [dueDate, setDueDate] = React.useState<Date | null>(null);

    const { showActionSheetWithOptions } = useActionSheet();

    const buildDate = (date: Date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    const onPressPriority = () => {
        const options = ['Priority 1', 'Priority 2', 'Priority 3', 'Priority 4', 'Cancel',];
        const cancelButtonIndex = 4;

        showActionSheetWithOptions({
            options,
            cancelButtonIndex,
        }, (i) => {
            switch (i) {
                case 0:
                    setPriority(1);
                    break;
                case 1:
                    setPriority(2);
                    break;
                case 2:
                    setPriority(3);
                    break;
                case 3:
                    setPriority(4);
                    break;
                case cancelButtonIndex:
                    console.log('Cancel ', i);
                // Canceled
            }
        });
    }

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            onClose={() => {
                setName("");
                setDescription("");
                setPriority(4);
                setDueDate(null);
            }}

            customStyles={{
                container: {
                    // backgroundColor: "#F6F7F9",
                    height: "auto",
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                },
                draggableIcon: {
                    // borderBlockColor: "#0000",
                    display: "none",
                }
            }}
        >
            <TextInput
                // style={{
                //     borderWidth: 1,
                //     borderColor: "#ccc",
                //     borderRadius: 5,
                //     marginBottom: 20,
                //     fontSize: 17,
                //     padding: 17,
                // }}

                editable
                placeholder="Checklist name "
                value={name}
                onChangeText={(text) => setName(text)}
                className='pl-4 pb-2 pt-5 text-lg font-semibold'
                autoFocus

            />
            <TextInput
                // style={{
                //     borderWidth: 1,
                //     borderColor: "#ccc",
                //     borderRadius: 5,
                //     marginBottom: 20,
                //     fontSize: 17,
                //     padding: 17,
                // }}
                placeholder="Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
                numberOfLines={4}
                className='pl-4  text-lg'
            />
            <View className='flex-row items-center my-5'>
                <TouchableOpacity className=' ml-4 px-4 py-3 flex-row justify-center items-center border-[1px] border-[#EAEAEA] rounded-lg ' onPress={() => {
                    console.log(1);
                    onPressPriority()
                }}>
                    {
                        priority == 4 ? <Material name="flag-outline" size={20} style={{ color: priorityColors[priority - 1], fontWeight: "bold" }} className='font-semibold' /> : <Material name="flag" size={20} style={{ color: priorityColors[priority - 1], fontWeight: "bold" }} className='font-semibold' />
                    }
                    <Text className=' font-semibold ml-1' style={{
                        color: priorityColors[priority - 1]
                    }}>Priority</Text>
                </TouchableOpacity>
                <TouchableOpacity className='ml-4 px-4 py-3 flex-row justify-center items-center border-[1px] border-[#EAEAEA] rounded-lg' onPress={() => {
                    timePickerRef.current?.open()
                }}>
                    {
                        dueDate == null
                            ? <>
                                <Material name="calendar-clock-outline" size={20} style={{ color: '#DDDDDD', fontWeight: "bold" }} className='font-semibold' />
                                <Text className='text-[#BBBBBB] font-semibold ml-1'>Reminder</Text>
                            </>
                            :
                            <>
                                <Material name="calendar-clock-outline" size={20} style={{ color: '#DDDDDD', fontWeight: "bold" }} className='font-semibold' />
                                <Text className='text-[#BBBBBB] font-semibold ml-1'>{buildDate(dueDate)}</Text>
                            </>
                    }
                </TouchableOpacity>
            </View>
            <View className='w-full flex-row justify-end border-t-[1px] border-[#EAEAEA]'>
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        alignItems: "center",

                    }}
                    onPress={() => {
                        setChecklist((prev) => [...prev, { id: (prev.length + 1).toString(), title: name, description: description, dueDate: dueDate != null ? new Date(dueDate) : new Date(), priority: priority, isCompleted: false, createdAt: new Date() }]);

                        refRBSheet.current?.close();
                    }}
                    className='my-2 w-auto h-auto mr-4 p-2 rounded-full'
                >
                    <Material name="arrow-up" size={20} style={{ color: "white", fontWeight: "bold" }} className='font-semibold' />
                </TouchableOpacity>
            </View>
            <TimePicker refRBSheet={timePickerRef} setSave={setDueDate} initialValue={dueDate} />
        </RBSheet>
    )
}

export const TimePicker = ({ refRBSheet, setSave, initialValue }: { refRBSheet: React.RefObject<RBSheet>, setSave: (dueDate: Date | null) => void, initialValue: Date | null }) => {
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

    return <RBSheet
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
            draggableIcon: {
                display: "none",
            }
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
                        color: COLORS.primary
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

    </RBSheet>
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
export default AddItemCheckListSheet