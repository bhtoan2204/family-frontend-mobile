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

  const handleViewPurchased = () => {
    navigation.navigate('PackStack', {
      screen: 'ViewAllPurchased',
      params: {id_user: profile?.id_user ?? ''},
    });
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
        {/* onScroll={handleScroll}> */}
        <View style={styles.content}>
          {/* <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
            <Material
              name="account"
              size={30}
              color={COLORS.primary}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Account</Text>
          </TouchableOpacity> */}

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
  // return (
  //   <View>
  //     <Animated.View
  //       style={{
  //         ...styles.animatedView,
  //         transform: [
  //           {
  //             translateY: translateY,
  //           },
  //         ],
  //       }}>
  //       <Text style={styles.headerText}>home</Text>
  //     </Animated.View>
  //     <ScrollView
  //       style={styles.scrollView}
  //       showsVerticalScrollIndicator={false}
  //       scrollEventThrottle={16}
  // onScroll={e => {
  //   scrollY.setValue(e.nativeEvent.contentOffset.y);
  // }}>
  //       <View style={styles.content}>
  //         <View style={styles.subContent}>
  //           <View style={styles.container}>
  //             <Material name="home" size={30} color="blue" />
  //             <Text style={styles.title}>Home</Text>
  //           </View>

  //           <TouchableOpacity
  //             style={styles.touchableOpacity}
  //             onPress={handleOpenModal}>
  //             <View style={styles.iconBorder}>
  //               <Material name="account" size={30} color={COLORS.primary} />
  //             </View>
  //           </TouchableOpacity>
  //         </View>

  //         <View
  //           style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //           <TouchableOpacity onPress={handlePackage}>
  //             <Material
  //               name="package"
  //               size={50}
  //               color="black"
  //               style={styles.iconDetail}
  //             />

  //             <Text
  //               style={{
  //                 color: COLORS.black,
  //                 textAlign: 'center',
  //                 fontWeight: 'bold',
  //               }}>
  //               Package
  //             </Text>
  //           </TouchableOpacity>
  //           <TouchableOpacity onPress={handleFamily} style={styles.iconDetail}>
  //             <Material
  //               name="heart"
  //               size={50}
  //               color="black"
  //               style={styles.iconDetail}
  //             />

  //             <Text
  //               style={{
  //                 color: COLORS.black,
  //                 textAlign: 'center',
  //                 fontWeight: 'bold',
  //               }}>
  //               Family
  //             </Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </ScrollView>
  //     {/* @ts-ignore */}
  // <RBSheet
  //   ref={bottomSheetRef}
  //   height={sheetHeight}
  //   closeOnPressBack
  //   closeOnPressMask
  //   customStyles={{
  //     wrapper: {
  //       backgroundColor: 'rgba(0,0,0,0.5)',
  //     },
  //     draggableIcon: {
  //       height: 0,
  //       backgroundColor: 'transparent',
  //     },
  //     container: {
  //       borderTopLeftRadius: 20,
  //       borderTopRightRadius: 20,
  //     },
  //   }}>
  //   <BottonSheetContent />
  // </RBSheet>
  //   </View>
  // );
};

export default HomeScreen;
