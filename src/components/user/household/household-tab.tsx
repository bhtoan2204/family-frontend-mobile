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
        <View className=' items-center  rounded-2xl mx-[7%]  bg-[#f7f7f7]'
            style={{
                borderWidth: 1,
                borderColor: iOSGrayColors.systemGray5.defaultLight,
            }}
        >
            <View className='m-1 '>
                <View className='flex-row items-center justify-around w-full  '>
                    <TouchableOpacity className=' flex-1' onPress={() => {
                        setChoosenTab(0)
                    }}>
                        <View className=' py-2 rounded-2xl'
                            style={{
                                backgroundColor: choosenTab == 0 ? COLORS.Rhino : 'transparent',
                            }}>
                            <Text className='text-center  text-sm font-semibold '
                                style={{
                                    color: choosenTab == 0 ? 'white' : COLORS.Rhino
                                }}

                            >Areas</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className=' flex-1' onPress={() => {
                        setChoosenTab(1)
                    }}>
                        <View className=' py-2 rounded-2xl'
                            style={{
                                backgroundColor: choosenTab == 1 ? COLORS.Rhino : 'transparent',
                            }}>
                            <Text className='text-center text-sm font-semibold '
                                style={{
                                    color: choosenTab == 1 ? 'white' : COLORS.Rhino
                                }}

                            >Items</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className=' flex-1' onPress={() => {
                        setChoosenTab(2)
                    }}>
                        <View className=' py-2 rounded-2xl'
                            style={{
                                backgroundColor: choosenTab == 2 ? COLORS.Rhino : 'transparent',
                            }}>
                            <Text className='text-center  text-sm font-semibold '
                                style={{
                                    color: choosenTab == 2 ? 'white' : COLORS.Rhino
                                }}

                            >Categories</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default HouseHoldTab