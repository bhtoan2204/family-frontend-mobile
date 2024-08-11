import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
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

import {AppDispatch} from 'src/redux/store';
import {useDispatch, useSelector} from 'react-redux';

import {updateReminderDateItem} from 'src/redux/slices/ShoppingListSlice';
import {addMonths, format, subMonths} from 'date-fns';
import {Calendar} from 'react-native-calendars';
import {getIsDarkMode} from 'src/redux/slices/DarkModeSlice';
import ShoppingListServices from 'src/services/apiclient/ShoppingListServices';

interface AddItemSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  id_family: number;
  id_list: number;
  id_item: number;
  initialDate: string;
  onUpdateSuccess: () => void;
}

const UpdateDateItemSheet = ({
  bottomSheetRef,
  id_family,
  id_list,
  id_item,
  initialDate,
  onUpdateSuccess,
}: AddItemSheetProps) => {
  const snapPoints = React.useMemo(() => ['75%'], []);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const [errorText, setErrorText] = React.useState('');
  const [showError, setShowError] = React.useState(false);
  const [selectDate, setSelectDate] = useState<string>(
    format(new Date(initialDate), 'yyyy-MM-dd'),
  );
  const [key, setKey] = useState(false);
  const isDarkMode = useSelector(getIsDarkMode);

  useEffect(() => {
    setKey(prev => !prev);
  }, [isDarkMode]);

  // console.log('hello dcmm', format(new Date('2024-07-05T19:26:03.642Z'), 'yyyy-MM-dd'))

  const buildDate = React.useCallback((dateString: string) => {
    const date: Date = new Date(dateString);

    if (isNaN(date.getTime())) {
      //throw new Error('Invalid date string');
    }

    const monthNames: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const month: string = monthNames[date.getMonth()];
    const year: number = date.getFullYear();

    const description: string = `${month} ${year}`;
    return description;
  }, []);

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

  useEffect(() => {
    if (showError) {
      setTimeout(() => {
        setShowError(false);
        setErrorText('');
      }, 3000);
    }
  }, [showError]);

  const handleDayPress = (date: any) => {
    if (selectDate === date.dateString) {
      // setSelectDate(new Date);
    } else {
      console.log(date.dateString);
      setSelectDate(date.dateString);
    }
  };

  const customCalendarHeader = () => {
    return (
      <View
        className="flex-row justify-between items-center py-3 "
        style={{
          marginHorizontal: 10,
        }}>
        <View className="">
          <Text
            className="flex-1 text-center text-base"
            style={{
              color: !isDarkMode ? '#2A475E' : COLORS.DenimBlue,
              fontWeight: 'bold',
            }}>
            {buildDate(selectDate)}
          </Text>
        </View>
        <View className="flex-row ">
          <TouchableOpacity
            className=""
            onPress={() => {
              setSelectDate(
                format(subMonths(new Date(selectDate), 1), 'yyyy-MM-dd'),
              );
            }}>
            <Material name="chevron-left" size={30} color={COLORS.DenimBlue} />
          </TouchableOpacity>
          <TouchableOpacity
            className=""
            onPress={() => {
              setSelectDate(
                format(addMonths(new Date(selectDate), 1), 'yyyy-MM-dd'),
              );
            }}>
            <Material name="chevron-right" size={30} color={COLORS.DenimBlue} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const handleSubmitApi = React.useCallback(async (date: string) => {
    const res = await ShoppingListServices.updateShoppingListItem({
      id_family: id_family,
      id_list: id_list,
      id_item: id_item,
      reminder_date: date,
    });
    if (res == true) {
      onUpdateSuccess();
    } else {
      // onUpdateFailed()
    }
  }, []);
  const handleSubmit = React.useCallback(async (date: string) => {
    dispatch(
      updateReminderDateItem({
        id_item: id_item,
        id_list: id_list,
        reminder_date: date,
      }),
    );
    bottomSheetRef.current?.close();
    await handleSubmitApi(date);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      enableOverDrag={false}
      enableDynamicSizing={true}
      enablePanDownToClose={true}
      // snapPoints={snapPoints}
      handleIndicatorStyle={{
        backgroundColor: iOSGrayColors.systemGray6.defaultLight,
      }}
      backgroundStyle={{
        backgroundColor: isDarkMode ? '#0A1220' : '#f7f7f7',
      }}
      backdropComponent={renderBackdrop}
      onClose={() => {
        Keyboard.dismiss();
      }}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="none"
      android_keyboardInputMode="adjustResize"
      onChange={index => {
        if (index === -1) {
          setSelectDate(format(new Date(initialDate), 'yyyy-MM-dd'));
        }
      }}>
      <BottomSheetView
        style={{
          minHeight: 100,
          flex: 0,
          backgroundColor: isDarkMode ? '#0A1220' : '#f7f7f7',
        }}>
        <View className="my-3">
          <View
            className="bg-[#F7F7F7] dark:bg-[#252D3B] rounded-lg"
            style={{
              marginHorizontal: 10,
            }}>
            <Calendar
              key={key.toString()}
              onDayPress={handleDayPress}
              markedDates={{
                [selectDate]: {selected: true, selectedColor: COLORS.DenimBlue},
              }}
              initialDate={selectDate}
              theme={{
                // calendarBackground: colorScheme === 'light' ? '#f7f7f7' : '#1A1A1A',
                calendarBackground: 'transparent',
                dayTextColor: !isDarkMode ? '#000000' : 'white',
                textDisabledColor: !isDarkMode ? '#7C7C7C' : '#92969D',
              }}
              minDate={'2024-05-10'}
              maxDate={'2026-06-10'}
              disableAllTouchEventsForDisabledDays={true}
              style={
                {
                  // backgroundColor: colorScheme === 'light' ? '#f7f7f7' : COLORS.Rhino,
                  // color: '',
                }
              }
              // renderHeader={
              //     date =>{
              //         console.log(date)
              //     }
              // }
              customHeader={customCalendarHeader}
              // disableArrowLeft={true}
              // // Disable right arrow. Default = false
              // disableArrowRight={true}
            />
          </View>
        </View>
        <View className="mx-[10%] mt-4 mb-12 ">
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.DenimBlue,
            }}
            className=" py-4 rounded-full items-center justify-center"
            onPress={async () => {
              console.log(selectDate);
              await handleSubmit(selectDate);
              // setSelectDate(new Date)
              // bottomSheetRef.current?.snapTo(0)
            }}>
            <Text className="text-white text-base font-semibold">Set Time</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default UpdateDateItemSheet;
