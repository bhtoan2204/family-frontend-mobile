import React from 'react'
import { View, Text, ScrollView, RefreshControl } from 'react-native'
import { COLORS } from 'src/constants';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { iOSGrayColors } from 'src/constants/ios-color';
import RoomItems from './room-items';
import { RoomInterface } from 'src/interface/household/room';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { useSelector } from 'react-redux';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';

interface RoomComponentProps {
    data: RoomInterface[],
    handleNavigateRoomDetail: (id_room: number) => void;
    addRoomSheetRef: React.RefObject<BottomSheet>
}



const RoomComponent = ({ data, handleNavigateRoomDetail, addRoomSheetRef }: RoomComponentProps) => {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    const isDarkMode = useSelector(getIsDarkMode)



    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            className='flex-1 bg-[#F7F7F7] dark:bg-[#0A1220]'
            showsVerticalScrollIndicator={false}

        >
            <View>
                <View className='py-4 flex-row items-center justify-between border-b-[1.5px]  mx-[10%] border-[#DEDCDC] dark:border-[#232A3D]'
                    
                >
                    <Text className='text-lg text-[#2A475E] dark:text-white '

                    >Rooms</Text>

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
                        
                    >{data.length} items add</Text>


                    <Text className='text-sm font-semibold'
                        style={{
                            color: COLORS.Azure,
                        }}
                        onPress={() => {
                            console.log('add item')
                            addRoomSheetRef.current?.expand()
                        }}
                    >Add item</Text>

                </View>
                <RoomItems data={data}
                    handleNavigateRoomDetail={handleNavigateRoomDetail}
                />
            </View>
        </ScrollView>
    )
}

export default RoomComponent