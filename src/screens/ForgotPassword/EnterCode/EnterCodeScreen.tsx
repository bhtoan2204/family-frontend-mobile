import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles'; 
import { EnterCodeScreenProps } from 'src/navigation/NavigationTypes';
import { AuthServices } from 'src/services/apiclient';
import { useDispatch, useSelector } from 'react-redux';
import { getPhone, getEmail, setCode } from 'src/redux/slices/ForgotPassword';

const EnterCodeScreen = ({ navigation }: EnterCodeScreenProps) => { 
  const [code, setCodeState] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const inputs = useRef([]);
  const phone = useSelector(getPhone);
  const email = useSelector(getEmail);
  const dispatch = useDispatch(); 

  useEffect(() => {
    if (code.join('').length === 6) {
      handleCheckCode();
    }
  }, [code]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCheckCode = async () => {
    try {
      let response = '';
      if (phone) {
        response = await AuthServices.checkOTP({ email: '', phone, code: code.join('') });
      } else if (email) {
        response = await AuthServices.checkOTP({ email, phone: '', code: code.join('') });
      }
      if (response.message === 'OTP is valid') {
        await dispatch(setCode(code.join('')));
        navigation.navigate('ResetPasswordScreen')
      } else {
        Alert.alert('Error', 'Invalid OTP');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while verifying the OTP');
    }
  };

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCodeState(newCode);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = ({ nativeEvent: { key } }, index) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://static.vecteezy.com/system/resources/previews/008/483/414/non_2x/the-concept-of-an-african-american-man-thinking-behind-a-laptop-vector.jpg' }} 
      style={styles.keyboardView}
    >
      <KeyboardAvoidingView style={styles.keyboardView} behavior="padding">
        <SafeAreaView style={styles.safeAreaStyle}>
          <TouchableOpacity style={styles.arrowButton} onPress={() => { navigation.navigate('ForgotPassword') }}>
            <Icon name="arrow-back" size={30} style={styles.backButton} />
          </TouchableOpacity>
          <View style={styles.container}>
            <Text style={styles.title}>Enter Verification Code</Text> 
            <Text style={styles.subtitle}>Please enter the 6-digit code sent to your email or phone.</Text> 
            <Text style={styles.countdown}>{`Time remaining: ${countdown}s`}</Text>
            <View style={styles.inputContainer}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.input}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onChangeText={text => handleChange(text, index)}
                  onKeyPress={e => handleKeyPress(e, index)}
                  ref={ref => (inputs.current[index] = ref)}
                />
              ))}
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default EnterCodeScreen;
