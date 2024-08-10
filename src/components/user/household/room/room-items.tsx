import React from 'react'
import { FlatGrid } from 'react-native-super-grid'
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { COLORS } from 'src/constants'
import { iOSGrayColors } from 'src/constants/ios-color'
import { gradients_list } from 'src/assets/images/gradients'
import { RoomInterface } from 'src/interface/household/room'
import { useSelector } from 'react-redux'
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice'
import { RootState } from 'src/redux/store'
import HouseholdItemSkeleton from './skeleton'
import AddRoomIcon from 'src/assets/images/household_assets/add_room.png'


interface RoomItemsProps {
    data: RoomInterface[],
    handleNavigateRoomDetail: (id_room: number) => void;
}

const screenWidth = Dimensions.get('window').width;

const RoomItems = ({ data, handleNavigateRoomDetail }: RoomItemsProps) => {
    const loading = useSelector((state: RootState) => state.household).loading
    const [k, setK] = React.useState(false)

    React.useEffect(() => {
        setK(prev => !prev)
    }, [data])

    const renderItem2 = React.useCallback((item: RoomInterface, index: number) => {
        return (
            <View className='items-center ' style={{
                marginRight: index % 2 == 0 ? 10 : 0,
                marginLeft: index % 2 == 1 ? 10 : 0,
                marginBottom: 20,
                borderColor: iOSGrayColors.systemGray5.defaultLight,
            }}>
                <TouchableOpacity onPress={() => {
                    handleNavigateRoomDetail(item.id_room)
                }}>
                    <View className={`border-[1px] border-[#DEDCDC] dark:border-[#232A3D] `}
                        style={{
                            borderRadius: 15,
                        }}
                    >
                        <Image
                            source={item.room_image ? {
                                uri: item.room_image,
                                cache: 'force-cache',
                            }
                                : gradients_list[index % gradients_list.length]}
                            style={{
                                width: '100%',
                                height: undefined,
                                borderRadius: 15,
                                aspectRatio: 1,
                            }}

                        />
                    </View>
                    <Text className='text-[#2A475E] dark:text-white' style={{
                        textAlign: 'center',

                        fontSize: 16,
                        fontWeight: 500,
                        marginTop: 10,
                    }}>{item.room_name}</Text>
                </TouchableOpacity>
            </View>
        )

    }, [])

    return (
        <View className=' items-center flex-1  mx-[10%]'>
            {
                loading ? <>
                    <HouseholdItemSkeleton />
                </> : <>
                    {
                        data.length > 0 ? <FlatGrid
                            itemDimension={screenWidth * 0.35}
                            maxItemsPerRow={2}
                            data={data}
                            key={k.toString()}
                            spacing={0}

                            renderItem={({ item, index }) => renderItem2(item, index)}
                            scrollEnabled={false}
                            removeClippedSubviews={true}
                            initialNumToRender={2}
                            maxToRenderPerBatch={4}
                            updateCellsBatchingPeriod={100}
                            windowSize={7}
                        /> : <>
                            <View className='items-center my-2'>
                                <Image source={AddRoomIcon} className='w-20 h-20 my-5' />
                                <Text className='text-base text-black dark:text-white'>Add some item !!</Text>
                            </View>
                        </>
                    }
                </>
            }
        </View>
    )
}

export default RoomItems