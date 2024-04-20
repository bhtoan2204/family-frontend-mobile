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
  const [currentPage, setCurrentPage] = useState(1);
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

  const viewsWithFake = [views[views.length - 1], ...views, views[0]];

  useEffect(() => {
    handleGetProfile();
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({x: width, animated: false});
    }

    const interval = setInterval(() => {
      setCurrentPage(prevPage => {
        let nextPage = prevPage + 1;
        if (nextPage === viewsWithFake.length) {
          scrollViewRef.current?.scrollTo({x: width, animated: false});
          nextPage = 1;
        } else {
          scrollViewRef.current?.scrollTo({
            x: nextPage * width,
            animated: true,
          });
        }
        return nextPage;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Animated.View style={[styles.header, {transform: [{translateY}]}]}>
          <Text style={styles.headerText}>Home</Text>
        </Animated.View> */}

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
              source={require('../../assets/images/menu-icon.png')}
              resizeMode="contain"
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circle}>
            <Material name="bell-badge-outline" size={30} color="#56409e" />
          </TouchableOpacity>
        </View>

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
              style={[styles.dot, currentPage === i && styles.activeDot]}>
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
                    color="#6C6D71"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.rowStyle1}>
              <View style={styles.columnStyle}>
                <TouchableOpacity style={styles.buttonStyle}>
                  <Material name="tray-arrow-up" size={20} color="#6C6D71" />
                  <Text style={styles.buttonText}>Top Up</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.columnStyle}>
                <TouchableOpacity style={styles.buttonStyle}>
                  <Material name="tray-arrow-down" size={20} color="#6C6D71" />
                  <Text style={styles.buttonText}>Request</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.columnStyle}>
                <TouchableOpacity style={styles.buttonStyle}>
                  <Material name="wallet-outline" size={20} color="#6C6D71" />
                  <Text style={styles.buttonText}>Transfer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <TouchableOpacity style={styles.button} onPress={handlePackage}>
            <Material
              name="package"
              size={50}
              color="#56409e"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Package</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleFamily}>
            <Material
              name="heart"
              size={50}
              color="#56409e"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Family</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleChat}>
            <Material
              name="chat"
              size={50}
              color="#56409e"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
