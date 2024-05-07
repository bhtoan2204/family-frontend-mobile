import React from 'react'
import { ChecklistItemInterface } from 'src/interface/checklist/checklist';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet';
import ChecklistDetailSheet from './CheckListDetailSheet';

const priorityColors = ['#D74638', '#EB8909', '#007BFF', '#808080'];
const priorityColorsInside = ['#F9EAE3', '#FAEFD1', '#EAF0FB', '#fff'];

const ChecklistItem: React.FC<{ item: ChecklistItemInterface, setChecklist: React.Dispatch<React.SetStateAction<ChecklistItemInterface[]>> }> = ({ item, setChecklist }) => {
    const refRBSheet = React.useRef<RBSheet>(null);
    return <TouchableOpacity onPress={() => {
        refRBSheet.current?.open();
    }} style={styles.checklistItem} className='bg-white'>
        <View  >
            <View className='flex-row items-center'>
                <TouchableOpacity className='w-7 h-7 rounded-full mr-4 flex flex-col items-center justify-center' style={{ backgroundColor: priorityColors[item.priority - 1] }} onPress={() => {
                    console.log('Priority:', item.priority)
                }}>
                    <View className=' z-10 w-6 h-6 rounded-full' style={{ backgroundColor: priorityColorsInside[item.priority - 1] }}>
                    </View>
                </TouchableOpacity>
                <Text className='text-base'>{item.title}</Text>
            </View>
            <View className='ml-11'>
                <Text className='text-sm text-gray-400'>{item.description}</Text>
            </View>
            <ChecklistDetailSheet refRBSheet={refRBSheet} setChecklist={setChecklist} checklist={item} />
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
        paddingVertical: 10,
        marginBottom: 10,
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
export default ChecklistItem