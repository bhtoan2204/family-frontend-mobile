import React from 'react'
import { FlatGrid } from 'react-native-super-grid'
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { COLORS } from 'src/constants'
import { iOSGrayColors } from 'src/constants/ios-color'
import { gradients_list } from 'src/assets/images/gradients'
import { RoomInterface } from 'src/interface/household/room'
import { useSelector } from 'react-redux'
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice'
interface RoomItemsProps {
    data: RoomInterface[],
    handleNavigateRoomDetail: (id_room: number) => void;
}
import { ScreenHeight, Skeleton } from '@rneui/base'
const screenWidth = Dimensions.get('window').width;
const HouseholdItemSkeleton = () => {
    const renderItem = React.useCallback((item: number, index: number) => {
        return (
            <View className='items-center ' style={{
                // flex: 1,
                marginRight: index % 2 == 0 ? 10 : 0,
                marginLeft: index % 2 == 1 ? 10 : 0,
                marginBottom: 20,
                borderColor: iOSGrayColors.systemGray5.defaultLight,
            }}>
                <TouchableOpacity onPress={() => {
                }}>
                    <View className={`border-[1px] border-[#DEDCDC] dark:border-[#232A3D] `}
                        style={{
                            borderRadius: 15,
                        }}
                    >
                        <Skeleton width={'100%'} height={undefined} style={{
                            // width: screenWidth * 0.3,
                            width: '100%',
                            height: undefined,
                            borderRadius: 15,
                            // height: screenHeight * 0.2,
                            aspectRatio: 1,
                        }} />

                    </View>
                    <Skeleton width={'20%'} height={ScreenHeight * 0.05} style={{
                    }} />
                </TouchableOpacity>
            </View>
        )

    }, [])
    return (
        <FlatGrid
            itemDimension={screenWidth * 0.35}
            maxItemsPerRow={2}
            data={[1, 2, 3, 4]}

            spacing={0}

            renderItem={({ item, index }) => renderItem(item, index)}
            scrollEnabled={false}
            removeClippedSubviews={true}
            initialNumToRender={2}
            maxToRenderPerBatch={4}
            updateCellsBatchingPeriod={100}
            windowSize={7}
        />
    )
}

export default HouseholdItemSkeleton