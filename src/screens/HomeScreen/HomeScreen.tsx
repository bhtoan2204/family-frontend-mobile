import {useEffect, useState} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
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
  //const screenHeight = Dimensions.get('screen').height;
  const dispatch = useDispatch();
  const [profile, setProfile] = useState<Profile>();
  const translateY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [-50, 0],
    extrapolate: 'clamp',
  });

  //const handleOpenModal = () => bottomSheetRef.current?.open();

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
  useEffect(() => {
    handleGetProfile();
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
            <Material name="menu" size={30} color="#56409e" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circle}>
            <Material name="bell-badge-outline" size={30} color="#56409e" />
          </TouchableOpacity>
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
