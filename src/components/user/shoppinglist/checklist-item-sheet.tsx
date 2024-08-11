import React, { useEffect, useState } from 'react'
import { Dimensions, Text, TextInput, TouchableOpacity, View, StyleSheet, Keyboard, Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS } from 'src/constants';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { ShoppingListItemInterface } from 'src/interface/checklist/checklist';
import { Picker } from '@react-native-picker/picker';
import { AppDispatch } from 'src/redux/store';
import { useDispatch } from 'react-redux';
import { addNewCheckListItemToCheckList, updateCheckListItemCompleted, updateCheckListItemDueDate, updateCheckListItemPrice, updateCheckListItemPriority, updateCheckListItemQuantity, updateCheckListItemTitleAndDescription } from 'src/redux/slices/CheckListSlice';
import AutoHeightRBSheet from 'src/components/AutoHeightRBSheet/AutoHeightRBSheet';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import CheckListTimePickerSheet from './date-picker-sheet';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { formatVietNamCurrencyNoDot } from 'src/utils/formatCurrency';
import PricePickerSheet from '../sheet/price-picker';
import NumberPickerSheet from '../sheet/number-picker';
import CheckListServices from 'src/services/apiclient/CheckListService';

const priorityColors = ['#D74638', '#EB8909', '#007BFF', '#808080'];
const priorityColorsInside = ['#F9EAE3', '#FAEFD1', '#EAF0FB', '#fff'];

interface AddItemCheckListSheetProps {
    bottomSheetRef: React.RefObject<BottomSheet>;
    checklist_item: ShoppingListItemInterface;
    id_checklist: number;
}


const CheckListDetailSheet = ({ bottomSheetRef, checklist_item, id_checklist }: AddItemCheckListSheetProps) => {
    const timePickerRBSheet = React.useRef<any>();
    const quantityPickerRef = React.useRef<any>();
    const pricePickerRef = React.useRef<any>();

    const [name, setName] = React.useState(checklist_item.item_name);
    const [description, setDescription] = React.useState(checklist_item.description);
    // const [priority, setPriority] = React.useState(checklist_item.priority_level);
    const [isEditing, setIsEditing] = React.useState(false);
    // const [dueDate, setDueDate] = React.useState(checklist_item.reminder_date)
    // const [quantity, setQuantity] = React.useState<number>(checklist_item.quantity || 0);
    // const [price, setPrice] = React.useState<number>(
    //     parseInt(formatVietNamCurrencyNoDot(checklist_item.price)) || 0
    // );
    const checkListName = checklist_item.item_name;
    const checkListDescription = checklist_item.description;
    const checkListdueDate = checklist_item.reminder_date;
    const checkListquantity = checklist_item.quantity || 0;
    const checkListprice = parseInt(formatVietNamCurrencyNoDot(checklist_item.price)) || 0;
    const dispatch = useDispatch<AppDispatch>();
    const renderBackdrop = React.useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    );
    const snapPoints = React.useMemo(() => ['90%'], []);

    useEffect(() => {
        setName(checklist_item.item_name)
        setDescription(checklist_item.description)
        // setPriority(checklist_item.priority_level)
        // setDueDate(checklist_item.reminder_date)
    }, [checklist_item])

    // const { showActionSheetWithOptions } = useActionSheet();

    const handleUpdateTitleDesc = async () => {
        // (id_item: number, id_list: number, item_name: string, quantity: number, is_purchased: boolean, priority_level: number, reminder_date: string, price: string, description: string, id_item_type: number)
        console.log(
            checklist_item.id_item,
            id_checklist,
            name,
            checklist_item.quantity,
            checklist_item.is_purchased,
            checklist_item.priority_level,
            checklist_item.reminder_date,
            parseInt(checklist_item.price),
            description || "",
            checklist_item.id_item_type)
        await CheckListServices.updateShoppingListItem(
            checklist_item.id_item,
            id_checklist,
            name,
            checklist_item.quantity,
            checklist_item.is_purchased,
            checklist_item.priority_level,
            checklist_item.reminder_date,
            parseInt(checklist_item.price),
            description || "",
            checklist_item.id_item_type
        )
        dispatch(updateCheckListItemTitleAndDescription({
            id: id_checklist,
            id_checklist: checklist_item.id_item,
            title: name,
            description: description || "",
        }))
    }

    // const handleUpdatePriority = (priority: number) => {
    //     dispatch(updateCheckListItemPriority({
    //         id: id_checklist,
    //         id_checklist: checklist_item.id_item,
    //         priority: priority,
    //     }))
    // }

    const handleUpdateDueDate = async (dueDate: Date | null) => {
        await CheckListServices.updateShoppingListItem(
            checklist_item.id_item,
            id_checklist,
            checklist_item.item_name,
            checklist_item.quantity,
            checklist_item.is_purchased,
            checklist_item.priority_level,
            dueDate?.toISOString() || new Date().toISOString(),
            parseInt(checklist_item.price),
            checklist_item.description || "",
            checklist_item.id_item_type
        )
        dispatch(updateCheckListItemDueDate({
            id: id_checklist,
            id_checklist: checklist_item.id_item,
            dueDate: dueDate?.toDateString() || new Date().toDateString(),
        }))

    }

    const handleUpdateComplete = async () => {
        dispatch(updateCheckListItemCompleted({
            id: id_checklist,
            id_checklist: checklist_item.id_item,
            isCompleted: !checklist_item.is_purchased,
        }))
        console.log(checklist_item.id_item,
            id_checklist,
            checklist_item.item_name,
            checklist_item.quantity,
            !checklist_item.is_purchased,
            checklist_item.priority_level,
            checklist_item.reminder_date,
            parseInt(checklist_item.price),
            checklist_item.description || "",
            checklist_item.id_item_type)
        await CheckListServices.updateShoppingListItem(
            checklist_item.id_item,
            id_checklist,
            checklist_item.item_name,
            checklist_item.quantity,
            !checklist_item.is_purchased,
            checklist_item.priority_level,
            checklist_item.reminder_date,
            parseInt(checklist_item.price),
            checklist_item.description || "",
            checklist_item.id_item_type
        )
    }

    const handleUpdateQuantity = async (quantity: number) => {
        await CheckListServices.updateShoppingListItem(
            checklist_item.id_item,
            id_checklist,
            checklist_item.item_name,
            quantity,
            checklist_item.is_purchased,
            checklist_item.priority_level,
            checklist_item.reminder_date,
            parseInt(checklist_item.price),
            checklist_item.description || "",
            checklist_item.id_item_type
        )
        dispatch(updateCheckListItemQuantity({
            id: id_checklist,
            id_checklist: checklist_item.id_item,
            quantity: quantity,
        }))
    }

    const handleUpdatePrice = async (price: number) => {
        await CheckListServices.updateShoppingListItem(
            checklist_item.id_item,
            id_checklist,
            checklist_item.item_name,
            checklist_item.quantity,
            checklist_item.is_purchased,
            checklist_item.priority_level,
            checklist_item.reminder_date,
            price,
            checklist_item.description || "",
            checklist_item.id_item_type
        )
        dispatch(updateCheckListItemPrice({
            id: id_checklist,
            id_checklist: checklist_item.id_item,
            price: price.toString(),
        }))
    }
    // const onPressPriority = () => {
    //     const options = ['Priority 1', 'Priority 2', 'Priority 3', 'Priority 4', 'Cancel',];
    //     const cancelButtonIndex = 4;

    //     showActionSheetWithOptions({
    //         options,
    //         cancelButtonIndex,
    //     }, (i) => {
    //         switch (i) {
    //             case 0:
    //                 handleUpdatePriority(1);
    //                 break;
    //             case 1:
    //                 handleUpdatePriority(2);
    //                 break;
    //             case 2:
    //                 handleUpdatePriority(3);
    //                 break;
    //             case 3:
    //                 handleUpdatePriority(4);
    //                 break;
    //             case cancelButtonIndex:
    //                 console.log('Cancel ', i);
    //             // Canceled
    //         }
    //     });
    // }

    const buildDate = (date: Date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    const setSave = (date: Date) => {
        // setDueDate(date)
        handleUpdateDueDate(date)
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            enableOverDrag
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
                        <TouchableOpacity className=' ' onPress={async () => {
                            await handleUpdateTitleDesc()
                            setIsEditing(false)
                        }}>
                            <Text className='text-base font-medium ' style={{
                                textAlign: "right",
                                color: COLORS.AuroMetalSaurus
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
                                <TouchableOpacity className='bg-gray-200 p-1 rounded-full z-10' onPress={() => {
                                    bottomSheetRef.current?.close()
                                }}>
                                    <Material name="close" size={22} style={{ color: COLORS.black }} />
                                </TouchableOpacity>
                            </View>
                        </View>


                    </View>
                }
                <KeyboardAvoidingView className="flex-1 " behavior="padding">

                    <ScrollView showsVerticalScrollIndicator={false} className='flex-1 ' keyboardShouldPersistTaps="handled" scrollEnabled={isEditing == false} >
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
                                            <TouchableOpacity className='w-7 h-7 rounded-full mr-4 flex flex-col items-center justify-center' style={{
                                                borderWidth: checklist_item.is_purchased ? 0 : 2,
                                                borderColor: iOSGrayColors.systemGray.accessibleDark,
                                                backgroundColor: checklist_item.is_purchased ? iOSColors.systemGreen.defaultLight : 'transparent'
                                            }} onPress={async () => {
                                                await handleUpdateComplete()
                                                Haptics.notificationAsync(
                                                    Haptics.NotificationFeedbackType.Success
                                                )
                                            }}>
                                                {
                                                    checklist_item.is_purchased && <Text className='text-white font-bold'>✓</Text>
                                                    //  : <View className=' z-10 w-6 h-6 rounded-full' style={{ backgroundColor: priorityColorsInside[3] }}>
                                                    // </View>
                                                }

                                            </TouchableOpacity>
                                            <Text className='text-lg font-semibold'>{checkListName}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity className='flex-row items-center mt-5' onPress={() => {
                                            setIsEditing(true)
                                        }}>
                                            <View className='w-7 h-7  mr-4 flex flex-col items-center justify-center'>
                                                <Material name="tooltip-outline" size={26} style={{ color: iOSGrayColors.systemGray.accessibleDark }} />
                                            </View>
                                            <Text className='text-base' style={{ color: iOSGrayColors.systemGray.accessibleDark }}>Description: {checkListDescription}</Text>
                                        </TouchableOpacity>

                                        {/* <TouchableOpacity className='flex-row items-center mt-5' onPress={() => {
                                            onPressPriority()
                                        }}>
                                            <View className='w-7 h-7  mr-4 flex flex-col items-center justify-center'>
                                                <Material name="flag-outline" size={28} style={{ color: priorityColors[priority - 1] }} />
                                            </View>
                                            <Text className='text-base'>Priority {priority}</Text>
                                        </TouchableOpacity> */}
                                        <TouchableOpacity className='flex-row items-center mt-5' onPress={() => {
                                            // onPressPriority()
                                            quantityPickerRef.current!.open()
                                        }}>
                                            <View className='w-7 h-7  mr-4 flex flex-col items-center justify-center'>
                                                <Material name="numeric" size={28} style={{ color: iOSGrayColors.systemGray.accessibleDark }} />
                                            </View>
                                            <Text className='text-base'
                                                style={{ color: iOSGrayColors.systemGray.accessibleDark }}
                                            >{checkListquantity == 0 ? "Quantity: Not set" : "Quantity: " + checkListquantity}
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity className='flex-row items-center mt-5' onPress={() => {
                                            // onPressPriority()
                                            pricePickerRef.current!.open()
                                        }}>
                                            <View className='w-7 h-7  mr-4 flex flex-col items-center justify-center'>
                                                <Material name="counter" size={28} style={{ color: iOSGrayColors.systemGray.accessibleDark }} />
                                            </View>
                                            <Text className='text-base'
                                                style={{ color: iOSGrayColors.systemGray.accessibleDark }}
                                            >{checkListprice == 0 ? "Price: Not set" : "Price: " + checkListprice + " VND"

                                                }
                                            </Text>
                                        </TouchableOpacity>


                                        <TouchableOpacity className='flex-row items-center mt-5' onPress={() => {
                                            timePickerRBSheet!.current!.open()
                                        }}>
                                            {
                                                checkListdueDate == null ? <>
                                                    <View className='w-7 h-7  mr-4 flex flex-col items-center justify-center'>
                                                        <Material name="calendar-blank-outline" size={28} style={{ color: iOSGrayColors.systemGray.accessibleDark }} />
                                                    </View>
                                                    <Text className='text-base'>Set reminder</Text>
                                                </> : <><View className='w-7 h-7  mr-4 flex flex-col items-center justify-center'>
                                                    <Material name="calendar-blank-outline" size={28} style={{ color: iOSGrayColors.systemGray.accessibleDark }} />
                                                </View>
                                                    <Text className='text-base' style={{ color: iOSGrayColors.systemGray.accessibleDark }}>
                                                        {
                                                            checkListdueDate == null ? "Set reminder" : "Reminder date: " + buildDate(new Date(checkListdueDate))
                                                        }
                                                    </Text></>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    <View className='h-1 bg-gray-200 my-3'></View>
                                    <View className='flex-row items-center  ml-4'>
                                        <View className='w-7 h-7  mr-4 flex flex-col items-center justify-center'>
                                            <Material name="plus" size={28} style={{ color: iOSGrayColors.systemGray.accessibleDark }} />
                                        </View>
                                        <Text className='text-base' style={{ color: iOSGrayColors.systemGray.accessibleDark }}>Add sub task</Text>
                                    </View>
                                </View>

                        }
                    </ScrollView>
                </KeyboardAvoidingView>

            </View>
            <CheckListTimePickerSheet refRBSheet={timePickerRBSheet} setSave={handleUpdateDueDate} initialValue={new Date(checklist_item.reminder_date)} />
            <NumberPickerSheet
                refRBSheet={quantityPickerRef} initialNumber={checkListquantity} onSetNumber={async (number) => {
                    await handleUpdateQuantity(number)
                }}
                shouldReset={false}
            />
            <PricePickerSheet
                refRBSheet={pricePickerRef} initialNumber={checkListprice}
                onSetNumber={async (number) => {
                    await handleUpdatePrice(number)
                }}
                shouldReset={false}
            />
        </BottomSheet>
    )
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
export default CheckListDetailSheet