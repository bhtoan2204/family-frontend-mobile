import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { iOSGrayColors } from 'src/constants/ios-color';
import QuantityIcon from 'src/assets/images/household_assets/quantity.png';
import { Skeleton } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';

interface HouseHoldItemInfoBoxProps {
    title: string;
    children: React.ReactNode;
    onPress?: () => void;
    id: number
}
const HouseHoldItemInfoBox = ({
    title, children, onPress, id
}: HouseHoldItemInfoBoxProps) => {
    return <TouchableOpacity activeOpacity={0.65} className='w-[80%] border-[1px] mt-3  bg-white rounded-lg'
        style={{
            borderColor: iOSGrayColors.systemGray5.defaultLight,
        }}
        onPress={onPress}
    >
        <View>
            <View className='border-b' style={{
                borderColor: iOSGrayColors.systemGray4.defaultLight,
            }}>
                {
                    id != -1 ? <View className='flex-row items-center py-3 pl-3 '>
                        <Image source={QuantityIcon} style={{ width: 24, height: 24 }} />
                        <Text className='ml-2'>{title}</Text>
                    </View> : <>
                        <View className='flex-row items-center py-3 pl-3 '>
                            <Skeleton width={'80%'} height={30} style={{
                                borderRadius: 10
                            }} />
                        </View>
                    </>
                }
            </View>
            {children}
        </View>
    </TouchableOpacity>
}

export default HouseHoldItemInfoBox;