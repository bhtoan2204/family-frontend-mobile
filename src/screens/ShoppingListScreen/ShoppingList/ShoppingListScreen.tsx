import { addMonths, endOfMonth, format, startOfMonth, subMonths } from 'date-fns'
import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, Dimensions, SafeAreaView, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native'
import { Agenda, AgendaSchedule, Calendar, CalendarList } from 'react-native-calendars'
import { useDispatch, useSelector } from 'react-redux'
import { ShoppingListScreenProps } from 'src/navigation/NavigationTypes'
import { AppDispatch, RootState } from 'src/redux/store'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS } from 'src/constants'
import { colors } from '../const/color'

import GroceryImage from 'src/assets/images/shoppinglist_assets/grocery.png'
import ElectronicsImage from 'src/assets/images/shoppinglist_assets/Electronics.png'
import ClothingImage from 'src/assets/images/shoppinglist_assets/Clothing.png'
import FurnitureImage from 'src/assets/images/shoppinglist_assets/Furniture.png'
import PharmacyImage from 'src/assets/images/shoppinglist_assets/Pharmacy.png'
import OtherImage from 'src/assets/images/shoppinglist_assets/Other.png'
import { useColorScheme } from 'nativewind'
import { useToast } from 'react-native-toast-notifications'
import { setDateSelected } from 'src/redux/slices/ShoppingListSlice'
const screenHeight = Dimensions.get('screen').height;


const ShoppingListScreen = ({ navigation, route, handleNavigateShoppingListCategory }: ShoppingListScreenProps) => {
    const { id_family } = route.params
    const familyInfo = useSelector((state: RootState) => state.family).selectedFamily
    const [selectDate, setSelectDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
    const shoppingList = useSelector((state: RootState) => state.shoppinglist).shoppingList
    const shoppingListType = useSelector((state: RootState) => state.shoppinglist).shoppingListType
    const shoppingListFiltered = shoppingList.filter((item) => item.id_family === id_family)
    const { colorScheme, setColorScheme } = useColorScheme()
    const [key, setKey] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const toast = useToast()
    useEffect(() => {
        // setColorScheme('dark')
        // console.log(colorScheme)
    }, [])
    useEffect(() => {
        setKey((prev) => !prev)
    }, [colorScheme])


    console.log("gg", shoppingListType)
    // const loadItemsForMonth = (month: any) => {
    //     console.log('trigger items loading');
    // }
    // const renderEmptyDate = () => {
    //     return (
    //         <View className='flex-1 justify-center items-center'>
    //             <Text>No events for this day</Text>
    //         </View>
    //     );
    // };
    // const rowHasChanged = (r1: any, r2: any) => {
    //     return r1.id_calendar !== r2.id_calendar;
    // };
    const handleDayPress = (date: any) => {
        if (selectDate === date.dateString) {
            // setSelectDate(new Date); 
        } else {
            console.log(date.dateString)
            setSelectDate(date.dateString);
            dispatch(setDateSelected(date.dateString))

        }
    };
    const handleNavigateCategory = (id_category: number) => {
        navigation.navigate('ShoppingListCategory', {
            id_family: id_family,
            id_category: id_category,
            openSheet: false
        })

    }

    const buildDate = React.useCallback((dateString: string) => {
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
    }, [])

    const customCalendarHeader = React.useCallback(() => {
        return (
            <View className='flex-row justify-between items-center py-3 ' style={{
                marginHorizontal: 10,
            }}>

                <View className=''>
                    <Text className='flex-1 text-center text-base'
                        style={{ color: colorScheme === 'light' ? '#2A475E' : COLORS.DenimBlue, fontWeight: 'bold' }}
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
    }, [selectDate])
    // const customCalendarHeader = () => {

    // }

    return (
        <SafeAreaView style={{ flex: 1 }} className='bg-[#f7f7f7] dark:bg-[#0A1220] '>
            <StatusBar barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className='flex-row  justify-between items-center py-6'>
                    <TouchableOpacity className='flex-1 ' onPress={() => {
                        navigation.goBack()
                    }}>
                        <Material name='chevron-left' size={30} style={{
                            color: colorScheme === 'light' ? '#2A475E' : 'white',
                        }} />
                    </TouchableOpacity>
                    <Text className='flex-1 text-center text-lg'
                        style={{
                            color:
                                colorScheme === 'light' ? COLORS.Rhino : 'white'
                            , fontWeight: 'bold'
                        }}
                    >Shopping List</Text>
                    <View className='flex-1 items-end'>
                        <Material name='refresh' size={25} style={{
                            color: colorScheme === 'light' ? '#2A475E' : 'white',
                        }} />
                    </View>
                </View>
                <View className='bg-[#F7F7F7] dark:bg-[#252D3B] rounded-lg'
                    style={{
                        marginHorizontal: 10,

                    }}
                >
                    <Calendar
                        key={key.toString()}
                        onDayPress={handleDayPress}
                        markedDates={{
                            [selectDate]: { selected: true, selectedColor: COLORS.DenimBlue },

                        }}
                        initialDate={selectDate}
                        theme={{
                            // calendarBackground: colorScheme === 'light' ? '#f7f7f7' : '#1A1A1A',
                            calendarBackground: 'transparent',
                            dayTextColor: colorScheme === 'light' ? '#000000' : 'white',
                            textDisabledColor: colorScheme === 'light' ? '#7C7C7C' : '#92969D',
                        }}
                        minDate={'2024-05-10'}
                        maxDate={'2026-06-10'}
                        disableAllTouchEventsForDisabledDays={true}
                        style={{
                            // backgroundColor: colorScheme === 'light' ? '#f7f7f7' : COLORS.Rhino,

                            // color: '',


                        }}

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
                <View style={{
                }} className=' py-4'>
                    <Text className='ml-6 my-4 text-base font-semibold' style={{
                        color:
                            colorScheme === 'light' ? COLORS.Rhino : 'white',
                    }}>My shopping list</Text>
                    {
                        shoppingListType.length > 0 && shoppingListType.map((item, index) => {
                            const total_items = shoppingList.filter((shoppingItem) => shoppingItem.id_shopping_list_type === item.id_shopping_list_type)[0]?.items?.length || 0
                            return <ShoppingListCategoryItem key={index} id_category={item.id_shopping_list_type} category_name={item.type_name_en} total_items={total_items}
                                handleNavigateCategory={handleNavigateCategory}
                                scheme={colorScheme}
                            />
                        })
                    }
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

interface ShoppingListCategoryItemProps {
    id_category: number;
    category_name: string;
    total_items: number;
    handleNavigateCategory: (id_category: number) => void;
    scheme: string
}

const ShoppingListCategoryItem = ({ id_category, category_name, total_items, handleNavigateCategory, scheme }: ShoppingListCategoryItemProps) => {


    const getImage = (id_category: number) => {
        if (id_category === 1) {
            return GroceryImage
        }
        if (id_category === 2) {
            return ElectronicsImage
        }
        if (id_category === 3) {
            return ClothingImage
        }
        if (id_category === 4) {
            return FurnitureImage
        }
        if (id_category === 5) {
            return PharmacyImage
        }
        return OtherImage
    }
    const buildTotal = (total_items: number) => {
        if (total_items > 1) {
            return `${total_items} items`
        } else if (total_items === 1) {
            return `${total_items} item`
        } else if (total_items === 0) {
            return `No item`
        }
    }

    return <TouchableOpacity className='flex-row items-center mb-2  ' onPress={() => {
        handleNavigateCategory(id_category)
    }}>
        <View className='flex-1 w-full items-center flex-row my-2 justify-between '>
            <View className='ml-6 items-center flex-row'>
                <View className='p-3 mr-3  rounded-full items-center justify-center' style={{
                    backgroundColor: colors[id_category - 1],
                }}>
                    <Image source={getImage(id_category)} style={{
                        width: screenHeight * 0.04,
                        height: screenHeight * 0.04,
                    }} />
                </View>
                <View className=' justify-center'>
                    <Text className='text-base font-semibold text-[#292828] dark:text-white'>{category_name}</Text>
                    <Text className='text-sm text-[#5C5C5C] dark:text-[#8D94A5]'>
                        {buildTotal(total_items)}
                    </Text>
                </View>
            </View>
            <View className='' style={{
                marginRight: 10,
            }}>
                <Material name='chevron-right' size={30} color={
                    scheme === 'light' ? COLORS.Rhino : 'white'
                } />
            </View>
        </View>
    </TouchableOpacity>
}

export default ShoppingListScreen