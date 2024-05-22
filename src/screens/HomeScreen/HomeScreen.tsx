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
import {PackageServices} from 'src/services/apiclient';
import styles from './styles';
import {
  PurchasedScreenProps,
  ViewAllFamilyScreenProps,
} from 'src/navigation/NavigationTypes';
import {Profile} from 'src/redux/slices/ProfileSclice';
import {useDispatch} from 'react-redux';
import {MaterialIcons} from '@expo/vector-icons';
import {COLORS} from 'src/constants';
import {LinearGradient} from 'expo-linear-gradient';
import chat from 'src/assets/icons/chat.png';
import report from 'src/assets/icons/report.png';
import bundle from 'src/assets/icons/bundle.png';
import calendar from 'src/assets/icons/calendar.png';
import collectiable from 'src/assets/icons/collectiable.png';
import guideline from 'src/assets/icons/guideline.png';
import family from 'src/assets/icons/family.png';
import news from 'src/assets/icons/news.png';
import seemore from 'src/assets/icons/see-more.png';
import {ScrollView} from 'react-native-gesture-handler';

const icons = {
  bundle,
  calendar,
  collectiable,
  report,
  guideline,
  family,
  chat,
  news,
  seemore,
};

type IconKey =
  | 'bundle'
  | 'calendar'
  | 'collectiable'
  | 'report'
  | 'guideline'
  | 'family'
  | 'chat'
  | 'news'
  | 'seemore';

interface Item {
  icon: IconKey;
  label: string;
  onPress: () => void;
}

type Profile = {
  id_user: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
};

const HomeScreen = ({
  navigation,
}: PurchasedScreenProps & ViewAllFamilyScreenProps) => {
  const scrollY = new Animated.Value(0);
  const width = Dimensions.get('window').width;
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [displayedPage, setDisplayedPage] = useState(0);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState<Profile>();
  const [isLightMode, setIsLightMode] = useState(true);
  const handlePress = () => {
    setIsLightMode(!isLightMode);
  };
  const translateY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [-50, 0],
    extrapolate: 'clamp',
  });
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  //Trang thai cua pictures
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
    navigation.navigate('FamilyStack', {
      screen: 'ViewAllFamily',
    });
  };
  const handleChat = () => {
    navigation.navigate('ChatStack', {
      screen: 'ChatList',
    });
  };

  const handleGetProfile = async () => {
    try {
      const result = await PackageServices.getProfile();
      const id_user = result.data.id_user;
      setProfile(result.data);
      dispatch(Profile(result.data));
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
  const data: Item[] = [
    {
      icon: 'bundle',
      label: 'Bundles',
      onPress: () => {
        console.log('Bundle pressed');
      },
    },
    {
      icon: 'calendar',
      label: 'Calendar',
      onPress: () => {
        console.log('Calendar pressed');
      },
    },
    {
      icon: 'report',
      label: 'Report Bugs',
      onPress: () => {
        console.log('Electrical pressed');
      },
    },
    {
      icon: 'guideline',
      label: 'Guideline',
      onPress: () => {
        console.log('Guideline pressed');
      },
    },
    {
      icon: 'family',
      label: 'Family',
      onPress: () => {
        handleFamily();
      },
    },
    {
      icon: 'chat',
      label: 'Chat',
      onPress: () => {
        console.log('Plumbing pressed');
      },
    },
    {
      icon: 'news',
      label: 'Newspaper',
      onPress: () => {
        console.log('Newspaper pressed');
      },
    },
    {
      icon: 'seemore',
      label: 'See More',
      onPress: () => {
        console.log('See More pressed');
      },
    },
  ];

  return (
    <ImageBackground
      source={require('../../assets/images/home-screen-light.png')}
      style={{flex: 1}}
      resizeMode="stretch">
      <View style={styles.container}>
        <View style={styles.circleContainer}>
          <TouchableOpacity style={styles.circle}>
            <Image
              source={require('../../assets/images/menu-icon1.png')}
              resizeMode="contain"
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circle}>
            <Material
              name="bell-badge-outline"
              size={30}
              //color="#56409e"
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        <View
          style={[
            {flexDirection: 'row'},
            {justifyContent: 'space-between'},
            {alignItems: 'center'},
          ]}>
          <View style={[{flexDirection: 'column', paddingLeft: 20}]}>
            <Text style={[{color: 'white', fontSize: 30}]}>Welcome</Text>
            <Text
              style={[
                {
                  color: 'white',
                  fontSize: 38,
                  fontWeight: 'bold',
                  marginBottom: 8,
                },
              ]}>
              Jennie Kim
            </Text>
            <View
              style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
              <MaterialIcons
                name="location-on"
                size={22}
                //color="#56409e"
                color="#fff"
              />
              <Text style={[{color: 'white', fontSize: 17, right: 30}]}>
                24 Tran Hung Dao
              </Text>
            </View>
          </View>
          <View style={[{flexDirection: 'row'}, {right: 20}]}>
            <Image
              source={require('../../assets/images/avatar.png')}
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
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
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
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          scrollEventThrottle={16}
          onScroll={e => {
            scrollY.setValue(e.nativeEvent.contentOffset.y);
          }}>
          <Text style={styles.title}>Trending Search</Text>

          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={{flex: 1}}>
            {viewsWithFake.map((view, index) => (
              <View key={index} style={{width}}>
                {view}
              </View>
            ))}
          </ScrollView>
          <View style={styles.dots}>
            {[...Array(3)].map((_, i) => (
              <Text
                key={i}
                style={[styles.dot, displayedPage === i && styles.activeDot]}>
                •
              </Text>
            ))}
          </View>

          <View style={{flexDirection: 'column'}}>
            <Text style={styles.title}>Let's Start with Service</Text>
            <Text
              style={{
                fontSize: 15,
                color: 'gray',
                marginLeft: 20,

                bottom: 15,
              }}>
              We found 100 services in your area
            </Text>

            <View style={{flexDirection: 'row'}}></View>
            <FlatList
              data={data}
              numColumns={4}
              keyExtractor={(item, index) => index.toString()}
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
                      marginTop: 10,
                    }}>
                    <Image
                      source={icons[item.icon]}
                      style={{width: '80%', height: '80%', borderRadius: 10}}
                    />
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
          <View style={{height: 170}}></View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
