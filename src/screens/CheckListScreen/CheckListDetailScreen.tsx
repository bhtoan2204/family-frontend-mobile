import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { CheckListCategoryInterface, ChecklistItemInterface } from 'src/interface/checklist/checklist';
import ChecklistItem from './CheckListItem';
import ChecklistItemModal from './AddItemCheckListSheet';
import { CheckListDetailScreenProps, CheckListScreenProps } from 'src/navigation/NavigationTypes';
import { COLORS } from 'src/constants';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import AddItemCheckListSheet from './AddItemCheckListSheet';
import { shoppingListItemColor, shoppingListItemColorInside } from './constant/color';
import CircularProgress from '../EducationScreen/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';
const today = new Date();
const yesterday = new Date(today.setDate(today.getDate() - 1));
const tomorrow = new Date(today.setDate(today.getDate() + 1));

const checklistData: ChecklistItemInterface[] = [
    { id: '1', title: 'Task 1', description: 'Description 1', dueDate: today, priority: 3, isCompleted: false, createdAt: new Date() },
    { id: '2', title: 'Task 2', description: 'Description 2', dueDate: today, priority: 2, isCompleted: false, createdAt: new Date() },
    { id: '3', title: 'Task 3', description: 'Description 3', dueDate: today, priority: 1, isCompleted: true, createdAt: new Date() },
    // Thêm các mục kiểm tra khác ở đây...
];

// const checkListCategoryData: CheckListCategoryInterface = { id: 1, id_item_type: 1, id_family: 1, title: 'Grocery Title 1', completed: 1, total: 10, createdAt: today }

const ChecklistDetailScreen: React.FC<CheckListDetailScreenProps> = ({ navigation, route }) => {
    const { id_checklist, id_family } = route.params
    const refRBSheet = useRef<any>();
    const dispatch = useDispatch<AppDispatch>();
    const checkListCategoryData = useSelector((state: RootState) => state.checklist).find(item => item.id === id_checklist)!
    const checklist = useSelector((state: RootState) => state.checklist).find(item => item.id === id_checklist)!.checklistItems
    // const [checklist, setChecklist] = React.useState<ChecklistItemInterface[]>(checklistData);
    const [filteredChecklist, setFilteredChecklist] = React.useState<ChecklistItemInterface[]>()
    // const sections: { title: string, data: ChecklistItemInterface[] }[] = [];
    useEffect(() => {
        // setChecklist(checklistData)

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
                return <ChecklistItem key={index} item={item} id_checklist={id_checklist} />
            })}
        </>
    }


    return (
        <View style={styles.container} >
            <View className=' ' style={{

            }}>
                <View className='w-full  flex-row justify-between  items-center py-3 '>
                    <TouchableOpacity onPress={() => navigation.goBack()} className=' flex-row items-center flex-1'>
                        <Material name="chevron-left" size={30} color={'#908B89'} />
                        {/* <Text className='text-lg font-semibold' style={{ color: COLORS.primary }}>Back</Text> */}
                    </TouchableOpacity>
                    <View className='flex-1'>
                        {/* <Text className='text-lg font-semibold text-center' style={{ color: COLORS.primary }}>Checklist Detail</Text> */}
                    </View>
                    <TouchableOpacity className=' flex-1 justify-end items-end mr-2'>
                        <Material name="dots-horizontal" size={30} color={'#908B89'} />
                    </TouchableOpacity>
                </View>


            </View>
            {/* <ChecklistSections checklist={checklist} setChecklist={setChecklist} /> */}
            <ScrollView className='flex-1 rounded-t-xl mt-[-10] pt-3  bg-white' showsVerticalScrollIndicator={false}>
                <View className='pl-3 mt-2 py-3 mb-8' style={{
                    backgroundColor: shoppingListItemColorInside[checkListCategoryData.id_item_type - 1],
                }}>
                    <Text className='text-xl font-bold mb-4'>{checkListCategoryData.title} </Text>
                    <View style={{
                        backgroundColor: shoppingListItemColor[checkListCategoryData.id_item_type - 1],
                        alignSelf: 'flex-start'
                    }} className='w-auto px-2 py-1 rounded-2xl mb-4 '>
                        <Text className='text-xs text-white font-medium '>Grocery</Text>
                    </View>
                    <View className='flex-row items-center'>
                        <View className='mr-2'>
                            <CircularProgress
                                size={20}
                                progress={checkListCategoryData.completed / checkListCategoryData.total * 100}
                                strokeWidth={2}
                                backgroundColor="#BEC8DF"
                                progressColor={shoppingListItemColor[checkListCategoryData.id_item_type - 1]}
                                disableProgressText={true}
                            />
                        </View>
                        <Text className='text-[#908B89] text-sm'>{checkListCategoryData.completed}</Text>
                        <Text className='text-[#908B89] text-sm'>/</Text>
                        <Text className='text-[#908B89] text-sm'>{checkListCategoryData.total}</Text>
                        <Text className='text-[#908B89] ml-1 text-sm'>Complete</Text>
                    </View>

                </View>
                <View className='ml-4 my-3'>
                    <Text className='text-xl'>All Items</Text>
                </View>
                {showContent()}
            </ScrollView>
            <TouchableOpacity onPress={() => {
                refRBSheet.current.open()
            }} className='absolute bottom-6 right-4 bg-gray-200 h-16 w-16 flex-row items-center justify-center rounded-full' style={{
                backgroundColor: shoppingListItemColor[checkListCategoryData.id_item_type - 1],
            }}>
                <Text style={{ color: 'white', fontSize: 40 }}>+</Text>
            </TouchableOpacity>
            <AddItemCheckListSheet refRBSheet={refRBSheet} id_checklist={id_checklist} />
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