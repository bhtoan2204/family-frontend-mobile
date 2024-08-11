import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {COLORS} from 'src/constants';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {ShoppingListItemInterface} from 'src/interface/checklist/checklist';
import {Picker} from '@react-native-picker/picker';
import {AppDispatch} from 'src/redux/store';
import {useDispatch} from 'react-redux';
import {addNewCheckListItemToCheckList} from 'src/redux/slices/CheckListSlice';
import AutoHeightRBSheet from 'src/components/AutoHeightRBSheet/AutoHeightRBSheet';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import CheckListTimePickerSheet from './date-picker-sheet';
import {iOSColors, iOSGrayColors} from 'src/constants/ios-color';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import NumberPickerSheet from '../sheet/number-picker';
import PricePickerSheet from '../sheet/price-picker';
import {formatVietNamCurrencyToDot} from 'src/utils/formatCurrency';
import {shoppingListItemColor} from 'src/screens/CheckListScreen/constant/color';
import CheckListServices from 'src/services/apiclient/CheckListService';

const priorityColors = ['#D74638', '#EB8909', '#007BFF', '#808080'];
const priorityColorsInside = ['#F9EAE3', '#FAEFD1', '#EAF0FB', '#000'];

interface AddItemCheckListSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  id_checklist: number;
}

const AddItemCheckListSheet = ({
  bottomSheetRef,
  id_checklist,
}: AddItemCheckListSheetProps) => {
  const timePickerRef = React.useRef<any>(null);
  const quantityPickerRef = React.useRef<any>(null);
  const pricePickerRef = React.useRef<any>(null);
  const inputRef = React.useRef<any>(null);
  // const snapPoints = React.useMemo(() => ['15%','25%','35%'], []);
  const renderBackdrop = React.useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    [],
  );
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [priority, setPriority] = React.useState(3);
  const [dueDate, setDueDate] = React.useState<Date | null>(null);
  const [quantity, setQuantity] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const {showActionSheetWithOptions} = useActionSheet();

  const buildDate = (date: Date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  const onPressPriority = () => {
    const options = [
      '🟥 Priority 1',
      '🟧 Priority 2',
      '🟦 Priority 3',
      '⬜ Priority 4',
      'Cancel',
    ];
    const cancelButtonIndex = 4;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      i => {
        switch (i) {
          case 0:
            setPriority(1);
            break;
          case 1:
            setPriority(2);
            break;
          case 2:
            setPriority(3);
            break;
          case 3:
            setPriority(4);
            break;
          case cancelButtonIndex:
            console.log('Cancel ', i);
          // Canceled
        }
      },
    );
  };
  const onAddNewItem = async () => {
    console.log('current priority', priority);
    console.log('current dueDate', dueDate);
    console.log('current quantity', quantity);
    console.log('current name', name);
    console.log('current description', description);
    // await CheckListServices.
    //(id_list: number, item_name: string, quantity: number, id_item_type: number, priority_level: number, reminder_date: string, price: string, description: string)
    console.log(
      id_checklist,
      name,
      quantity,
      6,
      4,
      dueDate != null
        ? new Date(dueDate).toISOString()
        : new Date().toISOString(),
      price,
      description,
    );
    const newItem = await CheckListServices.addItemToShoppingList(
      id_checklist,
      name,
      quantity,
      6,
      4,
      dueDate != null ? dueDate.toISOString() : new Date().toISOString(),
      price,
      description,
    );
    if (newItem != null) {
      dispatch(
        addNewCheckListItemToCheckList({
          id: id_checklist,
          item: newItem,
        }),
      );
    }
    bottomSheetRef.current?.close();
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      enableOverDrag={false}
      enableDynamicSizing={true}
      // snapPoints={snapPoints}
      handleIndicatorStyle={{
        backgroundColor: iOSGrayColors.systemGray6.defaultLight,
      }}
      backdropComponent={renderBackdrop}
      onClose={() => {
        Keyboard.dismiss();
      }}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="none"
      android_keyboardInputMode="adjustResize"
      onChange={index => {
        console.log(index);
        if (index == -1) {
          setName('');
          setDescription('');
          setPriority(3);
          setDueDate(null);
          setQuantity(0);
          Keyboard.dismiss();
        } else {
          inputRef.current?.focus();
        }
      }}>
      <BottomSheetView style={{minHeight: 100, flex: 0}}>
        <BottomSheetTextInput
          ref={inputRef}
          editable
          placeholder="Checklist name "
          value={name}
          onChangeText={text => setName(text)}
          style={{
            fontSize: 19,
            fontWeight: 500,
            color: 'black',
            paddingBottom: 10,
            paddingLeft: 14,
          }}
        />
        <BottomSheetTextInput
          placeholder="Description"
          value={description}
          onChangeText={text => setDescription(text)}
          numberOfLines={4}
          style={{
            fontSize: 17,
            color: 'black',
            paddingBottom: 10,
            paddingLeft: 14,
          }}
        />
        <ScrollView
          horizontal
          keyboardShouldPersistTaps="handled"
          showsHorizontalScrollIndicator={false}>
          <View className="flex-row items-center my-5">
            {/* <TouchableOpacity className=' ml-4 px-4 py-3 flex-row justify-center items-center border-[1px]  rounded-lg ' onPress={() => {
                            console.log(1);
                            onPressPriority()
                        }}
                            style={{
                                borderColor: priority == 4 ? "#EAEAEA" : priorityColors[priority - 1],
                            }}

                        >
                            {
                                priority == 4 ? <Material name="flag-outline" size={20} style={{ color: priorityColors[priority - 1], fontWeight: "bold" }} className='font-semibold' /> : <Material name="flag" size={20} style={{ color: priorityColors[priority - 1], fontWeight: "bold" }} className='font-semibold' />
                            }
                            <Text className=' font-semibold ml-1' style={{
                                color: priorityColors[priority - 1]
                            }}>Priority</Text>
                        </TouchableOpacity> */}
            <TouchableOpacity
              className="ml-4 px-4 py-3 flex-row justify-center items-center border-[1px]  rounded-lg"
              onPress={() => {
                timePickerRef.current?.open();
              }}
              style={{
                borderColor:
                  dueDate == null
                    ? '#EAEAEA'
                    : iOSColors.systemIndigo.defaultLight,
              }}>
              {dueDate == null ? (
                <>
                  <Material
                    name="calendar-clock-outline"
                    size={20}
                    style={{color: '#DDDDDD', fontWeight: 'bold'}}
                    className="font-semibold"
                  />
                  <Text className="text-[#BBBBBB] font-semibold ml-1">
                    Reminder
                  </Text>
                </>
              ) : (
                <>
                  {/* <Material name="calendar-clock-outline" size={20} style={{ color: '#DDDDDD', fontWeight: "bold" }} className='font-semibold' /> */}
                  <Text
                    className="text-[#BBBBBB] font-semibold ml-1"
                    style={{
                      color: iOSColors.systemIndigo.defaultLight,
                    }}>
                    {buildDate(dueDate)}
                  </Text>
                </>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              className="ml-4 px-4 py-3 flex-row justify-center items-center border-[1px]  rounded-lg"
              onPress={() => {
                quantityPickerRef.current?.open();
              }}
              style={{
                borderColor:
                  quantity == 0
                    ? '#EAEAEA'
                    : iOSColors.systemPurple.defaultLight,
              }}>
              {quantity == 0 ? (
                <>
                  <Material
                    name="numeric"
                    size={20}
                    style={{color: '#DDDDDD', fontWeight: 'bold'}}
                    className="font-semibold"
                  />
                  <Text className="text-[#BBBBBB] font-semibold ml-1">
                    Quantity
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    className="text-[#BBBBBB] font-semibold ml-1"
                    style={{
                      color: iOSColors.systemPurple.defaultLight,
                    }}>
                    {quantity.toString()}
                  </Text>
                </>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              className="ml-4 mr-4 px-4 py-3 flex-row justify-center items-center border-[1px]  rounded-lg"
              onPress={() => {
                pricePickerRef.current?.open();
              }}
              style={{
                borderColor:
                  quantity == 0
                    ? '#EAEAEA'
                    : iOSColors.systemPurple.defaultLight,
              }}>
              {price == 0 ? (
                <>
                  <Material
                    name="counter"
                    size={20}
                    style={{color: '#DDDDDD', fontWeight: 'bold'}}
                    className="font-semibold"
                  />
                  <Text className="text-[#BBBBBB] font-semibold ml-1">
                    Price
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    className="text-[#BBBBBB] font-semibold ml-1"
                    style={{
                      color: iOSColors.systemGreen.defaultLight,
                    }}>
                    {formatVietNamCurrencyToDot(price.toString())} VND
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View className="w-full flex-row justify-end border-t-[1px] border-[#EAEAEA]">
          <TouchableOpacity
            style={{
              backgroundColor: shoppingListItemColor[2],
              alignItems: 'center',
            }}
            onPress={async () => {
              await onAddNewItem();
            }}
            className="my-2 w-auto h-auto mr-4 p-2 rounded-full">
            <Material
              name="arrow-up"
              size={20}
              style={{color: 'white', fontWeight: 'bold'}}
              className="font-semibold"
            />
          </TouchableOpacity>
        </View>
      </BottomSheetView>
      <CheckListTimePickerSheet
        refRBSheet={timePickerRef}
        setSave={setDueDate}
        initialValue={dueDate}
      />
      <NumberPickerSheet
        refRBSheet={quantityPickerRef}
        initialNumber={quantity}
        onSetNumber={number => {
          setQuantity(number);
        }}
      />
      <PricePickerSheet
        refRBSheet={pricePickerRef}
        initialNumber={price}
        onSetNumber={number => {
          setPrice(number);
        }}
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    height: 150,
    fontSize: 20,
  },
  yearPicker: {
    flex: 1,
  },
  monthPicker: {
    flex: 1,
    // marginHorizontal: 5,
  },
  dayPicker: {
    flex: 1,
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
export default AddItemCheckListSheet;
