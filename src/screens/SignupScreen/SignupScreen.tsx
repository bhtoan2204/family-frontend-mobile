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

const SignupScreen = ({navigation}: LoginScreenProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

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
      if (values.termsAndConditions === false) {
        actions.setStatus({
          success: false,
        });
        actions.setErrors({submit: TEXTS.TERMS_AND_CONDITIONS_REQUIRED});
      } else {
        await AuthServices.signup({
          email: values.email,
          password: values.password,
          firstname: values.firstName,
          lastname: values.lastName,
          phone: values.phoneNumber,
        });

        navigation.navigate('LoginScreen');
        actions.setStatus({success: true});
      }
    } catch (error: any) {
      actions.setStatus({
        success: false,
      });
      actions.setErrors({submit: error.message});
    }
  };

  useEffect(() => {
    if (response?.type === 'success') {
      const {code} = response.params;
    }
  }, [response]);

  return (
    <ImageBackground
      source={require('../../assets/images/login-wall-light.png')}
      style={{flex: 1}}
      resizeMode="stretch">
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
                  style={styles.backIcon}
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
                  firstName: '',
                  lastName: '',
                  email: '',
                  phoneNumber: '',
                  password: '',
                  termsAndConditions: false,
                  birthdate: null,
                  gender: '',
                  submit: null,
                }}
                onSubmit={handleSignup}
                validationSchema={Yup.object().shape({
                  firstName: Yup.string().required(TEXTS.FIRST_NAME_REQUIRED),
                  lastName: Yup.string().required(TEXTS.LAST_NAME_REQUIRED),
                  email: Yup.string()
                    .email(TEXTS.INVALID_EMAIL)
                    .required(TEXTS.EMAIL_REQUIRED),
                  phoneNumber: Yup.string()
                    .min(10, TEXTS.INVALID_PHONE_NUMBER)
                    .required(TEXTS.PHONE_NUMBER_REQUIRED),
                  password: Yup.string()
                    .max(255)
                    .min(6, TEXTS.INVALID_PASSWORD)
                    .required(TEXTS.PASSWORD_REQUIRED),
                  termsAndConditions: Yup.boolean()
                    .oneOf([true], TEXTS.TERMS_AND_CONDITIONS_REQUIRED)
                    .required(TEXTS.TERMS_AND_CONDITIONS_REQUIRED),
                })}>
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
                      <View
                        style={{
                          ...styles.placeholder,
                          borderColor: errors.firstName
                            ? COLORS.red
                            : COLORS.Rhino,
                        }}>
                        <MaterialCommunityIcons
                          name="account"
                          style={styles.Icon}
                        />
                        <TextInput
                          style={[
                            styles.textInput,
                            {marginLeft: 10, color: '#2A475E'},
                          ]}
                          placeholder={TEXTS.FIRST_NAME_PLACEHOLDER}
                          placeholderTextColor={
                            errors.firstName ? COLORS.red : '#A6A6A6'
                          }
                          onBlur={handleBlur('firstName')}
                          onChangeText={handleChange('firstName')}
                          value={values.firstName}
                        />
                      </View>
                      {errors.firstName && touched.firstName && (
                        <Text style={styles.errorText}>{errors.firstName}</Text>
                      )}
                    </View>
                    <View style={styles.marginBottom}>
                      {/* <Text style={styles.title}>{TEXTS.LAST_NAME}</Text> */}
                      <View
                        style={{
                          ...styles.placeholder,
                          borderColor: errors.lastName ? COLORS.red : '#2A475E',
                        }}>
                        <MaterialCommunityIcons
                          name="account"
                          style={styles.Icon}
                        />
                        <TextInput
                          style={[
                            styles.textInput,
                            {marginLeft: 10, color: '#2A475E'},
                          ]}
                          placeholder={TEXTS.LAST_NAME_PLACEHOLDER}
                          placeholderTextColor={
                            errors.lastName ? COLORS.red : '#A6A6A6'
                          }
                          onBlur={handleBlur('lastName')}
                          onChangeText={handleChange('lastName')}
                          value={values.lastName}
                        />
                      </View>
                      {errors.lastName && touched.lastName && (
                        <Text style={styles.errorText}>{errors.lastName}</Text>
                      )}
                    </View>
                    <View style={styles.marginBottom}>
                      <View
                        style={{
                          ...styles.placeholder,
                          borderColor: errors.birthdate ? COLORS.red : '#2A475E',
                        }}>
                        <MaterialCommunityIcons
                          name="calendar"
                          style={styles.Icon}
                        />
                        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                          <Text style={{ marginLeft: 10, color: '#2A475E' }}>
                            {values.birthdate ? values.birthdate.toLocaleDateString() : ''}
                          </Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                          <DateTimePicker
                            value={values.birthdate || new Date()}
                            mode="date"
                            display="default"
                            onChange={(event, date) => {
                              setShowDatePicker(false);
                              if (date) {
                                setFieldValue('birthdate', date);
                              }
                            }}
                          />
                        )}
                      </View>
                      {errors.birthdate && touched.birthdate && (
                        <Text style={styles.errorText}>{errors.birthdate}</Text>
                      )}
                    </View>
                    
                    <View style={styles.marginBottom}>
                      <View
                        style={{
                          ...styles.placeholder,
                          borderColor: errors.gender ? COLORS.red : '#2A475E',
                        }}>
                        <MaterialCommunityIcons
                          name="gender-male-female"
                          style={styles.Icon}
                        />
                        <Picker
                          selectedValue={values.gender}
                          style={{ marginLeft: 10, color: '#2A475E' }}
                          onValueChange={(itemValue) => setFieldValue('gender', itemValue)}
                        >
                          <Picker.Item label={"Male"} value="male" />
                          <Picker.Item label={"Female"} value="female" />
                        </Picker>
                      </View>
                      {errors.gender && touched.gender && (
                        <Text style={styles.errorText}>{errors.gender}</Text>
                      )}
                    </View>
                    <View style={styles.marginBottom}>
                      {/* <Text style={styles.title}>{TEXTS.EMAIL}</Text> */}
                      <View
                        style={{
                          ...styles.placeholder,
                          borderColor: errors.email ? COLORS.red : '#2A475E',
                        }}>
                        <MaterialCommunityIcons
                          name="email-outline"
                          style={styles.Icon}
                        />
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
                          borderColor: errors.phoneNumber
                            ? COLORS.red
                            : '#2A475E',
                        }}>
                        <MaterialCommunityIcons
                          name="phone-outline"
                          style={styles.Icon}
                        />
                        <TextInput
                          style={[
                            styles.textInput,
                            {marginLeft: 10, color: '#2A475E'},
                          ]}
                          placeholder={TEXTS.PHONE_NUMBER_PLACEHOLDER}
                          placeholderTextColor={
                            errors.phoneNumber ? COLORS.red : '#A6A6A6'
                          }
                          keyboardType="phone-pad"
                          onBlur={handleBlur('phoneNumber')}
                          onChangeText={handleChange('phoneNumber')}
                          value={values.phoneNumber}
                        />
                      </View>
                      {errors.phoneNumber && touched.phoneNumber && (
                        <Text style={styles.errorText}>
                          {errors.phoneNumber}
                        </Text>
                      )}
                    </View>
                    <View style={styles.marginBottom}>
                      {/* <Text style={styles.title}>{TEXTS.PASSWORD}</Text> */}
                      <View
                        style={{
                          ...styles.placeholder,
                          borderColor: errors.password ? COLORS.red : '#2A475E',
                        }}>
                        <MaterialCommunityIcons
                          name="lock-outline"
                          style={styles.Icon}
                        />
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
                            <Ionicons name="eye" style={styles.eyeIcon} />
                          ) : (
                            <Ionicons name="eye-off" style={styles.eyeIcon} />
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
                    <View style={styles.marginVerticalFlex}>
                      <Checkbox
                        style={styles.checkbox}
                        value={values.termsAndConditions}
                        onValueChange={newValue => {
                          setFieldValue('termsAndConditions', newValue);
                          handleChange('termsAndConditions');
                        }}
                      />
                      <Text style={{color: COLORS.Rhino}}>
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
                      <Text style={styles.accountTitle}>
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
