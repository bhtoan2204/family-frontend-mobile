import {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
  FlatList,
} from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {FamilyServices, PackageServices} from 'src/services/apiclient';
import styles from './styles';
import {
  PurchasedScreenProps,
  ViewAllFamilyScreenProps,
} from 'src/navigation/NavigationTypes';
import {Profile} from 'src/redux/slices/ProfileSclice';
import {useDispatch, useSelector} from 'react-redux';
import {MaterialIcons} from '@expo/vector-icons';
import {COLORS} from 'src/constants';
import chat from 'src/assets/icons/chat.png';
import feedback from 'src/assets/icons/feedback.png';
import bundle from 'src/assets/icons/bundles.png';
import language from 'src/assets/icons/language.png';
import guideline from 'src/assets/icons/guideline.png';
import family from 'src/assets/icons/family.png';
import news from 'src/assets/icons/news.png';
import theme from 'src/assets/icons/theme.png';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UserProfile} from 'src/interface/user/userProfile';
import {RootState} from 'src/redux/store';
import {
  setFamilies,
  setFamilyMembers,
  setSelectedFamily,
} from 'src/redux/slices/FamilySlice';
import {Family} from 'src/interface/family/family';
import {setFamilyServices} from 'src/redux/slices/ServiceSlice';
import { getTranslate, selectLocale } from 'src/redux/slices/languageSlice';

const icons = {
  bundle,
  feedback,
  language,
  guideline,
  family,
  chat,
  news,
  theme,
};

type IconKey =
  | 'bundle'
  | 'calendar'
  | 'language'
  | 'feedback'
  | 'guideline'
  | 'family'
  | 'chat'
  | 'news'
  | 'theme';

interface Item {
  icon: IconKey;
  label: string;
  onPress: () => void;
}

const HomeScreen = ({
  navigation,
}: PurchasedScreenProps & ViewAllFamilyScreenProps) => {
  const scrollY = new Animated.Value(0);
  const width = Dimensions.get('screen').width;
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [displayedPage, setDisplayedPage] = useState(0);
  const dispatch = useDispatch();
  const [isLightMode, setIsLightMode] = useState(true);
  const profile = useSelector((state: RootState) => state.profile.profile);
  const screenWidth = Dimensions.get('screen').width;
  const locale = useSelector(selectLocale);

  const source =
    profile.avatar && profile.avatar !== '[NULL]'
      ? {uri: profile.avatar}
      : require('../../assets/images/default_ava.png');
  const handlePress = () => {
    setIsLightMode(!isLightMode);
  };
  const translateY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [-50, 0],
    extrapolate: 'clamp',
  });
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const translate = useSelector(getTranslate);

  const handleScroll = (event: {
    nativeEvent: {layoutMeasurement: any; contentOffset: any};
  }) => {
    const {layoutMeasurement, contentOffset} = event.nativeEvent;
    const pageNum = Math.floor(contentOffset.x / layoutMeasurement.width);
    setCurrentPage(pageNum);
  };

  const handlePackage = () => {
    navigation.navigate('PackStack', {
      screen: 'ViewAllPurchased',
    });
  };
  const handleFamily = () => {
    navigation.navigate('FamilyTab', {
      screen: 'Family',
    });
  };
  useEffect(() => {
    fetchFamiliesAndMembers();
  }, []);

  const fetchFamiliesAndMembers = async () => {
    try {
      const allFamilies = await FamilyServices.getAllFamily();
      const currentDate = new Date();

      const validFamilies = allFamilies.filter(
        (family: {expired_at: string | number | Date}) => {
          if (!family.expired_at) return false;
          const expiredAtDate = new Date(family.expired_at);
          return expiredAtDate > currentDate;
        },
      );

      dispatch(setFamilies(validFamilies));

      if (validFamilies.length > 0) {
        const initialFamily = validFamilies[0];
        dispatch(setSelectedFamily(initialFamily));
      }

      const membersObject = {};

      for (let i = 0; i < validFamilies.length; i++) {
        const family = validFamilies[i];
        const members = await FamilyServices.getAllMembers({
          id_family: family.id_family,
        });
        const service = await PackageServices.getAvailableFunction(
          family.id_family,
        );
        dispatch(setFamilyServices(service));
        membersObject[family.id_family] = members;
      }

      dispatch(setFamilyMembers(membersObject));
    } catch (error) {
      console.error('Error fetching families or members:', error);
    }
  };

  const handleChat = () => {
    navigation.navigate('MessageTab', {screen: 'ChatList'});
  };

  const handleGetProfile = async () => {
    try {
      const result = await PackageServices.getProfile();
      const id_user = result.id_user;
      dispatch(Profile(result));
      //console.log(result)
    } catch (error: any) {
      console.log('ProfileServices.getProfile error:', error);
    }
  };

  const views = [
    <View style={[styles.pictureBox, {backgroundColor: '#9572A7'}]}>
      <View style={styles.columnStyle}>
        <Text style={styles.text}>Managing anything is now easier</Text>
        <Image
          source={require('../../assets/images/family-picture.png')}
          resizeMode="stretch"
          style={styles.familyImage}
        />
      </View>
    </View>,
    <View style={[styles.pictureBox2, {backgroundColor: '#84C9FE'}]}>
      <View style={styles.rowStyle2}>
        <Text style={[styles.text2, {maxWidth: '68%'}]}>
          Time managed dreams realized
        </Text>
        <View style={{flex: 1}}>
          <Image
            source={require('../../assets/images/family-picture-3.png')}
            resizeMode="stretch"
            style={styles.familyImage2}
          />
        </View>
      </View>
    </View>,
    <View style={[styles.pictureBox, {backgroundColor: '#FD927B'}]}>
      <View style={styles.columnStyle}>
        <Image
          source={require('../../assets/images/family-picture-2.png')}
          resizeMode="stretch"
          style={styles.familyImage3}
        />
        <Text style={styles.text}>Managing your finances work</Text>
      </View>
    </View>,
  ];

  const viewsWithFake = [...views, views[0]];

  useEffect(() => {
    handleGetProfile();

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({x: 0, animated: false});
    }

    const interval = setInterval(() => {
      setCurrentPage(prevPage => {
        let nextPage = prevPage + 1;
        if (nextPage === viewsWithFake.length) {
          scrollViewRef.current?.scrollTo({x: 0, animated: false});
          nextPage = 0;
        } else {
          scrollViewRef.current?.scrollTo({
            x: nextPage * width,
            animated: true,
          });
        }
        setDisplayedPage(nextPage < views.length ? nextPage : 0);
        return nextPage;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const handleNavigateNews = () => {
    navigation.navigate('FamilyStack', {screen: 'News'});
  };

  const data: Item[] = [
    {
      icon: 'bundle',
      label: translate('Bundles'),
      onPress: () => {
        handlePackage();
      },
    },
    {
      icon: 'family',
      label: translate('Family'),
      onPress: () => {
        handleFamily();
      },
    },
    {
      icon: 'feedback',
      label: translate('Feedback'),
      onPress: () => {
        navigation.navigate('AuthStack', {screen: 'Feedback'});
      },
    },
    {
      icon: 'news',
      label: translate('Newspaper'),
      onPress: () => {
        handleNavigateNews();
      },
    },
    {
    
      icon: 'guideline',
      label: translate('Guideline'),
      onPress: () => {
        navigation.navigate('FamilyStack', {screen: 'GuidelinePublic'});
      },
    },

    {
      icon: 'language',
      label: translate('Language'),
      onPress: () => {
         navigation.navigate('FamilyStack', {screen: 'LanguageSelector'});
      },
    },
    {
      icon: 'theme',
      label: translate('Theme'),
      // onPress: () => {
      //   console.log('Theme pressed');
      // },
      onPress: () => {
        navigation.navigate('FamilyStack', {screen: 'ThemeSwitcher'});
      },
    },
  ];

  return (
    <ImageBackground
      source={require('../../assets/images/home-screen-light.png')}
      style={{flex: 1}}
      resizeMode="stretch">
      <SafeAreaView style={{flex: 1, padding: 10}}>
        <View style={[styles.container, {marginBottom: 90}]}>
          <View style={styles.circleContainer}></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              bottom: 25,
              marginTop: 40,
            }}>
            <View style={{flexDirection: 'column', paddingLeft: 20}}>
              <Text style={{color: COLORS.white, fontSize: 30}}>{translate('welcome')}</Text>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 38,
                  fontWeight: 'bold',
                  marginBottom: 8,
                }}>
                {`${profile?.firstname} ${profile?.lastname}`}
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{color: COLORS.white, fontSize: 17, right: 30}}></Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', right: 20}}>
              <Image
                source={source}
                resizeMode="contain"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  overflow: 'hidden',
                  marginRight: 10,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 5,
                  shadowRadius: 10,
                  borderWidth: 3,
                  borderColor: 'white',
                }}
              />
              <View
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: 7.5,
                  backgroundColor: '#68DD73',
                  right: 30,
                  top: 60,
                }}
              />
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={{top: 40}}>
            <View style={{marginBottom: 40}}>
              <FlatList
                data={data}
                numColumns={4}
                scrollEnabled={false}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => (
                  <>
                    <ScrollView
                      ref={scrollViewRef}
                      horizontal
                      pagingEnabled
                      style={{flex: 1}}>
                      {viewsWithFake.map((view, index) => (
                        <View key={index} style={{width, height: 300}}>
                          {view}
                        </View>
                      ))}
                    </ScrollView>
                    <View style={styles.dots}>
                      {[...Array(3)].map((_, i) => (
                        <Text
                          key={i}
                          style={[
                            styles.dot,
                            displayedPage === i && styles.activeDot,
                          ]}>
                          •
                        </Text>
                      ))}
                    </View>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={styles.title}>Let's Start with Service</Text>
                      <View style={{flexDirection: 'row'}}></View>
                    </View>
                  </>
                )}
                renderItem={({item, index}) => (
                  <View
                    style={{
                      width: '23%',
                      alignItems: 'center',
                      margin: 2,
                      marginLeft: 5,
                    }}>
                    <TouchableOpacity
                      onPress={item.onPress}
                      style={{
                        width: 70,
                        height: 70,
                        aspectRatio: 1,
                        padding: 10,
                        borderRadius: 20,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center',
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 1},
                        shadowOpacity: 0.2,
                        shadowRadius: 5,
                        marginTop: 20,
                        overflow: 'visible',
                      }}>
                      <Image
                        source={icons[item.icon]}
                        style={{width: '60%', height: '60%'}}
                        resizeMode="stretch"
                      />
                      {(item.icon === 'feedback' || item.icon === 'chat') && (
                        <Image
                          source={require('src/assets/images/New Button.png')}
                          style={{
                            position: 'absolute',
                            top: -5,
                            right: -20,
                            width: 40,
                            height: 18,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginVertical: 10,
                        color: '#1b2838',
                        fontWeight: 600,
                      }}>
                      {item.label}
                    </Text>
                  </View>
                )}
              />
            </View>

            <View style={styles.comboContainer}>
              <Text style={styles.textCombo}>FamFund's Combo</Text>
              <ScrollView
                horizontal={true}
                style={styles.scrollViewContainer}
                showsHorizontalScrollIndicator={false}>
                <View>
                  <Image
                    source={require('../../assets/images/special-combo-1.png')}
                    style={styles.imageCombo}
                  />
                </View>
                <View>
                  <Image
                    source={require('../../assets/images/special-combo-2.png')}
                    style={styles.imageCombo}
                  />
                </View>
                <View>
                  <Image
                    source={require('../../assets/images/special-combo-3.png')}
                    style={styles.imageCombo}
                  />
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;
