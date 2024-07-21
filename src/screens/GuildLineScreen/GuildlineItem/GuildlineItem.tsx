import React from 'react'
import { TouchableOpacity, Image, View, Text, Dimensions, Alert } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MemberIcon from 'src/assets/images/diversity.png'
import { COLORS } from 'src/constants'
import Icon from 'react-native-vector-icons/Ionicons';
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color'
import { AppDispatch } from 'src/redux/store';
import { useDispatch } from 'react-redux';
import { deleteGuideline } from 'src/redux/slices/GuidelineSlice';
import ImageComponent from 'src/components/Image/Image';
import { Guildline } from 'src/interface/guideline/guideline';

interface GuildlineItemProps {
    item: Guildline;
    onPress: () => void;
    onUpdate: () => void;
}

const screenHeight = Dimensions.get('screen').height
const screenWidth = Dimensions.get('screen').width

const GuildlineItem = ({ item, onPress, onUpdate }: GuildlineItemProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const itemRef = React.useRef<Swipeable>(null);
    const handleDelete = () => {
        // console.log("Deleting item with id:", item.id_item);
        dispatch(deleteGuideline(item.id_guide_item))
        itemRef.current?.close();
    };
    const handleDeleteUi = () => {
        Alert.alert(
            "Delete Guideline",
            "Are you sure you want to delete this guideline?",
            [

                { text: "Confirm", onPress: () => handleDelete() },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "destructive"
                },
            ],
            { cancelable: true }
        )
    }
    const handleUpdate = () => {
        // itemRef.current?.close();
        onUpdate();
    }
    const renderLeftActions = () => (
        <View className='mb-3 flex-row items-center w-[40%]'>
            <TouchableOpacity onPress={handleUpdate} style={{ backgroundColor: iOSColors.systemOrange.accessibleDark, width: "auto" }} className='flex-1 flex-row items-center h-full py-6 justify-center border-r-[1px] border-white' >
                {/* py-6 px-2  mb-3 */}
                <View className='flex-col items-center'>
                    <Icon name="pencil-outline" size={20} color={"white"} style={{ marginHorizontal: 4 }} />
                    <Text style={{ color: 'white', }} >Update</Text>
                </View>

            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeleteUi} style={{ backgroundColor: '#EF3B4F', width: "auto" }} className='flex-1 flex-row items-center h-full py-6  justify-center border-r-[1px] border-white' >
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
                ref={itemRef}
            >
                <TouchableOpacity
                    className="flex-row items-center py-6 rounded-lg   bg-white mb-3 "
                    onPress={() => onPress()}
                    style={{
                        borderWidth: 0.5,
                        borderColor: iOSGrayColors.systemGray6.accessibleLight,
                    }}
                >
                    {/* <Image
                        source={MemberIcon} // assuming first step image is available
                        width={70}
                        height={70}
                        className="w-16 h-16 mr-4 ml-1 "
                    /> */}
                    <ImageComponent defaultImage={MemberIcon}
                        imageUrl={
                            item.steps == null
                                ? ""
                                : item.steps.length == 0
                                    ? ""
                                    : item.steps[0].imageUrl || ""
                        }
                        style={{
                            width: screenHeight * 0.1,
                            height: screenHeight * 0.1,
                        }}
                        className="w-16 h-16 mr-4 ml-1 "
                    />

                    <View className="flex-grow">
                        <View className='flex-1 flex-row my-2'>
                            <Text className="text-xl font-bold flex-1 flex-wrap" numberOfLines={1} style={{ color: iOSGrayColors.systemGray.accessibleLight }}>{item.name}</Text>
                        </View>
                        <View className='flex-1 flex-row'>
                            <Text className="text-sm  flex-1 flex-wrap" numberOfLines={2} style={{ color: iOSGrayColors.systemGray.accessibleLight }} >{item.description}</Text>
                        </View>
                    </View>
                    <Icon name="chevron-forward" size={20} color={"grey"} />


                </TouchableOpacity>
            </Swipeable>
        </View>

    )
}

export default GuildlineItem