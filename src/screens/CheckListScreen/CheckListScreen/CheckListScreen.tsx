import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { ShoppingListItemInterface, ShoppingListCategoryInterface } from 'src/interface/checklist/checklist';
// import ChecklistItemModal from '../AddItemCheckListSheet';
import { CheckListScreenProps } from 'src/navigation/NavigationTypes';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS } from 'src/constants';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
// import AddItemCheckListSheet from '../AddItemCheckListSheet';
import { compareDates } from 'src/utils/compareDate';
import { checklist_category_type } from '../constant/checklist_category_type';
import { shoppingListItemColor, shoppingListItemColorInside } from '../constant/color'
import ChecklistSections from './CheckListSections';
import AddCheckListCategoryItem from '../AddCheckListCategoryItem/AddCheckListCategoryItem';
import { AppDispatch, RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialCheckList } from 'src/redux/slices/CheckListSlice';
import { setInitialShoppingList } from 'src/redux/slices/ShoppingListSlice';

const today = new Date();
const yesterday = new Date(today.setDate(today.getDate() - 1));
const tomorrow = new Date(today.setDate(today.getDate() + 1));

const checkListListData: ShoppingListCategoryInterface[] = [
    { id_list: 1, id_item_type: 1, id_family: 1, title: 'Grocery Title 1', completed: 0, total: 0, createdAt: today.toDateString(), checklistItems: [] },
    { id_list: 2, id_item_type: 2, id_family: 1, title: 'Random Title 2', completed: 0, total: 0, createdAt: yesterday.toDateString(), checklistItems: [] },
    { id_list: 3, id_item_type: 3, id_family: 1, title: 'Random Title 3', completed: 0, total: 0, createdAt: tomorrow.toDateString(), checklistItems: [] },
    { id_list: 4, id_item_type: 4, id_family: 1, title: 'Random Title 4', completed: 0, total: 0, createdAt: today.toDateString(), checklistItems: [] },
    { id_list: 5, id_item_type: 5, id_family: 1, title: 'Random Title 5', completed: 0, total: 0, createdAt: yesterday.toDateString(), checklistItems: [] },
    { id_list: 6, id_item_type: 6, id_family: 1, title: 'Random Title 6', completed: 0, total: 0, createdAt: tomorrow.toDateString(), checklistItems: [] },
]


const ChecklistScreen: React.FC<CheckListScreenProps> = ({ navigation, route }) => {
    console.log(route.params)
    const { id_family } = route.params
    const dispatch = useDispatch<AppDispatch>();
    const refRBSheet = React.useRef<any>(null);
    // const [checklist, setChecklist] = React.useState<CheckListCategoryInterface[]>([]);
    const checklist = useSelector((state: RootState) => state.checklist)
    const shoppinglist = useSelector((state: RootState) => state.shoppinglist)

    const [selectedItem, setSelectedItem] = React.useState<ShoppingListItemInterface | null>(null);
    const [sections, setSections] = React.useState<{ title: string, data: ShoppingListItemInterface[] }[]>([]);
    const [selectedCategory, setSelectedCategory] = React.useState<number | null>(null);
    const [searchString, setSearchString] = React.useState<string>('');
    const [filteredChecklist, setFilteredChecklist] = React.useState<ShoppingListCategoryInterface[]>([]);
    const [filteredShoppingList, setFilteredShoppingList] = React.useState<ShoppingListCategoryInterface[]>([]);
    // const sections: { title: string, data: ChecklistItemInterface[] }[] = [];

    const handleNavigateCheckListDetail = (id_checklist: number) => {
        navigation.navigate('CheckListDetail', { id_family, id_checklist })
    }
    useEffect(() => {
        const newCheckListData = checkListListData.map(item => {
            const newItem = { ...item, category_name: checklist_category_type.find(type => type.id_item_type === item.id_item_type)?.item_type_name }
            return newItem;
        })

        dispatch(setInitialCheckList(newCheckListData))
        dispatch(setInitialShoppingList(newCheckListData))
        // setChecklist(newCheckListData)

    }, [])

    useEffect(() => {

        const filtered = checklist.filter(item =>
            (selectedCategory === null || item.id_item_type === selectedCategory) &&
            (searchString === '' || item.title.toLowerCase().includes(searchString.toLowerCase()))
        )
        const filtered2 = shoppinglist.filter(item =>
            (searchString === '' || item.title.toLowerCase().includes(searchString.toLowerCase()))
        )

        filtered.map(item => {
            item.category_name = checklist_category_type.find(type => type.id_item_type === item.id_item_type)?.item_type_name
        })
        setFilteredChecklist(filtered)
        setFilteredShoppingList(filtered2)
    }, [searchString, selectedCategory, checklist, shoppinglist])



    return (
        <View style={styles.container}>
            <View className='w-full  flex-row justify-between  items-center py-3 bg-white '>
                <TouchableOpacity onPress={() => navigation.goBack()} className=' flex-row items-center flex-1'>
                    <Material name="chevron-left" size={30} style={{ color: COLORS.AuroMetalSaurus, fontWeight: "bold" }} />
                    {/* <Text className='text-lg font-semibold' style={{ color: COLORS.primary }}>Back</Text> */}
                </TouchableOpacity>
                {/* <View className='flex-1'>
                    <Text className='text-lg font-semibold text-center' style={{ color: COLORS.primary }}>Checklist</Text>
                </View> */}
                <View className=' flex-1'></View>
            </View>

            <ChecklistSections
                shoppinglist={filteredShoppingList}
                checklist={filteredChecklist}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                handleNavigateCheckListDetail={handleNavigateCheckListDetail}
                searchString={searchString}
                setSearchString={setSearchString}
                bottomSheetRef={refRBSheet}
                handleNavigateOpenAddShoppingList={() => {
                    navigation.navigate('AddShoppingList', {
                        id_family
                    })
                }}
            />

            <AddCheckListCategoryItem bottomSheetRef={refRBSheet} id_family={id_family!} />
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

export default ChecklistScreen