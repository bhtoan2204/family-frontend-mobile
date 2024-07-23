import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GuidelineStackProps, GuildLineDetailScreenProps, GuildLineScreenProps, TodoListCategoryScreenProps, TodoListItemDetailScreenProps, TodoListScreenProps, TodoListStackProps } from '../NavigationTypes';

import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/store';
import TodoListScreen from 'src/screens/TodoListScreen/TodoList/TodoListScreen';
import TodoListServices from 'src/services/apiclient/TodoListService';
import { setTodoList, setTodoListType } from 'src/redux/slices/TodoListSlice';
import TodoListCategoryScreen from 'src/screens/TodoListScreen/TodoListCategory/TodoListCategoryScreen';
import TodoListCategoryDetailScreen from 'src/screens/TodoListScreen/TodoListCategory/TodoListCategoryDetailScreen';
import GuildLineScreen from 'src/screens/GuildLineScreen/GuildLineScreen';
import GuildLineDetailScreen from 'src/screens/GuildLineScreen/GuildLineDetailScreen';


const Stack = createNativeStackNavigator();

const GuidelineStack = ({ navigation, route }: GuidelineStackProps) => {

    // const dispatch = useDispatch<AppDispatch>()

    const { id_family } = route.params.params!
    // const [loading, setLoading] = React.useState(false)


    // useEffect(() => {
    //     const fetchTodoListType = async () => {
    //         const response = await TodoListServices.getAllTodoListType()
    //         console.log('todo list types ', response)
    //         dispatch(setTodoListType(response))
    //     }
    //     const fetchTodoListItem = async () => {
    //         const response = await TodoListServices.getAllItemOfFamily(id_family!, 1, 100)
    //         dispatch(setTodoList(response))
    //         console.log('todo list items ', response)
    //     }
    //     const fetchAllDatas = async () => {
    //         setLoading(true)
    //         await fetchTodoListType()
    //         await fetchTodoListItem()
    //         setLoading(false)
    //     }
    //     fetchAllDatas()
    // }, [])

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName='GuildLine'

        >
            <Stack.Screen name="GuildLine" >
                {(props) => <GuildLineScreen {...props as GuildLineScreenProps} />}
            </Stack.Screen>
            <Stack.Screen name="GuildLineDetail" >
                {(props) => <GuildLineDetailScreen {...props as GuildLineDetailScreenProps} />}
            </Stack.Screen>




        </Stack.Navigator>

    );
};


export default GuidelineStack;