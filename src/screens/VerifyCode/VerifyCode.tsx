import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {VerifyCodeProps} from 'src/navigation/NavigationTypes';
import {AuthServices} from 'src/services/apiclient';
import styles from './styles';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {getIsDarkMode} from 'src/redux/slices/DarkModeSlice';
import {useSelector} from 'react-redux';
import {ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-native-gesture-handler';

const VerifyCode = ({navigation, route}: VerifyCodeProps) => {
  const {email, phone} = route.params;
  const [verificationMethod, setVerificationMethod] = useState<string | null>(
    null,
  );
  const [code, setCode] = useState<string>('');
  const translate = useSelector(getTranslate);
  const color = useThemeColors();
  const isDarkMode = useSelector(getIsDarkMode);

  useEffect(() => {
    if (verificationMethod) {
      handleSendOTPVerify();
    }
  }, [verificationMethod]);

  const handleSendOTPVerify = async () => {
    try {
      const params = verificationMethod === 'phone' ? {phone} : {email};
      console.log('Sending OTP to:', params); // Add this line for logging
      const result = await AuthServices.sendOTPVerify(params);
      console.log('OTP sent successfully:', result);
      return result;
    } catch (error) {
      //console.error('Error in handleSendOTPVerify:', error);
      throw error;
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const params =
        verificationMethod === 'phone' ? {phone, code} : {email, code};
      const result = await AuthServices.verifyOTP(params);
      console.log('OTP verified successfully:', result);

      // Display success alert
      Alert.alert(
        'Success',
        'Your account has been successfully verified!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('LoginScreen'),
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      if (error instanceof Error) {
        // console.error('Error in handleVerifyOTP:', error.message);
        // console.error('Error stack trace:', error.stack);
        if ((error as any).response) {
          const response = (error as any).response;
          // console.error('Error response data:', response.data);
          // console.error('Error response status:', response.status);
          // console.error('Error response headers:', response.headers);
        }
      } else {
        //console.error('Unexpected error:', error);
      }
      Alert.alert('Error', 'Verification failed. Please try again.');
    }
  };

  const handleVerificationMethod = (method: string) => {
    setVerificationMethod(method);
  };

  const image = !isDarkMode
    ? require('../../assets/images/verify-account-light.png')
    : require('../../assets/images/verify-account.png');

  const button = !isDarkMode
    ? require('../../assets/images/button-rhino.png')
    : require('../../assets/images/button-blue-demin.png');

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: color.background}]}>
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => navigation.navigate('SignupScreen')}>
        <Icon
          name="arrow-back"
          size={31}
          style={[styles.backButton, {color: color.icon}]}
        />
      </TouchableOpacity>
      <Image
        source={image}
        resizeMode="stretch"
        style={{
          height: 340,
          width: 450,
          marginBottom: 70,
          alignSelf: 'center',
        }}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.title, {color: color.text}]}>
          {translate('VerifyYourAccount')}
        </Text>
        <Text style={[styles.subtitle, {color: color.textSubdued}]}>
          {translate('VerifyYourAccountDetail')}
        </Text>
      </View>

      <KeyboardAvoidingView behavior="position" style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {!verificationMethod ? (
            <View style={styles.buttonGroup}>
              <ImageBackground
                source={button}
                style={styles.optionEmailButton}
                resizeMode="stretch">
                <TouchableOpacity
                  style={styles.selectedOption}
                  onPress={() => handleVerificationMethod('email')}>
                  <Text style={styles.selectedOptionText}>
                    {translate('VerifyByEmail')}
                  </Text>
                </TouchableOpacity>
              </ImageBackground>
              <TouchableOpacity
                style={[styles.button, {borderColor: color.border}]}
                onPress={() => handleVerificationMethod('phone')}>
                <Text style={[styles.buttonText, {color: color.text}]}>
                  {translate('VerifyByPhone')}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.OTPContainer}>
              <TextInput
                style={[styles.input, {borderColor: color.border}]}
                placeholder={translate('EnterOTP')}
                value={code}
                onChangeText={setCode}
                keyboardType="numeric"
              />
              <ImageBackground
                source={button}
                style={styles.optionEmailButton}
                resizeMode="stretch">
                <TouchableOpacity
                  style={styles.selectedOption}
                  onPress={handleVerifyOTP}>
                  <Text style={styles.selectedOptionText}>
                    {translate('Submit OTP')}
                  </Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VerifyCode;
