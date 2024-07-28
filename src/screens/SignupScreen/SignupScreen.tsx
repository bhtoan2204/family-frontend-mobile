import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import {Formik, FormikHelpers} from 'formik';
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
import * as Yup from 'yup';
import styles from './styles';
import * as WebBrowser from 'expo-web-browser';
import {makeRedirectUri, useAuthRequest} from 'expo-auth-session';
import FacebookImage from 'src/assets/images/facebook.png';
import GoogleImage from 'src/assets/images/google.png';
import DateTimePicker from '@react-native-community/datetimepicker';
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
  birthdate: Date | null;
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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const translate = useSelector(getTranslate);
  const color = useThemeColors();

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

  const handleSignup = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    try {
      console.log('Signup initiated with values:', values);

      if (values.termsAndConditions === false) {
        console.log('Terms and Conditions not accepted');
        actions.setStatus({
          success: false,
        });
        actions.setErrors({submit: TEXTS.TERMS_AND_CONDITIONS_REQUIRED});
      } else {
        console.log('Calling AuthServices.signup');
        await AuthServices.signup({
          email: values.email,
          phone: values.phone,
          password: values.password,
          firstname: values.firstName,
          lastname: values.lastName,
          genre: values.genre,
          birthdate: values.birthdate
            ? values.birthdate.toISOString().split('T')[0]
            : '',
        });

        console.log('Calling AuthServices.sendOTPVerify');
        await AuthServices.sendOTPVerify({
          email: values.email,
          phone: values.phone,
        });

        console.log('Navigating to VerifyCode');
        navigation.navigate('VerifyCode', {
          email: values.email,
          phone: values.phone,
        });
        actions.setStatus({success: true});
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      actions.setStatus({
        success: false,
      });
      actions.setFieldError('submit', error.message);
    } finally {
      console.log('Signup process completed');
      actions.setSubmitting(false);
    }
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    firstname: Yup.string().required('Required'),
    lastname: Yup.string().required('Required'),
    genre: Yup.string().required('Required'),
    birthdate: Yup.date().required('Required'),
  });

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
        <ScrollView>
          <SafeAreaView>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('WelcomeScreen');
                }}>
                <Ionicons
                  name="chevron-back-circle-outline"
                  style={[styles.backIcon, {color: color.icon}]}
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.marginHorizontal, {bottom: 190}]}>
              <View style={[styles.marginVertical]}>
                <Image
                  source={require('../../assets/images/logo-app-1.png')}
                  resizeMode="stretch"
                  style={styles.logo}
                />
              </View>
              <Formik
                initialValues={{
                  email: '',
                  phone: '',
                  password: '',
                  firstName: '',
                  lastName: '',
                  genre: '',
                  birthdate: null,
                  termsAndConditions: false,
                  submit: null,
                }}
                // onSubmit={(values, actions) =>
                //   handleSignup(values, actions as FormikHelpers<FormValues>)
                // }
                onSubmit={(values, actions) =>
                  handleSignup(values, actions as FormikHelpers<FormValues>)
                }
                validationSchema={SignupSchema}>
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values,
                  setFieldValue,
                }) => (
                  <View style={{marginTop: 120}}>
                    <View style={styles.marginBottom}>
                      <View style={{flexDirection: 'row'}}>
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
                          {/* <MaterialCommunityIcons
                            name="account"
                            style={styles.Icon}
                          /> */}
                          <TextInput
                            style={[styles.textInput, {color: '#2A475E'}]}
                            placeholder={TEXTS.FIRST_NAME_PLACEHOLDER}
                            placeholderTextColor={
                              errors.firstName ? COLORS.red : '#A6A6A6'
                            }
                            onBlur={handleBlur('firstName')}
                            onChangeText={handleChange('firstName')}
                            value={values.firstName}
                          />
                        </View>
                        <View
                          style={{
                            ...styles.placeholder,
                            borderColor: errors.lastName
                              ? COLORS.red
                              : '#2A475E',
                            flex: 1,
                            marginLeft: 5,
                            backgroundColor: color.white,
                          }}>
                          {/* <MaterialCommunityIcons
                            name="account"
                            style={styles.Icon}
                          /> */}
                          <TextInput
                            style={[styles.textInput, {color: '#2A475E'}]}
                            placeholder={TEXTS.LAST_NAME_PLACEHOLDER}
                            placeholderTextColor={
                              errors.lastName ? COLORS.red : '#A6A6A6'
                            }
                            onBlur={handleBlur('lastName')}
                            onChangeText={handleChange('lastName')}
                            value={values.lastName}
                          />
                        </View>
                      </View>
                      {errors.firstName && touched.firstName && (
                        <Text style={styles.errorText}>{errors.firstName}</Text>
                      )}
                      {errors.lastName && touched.lastName && (
                        <Text style={styles.errorText}>{errors.lastName}</Text>
                      )}
                    </View>

                    <View style={styles.marginBottom}>
                      {/* <Text style={styles.title}>{TEXTS.EMAIL}</Text> */}
                      <View
                        style={{
                          ...styles.placeholder,
                          borderColor: errors.email ? COLORS.red : '#2A475E',
                          backgroundColor: color.white,
                        }}>
                        {/* <MaterialCommunityIcons
                          name="email-outline"
                          style={[styles.Icon, {color: color.icon}]}
                        /> */}
                        <TextInput
                          style={[
                            styles.textInput,
                            {marginLeft: 10, color: '#2A475E'},
                          ]}
                          placeholder={TEXTS.EMAIL_PLACEHOLDER}
                          placeholderTextColor={
                            errors.email ? COLORS.red : '#A6A6A6'
                          }
                          keyboardType="email-address"
                          onBlur={handleBlur('email')}
                          onChangeText={handleChange('email')}
                          value={values.email}
                        />
                      </View>
                      {errors.email && touched.email && (
                        <Text style={styles.errorText}>{errors.email}</Text>
                      )}
                    </View>
                    <View style={styles.marginBottom}>
                      {/* <Text style={styles.title}>{TEXTS.PHONE_NUMBER}</Text> */}
                      <View
                        style={{
                          ...styles.placeholder,
                          borderColor: errors.phone ? COLORS.red : '#2A475E',
                          backgroundColor: color.white,
                        }}>
                        {/* <MaterialCommunityIcons
                          name="phone-outline"
                          style={[styles.Icon, {color: color.icon}]}
                        /> */}
                        <TextInput
                          style={[
                            styles.textInput,
                            {marginLeft: 10, color: '#2A475E'},
                          ]}
                          placeholder={TEXTS.PHONE_NUMBER_PLACEHOLDER}
                          placeholderTextColor={
                            errors.phone ? COLORS.red : '#A6A6A6'
                          }
                          keyboardType="phone-pad"
                          onBlur={handleBlur('phoneNumber')}
                          onChangeText={handleChange('phoneNumber')}
                          value={values.phone}
                        />
                      </View>
                      {errors.phone && touched.phone && (
                        <Text style={styles.errorText}>{errors.phone}</Text>
                      )}
                    </View>
                    <View style={styles.marginBottom}>
                      <View
                        style={{
                          ...styles.placeholder,
                          backgroundColor: color.white,
                          borderColor: errors.password ? COLORS.red : '#2A475E',
                        }}>
                        {/* <MaterialCommunityIcons
                          name="lock-outline"
                          style={[styles.Icon, {color: color.icon}]}
                        /> */}
                        <TextInput
                          style={[
                            styles.textInput,
                            {marginLeft: 10, color: '#2A475E'},
                          ]}
                          placeholder={TEXTS.PASSWORD_PLACEHOLDER}
                          placeholderTextColor={
                            errors.password ? COLORS.red : '#A6A6A6'
                          }
                          secureTextEntry={!isPasswordVisible}
                          onBlur={handleBlur('password')}
                          onChangeText={handleChange('password')}
                          value={values.password}
                        />
                        <TouchableOpacity
                          style={styles.touchable}
                          onPress={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }>
                          {isPasswordVisible ? (
                            <Ionicons
                              name="eye"
                              style={[styles.Icon, {color: color.icon}]}
                            />
                          ) : (
                            <Ionicons
                              name="eye-off"
                              style={[styles.Icon, {color: color.icon}]}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                      {errors.password && touched.password && (
                        <Text style={styles.errorText}>{errors.password}</Text>
                      )}
                    </View>

                    {errors.submit && (
                      <View>
                        <Text style={styles.errorText}>{errors.submit}</Text>
                      </View>
                    )}

                    <View style={styles.marginBottom}>
                      <View style={styles.inputContainer}>
                        <Text style={[styles.label, {color: color.text}]}>
                          {translate('Gender')}
                        </Text>
                        <View style={styles.genderContainer}>
                          <TouchableOpacity
                            style={styles.radioContainer}
                            onPress={() => setFieldValue('genre', 'male')}>
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
                            <Text
                              style={[styles.radioText, {color: color.text}]}>
                              {translate('male')}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.radioContainer}
                            onPress={() => setFieldValue('genre', 'female')}>
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
                            <Text
                              style={[styles.radioText, {color: color.text}]}>
                              {translate('female')}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      {errors.genre && touched.genre && (
                        <Text style={styles.errorText}>{errors.genre}</Text>
                      )}

                      <View style={styles.inputContainer}>
                        <View style={styles.datePickerContainer}>
                          <Text style={[styles.label, {color: color.text}]}>
                            {translate('Birth Date')}
                          </Text>
                          <DateTimePicker
                            value={values.birthdate || new Date()}
                            mode="date"
                            display="default"
                            onChange={(event, date) => {
                              if (date) {
                                setFieldValue('birthdate', date);
                              }
                            }}
                          />
                        </View>
                      </View>

                      {errors.birthdate && touched.birthdate && (
                        <Text style={styles.errorText}>{errors.birthdate}</Text>
                      )}
                    </View>
                    <View style={styles.marginVerticalFlex}>
                      <Checkbox
                        style={styles.checkbox}
                        value={values.termsAndConditions}
                        onValueChange={newValue => {
                          setFieldValue('termsAndConditions', newValue);
                          handleChange('termsAndConditions');
                        }}
                      />
                      <Text style={{color: color.textSubdued}}>
                        {TEXTS.TERMS_AND_CONDITIONS}
                      </Text>
                    </View>
                    {errors.termsAndConditions &&
                      touched.termsAndConditions && (
                        <Text style={styles.errorText}>
                          {errors.termsAndConditions}
                        </Text>
                      )}
                    <CustomButton
                      title={TEXTS.SIGNUP}
                      filled
                      style={styles.button}
                      onPress={handleSubmit}
                      backgroundImage={require('../../assets/images/button.png')}
                    />
                    {/* <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 23,
                      }}>
                      <Text style={[{fontSize: 17}, {marginBottom: -20}]}>
                        {TEXTS.LOGIN_OR}
                      </Text>
                    </View> */}

                    <View style={styles.marginVerticalCenter}>
                      <Text
                        style={[
                          styles.accountTitle,
                          {color: color.textSubdued},
                        ]}>
                        {TEXTS.HAVE_ACCOUNT}
                      </Text>
                      <Pressable
                        onPress={() => {
                          navigation.navigate('LoginScreen');
                        }}>
                        <Text style={styles.loginText}>{TEXTS.LOGIN}</Text>
                      </Pressable>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        bottom: 10,
                      }}>
                      <TouchableOpacity
                        style={[styles.button, {right: 20}]}
                        onPress={() => {
                          promptAsync();
                        }}>
                        <Image
                          style={{height: 36, width: 36}}
                          source={GoogleImage}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.button, {left: 20}]}
                        // onPress={handleFacebookLogin}
                      >
                        <Image
                          style={{height: 36, width: 36}}
                          source={FacebookImage}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default SignupScreen;
