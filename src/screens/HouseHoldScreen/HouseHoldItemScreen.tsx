// import React, { useEffect, useRef } from 'react'
// import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native'
// import { HouseHoldScreenProps } from 'src/navigation/NavigationTypes'
// import Material from 'react-native-vector-icons/MaterialCommunityIcons';
// import { COLORS } from 'src/constants';
// import ImageComponent from 'src/components/Image/Image';
// import FamilyImage from 'src/assets/images/household.png';
// import AddHouseHoldItemSheet from './AddHouseHoldItemSheet/AddHouseHoldItemSheet';
// import RBSheet from 'react-native-raw-bottom-sheet';
// import HouseHoldItem from './HouseHoldItem/HouseHoldItem';
// import { household_category_dat } from './const/data';
// import HouseHoldFilterBar from 'src/components/user/household/household-filter-bar';
// import { iOSColors, iOSGrayColors } from 'src/constants/ios-color';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from 'src/redux/store';
// import { clearHouseholdItems, setHouseholdItems } from 'src/redux/slices/HouseHoldSlice';
// import GridView from 'src/components/user/household/grid-view';
// import { FlatGrid, SectionGrid } from 'react-native-super-grid';
// import { HouseHoldItemInterface } from 'src/interface/household/household_item';
// import { gradients_list } from 'src/assets/images/gradients';
// import AccordionItem from 'src/components/user/household/accordion-item';
// import SearchBar from 'src/components/user/household/search-bar';
// import { HouseHoldCategoryInterface } from 'src/interface/household/household_category';
// import HouseHoldService from 'src/services/apiclient/HouseHoldService';
// // import AccordionItem from 'src/components/AccordionItem/accordion-item';

// const household_items = [
//   {
//     "id_household_item": 4,
//     "id_family": 96,
//     "item_name": "Máy giặt",
//     "description": "máy giặt toshiba nhà tao",
//     "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713451417048",
//     "id_category": 1
//   },
//   {
//     "id_household_item": 5,
//     "id_family": 96,
//     "item_name": "Hủ muối tiêu",
//     "description": "ai mà ăn muối tiêu chanh này sẽ bị ám suốt đời",
//     "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713451468168",
//     "id_category": 1
//   },

//   {
//     "id_household_item": 10,
//     "id_family": 96,
//     "item_name": "tủ lạnh cùiiiiiiiiiiiiiii",
//     "description": "cái tủ lạnh cùi vãi",
//     "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713454576319",
//     "id_category": 1
//   },
//   {
//     "id_household_item": 11,
//     "id_family": 96,
//     "item_name": "eulaaaaa",
//     "description": "đây là bé eula dễ thương",
//     "item_imageurl": "https://storage.googleapis.com/famfund-bucket/household/household_bd94ba3a-b046-4a05-a260-890913e09df9_1713502246879",
//     "id_category": 1
//   },
//   {
//     "id_household_item": 13,
//     "id_family": 96,
//     "item_name": "Adudu",
//     "description": "lalala",
//     "item_imageurl": null,
//     "id_category": 2
//   },
//   {
//     "id_household_item": 14,
//     "id_family": 96,
//     "item_name": "Adudu",
//     "description": "lalala",
//     "item_imageurl": null,
//     "id_category": 3
//   },

//   {
//     "id_household_item": 15,
//     "id_family": 96,
//     "item_name": "Adudu",
//     "description": "lalala",
//     "item_imageurl": null,
//     "id_category": 1
//   }
// ]

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

// const HouseHoldScreen: React.FC<HouseHoldScreenProps> = ({ navigation, route }) => {
//   const { id_family } = route.params
//   const refRBSheet = React.useRef<any>(null);
//   const [householdCategory, setHouseholdCategory] = React.useState<HouseHoldCategoryInterface[]>(household_category_dat)
//   // const [householdItems, setHouseholdItems] = React.useState<HouseHoldItemInterface[]>(household_items)
//   const householdItems = useSelector((state: RootState) => state.householdItems)
//   const [choosenCategoryIndex, setChoosenCategoryIndex] = React.useState<number>(0)
//   const [choosenCategoryId, setChoosenCategoryId] = React.useState<number>(householdCategory[0].id_household_item_category)
//   const [searchText, setSearchText] = React.useState<string>('')

//   const dispatch = useDispatch<AppDispatch>()

//   useEffect(() => {
//     const fetchHouseholdData = async () => {
//       // const data = household_items
//       const data = await HouseHoldService.getHouseHoldItems(
//         id_family!,
//         1, 100
//       )
//       const newHouseholdItems: HouseHoldItemInterface[] = data.map((item, index) => {
//         const gradient = gradients_list[Math.floor(index % gradients_list.length)]
//         return {
//           ...item,
//           item_image: gradient,
//         }
//       })
//       console.log(newHouseholdItems)
//       dispatch(setHouseholdItems(newHouseholdItems))
//     } 
//     fetchHouseholdData()
//     return () => {
//       console.log("HouseHoldScreen unmounting")
//       dispatch(clearHouseholdItems())
//     }
//   }, [])

//   // useEffect(() => {
//   //     const fetchHouseholdData = async () => {
//   //         const data = await HouseHoldService.getHouseHoldItems(
//   //             id_family!,
//   //             1, 100
//   //         )
//   //         const newHouseholdItems: HouseHoldItemInterface[] = data.map((item, index) => {
//   //             const gradient = gradients_list[Math.floor(index % gradients_list.length)]
//   //             return {
//   //                 ...item,
//   //                 item_image: gradient,
//   //             }
//   //         })
//   //         console.log(newHouseholdItems)
//   //         dispatch(setHouseholdItems(newHouseholdItems))
//   //     }
//   //     fetchHouseholdData()
//   //     if (householdItems.length == 0) {

//   //     }

//   // }, [householdItems])

//   useEffect(() => {
//     console.log(searchText)
//   }, [searchText])

//   // const showCategoryItems = () => {
//   //     const categoryItems = householdItems.filter(item => item.id_category === choosenCategoryId);
//   //     return <View className='flex-1 '>
//   //         <View className='grid grid-cols-3 gap-4 border-2' style={{

//   //         }}>
//   //             {
//   //                 categoryItems && categoryItems.map((item, index) => (
//   //                     <HouseHoldItem item={item} key={item.id_household_item} index={index}
//   //                         navigateToHouseHoldItemDetail={navigateToHouseHoldItemDetail}
//   //                     />
//   //                 ))
//   //             }
//   //         </View>
//   //     </View>
//   // }
//   const showContent = () => {
//     return <>
//       {
//         household_category_dat.map((category, index) => {
//           const categoryItems = householdItems.filter(item => item.id_category === category.id_household_item_category && (item.item_name.toLowerCase().includes(searchText.toLowerCase())));
//           return <View className='' key={index}>
//             {/* <Text className='text-xl font-medium'>{category.category_name}</Text> */}
//             <AccordionItem title={category.category_name} isExpanded={
//               index == 0 || index == 1 ? true : false
//             } >
//               <FlatGrid
//                 maxItemsPerRow={3}
//                 itemDimension={screenWidth * 0.3}
//                 spacing={3}
//                 data={categoryItems}
//                 renderItem={renderItem}
//                 scrollEnabled={false}
//               />
//             </AccordionItem>

//           </View >
//         })
//       }

//     </>
//   }

//   const renderItem = ({ item, index }: { item: HouseHoldItemInterface, index: number }) => {
//     return <HouseHoldItem item={item} key={item.id_household_item}
//       navigateToHouseHoldItemDetail={navigateToHouseHoldItemDetail} index={index} />
//   }

//   const navigateToHouseHoldItemDetail = (item: HouseHoldItemInterface) => {
//     navigation.navigate('HouseHoldItemDetail', {
//       id_family,
//       id_category: item.id_category,
//       id_item: item.id_household_item
//     })
//   }

//   if (!householdItems) {
//     return <ActivityIndicator size="large" color={COLORS.AuroMetalSaurus} />
//   }

//   return (
//     <SafeAreaView className="flex-1 bg-[#F7F7F7]">
//       <View className="flex-1 bg-[#F7F7F7]">
//         <ScrollView>
//           <View className='w-full  flex-row justify-between items-center py-3'>
//             <TouchableOpacity onPress={() => navigation.goBack()} className=' flex-row items-center'>
//               <Material name="chevron-left" size={30} style={{ color: COLORS.AuroMetalSaurus, fontWeight: "bold" }} />
//               {/* <Text className='text-lg font-semibold text-gray-600' style={{ color: COLORS.AliceBlue }}>Back</Text> */}
//             </TouchableOpacity>
//             <View className='mr-3'>
//               <TouchableOpacity onPress={() => {
//                 // refRBSheet.current?.open()
//                 navigation.navigate('AddHouseHoldItem', {
//                   id_family
//                 })

//               }} >
//                 {/* <Material name="plus" size={24} style={{ color: COLORS.primary, fontWeight: "bold" }} className='font-semibold' /> */}
//                 <Text className='text-lg font-semibold' style={{ color: COLORS.AuroMetalSaurus }}>Add</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//           <SearchBar searchString={searchText} setSearchString={setSearchText} />
//           {/* <HouseHoldFilterBar householdCategory={householdCategory} choosenCategoryId={choosenCategoryId} choosenCategoryIndex={choosenCategoryIndex} setChoosenCategoryId={setChoosenCategoryId} setChoosenCategoryIndex={setChoosenCategoryIndex} /> */}
//           <View className='my-2'
//           ></View>
//           {/* <View style={{ flex: 1 }}>
//                         {gridView()}
//                     </View> */}
//           <View style={{ flex: 1 }}>
//             {showContent()}
//           </View>
//         </ScrollView>
//         {/* <AddHouseHoldItemSheet refRBSheet={refRBSheet} setHouseHoldItem={setHouseholdItems} id_category={choosenCategoryId} id_family={id_family!} /> */}
//       </View>
//     </SafeAreaView>
//   )
// }

// export default HouseHoldScreen
import React, { useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, ActivityIndicator, Image } from 'react-native'
import { HouseHoldItemScreenProps, HouseHoldScreenProps } from 'src/navigation/NavigationTypes'
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
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store';
import { clearHouseholdItems, setHouseholdItems } from 'src/redux/slices/HouseHoldSlice';
import GridView from 'src/components/user/household/grid-view';
import { FlatGrid, SectionGrid } from 'react-native-super-grid';
import { HouseHoldItemInterface } from 'src/interface/household/household_item';
import { gradients_list } from 'src/assets/images/gradients';
import AccordionItem from 'src/components/user/household/accordion-item';
import SearchBar from 'src/components/user/household/search-bar';
import { HouseHoldCategoryInterface } from 'src/interface/household/household_category';
import HouseHoldService from 'src/services/apiclient/HouseHoldService';
// import AccordionItem from 'src/components/AccordionItem/accordion-item';
import QuantityIcon from 'src/assets/images/household_assets/quantity.png';
import HouseHoldTab from 'src/components/user/household/household-tab';
import RoomComponent from 'src/components/user/household/room/room-component';
import { RoomInterface } from 'src/interface/household/room';
import { HouseHoldItemDetailInterface } from 'src/interface/household/household_item_detail';
import HouseHoldItemInfoBox from 'src/components/user/household/household-detail/household-item-info-box';
import ConsumableInfo from 'src/components/user/household/household-detail/consumable-info';
import { Skeleton } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import ConsumableSkeleton from 'src/components/user/household/household-detail/consumable-skeleton';
import DescriptionInfo from 'src/components/user/household/household-detail/description-info';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import AddRoomSheet from 'src/components/user/household/sheet/add-room-sheet';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const HouseHoldItemScreen: React.FC<HouseHoldItemScreenProps> = ({ navigation, route }) => {
    const { id_family } = route.params
    const refRBSheet = React.useRef<any>(null);
    const householdItems = useSelector((state: RootState) => state.householdItemDetail)
    // const [choosenCategoryId, setChoosenCategoryId] = React.useState<number>(householdCategory[0].id_household_item_category)

    const dispatch = useDispatch<AppDispatch>()

    // useEffect(() => {
    //   const fetchHouseholdData = async () => {
    //     const data = await HouseHoldService.getHouseHoldItems(
    //       id_family!,
    //       1, 100
    //     )
    //     const newHouseholdItems: HouseHoldItemInterface[] = data.map((item, index) => {
    //       const gradient = gradients_list[Math.floor(index % gradients_list.length)]
    //       return {
    //         ...item,
    //         item_image: gradient,
    //       }
    //     })
    //     console.log(newHouseholdItems)
    //     dispatch(setHouseholdItems(newHouseholdItems))
    //   }
    //   fetchHouseholdData()
    //   return () => {
    //     console.log("HouseHoldScreen unmounting")
    //     dispatch(clearHouseholdItems())
    //   }
    // }, [])



    // useEffect(() => {
    //   console.log(searchText)
    // }, [searchText])



    // if (householdItems.id_household_item == -1) {
    //     return <View className='flex-1 items-center justify-center'>
    //         <Skeleton
    //             LinearGradientComponent={LinearGradient}
    //             animation="wave" width={80} height={40} />
    //     </View>
    // }

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