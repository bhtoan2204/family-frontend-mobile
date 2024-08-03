import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import {Formik, FormikHelpers} from 'formik';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Linking,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FacebookImage from 'src/assets/images/facebook.png';
import GoogleImage from 'src/assets/images/google.png';
import CustomButton from 'src/components/Button';
import {COLORS, TEXTS} from 'src/constants';
import {
  HomeTabProps,
  LandingPageScreenProps,
  SignupScreenProps,
  WelcomeScreenProps,
} from 'src/navigation/NavigationTypes';
import {AuthServices, ChatServices} from 'src/services/apiclient';
import {AuthUrl} from 'src/services/urls';
import LocalStorage from 'src/store/localstorage';
import * as Yup from 'yup';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import * as WebBrowser from 'expo-web-browser';
import {makeRedirectUri, useAuthRequest} from 'expo-auth-session';
import * as Notifications from 'expo-notifications';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {getIsDarkMode} from 'src/redux/slices/DarkModeSlice';
interface FormValues {
  email: string;
  password: string;
  submit: null;
}
type CombinedScreenProps = SignupScreenProps &
  HomeTabProps &
  LandingPageScreenProps &
  WelcomeScreenProps;

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

const LoginScreen = ({navigation}: CombinedScreenProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const projectId = 'f5584d17-960b-4d2e-9f4d-1a6681f0bbea';
  const translate = useSelector(getTranslate);
  const color = useThemeColors();

  const handleLogin = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    try {
      const response = await AuthServices.login({
        email: values.email,
        password: values.password,
      });

      await LocalStorage.StoreAccessToken(response.accessToken);
      await LocalStorage.StoreRefreshToken(response.refreshToken);

      //navigation.navigate('HomeTab', {screen: 'HomeScreen'});
      navigation.navigate('LandingPage');
      actions.setStatus({success: true});
    } catch (error: any) {
      // navigation.navigate('TodoListStack', {
      //   screen: 'TodoList',
      //   params: { id_family: 96 },
      // });
      actions.setStatus({
        success: false,
      });
      actions.setErrors({submit: error.message});
    }
  };

  const handleFacebookLogin = async () => {
    try {
      Linking.openURL(AuthUrl.facebookLogin);

      const handleOpenUrl = async (event: {url: string}) => {
        console.log(event.url);
      };

      Linking.addEventListener('url', handleOpenUrl);

      navigation.navigate('HomeTab', {screen: 'HomeScreen'});

      return () => {
        Linking.removeAllListeners('url');
      };
    } catch (error: any) {
      console.log(error);
    }
  };

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
        {/* <ScrollView keyboardShouldPersistTaps="handled"></ScrollView> */}
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
            <View className="mx-7" style={{bottom: 95}}>
              <Image
                source={require('../../assets/images/logo-app-1.png')}
                resizeMode="stretch"
                style={styles.logo}
              />
              <View className="my-5" style={{marginTop: 100}}>
                {/* <Text style={styles.loginText}>Log in</Text> */}
              </View>
              <Formik
                initialValues={{email: '', password: '', submit: null}}
                onSubmit={handleLogin}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email(translate('INVALID_EMAIL'))
                    .required(translate('EMAIL_REQUIRED')),
                  password: Yup.string()
                    .max(255)
                    .min(6, translate('INVALID_PASSWORD'))
                    .required(translate('PASSWORD_REQUIRED')),
                })}>
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values,
                }) => (
                  <View style={{marginTop: 15}}>
                    <View className="mb-2">
                      {/* <Text className="text-base font-normal my-2">
                        {translate('EMAIL}
                      </Text> */}
                      <View
                        style={[
                          styles.row,
                          styles.TextInput,
                          {
                            borderColor: errors.email ? 'red' : '#2A475E',
                            backgroundColor: color.white,
                          },
                        ]}>
                        <MaterialCommunityIcons
                          name="email-outline"
                          style={[styles.Icon, {color: color.icon}]}
                        />
                        <TextInput
                          placeholder={translate('EMAIL_PLACEHOLDER')}
                          placeholderTextColor={
                            errors.email ? COLORS.red : color.textSubdued
                          }
                          keyboardType="email-address"
                          onBlur={handleBlur('email')}
                          onChangeText={handleChange('email')}
                          value={values.email}
                          style={[
                            {
                              marginLeft: 10,
                              width: '100%',
                              color: color.text,
                            },
                          ]}
                        />
                      </View>
                      {errors.email && touched.email && (
                        <View>
                          <Text
                            className="
                            text-xs text-red-500 mt-[5px] ml-[5px]
                          ">
                            {errors.email}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View className="mb-2" style={{marginTop: 20}}>
                      <View
                        style={[
                          styles.row,
                          {alignItems: 'center'},
                          styles.TextInput,
                          {
                            borderColor: errors.email ? 'red' : '#2A475E',
                            backgroundColor: color.white,
                          },
                        ]}>
                        <MaterialCommunityIcons
                          name="lock-outline"
                          style={[styles.Icon, {color: color.icon}]}
                        />
                        <TextInput
                          className="w-full"
                          placeholder={translate('PASSWORD_PLACEHOLDER')}
                          placeholderTextColor={
                            errors.password ? COLORS.red : color.textSubdued
                          }
                          secureTextEntry={!isPasswordVisible}
                          onBlur={handleBlur('password')}
                          onChangeText={handleChange('password')}
                          value={values.password}
                          style={[{marginLeft: 10, color: color.text}]}
                        />
                        <TouchableOpacity
                          className="absolute right-3"
                          onPress={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }>
                          {isPasswordVisible ? (
                            <Ionicons
                              name="eye"
                              style={[styles.eyeIcon, {color: color.text}]}
                            />
                          ) : (
                            <Ionicons
                              name="eye-off"
                              style={[styles.eyeIcon, {color: color.text}]}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                      {errors.password && touched.password && (
                        <View>
                          <Text
                            className="
                            text-xs text-red-500 mt-[5px] ml-[5px]
                          ">
                            {errors.password}
                          </Text>
                        </View>
                      )}
                    </View>
                    {errors.submit && (
                      <View>
                        <Text
                          className="
                            text-xs text-red-500 mt-[5px] ml-[5px]
                          ">
                          {errors.submit}
                        </Text>
                      </View>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}>
                      <Pressable
                        onPress={() => {
                          navigation.navigate('ForgotPasswordScreen');
                        }}>
                        <Text style={styles.forgotPassword}>
                          {translate('FORGOT_PASSWORD')}
                        </Text>
                      </Pressable>
                    </View>
                    <CustomButton
                      style={styles.button}
                      title={translate('Login')}
                      filled
                      onPress={handleSubmit}
                      backgroundImage={require('../../assets/images/button.png')}
                    />
                  </View>
                )}
              </Formik>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 23,
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
                  onPress={handleFacebookLogin}>
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
                  {translate('DONT_HAVE_ACCOUNT')}
                </Text>

                <TouchableOpacity
                  style={{top: 2}}
                  onPress={() => {
                    navigation.navigate('SignupScreen');
                  }}>
                  <Text
                    style={[
                      {color: '#66C0F4'},
                      {fontSize: 16},
                      {fontWeight: 'bold'},
                    ]}>
                    {translate('Sign up')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default LoginScreen;
