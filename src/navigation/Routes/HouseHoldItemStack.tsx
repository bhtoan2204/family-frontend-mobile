import { Dimensions, SafeAreaView, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateFamilyScreen from 'src/screens/CreateFamilyScreen';
import InviteNewMemberScreen from 'src/screens/InviteNewMemberScreen';
import ViewAllFamilyScreen from 'src/screens/ViewAllFamily';
import ViewFamilyScreen from 'src/screens/FamilyScreen';
import ViewAllMemberScreen from 'src/screens/AllMember';
import AddMemberScreen from 'src/screens/AddEditFamilyMemberScreen';
import { AddConsumableHouseHoldItemScreenProps, AddConsumableItemScreenProps, AddEditFamilyMemberScreenProps, AddEducationScreenProps, AddGuildLineScreenProps, AddHouseHoldItemDetailScreenProps, AddHouseHoldItemScreenProps, AddHouseHoldRoomScreenProps, AddShoppingListScreenProps, AddSubjectScreenProps, AllMemberScreenProps, CategoryScreenProps, CheckListDetailScreenProps, CheckListScreenProps, ContactScreenProps, CreateFamilyScreenProps, EditConsumableHouseHoldItemScreenProps, EditDescriptionHouseHoldItemScreenProps, EditDescriptionScreenProps, EditEducationScreenProps, EditExpenseHouseHoldItemScreenProps, EducationDetailScreenProps, EducationScreenProps, GuildLineDetailScreenProps, GuildLineScreenProps, HouseHoldItemDetailScreenProps, HouseHoldItemScreenProps, HouseHoldItemStackProps, HouseHoldScreenProps, HouseHoldStackProps, ItemScreenProps, NewsScreenProps, RoomDetailScreenProps, SharedGuildLineScreenProps, SubjectDetailScreenProps, UpdateGuildLineScreenProps, ViewAllFamilyScreenProps, ViewFamilyScreenProps } from '../NavigationTypes';
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
import { AppDispatch, RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setHouseholdItems } from 'src/redux/slices/HouseHoldSlice';
import HouseHoldService from 'src/services/apiclient/HouseHoldService';
import { clearRoom, setRoom } from 'src/redux/slices/RoomSlice';
import { HouseHoldItemInterface } from 'src/interface/household/household_item';
import { clearCategories, setCategories } from 'src/redux/slices/CategorySlice';
import RoomDetailScreen from 'src/screens/HouseHoldScreen/RoomDetailScreen';
import HouseHoldItemTab from 'src/components/user/household/household-item-tab';
import HouseHoldItemScreen from 'src/screens/HouseHoldScreen/HouseHoldItemScreen';
import { clearHouseholdItems, setHouseholdItemDetail, updateImage } from 'src/redux/slices/HouseHoldDetailSlice';
import AddConsumableHouseHoldItemScreen from 'src/screens/HouseHoldScreen/AddConsumableHouseHoldItem';
import EditHouseHoldDescriptionScreen from 'src/screens/HouseHoldScreen/EditHouseHoldDescriptionScreen';
import HouseHoldItemStackHeader from 'src/components/user/household/household-item-stack/household-item-stack-header';

import * as ImagePicker from 'expo-image-picker';
import PickImageSheet from 'src/components/user/household/household-item-stack/pick-image-sheet';
// import AddRoomSheet from 'src/components/user/household/add-room-sheet';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import AddRoomSheet from 'src/components/user/household/sheet/add-room-sheet';
import { setAddRoomRef } from 'src/redux/slices/HouseHoldRefSlice';


const Stack = createNativeStackNavigator();

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HouseHoldItemStack = ({ navigation, route }: HouseHoldItemStackProps) => {
    const [choosenTab, setChoosenTab] = React.useState<number>(0)
    // console.log(route.params?.params?.id_family)



    console.log("curr ", route)
    const currScreen = route.params?.screen
    const id_family = route.params?.params?.id_family
    const id_item = route.params?.params?.id_item
    const dispatch = useDispatch<AppDispatch>()
    const houseHoldItemInfo = useSelector((state: RootState) => state.householdItemDetail)
    const image = useSelector((state: RootState) => state.householdItems).find(item => item.id_household_item === id_item)?.item_image!
    const pickPhotoSheetRef = React.useRef<any>()
    useEffect(() => {
        const fetchHouseHoldItemDetail = async () => {
            const data = await HouseHoldService.getHouseHoldItemDetail(id_item!, id_family!)
            if (data) {
                // setHouseHoldItemData(data)
                console.log("data ne", data)
                dispatch(setHouseholdItemDetail(data))

            }
            // dispatch(setHouseholdItemDetail(defaultInfo))
        }
        fetchHouseHoldItemDetail()
        return () => {
            console.log("Clear household item detail")
            dispatch(clearHouseholdItems())
        }
    }, [])


    useEffect(() => {
        if (currScreen == 'HouseHoldItem') {
            setChoosenTab(0)
        } else if (currScreen == 'ReceiptInfo') {
            setChoosenTab(1)
        }
    }, [currScreen])

    if (!houseHoldItemInfo) {
        return <ActivityIndicator size="small" color="#0000ff" />
    }

    const handleTakePhoto = async () => {
        console.log("Take photo")
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status === 'granted') {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [3, 3],
                quality: 1,
            });

            if (!result.canceled) {
                console.log(result.assets[0].uri);
                await HouseHoldService.updateHouseHoldItem(
                    houseHoldItemInfo.id_household_item,
                    id_family!,
                    result.assets[0].uri,
                    houseHoldItemInfo.item_name,
                    houseHoldItemInfo.description)

                dispatch(updateImage(result.assets[0].uri))
                // setHouseHoldItemData({
                //     ...houseHoldItemData,
                //     item_imageurl: result.assets[0].uri
                // })

            }
            pickPhotoSheetRef.current?.close()
        } else {
            alert('Permission to access camera was denied');
        }
    }

    const handlePickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === 'granted') {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [3, 3],
                quality: 1,
            });

            if (!result.canceled) {
                await HouseHoldService.updateHouseHoldItem(
                    houseHoldItemInfo.id_household_item,
                    id_family!,
                    result.assets[0].uri,
                    houseHoldItemInfo.item_name,
                    houseHoldItemInfo.description)
                dispatch(updateImage(result.assets[0].uri))
                // setHouseHoldItemData({
                //     ...houseHoldItemData,
                //     item_imageurl: result.assets[0].uri
                // })


            }
            pickPhotoSheetRef.current?.close()
        }
        else {
            alert('Permission to access camera was denied');
        }
    }

    const handlePickEditImage = () => {
        pickPhotoSheetRef.current?.open()
    }

    return (
        <SafeAreaView className="flex-1 bg-[#F7F7F7]">
            <View className="flex-1 bg-[#F7F7F7]">
                <HouseHoldItemStackHeader data={houseHoldItemInfo} navigationBack={() => navigation.goBack()}
                    handleEditImage={handlePickEditImage}
                />
                <View className='flex-1 bg-[#f7f7f7] mt-[-3%]  rounded-tl-xl rounded-tr-xl overflow-hidden'>
                    {/* <View className='mt-[-3%] bg-transparent '>
                        <HouseHoldItemTab choosenTab={choosenTab}
                            setChoosenTab={(num) => {
                                // setChoosenTab(num)

                                // if (num == 0) {
                                //     // if (currScreen == 'HouseHoldScreen') {
                                //     //     return
                                //     // }
                                //     navigation.navigate('HouseHoldStack', {
                                //         screen: 'HouseHoldScreen',
                                //         params: { id_family: id_family },
                                //     });
                                // } else if (num == 1) {
                                //     navigation.navigate('HouseHoldStack', {
                                //         screen: 'ItemScreen',
                                //         params: { id_family: id_family },
                                //     });
                                // } else if (num == 2) {
                                //     navigation.navigate('HouseHoldStack', {
                                //         screen: 'CategoryScreen',
                                //         params: { id_family: id_family },
                                //     });
                                // }

                            }}
                        />
                    </View> */}

                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}>

                        <Stack.Screen name="HouseHoldItem" >{(props) => <HouseHoldItemScreen {...props as HouseHoldItemScreenProps} />}</Stack.Screen>
                        <Stack.Screen name="AddConsumableItem">{(props) => <AddConsumableHouseHoldItemScreen {...props as AddConsumableItemScreenProps} />}</Stack.Screen>
                        <Stack.Screen name="EditDescription">{(props) => <EditHouseHoldDescriptionScreen {...props as EditDescriptionScreenProps}  />}</Stack.Screen>




                    </Stack.Navigator>


                </View>
                <PickImageSheet bottomSheetRef={pickPhotoSheetRef} handleTakePhoto={handleTakePhoto} handlePickImage={handlePickImage} />
                {/* <AddRoomSheet bottomSheetRef={addRoomSheetRef} id_family={id_family!} /> */}
            </View>


        </SafeAreaView>

    );
};

export default HouseHoldItemStack;
