import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { ChecklistItemInterface } from 'src/interface/checklist/checklist';
import ChecklistItem from './CheckListItem';
import ChecklistItemModal from './AddItemCheckListSheet';
import { CheckListDetailScreenProps, CheckListScreenProps } from 'src/navigation/NavigationTypes';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS } from 'src/constants';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import AddItemCheckListSheet from './AddItemCheckListSheet';
import { compareDates } from 'src/utils/compareDate';

const today = new Date();
const yesterday = new Date(today.setDate(today.getDate() - 1));
const tomorrow = new Date(today.setDate(today.getDate() + 1));

const checklistData: ChecklistItemInterface[] = [
    { id: '1', title: 'Task 1', description: 'Description 1', dueDate: today, priority: 3, isCompleted: false, createdAt: new Date() },
    { id: '2', title: 'Task 2', description: 'Description 2', dueDate: today, priority: 2, isCompleted: false, createdAt: new Date() },
    { id: '3', title: 'Task 3', description: 'Description 3', dueDate: today, priority: 1, isCompleted: true, createdAt: new Date() },
    // Thêm các mục kiểm tra khác ở đây...
];


const ChecklistDetailScreen: React.FC<CheckListDetailScreenProps> = ({ navigation, route }) => {
    const refRBSheet = useRef<any>();
    const [checklist, setChecklist] = React.useState<ChecklistItemInterface[]>(checklistData);
    const [filteredChecklist, setFilteredChecklist] = React.useState<ChecklistItemInterface[]>()
    // const sections: { title: string, data: ChecklistItemInterface[] }[] = [];
    useEffect(() => {
        setChecklist(checklistData)
    }, [])
    useEffect(() => {
        setFilteredChecklist(checklist)
    }, [checklist])


    const showContent = () => {
        const sortedCheckList = checklist.sort((a, b) => {
            return a.priority - b.priority
        })
        return <>
            {sortedCheckList.map((item, index) => {
                return <ChecklistItem key={index} item={item} setChecklist={setChecklist} />
            })}
        </>
    }


    return (
        <View style={styles.container}>
            <View className='w-full  flex-row justify-between  items-center py-3 bg-white '>
                <TouchableOpacity onPress={() => navigation.goBack()} className=' flex-row items-center flex-1'>
                    <Material name="chevron-left" size={30} style={{ color: COLORS.primary, fontWeight: "bold" }} />
                    {/* <Text className='text-lg font-semibold' style={{ color: COLORS.primary }}>Back</Text> */}
                </TouchableOpacity>
                {/* <View className='flex-1'>
                    <Text className='text-lg font-semibold text-center' style={{ color: COLORS.primary }}>Checklist Detail</Text>
                </View> */}
                <View className=' flex-1'></View>


            </View>
            {/* <ChecklistSections checklist={checklist} setChecklist={setChecklist} /> */}
            <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
                <View className='ml-2'>
                    <Text>All Items</Text>
                </View>
                {showContent()}
            </ScrollView>
            <TouchableOpacity onPress={() => {
                refRBSheet.current.open()
            }} className='absolute bottom-6 right-4 bg-gray-200 h-16 w-16 flex-row items-center justify-center rounded-full' style={{
                backgroundColor: COLORS.primary,
            }}>
                <Text style={{ color: 'white', fontSize: 40 }}>+</Text>
            </TouchableOpacity>
            <AddItemCheckListSheet refRBSheet={refRBSheet} setChecklist={setChecklist} />
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    sectionContainer: {
        marginBottom: 20,
        padding: 10,
        paddingVertical: 10
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    checklistItem: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    circleButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    tickButton: {
        marginLeft: 'auto',
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
});

export default ChecklistDetailScreen