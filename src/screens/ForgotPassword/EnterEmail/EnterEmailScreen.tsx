import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles'; 
import { ForgotPasswordScreenProps } from 'src/navigation/NavigationTypes';
import { AuthServices, ProfileServices } from 'src/services/apiclient';
import { useDispatch, useSelector } from 'react-redux';
import {setEmail} from 'src/redux/slices/ForgotPassword';
import {getEmail, setCode } from 'src/redux/slices/ForgotPassword';
import { getTranslate } from 'src/redux/slices/languageSlice';
import { useThemeColors } from 'src/hooks/useThemeColor';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {getIsDarkMode} from 'src/redux/slices/DarkModeSlice';

const EnterEmailScreen = ({ navigation }: ForgotPasswordScreenProps) => { 
  const [code, setCodeState] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const inputs = useRef([]);
  const email = useSelector(getEmail);
  const dispatch = useDispatch(); 
  const translate = useSelector(getTranslate);
  const color = useThemeColors();
  const [inputEmail, setInputEmail] = useState<string>('');
  const navigateToEnterCodeScreen = () => {
    navigation.navigate('EnterCodeScreen');
  };
  // const handleSendSubmit = async () => {
  //   try {
  //     dispatch(setEmail(inputEmail));
  //     await AuthServices.forgotPassword({ email: inputEmail, phone: '' });
  //     navigateToEnterCodeScreen();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSendSubmit = async () => {
    if (!inputEmail) {
      Alert.alert(translate('ValidationError'), translate('EnterEmailMessage'));
      return;
    }

    if (!validateEmail(inputEmail)) {
      Alert.alert(translate('ValidationError'), translate('InvalidEmailMessage'));
      return;
    }

    try {
      const userInfo = await ProfileServices.getUserInfoByEmail(inputEmail);
      if (userInfo) {
        dispatch(setEmail(inputEmail));
        await AuthServices.forgotPassword({ email: inputEmail, phone: '' });
        navigateToEnterCodeScreen();
      } else {
        Alert.alert(translate('ValidationError'), translate('EmailNotFoundMessage'));
      }
    } catch (error) {
      console.error(error);
      Alert.alert(translate('Error'), translate('NetworkErrorMessage'));
    }
  };
  const handleBackPress = () => {
    navigation.goBack();
  };
  const isDarkMode = useSelector(getIsDarkMode);
  const button = !isDarkMode
    ? require('../../../assets/images/button-rhino.png')
    : require('../../../assets/images/button-blue-demin.png');

  return (
    <ImageBackground 
      source={{ uri: 'https://static.vecteezy.com/system/resources/previews/008/483/414/non_2x/the-concept-of-an-african-american-man-thinking-behind-a-laptop-vector.jpg' }} 
      style={styles.keyboardView}
    >
      <KeyboardAvoidingView style={styles.keyboardView} behavior="padding">
        <SafeAreaView style={[styles.safeAreaStyle, {backgroundColor:color.background}]}>
        <View style={styles.progressBar}>
          <View style={[
            styles.progressStep,
            styles.progressStepActive, 
            {backgroundColor: color.progressBarActive}
          ]}>
          </View>
          <View style={styles.progressStep}></View>
          <View style={styles.progressStep}></View>
        </View>
          <View style={styles.TextContainer}>
            <Text style={[styles.emailTitle,{color: color.text}]}>{translate('ForgotYourPassword')}</Text>
            <Text style={[styles.emailDetail, {color: color.textSubdued}]}>{translate('ForgotYourPasswordDetail')}</Text>
          </View>
          <View
            style={[
              styles.row,
              styles.TextInput,
              {
                borderColor: '#2A475E',
                backgroundColor: color.white,
                marginBottom:20,
              },
            ]}>
            <MaterialCommunityIcons
              name="email-outline"
              style={[styles.Icon, {color: color.icon}]}
            />
            <TextInput
              placeholder={translate('enterEmail')}
              placeholderTextColor={
                color.textSubdued
              }
              keyboardType="email-address"
              onChangeText={text => setInputEmail(text)}
              value={inputEmail}
              style={[
                {
                  marginLeft: 10,
                  width: '100%',
                  color: color.text,
                },
              ]}
            />
          </View>
          <ImageBackground
            source={button}
            style={styles.optionEmailButton}
            resizeMode="stretch">
            <TouchableOpacity
              style={styles.selectedOption}
              onPress={handleSendSubmit}
              >
              <Text
                style={
                  styles.selectedOptionText
                }
                >
                {translate('EmailAddress')}
              </Text>
            </TouchableOpacity>
          </ImageBackground>
          <TouchableOpacity 
              style={styles.backButton} 
              onPress={handleBackPress}
            >
              <Icon name="arrow-back" size={24} color={color.icon} />
              <Text style={[styles.backButtonText, {color: color.text}]}>Back</Text>
            </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default EnterEmailScreen;
