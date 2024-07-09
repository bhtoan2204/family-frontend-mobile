import React, { useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, ActivityIndicator, Image } from 'react-native'
import { HouseHoldItemScreenProps, HouseHoldScreenProps } from 'src/navigation/NavigationTypes'

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';

import HouseHoldItemInfoBox from 'src/components/user/household/household-detail/household-item-info-box';
import ConsumableInfo from 'src/components/user/household/household-detail/consumable-info';
import DescriptionInfo from 'src/components/user/household/household-detail/description-info';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const HouseHoldItemScreen: React.FC<HouseHoldItemScreenProps> = ({ navigation, route }) => {
    const { id_family } = route.params
    const householdItems = useSelector((state: RootState) => state.householdItemDetail)
    

    return (
        <View className='flex-1 pt-5 rounded-tl-lg rounded-tr-lg bg-[#f7f7f7]'>
            <ScrollView className='flex-1'>
                <View className='items-center'>

                    <HouseHoldItemInfoBox id={householdItems.id_household_item} title="Consumable Item" onPress={() => {
                        navigation.navigate('AddConsumableItem', {
                            id_family: id_family,
                            id_item: householdItems.id_household_item,
                            id_category: householdItems.id_category
                        })
                    }}>
                        <ConsumableInfo data={householdItems} />
                    </HouseHoldItemInfoBox>
                    <View className='my-2'></View>
                    <HouseHoldItemInfoBox id={householdItems.id_household_item} title="Description" onPress={() => {
                        navigation.navigate('EditDescription', {
                            id_family: id_family,
                            id_item: householdItems.id_household_item,
                            id_category: householdItems.id_category,
                            description: householdItems.description || ""
                        })

                    }}>
                        <DescriptionInfo data={householdItems} />
                    </HouseHoldItemInfoBox>
                </View>
            </ScrollView>
            <View className=''>
            </View>

        </View>

        // <RoomComponent
        //   data={
        //     roomItems
        //   }
        //   handleNavigateRoomDetail={(id_room: number) => {
        //     navigation.navigate('RoomDetail', {
        //       id_room: id_room,
        //       id_family: id_family
        //     })
        //   }}
        // />
    )
}

// interface DescriptionInfoProps {
//     data: HouseHoldItemDetailInterface
// }

// const DescriptionInfo = ({ data }: DescriptionInfoProps) => {
//     return (
//         data.description != null && data.description != ''

//             ? <View className='py-3 px-3 '>
//                 <Text className=' text-base font-semibold '
//                     style={{
//                         color: COLORS.Rhino,

//                     }}>Description</Text>
//                 <Text className=' text-base font-semibold '
//                     style={{
//                         color: COLORS.Rhino,
//                     }}>{data.description}</Text>
//             </View> : <>
//                 <View className='py-3 px-3 disabled' >
//                     <View className='justify-center'>
//                         <View className=' items-center'>
//                             {/* <Image source={QuantityIcon} style={{ width: 24, height: 24 }} /> */}
//                             <Material name='plus' size={24} color={iOSGrayColors.systemGray.accessibleDark} />
//                         </View>
//                         <Text className=' text-center text-base py-5'
//                             style={{
//                                 color: COLORS.Rhino,

//                             }}
//                         >Add description for this item</Text>
//                     </View>
//                 </View>

//             </>
//     )
// }

export default HouseHoldItemScreen