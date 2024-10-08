import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from 'src/components/Button';
import {COLORS, TEXTS} from 'src/constants';
import {LoginScreenProps} from 'src/navigation/NavigationTypes';
import {AuthServices} from 'src/services/apiclient';
import styles from './styles';
import * as WebBrowser from 'expo-web-browser';
import {makeRedirectUri, useAuthRequest} from 'expo-auth-session';
import FacebookImage from 'src/assets/images/facebook.png';
import GoogleImage from 'src/assets/images/google.png';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {getIsDarkMode} from 'src/redux/slices/DarkModeSlice';
import {useSelector} from 'react-redux';

interface FormValues {
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  genre: string;
  birthdate: string;
  termsAndConditions: boolean;
  submit: null;
}

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

const SignupScreen = ({navigation}: LoginScreenProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const translate = useSelector(getTranslate);
  const color = useThemeColors();

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    setValues({
      ...values,
      birthdate: currentDate.toISOString(), // Update birthdate in form values
    });
  };

  const [values, setValues] = useState<FormValues>({
    email: '',
    phone: '',
    password: '',
    firstName: '',
    lastName: '',
    genre: '',
    birthdate: '',
    termsAndConditions: false,
    submit: null,
  });

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId:
        '79354209613-utvqpvit5utmdalov9jdjotulc1m5fq9.apps.googleusercontent.com',
      scopes: ['openid', 'profile', 'email'],
      redirectUri: makeRedirectUri({
        native: 'com.anonymous.mobile_shell://redirect',
      }),
    },
    discovery,
  );

  const handleSignup = async () => {
    try {
      console.log('Signup initiated with values:', values);

      let validationErrors: any = {};

      if (!values.email) {
        validationErrors.email = 'Email is required';
      }
      if (!values.phone) {
        validationErrors.phone = 'Phone number is required';
      }
      if (!values.password) {
        validationErrors.password = 'Password is required';
      }
      if (!values.firstName) {
        validationErrors.firstName = 'First name is required';
      }
      if (!values.lastName) {
        validationErrors.lastName = 'Last name is required';
      }
      if (!values.genre) {
        validationErrors.genre = 'Gender is required';
      }
      if (!values.birthdate) {
        validationErrors.birthdate = 'Birthdate is required';
      }
      if (!values.termsAndConditions) {
        validationErrors.termsAndConditions =
          'You must accept the terms and conditions';
      }

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      console.log('Calling AuthServices.signup');
      await AuthServices.signup({
        email: values.email,
        phone: values.phone,
        password: values.password,
        firstname: values.firstName,
        lastname: values.lastName,
        genre: values.genre,
        birthdate: values.birthdate,
      });

      console.log('Navigating to VerifySelectionScreen');
      navigation.navigate('VerifyCode', {
        email: values.email,
        phone: values.phone,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        //console.error('Signup error:', error.message);
        setErrors({submit: error.message});
      } else {
        //console.error('Signup error:', error);
        setErrors({submit: 'An unknown error occurred'});
      }
    }
  };

  useEffect(() => {
    if (response?.type === 'success') {
      const {code} = response.params;
    }
  }, [response]);

  const isDarkMode = useSelector(getIsDarkMode);
  const background = !isDarkMode
    ? require('../../assets/images/login-wall-light.png')
    : require('../../assets/images/login-wall-dark.png');

  return (
    <ImageBackground source={background} style={{flex: 1}} resizeMode="stretch">
      <KeyboardAvoidingView behavior="padding">
        <View style={{paddingTop: 50}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('WelcomeScreen');
            }}>
            <Ionicons
              name="chevron-back-circle-outline"
              style={[styles.backIcon, {color: color.icon}]}
            />
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/logo-app-1.png')}
            resizeMode="stretch"
            style={styles.logo}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SafeAreaView>
            <View style={[styles.marginHorizontal, {bottom: 150}]}>
              <View style={[styles.marginVertical]}>
                <View style={{marginTop: 120}}>
                  <View style={[styles.marginBottom, styles.row]}>
                    <View
                      style={{
                        ...styles.placeholder,
                        borderColor: errors.firstName
                          ? COLORS.red
                          : COLORS.Rhino,
                        flex: 1,
                        marginRight: 10,
                        backgroundColor: color.white,
                      }}>
                      <TextInput
                        style={[styles.textInput, {color: color.text}]}
                        placeholder={translate('firstname')}
                        placeholderTextColor={
                          errors.firstName ? COLORS.red : '#A6A6A6'
                        }
                        onBlur={() => {}}
                        onChangeText={text =>
                          setValues({...values, firstName: text})
                        }
                        value={values.firstName}
                      />
                    </View>

                    <View
                      style={{
                        ...styles.placeholder,
                        borderColor: errors.lastName ? COLORS.red : '#2A475E',
                        flex: 1,
                        marginLeft: 5,
                        backgroundColor: color.white,
                      }}>
                      <TextInput
                        style={[styles.textInput, {color: color.text}]}
                        placeholder={translate('lastname')}
                        placeholderTextColor={
                          errors.lastName ? COLORS.red : '#A6A6A6'
                        }
                        onBlur={() => {}}
                        onChangeText={text =>
                          setValues({...values, lastName: text})
                        }
                        value={values.lastName}
                      />
                    </View>
                  </View>
                  {errors.firstName && (
                    <Text style={styles.errorText}>{errors.firstName}</Text>
                  )}
                  {errors.lastName && (
                    <Text style={styles.errorText}>{errors.lastName}</Text>
                  )}
                </View>

                <View style={styles.marginBottom}>
                  <View
                    style={{
                      ...styles.placeholder,
                      borderColor: errors.email ? COLORS.red : '#2A475E',
                      backgroundColor: color.white,
                    }}>
                    <TextInput
                      style={[
                        styles.textInput,
                        {marginLeft: 10, color: color.text},
                      ]}
                      placeholder={translate('emailaddress')}
                      placeholderTextColor={
                        errors.email ? COLORS.red : '#A6A6A6'
                      }
                      keyboardType="email-address"
                      onBlur={() => {}}
                      onChangeText={text => setValues({...values, email: text})}
                      value={values.email}
                    />
                  </View>
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.marginBottom}>
                  <View
                    style={{
                      ...styles.placeholder,
                      borderColor: errors.phone ? COLORS.red : '#2A475E',
                      backgroundColor: color.white,
                    }}>
                    <TextInput
                      style={[
                        styles.textInput,
                        {marginLeft: 10, color: color.text},
                      ]}
                      placeholder={translate('phonenumber')}
                      placeholderTextColor={
                        errors.phone ? COLORS.red : '#A6A6A6'
                      }
                      keyboardType="phone-pad"
                      onBlur={() => {}}
                      onChangeText={text => setValues({...values, phone: text})}
                      value={values.phone}
                    />
                  </View>
                  {errors.phone && (
                    <Text style={styles.errorText}>{errors.phone}</Text>
                  )}
                </View>
                <View style={styles.marginBottom}>
                  <View
                    style={{
                      ...styles.placeholder,
                      borderColor: errors.password ? COLORS.red : '#2A475E',
                      backgroundColor: color.white,
                    }}>
                    <TextInput
                      style={[
                        styles.textInput,
                        {marginLeft: 10, color: color.text},
                      ]}
                      placeholder={translate('password')}
                      placeholderTextColor={
                        errors.password ? COLORS.red : '#A6A6A6'
                      }
                      secureTextEntry={!isPasswordVisible}
                      onBlur={() => {}}
                      onChangeText={text =>
                        setValues({...values, password: text})
                      }
                      value={values.password}
                    />
                    <Pressable
                      onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                      style={{position: 'absolute', right: 10, top: 10}}>
                      <MaterialCommunityIcons
                        name={isPasswordVisible ? 'eye' : 'eye-off'}
                        size={20}
                        color={color.icon}
                      />
                    </Pressable>
                  </View>
                  {errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>
                <View>
                  <View style={styles.inputContainer}>
                    <Text style={[styles.label, {color: color.text}]}>
                      {translate('Gender')}
                    </Text>
                    <View style={styles.genderContainer}>
                      <TouchableOpacity
                        style={styles.radioContainer}
                        onPress={() =>
                          setValues(prev => ({...prev, genre: 'male'}))
                        }>
                        <View
                          style={[
                            styles.radioCircle,
                            {borderColor: color.text},
                          ]}>
                          {values.genre === 'male' && (
                            <View
                              style={[
                                styles.selectedRb,
                                {backgroundColor: color.black},
                              ]}
                            />
                          )}
                        </View>
                        <Text style={[styles.radioText, {color: color.text}]}>
                          {translate('male')}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.radioContainer}
                        onPress={() =>
                          setValues(prev => ({...prev, genre: 'female'}))
                        }>
                        <View
                          style={[
                            styles.radioCircle,
                            {borderColor: color.text},
                          ]}>
                          {values.genre === 'female' && (
                            <View
                              style={[
                                styles.selectedRb,
                                {backgroundColor: color.black},
                              ]}
                            />
                          )}
                        </View>
                        <Text style={[styles.radioText, {color: color.text}]}>
                          {translate('female')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {errors.genre && (
                    <Text style={styles.errorText}>{errors.genre}</Text>
                  )}
                </View>

                <View style={styles.marginBottom}>
                  <View style={styles.datePickerContainer}>
                    <Text style={[styles.label, {color: color.text}]}>
                      {translate('Birth Date')}
                    </Text>
                    <DateTimePicker
                      value={
                        values.birthdate
                          ? new Date(values.birthdate)
                          : new Date()
                      }
                      mode="date"
                      display="default"
                      onChange={handleDateChange}
                    />
                  </View>
                  {errors.birthdate && (
                    <Text style={styles.errorText}>{errors.birthdate}</Text>
                  )}
                </View>

                <View style={styles.marginBottom}>
                  <View style={styles.checkboxContainer}>
                    <Checkbox
                      value={values.termsAndConditions}
                      onValueChange={newValue =>
                        setValues({...values, termsAndConditions: newValue})
                      }
                    />
                    <Text style={[styles.checkboxLabel, {color: color.text}]}>
                      {translate('terms')}
                    </Text>
                  </View>
                  {errors.termsAndConditions && (
                    <Text style={styles.errorText}>
                      {errors.termsAndConditions}
                    </Text>
                  )}
                </View>
              </View>
              <View style={{bottom: 50}}>
                <View style={styles.marginHorizontal}>
                  <CustomButton
                    style={styles.button}
                    title={translate('Sign up')}
                    filled
                    onPress={handleSignup}
                    backgroundImage={require('../../assets/images/button.png')}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 13,
                  }}>
                  <Text
                    style={[
                      {fontSize: 17},
                      {marginBottom: -20},
                      {color: color.text},
                    ]}>
                    {translate('Login_or')}
                  </Text>
                </View>
                <View style={[styles.container, {bottom: 20}]}>
                  <TouchableOpacity
                    style={[styles.button, {right: 20}]}
                    onPress={() => {
                      promptAsync();
                    }}>
                    <Image
                      style={styles.image}
                      source={GoogleImage}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, {left: 20}]}
                    // onPress={handleFacebookLogin}
                  >
                    <Image
                      style={styles.image}
                      source={FacebookImage}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                <View
                  className="flex-row justify-center my-5"
                  style={{bottom: 40}}>
                  <Text className="text-base mr-1" style={{color: color.text}}>
                    {translate('ALREADY_HAVE_ACCOUNT')}
                  </Text>

                  <TouchableOpacity
                    style={{top: 2}}
                    onPress={() => {
                      navigation.navigate('LoginScreen');
                    }}>
                    <Text
                      style={[
                        {color: '#66C0F4'},
                        {fontSize: 16},
                        {fontWeight: 'bold'},
                      ]}>
                      {translate('Login')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default SignupScreen;
