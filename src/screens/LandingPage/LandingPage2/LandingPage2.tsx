import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
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
import {useSelector} from 'react-redux';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {getIsDarkMode} from 'src/redux/slices/DarkModeSlice';

type CombinedScreenProps = SignupScreenProps &
  LandingPage2ScreenProps &
  HomeTabProps;

const LandingPage2 = ({navigation}: CombinedScreenProps) => {
  const translate = useSelector(getTranslate);
  const color = useThemeColors();
  const isDarkMode = useSelector(getIsDarkMode);
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

  const paging = !isDarkMode
    ? require('../../../assets/images/paging-2-light.png')
    : require('../../../assets/images/paging-2-dark.png');

  const button = !isDarkMode
    ? require('../../../assets/images/button-rhino.png')
    : require('../../../assets/images/button-blue-demin.png');

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: color.background}]}>
      <View style={{padding: 10}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="chevron-left"
            size={45}
            style={{color: color.icon}}
          />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Animated.Image
            source={require('../../../assets/images/landing-page-2-animation.png')}
            resizeMode="stretch"
            style={{
              width: 43,
              height: 55,
              left: 120,
              top: 48,
              transform: [{scale}],
            }}
          />
          <Image
            source={require('../../../assets/images/landing-page-2.png')}
            resizeMode="stretch"
            style={styles.calendarImage}
          />
        </View>
        <View style={{marginTop: 110}}>
          <View style={{bottom: 80}}>
            <Text style={[styles.title, {color: color.text}]}>
              {translate('LandingPage2Title')}
            </Text>
            <Text style={[styles.text, {color: color.textSubdued}]}>
              {translate('LandingPage2Description')}
            </Text>
          </View>
          <Image source={paging} resizeMode="stretch" style={styles.paging} />
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.skip} onPress={handleGoButtonPress}>
              <Text style={{color: color.textSubdued, fontWeight: 'semibold'}}>
                {translate('Skip')}
              </Text>
            </TouchableOpacity>
            <ImageBackground source={button} style={styles.imageBackground}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('LandingPage3')}>
                <Text style={styles.buttonText}>
                  {translate('NextLanding')}
                </Text>
                <MaterialCommunityIcons
                  name="arrow-right-thin"
                  size={25}
                  color="white"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LandingPage2;
