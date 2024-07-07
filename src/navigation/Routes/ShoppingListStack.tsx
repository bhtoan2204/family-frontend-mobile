import { Dimensions, SafeAreaView, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateFamilyScreen from 'src/screens/CreateFamilyScreen';
import InviteNewMemberScreen from 'src/screens/InviteNewMemberScreen';
import ViewAllFamilyScreen from 'src/screens/ViewAllFamily';
import ViewFamilyScreen from 'src/screens/FamilyScreen';
import ViewAllMemberScreen from 'src/screens/AllMember';
import AddMemberScreen from 'src/screens/AddEditFamilyMemberScreen';
import { AddConsumableHouseHoldItemScreenProps, AddConsumableItemScreenProps, AddEditFamilyMemberScreenProps, AddEducationScreenProps, AddGuildLineScreenProps, AddHouseHoldItemDetailScreenProps, AddHouseHoldItemScreenProps, AddHouseHoldRoomScreenProps, AddShoppingListScreenProps, AddSubjectScreenProps, AllMemberScreenProps, CategoryScreenProps, CheckListDetailScreenProps, CheckListScreenProps, ContactScreenProps, CreateFamilyScreenProps, EditConsumableHouseHoldItemScreenProps, EditDescriptionHouseHoldItemScreenProps, EditDescriptionScreenProps, EditEducationScreenProps, EditExpenseHouseHoldItemScreenProps, EducationDetailScreenProps, EducationScreenProps, GuildLineDetailScreenProps, GuildLineScreenProps, HouseHoldItemDetailScreenProps, HouseHoldItemScreenProps, HouseHoldItemStackProps, HouseHoldScreenProps, HouseHoldStackProps, ItemScreenProps, NewsScreenProps, RoomDetailScreenProps, SharedGuildLineScreenProps, ShoppingListCategoryScreenProps, ShoppingListDetailScreenProps, ShoppingListScreenProps, ShoppingListStackProps, SubjectDetailScreenProps, UpdateGuildLineScreenProps, ViewAllFamilyScreenProps, ViewFamilyScreenProps } from '../NavigationTypes';

import React, { useEffect } from 'react';

import ShoppingListScreen from 'src/screens/ShoppingListScreen/ShoppingList/ShoppingListScreen';
import ShoppingListCategoryScreen from 'src/screens/ShoppingListScreen/ShoppingListCategory/ShoppingListCategory';
import ShoppingListCategoryDetailScreen from 'src/screens/ShoppingListScreen/ShoppingListCategory/ShoppingListCategoryDetail';
import ShoppingListServices from 'src/services/apiclient/ShoppingListServices';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/store';
import { setShoppingList, setShoppingListItemType, setShoppingListType } from 'src/redux/slices/ShoppingListSlice';


const Stack = createNativeStackNavigator();

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// const ShoppingListStack = ({ navigation, route }: ShoppingListStackProps) => {
//     const { id_family } = route.params.params!
//     // console.log(route.params)
//     const handleNavigateShoppingListCategory = (id_category: number) => {
//         navigation.navigate('ShoppingListCategoryStack', {
//             screen: 'ShoppingListCategory',
//             params: {
//                 id_category: id_category,
//                 id_family: id_family
//             }
//         });
//     }
//     return (
//         <Stack.Navigator
//             screenOptions={{
//                 headerShown: false,
//             }}
//             initialRouteName='ShoppingList'

//         >
//             <Stack.Screen name="ShoppingList" >{(props) => <ShoppingListScreen
//                 {...props as ShoppingListScreenProps}
//                 handleNavigateShoppingListCategory={handleNavigateShoppingListCategory}
//             />}
//             </Stack.Screen>


//         </Stack.Navigator>

//     );
// };
const ShoppingListStack = ({ navigation, route }: ShoppingListStackProps) => {

    const dispatch = useDispatch<AppDispatch>()

    const { id_family } = route.params.params!
    useEffect(() => {
        const fetchShoppingList = async () => {
            // const data = await ShoppingListServices.getShoppingListByFamily(id_family!)
            const data = await ShoppingListServices.getShoppingDetail(id_family!)
            dispatch(setShoppingList(data))
            // console.log('list data', data)
        }
        const fetchShoppingListType = async () => {
            const data = await ShoppingListServices.getShoppingListType()
            dispatch(setShoppingListType(data))
            // console.log('list type data', data)
        }
        const fetchItemType = async () => {
            const data = await ShoppingListServices.getShoppingItemType()
            dispatch(setShoppingListItemType(data))
            // console.log('item type data', data)
        }
        fetchShoppingList()
        fetchShoppingListType()
        fetchItemType()
        return () => {
            dispatch(setShoppingList([]))
            dispatch(setShoppingListType([]))
            dispatch(setShoppingListItemType([]))
        }
    }, [])

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName='ShoppingList'

        >
            <Stack.Screen name="ShoppingList" >{(props) => <ShoppingListScreen {...props as ShoppingListScreenProps} />}</Stack.Screen>
            <Stack.Screen name="ShoppingListCategory" >{(props) => <ShoppingListCategoryScreen {...props as ShoppingListCategoryScreenProps} />}</Stack.Screen>
            <Stack.Screen name="ShoppingListDetail" >{(props) => <ShoppingListCategoryDetailScreen {...props as ShoppingListDetailScreenProps} />}</Stack.Screen>


        </Stack.Navigator>

    );
};


export default ShoppingListStack;
