import React from 'react'
import { FlatGrid } from 'react-native-super-grid'
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { COLORS } from 'src/constants'
import { iOSGrayColors } from 'src/constants/ios-color'
import { gradients_list } from 'src/assets/images/gradients'
import { HouseHoldItemInterface } from 'src/interface/household/household_item'
import { HouseHoldCategoryInterface } from 'src/interface/household/household_category'
interface CategoryItemInterface {
    data: HouseHoldCategoryInterface[],
    handleNavigateHouseHoldDetail: (id_item: number) => void;
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const CategoryItems = ({ data, handleNavigateHouseHoldDetail }: CategoryItemInterface) => {

    const renderItem2 = React.useCallback((item: HouseHoldCategoryInterface, index: number) => {
        return (
            <View className='items-center ' style={{
                // flex: 1,
                marginRight: index % 2 == 0 ? 10 : 0,
                marginLeft: index % 2 == 1 ? 10 : 0,
                marginBottom: 20,
                borderColor: iOSGrayColors.systemGray5.defaultLight,
            }}>
                <TouchableOpacity onPress={() => {
                    handleNavigateHouseHoldDetail(item.id_household_item_category)
                }}>
                    <View className='border-[1px] border-[#DEDCDC] dark:border-[#232A3D]' style={{
                        borderRadius: 15,
                    }}>
                        <Image
                            source={item.category_image ? { uri: item.category_image } : gradients_list[index % gradients_list.length]}
                            style={{
                                // width: screenWidth * 0.3,
                                width: '100%',
                                height: undefined,
                                borderRadius: 15,
                                // height: screenHeight * 0.2,
                                aspectRatio: 1,
                            }}
                        />
                    </View>
                    <Text className='text-[#2A475E] dark:text-white' style={{
                        textAlign: 'center',
                        fontSize: 16,
                        fontWeight: 500,
                        marginTop: 10,
                    }}>{item.category_name}</Text>
                </TouchableOpacity>
            </View>
        )
    }, [])

    // const renderItem = (item: HouseHoldCategoryInterface, index: number) => {
    //     return (
    //         <View className='items-center ' style={{
    //             // flex: 1,
    //             marginRight: index % 2 == 0 ? 10 : 0,
    //             marginLeft: index % 2 == 1 ? 10 : 0,
    //             marginBottom: 20,
    //             borderColor: iOSGrayColors.systemGray5.defaultLight,
    //         }}>
    //             <TouchableOpacity onPress={() => {
    //                 handleNavigateHouseHoldDetail(item.id_household_item_category)
    //             }}>
    //                 <View className='border-[1px] border-[#DEDCDC] dark:border-[#232A3D]' style={{
    //                     borderRadius: 15,
    //                 }}>
    //                     <Image
    //                         source={item.category_image ? { uri: item.category_image } : gradients_list[index % gradients_list.length]}
    //                         style={{
    //                             // width: screenWidth * 0.3,
    //                             width: '100%',
    //                             height: undefined,
    //                             borderRadius: 15,
    //                             // height: screenHeight * 0.2,
    //                             aspectRatio: 1,
    //                         }}
    //                     />
    //                 </View>
    //                 <Text className='text-[#2A475E] dark:text-white' style={{
    //                     textAlign: 'center',
    //                     fontSize: 16,
    //                     fontWeight: 500,
    //                     marginTop: 10,
    //                 }}>{item.category_name}</Text>
    //             </TouchableOpacity>
    //         </View>
    //     )
    // }
    return (
        <View className=' items-center flex-1  mx-[10%]'>
            <FlatGrid
                itemDimension={screenWidth * 0.35}
                maxItemsPerRow={2}
                data={data}

                spacing={0}

                renderItem={({ item, index }) => renderItem2(item, index)}
                scrollEnabled={false}
                removeClippedSubviews={true}
                initialNumToRender={2}
                maxToRenderPerBatch={4}
                updateCellsBatchingPeriod={100}
                windowSize={7}
            />
        </View>
    )
}

export default CategoryItems