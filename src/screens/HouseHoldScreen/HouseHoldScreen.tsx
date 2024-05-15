import React, { useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { HouseHoldCategoryScreenProps, HouseHoldScreenProps } from 'src/navigation/NavigationTypes'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';
import ImageComponent from 'src/components/Image/Image';
import FamilyImage from 'src/assets/images/household.png';
import AddHouseHoldItemSheet from './AddHouseHoldItemSheet/AddHouseHoldItemSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import HouseHoldItem from './HouseHoldItem/HouseHoldItem';
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
        "id_household_item": 6,
        "id_family": 96,
        "item_name": "tủ lạnh cùi",
        "item_description": "cái tủ lạnh cùi vãi",
        "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713454442646",
        "id_category": 1
    },
    {
        "id_household_item": 7,
        "id_family": 96,
        "item_name": "tủ lạnh cùi",
        "item_description": "cái tủ lạnh cùi vãi",
        "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713454456027",
        "id_category": 1
    },
    {
        "id_household_item": 8,
        "id_family": 96,
        "item_name": "tủ lạnh cùi",
        "item_description": "cái tủ lạnh cùi vãi",
        "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713454463179",
        "id_category": 1
    },
    {
        "id_household_item": 9,
        "id_family": 96,
        "item_name": "tủ lạnh cùi",
        "item_description": "cái tủ lạnh cùi vãi",
        "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713454518267",
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
    const categoryRefScroll = useRef<any>(null);
    const showCategoryItems = () => {
        const categoryItems = householdItems.filter(item => item.id_category === choosenCategoryId);
        return <View className='mt-2'>
            {
                categoryItems.map((item, index) => (
                    <HouseHoldItem item={item} key={item.id_household_item} setHouseHoldItem={setHouseholdItems} index={index} />
                ))
            }
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
                        refRBSheet.current?.open()

                    }} >
                        {/* <Material name="plus" size={24} style={{ color: COLORS.primary, fontWeight: "bold" }} className='font-semibold' /> */}
                        <Text className='text-lg font-semibold' style={{ color: COLORS.primary }}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={categoryRefScroll}>
                    {householdCategory.map((category, index) => (
                        <TouchableOpacity
                            key={category.id_category}
                            onPress={() => {
                                setChoosenCategoryIndex(index)
                                setChoosenCategoryId(category.id_category)
                                if (categoryRefScroll.current) {
                                    categoryRefScroll.current.scrollTo({
                                        x: index * 100, // Adjust this value as needed based on your item width
                                        animated: true,
                                    });
                                }
                            }}
                            style={{ paddingHorizontal: 20, paddingVertical: 10, borderBottomColor: COLORS.primary }}
                            className={`${choosenCategoryIndex === index ? 'border-b-2 border-[#56409e]' : ''}`}
                        >
                            <Text style={choosenCategoryIndex == index ? { fontSize: 16, fontWeight: '600', color: COLORS.primary } : {
                                fontSize: 16, fontWeight: '600', color: COLORS.gray
                            }}>{category.category_name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <ScrollView>
                <View style={{ flex: 1 }}>
                    {showCategoryItems()}
                </View>
            </ScrollView>
            <AddHouseHoldItemSheet refRBSheet={refRBSheet} setHouseHoldItem={setHouseholdItems} id_category={choosenCategoryId} id_family={id_family!} />
        </View>
    )
}

export default HouseHoldScreen