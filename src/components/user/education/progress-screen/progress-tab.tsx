import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { COLORS } from 'src/constants';
import { iOSGrayColors } from 'src/constants/ios-color';

interface ProgressTabProps {
    choosenTab: number;
    setChoosenTab: (tab: number) => void;

}

const ProgressTab = ({
    choosenTab,
    setChoosenTab
}: ProgressTabProps
) => {
    return (
        <View className=' items-center  rounded-2xl mx-[7%]  bg-[#f7f7f7] dark:bg-[#252D3B] border-[1px] dark:border-[0px]'
            style={{
                // borderWidth: 1,
                borderColor: iOSGrayColors.systemGray5.defaultLight,
            }}
        >
            <View className='m-1 '>
                <View className='flex-row items-center justify-around w-full  '>
                    <TouchableOpacity className=' flex-1' onPress={() => {
                        setChoosenTab(0)
                    }}>
                        <View className={` py-2 rounded-2xl ${choosenTab == 0 ? 'bg-[#2a475e] dark:bg-[#66C0F4]' : 'bg-transparent'}`}
                            style={{
                                // backgroundColor: choosenTab == 0 ? COLORS.Rhino : 'transparent',
                            }}>
                            <Text className={`text-center  text-sm font-semibold ${choosenTab == 0 ? 'text-white ' : 'text-[#2A475E] dark:text-white'}`}
                                // style={{
                                //     color: choosenTab == 0 ? 'white' : COLORS.Rhino
                                // }}

                            >All</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className=' flex-1' onPress={() => {
                        setChoosenTab(1)
                    }}>
                        <View className={` py-2 rounded-2xl ${choosenTab == 1 ? 'bg-[#2a475e] dark:bg-[#66C0F4]' : 'bg-transparent'}`}
                            style={{
                                // backgroundColor: choosenTab == 1 ? COLORS.Rhino : 'transparent',
                            }}>
                            <Text className={`text-center  text-sm font-semibold ${choosenTab == 1 ? 'text-white ' : 'text-[#2A475E] dark:text-white'}`}
                                // style={{
                                //     color: choosenTab == 1 ? 'white' : COLORS.Rhino
                                // }}

                            >On Progress</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className=' flex-1' onPress={() => {
                        setChoosenTab(2)
                    }}>
                        <View className={` py-2 rounded-2xl ${choosenTab == 2 ? 'bg-[#2a475e] dark:bg-[#66C0F4]' : 'bg-transparent'}`}
                            style={{
                                // backgroundColor: choosenTab == 2 ? COLORS.Rhino : 'transparent',
                            }}>
                            <Text className={`text-center  text-sm font-semibold ${choosenTab == 2 ? 'text-white ' : 'text-[#2A475E] dark:text-white'}`}
                                // style={{
                                //     color: choosenTab == 2 ? 'white' : COLORS.Rhino
                                // }}

                            >Completed</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ProgressTab