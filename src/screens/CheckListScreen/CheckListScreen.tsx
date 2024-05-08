import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { ChecklistItemInterface } from 'src/interface/checklist/checklist';
import ChecklistItem from './CheckListItem';
import ChecklistItemModal from './AddItemCheckListSheet';
import { CheckListScreenProps } from 'src/navigation/NavigationTypes';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS } from 'src/constants';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import AddItemCheckListSheet from './AddItemCheckListSheet';
import { compareDates } from 'src/utils/compareDate';

const today = new Date();
const yesterday = new Date(today.setDate(today.getDate() - 1));
const tomorrow = new Date(today.setDate(today.getDate() + 1));

const checklistData: ChecklistItemInterface[] = [
    { id: '1', title: 'Task 1', description: 'Description 1', dueDate: tomorrow, priority: 3, isCompleted: false, createdAt: new Date() },
    { id: '2', title: 'Task 2', description: 'Description 2', dueDate: today, priority: 2, isCompleted: false, createdAt: new Date() },
    { id: '3', title: 'Task 3', description: 'Description 3', dueDate: yesterday, priority: 1, isCompleted: true, createdAt: new Date() },
    // Thêm các mục kiểm tra khác ở đây...
];

const ChecklistSections: React.FC<{ checklist: ChecklistItemInterface[], setChecklist: React.Dispatch<React.SetStateAction<ChecklistItemInterface[]>> }> = ({ checklist, setChecklist }) => {
    const [sections, setSections] = React.useState<{ title: string, data: ChecklistItemInterface[] }[]>([]);
    useEffect(() => {
        const newSections: { title: string, data: ChecklistItemInterface[] }[] = [];
        checklist.forEach(item => {
            let dueDate;
            if (item.dueDate === null) {
                dueDate = new Date(item.createdAt);
            }
            else dueDate = new Date(item.dueDate);

            if (compareDates(dueDate, today) === 0) {
                const todayIndex = newSections.findIndex(section => section.title === 'Today');
                if (todayIndex === -1) {
                    newSections.push({ title: 'Today', data: [item] });
                } else {
                    newSections[todayIndex].data.push(item);
                }
            } else if (compareDates(dueDate, today) === -1) {
                const overdueIndex = newSections.findIndex(section => section.title === 'Overdue');
                if (overdueIndex === -1) {
                    newSections.push({ title: 'Overdue', data: [item] });
                } else {
                    newSections[overdueIndex].data.push(item);
                }
            } else {
                const date = dueDate.toDateString();
                const dateIndex = newSections.findIndex(section => section.title === date);
                if (dateIndex === -1) {
                    newSections.push({ title: date, data: [item] });
                } else {
                    newSections[dateIndex].data.push(item);
                }
            }
        });
        // Sắp xếp các mục trong mỗi section theo priority từ thấp đến cao
        newSections.forEach(section => {
            section.data.sort((a, b) => {
                if (a.priority !== b.priority) {
                    return a.priority - b.priority;
                } else {
                    const dateA = new Date(a.createdAt);;
                    const dateB = new Date(b.createdAt);;
                    return dateA.getTime() - dateB.getTime();
                }
            });
        });
        // Sắp xếp các sections theo thứ tự Overdue, Today và các ngày sau
        newSections.sort((a, b) => {
            if (a.title === "Overdue" && b.title !== "Overdue") {
                return -1;
            }
            if (a.title !== "Overdue" && b.title === "Overdue") {
                return 1;
            }
            if (a.title === "Today" && b.title !== "Today") {
                return -1;
            }
            if (a.title !== "Today" && b.title === "Today") {
                return 1;
            }
            const dateA = new Date(a.data[0].createdAt);
            const dateB = new Date(b.data[0].createdAt);
            return dateA.getTime() - dateB.getTime();
        });
        setSections(newSections);
    }, [checklist])

    // const sections: { title: string, data: ChecklistItemInterface[] }[] = [
    //     { title: 'Today', data: checklist.filter(item => new Date(item.dueDate).getDate() === today.getDate()) },
    //     { title: 'Overdue', data: checklist.filter(item => new Date(item.dueDate).getDate() < today.getDate()) },
    // ];


    return <>
        <FlatList
            data={sections}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <CheckListSection title={item.title} data={item.data} setChecklist={setChecklist} />}
        />

    </>

};

const CheckListSection: React.FC<{ title: string, data: ChecklistItemInterface[], setChecklist: React.Dispatch<React.SetStateAction<ChecklistItemInterface[]>> }> = ({ title, data, setChecklist }) => {
    return <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {data.map(item => (
            <ChecklistItem key={item.id} item={item} setChecklist={setChecklist} />
        ))}
    </View>
}

const ChecklistScreen: React.FC<CheckListScreenProps> = ({ navigation, route }) => {
    const refRBSheet = React.useRef<RBSheet>(null);
    const [checklist, setChecklist] = React.useState<ChecklistItemInterface[]>(checklistData);
    const [selectedItem, setSelectedItem] = React.useState<ChecklistItemInterface | null>(null);
    const [sections, setSections] = React.useState<{ title: string, data: ChecklistItemInterface[] }[]>([]);
    // const sections: { title: string, data: ChecklistItemInterface[] }[] = [];
    useEffect(() => {
        setChecklist(checklistData)
    }, [])
    useEffect(() => {

        // checklist.forEach(item => {
        //     console.log('Item:', item)
        //     const dueDate = new Date(item.dueDate);
        //     if (dueDate.getDay() === today.getDay()) {
        //         const todayIndex = sections.findIndex(section => section.title === 'Today');
        //         if (todayIndex === -1) {
        //             // sections.push({ title: 'Today', data: [item] });
        //             setSections([...sections, { title: 'Today', data: [item] }]);
        //         } else {
        //             if (sections[todayIndex].data.findIndex(i => i.id === item.id) === -1) {
        //                 // sections[todayIndex].data.push(item);
        //                 const newSections = sections[todayIndex].data
        //                 newSections.push(item)
        //                 setSections([...sections, { title: 'Today', data: newSections }])
        //             }
        //         }
        //     } else if (dueDate.getDay() < today.getDay()) {
        //         const overdueIndex = sections.findIndex(section => section.title === 'Overdue');
        //         if (overdueIndex === -1) {
        //             // sections.push({ title: 'Overdue', data: [item] });
        //             setSections([...sections, { title: 'Overdue', data: [item] }]);
        //         } else {
        //             if (sections[overdueIndex].data.findIndex(i => i.id === item.id) === -1) {
        //                 // sections[overdueIndex].data.push(item);
        //                 const newSections = sections[overdueIndex].data
        //                 newSections.push(item)
        //                 setSections([...sections, { title: 'Overdue', data: newSections }])
        //             }
        //         }
        //     } else {
        //         const date = dueDate.toDateString();
        //         const dateIndex = sections.findIndex(section => section.title === date);
        //         if (dateIndex === -1) {
        //             // sections.push({ title: date, data: [item] });
        //             setSections([...sections, { title: date, data: [item] }]);
        //         } else {
        //             if (sections[dateIndex].data.findIndex(i => i.id === item.id) === -1) {
        //                 // sections[dateIndex].data.push(item);
        //                 const newSections = sections[dateIndex].data
        //                 newSections.push(item)
        //                 setSections([...sections, { title: date, data: newSections }])
        //             }
        //         }
        //     }

        // })

        // const sortSection = () => {
        //     sections.forEach(section => {
        //         // Sắp xếp các mục trong mỗi section theo priority từ thấp đến cao
        //         section.data.sort((a, b) => {
        //             if (a.priority !== b.priority) {
        //                 return a.priority - b.priority;
        //             } else {
        //                 // Nếu các mục có cùng priority, sắp xếp theo dueDate từ nhỏ đến lớn
        //                 const dateA = new Date(a.dueDate);
        //                 const dateB = new Date(b.dueDate);
        //                 return dateA.getTime() - dateB.getTime();
        //             }
        //         });
        //     });
        //     sections.sort((a, b) => {
        //         // Sắp xếp trước các mục Overdue
        //         if (a.title === "Overdue" && b.title !== "Overdue") {
        //             return -1; // a trước b
        //         }
        //         if (a.title !== "Overdue" && b.title === "Overdue") {
        //             return 1; // b trước a
        //         }

        //         // Sau đó sắp xếp các mục Today
        //         if (a.title === "Today" && b.title !== "Today") {
        //             return -1; // a trước b
        //         }
        //         if (a.title !== "Today" && b.title === "Today") {
        //             return 1; // b trước a
        //         }

        //         // Cuối cùng, sắp xếp các mục còn lại dựa trên thời gian dueDate
        //         const dateA = new Date(a.data[0].dueDate);
        //         const dateB = new Date(b.data[0].dueDate);
        //         return dateA.getTime() - dateB.getTime();
        //     });
        // }
        // sortSection();
    }, [checklist])





    return (
        <View style={styles.container}>
            <View className='w-full  flex-row justify-between  items-center py-3 bg-white '>
                <TouchableOpacity onPress={() => navigation.goBack()} className=' flex-row items-center flex-1'>
                    <Material name="chevron-left" size={30} style={{ color: COLORS.primary, fontWeight: "bold" }} />
                    <Text className='text-lg font-semibold' style={{ color: COLORS.primary }}>Back</Text>
                </TouchableOpacity>
                <View className='flex-1'>
                    <Text className='text-lg font-semibold text-center' style={{ color: COLORS.primary }}>Checklist</Text>
                </View>
                <View className=' flex-1'></View>


            </View>
            <ChecklistSections checklist={checklist} setChecklist={setChecklist} />
            <TouchableOpacity onPress={() => {
                refRBSheet.current?.open()
            }} style={styles.fab} >
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

export default ChecklistScreen