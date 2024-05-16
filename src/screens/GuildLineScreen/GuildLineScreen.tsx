import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator, FlatList, TextInput, Dimensions } from 'react-native'
import { Guildline } from 'src/interface/guideline/guideline'
import { GuildLineScreenProps } from 'src/navigation/NavigationTypes'
import GuildLineService from 'src/services/apiclient/GuildLineService'
import Icon from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants'

import RBSheet from 'react-native-raw-bottom-sheet'
import AddGuildLineSheet from './AddGuildLineSheet/AddGuildLineSheet'

import GuildlineItem from './GuildlineItem/GuildlineItem'
// id_item: number;
//   name: string;
//   description: string;
//   created_at: string;
//   updated_at: string;
const guildLineData: Guildline = {
    id_item: 1,
    name: 'Shared guideline',
    description: 'This is the shared guideline',
    created_at: '2024-04-30T08:59:03.177Z',
    updated_at: '2024-04-30T08:59:03.177Z'
}

const GuildLineScreen: React.FC<GuildLineScreenProps> = ({ navigation, route }) => {
    const { id_family } = route.params
    const [guidelines, setGuidelines] = React.useState<Guildline[]>([]);
    const [loading, setLoading] = React.useState(true);
    const refRBSheet = React.useRef<RBSheet>(null);


    useEffect(() => {
        const fetchGuidelines = async () => {
            try {
                const response = await GuildLineService.getAllGuideLine(id_family!); // API call to fetch all guidelines
                if (response) {
                    setGuidelines(response);
                }
                else {
                    setGuidelines([]);
                }
                // setGuidelines(response);
                setLoading(false);

                console.log('Guidelines:', response)
            } catch (error) {
                console.error('Error fetching guidelines:', error);
                setLoading(false);
            }
        };
        fetchGuidelines();
    }, []);

    const renderItem = ({ item }: { item: any }) => (
        <>
            {/* <Swipeable

            >
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
            </Swipeable> */}
            <GuildlineItem item={item} onPress={() => {
                navigation.navigate('GuildLineDetail', { id_family: id_family, id_item: item.id_item })
            }} />
        </>
    );

    if (loading) {
        return <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} size="small" />;
    }

    return (
        <View className="flex-1 bg-[#F7F7F7]">
            <View className='w-full  flex-row justify-between items-center py-3 bg-white'>
                <TouchableOpacity onPress={() => navigation.goBack()} className=' flex-row items-center'>
                    <Material name="chevron-left" size={30} style={{ color: COLORS.primary, fontWeight: "bold" }} />
                    <Text className='text-lg font-semibold text-gray-600' style={{ color: COLORS.primary }}>Back</Text>
                </TouchableOpacity>
                <View className='mr-3'>
                    <TouchableOpacity onPress={() => {
                        refRBSheet.current?.open()

                    }} >
                        {/* <Material name="plus" size={24} style={{ color: COLORS.primary, fontWeight: "bold" }} className='font-semibold' /> */}
                        <Text className='text-lg font-semibold' style={{ color: COLORS.primary }}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={guidelines}
                renderItem={renderItem}
                keyExtractor={(item) => item.id_item.toString()}
                className='pt-2'
            />
            <GuildlineItem item={guildLineData} onPress={() => {
                navigation.navigate('SharedGuildLine', { id_family: id_family, id_item: guildLineData.id_item })
            }} />
            <AddGuildLineSheet refRBSheet={refRBSheet} setGuidelines={setGuidelines} />
        </View>
    )
}

export default GuildLineScreen