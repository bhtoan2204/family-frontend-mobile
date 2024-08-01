import React from 'react'
import { TouchableOpacity, Image, View, Text, Dimensions, Alert } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MemberIcon from 'src/assets/images/diversity.png'
import { COLORS } from 'src/constants'
import Icon from 'react-native-vector-icons/Ionicons';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color'
import { AppDispatch } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteGuideline } from 'src/redux/slices/GuidelineSlice';
import ImageComponent from 'src/components/Image/Image';
import { Guildline } from 'src/interface/guideline/guideline';
import { shared_guideline_img } from 'src/assets/images/guideline_assets/item';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';
interface GuildlineItemProps {
    item: Guildline;
    onPress?: () => void;
    onUpdate?: () => void;
    index: number
}

const screenHeight = Dimensions.get('screen').height
const screenWidth = Dimensions.get('screen').width

const SharedGuildlineItem = ({ item, onPress, onUpdate, index }: GuildlineItemProps) => {
    const isDarkMode = useSelector(getIsDarkMode)
    const buildCreatedAt = () => {
        const date = new Date(item.created_at)
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }
    return (
        <View className='mx-4 '>
            <TouchableOpacity
                className="flex-row items-center py-4 rounded-lg mb-3 border-[#DEDCDC] dark:border-[#252D3B]"
                onPress={() => {
                    onPress ? onPress() : null
                }}
                style={{
                    borderWidth: 1,
                    borderColor: isDarkMode ? '#232A3D': "#CFCFCF",
                }}
            >
                {/* <Image
                        source={MemberIcon} // assuming first step image is available
                        width={70}
                        height={70}
                        className="w-16 h-16 mr-4 ml-1 "
                    /> */}
                <ImageComponent defaultImage={shared_guideline_img[index % shared_guideline_img.length]}
                    imageUrl={
                        item.steps == null
                            ? ""
                            : item.steps.length == 0
                                ? ""
                                : item.steps[0].imageUrl || ""
                    }
                    style={{
                        width: screenHeight * 0.14,
                        height: screenHeight * 0.14,
                        borderRadius: 8,
                    }}
                    className="w-20 h-20 mr-4 ml-4 "
                />

                <View className="flex-grow ">
                    <View className='flex-1 flex-row '>
                        <Text className="text-xl font-bold flex-1 flex-wrap text-[#292828] dark:text-white" numberOfLines={1} >{item.name}</Text>
                    </View>
                    <View className='flex-1 flex-row mr-2'>
                        <Text className="text-sm  flex-1 flex-wrap text-[#5C5C5C] dark:text-[#8D94A5]" numberOfLines={1} >{item.description}</Text>
                    </View>
                    <View className='flex-1 flex-row mr-2 items-center'>
                        <View className='mr-2'>
                            <Material name="calendar-blank-outline" size={20} color={
                                isDarkMode ? "#5C5C5C" : "#8D94A5"
                            } />

                        </View>
                        <Text className="text-sm  flex-1 flex-wrap text-[#5C5C5C] dark:text-[#8D94A5]" numberOfLines={1} >{buildCreatedAt()}</Text>
                    </View>
                </View>
                {/* <Icon name="chevron-forward" size={20} color={"grey"} /> */}


            </TouchableOpacity>
        </View>

    )
}

export default SharedGuildlineItem