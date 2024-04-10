import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator, FlatList, TextInput, Dimensions } from 'react-native'
import { Guildline } from 'src/interface/guideline/guideline'
import { GuildLineScreenProps } from 'src/navigation/NavigationTypes'
import GuildLineService from 'src/services/apiclient/GuildLineService'
import Icon from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants'
import MemberIcon from 'src/assets/images/diversity.png'
import RBSheet from 'react-native-raw-bottom-sheet'
const GuildLineScreen: React.FC<GuildLineScreenProps> = ({ navigation, route }) => {
    const { id_family } = route.params
    const [guidelines, setGuidelines] = React.useState<Guildline[]>([]);
    const [loading, setLoading] = React.useState(true);
    const refRBSheet = React.useRef<RBSheet>(null);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const fetchGuidelines = async () => {
        try {
            const response = await GuildLineService.getAllGuideLine(id_family!); // API call to fetch all guidelines
            setGuidelines(response);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching guidelines:', error);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchGuidelines();
    }, []);

    const renderItem = ({ item }: { item: any }) => (
        <>
            <TouchableOpacity
                className="flex-row items-center py-6 px-4 rounded-lg bg-white mb-2"
                onPress={() => navigation.navigate('GuildLineDetail', { id_family: id_family, id_item: item.id_item })}

            >
                <Image
                    source={MemberIcon} // assuming first step image is available
                    width={70}
                    height={70}
                    className="w-16 h-16 mr-4 ml-1  "
                />
                <View className="flex-grow">
                    <Text className="text-xl font-bold" style={{ color: COLORS.primary }}>{item.name}</Text>
                    <Text className="text-sm text-gray-600">{item.description}</Text>
                </View>
                <Icon name="chevron-forward" size={20} color={"grey"} />


            </TouchableOpacity>

        </>
    );

    if (loading) {
        return <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} size="small" />;
    }

    return (
        <View className="flex-1 bg-[#F7F7F7]">
            <View className='w-full  flex-row justify-between items-center py-3'>
                <TouchableOpacity onPress={() => navigation.goBack()} className=' flex-row items-center'>
                    <Material name="chevron-left" size={30} style={{ color: COLORS.primary, fontWeight: "bold" }} />
                    <Text className='text-lg font-semibold' style={{ color: COLORS.primary }}>Back</Text>
                </TouchableOpacity>
                <View className='mr-3'>
                    <TouchableOpacity onPress={() => {
                        refRBSheet.current?.open()

                    }} >
                        <Material name="plus" size={24} style={{ color: COLORS.primary, fontWeight: "bold" }} className='font-semibold' />

                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={guidelines}
                renderItem={renderItem}
                keyExtractor={(item) => item.id_item.toString()}
                className='mt-2'
            />
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    container: {
                        backgroundColor: "white",
                        padding: 20,
                        height: Dimensions.get("window").height / 2,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    },
                    draggableIcon: {
                        // borderBlockColor: "#0000",
                        display: "none",
                    }
                }}
            >
                <Text className='text-xl  font-semibold' style={{ color: COLORS.primary, marginBottom: 20, }}>Add New Guildline</Text>
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 5,
                        marginBottom: 20,
                        fontSize: 17,
                        padding: 17,
                    }}
                    editable
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    className=''
                />
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 5,
                        marginBottom: 20,
                        fontSize: 17,
                        padding: 17,
                    }}
                    placeholder="Description"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    numberOfLines={4}

                />
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        padding: 17,
                        borderRadius: 5,

                        alignItems: "center",
                    }}
                    onPress={() => {
                        // Xử lý logic khi nhấn nút "Save"
                        refRBSheet.current?.close();
                    }}
                >
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 17 }}>Save</Text>
                </TouchableOpacity>
            </RBSheet>
        </View>
    )
}

export default GuildLineScreen