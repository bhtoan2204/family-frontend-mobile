import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { HouseHoldCategoryScreenProps, HouseHoldScreenProps } from 'src/navigation/NavigationTypes'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';

const household_category_dat = [
    {
        "id_category": 1,
        "category_name": "Kitchen"
    },
    {
        "id_category": 2,
        "category_name": "Living Room"
    },
    {
        "id_category": 3,
        "category_name": "Bedroom"
    },
    {
        "id_category": 4,
        "category_name": "Bathroom"
    },
    {
        "id_category": 5,
        "category_name": "Home Office"
    },
    {
        "id_category": 6,
        "category_name": "Garage/Utility"
    },
    {
        "id_category": 7,
        "category_name": "Laundry Room"
    },
    {
        "id_category": 8,
        "category_name": "Outdoor and Garden"
    }
]

const household_items = [
    {
        "id_household_item": 4,
        "id_family": 96,
        "item_name": "Máy giặt",
        "item_description": "máy giặt toshiba nhà tao",
        "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713451417048",
        "id_category": 1,
        "description": "máy giặt toshiba nhà tao"
    },
    {
        "id_household_item": 5,
        "id_family": 96,
        "item_name": "Hủ muối tiêu",
        "item_description": "ai mà ăn muối tiêu chanh này sẽ bị ám suốt đời",
        "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713451468168",
        "id_category": 1,
        "description": "ai mà ăn muối tiêu chanh này sẽ bị ám suốt đời"
    },
    {
        "id_household_item": 6,
        "id_family": 96,
        "item_name": "tủ lạnh cùi",
        "item_description": "cái tủ lạnh cùi vãi",
        "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713454442646",
        "id_category": 1,
        "description": "cái tủ lạnh cùi vãi"
    },
    {
        "id_household_item": 7,
        "id_family": 96,
        "item_name": "tủ lạnh cùi",
        "item_description": "cái tủ lạnh cùi vãi",
        "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713454456027",
        "id_category": 1,
        "description": "cái tủ lạnh cùi vãi"
    },
    {
        "id_household_item": 8,
        "id_family": 96,
        "item_name": "tủ lạnh cùi",
        "item_description": "cái tủ lạnh cùi vãi",
        "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713454463179",
        "id_category": 1,
        "description": "cái tủ lạnh cùi vãi"
    },
    {
        "id_household_item": 9,
        "id_family": 96,
        "item_name": "tủ lạnh cùi",
        "item_description": "cái tủ lạnh cùi vãi",
        "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713454518267",
        "id_category": 1,
        "description": "cái tủ lạnh cùi vãi"
    },
    {
        "id_household_item": 10,
        "id_family": 96,
        "item_name": "tủ lạnh cùi",
        "item_description": "cái tủ lạnh cùi vãi",
        "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713454576319",
        "id_category": 1,
        "description": "cái tủ lạnh cùi vãi"
    },
    {
        "id_household_item": 11,
        "id_family": 96,
        "item_name": "eulaaaaa",
        "item_description": "đây là bé eula dễ thương",
        "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713502246879",
        "id_category": 1,
        "description": "cái tủ lạnh cùi vãi"
    }
]

const HouseHoldScreen: React.FC<HouseHoldScreenProps> = ({ navigation, route }) => {
    const { id_family } = route.params
    const [householdCategory, setHouseholdCategory] = React.useState<HouseHoldCategoryInterface[]>(household_category_dat)
    const [householdItems, setHouseholdItems] = React.useState<HouseHoldItemInterface[]>(household_items)
    const [choosenCategory, setChoosenCategory] = React.useState<number | null>(0)

    const showCategoryItems = (id_category: number) => {
        return <View>

        </View>
    }

    return (
        <View className="flex-1 bg-[#F7F7F7]">
            <View className='w-full  flex-row justify-between items-center py-3 bg-white'>
                <TouchableOpacity onPress={() => navigation.goBack()} className=' flex-row items-center'>
                    <Material name="chevron-left" size={30} style={{ color: COLORS.primary, fontWeight: "bold" }} />
                    <Text className='text-lg font-semibold text-gray-600' style={{ color: COLORS.primary }}>Back</Text>
                </TouchableOpacity>
                <View className='mr-3'>
                    <TouchableOpacity onPress={() => {


                    }} >
                        {/* <Material name="plus" size={24} style={{ color: COLORS.primary, fontWeight: "bold" }} className='font-semibold' /> */}
                        <Text className='text-lg font-semibold' style={{ color: COLORS.primary }}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View className='flex-col justify-center items-center pt-4 ' >

                </View>
            </ScrollView>

        </View>
    )
}

export default HouseHoldScreen