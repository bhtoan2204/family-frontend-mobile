import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator, FlatList, TextInput, Dimensions, SafeAreaView, StatusBar, ScrollView } from 'react-native'
import { Guildline } from 'src/interface/guideline/guideline'
import { GuildLineScreenProps } from 'src/navigation/NavigationTypes'
import GuildLineService from 'src/services/apiclient/GuildLineService'
import Icon from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants'

import RBSheet from 'react-native-raw-bottom-sheet'

import GuildlineItem from './GuildlineItem/GuildlineItem'
import { iOSColors, iOSGrayColors } from 'src/constants/ios-color'
import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/redux/store'
import { clearGuideline, setGuideline } from 'src/redux/slices/GuidelineSlice'
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'
import AddGuidelineSheet from 'src/components/user/guideline/sheet/add-guideline-sheet'
import UpdateGuidelineSheet from 'src/components/user/guideline/sheet/update-guideline-sheet'
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice'
import { ScreenHeight } from 'react-native-elements/dist/helpers'
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
    updated_at: '2024-04-30T08:59:03.177Z',
    is_shared: false,
}



const GuildLineScreen: React.FC<GuildLineScreenProps> = ({ navigation, route }) => {
    const { id_family } = route.params
    // const [guidelines, setGuidelines] = React.useState<Guildline[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const guidelines = useSelector((state: RootState) => state.guidelines)
    const [loading, setLoading] = React.useState(true);
    const refRBSheet = React.useRef<any>(null);
    const [tab, setTab] = React.useState(0);
    const addGuidelineBottomSheetRef = React.useRef<BottomSheet>(null);
    const updateGuidelineBottomSheetRef = React.useRef<BottomSheet>(null);

    const [pickedIdGuideline, setPickedIdGuideline] = React.useState<number>(-1);
    const [pickedNameGuideline, setPickedNameGuideline] = React.useState<string>('');
    const [pickedDescriptionGuideline, setPickedDescriptionGuideline] = React.useState<string>('');

    const [isScrollDown, setIsScrollDown] = React.useState<boolean>(false)
    const isDarkMode = useSelector(getIsDarkMode)
    const scrollYRef = React.useRef<any>(0);


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
        return <View className='flex-1 justify-center items-center bg-[#fff] dark:bg-[#0A1220]'>
            <ActivityIndicator style={{ justifyContent: 'center' }} size="small" />
        </View>;
    }

    const renderEmptyGuideline = () => {
        const emptyGuidelineName = 'Add a guideline';
        const emptyGuidelineDescription = 'Tap here to add a guideline';
        const emptyGuideline: Guildline = {
            id_guide_item: -1,
            id_family: -1,
            name: emptyGuidelineName,
            description: emptyGuidelineDescription,
            created_at: '',
            updated_at: '',
            is_shared: false,
        }
        return <GuildlineItem item={emptyGuideline}
            onPress={() => {
                addGuidelineBottomSheetRef.current?.expand()
            }}
            onUpdate={() => { }}
        />
    }

    return (
        <View className="flex-1 bg-[#F7F7F7] dark:bg-[#0A1220]">
            <StatusBar barStyle={
                isDarkMode ? 'light-content' : 'dark-content'
            } backgroundColor='transparent' translucent />
            <View className='w-full  flex-row justify-between items-center py-3 mt-7 '>
                <TouchableOpacity onPress={() => navigation.goBack()} className=' flex-row items-center'>
                    <Material name="chevron-left" size={30} style={{ color: COLORS.AuroMetalSaurus, fontWeight: "bold" }} />
                    {/* <Text className='text-lg font-semibold text-gray-600' style={{ color: COLORS.AuroMetalSaurus }}>Back</Text> */}
                </TouchableOpacity>
                {/* <View className='mr-3'>
                        <TouchableOpacity onPress={() => {
                            addGuidelineBottomSheetRef.current?.expand()

                        }} >
                            <Text className='text-lg font-semibold' style={{ color: COLORS.AuroMetalSaurus }}>Add</Text>
                        </TouchableOpacity>
                    </View> */}
            </View>

            <ScrollView className='pt-2' showsVerticalScrollIndicator={false}
                ref={scrollYRef}
                onScroll={(event) => {
                    // 0 means the top of the screen, 100 would be scrolled 100px down
                    const currentYPosition = event.nativeEvent.contentOffset.y
                    const oldPosition = scrollYRef.current

                    if (oldPosition < currentYPosition) {
                        // we scrolled down
                        // console.log(1)
                        setIsScrollDown(true)
                    } else {
                        // we scrolled up
                        // console.log(2)
                        setIsScrollDown(false)

                    }
                    // save the current position for the next onScroll event
                    scrollYRef.current = currentYPosition
                }}
            >
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
                        borderBottomColor: tab == 1 ? (isDarkMode ? 'white' : 'black') : undefined,
                        borderBottomWidth: tab == 1 ? 2 : undefined,
                    }} onPress={() => {
                        setTab(1)
                    }}>
                        <Text className='text-black dark:text-white' style={{
                            fontWeight: 'bold'
                        }}>Shared guidelines</Text>
                    </TouchableOpacity>
                </View>
                <Animatable.View animation={tab == 0 ? 'slideInLeft' : 'slideInRight'} key={tab} duration={400} className='' style={{

                }}>
                    {
                        tab == 0 ? <>
                            {
                                guidelines.length > 0 ? guidelines.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <GuildlineItem item={item}
                                            onPress={() => {
                                                navigation.navigate('GuildLineDetail', { id_family: id_family, id_item: item.id_guide_item })
                                            }}
                                            key={index}
                                            onUpdate={() => {
                                                setPickedIdGuideline(item.id_guide_item);
                                                setPickedNameGuideline(item.name);
                                                setPickedDescriptionGuideline(item.description);
                                                updateGuidelineBottomSheetRef.current?.expand()

                                            }}
                                        />
                                    </React.Fragment>
                                )) : renderEmptyGuideline()
                            }

                        </> : <>
                            <GuildlineItem item={guildLineData}
                                onPress={() => {
                                    navigation.navigate('GuildLineDetail', { id_family: id_family, id_item: 1 })
                                }}
                                onUpdate={() => { }}
                            />
                        </>
                    }
                </Animatable.View>
            </ScrollView>
            <TouchableOpacity className={`absolute rounded-full  bottom-5 right-5  bg-[#66C0F4] items-center justify-center transition ${isScrollDown ? "opacity-30" : ""}`} style={{
                width: ScreenHeight * 0.085,
                height: ScreenHeight * 0.085,
            }}
                onPress={() => {
                    addGuidelineBottomSheetRef.current?.expand()
                }}
            >
                <Material name='plus' size={30} color='white' />
            </TouchableOpacity>
            {/* <GuildlineItem item={guildLineData} onPress={() => {
                    navigation.navigate('SharedGuildLine', { id_family: id_family, id_item: guildLineData.id_item })
                }} /> */}
            {/* <AddGuildLineSheet refRBSheet={refRBSheet} /> */}
            <AddGuidelineSheet bottomSheetRef={addGuidelineBottomSheetRef} id_family={id_family!}
            />
            <UpdateGuidelineSheet bottomSheetRef={updateGuidelineBottomSheetRef} id_family={id_family!}
                description={pickedDescriptionGuideline}
                id_item={pickedIdGuideline}
                name={pickedNameGuideline}

            />
        </View>
    )
}

export default GuildLineScreen