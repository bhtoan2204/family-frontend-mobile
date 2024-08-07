import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Animated, Easing, TextInput } from 'react-native'
import { COLORS } from 'src/constants';
import { iOSGrayColors } from 'src/constants/ios-color';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
interface EducationTabProps {
    choosenTab: number;
    setChoosenTab: (tab: number) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const EducationTab = ({
    choosenTab,
    setChoosenTab,
    searchQuery,
    setSearchQuery
}: EducationTabProps
) => {
    const [isSearchVisible, setIsSearchVisible] = React.useState(false)
    const [searchAnimation] = React.useState(new Animated.Value(0));

    React.useEffect(() => {
        Animated.timing(searchAnimation, {
            toValue: isSearchVisible ? 1 : 0,
            duration: 100,
            // easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    }, [isSearchVisible]);


    const searchTranslateX = searchAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-200, 0]
    });

    return (
        <View className=' items-center  rounded-2xl mx-[7%]  bg-[#f7f7f7] dark:bg-[#252D3B] border-[1px] dark:border-[0px] overflow-hidden'
            style={{
                // borderWidth: 1,
                borderColor: iOSGrayColors.systemGray5.defaultLight,
                // borderColor: 'black'
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

                            >Public</Text>
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

                            >You</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className=' flex-1' onPress={() => {
                        // setChoosenTab(2)
                        setIsSearchVisible(true)
                    }}>
                        <View className={` py-2 rounded-2xl ${choosenTab == 2 ? 'bg-[#2a475e] dark:bg-[#66C0F4]' : 'bg-transparent'}`}
                            style={{
                            }}>
                            <Text className={`text-center  text-sm font-semibold ${choosenTab == 2 ? 'text-white ' : 'text-[#2A475E] dark:text-white'}`}


                            >Search</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {isSearchVisible && (
                <Animated.View className='h-full bg-[#f7f7f7] dark:bg-[#252D3B]' style={{
                    transform: [{ translateX: searchTranslateX }],
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    // backgroundColor: '#f7f7f7',
                    flexDirection: 'row',
                    alignItems: 'center',

                }}>
                    <View className='flex-row items-center background flex-1 h-full '>
                        <TextInput
                            placeholder="Search..."
                            className='bg-[#DFE1E2] dark:bg-[#252D3B] flex-1 h-full pl-10 text-[#2a475e] dark:text-white placeholder:text-[#2a475e] dark:placeholder:text-white'
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        <View className='flex-row items-center h-full'>

                            <TouchableOpacity className='bg-[#DFE1E2] dark:bg-[#252D3B] h-full justify-center items-center self-center pr-4' onPress={() => setSearchQuery("")}>
                                <Material name='close' size={20} color={iOSGrayColors.systemGray.accessibleDark
                                } />
                            </TouchableOpacity>
                            <TouchableOpacity className='bg-[#DFE1E2] dark:bg-[#252D3B] h-full justify-center items-center self-center pr-4' onPress={() => setIsSearchVisible(false)}>
                                <Text className='font-semibold text-[#2a475e] dark:text-white'>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            )}
        </View>
    )
}

export default EducationTab