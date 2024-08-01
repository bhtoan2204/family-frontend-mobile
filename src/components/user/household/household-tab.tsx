import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { COLORS } from 'src/constants';
import { iOSGrayColors } from 'src/constants/ios-color';

interface HouseHoldTabProps {
    choosenTab: number;
    setChoosenTab: (tab: number) => void;

}

const HouseHoldTab = ({
    choosenTab,
    setChoosenTab
}: HouseHoldTabProps
) => {
    return (
        <View className=' items-center  rounded-2xl mx-[7%]  bg-[#f7f7f7] dark:bg-[#252D3B]'
            style={{
                borderWidth: 0.5,
                // borderColor: iOSGrayColors.systemGray5.defaultLight,
            }}
        >
            <View className='m-1 '>
                <View className='flex-row items-center justify-around w-full  '>
                    <TouchableOpacity className=' flex-1' onPress={() => {
                        setChoosenTab(0)
                    }}>
                        <View className={` py-2 rounded-2xl ${choosenTab == 0 ? 'bg-[#2a475e] dark:bg-[#66C0F4]' : 'bg-transparent'}`}

                        >
                            <Text className={`text-center  text-sm font-semibold ${choosenTab == 0 ? 'text-white ' : 'text-[#2A475E] dark:text-white'}`}
                            >Areas</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className=' flex-1' onPress={() => {
                        setChoosenTab(1)
                    }}>
                        <View className={` py-2 rounded-2xl ${choosenTab == 1 ? 'bg-[#2a475e] dark:bg-[#66C0F4]' : 'bg-transparent'}`}

                        >
                            <Text className={`text-center  text-sm font-semibold ${choosenTab == 1 ? 'text-white ' : 'text-[#2A475E] dark:text-white'}`}


                            >Items</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className=' flex-1' onPress={() => {
                        setChoosenTab(2)
                    }}>
                        <View className={` py-2 rounded-2xl ${choosenTab == 2 ? 'bg-[#2a475e] dark:bg-[#66C0F4]' : 'bg-transparent'}`}
                        >
                            <Text className={`text-center  text-sm font-semibold ${choosenTab == 2 ? 'text-white ' : 'text-[#2A475E] dark:text-white'}`}
                               

                            >Categories</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default HouseHoldTab