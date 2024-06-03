import React from 'react'
import { TouchableOpacity, Image, View, Text } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import MemberIcon from 'src/assets/images/diversity.png'
import { COLORS } from 'src/constants'
import Icon from 'react-native-vector-icons/Ionicons';
const GuildlineItem = ({ item, onPress }: any) => {
    const handleDelete = () => {

        console.log("Deleting item with id:", item.id_item);
    };
    const renderLeftActions = () => (
        <TouchableOpacity onPress={handleDelete} style={{ backgroundColor: '#EF3B4F', width: "auto" }} className='flex-row items-center py-6 px-2  mb-2' >
            <View className='flex-row items-center'>
                <Icon name="trash" size={20} color={"white"} style={{ marginHorizontal: 4 }} />
                <Text style={{ color: 'white', fontWeight: 'bold' }} >Delete</Text>
            </View>
        </TouchableOpacity>
    );
    return (
        <View className='mx-2'>
            <Swipeable
                renderRightActions={renderLeftActions}
                overshootRight={false}

            >
                <TouchableOpacity
                    className="flex-row items-center py-5   bg-white mb-2 "
                    onPress={() => onPress()}

                >
                    <Image
                        source={MemberIcon} // assuming first step image is available
                        width={70}
                        height={70}
                        className="w-16 h-16 mr-4 ml-1  "
                    />
                    <View className="flex-grow">
                        <View className='flex-1 flex-row'>
                            <Text className="text-xl font-bold flex-1 flex-wrap" style={{ color: COLORS.AuroMetalSaurus }}>{item.name}</Text>
                        </View>
                        <View className='flex-1 flex-row'>
                            <Text className="text-sm text-gray-600 flex-1 flex-wrap" >{item.description}</Text>
                        </View>
                    </View>
                    <Icon name="chevron-forward" size={20} color={"grey"} />


                </TouchableOpacity>
            </Swipeable>
        </View>

    )
}

export default GuildlineItem