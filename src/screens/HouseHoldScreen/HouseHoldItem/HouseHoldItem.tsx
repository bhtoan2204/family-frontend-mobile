import React from 'react'
import { View, Text, Alert, Image, StyleSheet } from 'react-native'
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler'
import ImageComponent from 'src/components/Image/Image'
import { COLORS } from 'src/constants'
import FamilyImage from 'src/assets/images/household.png'
import RBSheet from 'react-native-raw-bottom-sheet'
import EditHouseHoldItemSheet from '../AddHouseHoldItemSheet/EditHouseHoldItemSheet'
import Icon from 'react-native-vector-icons/Ionicons';
import { iOSGrayColors } from 'src/constants/ios-color'
import Svg, { Rect, Mask, G } from 'react-native-svg';
import { category_colors } from '../const/data'
import { AppDispatch } from 'src/redux/store'
import { useDispatch } from 'react-redux'
import { deleteHouseholdItem } from 'src/redux/slices/HouseHoldSlice'

const HouseHoldItem = ({ item, index, navigateToHouseHoldItemDetail }: { item: HouseHoldItemInterface, index: number, navigateToHouseHoldItemDetail: (item: HouseHoldItemInterface) => void }) => {
    const editSheetRef = React.useRef<any>(null);
    const dispatch = useDispatch<AppDispatch>()
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
                    dispatch(deleteHouseholdItem(item.id_household_item))
                    // setHouseHoldItem((prev) => {
                    //     return prev.filter((houseHoldItem) => houseHoldItem.id_household_item !== item.id_household_item)
                    // })
                }
            }
        ])
    }
    const renderLeftActions = () => (
        <TouchableOpacity onPress={handleDelete} style={{ backgroundColor: '#EF3B4F', width: "auto" }} className='h-full flex-row items-center py-4 px-2 mb-2' >
            <View className='flex-row items-center '>
                <Icon name="trash" size={20} color={"white"} style={{ marginHorizontal: 4 }} />
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
            </View>
        </TouchableOpacity>
    );
    return (
        // <View className=''>
        //     <Swipeable
        //         renderRightActions={renderLeftActions}
        //         overshootRight={false}

        //     >
        //         <TouchableOpacity key={item.id_household_item} onPress={() => {
        //             // editSheetRef.current?.open()
        //             navigateToHouseHoldItemDetail(item)

        //         }} className='bg-white mb-2'>

        //             <View className='m-4 flex-row items-center '>
        //                 <ImageComponent imageUrl={item.item_imageurl || ""} style={{ width: 70, height: 70 }} defaultImage={FamilyImage} className='rounded-lg ' />
        //                 <View className='flex-1 ml-4'>
        //                     <Text className='font-semibold text-lg' style={{ color: COLORS.AuroMetalSaurus }}>{item.item_name}</Text>
        //                     <Text className='text-base text-gray-500' >{item.item_description}</Text>
        //                 </View>
        //             </View>
        //             <EditHouseHoldItemSheet refRBSheet={editSheetRef} item={item} id_category={item.id_category} id_family={item.id_family} setHouseHoldItem={setHouseHoldItem} index={index} />
        //         </TouchableOpacity>
        //     </Swipeable>
        // </View>
        <TouchableOpacity className='basis-[31%] rounded-md  justify-center items-center bg-white shadow-lg border-[1px] ' style={{
            width: 125, height: 'auto',
            overflow: 'hidden',
            borderColor: category_colors[item.id_category - 1].background_color

        }} onPress={() => {
            navigateToHouseHoldItemDetail(item)
        }}>
            <View className='' style={{

            }}>
                <ImageComponent imageUrl={item.item_imageurl || ""} style={{ width: 125, height: 130, }} defaultImage={FamilyImage} resizeMode='cover' />

            </View>
            <View className='absolute  bottom-0 w-full overflow-hidden'
            // style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
                <View className='absolute w-full h-full opacity-[0.9]' style={{
                    backgroundColor: category_colors[item.id_category - 1].background_color
                }}>

                </View>
                <Text className='py-1 pl-3 font-bold text-start text-white px-2 ' numberOfLines={1} >{item.item_name}</Text>
            </View>
            {/* <Svg height="25%" width="100%" style={styles.blurOverlay}>
                <Mask id="mask" x="0" y="0" width="100%" height="100%">
                    <Rect x="0" y="0" width="100%" height="75%" fill="white" />
                    <Rect x="0" y="75%" width="100%" height="25%" fill="black" />
                </Mask>
                <G mask="url(#mask)">
                    <ImageComponent imageUrl={item.item_imageurl || ""} style={styles.image} defaultImage={FamilyImage} className='' resizeMode='cover' blurRadius={10} />
                </G>
            </Svg> */}

        </TouchableOpacity>

    )
}


export default HouseHoldItem