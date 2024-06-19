import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { ChecklistItemInterface, CheckListCategoryInterface } from 'src/interface/checklist/checklist';
// import ChecklistItemDetail from '../CheckListItemDetail';
import ChecklistItemModal from '../AddItemCheckListSheet';
import { CheckListScreenProps } from 'src/navigation/NavigationTypes';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS } from 'src/constants';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import AddItemCheckListSheet from '../AddItemCheckListSheet';
import { compareDates } from 'src/utils/compareDate';
import { checklist_category_type } from '../constant/checklist_category_type';
import { shoppingListItemColor, shoppingListItemColorInside } from '../constant/color'
// import CircularProgress from '../../EducationScreen/CircularProgress';
import CircularProgress from 'src/components/user/education/circular-progress';

const today = new Date();
const yesterday = new Date(today.setDate(today.getDate() - 1));
const tomorrow = new Date(today.setDate(today.getDate() + 1));

const CheckListSection: React.FC<{ title: string, data: CheckListCategoryInterface[], handleNavigateCheckListDetail: (id_checklist: number) => void }> = ({ title, data, handleNavigateCheckListDetail }) => {
    return <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {data.map(item => {
            const rand = Math.floor(Math.random() * shoppingListItemColorInside.length)

            return <TouchableOpacity key={item.id_list} onPress={() => {
                handleNavigateCheckListDetail(item.id_list)
            }}>
                <View className='px-4 py-4 my-2 rounded-xl' style={{
                    backgroundColor: shoppingListItemColorInside[item.id_item_type - 1],
                    // backgroundColor: shoppingListItemColorInside[rand],
                }}>
                    <View style={{
                        backgroundColor: shoppingListItemColor[item.id_item_type - 1],
                        // backgroundColor: shoppingListItemColor[rand],
                        alignSelf: 'flex-start'
                    }} className='w-auto px-2 py-1 rounded-2xl '>
                        <Text className='text-xs text-white font-medium '>{item.category_name!}</Text>
                    </View>
                    <Text className='text-xl font-bold mt-2 mb-4'>{item.title} </Text>

                    <View className='flex-row items-center'>
                        <View className='mr-2'>
                            <CircularProgress
                                size={20}
                                progress={item.total === 0 ? 0 : item.completed / item.total * 100}
                                strokeWidth={2}
                                backgroundColor="#BEC8DF"
                                progressColor={shoppingListItemColor[item.id_item_type - 1]}
                                // progressColor={shoppingListItemColor[rand]}
                                disableProgressText={true}
                            />
                        </View>
                        <Text className='text-[#908B89] text-sm'>{item.completed}</Text>
                        <Text className='text-[#908B89] text-sm'>/</Text>
                        <Text className='text-[#908B89] text-sm'>{item.total}</Text>
                        <Text className='text-[#908B89] ml-1 text-sm'>Complete</Text>
                    </View>
                </View>
            </TouchableOpacity>
        })}
    </View>
}



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
        backgroundColor: COLORS.AuroMetalSaurus,
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

export default CheckListSection