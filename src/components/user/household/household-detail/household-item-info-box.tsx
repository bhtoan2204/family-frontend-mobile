import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { iOSGrayColors } from 'src/constants/ios-color';
import QuantityIcon from 'src/assets/images/household_assets/quantity.png';
import { Skeleton } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import DescriptionIcon from 'src/assets/images/household_assets/description_iccon.png';


interface HouseHoldItemInfoBoxProps {
    title: string;
    children: React.ReactNode;
    onPress?: () => void;
    id: number
    iconImage: ImageSourcePropType
}
const HouseHoldItemInfoBox = ({
    title, children, onPress, id, iconImage
}: HouseHoldItemInfoBoxProps) => {
    return <TouchableOpacity activeOpacity={0.65} className='w-[80%]  mt-3  bg-white dark:bg-[#252D3B] rounded-lg'
        // style={{
        //     borderColor: iOSGrayColors.systemGray5.defaultLight,
        // }}
        onPress={onPress}
    >
        <View>
            <View className='border-b border-[#DEDCDC] dark:border-[#8D94A5]' style={{
                
            }}>
                {
                    id != -1 ? <View className='flex-row items-center py-3 pl-3 '>
                        <Image source={iconImage} style={{ width: 24, height: 24 }} />
                        <Text className='ml-2 text-[#2A475E] dark:text-white font-semibold '>{title}</Text>
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