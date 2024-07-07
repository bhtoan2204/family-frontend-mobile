import { addMonths, endOfMonth, format, startOfMonth, subMonths } from 'date-fns'
import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, Dimensions, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Agenda, AgendaSchedule, Calendar, CalendarList } from 'react-native-calendars'
import { useSelector } from 'react-redux'
import { ShoppingListScreenProps } from 'src/navigation/NavigationTypes'
import { RootState } from 'src/redux/store'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS } from 'src/constants'
import { colors } from '../const/color'

import GroceryImage from 'src/assets/images/shoppinglist_assets/grocery.png'
import ElectronicsImage from 'src/assets/images/shoppinglist_assets/Electronics.png'
import ClothingImage from 'src/assets/images/shoppinglist_assets/Clothing.png'
import FurnitureImage from 'src/assets/images/shoppinglist_assets/Furniture.png'
import PharmacyImage from 'src/assets/images/shoppinglist_assets/Pharmacy.png'
import OtherImage from 'src/assets/images/shoppinglist_assets/Other.png'
const screenHeight = Dimensions.get('screen').height;


const ShoppingListScreen = ({ navigation, route, handleNavigateShoppingListCategory }: ShoppingListScreenProps) => {
    const { id_family } = route.params
    const familyInfo = useSelector((state: RootState) => state.family).family
    const [selectDate, setSelectDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
    const shoppingList = useSelector((state: RootState) => state.shoppinglist).shoppingList
    const shoppingListType = useSelector((state: RootState) => state.shoppinglist).shoppingListType
    const shoppingListFiltered = shoppingList.filter((item) => item.id_family === id_family)
    // const handleFilterData = () => {
    //     const returnArray = []
    //     for (let i = 0; i < data.length; i++) {

    //     }
    // }

    const loadItemsForMonth = (month: any) => {
        console.log('trigger items loading');
    }
    const renderEmptyDate = () => {
        return (
            <View className='flex-1 justify-center items-center'>
                <Text>No events for this day</Text>
            </View>
        );
    };
    const rowHasChanged = (r1: any, r2: any) => {
        return r1.id_calendar !== r2.id_calendar;
    };
    const handleDayPress = (date: any) => {
        if (selectDate === date.dateString) {
            // setSelectDate(new Date); 
        } else {
            console.log(date.dateString)
            setSelectDate(date.dateString);
        }
    };
    const handleNavigateCategory = (id_category: number) => {
        navigation.navigate('ShoppingListCategory', {
            id_family: id_family,
            id_category: id_category
        })

    }

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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className='flex-row  justify-between items-center py-6'>
                    <TouchableOpacity className='flex-1 ' onPress={() => {
                        navigation.goBack()
                    }}>
                        <Material name='chevron-left' size={30} />
                    </TouchableOpacity>
                    <Text className='flex-1 text-center text-lg'
                        style={{ color: COLORS.Rhino, fontWeight: 'bold' }}
                    >Shopping List</Text>
                    <View className='flex-1 items-end'>
                        <Material name='refresh' size={25} />
                    </View>
                </View>
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
                    style={{
                        backgroundColor: '#f7f7f7',
                        marginHorizontal: 10,
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
                <View style={{
                }} className=' py-4'>
                    <Text className='ml-6 my-4 text-base font-semibold' style={{
                        color: COLORS.Rhino,
                    }}>My shopping list</Text>
                    {/* <ShoppingListCategoryItem id_category={1} category_name='Grocery' total_items={10}
                        handleNavigateCategory={handleNavigateCategory}
                    />
                    <ShoppingListCategoryItem id_category={2} category_name='Electronics' total_items={10} handleNavigateCategory={handleNavigateCategory} />
                    <ShoppingListCategoryItem id_category={3} category_name='Clothing' total_items={10} handleNavigateCategory={handleNavigateCategory} />
                    <ShoppingListCategoryItem id_category={4} category_name='Furniture' total_items={10} handleNavigateCategory={handleNavigateCategory} />
                    <ShoppingListCategoryItem id_category={5} category_name='Pharmacy' total_items={10} handleNavigateCategory={handleNavigateCategory} />
                    <ShoppingListCategoryItem id_category={6} category_name='Other' total_items={10} handleNavigateCategory={handleNavigateCategory} /> */}
                    {
                        shoppingListType.length > 0 && shoppingList.length > 0 && shoppingListType.map((item, index) => {
                            const total_items = shoppingList.filter((shoppingItem) => shoppingItem.id_shopping_list_type === item.id_shopping_list_type).length
                            return <ShoppingListCategoryItem key={index} id_category={item.id_shopping_list_type} category_name={item.type_name_en} total_items={total_items}
                                handleNavigateCategory={handleNavigateCategory}
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
}

const ShoppingListCategoryItem = ({ id_category, category_name, total_items, handleNavigateCategory }: ShoppingListCategoryItemProps) => {


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
                    <Text className='text-base font-semibold text-[#292828]'>{category_name}</Text>
                    <Text className='text-sm text-[#5C5C5C]'>
                        {buildTotal(total_items)}
                    </Text>
                </View>
            </View>
            <View className='' style={{
                marginRight: 10
            }}>
                <Material name='chevron-right' size={30} color={'#292828'} />
            </View>
        </View>
    </TouchableOpacity>
}

export default ShoppingListScreen