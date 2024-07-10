import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TodoListCategoryScreenProps, TodoListScreenProps, TodoListStackProps } from '../NavigationTypes';

import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/store';
import TodoListScreen from 'src/screens/TodoListScreen/TodoList/TodoListScreen';
import TodoListServices from 'src/services/apiclient/TodoListService';
import { setTodoListType } from 'src/redux/slices/TodoListSlice';
import TodoListCategoryScreen from 'src/screens/TodoListScreen/TodoListCategory/TodoListCategoryScreen';


const Stack = createNativeStackNavigator();

const TodoListStack = ({ navigation, route }: TodoListStackProps) => {

    const dispatch = useDispatch<AppDispatch>()

    const { id_family } = route.params.params!

    useEffect(() => {
        const fetchTodoListType = async () => {
            const response = await TodoListServices.getAllTodoListType()
            console.log('todo list types ', response)
            dispatch(setTodoListType(response))
        }
        fetchTodoListType()
    }, [])

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName='TodoList'

        >
            <Stack.Screen name="TodoList" >
                {(props: TodoListScreenProps) => <TodoListScreen {...props as TodoListScreenProps} />}
            </Stack.Screen>
            <Stack.Screen name="TodoListCategory" >
                {(props: TodoListCategoryScreenProps) => <TodoListCategoryScreen {...props as TodoListCategoryScreenProps} />}
            </Stack.Screen>



        </Stack.Navigator>

    );
};


export default TodoListStack;
