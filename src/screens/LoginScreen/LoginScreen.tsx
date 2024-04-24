import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import {Formik, FormikHelpers} from 'formik';
import React, {useEffect, useState} from 'react';
import {
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
} from 'src/navigation/NavigationTypes';
import {AuthServices} from 'src/services/apiclient';
import {AuthUrl} from 'src/services/urls';
import LocalStorage from 'src/store/localstorage';
import * as Yup from 'yup';
import styles from './styles';
import {setCurrentNavigation} from 'src/redux/slices/NavigationSlice';
import {useDispatch} from 'react-redux';

interface FormValues {
  email: string;
  password: string;
  submit: null;
}
type CombinedScreenProps = SignupScreenProps &
  HomeTabProps &
  LandingPageScreenProps;

const LoginScreen = ({navigation}: CombinedScreenProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentNavigation(navigation));
  }, [navigation]);

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
      actions.setStatus({
        success: false,
      });
      actions.setErrors({submit: error.message});
    }
  };

  const handleGoogleLogin = async () => {
    try {
      Linking.openURL(AuthUrl.googleLogin);

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

  return (
    <ImageBackground
      source={require('../../assets/images/login-wall.png')}
      style={{flex: 1}}
      resizeMode="stretch">
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <SafeAreaView>
            <View className="mx-7">
              <View className="my-5">
                {/* <Text className="text-xl font-bold my-3 text-gray-900">
                  {TEXTS.LOGIN_WELCOME}
                </Text>
                <Text className="text-base text-gray-900">
                  {TEXTS.LOGIN_TITLE}
                </Text> */}
                <Text
                  style={[
                    {marginTop: 100},
                    {fontSize: 30},
                    {fontWeight: 'bold'},
                  ]}>
                  Log in
                </Text>
              </View>
              <Formik
                initialValues={{email: '', password: '', submit: null}}
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
                  <View style={{marginTop: 5}}>
                    <View className="mb-2">
                      {/* <Text className="text-base font-normal my-2">
                        {TEXTS.EMAIL}
                      </Text> */}
                      <View
                        style={[
                          styles.row,
                          {alignItems: 'center'},
                          styles.TextInput,
                          {borderColor: errors.email ? 'red' : COLORS.gray},
                        ]}>
                        <MaterialCommunityIcons
                          name="email-outline"
                          style={styles.Icon}
                        />
                        <TextInput
                          className="w-full"
                          placeholder={TEXTS.EMAIL_PLACEHOLDER}
                          placeholderTextColor={
                            errors.email ? COLORS.red : COLORS.gray
                          }
                          keyboardType="email-address"
                          onBlur={handleBlur('email')}
                          onChangeText={handleChange('email')}
                          value={values.email}
                          style={{marginLeft: 10}}
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
                          {borderColor: errors.email ? 'red' : COLORS.gray},
                        ]}>
                        <MaterialCommunityIcons
                          name="lock-outline"
                          style={styles.Icon}
                        />
                        <TextInput
                          className="w-full"
                          placeholder={TEXTS.PASSWORD_PLACEHOLDER}
                          placeholderTextColor={
                            errors.password ? COLORS.red : COLORS.gray
                          }
                          secureTextEntry={!isPasswordVisible}
                          onBlur={handleBlur('password')}
                          onChangeText={handleChange('password')}
                          value={values.password}
                          style={{marginLeft: 10}}
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
                    {/* <View className="flex-row my-1 items-center">
                      <Checkbox
                        className="mr-2"
                        value={isChecked}
                        onValueChange={setIsChecked}
                      />
                      <Text>{TEXTS.REMEMBER_ME}</Text>
                    </View> */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}>
                      <Pressable
                        onPress={() => {
                          navigation.navigate('ForgotPasswordScreen');
                        }}>
                        <Text style={[{color: '#8B7FBF'}, {fontSize: 16}]}>
                          {TEXTS.FORGOT_PASSWORD}
                        </Text>
                      </Pressable>
                    </View>
                    <CustomButton
                      style={styles.button}
                      title={TEXTS.LOGIN}
                      filled
                      onPress={handleSubmit}
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
                <Text style={[{fontSize: 17}, {marginBottom: -20}]}>
                  {TEXTS.LOGIN_OR}
                </Text>
              </View>
              <View style={styles.container}>
                <TouchableOpacity
                  style={[styles.button, {right: 20}]}
                  onPress={handleGoogleLogin}>
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
              <View className="flex-row justify-center my-5">
                <Text className="text-black text-base mr-1">
                  {TEXTS.DONT_HAVE_ACCOUNT}
                </Text>
                {/* <Pressable
                  onPress={() => {
                    navigation.navigate('SignupScreen');
                  }}>
                  <Text className={`text-base text-[${COLORS.login}]`}>
                    {TEXTS.SIGNUP}
                  </Text>
                </Pressable> */}
                <TouchableOpacity
                  style={{top: 2}}
                  onPress={() => {
                    navigation.navigate('SignupScreen');
                  }}>
                  <Text
                    style={[
                      {color: COLORS.login},
                      {fontSize: 16},
                      {fontWeight: 'bold'},
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
