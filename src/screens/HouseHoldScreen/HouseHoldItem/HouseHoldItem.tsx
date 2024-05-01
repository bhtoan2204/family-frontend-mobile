import React from 'react'
import { View, Text, Alert } from 'react-native'
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler'
import ImageComponent from 'src/components/Image/Image'
import { COLORS } from 'src/constants'
import FamilyImage from 'src/assets/images/household.png'
import RBSheet from 'react-native-raw-bottom-sheet'
import EditHouseHoldItemSheet from '../AddHouseHoldItemSheet/EditHouseHoldItemSheet'
import Icon from 'react-native-vector-icons/Ionicons';

const HouseHoldItem = ({ item, setHouseHoldItem, index }: { item: HouseHoldItemInterface, setHouseHoldItem: React.Dispatch<React.SetStateAction<HouseHoldItemInterface[]>>, index: number }) => {
    const editSheetRef = React.useRef<RBSheet>(null);
    const handleDelete = () => {
        console.log("Deleting item with id:", item.id_household_item);
        Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Delete",
                onPress: () => {
                    setHouseHoldItem((prev) => {
                        return prev.filter((houseHoldItem) => houseHoldItem.id_household_item !== item.id_household_item)
                    })
                }
            }
        ])
    }
    const renderLeftActions = () => (
        <TouchableOpacity onPress={handleDelete} style={{ backgroundColor: '#EF3B4F', width: "auto" }} className='h-full flex-row items-center py-4 px-2  my-2 ' >
            <View className='flex-row items-center '>
                <Icon name="trash" size={20} color={"white"} style={{ marginHorizontal: 4 }} />
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
            </View>
        </TouchableOpacity>
    );
    return (
        <View className=''>
            <Swipeable
                renderRightActions={renderLeftActions}
                overshootRight={false}

            >
                <TouchableOpacity key={item.id_household_item} onPress={() => {
                    editSheetRef.current?.open()
                }} className='bg-white my-2'>

                    <View className='m-4  flex-row items-center'>
                        <ImageComponent imageUrl={item.item_imageurl || ""} style={{ width: 70, height: 70 }} defaultImage={FamilyImage} className='rounded-lg ' />
                        <View className='flex-1 ml-4'>
                            <Text className='font-semibold text-lg' style={{ color: COLORS.primary }}>{item.item_name}</Text>
                            <Text className='text-base text-gray-500' >{item.item_description}</Text>
                        </View>
                    </View>
                    <EditHouseHoldItemSheet refRBSheet={editSheetRef} item={item} id_category={item.id_category} id_family={item.id_family} setHouseHoldItem={setHouseHoldItem} index={index} />
                </TouchableOpacity>
            </Swipeable>
        </View>

    )
}

export default HouseHoldItem