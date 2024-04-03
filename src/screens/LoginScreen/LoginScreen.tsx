import {Ionicons} from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import {Formik, FormikHelpers} from 'formik';
import React, {useState} from 'react';
import {
  Image,
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
import {Button} from 'react-native-paper';

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
    <KeyboardAvoidingView className="flex-1 bg-white" behavior="padding">
      <ScrollView>
        <SafeAreaView>
          <View className="mx-5">
            <View className="my-5">
              <Text className="text-xl font-bold my-3 text-gray-900">
                {TEXTS.LOGIN_WELCOME}
              </Text>
              <Text className="text-base text-gray-900">
                {TEXTS.LOGIN_TITLE}
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
                <View>
                  <View className="mb-2">
                    <Text className="text-base font-normal my-2">
                      {TEXTS.EMAIL}
                    </Text>
                    <View
                      className={`h-12 w-full ${errors.email ? 'border-red-500' : 'border-gray-900'} border-[1px] rounded-lg items-center justify-center px-5`}>
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
                  <View className="mb-2">
                    <Text className="text-base font-normal my-2">
                      {TEXTS.PASSWORD}
                    </Text>
                    <View
                      className={`h-12 w-full ${errors.password ? 'border-red-500' : 'border-gray-900'} border-[1px] rounded-lg items-center justify-center px-5`}>
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
                  <View className="flex-row my-1 items-center">
                    <Checkbox
                      className="mr-2"
                      value={isChecked}
                      onValueChange={setIsChecked}
                    />
                    <Text>{TEXTS.REMEMBER_ME}</Text>
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
            <View className="flex-row my-1 items-center">
              <View className="h-[1px] bg-gray-300 flex-1 mx-[10px]" />
              <Text className="text-[14px]">{TEXTS.LOGIN_OR}</Text>
              <View className="h-[1px] bg-gray-300 flex-1 mx-[10px]" />
            </View>
            <View className="flex-row justify-center space-x-1">
              <TouchableOpacity
                className="flex-1 h-[52px] flex-row justify-center items-center border-[1px] rounded-[10px] mr-1 border-gray-00"
                onPress={handleGoogleLogin}>
                <Image
                  className="h-9 w-9"
                  source={GoogleImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 h-[52px] flex-row justify-center items-center border-[1px] rounded-[10px] mr-1 border-gray-00"
                onPress={handleFacebookLogin}>
                <Image
                  className="h-9 w-9"
                  source={FacebookImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-center my-5">
              <Text className="text-black text-base mr-1">
                {TEXTS.DONT_HAVE_ACCOUNT}
              </Text>
              <Pressable
                onPress={() => {
                  navigation.navigate('SignupScreen');
                }}>
                <Text className={`text-base text-[${COLORS.primary}]`}>
                  {TEXTS.SIGNUP}
                </Text>
              </Pressable>
            </View>
            <View className="flex-row justify-center">
              <Pressable
                onPress={() => {
                  navigation.navigate('ForgotPasswordScreen');
                }}>
                <Text className="text-base text-black underline font-bold">
                  {TEXTS.FORGOT_PASSWORD}
                </Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
