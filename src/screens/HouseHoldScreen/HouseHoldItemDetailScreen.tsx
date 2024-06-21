import React, { useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Image, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform, Keyboard, InputAccessoryView } from 'react-native'
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


const household_items = [
    {
        "id_household_item": 4,
        "id_family": 96,
        "item_name": "Máy giặt",
        "item_description": "máy giặt toshiba nhà tao",
        "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713451417048",
        "id_category": 1
    },
    {
        "id_household_item": 5,
        "id_family": 96,
        "item_name": "Hủ muối tiêu",
        "item_description": "ai mà ăn muối tiêu chanh này sẽ bị ám suốt đời",
        "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713451468168",
        "id_category": 1
    },

    {
        "id_household_item": 10,
        "id_family": 96,
        "item_name": "tủ lạnh cùi",
        "item_description": "cái tủ lạnh cùi vãi",
        "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713454576319",
        "id_category": 1
    },
    {
        "id_household_item": 11,
        "id_family": 96,
        "item_name": "eulaaaaa",
        "item_description": "đây là bé eula dễ thương",
        "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713502246879",
        "id_category": 1
    },
    {
        "id_household_item": 13,
        "id_family": 96,
        "item_name": "Adudu",
        "item_description": "lalala",
        "item_imageurl": null,
        "id_category": 2
    }
]

const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height


const defaultInfo: HouseHoldItemDetailInterface = {
    id_household_item: 11,
    id_family: 96,
    item_name: "eulaaaaa",
    item_description: "đây là bé eula dễ thương",
    item_imageurl: "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713502246879",
    description: "Blank description",
    category_name: "Kitchen",
    quantity: 0,
    threshold: 0,
    condition: "",
    expired_date: null

}
const HouseHoldItemDetailScreen: React.FC<HouseHoldItemDetailScreenProps> = ({ navigation, route }) => {
    const { id_family, id_category, id_item } = route.params
    const itemNameRef = useRef<any>(null)
    const pickPhotoSheetRef = useRef<any>(null)
    const addProductInfoSheetRef = useRef<any>(null)
    // const [houseHoldItemDetail, setHouseHoldItemDetail] = React.useState<HouseHoldItemInterface | undefined>(household_items.find(item => item.id_household_item === id_item))
    const [houseHoldItemData, setHouseHoldItemData] = React.useState<HouseHoldItemDetailInterface>(defaultInfo)
    const refRBSheet = React.useRef<any>(null);
    // const [householdCategory, setHouseholdCategory] = React.useState<HouseHoldCategoryInterface[]>(household_category_dat)
    const [householdItems, setHouseholdItems] = React.useState<HouseHoldItemInterface[]>(household_items)
    const isImageValid = useImageValid({ imageUrl: houseHoldItemData?.item_imageurl || "" })
    const [isEditing, setIsEditing] = React.useState<boolean>(false)
    const [quantity, setQuantity] = React.useState<number>(houseHoldItemData.quantity || 0)
    const [isSaving, setIsSaving] = React.useState<boolean>(false)
    const [itemName, setItemName] = React.useState<string>(houseHoldItemData.item_name || "")

    const timeoutCallback = (callback: () => void) => {
        setIsSaving(true)
        setTimeout(() => {
            setIsSaving(false)
            callback()
            // setHouseHoldItemData({
            //     ...houseHoldItemData,
            //     quantity: quantity
            // })
        }, 1000)
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
                setHouseHoldItemData({
                    ...houseHoldItemData,
                    item_imageurl: result.assets[0].uri
                })

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
                setHouseHoldItemData({
                    ...houseHoldItemData,
                    item_imageurl: result.assets[0].uri
                })


            }
            pickPhotoSheetRef.current?.close()
        }
        else {
            alert('Permission to access camera was denied');
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-[#FBF8F1]">
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
                        timeoutCallback(() => {
                            setItemName(houseHoldItemData.item_name || "")
                            Keyboard.dismiss();
                        })

                    }}
                    onCancelEdit={() => {
                        setItemName(houseHoldItemData.item_name || "")
                        Keyboard.dismiss();
                    }}
                />
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'height' : 'height'} className='flex-1'>
                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"}>
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
                                        <ImageComponent imageUrl={houseHoldItemData?.item_imageurl || ""} style={{ width: '100%', height: Dimensions.get('screen').height * 0.3 }} defaultImage={FamilyImage} className='rounded-lg ' resizeMethod='resize' resizeMode='cover' />
                                    </TouchableOpacity>
                                </> : <>
                                    <>
                                        <TouchableOpacity className='bg-white rounded-lg items-center justify-center' style={{ width: '100%', height: Dimensions.get('screen').height * 0.3 }} activeOpacity={0.6} onPress={() => {
                                            pickPhotoSheetRef.current?.open()
                                        }}>
                                            <View className='my-2'>
                                                <Material name="camera-iris" size={30} style={{ color: iOSGrayColors.systemGray2.defaultLight, fontWeight: "bold" }} />
                                            </View>
                                            <Text style={{
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                color: iOSGrayColors.systemGray2.defaultLight
                                            }}>Add Image</Text>
                                        </TouchableOpacity>
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


                        <InfoBox title='Quantity' iconImage={QuantityIcon}>
                            <View className='w-full  flex-row items-center justify-between '>
                                <Text style={{
                                    fontSize: 15,
                                    marginLeft: 5,
                                    color: iOSGrayColors.systemGray6.defaultDark,
                                    fontWeight: 500
                                }}>Adjust quantity</Text>
                                <View className='flex-row items-center w-[30%] justify-between' style={{
                                    borderColor: iOSGrayColors.systemGray6.defaultLight,
                                    borderWidth: 1,
                                    marginRight: 5,
                                }}>

                                    <TouchableOpacity className='px-2 justify-center items-center py-2' activeOpacity={0.8} disabled={quantity - 1 < 0} style={{
                                        backgroundColor: iOSGrayColors.systemGray6.defaultLight,
                                        borderTopRightRadius: 5,
                                        borderBottomRightRadius: 5
                                    }} onPress={() => {
                                        setQuantity((prev) => prev - 1)
                                    }}>
                                        <Material name="minus" size={17} style={{ color: iOSColors.systemBlue.defaultLight, fontWeight: "bold" }} />
                                    </TouchableOpacity>
                                    <View className='px-2 justify-center items-center py-2 overflow-hidden w-12'>
                                        <Text className='overflow-hidden' numberOfLines={1}>{quantity}</Text>
                                    </View>
                                    <TouchableOpacity className='px-2 justify-center items-center py-2' activeOpacity={0.8} style={{
                                        backgroundColor: iOSGrayColors.systemGray6.defaultLight,
                                        borderTopLeftRadius: 5,
                                        borderBottomLeftRadius: 5
                                    }} onPress={() => {
                                        setQuantity((prev) => prev + 1)
                                    }} >
                                        <Material name="plus" size={17} style={{ color: iOSColors.systemBlue.defaultLight, fontWeight: "bold" }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {
                                quantity != houseHoldItemData.quantity && <Animatable.View animation={"fadeIn"} className='gap-3 flex-row mt-3'>
                                    <TouchableOpacity className='flex-1 bg-blue-100 py-3 items-center justify-center' style={{
                                        backgroundColor: iOSGrayColors.systemGray6.defaultLight
                                    }} onPress={() => {
                                        setQuantity(houseHoldItemData.quantity || 0)
                                    }}>
                                        <Text style={{
                                            color: iOSColors.systemRed.defaultLight,
                                            fontWeight: 'bold'
                                        }}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity className='flex-1 bg-blue-100 py-3 items-center justify-center' style={{
                                        backgroundColor: iOSGrayColors.systemGray6.defaultLight
                                    }} activeOpacity={0.8} onPress={() => {
                                        timeoutCallback(() => {
                                            setHouseHoldItemData({
                                                ...houseHoldItemData,
                                                quantity: quantity
                                            })
                                        })
                                    }}>
                                        <Text style={{
                                            color: iOSColors.systemBlue.defaultLight,
                                            fontWeight: 'bold'
                                        }}>Save</Text>
                                    </TouchableOpacity>
                                </Animatable.View>
                            }
                        </InfoBox>
                        <InfoBox title='Brand' iconImage={BrandIcon}>
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
                        </InfoBox>
                        <InfoBox title='Description' iconImage={DescriptionIcon}>
                            <View className='w-full '>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: 500,
                                    color: iOSGrayColors.systemGray4.accessibleDark

                                }}>Description: {houseHoldItemData.item_description} </Text>
                                {/* <Text
                                style={{
                                    fontSize: 15,
                                    marginTop: 5,
                                    fontWeight: 500,
                                    color: iOSGrayColors.systemGray4.defaultLight

                                }}
                            >#0101</Text> */}
                            </View>
                        </InfoBox>
                        <InfoBox title='Expenses' iconImage={ExpenseIcon} onPress={() => {
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
                        </InfoBox>

                        <AddInfoBox
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

                        />
                        <View className='px-3 mt-3'>
                            <Text style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                color: iOSGrayColors.systemGray6.defaultDark

                            }}>
                                Receipt
                            </Text>
                        </View>
                        <View className='px-3 my-3 shadow-lg overflow-hidden rounded-lg ' style={{ width: '100%', height: 'auto' }} >
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

                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <AddHouseHoldItemInfoSheet refRBSheet={addProductInfoSheetRef} />
                <HouseHoldItemDetailImagePickerSheet sheetRef={pickPhotoSheetRef} onPickCamera={handleTakePhoto} onPickGallery={handlePickImage} />
            </View>
        </SafeAreaView>
    )
}

export default HouseHoldItemDetailScreen