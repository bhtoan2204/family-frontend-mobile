import {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
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
import {Icon} from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';

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
      params: {id_user: profile?.id_user || ''},
    });
  };
  const handleFamily = () => {
    navigation.navigate('FamilyStack', {
      screen: 'ViewAllFamily',
      params: {id_user: profile?.id_user || ''},
    });
  };
  const handleChat = () => {
    navigation.navigate('ChatStack', {
      screen: 'ChatList',
      params: {id_user: profile?.id_user || ''},
    });
  };

  // const handleProfile;
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

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={e => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}>
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

        <View style={styles.walletBox}>
          <View style={styles.rowStyle}>
            <View style={styles.columnStyle}>
              <Text style={styles.balance}>Active Balance</Text>
              <View style={styles.rowStyle}>
                <Text style={styles.numberBalance}>
                  {isBalanceVisible ? '******' : '500.00$'}
                </Text>
                <TouchableOpacity
                  onPress={() => setIsBalanceVisible(!isBalanceVisible)}>
                  <Material
                    name={isBalanceVisible ? 'eye-off-outline' : 'eye-outline'}
                    size={24}
                    //color="#6C6D71"
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.rowStyle1}>
              <View style={styles.columnStyle}>
                <TouchableOpacity style={styles.buttonStyle}>
                  {/* <Material name="tray-arrow-up" size={20} color="#6C6D71" /> */}
                  <Material name="tray-arrow-up" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Top Up</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.columnStyle}>
                <TouchableOpacity style={styles.buttonStyle}>
                  <Material name="tray-arrow-down" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Request</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.columnStyle}>
                <TouchableOpacity style={styles.buttonStyle}>
                  <Material name="wallet-outline" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Transfer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.containerBottom}>
          <View>
            <Text style={styles.titleBottom}>Top Feature</Text>
            <View style={styles.rowStyle}>
              <View style={styles.columnStyle1}>
                <LinearGradient
                  // Array of colors for gradient
                  colors={['#724DC9', '#5E4ABE', '#4748B2']}
                  // Gradient style
                  style={styles.button1}
                  // Gradient direction
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}>
                  <TouchableOpacity onPress={handlePackage}>
                    <Material
                      name="package-variant-closed"
                      size={30}
                      style={styles.buttonIcon1}
                    />
                  </TouchableOpacity>
                </LinearGradient>
                <Text style={styles.buttonText1}>Package</Text>
              </View>

              <View style={styles.columnStyle1}>
                <LinearGradient
                  // Array of colors for gradient
                  colors={['#724DC9', '#5E4ABE', '#4748B2']}
                  // Gradient style
                  style={styles.button1}
                  // Gradient direction
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}>
                  <TouchableOpacity onPress={handleFamily}>
                    <Material
                      name="account-supervisor-outline"
                      size={30}
                      style={styles.buttonIcon1}
                    />
                  </TouchableOpacity>
                </LinearGradient>
                <Text style={styles.buttonText1}>Family</Text>
              </View>

              <View style={styles.columnStyle1}>
                <LinearGradient
                  // Array of colors for gradient
                  colors={['#724DC9', '#5E4ABE', '#4748B2']}
                  // Gradient style
                  style={styles.button1}
                  // Gradient direction
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}>
                  <TouchableOpacity onPress={handleChat}>
                    <Material
                      name="chat-outline"
                      size={30}
                      style={styles.buttonIcon1}
                    />
                  </TouchableOpacity>
                </LinearGradient>
                <Text style={styles.buttonText1}>Chat</Text>
              </View>

              <View style={styles.columnStyle1}>
                <LinearGradient
                  // Array of colors for gradient
                  colors={['#724DC9', '#5E4ABE', '#4748B2']}
                  // Gradient style
                  style={styles.button1}
                  // Gradient direction
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}>
                  <TouchableOpacity onPress={handleChat}>
                    <Material
                      name="chat-outline"
                      size={30}
                      style={styles.buttonIcon1}
                    />
                  </TouchableOpacity>
                </LinearGradient>
                <Text style={styles.buttonText1}>Test</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
