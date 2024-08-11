import { addMonths, endOfMonth, format, startOfMonth, subMonths } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Appearance,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  Agenda,
  AgendaSchedule,
  Calendar,
  CalendarList,
} from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import {
  ShoppingListCategoryScreenProps,
  TodoListCategoryScreenProps,
} from 'src/navigation/NavigationTypes';
import { AppDispatch, RootState } from 'src/redux/store';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';
import { colors, textColors } from '../const/color';

import GroceryImage from 'src/assets/images/shoppinglist_assets/grocery.png';
import ElectronicsImage from 'src/assets/images/shoppinglist_assets/Electronics.png';
import ClothingImage from 'src/assets/images/shoppinglist_assets/Clothing.png';
import FurnitureImage from 'src/assets/images/shoppinglist_assets/Furniture.png';
import PharmacyImage from 'src/assets/images/shoppinglist_assets/Pharmacy.png';
import OtherImage from 'src/assets/images/shoppinglist_assets/Other.png';
import GroceryBgImage from 'src/assets/images/shoppinglist_assets/grocery_bg_image.png';
import ElectronicsBgImage from 'src/assets/images/shoppinglist_assets/electronics_bg_image.png';
import ClothingBgImage from 'src/assets/images/shoppinglist_assets/clothing_bg_image.png';
import FurnitureBgImage from 'src/assets/images/shoppinglist_assets/furniture_bg_image.png';
import PharmacyBgImage from 'src/assets/images/shoppinglist_assets/pharmacy_bg_image.png';
import OtherBgImage from 'src/assets/images/shoppinglist_assets/other_bg_image.png';
import GamingIcon from 'src/assets/images/shoppinglist_assets/gaming_icon.png';
import EmptyListIcon from 'src/assets/images/shoppinglist_assets/empty_list_icon.png';

import { ListItem } from '@rneui/themed';
import { gradients_list } from 'src/assets/images/gradients';
import { ScreenWidth } from '@rneui/base';
import { ShoppingListItemInterface } from 'src/interface/checklist/checklist';
import ShoppingListServices from 'src/services/apiclient/ShoppingListServices';
import {
  ShoppingList,
  ShoppingListItem,
  ShoppingListItemType,
} from 'src/interface/shopping/shopping_list';
import ShoppingListCategoryItem from 'src/components/user/shopping/shopping-list-category/shopping-list-category-item';
import BottomSheet from '@gorhom/bottom-sheet';
import AddItemSheet from 'src/components/user/shopping-todo/sheet/add-item-sheet';

import { categoriesImage } from '../const/image';
import { TodoListItem } from 'src/interface/todo/todo';
import { styled, useColorScheme } from 'nativewind';
import {
  setLoading,
  setTodoList,
  setTodoListType,
  updateDoneTodoList,
} from 'src/redux/slices/TodoListSlice';
import { useToast } from 'react-native-toast-notifications';
import TodoListServices from 'src/services/apiclient/TodoListService';
import {getTranslate, selectLocale} from 'src/redux/slices/languageSlice';

const screenHeight = Dimensions.get('screen').height;

// tạo item theo item type trong 1 list trống
// tạo list với category đó trước param id_category, "id_family": 0,"id_shopping_list_type": 0"title": "string", "description": "string"
// add item vào list đó với param id_list, id_family,item_name,id_item_type

// tạo item với list có rồi với param id_list, id_family,item_name,id_item_type

const TodoListCategoryScreen = ({
  navigation,
  route,
}: TodoListCategoryScreenProps) => {
  const { id_family, id_category } = route.params;
  // console.log('id_family', id_family, 'id_category', id_category)

  const dispatch = useDispatch<AppDispatch>();
  const todoCategories = useSelector(
    (state: RootState) => state.todoList,
  ).todoListType;
  const todoListCategoryItems = useSelector(
    (state: RootState) => state.todoList,
  ).todoListType.find(
    item => item.id_checklist_type === id_category,
  )?.checklists;
  const todoListType = todoCategories.find(
    item => item.id_checklist_type == id_category,
  )!;
  const addItemBottomSheetRef = React.useRef<BottomSheet>(null);
  const loading = useSelector((state: RootState) => state.todoList).loading;
  const toast = useToast();
  const translate = useSelector(getTranslate);
  const location = useSelector(selectLocale);

  const refetchData = useCallback(async () => {
    const fetchTodoListType = async () => {
      const response = await TodoListServices.getAllTodoListType(id_family!);
      console.log('todo list types ', response);
      dispatch(setTodoListType(response));
    };
    const fetchTodoListItem = async () => {
      const response = await TodoListServices.getAllItemOfFamily(
        id_family!,
        1,
        100,
      );
      dispatch(setTodoList(response));
      console.log('todo list items ', response);
    };
    dispatch(setLoading(true));
    await fetchTodoListType();
    await fetchTodoListItem();
    dispatch(setLoading(false));
  }, []);

  useEffect(() => {
    if (!todoListCategoryItems) {
      refetchData();
    }
    // refetchData();
  }, []);

  const getImage = React.useCallback((id_category: number) => {
    return categoriesImage[id_category - 1] != undefined
      ? categoriesImage[id_category - 1]
      : categoriesImage[9];
  }, []);

  const getCategoryName = React.useCallback(() => {
    if (location === 'en') {
      return todoListType ? todoListType.name_en : translate('No name found');
    } else {
      return todoListType ? todoListType.name_vn : translate('No name found');
    }
  }, [todoListType]);

  const handleNavigateItemDetail = (id_item: number) => {
    console.log('id_item', id_item);
    navigation.navigate('TodoListItemDetail', {
      id_family: id_family,
      id_category: id_category,
      id_item: id_item,
    });
  };

  const ApiCall = async (item: TodoListItem) => {
    // console.log(item.is_completed)
    console.log({
      id_checklist: item.id_checklist,
      id_checklist_type: id_category,
      id_family: id_family!,
      is_completed: !item.is_completed,
      description: item.description,
      task_name: item.task_name,
      due_date: item.due_date,
    });
    const res = await TodoListServices.updateItem({
      id_checklist: item.id_checklist,
      id_checklist_type: id_category,
      id_family: id_family!,
      is_completed: !item.is_completed,
      description: item.description,
      task_name: item.task_name,
      due_date: item.due_date,
    });
    if (res) {
      return true;
    } else {
      return false;
    }
  };

  const handleUpdateComplete = async (item: TodoListItem) => {
    const res = await ApiCall(item);
    if (res) {
      toast.show('Update successfully', {
        duration: 2000,
        icon: <Material name="check" size={24} color={'white'} />,
        type: 'success',
      });
      dispatch(
        updateDoneTodoList({
          id_checklist: item.id_checklist,
          id_checklist_type: id_category,
        }),
      );
    } else {
      toast.show('Update failed', {
        duration: 2000,
        icon: <Material name="close" size={24} color={'white'} />,
        type: 'error',
      });
    }
  };

  const buildEmptyList = React.useCallback(() => {
    return (
      <View className="flex-1 justify-center items-center ">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refetchData} />
          }>
          <View className="justify-center items-center mt-32">
            <View className="mb-4">
              <Image
                source={EmptyListIcon}
                style={{
                  height: screenHeight * 0.2,
                  width: screenHeight * 0.2,
                }}
              />
            </View>
            <Text className="text-[#747474] dark:text-[#8D94A5] my-2 font-bold text-lg">
              {translate('Nothing to buy')}?
            </Text>
            <Text className="mx-[15%] text-center text-sm text-[#747474] dark:text-[#8D94A5]">
              {translate(
                'Tap on the button to add product to your shopping list',
              )}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }, []);

  const buildItems = React.useCallback(() => {
    return (
      <View className="mx-8 my-4 ">
        <View className="my-2"></View>
        {todoListCategoryItems &&
          todoListCategoryItems.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <TodoListCategoryItem
                  item={item}
                  handleNavigateItemDetail={handleNavigateItemDetail}
                  handleUpdateComplete={handleUpdateComplete}
                />
              </React.Fragment>
            );
          })}
      </View>
    );
  }, [todoListCategoryItems]);

  return (
    <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
      <View
        className="py-6 h-[29%] "
        style={{
          backgroundColor:
            colors[id_category - 1] != undefined
              ? colors[id_category - 1]
              : colors[9],
        }}>
        <View className="flex-row  ml-3">
          <TouchableOpacity
            className="flex-1 "
            onPress={() => {
              navigation.goBack();
            }}>
            <Material name="chevron-left" size={35} color={COLORS.Rhino} />
          </TouchableOpacity>
          <View className="absolute top-[200%] right-[-20] ">
            <Image
              source={getImage(id_category)}
              style={{
                height: screenHeight * 0.2,
                width: screenHeight * 0.2,
                transform: [{ rotate: '-20deg' }],
              }}
            />
          </View>
        </View>
        <View className="ml-3 mt-10">
          <Text
            className=""
            style={{
              fontSize: 40,
              color:
                textColors[id_category - 1] != undefined
                  ? textColors[id_category - 1]
                  : textColors[9],
              fontWeight: '600',
            }}>
            {getCategoryName()}
          </Text>
        </View>
      </View>

      <View className="flex-1 mt-[-5%] rounded-tl-2xl rounded-tr-2xl r bg-white dark:bg-[#0A1220] overflow-hidden z-100">
        <TouchableOpacity
          activeOpacity={0.65}
          className="absolute rounded-full bottom-10 right-3 z-10  items-center justify-center"
          style={{
            height: screenHeight * 0.08,
            width: screenHeight * 0.08,
            backgroundColor: COLORS.DenimBlue,
          }}
          onPress={() => {
            addItemBottomSheetRef.current?.expand();
          }}>
          <Material name="plus" size={35} color={'white'} />
        </TouchableOpacity>
        <View className="bg-white dark:bg-[#0A1220] flex-1 ">
          {loading ? (
            <>
              <View className="flex-1 absolute w-full h-full bg-white dark:bg-[#0A1220] opacity-50 z-10 items-center justify-center">
                <View
                  className="items-center justify-center bg-black  rounded-lg"
                  style={{
                    width: screenHeight * 0.1,
                    height: screenHeight * 0.1,
                  }}>
                  <ActivityIndicator size="small" color={'white'} />
                </View>
              </View>
            </>
          ) : (
            <>
              {todoListCategoryItems && todoListCategoryItems.length > 0 ? (
                <ScrollView
                  className="flex-1"
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={loading}
                      onRefresh={refetchData}
                    />
                  }>
                  <View style={{}} className="flex-1 py-4 ">
                    {buildItems()}
                  </View>
                </ScrollView>
              ) : (
                buildEmptyList()
              )}
            </>
          )}
        </View>
      </View>
      <AddItemSheet
        bottomSheetRef={addItemBottomSheetRef}
        id_family={id_family!}
        id_checklist_type={id_category!}
        checklistType={todoListType}
        onAddSuccess={() => {
          toast.show('New item added', {
            type: 'success',
            duration: 2000,
            icon: <Material name="check" size={24} color={'white'} />,
          });
        }}
        onAddFailed={() => {
          toast.show('Failed to add item', {
            type: 'error',
            duration: 2000,
            icon: <Material name="close" size={24} color={'white'} />,
          });
        }}
      />
    </View>
  );
};

interface TodoListCategoryItemProps {
  item: TodoListItem;
  handleNavigateItemDetail: (id_item: number) => void;
  handleUpdateComplete: (id_item: TodoListItem) => Promise<void>;
}

export const TodoListCategoryItem = ({
  item,
  handleNavigateItemDetail,
  handleUpdateComplete,
}: TodoListCategoryItemProps) => {
  return (
    <TouchableOpacity
      className="flex-row justify-between items-center  w-full  py-4 "
      onPress={() => {
        handleNavigateItemDetail(item.id_checklist);
      }}>
      <View className=" flex-row mr-2 items-center">
        <TouchableOpacity
          className="border-2 w-8 h-8 rounded-full mr-4 items-center justify-center"
          style={{
            borderWidth: item?.is_completed ? 0 : 2,
            borderColor: item?.is_completed ? 'transparent' : '#CBCBCB',
            backgroundColor: item?.is_completed ? '#00AE00' : undefined,
          }}
          onPress={async () => {
            console.log('hello');
            await handleUpdateComplete(item);
          }}>
          {item?.is_completed && (
            <Material name="check" size={20} color={'white'} />
          )}
        </TouchableOpacity>
        <Text
          className="text-base text-[#2F2F34] dark:text-white"
          numberOfLines={1}>
          {item.task_name || 'name'}
        </Text>
      </View>
      <View className="justify-end ">
        {/* <Text className='text-sm text-[#B2B2B4]'>{item.price} VND</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default TodoListCategoryScreen;
