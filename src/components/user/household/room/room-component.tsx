import React from 'react'
import { View, Text, ScrollView, RefreshControl } from 'react-native'
import { COLORS } from 'src/constants';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { iOSGrayColors } from 'src/constants/ios-color';
import RoomItems from './room-items';
import { RoomInterface } from 'src/interface/household/room';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { useDispatch, useSelector } from 'react-redux';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';
import { AppDispatch, RootState } from 'src/redux/store';
import HouseHoldService from 'src/services/apiclient/HouseHoldService';
import { setLoading, setRoom, setTotalRoom, addRooms } from 'src/redux/slices/HouseHoldDataSlice';
import { getTranslate } from 'src/redux/slices/languageSlice';

interface RoomComponentProps {
    data: RoomInterface[],
    handleNavigateRoomDetail: (id_room: number) => void;
    addRoomSheetRef: React.RefObject<BottomSheet>
    id_family: number
}

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};


const RoomComponent = ({ data, handleNavigateRoomDetail, addRoomSheetRef, id_family }: RoomComponentProps) => {
    const isDarkMode = useSelector(getIsDarkMode)
    const loading = useSelector((state: RootState) => state.household).loading
    // const total = useSelector((state: RootState) => state.household).totalRoom
    // const [refreshing, setRefreshing] = React.useState(false);
    const [page, setPage] = React.useState(1)
    const [hasMore, setHasMore] = React.useState(false);
    const [isLoadingMore, setIsLoadingMore] = React.useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const translate = useSelector(getTranslate)
    const refetchData = React.useCallback(async () => {
        console.log("calling refetch")
        const fetchRooms = async () => {
            const roomData = await HouseHoldService.getAllRoom(id_family!, 1, 10)
            if (roomData.data.length < 10) {
                setHasMore(false)
            } else {
                setHasMore(true)
                setPage(prev => prev + 1)
            }
            dispatch(setRoom(roomData.data))
            dispatch(setTotalRoom(roomData.total))
        }
        dispatch(setLoading(true))
        await fetchRooms()
        dispatch(setLoading(false))
    }, [])

    const fetchMoreData = React.useCallback(async () => {
        if (!isLoadingMore  && hasMore) {
            console.log("calling fetchMoreData")
            const fetchRooms = async () => {
                const roomData = await HouseHoldService.getAllRoom(id_family!, page, 10)
                if (roomData.data.length < 10) {
                    setHasMore(false)
                } else {
                    setHasMore(true)
                }
                dispatch(addRooms(roomData.data))
                dispatch(setTotalRoom(roomData.total))
            }

            await fetchRooms()
        }
    }, [id_family, page])

    const handleReachBottom = async () => {
        setIsLoadingMore(true)
        await fetchMoreData()
        setIsLoadingMore(false)
        setPage(page + 1)
    }




    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refetchData} />
            }
            className='flex-1 bg-[#F7F7F7] dark:bg-[#0A1220]'
            showsVerticalScrollIndicator={false}
            onScroll={async ({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                    // console.log('end')
                    await handleReachBottom()
                }
            }}
            scrollEventThrottle={400}

        >
            <View>
                <View className='py-4 flex-row items-center justify-between border-b-[1.5px]  mx-[10%] border-[#DEDCDC] dark:border-[#232A3D]'

                >
                    <Text className='text-lg text-[#2A475E] dark:text-white '

                    >{
                            translate('household_room_text')
                        }</Text>

                    <View className=' p-1 border-[1px] rounded-lg border-[#DEDCDC] dark:border-[#232A3D]'
                    // style={{
                    //     borderColor: iOSGrayColors.systemGray4.defaultLight,
                    // }}
                    >
                        <Material name='magnify' size={24} color={
                            isDarkMode ? '#909093' : COLORS.Rhino
                        } />
                    </View>
                </View>
                <View className='py-4 flex-row items-center justify-between px-[10%]'

                >
                    <Text className='text-sm text-[#2A475E] dark:text-[#8D94A5]'

                    >{data.length} {
                            translate('item_added_text')
                        }</Text>


                    <Text className='text-sm font-semibold'
                        style={{
                            color: COLORS.Azure,
                        }}
                        onPress={() => {
                            console.log('add item')
                            addRoomSheetRef.current?.expand()
                        }}
                    >{
                            translate('add_item_text')
                        }</Text>

                </View>
                <RoomItems data={data}
                    handleNavigateRoomDetail={handleNavigateRoomDetail}
                />
            </View>
        </ScrollView>
    )
}

export default RoomComponent