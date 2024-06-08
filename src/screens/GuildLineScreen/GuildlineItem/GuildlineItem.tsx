import React from 'react'
import { TouchableOpacity, Image, View, Text } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MemberIcon from 'src/assets/images/diversity.png'
import { COLORS } from 'src/constants'
import Icon from 'react-native-vector-icons/Ionicons';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color'
const GuildlineItem = ({ item, onPress }: any) => {
    const handleDelete = () => {

        console.log("Deleting item with id:", item.id_item);
    };
    const renderLeftActions = () => (
        <View className='mb-3 flex-row items-center w-[40%]'>
            <TouchableOpacity onPress={handleDelete} style={{ backgroundColor: iOSColors.systemOrange.accessibleDark, width: "auto" }} className='flex-1 flex-row items-center h-full py-6 justify-center border-r-[1px] border-white' >
                {/* py-6 px-2  mb-3 */}
                <View className='flex-col items-center'>
                    <Icon name="pencil-outline" size={20} color={"white"} style={{ marginHorizontal: 4 }} />
                    <Text style={{ color: 'white', }} >Update</Text>
                </View>

            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={{ backgroundColor: '#EF3B4F', width: "auto" }} className='flex-1 flex-row items-center h-full py-6  justify-center border-r-[1px] border-white' >
                {/* py-6 px-2  mb-3 */}
                <View className='flex-col items-center '>
                    <Icon name="trash" size={20} color={"white"} style={{ marginHorizontal: 4 }} />
                    <Text style={{ color: 'white', }} >Delete</Text>
                </View>
            </TouchableOpacity>

        </View>
    );
    return (
        <View className='mx-2'>
            <Swipeable
                renderRightActions={renderLeftActions}
                overshootRight={false}

            >
                <TouchableOpacity
                    className="flex-row items-center py-6   bg-white mb-3 "
                    onPress={() => onPress()}

                >
                    <Image
                        source={MemberIcon} // assuming first step image is available
                        width={70}
                        height={70}
                        className="w-16 h-16 mr-4 ml-1 "
                    />
                    <View className="flex-grow">
                        <View className='flex-1 flex-row'>
                            <Text className="text-xl font-bold flex-1 flex-wrap" style={{ color: iOSGrayColors.systemGray.accessibleLight }}>{item.name}</Text>
                        </View>
                        <View className='flex-1 flex-row'>
                            <Text className="text-sm  flex-1 flex-wrap" style={{ color: iOSGrayColors.systemGray.accessibleLight }} >{item.description}</Text>
                        </View>
                    </View>
                    <Icon name="chevron-forward" size={20} color={"grey"} />


                </TouchableOpacity>
            </Swipeable>
        </View>

    )
}

export default GuildlineItem