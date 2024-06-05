import React, { useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import { HouseHoldScreenProps } from 'src/navigation/NavigationTypes'
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

const HouseHoldScreen: React.FC<HouseHoldScreenProps> = ({ navigation, route }) => {
    const { id_family } = route.params
    const refRBSheet = React.useRef<any>(null);
    const [householdCategory, setHouseholdCategory] = React.useState<HouseHoldCategoryInterface[]>(household_category_dat)
    const [householdItems, setHouseholdItems] = React.useState<HouseHoldItemInterface[]>(household_items)
    const [choosenCategoryIndex, setChoosenCategoryIndex] = React.useState<number>(0)
    const [choosenCategoryId, setChoosenCategoryId] = React.useState<number>(householdCategory[0].id_category)

    const showCategoryItems = () => {
        const categoryItems = householdItems.filter(item => item.id_category === choosenCategoryId);
        return <View className='flex-1  '>
            <View className='mt-2  flex-row flex-wrap  mx-2  ' style={{
                gap: 9
            }}>
                {
                    categoryItems.map((item, index) => (
                        <HouseHoldItem item={item} key={item.id_household_item} setHouseHoldItem={setHouseholdItems} index={index}
                            navigateToHouseHoldItemDetail={navigateToHouseHoldItemDetail}
                        />
                    ))
                }
            </View>
        </View>
    }

    const navigateToHouseHoldItemDetail = (item: HouseHoldItemInterface) => {
        navigation.navigate('HouseHoldItemDetail', {
            id_family,
            id_category: item.id_category,
            id_item: item.id_household_item
        })
    }

    return (
        <SafeAreaView className="flex-1 bg-[#F7F7F7]">
            <View className="flex-1 bg-[#F7F7F7]">
                <View className='w-full  flex-row justify-between items-center py-3 bg-white'>
                    <TouchableOpacity onPress={() => navigation.goBack()} className=' flex-row items-center'>
                        <Material name="chevron-left" size={30} style={{ color: COLORS.AuroMetalSaurus, fontWeight: "bold" }} />
                        {/* <Text className='text-lg font-semibold text-gray-600' style={{ color: COLORS.AliceBlue }}>Back</Text> */}
                    </TouchableOpacity>
                    <View className='mr-3'>
                        <TouchableOpacity onPress={() => {
                            refRBSheet.current?.open()

                        }} >
                            {/* <Material name="plus" size={24} style={{ color: COLORS.primary, fontWeight: "bold" }} className='font-semibold' /> */}
                            <Text className='text-lg font-semibold' style={{ color: COLORS.AuroMetalSaurus }}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <HouseHoldFilterBar householdCategory={householdCategory} choosenCategoryId={choosenCategoryId} choosenCategoryIndex={choosenCategoryIndex} setChoosenCategoryId={setChoosenCategoryId} setChoosenCategoryIndex={setChoosenCategoryIndex} />
                <View className='my-2'
                ></View>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        {showCategoryItems()}
                    </View>
                </ScrollView>
                <AddHouseHoldItemSheet refRBSheet={refRBSheet} setHouseHoldItem={setHouseholdItems} id_category={choosenCategoryId} id_family={id_family!} />
            </View>
        </SafeAreaView>
    )
}

export default HouseHoldScreen