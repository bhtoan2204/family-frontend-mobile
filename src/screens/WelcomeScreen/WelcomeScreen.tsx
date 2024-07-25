import React, { useEffect } from 'react';
import {SafeAreaView, View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {
  LoginScreenProps,
  SignupScreenProps,
} from 'src/navigation/NavigationTypes';
import Notification from '../Notifications';
import { getTranslate, selectLocale } from 'src/redux/slices/languageSlice';
import { useSelector } from 'react-redux';
import { useThemeColors } from 'src/hooks/useThemeColor';
import { getIsDarkMode } from 'src/redux/slices/DarkModeSlice';
type CombinedScreenProps = SignupScreenProps & LoginScreenProps;

const WelcomeScreen = ({navigation}: CombinedScreenProps) => {
  const translate=useSelector(getTranslate);
  const color = useThemeColors();
  const isDarkMode = useSelector(getIsDarkMode)
  const logo = !isDarkMode 
    ? require('../../assets/images/WelcomePage/text-fam-fund-removebg.png') 
    : require('../../assets/images/WelcomePage/text-fam-fund-light.png');

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: color.background}]}>
      <View style={{backgroundColor: color.background}}>
        <Image
          source={require('../../assets/images/picture-famfund-1-removebg.png')}
          resizeMode="contain"
          style={styles.image}
        />
        <Image
          source={logo}
          resizeMode="center"
          style={[styles.textLogo, {backgroundColor: color.background}]}
        />
        <Text style={[styles.welcomeText, {color: color.text}]}>
          {translate('Intro')}
        </Text>
        <View style={{marginTop: 90}}>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.btnLogin}>{translate('Login')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonSignUp, {borderColor: color.text}]}
            onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={[styles.btnSignUp, {color: color.text}]}>{translate('Sign up')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Notification navigation={navigation}/>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
