import React from 'react'
import { ChecklistItemInterface } from 'src/interface/checklist/checklist';
import { View, Text, StyleSheet, TouchableOpacity, Vibration, } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet';
import ChecklistDetailSheet from './CheckListDetailSheet';
import * as Haptics from 'expo-haptics';
import { AppDispatch } from 'src/redux/store';
import { useDispatch } from 'react-redux';
import { updateCheckListItemCompleted } from 'src/redux/slices/CheckListSlice';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import CheckListDetailSheet from 'src/components/user/shoppinglist/checklist-item-sheet';

const priorityColors = ['#D74638', '#EB8909', '#007BFF', '#808080'];
const priorityColorsInside = ['#F9EAE3', '#FAEFD1', '#EAF0FB', '#fff'];

interface ChecklistItemDetailProps {
    item: ChecklistItemInterface,
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
    return <TouchableOpacity onPress={() => {
        // refRBSheet.current?.open();
        selectCheckListItem?.(item.id_item)
        // bottomSheetRef.current?.expand()
    }} style={styles.checklistItem} className='bg-white'>
        <View className='ml-1' >
            <View className='flex-row items-center'>
                <TouchableOpacity className='w-6 h-6 rounded-full mr-3 flex flex-col items-center justify-center' style={{ backgroundColor: priorityColors[item.priority_level - 1] || priorityColors[0] }} onPress={() => {
                    Haptics.notificationAsync(
                        Haptics.NotificationFeedbackType.Success
                    )
                    handleUpdateComplete()

                }}>
                    {
                        item.is_purchased ? <Text className='text-white ' style={{
                            fontWeight: 'bold'
                        }}>✓</Text> : <View className=' z-10 w-5 h-5 rounded-full' style={{ backgroundColor: priorityColorsInside[item.priority_level - 1] || priorityColorsInside[0] }}>
                        </View>
                    }
                </TouchableOpacity>
                <Text className='text-base my-1' style={{}}>{item.item_name}</Text>
            </View>
            <View className='ml-10'>
                <Text className='text-sm text-gray-400'>{item.description}</Text>
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