import { Dimensions, SafeAreaView, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateFamilyScreen from 'src/screens/CreateFamilyScreen';
import InviteNewMemberScreen from 'src/screens/InviteNewMemberScreen';
import ViewAllFamilyScreen from 'src/screens/ViewAllFamily';
import ViewFamilyScreen from 'src/screens/FamilyScreen';
import ViewAllMemberScreen from 'src/screens/AllMember';
import AddMemberScreen from 'src/screens/AddEditFamilyMemberScreen';
import { AddConsumableHouseHoldItemScreenProps, AddConsumableItemScreenProps, AddEditFamilyMemberScreenProps, AddEducationScreenProps, AddGuildLineScreenProps, AddHouseHoldItemDetailScreenProps, AddHouseHoldItemScreenProps, AddHouseHoldRoomScreenProps, AddShoppingListScreenProps, AddSubjectScreenProps, AllMemberScreenProps, CategoryScreenProps, CheckListDetailScreenProps, CheckListScreenProps, ContactScreenProps, CreateFamilyScreenProps, EditConsumableHouseHoldItemScreenProps, EditDescriptionHouseHoldItemScreenProps, EditDescriptionScreenProps, EditEducationScreenProps, EditExpenseHouseHoldItemScreenProps, EducationDetailScreenProps, EducationScreenProps, GuildLineDetailScreenProps, GuildLineScreenProps, HouseHoldItemDetailScreenProps, HouseHoldItemScreenProps, HouseHoldItemStackProps, HouseHoldScreenProps, HouseHoldStackProps, ItemScreenProps, NewsScreenProps, RoomDetailScreenProps, SharedGuildLineScreenProps, ShoppingCategoryDetailScreenProps, ShoppingListCategoryScreenProps, ShoppingListCategoryStackProps, ShoppingListScreenProps, ShoppingListStackProps, SubjectDetailScreenProps, UpdateGuildLineScreenProps, ViewAllFamilyScreenProps, ViewFamilyScreenProps } from '../NavigationTypes';

import React, { useEffect } from 'react';

import ShoppingListScreen from 'src/screens/ShoppingListScreen/ShoppingList/ShoppingListScreen';
import ShoppingListCategoryScreen from 'src/screens/ShoppingListScreen/ShoppingListCategory/ShoppingListCategory';
import { colors, textColors } from 'src/screens/ShoppingListScreen/const/color';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';
import GroceryBgImage from 'src/assets/images/shoppinglist_assets/grocery_bg_image.png'
import ElectronicsBgImage from 'src/assets/images/shoppinglist_assets/electronics_bg_image.png'
import ClothingBgImage from 'src/assets/images/shoppinglist_assets/clothing_bg_image.png'
import FurnitureBgImage from 'src/assets/images/shoppinglist_assets/furniture_bg_image.png'
import PharmacyBgImage from 'src/assets/images/shoppinglist_assets/pharmacy_bg_image.png'
import OtherBgImage from 'src/assets/images/shoppinglist_assets/other_bg_image.png'
import ShoppingListCategoryDetailScreen from 'src/screens/ShoppingListScreen/ShoppingListCategory/ShoppingListCategoryDetail';


const Stack = createNativeStackNavigator();

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ShoppingListCategoryStack = ({ navigation, route }: ShoppingListCategoryStackProps) => {
    const { id_category, id_family } = route.params.params!;
    console.log(route)
    // console.log('ShoppingListCategoryStack', route.params)

    const getImage = (id_category: number) => {
        if (id_category === 1) {
            return GroceryBgImage
        }
        if (id_category === 2) {
            return ElectronicsBgImage
        }
        if (id_category === 3) {
            return ClothingBgImage
        }
        if (id_category === 4) {
            return FurnitureBgImage
        }
        if (id_category === 5) {
            return PharmacyBgImage
        }
        return OtherBgImage
    }

    const getCategoryName = (id_category: number) => {
        if (id_category === 1) {
            return 'Grocery'
        }
        if (id_category === 2) {
            return 'Electronics'
        }
        if (id_category === 3) {
            return 'Clothing'
        }
        if (id_category === 4) {
            return 'Furniture'
        }
        if (id_category === 5) {
            return 'Pharmacy'
        }
        return 'Other'
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
            <View className='py-6 h-[29%] ' style={{
                backgroundColor: colors[id_category - 1],
            }}>

                <View className='flex-row  ml-3'>
                    <TouchableOpacity className='flex-1 ' onPress={() => {
                        navigation.goBack()
                    }}>
                        <Material name='chevron-left' size={35} color={COLORS.Rhino} />
                    </TouchableOpacity>
                    {/* <Text className='flex-1 text-center text-lg'
                        style={{ color: COLORS.Rhino, fontWeight: 'bold' }}
                    >Shopping List</Text> */}
                    <View className='absolute top-[200%] right-[-20] '>
                        <Image source={getImage(id_category)} style={{
                            height: screenHeight * 0.2,
                            width: screenHeight * 0.2,
                            transform: [{ rotate: '-20deg' }]

                            // position: 'absolute',
                            // right: 0,
                        }} />
                    </View>
                </View>
                <View className='ml-3 mt-10'>
                    <Text className='' style={{
                        fontSize: 40,
                        color: textColors[id_category - 1],
                        fontWeight: '600',
                    }}>{
                            getCategoryName(id_category)

                        }</Text>
                </View>
            </View>

            <View className='flex-1 mt-[-5%] rounded-tl-xl rounded-tr-xl r bg-white overflow-hidden z-100'>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                    initialRouteName='ShoppingListCategory'

                >
                    <Stack.Screen name="ShoppingListCategory" >{(props) => <ShoppingListCategoryScreen {...props as ShoppingListCategoryScreenProps} />}</Stack.Screen>
                    <Stack.Screen name="ShoppingListCategoryDetail" >{(props) => <ShoppingListCategoryDetailScreen {...props as ShoppingCategoryDetailScreenProps} />}</Stack.Screen>


                </Stack.Navigator>
            </View>
        </View>


    );
};

export default ShoppingListCategoryStack;
