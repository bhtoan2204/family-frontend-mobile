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
import {
  PurchasedScreenProps,
  ViewAllFamilyScreenProps,
} from 'src/navigation/NavigationTypes';
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
    navigation.navigate('ChatStack', {screen: 'ChatList' , params: { id_user: profile?.id_user || ''}});
  };

  /////Goi tu homescreen
  // const handleProfile;
  const handleGetProfile = async () => {
    try {
      console.log('handleGetProfile called');
      const result = await PackageServices.getProfile();
      console.log('ProfileServices.getProfile result:', result.data);
      const id_user = result.data.id_user;
      setProfile(result.data);
    } catch (error: any) {
      console.log('ProfileServices.getProfile error:', error);
    }
  };
  useEffect(() => {
    handleGetProfile();
  }, []);
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, {transform: [{translateY}]}]}>
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

      <RBSheet
        ref={bottomSheetRef}
        height={sheetHeight}
        closeOnPressBack
        closeOnPressMask
        customStyles={{
          wrapper: {backgroundColor: 'rgba(0,0,0,0.5)'},
          draggableIcon: {height: 0, backgroundColor: 'transparent'},
          container: {borderTopLeftRadius: 20, borderTopRightRadius: 20},
        }}>
        <BottonSheetContent />
      </RBSheet>
    </View>
  );
};

export default HomeScreen;
