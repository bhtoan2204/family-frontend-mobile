import { Dimensions, SafeAreaView, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CategoryDetailScreenProps, CategoryScreenProps, HouseHoldScreenProps, HouseHoldStackProps, ItemScreenProps, RoomDetailScreenProps, } from '../NavigationTypes';

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
const Stack = createNativeStackNavigator();

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HouseHoldStack = ({ navigation, route }: HouseHoldStackProps) => {
    const [choosenTab, setChoosenTab] = React.useState<number>(0)
    // console.log(route.params?.params?.id_family)

    const pickCategorySheetRef = React.useRef<BottomSheet>(null)
    const pickRoomSheetRef = React.useRef<BottomSheet>(null)
    const addCategorySheetRef = React.useRef<BottomSheet>(null)
    const addRoomSheetRef = React.useRef<BottomSheet>(null)
    const addItemSheetRef = React.useRef<BottomSheet>(null)



    // console.log("curr ", route)
    const currScreen = route.params?.screen
    const id_family = route.params?.params?.id_family
    const dispatch = useDispatch<AppDispatch>()
    const familyInfo = useSelector((state: RootState) => state.family).selectedFamily

    const rooms = useSelector((state: RootState) => state.room)
    const categories = useSelector((state: RootState) => state.category)
    const [pickedRoom, setPickedRoom] = React.useState<number>(-1)
    const [pickedCategory, setPickedCategory] = React.useState<number>(-1)
    const [loading, setLoading] = React.useState<boolean>(true)
    const [addItemType, setAddItemType] = React.useState<number>(0) // 0 for room + category, 1 category, 2 room
    useEffect(() => {
        const fetchAllHouseholdData = async () => {
            setLoading(true)
            const roomData = await HouseHoldService.getAllRoom(id_family!, 1, 100)
            dispatch(setRoom(roomData))
            const householdItemData = await HouseHoldService.getHouseHoldItems(
                id_family!,
                1, 100
            )
            const newHouseholdItems: HouseHoldItemInterface[] = householdItemData.map((item, index) => {
                const gradient = gradients_list[Math.floor(index % gradients_list.length)]
                return {
                    ...item,
                    item_image: gradient,
                }
            })
            dispatch(setHouseholdItems(newHouseholdItems))
            const data = await HouseHoldService.getAllHouseHoldCategory()
            dispatch(setCategories(data))
            setLoading(false)
        }
        console.log('fetching data...')
        fetchAllHouseholdData()
        // fetchRoom()
        // fetchHouseholdData()
        // fetchCategory()
        console.log('done fetching data...')
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

    if (loading) {
        return <View className='justify-center items-center flex-1'>
            <ActivityIndicator size="small" color={COLORS.AuroMetalSaurus} />
        </View>
    }

    return (
        <SafeAreaView className="flex-1 bg-[#F7F7F7]">
            <View className="flex-1 bg-[#F7F7F7]">
                {/* <View style={{ width: screenWidth, height: screenHeight * 0.25 }}>
                    <View className='w-full absolute z-10 flex-row justify-between items-center py-3'>
                        <TouchableOpacity onPress={() => navigation.goBack()} className=' flex-row items-center'>
                            <Material name="chevron-left" size={30} style={{ color: "white", fontWeight: "bold" }} />
                            
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
                                <Material name="dots-horizontal" size={24} style={{ color: 'white', fontWeight: "bold" }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Image
                        source={familyInfo!.avatar ? { uri: familyInfo!.avatar } : gradients_list[familyInfo!.id_family % gradients_list.length]}
                        style={{ width: screenWidth, height: screenHeight * 0.25 }}
                        resizeMethod='resize'
                        resizeMode='cover'
                    />

                </View> */}
                <HouseHoldStackHeader navigationBack={() => navigation.goBack()}
                    idFamily={id_family!}
                    imageUrl={familyInfo!.avatar || undefined}
                />

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

                        <Stack.Screen name="HouseHoldScreen"
                            options={{
                                animationTypeForReplace: 'pop',
                                gestureEnabled: false,

                            }}
                        >{(props: any) => <HouseHoldScreen {...props as HouseHoldScreenProps} addRoomRef={addRoomSheetRef}
                        />}</Stack.Screen>
                        <Stack.Screen name="ItemScreen"
                            options={{
                                animationTypeForReplace: 'pop',
                                gestureEnabled: false,

                            }}
                        >{(props: any) => <ItemScreen {...props as ItemScreenProps} addItemRef={addItemSheetRef} addRoomRef={addRoomSheetRef} />}</Stack.Screen>
                        <Stack.Screen name="CategoryScreen"
                            options={{
                                animationTypeForReplace: 'pop',
                                gestureEnabled: false,
                            }}

                        >{(props: any) => <CategoryScreen {...props as CategoryScreenProps}
                            addCategoryRef={addCategorySheetRef}
                        />}</Stack.Screen>


                        <Stack.Screen name="RoomDetail"
                            options={{
                                gestureEnabled: false,
                                animationTypeForReplace: 'pop',
                            }}
                        >{(props: any) => <RoomDetailScreen {...props as RoomDetailScreenProps}
                            setAddItemType={(type: number) => {
                                setAddItemType(type)
                            }}
                            setPickedRoom={(room: number) => {
                                setPickedRoom(room)
                            }}
                            addItemSheetRef={addItemSheetRef}
                        />}</Stack.Screen>
                        <Stack.Screen name="CategoryDetail"
                            options={{
                                gestureEnabled: false,
                                animationTypeForReplace: 'pop',
                            }}
                        >{(props: any) => <CategoryDetailScreen {...props as CategoryDetailScreenProps}
                            setAddItemType={(type: number) => {
                                setAddItemType(type)
                            }}
                            setPickedCategory={(category: number) => {
                                setPickedCategory(category)
                            }}
                            addItemSheetRef={addItemSheetRef}

                        />}</Stack.Screen>



                    </Stack.Navigator>


                </View>
            </View>



            <AddItemSheet
                bottomSheetRef={addItemSheetRef} id_family={id_family!}
                pickRoomSheetRef={pickRoomSheetRef}
                pickCategorySheetRef={pickCategorySheetRef}
                addItemType={addItemType}
                pickedRoom={pickedRoom}
                pickedCategory={pickedCategory}
                rooms={rooms}
                categories={categories}

            />
            <AddHouseHoldItemPickRoomSheet
                refRBSheet={pickRoomSheetRef}
                roomsData={rooms} room={pickedRoom} onSetRoom={(room: number) => {
                    setPickedRoom(room)
                }}
                addRoomSheetRef={addRoomSheetRef}
            />
            <AddRoomSheet bottomSheetRef={addRoomSheetRef} id_family={id_family!} />
            <AddHouseHoldItemPickCategorySheet
                refRBSheet={pickCategorySheetRef} category={pickedCategory} onSetCategory={(id: number) => {
                    setPickedCategory(id)
                }}
                categories={categories}
                addCategorySheetRef={addCategorySheetRef}
            />
            <AddCategorySheet bottomSheetRef={addCategorySheetRef} id_family={id_family!} />

        </SafeAreaView>

    );
};

export default HouseHoldStack;
