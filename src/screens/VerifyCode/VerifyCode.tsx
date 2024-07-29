import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import {Formik, FormikHelpers} from 'formik';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
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
import {COLORS, TEXTS} from 'src/constants';
import {
  SignupScreenProps,
  VerifyCodeProps,
} from 'src/navigation/NavigationTypes';
import {AuthServices} from 'src/services/apiclient';
import * as WebBrowser from 'expo-web-browser';
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

const VerifyCode = ({navigation, route}: VerifyCodeProps) => {
  const {email, phone} = route.params;
  const [verificationMethod, setVerificationMethod] = useState<string | null>(
    null,
  );
  const [otp, setOtp] = useState<string>('');

  const handleSendOTPVerify = async () => {
    try {
      const params = verificationMethod === 'phone' ? {phone} : {email};
      const result = await AuthServices.sendOTPVerify(params);
      console.log('OTP sent successfully:', result);
      return result;
    } catch (error) {
      console.error('Error in handleSendOTPVerify:', error);
      throw error;
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const params =
        verificationMethod === 'phone' ? {phone, otp} : {email, otp};
      const result = await AuthServices.verifyOTP(params);
      console.log('OTP verified successfully:', result);
      // Handle successful verification (e.g., navigate to another screen)
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error in handleVerifyOTP:', error.message);
        console.error('Error stack trace:', error.stack);
        // Log additional error properties if available
        if ((error as any).response) {
          const response = (error as any).response;
          console.error('Error response data:', response.data);
          console.error('Error response status:', response.status);
          console.error('Error response headers:', response.headers);
        }
      } else {
        console.error('Unexpected error:', error);
      }
      // Handle verification error
    }
  };

  const handleVerificationMethod = (method: string) => {
    setVerificationMethod(method);
    handleSendOTPVerify();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Verify Your Account</Text>
      <Text style={styles.subtitle}>
        Choose a method to verify your account:
      </Text>

      {!verificationMethod ? (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleVerificationMethod('phone')}>
            <Text style={styles.buttonText}>Verify by Phone</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleVerificationMethod('email')}>
            <Text style={styles.buttonText}>Verify by Email</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
            <Text style={styles.buttonText}>Submit OTP</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
    width: '80%',
    textAlign: 'center',
  },
});
export default VerifyCode;
