import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  Keyboard,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {COLORS} from 'src/constants';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {iOSColors, iOSGrayColors} from 'src/constants/ios-color';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppDispatch, RootState} from 'src/redux/store';
import {useDispatch, useSelector} from 'react-redux';

import Ingredients from 'src/assets/images/household_assets/Ingredients.png';
import OpenedFolder from 'src/assets/images/household_assets/OpenedFolder.png';

import {
  addShoppingList,
  addShoppingListItem,
} from 'src/redux/slices/ShoppingListSlice';
import {TodoListItem, TodoListType} from 'src/interface/todo/todo';
import {addTodoListItem} from 'src/redux/slices/TodoListSlice';
import {useColorScheme} from 'nativewind';
import TodoListService from 'src/services/apiclient/TodoListService';
import {addTodoList} from 'src/redux/slices/CalendarSlice';

interface AddItemSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  id_family: number;
  id_checklist_type: number;
  checklistType: TodoListType;
  onAddSuccess: () => void;
  onAddFailed: () => void;
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const AddItemSheet = ({
  bottomSheetRef,
  id_family,
  id_checklist_type,
  checklistType,
  onAddSuccess,
  onAddFailed,
}: AddItemSheetProps) => {
  const snapPoints = React.useMemo(() => ['75%'], []);

  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const [errorText, setErrorText] = React.useState('');
  const [showError, setShowError] = React.useState(false);

  const [inputName, setInputName] = React.useState('');
  const {colorScheme} = useColorScheme();

  useEffect(() => {
    if (showError) {
      setTimeout(() => {
        setShowError(false);
        setErrorText('');
      }, 3000);
    }
  }, [showError]);

  const renderBackdrop = React.useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
        pressBehavior={loading ? 'none' : undefined}
      />
    ),
    [],
  );

  const handleSubmit = async () => {
    Keyboard.dismiss();
    await Promise.resolve(
      new Promise(resolve => {
        setTimeout(() => {
          resolve('1');
        }, 100);
      }),
    );
    if (inputName == '') {
      setErrorText('Please fill in all the fields');
      setShowError(true);
      return;
    } else {
      const newItem = await TodoListService.addItem({
        id_family: id_family,
        id_checklist_type: id_checklist_type,
        description: '',
        due_date: new Date().toISOString(),
        task_name: inputName,
      });
      // const res_example:TodoListItem = {
      //     "id_family": 96,
      //     "id_checklist_type": 1,
      //     "task_name": "Du lich",
      //     "description": "",
      //     "due_date": "2024-06-06T00:00:00.000Z",
      //     "id_checklist": 52,
      //     "is_completed": false,
      //     "is_notified_3_days_before": false,
      //     "is_notified_1_day_before": false,
      //     "is_notified_on_due_date": false,
      //     "created_at": "2024-08-08T19:36:55.425Z",
      //     "updated_at": "2024-08-08T19:36:55.425Z"
      // }
      if (newItem) {
        dispatch(addTodoList(newItem));
        dispatch(
          addTodoListItem({
            id_checklist_type: id_checklist_type,
            item: newItem,
          }),
        );
        bottomSheetRef.current?.close();
        onAddSuccess();
      } else {
        setErrorText('Server error please try again');
        setShowError(true);
        onAddFailed();
      }
    }
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      enableOverDrag={true}
      enablePanDownToClose={loading ? false : true}
      enableDynamicSizing={true}
      // snapPoints={snapPoints}

      // handleComponent={null}
      handleIndicatorStyle={{
        backgroundColor: iOSGrayColors.systemGray6.defaultLight,
      }}
      backgroundStyle={{
        backgroundColor: colorScheme === 'dark' ? '#0A1220' : '#F7F7F7',
      }}
      // backgroundComponent={null}
      backdropComponent={renderBackdrop}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      onClose={() => {
        Keyboard.dismiss();
      }}
      onChange={index => {
        console.log(index);
        if (index == -1) {
          setInputName('');
        }
      }}
      // keyboardBehavior="extend"
      // keyboardBlurBehavior="restore"
    >
      <View className="flex-1 bg-[#F7F7F7] dark:bg-[#0A1220] ">
        <BottomSheetScrollView
          className=""
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View className="flex-1  mt-10">
            <View className="my-3 items-center">
              <Image
                source={Ingredients}
                style={{width: screenWidth * 0.2, height: screenWidth * 0.2}}
              />
            </View>
            <View className=" items-center">
              <Text className="text-base font-semibold text-[#2A475E] dark:text-white">
                Add New Item
              </Text>
              <Text className="text-sm my-3  text-[#2A475E] dark:text-[#8D94A5]">
                Pick a category and named for your new item
              </Text>
            </View>
            <BottomSheetTextInput
              placeholder="Name of the item"
              value={inputName}
              onChangeText={text => {
                setInputName(text);
              }}
              placeholderTextColor={
                colorScheme === 'light' ? '#b0b0b0' : '#A6A6A6'
              }
              // className='rounded-lg'
              style={{
                backgroundColor:
                  colorScheme === 'light' ? '#f5f5f5' : '#171A21',
                borderWidth: colorScheme === 'light' ? 1 : 1.5,
                borderColor: colorScheme === 'light' ? '#DEDCDC' : '#66C0F4',
                borderRadius: 10,
                marginVertical: 10,
                paddingVertical: screenHeight * 0.02,
                paddingHorizontal: screenWidth * 0.05,
                marginHorizontal: screenWidth * 0.05,
                // fontWeight: 'bold',
                fontSize: 15,
                color: colorScheme === 'light' ? '#b0b0b0' : '#A6A6A6',
              }}
              keyboardAppearance={colorScheme}
            />

            <View>
              {showError ? (
                <Text className="text-center text-base text-red-500 py-3">
                  {errorText}
                </Text>
              ) : (
                <></>
              )}
            </View>

            <View className="items-end pr-3 my-3 mt-12 ">
              <TouchableOpacity
                className="items-center rounded-lg justify-center"
                style={{
                  width: screenWidth * 0.1,
                  height: screenWidth * 0.1,
                  backgroundColor:
                    inputName != ''
                      ? COLORS.DenimBlue
                      : iOSGrayColors.systemGray6.defaultLight,
                }}
                onPress={async () => {
                  await handleSubmit();
                }}
                disabled={inputName == '' ? true : false}>
                <Material
                  name="arrow-right"
                  size={24}
                  color={
                    inputName != ''
                      ? 'white'
                      : iOSGrayColors.systemGray.defaultDark
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetScrollView>
      </View>
    </BottomSheet>
  );
};

export default AddItemSheet;
