import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  ChecklistItemInterface,
  CheckListCategoryInterface,
} from 'src/interface/checklist/checklist';
import ChecklistItemDetail from '../CheckListItemDetail';
import ChecklistItemModal from '../AddItemCheckListSheet';
import {CheckListScreenProps} from 'src/navigation/NavigationTypes';
import RBSheet from 'react-native-raw-bottom-sheet';
import {COLORS} from 'src/constants';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import AddItemCheckListSheet from '../AddItemCheckListSheet';
import {compareDates} from 'src/utils/compareDate';
import {checklist_category_type} from '../constant/checklist_category_type';
import {
  shoppingListItemColor,
  shoppingListItemColorInside,
} from '../constant/color';
import CircularProgress from '../../EducationScreen/CircularProgress';
import ChecklistSections from './CheckListSections';
import AddCheckListCategoryItem from '../AddCheckListCategoryItem/AddCheckListCategoryItem';
import {AppDispatch, RootState} from 'src/redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {setInitialCheckList} from 'src/redux/slices/CheckListSlice';
import {SafeAreaView} from 'react-native-safe-area-context';

const today = new Date();
const yesterday = new Date(today.setDate(today.getDate() - 1));
const tomorrow = new Date(today.setDate(today.getDate() + 1));

const checkListListData: CheckListCategoryInterface[] = [
  {
    id: 1,
    id_item_type: 1,
    id_family: 1,
    title: 'Grocery Title 1',
    completed: 0,
    total: 0,
    createdAt: today,
    checklistItems: [],
  },
  {
    id: 2,
    id_item_type: 2,
    id_family: 1,
    title: 'Random Title 2',
    completed: 0,
    total: 0,
    createdAt: yesterday,
    checklistItems: [],
  },
  {
    id: 3,
    id_item_type: 3,
    id_family: 1,
    title: 'Random Title 3',
    completed: 0,
    total: 0,
    createdAt: tomorrow,
    checklistItems: [],
  },
  {
    id: 4,
    id_item_type: 4,
    id_family: 1,
    title: 'Random Title 4',
    completed: 0,
    total: 0,
    createdAt: today,
    checklistItems: [],
  },
  {
    id: 5,
    id_item_type: 5,
    id_family: 1,
    title: 'Random Title 5',
    completed: 0,
    total: 0,
    createdAt: yesterday,
    checklistItems: [],
  },
  {
    id: 6,
    id_item_type: 6,
    id_family: 1,
    title: 'Random Title 6',
    completed: 0,
    total: 0,
    createdAt: tomorrow,
    checklistItems: [],
  },
];

const checklistData: ChecklistItemInterface[] = [
  {
    id: '1',
    title: 'Task 1',
    description: 'Description 1',
    dueDate: tomorrow,
    priority: 3,
    isCompleted: false,
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Task 2',
    description: 'Description 2',
    dueDate: today,
    priority: 2,
    isCompleted: false,
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Task 3',
    description: 'Description 3',
    dueDate: yesterday,
    priority: 1,
    isCompleted: true,
    createdAt: new Date(),
  },
  // Thêm các mục kiểm tra khác ở đây...
];

const ChecklistScreen: React.FC<CheckListScreenProps> = ({
  navigation,
  route,
}) => {
  console.log(route.params);
  const {id_family} = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const refRBSheet = React.useRef<any>(null);
  // const [checklist, setChecklist] = React.useState<CheckListCategoryInterface[]>([]);
  const checklist = useSelector((state: RootState) => state.checklist);
  const [selectedItem, setSelectedItem] =
    React.useState<ChecklistItemInterface | null>(null);
  const [sections, setSections] = React.useState<
    {title: string; data: ChecklistItemInterface[]}[]
  >([]);
  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(
    null,
  );
  const [searchString, setSearchString] = React.useState<string>('');
  const [filteredChecklist, setFilteredChecklist] = React.useState<
    CheckListCategoryInterface[]
  >([]);
  // const sections: { title: string, data: ChecklistItemInterface[] }[] = [];

  const handleNavigateCheckListDetail = (id_checklist: number) => {
    navigation.navigate('CheckListDetail', {id_family, id_checklist});
  };
  useEffect(() => {
    const newCheckListData = checkListListData.map(item => {
      const newItem = {
        ...item,
        category_name: checklist_category_type.find(
          type => type.id_item_type === item.id_item_type,
        )?.item_type_name,
      };
      return newItem;
    });

    dispatch(setInitialCheckList(newCheckListData));
    // setChecklist(newCheckListData)
  }, []);

  useEffect(() => {
    const filtered = checklist.filter(
      item =>
        (selectedCategory === null || item.id_item_type === selectedCategory) &&
        (searchString === '' ||
          item.title.toLowerCase().includes(searchString.toLowerCase())),
    );
    filtered.map(item => {
      item.category_name = checklist_category_type.find(
        type => type.id_item_type === item.id_item_type,
      )?.item_type_name;
    });
    setFilteredChecklist(filtered);
  }, [searchString, selectedCategory, checklist]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <View className="w-full  flex-row justify-between  items-center py-3 bg-white ">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className=" flex-row items-center flex-1">
            <Material
              name="chevron-left"
              size={30}
              style={{color: COLORS.primary, fontWeight: 'bold'}}
            />
            {/* <Text className='text-lg font-semibold' style={{ color: COLORS.primary }}>Back</Text> */}
          </TouchableOpacity>
          {/* <View className='flex-1'>
                  <Text className='text-lg font-semibold text-center' style={{ color: COLORS.primary }}>Checklist</Text>
              </View> */}
          <View className=" flex-1"></View>
        </View>

        <ChecklistSections
          checklist={filteredChecklist}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          handleNavigateCheckListDetail={handleNavigateCheckListDetail}
          searchString={searchString}
          setSearchString={setSearchString}
          bottomSheetRef={refRBSheet}
        />

        <AddCheckListCategoryItem
          bottomSheetRef={refRBSheet}
          id_family={id_family!}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
  },
  sectionContainer: {
    marginBottom: 20,
    padding: 10,
    paddingVertical: 10,
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

export default ChecklistScreen;
