import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GuidelineStackProps, GuildLineDetailScreenProps, GuildLineScreenProps, TodoListCategoryScreenProps, TodoListItemDetailScreenProps, TodoListScreenProps, TodoListStackProps } from '../NavigationTypes';

import React, { useEffect } from 'react';

import GuildLineScreen from 'src/screens/GuildLineScreen/GuildLineScreen';
import GuildLineDetailScreen from 'src/screens/GuildLineScreen/GuildLineDetailScreen';


const Stack = createNativeStackNavigator();

const GuidelineStack = ({ navigation, route }: GuidelineStackProps) => {


    const { id_family } = route.params.params!
    
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