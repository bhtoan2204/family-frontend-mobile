import {addMonths, endOfMonth, format, startOfMonth, subMonths} from 'date-fns';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Agenda,
  AgendaSchedule,
  Calendar,
  CalendarList,
} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';
import {
  ShoppingListCategoryScreenProps,
  ShoppingListDetailScreenProps,
} from 'src/navigation/NavigationTypes';
import {AppDispatch, RootState} from 'src/redux/store';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from 'src/constants';
import {colors, textColors} from '../const/color';

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

import {ListItem} from '@rneui/themed';
import {gradients_list} from 'src/assets/images/gradients';
import {ScreenWidth} from '@rneui/base';
import {ShoppingListItemInterface} from 'src/interface/checklist/checklist';
import {
  deleteItem,
  updatePurchasedItem,
} from 'src/redux/slices/ShoppingListSlice';
import BottomSheet from '@gorhom/bottom-sheet';
import UpdateDateItemSheet from 'src/components/user/shopping/sheet/update-date-item-sheet';
import AddMoreInfoSheet from 'src/components/user/shopping/sheet/add-more-info-sheet';
import UpdateDescriptionSheet from 'src/components/user/shopping/sheet/update-description-sheet';
import UpdatePriceSheet from 'src/components/user/shopping/sheet/update-price-sheet';
import {convertToNumber} from 'src/utils/currency/convertPriceFromDB';
import {getIsDarkMode} from 'src/redux/slices/DarkModeSlice';
import {useToast} from 'react-native-toast-notifications';
import ShoppingListServices from 'src/services/apiclient/ShoppingListServices';
import {ShoppingListItem} from 'src/interface/shopping/shopping_list';
import SuggestItemSheet from 'src/components/user/shopping/sheet/suggestion-item-sheet';

const screenHeight = Dimensions.get('screen').height;

const ShoppingListCategoryDetailScreen = ({
  navigation,
  route,
}: ShoppingListDetailScreenProps) => {
  const {id_family, id_category, id_item, id_shopping_list} = route.params;

  const dispatch = useDispatch<AppDispatch>();

  const itemDetail = useSelector((state: RootState) => state.shoppinglist)
    .shoppingList.find(item => item.id_shopping_list_type === id_category)!
    .items!.find(item => item.id_item === id_item);
  // const item = useSelector((state: RootState) => state.shoppinglist).shoppingList.find(item => item.id_shopping_list_type === id_category)!.items

  const updateDateBottomSheetRef = React.useRef<BottomSheet>(null);
  // const addInformationBottomSheetRef = React.useRef<BottomSheet>(null)
  const updateDescriptionBottomSheetRef = React.useRef<BottomSheet>(null);
  const updatePriceBottomSheetRef = React.useRef<BottomSheet>(null);
  const suggestItemBottomSheetRef = React.useRef<BottomSheet>(null);

  const isDarkMode = useSelector(getIsDarkMode);
  const toast = useToast();

  // useEffect(() => {
  //     console.log("items", item)
  //     console.log("item detail", itemDetail)
  // }, [])

  const getImage = React.useCallback((id_category: number) => {
    if (id_category === 1) {
      return GroceryBgImage;
    }
    if (id_category === 2) {
      return ElectronicsBgImage;
    }
    if (id_category === 3) {
      return ClothingBgImage;
    }
    if (id_category === 4) {
      return FurnitureBgImage;
    }
    if (id_category === 5) {
      return PharmacyBgImage;
    }
    return OtherBgImage;
  }, []);

  const ApiCall = React.useCallback(
    async (item: ShoppingListItem) => {
      const res = await ShoppingListServices.updateShoppingListItem({
        id_family: id_family!,
        id_item: item.id_item,
        id_list: item.id_list,
        is_purchased: !item.is_purchased,
        description: item.description,
        id_item_type: item.id_item_type,
        item_name: item.item_name,
        price: item.price,
        priority_level: item.priority_level,
        quantity: item.quantity,
        reminder_date: item.reminder_date,
      });
      const updateShoppingList =
        await ShoppingListServices.updateCompleteShoppingList({
          id_family: id_family!,
          id_list: id_shopping_list,
          id_shopping_list_type: id_category,
          status: 'COMPLETED',
        });

      if (res && updateShoppingList) {
        return true;
      } else {
        return false;
      }
    },
    [id_category, id_family, id_shopping_list],
  );

  const buildInfoBox = React.useCallback(() => {
    return (
      <View className="mx-10 py-4 border-b-[1px] border-[#CFCFCF]">
        <View className="flex-row  items-center  w-full  py-2 ">
          <View className=" flex-row  items-center ">
            <TouchableOpacity
              className=" rounded-full mr-2  items-center justify-center self-start"
              style={{
                height: screenHeight * 0.04,
                width: screenHeight * 0.04,
                borderWidth: itemDetail?.is_purchased ? 0 : 2,
                borderColor: itemDetail?.is_purchased
                  ? 'transparent'
                  : '#CBCBCB',
                backgroundColor: itemDetail?.is_purchased
                  ? '#00AE00'
                  : undefined,
              }}
              onPress={async () => {
                // console.log('hello')
                dispatch(
                  updatePurchasedItem({
                    id_item: id_item,
                    id_list: id_shopping_list,
                  }),
                );
                const res = await ApiCall(itemDetail!);
                if (res) {
                  toast.show('Item is marked as purchased', {
                    type: 'success',
                    duration: 2000,
                    icon: <Material name="check" size={24} color={'white'} />,
                  });
                } else {
                  toast.show('Item is marked as purchased', {
                    type: 'success',
                    duration: 2000,
                    icon: <Material name="check" size={24} color={'white'} />,
                  });
                }
              }}>
              {itemDetail?.is_purchased && (
                <Material name="check" size={24} color={'white'} />
              )}
            </TouchableOpacity>
            <View className="flex-1">
              <Text className="text-base text-[#2F2F34] dark:text-white">
                {itemDetail?.item_name}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }, [itemDetail?.is_purchased, itemDetail?.item_name]);

  const buildCalendarBox = React.useCallback(() => {
    return (
      <TouchableOpacity
        className="mx-10 py-4 border-b-[1px] border-[#CFCFCF]"
        onPress={() => {
          updateDateBottomSheetRef.current?.expand();
        }}>
        <View className="flex-row  items-center  w-full  py-2 ">
          <View className="mr-2">
            <Material
              name="calendar-month-outline"
              size={30}
              color={!isDarkMode ? '#5D5D5D' : 'white'}
            />
          </View>

          <Text className="text-base text-[#2F2F34] dark:text-white">
            {itemDetail?.reminder_date
              ? format(new Date(itemDetail?.reminder_date), 'dd/MM/yyyy')
              : 'Set reminder date'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }, [itemDetail?.reminder_date]);

  const buildSuggestion = React.useCallback(() => {
    return (
      <TouchableOpacity
        className="mx-10 mt-3"
        onPress={() => {
          suggestItemBottomSheetRef.current?.expand();
        }}>
        <View className="flex-row  items-center  w-full  py-2 ">
          <View className="mr-2">
            <Image
              source={{
                uri: 'https://i.gyazo.com/1dffc5c8d5bb54808d3a6e30502043c1.png',
                cache: 'force-cache',
              }}
              style={{width: 30, height: 30}}
            />
          </View>

          <View>
            <Text className="text-base text-[#2F2F34] dark:text-white italic underline underline-offset-4 decoration-black dark:decoration-white">
              You probably need it
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  const buildDescriptionBox = React.useCallback(() => {
    return (
      <TouchableOpacity
        className="mx-10 py-4 border-b-[1px] border-[#CFCFCF]"
        onPress={() => {
          updateDescriptionBottomSheetRef.current?.expand();
        }}>
        <View className="flex-row  items-center  w-full  py-2 ">
          <View className="mr-2">
            <Material
              name="format-list-bulleted"
              size={30}
              color={!isDarkMode ? '#5D5D5D' : 'white'}
            />
          </View>

          <Text className="text-base text-[#2F2F34] dark:text-white">
            {itemDetail?.description != ''
              ? itemDetail?.description
              : 'Add description'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }, [itemDetail?.description]);

  const buildPriceBox = React.useCallback(() => {
    return (
      <TouchableOpacity
        className="mx-10 py-4 border-b-[1px] border-[#CFCFCF]"
        onPress={() => {
          updatePriceBottomSheetRef.current?.expand();
        }}>
        <View className="flex-row  items-center  w-full  py-2 ">
          <View className="mr-2">
            <Material
              name="currency-usd"
              size={30}
              color={!isDarkMode ? '#5D5D5D' : 'white'}
            />
          </View>

          <Text className="text-base text-[#2F2F34] dark:text-white">
            {itemDetail?.price != null ? itemDetail.price : 'Add price'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }, [itemDetail?.price]);

  const handleDelete = React.useCallback(
    async (id_family: number, id_list: number, id_item: number) => {
      const res = await ShoppingListServices.deleteShoppingListItem({
        id_family: id_family!,
        id_list: id_list,
        id_item: id_item,
      });
      if (res == true) {
        toast.show('Item deleted', {
          type: 'success',
          duration: 2000,
          icon: <Material name="close" size={24} color={'white'} />,
        });
        navigation.goBack();
      } else {
        toast.show('Failed to delete item', {
          type: 'error',
          duration: 2000,
          icon: <Material name="close" size={24} color={'white'} />,
        });
      }
    },
    [],
  );

  const handleDeleteItem = React.useCallback(
    async (id_family: number, id_list: number, id_item: number) => {
      Alert.alert(
        'Delete item',
        'Are you sure you want to delete this item?',
        [
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              await handleDelete(id_family!, id_list, id_item);
              dispatch(deleteItem({id_item: id_item, id_list: id_list}));
            },
          },
          {
            text: 'Cancel',
            onPress: () => {
              // dispatch()
            },
          },
        ],
        {cancelable: true},
      );
    },
    [],
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? '#0A1220' : '#ffffff',
      }}>
      <View
        className="py-6 h-[29%] "
        style={{
          backgroundColor: colors[id_category - 1],
        }}>
        <View className="flex-row  ml-3">
          <View className="flex-row justify-between w-full mt-2">
            <TouchableOpacity
              className=""
              onPress={() => {
                navigation.goBack();
              }}>
              <Material name="chevron-left" size={35} color={COLORS.Rhino} />
            </TouchableOpacity>
            <TouchableOpacity
              className=""
              onPress={() => {
                handleDeleteItem(id_family!, id_shopping_list, id_item);
              }}>
              <Material name="delete-outline" size={35} color={COLORS.Rhino} />
            </TouchableOpacity>
          </View>
          {/* <Text className='flex-1 text-center text-lg'
                        style={{ color: COLORS.Rhino, fontWeight: 'bold' }}
                    >Shopping List</Text> */}
          <View className="absolute top-[200%] right-[-20] ">
            <Image
              source={getImage(id_category)}
              style={{
                height: screenHeight * 0.2,
                width: screenHeight * 0.2,
                transform: [{rotate: '-20deg'}],

                // position: 'absolute',
                // right: 0,
              }}
            />
          </View>
        </View>
        <View className="ml-3 mt-10">
          <Text
            className=""
            style={{
              fontSize: 40,
              color: textColors[id_category - 1],
              fontWeight: '600',
            }}>
            {itemDetail?.itemType.item_type_name_en}
          </Text>
        </View>
      </View>

      <View className="flex-1 mt-[-5%] rounded-tl-xl rounded-tr-xl r bg-white dark:bg-[#0A1220] overflow-hidden z-100">
        <View className="bg-white dark:bg-[#0A1220] flex-1 ">
          <ScrollView className="">
            <View style={{}} className=" py-4">
              <View className="my-2"></View>

              <View>
                {buildInfoBox()}
                {buildCalendarBox()}
                {/* {buildRepeatBox()} */}
                {buildDescriptionBox()}
                {buildPriceBox()}
                {buildSuggestion()}
                {/* {
                                    itemDetail && itemDetail.description == "" && itemDetail.price == "$0.00" && buildAddInfoBox()
                                } */}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <UpdateDateItemSheet
        bottomSheetRef={updateDateBottomSheetRef}
        id_family={id_family!}
        id_list={id_shopping_list}
        id_item={id_item}
        initialDate={
          itemDetail?.reminder_date
            ? itemDetail?.reminder_date
            : new Date().toISOString()
        }
        onUpdateSuccess={() => {
          toast.show('Reminder date updated', {
            type: 'success',
            duration: 2000,
            icon: <Material name="check" size={24} color={'white'} />,
          });
        }}
      />

      {/* <AddMoreInfoSheet
                bottomSheetRef={addInformationBottomSheetRef} id_family={id_family!} id_list={id_shopping_list}
                description={description}
                price={itemDetail?.price ? itemDetail?.price : 0}
                id_item={id_item}
                id_shopping_list_type={id_shopping_list}
                onUpdateSuccess={
                    () => {
                        toast.show("Description and price updated", {
                            type: "success",
                            duration: 2000,
                            icon: <Material name="check" size={24} color={"white"} />,
                        })
                    }
                }
            /> */}
      <UpdateDescriptionSheet
        bottomSheetRef={updateDescriptionBottomSheetRef}
        id_family={id_family!}
        id_list={id_shopping_list}
        description={itemDetail?.description ? itemDetail?.description : ''}
        id_item={id_item}
        id_shopping_list_type={id_shopping_list}
        onUpdateSuccess={() => {
          toast.show('Description updated', {
            type: 'success',
            duration: 2000,
            icon: <Material name="check" size={24} color={'white'} />,
          });
        }}
      />
      <UpdatePriceSheet
        bottomSheetRef={updatePriceBottomSheetRef}
        id_family={id_family!}
        id_list={id_shopping_list}
        price={itemDetail?.price ? itemDetail?.price : 0}
        id_item={id_item}
        id_shopping_list_type={id_shopping_list}
        onUpdateSuccess={() => {
          toast.show('Price updated', {
            type: 'success',
            duration: 2000,
            icon: <Material name="check" size={24} color={'white'} />,
          });
        }}
      />
      <SuggestItemSheet
        bottomSheetRef={suggestItemBottomSheetRef}
        id_list={id_shopping_list}
        id_item={id_item}
        id_family={id_family!}
        onAddFailed={() => {}}
        onAddSuccess={() => {}}
        id_item_type={itemDetail?.id_item_type!}
        itemType={itemDetail?.itemType!}
      />
    </View>
  );
};

export default ShoppingListCategoryDetailScreen;
