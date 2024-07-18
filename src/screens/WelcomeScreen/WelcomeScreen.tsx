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
type CombinedScreenProps = SignupScreenProps & LoginScreenProps;

const WelcomeScreen = ({navigation}: CombinedScreenProps) => {
  const translate=useSelector(getTranslate);
 
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={require('../../assets/images/picture-famfund-1-removebg.png')}
          resizeMode="contain"
          style={styles.image}
        />
        <Image
          source={require('../../assets/images/text-fam-fund-removebg.png')}
          resizeMode="center"
          style={styles.textLogo}
        />
        <Text style={styles.welcomeText}>
          {translate('Intro')}
        </Text>
        <View style={{marginTop: 90}}>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.btnLogin}>{translate('Login')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSignUp}
            onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={styles.btnSignUp}>{translate('Sign up')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Notification navigation={navigation}/>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
