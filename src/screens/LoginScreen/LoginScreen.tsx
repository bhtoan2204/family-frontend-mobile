
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { Formik, FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import FacebookImage from 'src/assets/images/facebook.png';
import GoogleImage from 'src/assets/images/google.png';
import CustomButton from 'src/components/Button';
import { COLORS, TEXTS } from 'src/constants';
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
import { useDispatch } from 'react-redux';
import * as WebBrowser from 'expo-web-browser';
import {makeRedirectUri, useAuthRequest} from 'expo-auth-session';
import * as Notifications from 'expo-notifications';
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

const LoginScreen = ({ navigation }: CombinedScreenProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const projectId = "f5584d17-960b-4d2e-9f4d-1a6681f0bbea"; 



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

      
      navigation.navigate('HomeTab', {screen: 'HomeScreen'});
      actions.setStatus({success: true});
    } catch (error: any) {
      // navigation.navigate('TodoListStack', {
      //   screen: 'TodoList',
      //   params: { id_family: 96 },
      // });
      actions.setStatus({
        success: false,
      });
      actions.setErrors({ submit: error.message });
    }
  };

  const handleFacebookLogin = async () => {
    try {
      Linking.openURL(AuthUrl.facebookLogin);

      const handleOpenUrl = async (event: { url: string }) => {
        console.log(event.url);
      };

      Linking.addEventListener('url', handleOpenUrl);

      navigation.navigate('HomeTab', { screen: 'HomeScreen' });

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
      const { code } = response.params;
    }
  }, [response]);

  return (
    <ImageBackground
      source={require('../../assets/images/login-wall-light.png')}
      style={{ flex: 1 }}
      resizeMode="stretch">
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
                  style={styles.backIcon}
                />
              </TouchableOpacity>
            </View>
            <View className="mx-7" style={{ bottom: 95 }}>
              <Image
                source={require('../../assets/images/logo-app-1.png')}
                resizeMode="stretch"
                style={styles.logo}
              />
              <View className="my-5" style={{ marginTop: 100 }}>
                {/* <Text style={styles.loginText}>Log in</Text> */}
              </View>
              <Formik
                initialValues={{ email: '', password: '', submit: null }}
                onSubmit={handleLogin}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email(TEXTS.INVALID_EMAIL)
                    .required(TEXTS.EMAIL_REQUIRED),
                  password: Yup.string()
                    .max(255)
                    .min(6, TEXTS.INVALID_PASSWORD)
                    .required(TEXTS.PASSWORD_REQUIRED),
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
                  <View style={{ marginTop: 15 }}>
                    <View className="mb-2">
                      {/* <Text className="text-base font-normal my-2">
                        {TEXTS.EMAIL}
                      </Text> */}
                      <View
                        style={[
                          styles.row,
                          styles.TextInput,
                          { borderColor: errors.email ? 'red' : '#2A475E' },
                        ]}>
                        <MaterialCommunityIcons
                          name="email-outline"
                          style={styles.Icon}
                        />
                        <TextInput
                          placeholder={TEXTS.EMAIL_PLACEHOLDER}
                          placeholderTextColor={
                            errors.email ? COLORS.red : '#A6A6A6'
                          }
                          keyboardType="email-address"
                          onBlur={handleBlur('email')}
                          onChangeText={handleChange('email')}
                          value={values.email}
                          style={[
                            {
                              marginLeft: 10,
                              width: '100%',
                              color: '#2A475E',
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
                    <View className="mb-2" style={{ marginTop: 20 }}>
                      <View
                        style={[
                          styles.row,
                          { alignItems: 'center' },
                          styles.TextInput,
                          { borderColor: errors.email ? 'red' : '#2A475E' },
                        ]}>
                        <MaterialCommunityIcons
                          name="lock-outline"
                          style={styles.Icon}
                        />
                        <TextInput
                          className="w-full"
                          placeholder={TEXTS.PASSWORD_PLACEHOLDER}
                          placeholderTextColor={
                            errors.password ? COLORS.red : '#A6A6A6'
                          }
                          secureTextEntry={!isPasswordVisible}
                          onBlur={handleBlur('password')}
                          onChangeText={handleChange('password')}
                          value={values.password}
                          style={[{ marginLeft: 10, color: '#2A475E' }]}
                        />
                        <TouchableOpacity
                          className="absolute right-3"
                          onPress={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }>
                          {isPasswordVisible ? (
                            <Ionicons name="eye" style={styles.eyeIcon} />
                          ) : (
                            <Ionicons name="eye-off" style={styles.eyeIcon} />
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
                          {TEXTS.FORGOT_PASSWORD}
                        </Text>
                      </Pressable>
                    </View>
                    <CustomButton
                      style={styles.button}
                      title={TEXTS.LOGIN}
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
                    { fontSize: 17 },
                    { marginBottom: -20 },
                    { color: '#2A475E' },
                  ]}>
                  {TEXTS.LOGIN_OR}
                </Text>
              </View>
              <View style={[styles.container, { bottom: 20 }]}>
                <TouchableOpacity
                  style={[styles.button, { right: 20 }]}
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
                  style={[styles.button, { left: 20 }]}
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
                style={{ bottom: 40 }}>
                <Text className="text-base mr-1" style={{ color: '#2A475E' }}>
                  {TEXTS.DONT_HAVE_ACCOUNT}
                </Text>

                <TouchableOpacity
                  style={{ top: 2 }}
                  onPress={() => {
                    navigation.navigate('SignupScreen');
                  }}>
                  <Text
                    style={[
                      { color: '#66C0F4' },
                      { fontSize: 16 },
                      { fontWeight: 'bold' },
                    ]}>
                    {TEXTS.SIGNUP}
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
