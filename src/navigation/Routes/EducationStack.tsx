import { Dimensions, SafeAreaView, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CategoryDetailScreenProps, CategoryScreenProps, EducationScreenProps, EducationStackProps, HouseHoldScreenProps, HouseHoldStackProps, ItemScreenProps, ProgressScreenProps, RoomDetailScreenProps, SubjectScreenProps, } from '../NavigationTypes';


import React, { useEffect } from 'react';

import { AppDispatch, RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';

import BottomSheet from '@gorhom/bottom-sheet';

import { COLORS } from 'src/constants';
import EducationScreen from 'src/screens/Education/EducationScreen/EducationScreen';
import EducationServices from 'src/services/apiclient/EducationService';
import { Education } from 'src/interface/education/education';
import { clearEducation, setEducation } from 'src/redux/slices/EducationSlice';
import ProgressScreen from 'src/screens/Education/ProgressScreen/ProgressScreen';
import SubjectScreen from 'src/screens/Education/SubjectScreen/SubjectScreen';
const Stack = createNativeStackNavigator();


const EducationStack = ({ navigation, route }: EducationStackProps) => {

    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,

                }}
                initialRouteName='EducationScreen'
            >

                <Stack.Screen name="EducationScreen"
                >{(props: any) => <EducationScreen {...props as EducationScreenProps}
                />}</Stack.Screen>
                <Stack.Screen name="ProgressScreen"
                >{(props: any) => <ProgressScreen {...props as ProgressScreenProps}
                />}</Stack.Screen>
                <Stack.Screen name="SubjectScreen"
                >{(props: any) => <SubjectScreen {...props as SubjectScreenProps}
                />}</Stack.Screen>




            </Stack.Navigator>


        </>

    );
};

export default EducationStack;
