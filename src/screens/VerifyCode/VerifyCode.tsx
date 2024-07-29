import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import {Formik, FormikHelpers} from 'formik';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, TEXTS} from 'src/constants';
import {VerifyCodeProps} from 'src/navigation/NavigationTypes';
import {AuthServices} from 'src/services/apiclient';

const VerifyCode = ({navigation, route}: VerifyCodeProps) => {
  const {email, phone} = route.params;
  const [verificationMethod, setVerificationMethod] = useState<string | null>(
    null,
  );
  const [code, setCode] = useState<string>('');

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
        console.error('Error in handleVerifyOTP:', error.message);
        console.error('Error stack trace:', error.stack);
        if ((error as any).response) {
          const response = (error as any).response;
          console.error('Error response data:', response.data);
          console.error('Error response status:', response.status);
          console.error('Error response headers:', response.headers);
        }
      } else {
        console.error('Unexpected error:', error);
      }
      Alert.alert('Error', 'Verification failed. Please try again.');
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
            value={code}
            onChangeText={setCode}
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
