import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  TextInput,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import {Guildline} from 'src/interface/guideline/guideline';
import {
  GuildLineScreenProps,
  SharedGuidelineScreenProps,
} from 'src/navigation/NavigationTypes';
import GuildLineService from 'src/services/apiclient/GuildLineService';
import Icon from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from 'src/constants';

import RBSheet from 'react-native-raw-bottom-sheet';

import GuildlineItem from './GuildlineItem/GuildlineItem';
import {iOSColors, iOSGrayColors} from 'src/constants/ios-color';
import * as Animatable from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from 'src/redux/store';
import {clearGuideline, setGuideline} from 'src/redux/slices/GuidelineSlice';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import AddGuidelineSheet from 'src/components/user/guideline/sheet/add-guideline-sheet';
import UpdateGuidelineSheet from 'src/components/user/guideline/sheet/update-guideline-sheet';
import {getIsDarkMode} from 'src/redux/slices/DarkModeSlice';
import {ScreenHeight} from 'react-native-elements/dist/helpers';
import {useToast} from 'react-native-toast-notifications';
import SharedGuildlineItem from 'src/components/user/guideline/shared/shared-guideline-item';
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
};

const ShareGuildLineScreen: React.FC<SharedGuidelineScreenProps> = ({
  navigation,
  route,
}) => {
  // const { id_family } = route.params
  // const [guidelines, setGuidelines] = React.useState<Guildline[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [guidelines, setGuidelines] = React.useState<Guildline[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const itemsPerPage = 25;
  const [loadingMore, setLoadingMore] = React.useState(false);

  const isDarkMode = useSelector(getIsDarkMode);

  const fetchGuidelines = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await GuildLineService.getSharedGuidelines(
        page,
        itemsPerPage,
      ); // API call to fetch all guidelines
      console.log(response);
      if (response) {
        // dispatch(setGuideline(response));
        setGuidelines(response.guidelineData);
        // const totalItems = response.total
        // const totalPages = Math.ceil(totalItems / itemsPerPage)
        // setTotalPages(totalPages);
      } else {
        // dispatch(setGuideline([]));
        setGuidelines([]);
      }
      // setGuidelines(response);
      setLoading(false);

      console.log('Guidelines:', response);
    } catch (error) {
      //console.error('Error fetching guidelines:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGuidelines();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#fff] dark:bg-[#0A1220]">
        <ActivityIndicator style={{justifyContent: 'center'}} size="small" />
      </View>
    );
  }

  const renderEmptyGuideline = () => {
    return (
      <View>
        <Text
          className="text-center text-lg font-semibold"
          style={{color: COLORS.AuroMetalSaurus}}>
          No shared guideline
        </Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-[#F7F7F7] dark:bg-[#0A1220]">
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <View className="w-full  flex-row justify-between items-center py-3 mt-7 ">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className=" flex-row items-center">
          <Material
            name="chevron-left"
            size={30}
            style={{color: COLORS.AuroMetalSaurus, fontWeight: 'bold'}}
          />
          {/* <Text className='text-lg font-semibold text-gray-600' style={{ color: COLORS.AuroMetalSaurus }}>Back</Text> */}
        </TouchableOpacity>
        <View>
          <Text className="text-base font-semibold">Public Guidelines</Text>
        </View>
        <View className="mr-3 w-3 h-3">
          {/* <TouchableOpacity onPress={() => {
                        addGuidelineBottomSheetRef.current?.expand()

                    }} >
                        <Text className='text-lg font-semibold' style={{ color: COLORS.AuroMetalSaurus }}>Add</Text>
                    </TouchableOpacity> */}
        </View>
      </View>

      <ScrollView className="pt-2" showsVerticalScrollIndicator={false}>
        <View>
          {guidelines.length > 0
            ? guidelines.map((item, index) => (
                <React.Fragment key={index}>
                  <SharedGuildlineItem
                    item={item}
                    index={index}
                    onPress={() => {
                      navigation.navigate('SharedGuidelineDetail', {
                        id_guide_item: item.id_guide_item,
                        id_family: item.id_family,
                      });
                    }}
                  />
                </React.Fragment>
              ))
            : renderEmptyGuideline()}
        </View>
      </ScrollView>
    </View>
  );
};

export default ShareGuildLineScreen;
