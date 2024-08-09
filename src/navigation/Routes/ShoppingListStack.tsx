import { Dimensions, SafeAreaView, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShoppingListCategoryScreenProps, ShoppingListDetailScreenProps, ShoppingListScreenProps, ShoppingListStackProps } from '../NavigationTypes';

import React, { useEffect } from 'react';

import ShoppingListScreen from 'src/screens/ShoppingListScreen/ShoppingList/ShoppingListScreen';
import ShoppingListCategoryScreen from 'src/screens/ShoppingListScreen/ShoppingListCategory/ShoppingListCategory';
import ShoppingListCategoryDetailScreen from 'src/screens/ShoppingListScreen/ShoppingListCategory/ShoppingListCategoryDetail';
import ShoppingListServices from 'src/services/apiclient/ShoppingListServices';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/store';
import { setLoading, setShoppingList, setShoppingListItemType, setShoppingListType } from 'src/redux/slices/ShoppingListSlice';


const Stack = createNativeStackNavigator();

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
            console.log('list type data', data)
        }
        const fetchItemType = async () => {
            const data = await ShoppingListServices.getShoppingItemType()
            dispatch(setShoppingListItemType(data))
            console.log('item type data', data)
        }
        const fetchDatas = async () => {
            dispatch(setLoading(true))
            await fetchShoppingList()
            await fetchShoppingListType()
            await fetchItemType()
            dispatch(setLoading(false))
        }
        fetchDatas()
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
