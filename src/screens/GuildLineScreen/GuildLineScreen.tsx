import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator, FlatList, TextInput, Dimensions, SafeAreaView, StatusBar, ScrollView } from 'react-native'
import { Guildline } from 'src/interface/guideline/guideline'
import { GuildLineScreenProps } from 'src/navigation/NavigationTypes'
import GuildLineService from 'src/services/apiclient/GuildLineService'
import Icon from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants'

import RBSheet from 'react-native-raw-bottom-sheet'
import AddGuildLineSheet from './AddGuildLineSheet/AddGuildLineSheet'

import GuildlineItem from './GuildlineItem/GuildlineItem'
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color'
import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { clearGuideline, setGuideline } from 'src/redux/slices/GuidelineSlice'
// id_item: number;
//   name: string;
//   description: string;
//   created_at: string;
//   updated_at: string;
const guildLineData: Guildline = {
    id_guide_item: 1,
    id_family: 96,
    name: 'Shared guideline',
    description: 'This is the shared guideline',
    created_at: '2024-04-30T08:59:03.177Z',
    updated_at: '2024-04-30T08:59:03.177Z'
}

const GuildLineScreen: React.FC<GuildLineScreenProps> = ({ navigation, route }) => {
    const { id_family } = route.params
    // const [guidelines, setGuidelines] = React.useState<Guildline[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const guidelines = useSelector((state: RootState) => state.guidelines)
    const [loading, setLoading] = React.useState(true);
    const refRBSheet = React.useRef<any>(null);
    const [tab, setTab] = React.useState(0);

    useEffect(() => {
        const fetchGuidelines = async () => {
            try {
                const response = await GuildLineService.getAllGuideLine(id_family!); // API call to fetch all guidelines
                console.log(response)
                if (response) {
                    dispatch(setGuideline(response));
                    // setGuidelines(response);
                }
                else {
                    dispatch(setGuideline([]));
                    // setGuidelines([]);
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

        return () => {
            console.log("clear guideline")
            dispatch(clearGuideline())
        }
    }, []);

    if (loading) {
        return <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} size="small" />;
    }

    return (
        <SafeAreaView className="flex-1 bg-[#F7F7F7]">
            <View className="flex-1 bg-[#F7F7F7]">
                <View className='w-full  flex-row justify-between items-center py-3 bg-white'>
                    <TouchableOpacity onPress={() => navigation.goBack()} className=' flex-row items-center'>
                        <Material name="chevron-left" size={30} style={{ color: COLORS.AuroMetalSaurus, fontWeight: "bold" }} />
                        {/* <Text className='text-lg font-semibold text-gray-600' style={{ color: COLORS.AuroMetalSaurus }}>Back</Text> */}
                    </TouchableOpacity>
                    <View className='mr-3'>
                        <TouchableOpacity onPress={() => {
                            // refRBSheet.current?.open()
                            navigation.navigate('AddGuildLine', { id_family: id_family })

                        }} >
                            {/* <Material name="plus" size={24} style={{ color: COLORS.primary, fontWeight: "bold" }} className='font-semibold' /> */}
                            <Text className='text-lg font-semibold' style={{ color: COLORS.AuroMetalSaurus }}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView className='pt-2' showsVerticalScrollIndicator={false}>
                    <View className='flex-row px-3 py-2'>
                        <TouchableOpacity className='flex-1 py-3 items-center justify-center ' style={{
                            // backgroundColor: iOSGrayColors.systemGray6.defaultLight
                            borderBottomColor: tab == 0 ? iOSColors.systemBlue.defaultLight : undefined,
                            borderBottomWidth: tab == 0 ? 2 : undefined,

                        }} onPress={() => {
                            setTab(0)
                        }}>
                            <Text style={{
                                color: iOSColors.systemBlue.defaultLight,
                                fontWeight: 'bold'
                            }}>Guidelines</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='flex-1  py-3 items-center justify-center ' style={{
                            borderBottomColor: tab == 1 ? 'black' : undefined,
                            borderBottomWidth: tab == 1 ? 2 : undefined,
                        }} onPress={() => {
                            setTab(1)
                        }}>
                            <Text style={{
                                fontWeight: 'bold'
                            }}>Shared guidelines</Text>
                        </TouchableOpacity>
                    </View>
                    <Animatable.View animation={tab == 0 ? 'slideInLeft' : 'slideInRight'} key={tab} duration={400} className='' style={{

                    }}>
                        {
                            tab == 0 ? <>
                                {
                                    guidelines.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <GuildlineItem item={item}
                                                onPress={() => {
                                                    navigation.navigate('GuildLineDetail', { id_family: id_family, id_guide_item: item.id_guide_item })
                                                }}
                                                key={index}
                                                onUpdate={() => {
                                                    navigation.navigate('UpdateGuildLine', {
                                                        id_family: id_family, id_item: item.id_guide_item,
                                                        title: item.name, description: item.description
                                                    })
                                                }}
                                            />
                                        </React.Fragment>
                                    ))
                                }

                            </> : <>
                                <GuildlineItem item={guildLineData}
                                    onPress={() => {
                                        navigation.navigate('SharedGuildLine', { id_family: id_family, id_item: guildLineData.id_guide_item })
                                    }}
                                    onUpdate={() => { }}
                                />
                            </>
                        }
                    </Animatable.View>
                </ScrollView>
                {/* <GuildlineItem item={guildLineData} onPress={() => {
                    navigation.navigate('SharedGuildLine', { id_family: id_family, id_item: guildLineData.id_item })
                }} /> */}
                <AddGuildLineSheet refRBSheet={refRBSheet} />
            </View>
        </SafeAreaView>
    )
}

export default GuildLineScreen