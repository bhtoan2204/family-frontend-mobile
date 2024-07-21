import { Dimensions, SafeAreaView, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CategoryDetailScreenProps, CategoryScreenProps, EducationScreenProps, EducationStackProps, HouseHoldScreenProps, HouseHoldStackProps, ItemScreenProps, ProgressScreenProps, RoomDetailScreenProps, SubjectScreenProps, } from '../NavigationTypes';

import HouseHoldScreen from 'src/screens/HouseHoldScreen/HouseHoldScreen';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { gradients_list } from 'src/assets/images/gradients';
import React, { useEffect } from 'react';
import HouseHoldTab from 'src/components/user/household/household-tab';

import ItemScreen from 'src/screens/HouseHoldScreen/ItemScreen';
import CategoryScreen from 'src/screens/HouseHoldScreen/CategoryScreen';
import { AppDispatch, RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearHouseholdItems, setHouseholdItems } from 'src/redux/slices/HouseHoldSlice';
import HouseHoldService from 'src/services/apiclient/HouseHoldService';
import { clearRoom, setRoom } from 'src/redux/slices/RoomSlice';
import { HouseHoldItemInterface } from 'src/interface/household/household_item';
import { clearCategories, setCategories } from 'src/redux/slices/CategorySlice';
import RoomDetailScreen from 'src/screens/HouseHoldScreen/RoomDetailScreen';
import BottomSheet from '@gorhom/bottom-sheet';
import AddRoomSheet from 'src/components/user/household/sheet/add-room-sheet';
import AddItemSheet from 'src/components/user/household/sheet/add-item-sheet';
import CategoryDetailScreen from 'src/screens/HouseHoldScreen/CategoryDetailScreen';
import AddCategorySheet from 'src/components/user/household/sheet/add-category-sheet';
import AddHouseHoldItemPickRoomSheet from 'src/components/user/household/add-household-item-pickroomsheet';
import AddHouseHoldItemPickCategorySheet from 'src/components/user/household/add-household-item-pickcategorysheet';
import { COLORS } from 'src/constants';
import HouseHoldStackHeader from 'src/components/user/household/household-stack/household-stack-header';
import EducationScreen from 'src/screens/Education/EducationScreen/EducationScreen';
import EducationServices from 'src/services/apiclient/EducationService';
import { Education } from 'src/interface/education/education';
import { clearEducation, setEducation } from 'src/redux/slices/EducationSlice';
import ProgressScreen from 'src/screens/Education/ProgressScreen/ProgressScreen';
import SubjectScreen from 'src/screens/Education/SubjectScreen/SubjectScreen';
const Stack = createNativeStackNavigator();

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const EducationStack = ({ navigation, route }: EducationStackProps) => {

    const pickCategorySheetRef = React.useRef<BottomSheet>(null)
    const pickRoomSheetRef = React.useRef<BottomSheet>(null)
    const addCategorySheetRef = React.useRef<BottomSheet>(null)
    const addRoomSheetRef = React.useRef<BottomSheet>(null)
    const addItemSheetRef = React.useRef<BottomSheet>(null)
    const id_family = route.params?.params?.id_family
    const dispatch = useDispatch<AppDispatch>()
    const familyInfo = useSelector((state: RootState) => state.family).selectedFamily

    const rooms = useSelector((state: RootState) => state.room)
    const categories = useSelector((state: RootState) => state.category)

    const [loading, setLoading] = React.useState<boolean>(false)

    useEffect(() => {
        const handleFetchEducation = async () => {
            setLoading(true)
            const educationsData = await EducationServices.getAllEducation(id_family!);
            const edu = educationsData.map((education: any) => {
                return {
                    ...education,
                    subjects: education.subjects.map((subject: any) => {
                        return {
                            ...subject,
                            midterm_score: {
                                component_name: 'Midterm',
                                score: subject.midterm_score,
                            },
                            final_score: {
                                component_name: 'Final',
                                score: subject.final_score,
                            },
                        };
                    }),
                };
            }) as Education[];
            setLoading(false)
            dispatch(setEducation(edu))
        }
        handleFetchEducation()

        return () => {
            dispatch(clearEducation())
        }
    }, [])

    if (loading) {
        return <View className='justify-center items-center flex-1'>
            <ActivityIndicator size="small" color={COLORS.AuroMetalSaurus} />
        </View>
    }

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
