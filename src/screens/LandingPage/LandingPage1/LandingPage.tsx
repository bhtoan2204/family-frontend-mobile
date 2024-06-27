import React, {useEffect, useRef} from 'react';
import {SafeAreaView, View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {
  HomeTabProps,
  LandingPage2ScreenProps,
  SignupScreenProps,
} from 'src/navigation/NavigationTypes';
import Icon from 'react-native-vector-icons/Ionicons'; // Đảm bảo đã cài đặt thư viện này
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {Animated} from 'react-native';
import {COLORS} from 'src/constants';

type CombinedScreenProps = SignupScreenProps &
  LandingPage2ScreenProps &
  HomeTabProps;

const LandingPage = ({navigation}: CombinedScreenProps) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handleGoButtonPress = () => {
    navigation.navigate('HomeTab', {screen: 'HomeScreen'});
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 1100,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scale]);

  return (
    // <SafeAreaView style={styles.container}>
    //   <View style={styles.hero}>
    //     <Image
    //       source={{uri: 'https://assets.withfra.me/Landing.3.png'}}
    //       style={styles.heroImage}
    //       resizeMode="contain"
    //     />
    //   </View>
    //   <View style={styles.content}>
    //     <View style={styles.contentHeader}>
    //       <Text style={styles.title}>
    //         Plan your day{'\n'}with{' '}
    //         <View style={styles.appName}>
    //           <Text style={styles.appNameText}>Fam Fund</Text>
    //         </View>
    //       </Text>
    //       <Text style={styles.text}>
    //         Fostering Strong Family Connections: Connect, Organize, Share, and
    //         Treasure Every Moment Together.
    //       </Text>
    //     </View>

    //     <TouchableOpacity onPress={handleGoButtonPress}>
    //       <View style={[styles.button, {flexDirection: 'row'}]}>
    //         <Text style={[styles.buttonText, {left: 15}]}>Let's go</Text>
    //         <Icon
    //           name="arrow-forward"
    //           size={24}
    //           color="#fff"
    //           style={styles.icon}
    //         />
    //       </View>
    //     </TouchableOpacity>
    //   </View>
    // </SafeAreaView>
    <SafeAreaView style={styles.container}>
      <View style={{padding: 10}}>
        <TouchableOpacity
          //onPress={() => navigation.goBack()}
          onPress={handleGoButtonPress}>
          <MaterialIcons
            name="chevron-left"
            size={45}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <View
          style={{position: 'relative', alignSelf: 'center', marginTop: 40}}>
          <Image
            source={require('src/assets/images/landing-page-1-calendar.png')}
            resizeMode="stretch"
            style={{
              width: 266,
              height: 173,
              alignSelf: 'center',
              marginTop: 40,
              left: 20,
            }}
          />
          <Animated.Image
            source={require('src/assets/images/landing-page-1-animation.png')}
            resizeMode="stretch"
            style={{
              width: 120,
              height: 23,
              alignSelf: 'flex-start',
              bottom: 65,
              left: 10,
              transform: [{scale}],
            }}
          />
          <Image
            source={require('src/assets/images/landing-page-1-person.png')}
            resizeMode="stretch"
            style={{
              width: 87,
              height: 218,
              alignSelf: 'flex-start',
              bottom: 155,
              right: 15,
            }}
          />
        </View>
        <View style={{bottom: 80}}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: COLORS.Rhino,
              textAlign: 'center',
              marginBottom: 20,
            }}>
            Organize your family life
          </Text>
          <Text style={{fontSize: 15, textAlign: 'center'}}>
            Manage schedules, event and activities with ease.
          </Text>
        </View>
        <Image
          source={require('src/assets/images/paging.png')}
          resizeMode="stretch"
          style={{
            width: 81,
            height: 27,
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 100,
          }}>
          <TouchableOpacity
            style={{padding: 10, paddingHorizontal: 30}}
            onPress={handleGoButtonPress}>
            <Text style={{color: '#656565', fontWeight: 'semibold'}}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLORS.Rhino,
              padding: 10,
              paddingHorizontal: 25,
              borderRadius: 10,
            }}
            onPress={() => navigation.navigate('LandingPage2')}>
            <Text style={{fontWeight: 'semibold', color: 'white'}}>Next</Text>
            <MaterialCommunityIcons
              name="arrow-right-thin"
              size={25}
              color="white"
              style={{marginLeft: 5}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LandingPage;
