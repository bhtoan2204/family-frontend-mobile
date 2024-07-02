import { Dimensions, SafeAreaView, Text, TouchableOpacity, View, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateFamilyScreen from 'src/screens/CreateFamilyScreen';
import InviteNewMemberScreen from 'src/screens/InviteNewMemberScreen';
import ViewAllFamilyScreen from 'src/screens/ViewAllFamily';
import ViewFamilyScreen from 'src/screens/FamilyScreen';
import ViewAllMemberScreen from 'src/screens/AllMember';
import AddMemberScreen from 'src/screens/AddEditFamilyMemberScreen';
import { AddConsumableHouseHoldItemScreenProps, AddEditFamilyMemberScreenProps, AddEducationScreenProps, AddGuildLineScreenProps, AddHouseHoldItemDetailScreenProps, AddHouseHoldItemScreenProps, AddHouseHoldRoomScreenProps, AddShoppingListScreenProps, AddSubjectScreenProps, AllMemberScreenProps, CategoryDetailScreenProps, CategoryScreenProps, CheckListDetailScreenProps, CheckListScreenProps, ContactScreenProps, CreateFamilyScreenProps, EditConsumableHouseHoldItemScreenProps, EditDescriptionHouseHoldItemScreenProps, EditEducationScreenProps, EditExpenseHouseHoldItemScreenProps, EducationDetailScreenProps, EducationScreenProps, GuildLineDetailScreenProps, GuildLineScreenProps, HouseHoldItemDetailScreenProps, HouseHoldItemScreenProps, HouseHoldScreenProps, HouseHoldStackProps, ItemScreenProps, NewsScreenProps, RoomDetailScreenProps, SharedGuildLineScreenProps, SubjectDetailScreenProps, UpdateGuildLineScreenProps, ViewAllFamilyScreenProps, ViewFamilyScreenProps } from '../NavigationTypes';
import ContactListScreen from 'src/screens/ContactList/ContactList';
import GuildLineScreen from 'src/screens/GuildLineScreen/GuildLineScreen';
import GuildLineDetailScreen from 'src/screens/GuildLineScreen/GuildLineDetailScreen';
import EducationScreen from 'src/screens/EducationScreen/EducationScreen';
import EducationDetailScreen from 'src/screens/EducationScreen/EducationDetailScreen';
import SubjectDetailScreen from 'src/screens/EducationScreen/SubjectDetailScreen';
import HouseHoldScreen from 'src/screens/HouseHoldScreen/HouseHoldScreen';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { gradients_list } from 'src/assets/images/gradients';
import React, { useEffect } from 'react';
import HouseHoldTab from 'src/components/user/household/household-tab';

import ItemScreen from 'src/screens/HouseHoldScreen/ItemScreen';
import CategoryScreen from 'src/screens/HouseHoldScreen/CategoryScreen';
import LocalStorage from 'src/store/localstorage';
import { AppDispatch } from 'src/redux/store';
import { useDispatch } from 'react-redux';
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
const Stack = createNativeStackNavigator();

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HouseHoldStack = ({ navigation, route }: HouseHoldStackProps) => {
    const [choosenTab, setChoosenTab] = React.useState<number>(0)
    // console.log(route.params?.params?.id_family)

    const addRoomSheetRef = React.useRef<BottomSheet>(null)
    const addItemSheetRef = React.useRef<BottomSheet>(null)
    const addCategorySheetRef = React.useRef<BottomSheet>(null)

    console.log("curr ", route)
    const currScreen = route.params?.screen
    const id_family = route.params?.params?.id_family
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const fetchRoom = async () => {
            const data = await HouseHoldService.getAllRoom(id_family!, 1, 100)
            dispatch(setRoom(data))
        }
        const fetchHouseholdData = async () => {
            const data = await HouseHoldService.getHouseHoldItems(
                id_family!,
                1, 100
            )
            const newHouseholdItems: HouseHoldItemInterface[] = data.map((item, index) => {
                const gradient = gradients_list[Math.floor(index % gradients_list.length)]
                return {
                    ...item,
                    item_image: gradient,
                }
            })
            console.log(newHouseholdItems)
            dispatch(setHouseholdItems(newHouseholdItems))
        }
        const fetchCategory = async () => {
            const data = await HouseHoldService.getAllHouseHoldCategory()
            dispatch(setCategories(data))
            console.log(data)
        }
        fetchRoom()
        fetchHouseholdData()
        fetchCategory()

        return () => {
            console.log("HouseHoldScreen unmounting clearing store...")
            dispatch(clearHouseholdItems())
            dispatch(clearRoom())
            dispatch(clearCategories())
        }
    }, [])

    useEffect(() => {
        if (currScreen == 'HouseHoldScreen') {
            setChoosenTab(0)
        } else if (currScreen == 'ItemScreen') {
            setChoosenTab(1)
        } else if (currScreen == 'CategoryScreen') {
            setChoosenTab(2)
        }
    }, [currScreen])



    return (
        <SafeAreaView className="flex-1 bg-[#F7F7F7]">
            <View className="flex-1 bg-[#F7F7F7]">
                <View style={{ width: screenWidth, height: screenHeight * 0.25 }}>
                    <View className='w-full absolute z-10 flex-row justify-between items-center py-3'>
                        <TouchableOpacity onPress={() => navigation.goBack()} className=' flex-row items-center'>
                            <Material name="chevron-left" size={30} style={{ color: "white", fontWeight: "bold" }} />
                            {/* <Text className='text-lg font-semibold text-gray-600' style={{ color: COLORS.AliceBlue }}>Back</Text> */}
                        </TouchableOpacity>

                        <View >
                            <Text className='text-lg font-semibold text-white' >HouseHold</Text>
                        </View>
                        <View className='mr-1'>
                            <TouchableOpacity onPress={() => {
                                // refRBSheet.current?.open()
                                // navigation.navigate('AddHouseHoldItem', {
                                //   id_family
                                // })

                            }} >
                                <Material name="plus" size={24} style={{ color: 'white', fontWeight: "bold" }} />
                                {/* <Text className='text-lg font-semibold text-white' >Add</Text> */}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Image
                        source={gradients_list[0]}
                        style={{ width: screenWidth, height: screenHeight * 0.25 }}
                        resizeMethod='resize'
                        resizeMode='cover'
                    />

                </View>

                <View className='flex-1 bg-[#f7f7f7] mt-[-3%]  rounded-tl-xl rounded-tr-xl '>
                    <View className='mt-[-3%] bg-transparent '>
                        <HouseHoldTab choosenTab={choosenTab} setChoosenTab={(num) => {
                            // setChoosenTab(num)

                            if (num == 0) {
                                // if (currScreen == 'HouseHoldScreen') {
                                //     return
                                // }
                                navigation.navigate('HouseHoldStack', {
                                    screen: 'HouseHoldScreen',
                                    params: { id_family: id_family },
                                });
                            } else if (num == 1) {
                                navigation.navigate('HouseHoldStack', {
                                    screen: 'ItemScreen',
                                    params: { id_family: id_family },
                                });
                            } else if (num == 2) {
                                navigation.navigate('HouseHoldStack', {
                                    screen: 'CategoryScreen',
                                    params: { id_family: id_family },
                                });
                            }

                        }} />
                    </View>

                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}>

                        <Stack.Screen name="HouseHoldScreen">{(props) => <HouseHoldScreen {...props as HouseHoldScreenProps} addRoomRef={addRoomSheetRef} />}</Stack.Screen>
                        <Stack.Screen name="ItemScreen"

                        >{(props) => <ItemScreen {...props as ItemScreenProps} addItemRef={addItemSheetRef} addRoomRef={addRoomSheetRef} />}</Stack.Screen>
                        <Stack.Screen name="CategoryScreen"
                            options={{
                                animation: 'slide_from_right',
                                animationTypeForReplace: 'pop',
                            }}

                        >{(props) => <CategoryScreen {...props as CategoryScreenProps}
                            addCategoryRef={addCategorySheetRef}
                        />}</Stack.Screen>


                        <Stack.Screen name="RoomDetail"

                        >{(props) => <RoomDetailScreen {...props as RoomDetailScreenProps} />}</Stack.Screen>
                        <Stack.Screen name="CategoryDetail"

                        >{(props) => <CategoryDetailScreen {...props as CategoryDetailScreenProps} />}</Stack.Screen>



                    </Stack.Navigator>


                </View>
            </View>
            <AddItemSheet bottomSheetRef={addItemSheetRef} id_family={id_family!} addRoomSheetRef={addRoomSheetRef} />
            <AddRoomSheet bottomSheetRef={addRoomSheetRef} id_family={id_family!} />
            <AddCategorySheet bottomSheetRef={addCategorySheetRef} id_family={id_family!} />

        </SafeAreaView>

    );
};

export default HouseHoldStack;
