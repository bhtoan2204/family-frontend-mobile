import React, { useCallback, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Image, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform, Keyboard, InputAccessoryView, ImageBackground } from 'react-native'
import { HouseHoldItemDetailScreenProps, HouseHoldItemScreenProps, HouseHoldScreenProps } from 'src/navigation/NavigationTypes'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';
import ImageComponent from 'src/components/Image/Image';
import FamilyImage from 'src/assets/images/household.png';
import AddHouseHoldItemSheet from './AddHouseHoldItemSheet/AddHouseHoldItemSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import HouseHoldItem from './HouseHoldItem/HouseHoldItem';
import { household_category_dat } from './const/data';
import HouseHoldFilterBar from 'src/components/user/household/household-filter-bar';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
import useImageValid from 'src/hooks/useImageValid';

import BoxImage from 'src/assets/images/household_assets/box.png';
import InfoIcon from 'src/assets/images/household_assets/info.png';
import InfoIcon2 from 'src/assets/images/household_assets/info_2.png';
import BillsIcon from 'src/assets/images/household_assets/bills.png';
import ReceiptImage from 'src/assets/images/household_assets/receipt.png';
import AddHouseHoldItemInfoSheet from './AddHouseHoldItemInfoSheet/AddHouseHoldItemInfoSheet';
import AddInfoBox from 'src/components/user/household/add-info-box';
import InfoBox from 'src/components/user/household/info-box';
import QuantityIcon from 'src/assets/images/household_assets/quantity.png';
import BrandIcon from 'src/assets/images/household_assets/brand.png';
import ExpenseIcon from 'src/assets/images/household_assets/expense.png';
import DescriptionIcon from 'src/assets/images/household_assets/description.png';

import * as Animatable from 'react-native-animatable';
import HouseHoldItemDetailHeader from 'src/components/user/household/household-item-detail-header';
import HouseHoldItemDetailImagePickerSheet from 'src/components/user/household/household-item-detail-image-picker-sheet';
import * as ImagePicker from 'expo-image-picker';
import { HouseHoldItemInterface } from 'src/interface/household/household_item';
import { HouseHoldItemDetailInterface } from 'src/interface/household/household_item_detail';
import HouseHoldService from 'src/services/apiclient/HouseHoldService';
import { AppDispatch, RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearHouseholdItems, setHouseholdItemDetail, updateTitle, updateComsumableItem, updateImage } from 'src/redux/slices/HouseHoldDetailSlice';
import { BlurView } from 'expo-blur';



const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height

const defaultInfo: HouseHoldItemDetailInterface = {
    "id_household_item": 6,
    "id_family": 96,
    "item_name": "tủ lạnh cùi",
    "description": null,
    "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713502246879",
    "id_category": 1,
    "id_room": 5,
    "category": {
        "id_household_item_category": 1,
        "category_name": "Kitchen"
    },
    "room": {
        "id_room": 5,
        "id_family": 96,
        "room_name": "Phòng ngủ",
        "created_at": "2024-06-17T17:50:44.483Z",
        "updated_at": "2024-06-17T17:50:44.483Z"
    },
    "durableItem": {
        "id_household_item": 6,
        "condition": "new"
    },
    "consumableItem": {
        "id_household_item": 6,
        "quantity": 5,
        "threshold": 5,
        "expired_date": "2022-12-31"
    }
}
const HouseHoldItemDetailScreen: React.FC<HouseHoldItemDetailScreenProps> = ({ navigation, route }) => {
    const { id_family, id_category, id_item } = route.params
    const itemNameRef = useRef<any>(null)
    const pickPhotoSheetRef = useRef<any>(null)
    const addProductInfoSheetRef = useRef<any>(null)

    const dispatch = useDispatch<AppDispatch>()
    const houseHoldItemData = useSelector((state: RootState) => state.householdItemDetail)
    const image = useSelector((state: RootState) => state.householdItems).find(item => item.id_household_item === id_item)?.item_image!
    const isImageValid = useImageValid({ imageUrl: houseHoldItemData?.item_imageurl || "" })
    const [isEditing, setIsEditing] = React.useState<boolean>(false)
    const quantity =
        houseHoldItemData.consumableItem
            ? houseHoldItemData.consumableItem.quantity ?
                houseHoldItemData.consumableItem.quantity
                : 0
            : 0

    const threshold =
        houseHoldItemData.consumableItem
            ? houseHoldItemData.consumableItem.threshold ?
                houseHoldItemData.consumableItem.threshold
                : 0
            : 0

    const expired_date = houseHoldItemData.consumableItem
        ? houseHoldItemData.consumableItem.expired_date
            ? houseHoldItemData.consumableItem.expired_date
            : null
        : null

    const [isSaving, setIsSaving] = React.useState<boolean>(false)
    const [itemName, setItemName] = React.useState<string>("")

    useEffect(() => {
        const fetchHouseHoldItemDetail = async () => {
            const data = await HouseHoldService.getHouseHoldItemDetail(id_item, id_family!)
            if (data) {
                // setHouseHoldItemData(data)
                console.log("data ne", data)
                dispatch(setHouseholdItemDetail(data))
                if (data.item_name = "") {
                    setItemName("Input item name here")
                } else {
                    setItemName(data.item_name)
                }
            }
            // dispatch(setHouseholdItemDetail(defaultInfo))
        }
        fetchHouseHoldItemDetail()
        return () => {
            console.log("Clear household item detail")
            dispatch(clearHouseholdItems())
            console.log(houseHoldItemData)
        }
    }, [])

    const timeoutCallback = async (callback: () => Promise<void>) => {
        setIsSaving(true)
        await callback()
        setIsSaving(false)
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
                await timeoutCallback(async () => {
                    await HouseHoldService.updateHouseHoldItem(
                        id_item,
                        id_family!,
                        result.assets[0].uri,
                        houseHoldItemData.item_name,
                        houseHoldItemData.description)
                })

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
                await timeoutCallback(async () => {
                    await HouseHoldService.updateHouseHoldItem(
                        id_item,
                        id_family!,
                        result.assets[0].uri,
                        houseHoldItemData.item_name,
                        houseHoldItemData.description)
                })
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

    if (houseHoldItemData.id_household_item === -1 || houseHoldItemData.id_family === -1) {
        return (
            <View className='flex-1 items-center justify-center'>
                <ActivityIndicator size='small' color={COLORS.AuroMetalSaurus} />
            </View>
        )
    }

    const handleUpdateItemName = async () => {
        const response = await HouseHoldService.updateHouseHoldItem(
            id_item,
            id_family!,
            houseHoldItemData.item_imageurl,
            itemName,
            houseHoldItemData.description)
        if (response) {
            console.log('Update item name success')
            dispatch(updateTitle(itemName))
        } else {
            console.log('Update item name failed')
        }

    }

    const buildConsumableItem = () => {
        if (houseHoldItemData.consumableItem) {
            return <InfoBox title='Consumable items' iconImage={QuantityIcon} onPress={() => {
                navigation.navigate('EditConsumableHouseHoldItem', {
                    id_family: id_family,
                    id_item: id_item,
                    id_category: id_category,
                    quantity: houseHoldItemData.consumableItem ? houseHoldItemData.consumableItem.quantity : 0,
                    threshhold: houseHoldItemData.consumableItem ? houseHoldItemData.consumableItem.threshold : 0,
                    expired_date: houseHoldItemData.consumableItem ? houseHoldItemData.consumableItem.expired_date : new Date().toDateString()
                })
            }}>
                <View className='w-full  flex-row items-center '>
                    <Text style={{
                        fontSize: 15,
                        marginLeft: 5,
                        color: iOSGrayColors.systemGray6.defaultDark,
                    }}>Quantity:
                    </Text>
                    <Text className='ml-3'>{quantity == 0 ? "Not set" : quantity}</Text>
                </View>
                <View className='w-full mt-3 flex-row items-center '>
                    <Text style={{
                        fontSize: 15,
                        marginLeft: 5,
                        color: iOSGrayColors.systemGray6.defaultDark,
                    }}>ThreshHold</Text>
                    <Text className='ml-3 '>{threshold == 0 ? "Not set" : threshold}</Text>

                </View>
                <View className='w-full mt-3 flex-row items-center '>
                    <Text style={{
                        fontSize: 15,
                        marginLeft: 5,
                        color: iOSGrayColors.systemGray6.defaultDark,
                    }}>Expired date</Text>
                    <Text className='overflow-hidden ml-3' numberOfLines={1}>
                        {expired_date == null
                            ? "Not set"
                            : new Date(expired_date!).toLocaleDateString()}
                    </Text>

                </View>
            </InfoBox>
        } else {
            return <AddInfoBox
                title='Update consumable items'
                iconImage={InfoIcon}
                boxImage={BoxImage}
                description='
                    Enter quantity, threshold and expired date. This allow us to notify you when you are running out of this item.
                '
                button1Text='Skip '
                button2Text='Add '
                button1Callback={() => { }}
                button2Callback={() => {
                    navigation.navigate('AddConsumableHouseHoldItem', {
                        id_family,
                        id_category,
                        id_item
                    })
                }}

            />
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-[#FBF8F1]">
            {
                houseHoldItemData.id_household_item !== -1 && houseHoldItemData.id_family !== -1 && <>
                    {
                        isSaving && <View className='h-full w-full absolute justify-center items-center z-10' >
                            <View className='p-4 opacity-[0.65] rounded-lg justify-center items-center' style={{
                                backgroundColor: iOSGrayColors.systemGray6.defaultDark,
                                width: screenWidth * 0.3,
                                height: screenWidth * 0.3,
                            }}>

                                <ActivityIndicator size='large' color={COLORS.AuroMetalSaurus} />
                                <Text className='text-white font-medium mt-3 text-base'>Saving</Text>
                            </View>
                        </View>
                    }
                    <View className="flex-1 bg-[#F7F7F7]">
                        <HouseHoldItemDetailHeader navigationBack={() => navigation.goBack()}
                            isEditing={isEditing}
                            onSave={() => {
                                timeoutCallback(async () => {
                                    // dispatch(updateTitle(itemName))
                                    await handleUpdateItemName()
                                    Keyboard.dismiss();
                                })

                            }}
                            onCancelEdit={() => {
                                dispatch(updateTitle(houseHoldItemData.item_name || ""))
                                Keyboard.dismiss();
                            }}
                        />
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'height' : 'height'} className='flex-1'>
                            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"}
                                automaticallyAdjustKeyboardInsets={true}
                            >
                                <View className='px-3 mb-3' removeClippedSubviews={true}>
                                    <TextInput value={itemName} onChange={(e) => {
                                        setItemName(e.nativeEvent.text)
                                    }} contextMenuHidden={true} selectTextOnFocus={true} ref={itemNameRef} style={{
                                        fontSize: 25,
                                        fontWeight: 'bold',
                                        color: iOSGrayColors.systemGray6.defaultDark

                                    }} onFocus={() => {
                                        setIsEditing(true)
                                    }}
                                        onBlur={() => {
                                            setIsEditing(false)
                                        }}
                                    />
                                    {/* {itemName} */}
                                    {/* </TextInput> */}
                                </View>
                                <View className='px-3 shadow-lg overflow-hidden rounded-lg ' style={{ width: '100%', height: Dimensions.get('screen').height * 0.3 }} >
                                    {
                                        isImageValid ? <>
                                            <TouchableOpacity onPress={() => {
                                                pickPhotoSheetRef.current?.open()
                                            }}>
                                                {/* <ImageComponent imageUrl={houseHoldItemData?.item_imageurl || ""} style={{ width: '100%', height: Dimensions.get('screen').height * 0.3 }} defaultImage={FamilyImage} className='rounded-lg ' resizeMethod='resize' resizeMode='cover' /> */}
                                                <Image source={{ uri: houseHoldItemData?.item_imageurl || "" }} style={{ width: '100%', height: Dimensions.get('screen').height * 0.3 }} className='rounded-lg ' resizeMethod='resize' resizeMode='cover' />
                                            </TouchableOpacity>
                                        </> : <>
                                            <>
                                                <ImageBackground source={image} style={{ width: '100%', height: Dimensions.get('screen').height * 0.3 }} className='rounded-lg ' resizeMethod='resize' resizeMode='cover'>
                                                    <TouchableOpacity className=' rounded-lg items-center justify-center' style={{ width: '100%', height: Dimensions.get('screen').height * 0.3 }} activeOpacity={0.6} onPress={() => {
                                                        pickPhotoSheetRef.current?.open()
                                                    }}>

                                                        <BlurView intensity={35} tint={'dark'} className="items-center justify-center w-full h-full">
                                                            <View className='my-2'>
                                                                <Material name="camera-iris" size={30} style={{ color: "white", fontWeight: "bold" }} />
                                                            </View>
                                                            <Text style={{
                                                                fontSize: 20,
                                                                fontWeight: 'bold',
                                                                color: 'white'
                                                            }}>Add Image</Text>
                                                        </BlurView>
                                                    </TouchableOpacity>
                                                </ImageBackground>

                                            </>

                                        </>
                                    }
                                </View>
                                <View className='px-3 mt-3'>
                                    <Text style={{
                                        fontSize: 25,
                                        fontWeight: 'bold',
                                        color: iOSGrayColors.systemGray6.defaultDark

                                    }}>
                                        Info
                                    </Text>
                                </View>

                                {
                                    buildConsumableItem()
                                }


                                {/* <InfoBox title='Brand' iconImage={BrandIcon}>
                                    <View className='w-full '>
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: 500,
                                            color: iOSGrayColors.systemGray6.defaultDark

                                        }}>Softly</Text>
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                marginTop: 5,
                                                fontWeight: 500,
                                                color: iOSGrayColors.systemGray4.defaultLight
                                            }}
                                        >#0101</Text>
                                    </View>
                                </InfoBox> */}
                                <InfoBox title='Description' iconImage={DescriptionIcon} onPress={() => {
                                    navigation.navigate('EditDescriptionHouseHoldItem', {
                                        description: houseHoldItemData.description || "",
                                        id_category: id_category,
                                        id_family: id_family,
                                        id_item: id_item
                                    })
                                }}>
                                    <View className='w-full '>
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: 500,
                                            color: iOSGrayColors.systemGray4.accessibleDark
                                        }}>{
                                                houseHoldItemData.description != null && houseHoldItemData.description != "" ? "Description:" + houseHoldItemData.description : "Add a description"
                                            }</Text>
                                    </View>
                                </InfoBox>

                                {/* <InfoBox title='Expenses' iconImage={ExpenseIcon} onPress={() => {
                            navigation.navigate("EditExpenseHouseHoldItem", {
                                id_family,
                                id_category,
                                id_item
                            })
                        }}>
                            <View className='flex-row items-start '>
                                <Image source={BillsIcon} style={{ width: screenWidth * 0.2, height: screenWidth * 0.2 }} />
                                <View className='flex-1 flex-row '>
                                    <View className='ml-3 flex-1' >
                                        <Text style={{
                                            fontSize: 15,
                                            marginLeft: 5,
                                            fontWeight: 'bold',
                                            color: iOSGrayColors.systemGray6.defaultDark

                                        }}>BHX</Text>
                                        <Text style={{
                                            fontSize: 15,
                                            marginLeft: 5,
                                            marginTop: 5,
                                            // fontWeight: 'bold',
                                            color: iOSGrayColors.systemGray6.defaultDark

                                        }}>{new Date().toLocaleDateString()}</Text>
                                    </View>
                                    <View className='flex-1 flex-row wrap justify-end'>
                                        <Text style={{
                                            fontSize: 15,
                                            marginLeft: 5,
                                            marginTop: 5,
                                            // fontWeight: 'bold',
                                            color: iOSGrayColors.systemGray6.defaultDark

                                        }} numberOfLines={1}>
                                            500.000
                                        </Text>
                                        <Text style={{
                                            fontSize: 15,
                                            marginLeft: 5,
                                            marginTop: 5,
                                            // fontWeight: 'bold',
                                            color: iOSGrayColors.systemGray6.defaultDark

                                        }}>VND</Text>
                                    </View>
                                </View>
                            </View>
                        </InfoBox> */}
                                {/* <AddInfoBox
                                    title='Give us more product info'
                                    iconImage={InfoIcon}
                                    boxImage={BoxImage}
                                    description='Enter brands and model. This allow us to find useful info, such as manual, helpful vids, etc...'
                                    button1Text='Skip this'
                                    button2Text='Add info'
                                    button1Callback={() => { }}
                                    button2Callback={() => {
                                        navigation.navigate('AddHouseHoldItemDetail', {
                                            id_family,
                                            id_category,
                                            id_item
                                        })
                                    }}

                                /> */}
                                <View className='px-3 mt-3'>
                                    <Text style={{
                                        fontSize: 25,
                                        fontWeight: 'bold',
                                        color: iOSGrayColors.systemGray6.defaultDark

                                    }}>
                                        Receipt
                                    </Text>
                                </View>
                                <AddInfoBox
                                    title='Enter receipt for this item'
                                    iconImage={InfoIcon}
                                    boxImage={BillsIcon}
                                    description='Add receipt for this item, u can scan it!'
                                    button1Text='Skip this'
                                    button2Text='Add info'
                                    button1Callback={() => { }}
                                    button2Callback={() => {

                                    }}

                                />
                                {/* <View className='px-3 my-3 shadow-lg overflow-hidden rounded-lg ' style={{ width: '100%', height: 'auto' }} >
                                    <View className='w-full h-auto bg-white p-3 rounded-lg'>
                                        <View className='flex-row items-center'>
                                            <Image source={InfoIcon} style={{ width: 20, height: 20 }} />
                                            <Text style={{
                                                fontSize: 15,
                                                marginLeft: 7,
                                                fontWeight: 500,
                                                color: iOSGrayColors.systemGray6.defaultDark

                                            }}>Enter receipt for this item </Text>
                                        </View>
                                        <View className='flex-row items-start my-3'>
                                            <Image source={BillsIcon} style={{ width: screenWidth * 0.2, height: screenWidth * 0.2 }} />
                                            <View className='ml-3 flex-1 wrap' >
                                                <Text style={{
                                                    fontSize: 15,
                                                    marginLeft: 5,
                                                    fontWeight: 400,
                                                    color: iOSGrayColors.systemGray6.defaultDark

                                                }}>Add receipt for this item, u can scan it!</Text>
                                            </View>
                                        </View>
                                        <View className='gap-3 flex-row '>
                                            <View className='flex-1 bg-blue-100 py-3 items-center justify-center' style={{
                                                backgroundColor: iOSGrayColors.systemGray6.defaultLight
                                            }}>
                                                <Text style={{
                                                    color: iOSColors.systemBlue.defaultLight,
                                                    fontWeight: 'bold'
                                                }}>Skip this</Text>
                                            </View>
                                            <View className='flex-1 bg-blue-100 py-3 items-center justify-center' style={{
                                                backgroundColor: iOSColors.systemGreen.defaultLight
                                            }}>
                                                <Text style={{
                                                    color: 'white',
                                                    fontWeight: 'bold'
                                                }}>Add receipt</Text>
                                            </View>
                                        </View>
                                    </View>

                                </View> */}
                                <View className='py-5'>

                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>
                        <AddHouseHoldItemInfoSheet refRBSheet={addProductInfoSheetRef} />
                        <HouseHoldItemDetailImagePickerSheet sheetRef={pickPhotoSheetRef} onPickCamera={handleTakePhoto} onPickGallery={handlePickImage} />
                    </View>

                </>
            }
        </SafeAreaView>
    )
}

export default HouseHoldItemDetailScreen