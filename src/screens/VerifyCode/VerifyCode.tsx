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
import {
  SignupScreenProps,
  VerifyCodeProps,
} from 'src/navigation/NavigationTypes';
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
import {Button} from 'react-native-paper';
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  termsAndConditions: boolean;
  birthdate: Date | null;
  gender: string;
  submit: null;
}

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

const VerifyCode = ({navigation}: VerifyCodeProps) => {
  // const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // const [showDatePicker, setShowDatePicker] = useState(false);
  // const translate = useSelector(getTranslate);
  // const color = useThemeColors();

  // const [request, response, promptAsync] = useAuthRequest(
  //   {
  //     clientId:
  //       '79354209613-utvqpvit5utmdalov9jdjotulc1m5fq9.apps.googleusercontent.com',
  //     scopes: ['openid', 'profile', 'email'],
  //     redirectUri: makeRedirectUri({
  //       native: 'com.anonymous.mobile_shell://redirect',
  //     }),
  //   },
  //   discovery,
  // );

  // const handleSignup = async (
  //   values: FormValues,
  //   actions: FormikHelpers<FormValues>,
  // ) => {
  //   try {
  //     if (values.termsAndConditions === false) {
  //       actions.setStatus({
  //         success: false,
  //       });
  //       actions.setErrors({submit: TEXTS.TERMS_AND_CONDITIONS_REQUIRED});
  //     } else {
  //       await AuthServices.signup({
  //         email: values.email,
  //         password: values.password,
  //         firstname: values.firstName,
  //         lastname: values.lastName,
  //         phone: values.phoneNumber,
  //       });

  //       navigation.navigate('LoginScreen');
  //       actions.setStatus({success: true});
  //     }
  //   } catch (error: any) {
  //     actions.setStatus({
  //       success: false,
  //     });
  //     actions.setErrors({submit: error.message});
  //   }
  // };

  // useEffect(() => {
  //   if (response?.type === 'success') {
  //     const {code} = response.params;
  //   }
  // }, [response]);
  // const isDarkMode = useSelector(getIsDarkMode);
  // const background = !isDarkMode
  //   ? require('../../assets/images/login-wall-light.png')
  //   : require('../../assets/images/login-wall-dark.png');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Giang</Text>
      {/* <Formik initialValues={{otp: ''}} onSubmit={handleVerifyCode}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isSubmitting,
        }) => (
          <View>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('otp')}
              onBlur={handleBlur('otp')}
              value={values.otp}
              placeholder={translate('enter_otp')}
            />
            {errors.otp && <Text style={styles.error}>{errors.otp}</Text>}
            {errors.general && (
              <Text style={styles.error}>{errors.general}</Text>
            )}
            <Button
              onPress={handleSubmit}
              title={translate('verify')}
              disabled={isSubmitting}
            />
          </View>
        )}
      </Formik> */}
    </View>
  );
};

export default VerifyCode;
