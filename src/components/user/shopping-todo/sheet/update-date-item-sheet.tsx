import React, { useEffect, useRef, useState } from 'react'
import { View, Text, ScrollView, RefreshControl, Keyboard, Dimensions, Image, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, ImageBackground } from 'react-native'
import { COLORS } from 'src/constants'
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import RoomIcon from 'src/assets/images/household_assets/room.png';
import ImageIcon from 'src/assets/images/household_assets/image.png';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import HouseHoldService from 'src/services/apiclient/HouseHoldService';
import { AppDispatch, RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addRoom } from 'src/redux/slices/RoomSlice';
import { HouseHoldItemInterface } from 'src/interface/household/household_item';
import * as Animatable from 'react-native-animatable';
import CategoryIcon from 'src/assets/images/household_assets/category.png';

import NewItemImageSheet from 'src/assets/images/household_assets/new_item_image_sheet.png'
import Camera from 'src/assets/images/household_assets/Camera.png'
import Ingredients from 'src/assets/images/household_assets/Ingredients.png'
import OpenedFolder from 'src/assets/images/household_assets/OpenedFolder.png'
import Room2 from 'src/assets/images/household_assets/Room_2.png'

import { BlurView } from 'expo-blur';
import { ShoppingList, ShoppingListItem, ShoppingListItemType } from 'src/interface/shopping/shopping_list';
import { addShoppingList, addShoppingListItem, updateReminderDateItem } from 'src/redux/slices/ShoppingListSlice';
import { addMonths, format, subMonths } from 'date-fns';
import { Calendar } from 'react-native-calendars';
import { updateDescription, updateDateTodoList } from 'src/redux/slices/TodoListSlice';



interface AddItemSheetProps {
    bottomSheetRef: React.RefObject<BottomSheet>
    id_family: number
    id_item: number
    initialDate: string,
    onUpdateSuccess: () => void
    onUpdateFailed: () => void
}

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const UpdateDateItemSheet = ({
    bottomSheetRef,
    id_family,
    id_item,
    initialDate,
    onUpdateSuccess,
    onUpdateFailed

}: AddItemSheetProps) => {
    const snapPoints = React.useMemo(() => ['75%'], []);
    const [text, setText] = React.useState('')
    const [step, setStep] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch<AppDispatch>()


    const [errorText, setErrorText] = React.useState('')
    const [showError, setShowError] = React.useState(false)

    const [selectDate, setSelectDate] = useState<string>(format(new Date(initialDate), 'yyyy-MM-dd'));
    console.log('hello dcmm', format(new Date('2024-07-05T19:26:03.642Z'), 'yyyy-MM-dd'))

    const buildDate = (dateString: string) => {
        const date: Date = new Date(dateString);

        if (isNaN(date.getTime())) {
            throw new Error('Invalid date string');
        }

        const monthNames: string[] = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const month: string = monthNames[date.getMonth()];
        const year: number = date.getFullYear();

        const description: string = `${month} ${year}`;
        return description;
    }


    const renderBackdrop = React.useCallback(
        (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    );

    useEffect(() => {
        if (showError) {
            setTimeout(() => {
                setShowError(false)
                setErrorText('')
            }, 3000)
        }

    }, [showError])

    const handleDayPress = (date: any) => {
        if (selectDate === date.dateString) {
            // setSelectDate(new Date); 
        } else {
            console.log(date.dateString)
            setSelectDate(date.dateString);
        }
    };


    const customCalendarHeader = () => {
        return (
            <View className='flex-row justify-between items-center py-3 ' style={{
                marginHorizontal: 10,
            }}>

                <View className=''>
                    <Text className='flex-1 text-center text-base'
                        style={{ color: '#2A475E', fontWeight: 'bold' }}
                    >{buildDate(selectDate)}</Text>
                </View>
                <View className='flex-row '>
                    <TouchableOpacity className='' onPress={() => {
                        setSelectDate(format(subMonths(new Date(selectDate), 1), 'yyyy-MM-dd'))
                    }}>
                        <Material name='chevron-left' size={30} color={COLORS.DenimBlue} />
                    </TouchableOpacity>
                    <TouchableOpacity className='' onPress={() => {
                        setSelectDate(format(addMonths(new Date(selectDate), 1), 'yyyy-MM-dd'))
                    }}>
                        <Material name='chevron-right' size={30} color={COLORS.DenimBlue} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const handleSubmit = async () => {
        // dispatch(updateReminderDateItem({
        //     id_item: id_item,
        //     id_list: id_list,
        //     reminder_date: selectDate
        // }))
        dispatch(updateDateTodoList({
            id_item: id_item,
            date: selectDate
        }))
        bottomSheetRef.current?.close()
        onUpdateSuccess()
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            enableOverDrag={false}
            enableDynamicSizing={true}
            enablePanDownToClose={true}

            // snapPoints={snapPoints}
            handleIndicatorStyle={{ backgroundColor: iOSGrayColors.systemGray6.defaultLight, }}
            backdropComponent={renderBackdrop}
            onClose={() => {
                Keyboard.dismiss()
            }}
            keyboardBehavior='interactive'
            keyboardBlurBehavior='none'
            android_keyboardInputMode='adjustResize'
            onChange={(index) => {
                if (index === -1) {
                    setSelectDate(format(new Date(initialDate), 'yyyy-MM-dd'))
                }
            }}

        >
            <BottomSheetView style={{ minHeight: 100, flex: 0, backgroundColor: '#f7f7f7' }}>
                <View className='my-3'>
                    <Calendar
                        onDayPress={handleDayPress}
                        markedDates={{
                            [selectDate]: { selected: true, selectedColor: COLORS.DenimBlue },
                        }}
                        initialDate={selectDate}
                        theme={{
                            calendarBackground: '#f7f7f7',
                        }}
                        minDate={'2024-05-10'}
                        maxDate={'2026-06-10'}
                        disableAllTouchEventsForDisabledDays={true}
                        // hideDayNames={true}
                        style={{
                            backgroundColor: '#f7f7f7',
                            marginHorizontal: 10,
                        }}
                        customHeader={customCalendarHeader}

                    />
                </View>
                <View className='mx-[10%] mt-4 mb-12 '>
                    <TouchableOpacity style={{
                        backgroundColor: COLORS.DenimBlue,
                    }} className=' py-4 rounded-full items-center justify-center'
                        onPress={async () => {
                            console.log(selectDate)
                            await handleSubmit()
                            // setSelectDate(new Date)
                            // bottomSheetRef.current?.snapTo(0)
                        }}
                    >
                        <Text className='text-white text-base font-semibold'>Set Time</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetView>

        </BottomSheet>
    )
}


export default UpdateDateItemSheet