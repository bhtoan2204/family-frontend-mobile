import React, { useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Image } from 'react-native'
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
import BillsIcon from 'src/assets/images/household_assets/bills.png';
import ReceiptImage from 'src/assets/images/household_assets/receipt.png';
import AddHouseHoldItemInfoSheet from './AddHouseHoldItemInfoSheet/AddHouseHoldItemInfoSheet';
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
const screenHeigh = Dimensions.get('screen').height

const HouseHoldItemDetailScreen: React.FC<HouseHoldItemDetailScreenProps> = ({ navigation, route }) => {
    const { id_family, id_category, id_item } = route.params
    // const ItemData = household_items.find(item => item.id_household_item === id_item)
    const addProductInfoSheetRef = useRef<any>(null)
    const [houseHoldItemDetail, setHouseHoldItemDetail] = React.useState<HouseHoldItemInterface | undefined>(household_items.find(item => item.id_household_item === id_item))
    const refRBSheet = React.useRef<any>(null);
    const [householdCategory, setHouseholdCategory] = React.useState<HouseHoldCategoryInterface[]>(household_category_dat)
    const [householdItems, setHouseholdItems] = React.useState<HouseHoldItemInterface[]>(household_items)
    const isImageValid = useImageValid({ imageUrl: houseHoldItemDetail?.item_imageurl || "" })



    return (
        <SafeAreaView className="flex-1 bg-[#FBF8F1]">
            <View className="flex-1 bg-[#F7F7F7]">
                <View className='w-full  flex-row justify-between items-center py-3 '>
                    <TouchableOpacity onPress={() => navigation.goBack()} className=' flex-row items-center'>
                        <Material name="chevron-left" size={30} style={{ color: COLORS.AuroMetalSaurus, fontWeight: "bold" }} />
                        {/* <Text className='text-lg font-semibold text-gray-600' style={{ color: COLORS.AliceBlue }}>Back</Text> */}
                    </TouchableOpacity>
                    <View className='mr-3'>
                        <TouchableOpacity onPress={() => {
                            refRBSheet.current?.open()

                        }} >
                            {/* <Material name="plus" size={24} style={{ color: COLORS.primary, fontWeight: "bold" }} className='font-semibold' /> */}
                            <Material name="dots-horizontal" size={30} style={{ color: COLORS.AuroMetalSaurus, fontWeight: "bold" }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className='px-3 mb-3'>
                        <Text style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: iOSGrayColors.systemGray6.defaultDark

                        }}>
                            {houseHoldItemDetail?.item_name}
                        </Text>
                    </View>
                    <View className='px-3 shadow-lg overflow-hidden rounded-lg ' style={{ width: '100%', height: Dimensions.get('screen').height * 0.3 }} >
                        {/* <ImageComponent imageUrl={houseHoldItemDetail?.item_imageurl || ""} style={{ width: '100%', height: Dimensions.get('screen').height * 0.3 }} defaultImage={FamilyImage} className='rounded-lg ' resizeMethod='resize' resizeMode='cover' /> */}
                        <>
                            <TouchableOpacity className='bg-white rounded-lg items-center justify-center' style={{ width: '100%', height: Dimensions.get('screen').height * 0.3 }} activeOpacity={0.6}>
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
                    <View className='px-3 mt-3 shadow-lg overflow-hidden rounded-lg ' style={{ width: '100%', height: 'auto' }} >
                        <View className='w-full h-auto bg-white p-3 rounded-lg'>
                            <View className='flex-row items-center'>
                                <Image source={InfoIcon} style={{ width: 20, height: 20 }} />
                                <Text style={{
                                    fontSize: 15,
                                    marginLeft: 5,
                                    fontWeight: 500,
                                    color: iOSGrayColors.systemGray6.defaultDark

                                }}>Enter product info</Text>
                            </View>
                            <View className='flex-row items-start my-3'>
                                <Image source={BoxImage} style={{ width: screenWidth * 0.2, height: screenWidth * 0.2 }} />
                                <View className='ml-3 flex-1 wrap' >
                                    <Text style={{
                                        fontSize: 15,
                                        marginLeft: 7,
                                        fontWeight: 400,
                                        color: iOSGrayColors.systemGray6.defaultDark

                                    }}>Enter brands and model. This allow us to find useful info, such as manual, helpful vids, etc...</Text>
                                </View>
                            </View>
                            <View className='gap-3 flex-row '>
                                <TouchableOpacity className='flex-1 bg-blue-100 py-3 items-center justify-center' style={{
                                    backgroundColor: iOSGrayColors.systemGray6.defaultLight
                                }}>
                                    <Text style={{
                                        color: iOSColors.systemBlue.defaultLight,
                                        fontWeight: 'bold'
                                    }}>Skip this</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className='flex-1 bg-blue-100 py-3 items-center justify-center' style={{
                                    backgroundColor: iOSColors.systemGreen.defaultLight
                                }} onPress={() => {
                                    addProductInfoSheetRef.current?.open()
                                }}>
                                    <Text style={{
                                        color: 'white',
                                        fontWeight: 'bold'
                                    }}>Add info</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
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
                <AddHouseHoldItemInfoSheet refRBSheet={addProductInfoSheetRef} />
            </View>
        </SafeAreaView>
    )
}

export default HouseHoldItemDetailScreen