import React from 'react'
import { ShoppingListItemInterface } from 'src/interface/checklist/checklist';
import { View, Text, StyleSheet, TouchableOpacity, Vibration, } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet';
import ChecklistDetailSheet from './CheckListDetailSheet';
import * as Haptics from 'expo-haptics';
import { AppDispatch } from 'src/redux/store';
import { useDispatch } from 'react-redux';
import { updateCheckListItemCompleted } from 'src/redux/slices/CheckListSlice';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import CheckListDetailSheet from 'src/components/user/shoppinglist/checklist-item-sheet';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import * as Animatable from 'react-native-animatable';
import { formatVietNamCurrencyNoDot, formatVietNamCurrencyToDot } from 'src/utils/formatCurrency';

const priorityColors = ['#D74638', '#EB8909', '#007BFF', '#808080'];
const priorityColorsInside = ['#F9EAE3', '#FAEFD1', '#EAF0FB', '#fff'];

interface ChecklistItemDetailProps {
    item: ShoppingListItemInterface,
    id_checklist: number,
    selectCheckListItem: (item: string) => void
}

const ChecklistItemDetail = ({ item, id_checklist, selectCheckListItem }: ChecklistItemDetailProps) => {
    const refRBSheet = React.useRef<any>(null);
    const bottomSheetRef = React.useRef<BottomSheet>(null);
    const dispatch = useDispatch<AppDispatch>();
    const handleUpdateComplete = () => {
        dispatch(updateCheckListItemCompleted({
            id: id_checklist,
            id_checklist: item.id_item,
            isCompleted: !item.is_purchased,
        }))
    }

    const buildDescriptionText = () => {
        console.log(item.price)
        const quantity = item.quantity != 0 ? item.quantity : 1

        if (item.price != "0") {
            const price = parseInt(formatVietNamCurrencyNoDot(item.price)) * quantity
            return formatVietNamCurrencyToDot(price.toString()) + " VNĐ"
        }
        if (item.description != "") {
            return item.description
        }
    }

    return <TouchableOpacity onPress={() => {
        // refRBSheet.current?.open();
        selectCheckListItem?.(item.id_item)
        // bottomSheetRef.current?.expand()
    }} style={styles.checklistItem} className='bg-white'>
        <View className='ml-1' >
            <View className='flex-row items-center'>
                <View className='flex-row items-center ' style={{

                }}>

                    <TouchableOpacity className='w-7 h-7 rounded-full mr-3 flex flex-col items-center justify-center'
                        style={{
                            borderWidth: item.is_purchased ? 0 : 2,
                            borderColor: iOSGrayColors.systemGray.accessibleDark,
                            backgroundColor: item.is_purchased ? iOSColors.systemGreen.defaultLight : 'transparent'
                        }}
                        onPress={() => {
                            Haptics.notificationAsync(
                                Haptics.NotificationFeedbackType.Success
                            )
                            handleUpdateComplete()

                        }}>
                        {
                            item.is_purchased && <Text className='text-white ' style={{
                                fontWeight: 'bold',

                            }}>✓</Text>
                            // : <View className=' z-10 w-5 h-5 rounded-full' style={{ backgroundColor: priorityColorsInside[item.priority_level - 1] || priorityColorsInside[0] }}>
                            // </View>
                        }
                    </TouchableOpacity>
                    <View>
                        {/* {
                            item.is_purchased && 
                        } */}
                        <Animatable.View animation={item.is_purchased ? "fadeInLeft" : "fadeOutLeft"} duration={200} className='absolute w-full top-[50%] border-b-[1.2px]'
                            style={{
                                borderColor: iOSGrayColors.systemGray3.defaultDark,
                            }}
                        >

                        </Animatable.View>
                        <Text className='text-lg my-1' >{item.quantity != 0 ? item.quantity + " " : ""}{item.item_name}</Text>
                    </View>
                </View>
            </View>
            <View className='ml-10 '>
                {/* <Animatable.View animation={item.is_purchased ? "fadeInLeft" : "fadeOutLeft"} duration={200} className='absolute w-full top-[50%] border-b-[1.2px]'
                    style={{
                        borderColor: iOSGrayColors.systemGray3.defaultDark,
                    }}
                >

                </Animatable.View> */}
                <Text className='text-sm text-gray-400' >{
                    buildDescriptionText()
                }</Text>
            </View>
            {/* <CheckListDetailSheet bottomSheetRef={bottomSheetRef} checklist_item={item} id_checklist={id_checklist} /> */}
            {/* <ChecklistDetailSheet refRBSheet={refRBSheet} checklist_item={item} id_checklist={id_checklist} /> */}
        </View>
    </TouchableOpacity>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    sectionContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    checklistItem: {
        padding: 10,
        // paddingVertical: 10,
        marginBottom: 0,
        borderRadius: 5,
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
});
export default ChecklistItemDetail