import React, { useEffect, useState } from 'react'
import { Dimensions, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS } from 'src/constants';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { ChecklistItemInterface } from 'src/interface/checklist/checklist';
import { Picker } from '@react-native-picker/picker';


const priorityColors = ['#D74638', '#EB8909', '#007BFF', '#808080'];
const priorityColorsInside = ['#F9EAE3', '#FAEFD1', '#EAF0FB', '#fff'];

const ChecklistDetailSheet = ({ refRBSheet, setChecklist, checklist }: { refRBSheet: React.RefObject<RBSheet>, setChecklist: React.Dispatch<React.SetStateAction<ChecklistItemInterface[]>>, checklist: ChecklistItemInterface }) => {
    const timePickerRBSheet = React.useRef<RBSheet>(null);
    const [name, setName] = React.useState(checklist.title);
    const [description, setDescription] = React.useState(checklist.description);
    const [priority, setPriority] = React.useState(checklist.priority);
    const [isEditing, setIsEditing] = React.useState(false);
    const [dueDate, setDueDate] = React.useState(checklist.dueDate)
    useEffect(() => {
        setName(checklist.title)
        setDescription(checklist.description)
        setPriority(checklist.priority)
        setDueDate(checklist.dueDate)
    }, [checklist])

    const { showActionSheetWithOptions } = useActionSheet();

    const handleUpdateChecklist = () => {
        setChecklist((prev) => {
            return prev.map((item) => {
                if (item.id === checklist.id) {
                    return {
                        ...item,
                        title: name,
                        description: description,
                        priority: priority,
                    };
                }
                return item;
            });
        });
    }

    const handleUpdatePriority = (priority: number) => {
        console.log(checklist.id, priority)
        setChecklist((prev) => {
            return [
                ...prev.map((item) => {
                    if (item.id === checklist.id) {
                        return {
                            ...item,
                            priority: priority,
                        };
                    }
                    return item;
                })
            ]


        })
    }

    const handleUpdateDueDate = (dueDate: Date | null) => {
        console.log(checklist.id, priority)
        setChecklist((prev) => {
            return [
                ...prev.map((item) => {
                    if (item.id === checklist.id) {
                        return {
                            ...item,
                            dueDate: dueDate,
                        };
                    }
                    return item;
                })
            ]


        })
    }

    const handleUpdateComplete = () => {
        setChecklist((prev) => {
            return [
                ...prev.map((item) => {
                    if (item.id === checklist.id) {
                        return {
                            ...item,
                            isCompleted: !checklist.isCompleted,
                        };
                    }
                    return item;
                })
            ]


        })
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
                    handleUpdatePriority(1);
                    break;
                case 1:
                    handleUpdatePriority(2);
                    break;
                case 2:
                    handleUpdatePriority(3);
                    break;
                case 3:
                    handleUpdatePriority(4);
                    break;
                case cancelButtonIndex:
                    console.log('Cancel ', i);
                // Canceled
            }
        });
    }

    const buildDate = (date: Date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown
            closeOnPressBack
            dragFromTopOnly
            closeOnPressMask
            onClose={() => {
                setIsEditing(false)
            }}
            customStyles={{
                container: {
                    height: isEditing ? Dimensions.get('window').height * 0.57 : Dimensions.get('window').height * 0.85,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                },
                draggableIcon: {
                    display: "none",
                }
            }}
        >
            <View className='flex-1'>
                {
                    isEditing ? <View className='w-full  flex-row justify-between  items-center py-3 bg-white px-4 z-10'>
                        <TouchableOpacity onPress={() => {
                            setIsEditing(false)
                        }} className=' flex-row items-center ' >
                            <Text className='text-base font-medium' style={{ color: COLORS.red }}>Cancel</Text>
                        </TouchableOpacity>
                        <View className=' '>
                            <Text className='text-base font-medium text-center' >Edit</Text>
                        </View>
                        <TouchableOpacity className=' ' onPress={() => {
                            handleUpdateChecklist()
                            setIsEditing(false)
                        }}>
                            <Text className='text-base font-medium ' style={{
                                textAlign: "right",
                                color: COLORS.primary
                            }}>Save</Text>
                        </TouchableOpacity>
                    </View> : <View className='w-full  flex-row justify-between  items-center py-3 bg-white px-4 z-10'>
                        <View className=' flex-row items-center flex-1'>
                        </View>
                        <View className='flex-1 '>
                        </View>
                        <View className=' flex-1   '>
                            {/* <Text className='text-base font-medium ' style={{
                                textAlign: "right",
                                color: COLORS.primary
                            }}>Save</Text> */}
                            <View style={{ alignItems: "flex-end" }} className='flex-row justify-end' >
                                <View className='bg-gray-200 p-1 rounded-full mr-3'>
                                    <Material name="dots-horizontal" size={22} style={{ color: COLORS.black }} onPress={() => {

                                    }} />
                                </View>
                                <View className='bg-gray-200 p-1 rounded-full'>
                                    <Material name="close" size={22} style={{ color: COLORS.black }} onPress={() => {
                                        refRBSheet.current?.close()
                                    }} />
                                </View>
                            </View>
                        </View>


                    </View>
                }
                <KeyboardAvoidingView className="flex-1 bg-white " behavior="padding">
                    <ScrollView showsVerticalScrollIndicator={true} className='flex-1 ' keyboardShouldPersistTaps="always" scrollEnabled={isEditing == false} >
                        {
                            isEditing
                                ? <View >
                                    <TextInput
                                        editable
                                        placeholder="Checklist name "
                                        value={name}
                                        onChangeText={(text) => setName(text)}
                                        className='pl-4 pb-2 pt-5 text-lg font-semibold'
                                        autoFocus

                                    />
                                    <TextInput
                                        placeholder="Description"
                                        value={description}
                                        onChangeText={(text) => setDescription(text)}
                                        numberOfLines={4}
                                        className='pl-4  text-base'
                                    />
                                </View>
                                :
                                <View className=''>
                                    <View className='px-4 py-2 '>
                                        <TouchableOpacity className='flex-row items-center ' onPress={() => {
                                            setIsEditing(true)
                                        }}>
                                            <TouchableOpacity className='w-7 h-7 rounded-full mr-4 flex flex-col items-center justify-center' style={{ backgroundColor: priorityColors[priority - 1] }} onPress={() => {
                                                handleUpdateComplete()
                                            }}>
                                                {
                                                    checklist.isCompleted ? <Text className='text-white'>✓</Text> : <View className=' z-10 w-6 h-6 rounded-full' style={{ backgroundColor: priorityColorsInside[checklist.priority - 1] }}>
                                                    </View>
                                                }
                                            </TouchableOpacity>
                                            <Text className='text-lg font-semibold'>{checklist.title}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity className='flex-row items-center mt-5' onPress={() => {
                                            setIsEditing(true)
                                        }}>
                                            <View className='w-7 h-7  mr-4 flex flex-col items-center justify-center'>
                                                <Material name="tooltip-outline" size={26} style={{ color: "#B5B5B5" }} />
                                            </View>
                                            <Text className='text-base'>{checklist.description}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity className='flex-row items-center mt-5' onPress={() => {
                                            onPressPriority()
                                        }}>
                                            <View className='w-7 h-7  mr-4 flex flex-col items-center justify-center'>
                                                <Material name="flag-outline" size={28} style={{ color: priorityColors[priority - 1] }} />
                                            </View>
                                            <Text className='text-base'>Priority {priority}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity className='flex-row items-center mt-5' onPress={() => {
                                            timePickerRBSheet.current?.open()
                                        }}>
                                            {
                                                dueDate == null ? <>
                                                    <View className='w-7 h-7  mr-4 flex flex-col items-center justify-center'>
                                                        <Material name="calendar-blank-outline" size={28} style={{ color: "#B5B5B5" }} />
                                                    </View>
                                                    <Text className='text-base'>Set reminder</Text>
                                                </> : <><View className='w-7 h-7  mr-4 flex flex-col items-center justify-center'>
                                                    <Material name="calendar-blank-outline" size={28} style={{ color: "#B5B5B5" }} />
                                                </View>
                                                    <Text className='text-base'>{buildDate(dueDate)}</Text></>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    <View className='h-1 bg-gray-200 my-3'></View>
                                    <ScrollView className='w-full h-full'>
                                        <View className='flex-row items-center  ml-4'>
                                            <View className='w-7 h-7  mr-4 flex flex-col items-center justify-center'>
                                                <Material name="plus" size={28} style={{ color: "#B5B5B5" }} />
                                            </View>
                                            <Text className='text-base'>Add sub task</Text>
                                        </View>
                                    </ScrollView>
                                </View>
                        }
                    </ScrollView>
                </KeyboardAvoidingView>

            </View>
            <TimePicker refRBSheet={timePickerRBSheet} setSave={handleUpdateDueDate} initialValue={dueDate} />

        </RBSheet>
    )
}

export const TimePicker = ({ refRBSheet, setSave, initialValue }: { refRBSheet: React.RefObject<RBSheet>, setSave: (dueDate: Date | null) => void, initialValue: Date | null }) => {
    const [selectedYear, setSelectedYear] = useState(initialValue?.getFullYear().toString() || (new Date().getFullYear()).toString());
    const [selectedMonth, setSelectedMonth] = useState((initialValue!.getMonth() + 1).toString().padStart(2, '0') || (new Date().getMonth() + 1).toString().padStart(2, '0'));
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
            setSelectedDay(initialValue?.getFullYear().toString() || (new Date().getFullYear()).toString())
            setSelectedMonth((initialValue!.getMonth() + 1).toString().padStart(2, '0') || (new Date().getMonth() + 1).toString().padStart(2, '0'))
            setSelectedYear(initialValue?.getDate().toString().padStart(2, '0') || (new Date().getDate()).toString().padStart(2, '0'))
            setSelectedDate(undefined);
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

export default ChecklistDetailSheet