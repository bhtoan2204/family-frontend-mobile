import React, { useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, ActivityIndicator, Image, RefreshControl } from 'react-native'
import { HouseHoldItemScreenProps, HouseHoldScreenProps } from 'src/navigation/NavigationTypes'

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';

import HouseHoldItemInfoBox from 'src/components/user/household/household-detail/household-item-info-box';
import ConsumableInfo from 'src/components/user/household/household-detail/consumable-info';
import DescriptionInfo from 'src/components/user/household/household-detail/description-info';
import DescriptionIcon from 'src/assets/images/household_assets/description_iccon.png';
import ConsumableIcon from 'src/assets/images/household_assets/consumable_icon.png';
import HouseHoldService from 'src/services/apiclient/HouseHoldService';
import { setHouseholdItemDetail, updateGuidelineId } from 'src/redux/slices/HouseHoldDetailSlice';

const HouseHoldItemScreen: React.FC<HouseHoldItemScreenProps> = ({ navigation, route, addEditConsumableItemSheetRef, addEditDescriptionSheetRef }) => {
    const { id_family, id_item } = route.params

    const dispatch = useDispatch<AppDispatch>()
    console.log(id_family, id_item)
    const [loading, setLoading] = React.useState(false)
    const householdItems = useSelector((state: RootState) => state.householdItemDetail)
    console.log(householdItems.id_guide_item)
    const refetchData = React.useCallback(async () => {
        setLoading(true)
        const data = await HouseHoldService.getHouseHoldItemDetail(id_item!, id_family!)
        if (data) {
            dispatch(setHouseholdItemDetail(data))
        }
        setLoading(false)
    }, [])

    return (
        <View className='flex-1 pt-5 rounded-tl-lg rounded-tr-lg bg-[#f7f7f7] dark:bg-[#0A1220]'>
            <ScrollView className='flex-1'
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={refetchData}
                    />
                }
            >
                <View className='items-center'>

                    <HouseHoldItemInfoBox id={householdItems.id_household_item} title="Consumable Item"
                        onPress={() => {
                            addEditConsumableItemSheetRef && addEditConsumableItemSheetRef.current?.expand()
                        }}
                        iconImage={ConsumableIcon}

                    >
                        <ConsumableInfo data={householdItems} />
                    </HouseHoldItemInfoBox>
                    <View className='my-2'></View>
                    <HouseHoldItemInfoBox id={householdItems.id_household_item} title="Description"
                        onPress={() => {
                            // navigation.navigate('EditDescription', {
                            //     id_family: id_family,
                            //     id_item: householdItems.id_household_item,
                            //     id_category: householdItems.id_category,
                            //     description: householdItems.description || ""
                            // })
                            addEditDescriptionSheetRef && addEditDescriptionSheetRef.current?.expand()

                        }}
                        iconImage={DescriptionIcon}
                    >
                        <DescriptionInfo data={householdItems} />
                    </HouseHoldItemInfoBox>
                    <View className='my-2'></View>

                    <TouchableOpacity activeOpacity={0.65} className={`mb-4 mt-7 w-[65%] h-12 bg-[#66C0F4]  self-center rounded-lg justify-center align-center `}
                        onPress={() => {
                            if (householdItems.id_guide_item == null) {

                                navigation.navigate('GuidelineStack', {
                                    screen: 'GuildLine',
                                    params: {
                                        id_family: id_family,
                                        id_household_item: householdItems.id_household_item,
                                        openSheet: true,
                                        // onAddCallback: (id_guide_item: number) => {
                                        //     onAddGuideline(id_guide_item)
                                        // }
                                    }
                                })
                            } else {
                                navigation.navigate('GuidelineStack', {
                                    screen: 'GuildLineDetail',
                                    params: {
                                        id_family: id_family,
                                        id_item: householdItems.id_guide_item,
                                    }
                                })
                            }
                        }}
                    >
                        <Text className='text-center text-white font-semibold '> {
                            householdItems.id_guide_item == null ? "Create a guideline" : "View guideline"
                        } </Text>
                    </TouchableOpacity>
                    <View className='my-4'></View>

                </View>
            </ScrollView>



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