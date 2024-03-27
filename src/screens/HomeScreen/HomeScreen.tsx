import {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from 'src/constants';
import {FamilyStackProps} from 'src/navigation/NavigationTypes';
import {PackageServices} from 'src/services/apiclient';
import BottonSheetContent from './BottomSheetContent';
import styles from './styles';
import navigation from 'src/navigation';
import PurchasedScreen from '../PurchasedScreen';
type Profile = {
  id_user: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
};

const HomeScreen = ({navigation}: FamilyStackProps) => {
  const scrollY = new Animated.Value(0);
  const bottomSheetRef = useRef<RBSheet>(null);
  const screenHeight = Dimensions.get('screen').height;

  const sheetHeight = screenHeight * 0.9;
  const [profile, setProfile] = useState<Profile>();
  const translateY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [-50, 0],
    extrapolate: 'clamp',
  });

  const handleOpenModal = () => bottomSheetRef.current?.open();




  const handleViewPurchased = () => {
    navigation.navigate('PackStack', { screen: 'ViewAllPurchased', params: { id_user: profile?.id_user || '' } });
  };

  const handlePackage = () => {
    navigation.navigate('PackStack', { screen: 'ViewAllPurchased', params: { id_user: profile?.id_user || '' } });
  };

  /////Goi tu homescreen
  // const handleProfile;
  const handleGetProfile = async () => {
    try {
      console.log('handleGetProfile called');
      const result = await PackageServices.getProfile();
      console.log('ProfileServices.getProfile result:', result.data);
      //const arr = Object.entries(result.data);
      const id_user = result.data.id_user;
      setProfile(result.data);
    } catch (error: any) {
      console.log('ProfileServices.getProfile error:', error);
    }
  };
  // const handleFamily;
  useEffect(() => {
    handleGetProfile();
  }, []);
  return (
    <View>
      <Animated.View
        style={{
          ...styles.animatedView,
          transform: [
            {
              translateY: translateY,
            },
          ],
        }}>
        <Text style={styles.headerText}>Home</Text>
      </Animated.View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={e => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}>
        <View style={styles.content}>
          <View style={styles.subContent}>
            <Text style={styles.title}>Home</Text>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={handleOpenModal}>
              <View style={styles.iconBorder}>
                <Material name="account" size={30} color={COLORS.primary} />
              </View>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity onPress={handleViewAllPackage}>
            <Text>Buy package</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleViewAllFamily}>
            <Text>View all family</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleViewAllFamily}>
            <Text>Bank Info</Text>
          </TouchableOpacity> */}
          <View style={{padding: 10}}>
            {/* <TouchableOpacity
              onPress={handleViewAllPackage}
              style={{
                backgroundColor: '#4884D3',
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
              }}>
              <Text style={{color: '#fff', textAlign: 'center'}}>
                Buy package
              </Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              onPress={handleViewPurchased}
              style={{
                backgroundColor: '#4884D3',
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
              }}>
              <Text style={{color: '#fff', textAlign: 'center'}}>
                Purchased
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={handlePackage}
              style={{
                backgroundColor: '#4884D3',
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
              }}>
              <Text style={{color: '#fff', textAlign: 'center'}}>
                Packages
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={handleViewAllFamily}
              style={{
                backgroundColor: '#4884D3',
                padding: 10,
                borderRadius: 5,
              }}>
              <Text style={{color: '#fff', textAlign: 'center'}}>
                Bank Info
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>
      {/* @ts-ignore */}
      <RBSheet
        ref={bottomSheetRef}
        height={sheetHeight}
        closeOnPressBack
        closeOnPressMask
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          draggableIcon: {
            height: 0,
            backgroundColor: 'transparent',
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}>
        <BottonSheetContent />
      </RBSheet>
    </View>
  );
};

export default HomeScreen;