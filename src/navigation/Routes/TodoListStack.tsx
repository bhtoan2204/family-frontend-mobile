import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TodoListCategoryScreenProps, TodoListItemDetailScreenProps, TodoListScreenProps, TodoListStackProps } from '../NavigationTypes';

import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/store';
import TodoListScreen from 'src/screens/TodoListScreen/TodoList/TodoListScreen';
import TodoListServices from 'src/services/apiclient/TodoListService';
import { setTodoList, setTodoListType } from 'src/redux/slices/TodoListSlice';
import TodoListCategoryScreen from 'src/screens/TodoListScreen/TodoListCategory/TodoListCategoryScreen';
import TodoListCategoryDetailScreen from 'src/screens/TodoListScreen/TodoListCategory/TodoListCategoryDetailScreen';


const Stack = createNativeStackNavigator();

const TodoListStack = ({ navigation, route }: TodoListStackProps) => {

    const dispatch = useDispatch<AppDispatch>()

    const { id_family } = route.params.params!
    const [loading, setLoading] = React.useState(false)


    useEffect(() => {
        const fetchTodoListType = async () => {
            const response = await TodoListServices.getAllTodoListType()
            console.log('todo list types ', response)
            dispatch(setTodoListType(response))
        }
        const fetchTodoListItem = async () => {
            const response = await TodoListServices.getAllItemOfFamily(id_family!, 1, 100)
            dispatch(setTodoList(response))
            console.log('todo list items ', response)
        }
        const fetchAllDatas = async () => {
            setLoading(true)
            await fetchTodoListType()
            await fetchTodoListItem()
            setLoading(false)
        }
        fetchAllDatas()
    }, [])

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName='TodoList'

        >
            <Stack.Screen name="TodoList" >
                {(props) => <TodoListScreen {...props as TodoListScreenProps} />}
            </Stack.Screen>
            <Stack.Screen name="TodoListCategory" >
                {(props) => <TodoListCategoryScreen {...props as TodoListCategoryScreenProps} />}
            </Stack.Screen>
            <Stack.Screen name="TodoListItemDetail" >
                {(props) => <TodoListCategoryDetailScreen {...props as TodoListItemDetailScreenProps} />}
            </Stack.Screen>



        </Stack.Navigator>

    );
};


export default TodoListStack;

// {
//     "data": [
//       {
//         "id_checklist": 82,
//         "id_checklist_type": 1,
//         "id_family": 96,
//         "task_name": "Name of checklist",
//         "description": "Description of checklist",
//         "is_completed": false,
//         "due_date": "2024-06-06T00:00:00.000Z",
//         "is_notified_3_days_before": false,
//         "is_notified_1_day_before": false,
//         "is_notified_on_due_date": true,
//         "created_at": "2024-07-09T03:45:40.342Z",
//         "updated_at": "2024-07-10T11:05:26.353Z",
//         "checklistType": {
//           "id_checklist_type": 1,
//           "name_en": "Daily Tasks",
//           "name_vn": "Việc hằng ngày",
//           "icon_url": "https://lh3.googleusercontent.com/drive-viewer/AKGpihawGKcMy_7MCqKxATsVgZYndH__jY2eLPaZySWzfpq8I0XdEc4ZvPLvG5WZCekOTZH01EiRn5VB3un_aslz7WH2_DwptN10e6M=s2560"
//         }
//       },
//       {
//         "id_checklist": 81,
//         "id_checklist_type": 1,
//         "id_family": 96,
//         "task_name": "Ăn cơm",
//         "description": "",
//         "is_completed": false,
//         "due_date": "2024-07-08T17:00:00.000Z",
//         "is_notified_3_days_before": false,
//         "is_notified_1_day_before": false,
//         "is_notified_on_due_date": true,
//         "created_at": "2024-07-09T03:45:38.419Z",
//         "updated_at": "2024-07-09T03:54:07.103Z",
//         "checklistType": {
//           "id_checklist_type": 1,
//           "name_en": "Daily Tasks",
//           "name_vn": "Việc hằng ngày",
//           "icon_url": "https://lh3.googleusercontent.com/drive-viewer/AKGpihawGKcMy_7MCqKxATsVgZYndH__jY2eLPaZySWzfpq8I0XdEc4ZvPLvG5WZCekOTZH01EiRn5VB3un_aslz7WH2_DwptN10e6M=s2560"
//         }
//       }
//     ],
//     "total": 2,
//     "message": "Get checklist successfully"
//   }