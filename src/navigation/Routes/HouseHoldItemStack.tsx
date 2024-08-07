import { Dimensions, SafeAreaView, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HouseHoldItemScreenProps, HouseHoldItemStackProps, } from '../NavigationTypes';

import React, { useEffect } from 'react';

import { AppDispatch, RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';

import HouseHoldService from 'src/services/apiclient/HouseHoldService';

import HouseHoldItemScreen from 'src/screens/HouseHoldScreen/HouseHoldItemScreen';
import { clearHouseholdItems, setHouseholdItemDetail, updateImage } from 'src/redux/slices/HouseHoldDetailSlice';
import AddConsumableHouseHoldItemScreen from 'src/screens/HouseHoldScreen/AddConsumableHouseHoldItem';
import EditHouseHoldDescriptionScreen from 'src/screens/HouseHoldScreen/EditHouseHoldDescriptionScreen';
import HouseHoldItemStackHeader from 'src/components/user/household/household-item-stack/household-item-stack-header';

import * as ImagePicker from 'expo-image-picker';
import PickImageSheet from 'src/components/user/household/household-item-stack/pick-image-sheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import AddEditConsumableSheet from 'src/components/user/household/household-item-stack/sheet/add-edit-consumable-sheet';
import UpdateExpiredDateItemSheet from 'src/components/user/household/household-item-stack/sheet/update-expired-date-sheet';
import AddEditDescriptionSheet from 'src/components/user/household/household-item-stack/sheet/add-edit-description-sheet';
import { format } from 'date-fns';
import EditTitleSheet from 'src/components/user/household/household-item-stack/sheet/edit-title-sheet';
import { useToast } from 'react-native-toast-notifications';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { deleteHouseholdItem } from 'src/redux/slices/HouseHoldSlice';


const Stack = createNativeStackNavigator();

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HouseHoldItemStack = ({ navigation, route }: HouseHoldItemStackProps) => {
    // const [choosenTab, setChoosenTab] = React.useState<number>(0)
    // console.log(route.params?.params?.id_family)

    const id_family = route.params?.params?.id_family
    const id_item = route.params?.params?.id_item
    const dispatch = useDispatch<AppDispatch>()
    const houseHoldItemInfo = useSelector((state: RootState) => state.householdItemDetail)
    const pickPhotoSheetRef = React.useRef<any>()
    const addEditConsumableItemSheetRef = React.useRef<BottomSheet>(null)
    const addEditDescriptionSheetRef = React.useRef<BottomSheet>(null)
    const updateExpiredDateSheet = React.useRef<BottomSheet>(null)
    const editTitleSheetRef = React.useRef<BottomSheet>(null)
    const [expired_date, setExpiredDate] = React.useState<string>(new Date().toISOString())
    const toast = useToast()
    useEffect(() => {
        const fetchHouseHoldItemDetail = async () => {
            const data = await HouseHoldService.getHouseHoldItemDetail(id_item!, id_family!)
            if (data) {
                // setHouseHoldItemData(data)
                console.log("data ne", data)
                // setExpiredDate(data.consumableItem?.expired_date || "")
                const expiredDate = data.consumableItem && data.consumableItem.expired_date ? new Date(data.consumableItem.expired_date).toISOString() : new Date().toISOString()
                const expiredDate2 = format(new Date("2022-12-31"), 'yyyy-MM-dd')
                console.log(expiredDate + "dcmm")
                console.log(expiredDate2 + "dcmm")
                setExpiredDate(expiredDate)
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

    const handleDeleteItem = React.useCallback(async () => {
        const res = await HouseHoldService.deleteItem(id_item!, id_family!)
        if (res == true) {
            navigation.goBack()
            dispatch(deleteHouseholdItem(id_item!))
            toast.show("Delete successfully", {
                type: "success",
                duration: 2000,
                icon: <Material name="check" size={24} color={"white"} />,
            });
        } else {
            toast.show("Delete failed", {
                type: "error",
                duration: 2000,
                icon: <Material name="close" size={24} color={"white"} />,
            });
        }
    }, [])

    return (
        <View className="flex-1 bg-[#F7F7F7]">
            <HouseHoldItemStackHeader data={houseHoldItemInfo} navigationBack={() => navigation.goBack()}
                handleEditImage={handlePickEditImage}
                handleDeleteItem={() => {
                    handleDeleteItem()
                }}
                handleEditTitle={() => {
                    editTitleSheetRef.current?.expand()
                }}
            />
            <View className='flex-1 bg-[#f7f7f7] mt-[-3%]  rounded-tl-xl rounded-tr-xl overflow-hidden'>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}>

                    <Stack.Screen name="HouseHoldItem" >{(props: any) => <HouseHoldItemScreen {...props as HouseHoldItemScreenProps}
                        addEditConsumableItemSheetRef={addEditConsumableItemSheetRef}
                        addEditDescriptionSheetRef={addEditDescriptionSheetRef}
                    />}</Stack.Screen>





                </Stack.Navigator>


            </View>
            <PickImageSheet bottomSheetRef={pickPhotoSheetRef} handleTakePhoto={handleTakePhoto} handlePickImage={handlePickImage} />
            {/* <AddRoomSheet bottomSheetRef={addRoomSheetRef} id_family={id_family!} /> */}
            <AddEditConsumableSheet bottomSheetRef={addEditConsumableItemSheetRef} id_family={id_family!} id_item={id_item!} updateExpiredDateSheet={updateExpiredDateSheet}
                consumableItem={houseHoldItemInfo.consumableItem}
                expired_date={expired_date}
            />
            <UpdateExpiredDateItemSheet bottomSheetRef={updateExpiredDateSheet} id_family={id_family!} id_item={id_item!} initialDate={expired_date} onSetDate={(date: string) => {
                setExpiredDate(date)
            }} />
            <AddEditDescriptionSheet bottomSheetRef={addEditDescriptionSheetRef} id_family={id_family!} id_item={id_item!} description={houseHoldItemInfo.description || ""} />
            <EditTitleSheet bottomSheetRef={editTitleSheetRef} id_family={id_family!} id_item={id_item!} title={houseHoldItemInfo.item_name || ""} />
        </View>

    );
};

export default HouseHoldItemStack;
