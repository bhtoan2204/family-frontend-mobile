import React, { useEffect, lazy } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator, FlatList, TextInput, Dimensions, SafeAreaView, StatusBar, ScrollView, LogBox, RefreshControl } from 'react-native'
import { Guildline } from 'src/interface/guideline/guideline'
import { GuildLineScreenProps } from 'src/navigation/NavigationTypes'
import GuildLineService from 'src/services/apiclient/GuildLineService'
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants'


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
import { useToast } from 'react-native-toast-notifications'
import { getTranslate } from 'src/redux/slices/languageSlice'
import { updateGuidelineId } from 'src/redux/slices/HouseHoldDetailSlice'

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'source.uri should not be an empty string',
]);

const MapGuidelines = lazy(() => import('src/components/user/guideline/guidelines/guidelines'))
const PublicGuidelines = lazy(() => import('src/components/user/guideline/guidelines/public-guidelines'))

const GuildLineScreen: React.FC<GuildLineScreenProps> = ({ navigation, route }) => {
  const { id_family, id_household_item, openSheet, onAddCallback } = route.params
  // const [guidelines, setGuidelines] = React.useState<Guildline[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const guidelines = useSelector((state: RootState) => state.guidelines)
  // const publicguidelines = guidelines.filter((item) => item.is_shared)
  const [loading, setLoading] = React.useState(true);
  const [tab, setTab] = React.useState(0);
  const addGuidelineBottomSheetRef = React.useRef<BottomSheet>(null);
  const updateGuidelineBottomSheetRef = React.useRef<BottomSheet>(null);

  const [pickedIdGuideline, setPickedIdGuideline] = React.useState<number>(-1);
  const [pickedNameGuideline, setPickedNameGuideline] = React.useState<string>('');
  const [pickedDescriptionGuideline, setPickedDescriptionGuideline] = React.useState<string>('');

  const [isScrollDown, setIsScrollDown] = React.useState<boolean>(false)
  const isDarkMode = useSelector(getIsDarkMode)
  const scrollYRef = React.useRef<any>(0);
  const toast = useToast()
  const translate = useSelector(getTranslate)
  const publicGuidelines = React.useMemo(() => {
    return guidelines.filter((item) => item.is_shared)
  }, [guidelines])
  const fetchGuidelines = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await GuildLineService.getAllGuideLine(id_family!); // API call to fetch all guidelines
      if (response) {
        dispatch(setGuideline(response));
      }
      else {
        dispatch(setGuideline([]));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching guidelines:', error);
      setLoading(false);
    }
  }, [id_family]);
  useEffect(() => {
    fetchGuidelines();

    return () => {
      console.log("clear guideline")
      dispatch(clearGuideline())
    }
  }, []);

  const renderEmptyGuideline = React.useCallback(() => {
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
      index={0}
      onPress={() => {
        addGuidelineBottomSheetRef.current?.expand()
      }}
      onUpdate={() => { }}
    />
  }, [])


  // if (loading) {
  //   return <View className='flex-1 justify-center items-center bg-[#fff] dark:bg-[#0A1220]'>
  //     <ActivityIndicator style={{ justifyContent: 'center' }} size="small" />
  //   </View>;
  // }



  return (
    <View className="flex-1 bg-[#F7F7F7] dark:bg-[#0A1220]">
      <StatusBar barStyle={
        isDarkMode ? 'light-content' : 'dark-content'
      } backgroundColor='transparent' translucent />
      <View className='w-full  flex-row justify-between items-center py-3 mt-7 '>
        <TouchableOpacity onPress={() => navigation.goBack()} className=' flex-row items-center'>
          <Material name="chevron-left" size={30} style={{ color: COLORS.AuroMetalSaurus, fontWeight: "bold" }} />
        </TouchableOpacity>

      </View>

      <ScrollView className='pt-2'
        showsVerticalScrollIndicator={false}
        ref={scrollYRef}
        onScroll={(event) => {
          const currentYPosition = event.nativeEvent.contentOffset.y
          const oldPosition = scrollYRef.current

          if (oldPosition < currentYPosition) {
            setIsScrollDown(true)
          } else {
            setIsScrollDown(false)
          }
          scrollYRef.current = currentYPosition
        }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchGuidelines}
          />
        }
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
            }}>{
                translate('guideline_screen_guideline_text')
              }</Text>
          </TouchableOpacity>
          <TouchableOpacity className='flex-1  py-3 items-center justify-center ' style={{
            borderBottomColor: tab == 1 ? (isDarkMode ? 'white' : 'black') : undefined,
            borderBottomWidth: tab == 1 ? 2 : undefined,
          }} onPress={() => {
            setTab(1)
          }}>
            <Text className='text-black dark:text-white' style={{
              fontWeight: 'bold'
            }}>{
                translate('guideline_screen_shared_guideline_text')
              }</Text>
          </TouchableOpacity>
        </View>
        {
          loading ? <View className='flex-1 justify-center items-center h-full mt-14'>
            <ActivityIndicator style={{ justifyContent: 'center' }} size="small" />
          </View>
            :
            <View className='' style={{

            }}>
              <>
                {
                  tab == 0 && <>
                    {
                      guidelines.length > 0 ? <MapGuidelines
                        data={guidelines}
                        onPress={(item: Guildline) => {
                          navigation.navigate('GuildLineDetail', { id_family: id_family, id_item: item.id_guide_item })
                        }}
                        onUpdate={(item: Guildline) => {
                          setPickedIdGuideline(item.id_guide_item);
                          setPickedNameGuideline(item.name);
                          setPickedDescriptionGuideline(item.description);
                          updateGuidelineBottomSheetRef.current?.expand()

                        }}

                      /> : renderEmptyGuideline()
                    }
                  </>
                }
              </>
              <>
                {
                  tab == 1 && <>
                    {
                      <MapGuidelines
                        data={publicGuidelines}
                        onPress={(item: Guildline) => {
                          navigation.navigate('GuildLineDetail', { id_family: id_family, id_item: item.id_guide_item })
                        }}
                        onUpdate={(item: Guildline) => {
                          setPickedIdGuideline(item.id_guide_item);
                          setPickedNameGuideline(item.name);
                          setPickedDescriptionGuideline(item.description);
                          updateGuidelineBottomSheetRef.current?.expand()

                        }}

                      />
                    }
                  </>
                }
              </>
            </View>
        }
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
      <AddGuidelineSheet
        appearsOnIndex={openSheet}
        bottomSheetRef={addGuidelineBottomSheetRef}
        id_family={id_family!}
        id_household_item={id_household_item}
        onAddSuccess={
          () => {
            if (id_household_item) {
              //reset id_household_item and openSheet to null
              navigation.setParams({ id_household_item: undefined, openSheet: false })

              // onUpdateSuccess()
              navigation.goBack()
            }
            toast.show("New guideline added", {
              type: "success",
              duration: 2000,
              icon: <Material name="check" size={24} color={"white"} />,
            });
          }
        }
        onAddSuccessCallback={(id_guide_item: number) => {
          if (id_household_item) {
            // route.params.onGoBack(id_guide_item);
            dispatch(updateGuidelineId(id_guide_item))
            // onAddCallback(id_guide_item)
          }
        }}
        onAddFailed={
          () => {
            toast.show("Failed to add new guideline", {
              type: "error",
              duration: 2000,
              icon: <Material name="close" size={24} color={"white"} />,
            });
          }
        }
      />
      <UpdateGuidelineSheet bottomSheetRef={updateGuidelineBottomSheetRef} id_family={id_family!}
        description={pickedDescriptionGuideline}
        id_item={pickedIdGuideline}
        name={pickedNameGuideline}
        onUpdateSuccess={
          () => {
            toast.show("Guideline updated", {
              type: "success",
              duration: 2000,
              icon: <Material name="check" size={24} color={"white"} />,
            });
          }
        }
        onUpdateFailed={
          () => {
            toast.show("Failed to update guideline", {
              type: "error",
              duration: 2000,
              icon: <Material name="close" size={24} color={"white"} />,
            });
          }
        }

      />
    </View>
  )
}

export default GuildLineScreen