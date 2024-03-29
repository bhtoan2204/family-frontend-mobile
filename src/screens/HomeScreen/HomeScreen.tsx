import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from 'src/constants';
import { FamilyStackProps } from 'src/navigation/NavigationTypes';
import { PackageServices } from 'src/services/apiclient';
import BottonSheetContent from './BottomSheetContent';
import styles from './styles';
import navigation from 'src/navigation';
import PurchasedScreen from '../PurchasedScreen';
import ProfileModal from './ProfileModal/ProfileModal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Profile = {
  id_user: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
};

const HomeScreen = ({ navigation }: FamilyStackProps) => {
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
  const handleFamily = () => {
    navigation.navigate('FamilyStack', { screen: 'ViewAllFamily', params: { id_user: profile?.id_user || '' } });

  }

  /////Goi tu homescreen
  // const handleProfile;
  const handleGetProfile = async () => {
    try {
      console.log('handleGetProfile called');
      const result = await PackageServices.getProfile();
      console.log('ProfileServices.getProfile result:', result.data);
      //const arr = Object.entries(result.data);
      // const id_user = result.data.id_user;
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
      {/* <StatusBar barStyle="default" /> */}
      <Animated.View
        style={{
          ...styles.animatedView,
          transform: [
            {
              translateY: translateY,
            },
          ],
        }}>

        <Text style={styles.headerText}>home</Text>

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
            <View style={styles.container}>
              <Material name="home" size={30} color="blue" />
              <Text style={styles.title}>Home</Text>
            </View>


            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={handleOpenModal}>
              <View style={styles.iconBorder}>
                <Material name="account" size={30} color={COLORS.primary} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <TouchableOpacity
              onPress={handlePackage}
              style={styles.iconDetail}>
              <Material name="package" size={50} color="blue" />

              <Text style={{ color: COLORS.black, textAlign: 'center', fontWeight: 'bold' }}>
                Package
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleFamily}
              style={styles.iconDetail}>

              <Material name="heart" size={50} color="blue" />

              <Text style={{
                color: COLORS.black, textAlign: 'center', fontWeight: 'bold',
              }}>
                Family
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
      {/* @ts-ignore */}
      <RBSheet
        ref={bottomSheetRef}
        height={sheetHeight}
        closeOnDragDown
        closeOnPressBack
        closeOnPressMask
        customStyles={{
          // wrapper: {
          //   backgroundColor: 'rgba(0,0,0,0.5)',
          // },
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
        }}>
        <View className='flex-1'>
          <View className='h-14 bg-white flex-row items-center mt-[-4] '>
            <View className='text-black text-lg font-normal p-4 absolute '>
              {/* <Ionicons name='close' size={24} className='font-normal' onPress={()=>{
                console.log("back to prev")
              }}  /> */}
              <Icon name='close' size={24} onPress={() => {
                console.log("op")
              }} />

            </View>
            <Text className='text-black text-base font-semibold w-full flex absolute text-center '>
              You
            </Text>
          </View>
          <ScrollView
            alwaysBounceVertical
            scrollEventThrottle={16}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
          >
            <View className='mx-4 flex-row items-center'>
              <Image source={{ uri: "https://www.w3schools.com/howto/img_avatar2.png" }} className='rounded-lg' style={{ height: 55, width: 55 }} />
              <View className='ml-4'>
                <Text className='text-black text-lg font-semibold'>
                  {profile?.firstname} {profile?.lastname}
                </Text>
                <Text className='text-black text-sm font-normal'>
                  {profile?.email}
                </Text>
              </View>
            </View>

            <View className='p-4 mx-4 flex-row mt-4 h-auto bg-blue-100 rounded-lg justify-start items-start'>
              <View className='mt-1'>
                <Icon name='camera' size={17} />
              </View>
              <View className='ml-3 text-lg'>
                <Text className='font-semibold text-base'>Add a profile photo</Text>
                <Text className='font-normal text-sm'>Help your family know they're talking to the right person</Text>
              </View>
            </View>

            <View className=' mx-4 mt-4 flex-row items-center'>
              <Icon name='bell-outline' size={17} />

              <Text className='font-normal ml-3 text-base'>Notifications</Text>
            </View>
            <View className=' mx-4 mt-4 flex-row items-center'>
              <Icon name='bell-outline' size={17} />

              <Text className='font-normal ml-3 text-base'>Notifications</Text>
            </View>
            <View className=' mx-4 mt-4 flex-row items-center'>
              <Icon name='bell-outline' size={17} />

              <Text className='font-normal ml-3 text-base'>Notifications</Text>
            </View>
            <View className=' mx-4 mt-4 flex-row items-center'>
              <Icon name='bell-outline' size={17} />

              <Text className='font-normal ml-3 text-base'>Notifications</Text>
            </View>
          </ScrollView>
        </View>
      </RBSheet>
    </View>
  );
};

export default HomeScreen;