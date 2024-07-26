import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles'; 
import { EnterCodeScreenProps } from 'src/navigation/NavigationTypes';
import { AuthServices } from 'src/services/apiclient';
import { useDispatch, useSelector } from 'react-redux';
import { getPhone, getEmail, setCode } from 'src/redux/slices/ForgotPassword';
import { getTranslate } from 'src/redux/slices/languageSlice';
import { useThemeColors } from 'src/hooks/useThemeColor';

const EnterCodeScreen = ({ navigation }: EnterCodeScreenProps) => { 
  const [code, setCodeState] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const inputs = useRef([]);
  const phone = useSelector(getPhone);
  const email = useSelector(getEmail);
  const dispatch = useDispatch(); 
  const t= useSelector(getTranslate);
  const color = useThemeColors();
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
          Alert.alert(t('timeExpired'), t('codeExpiredMessage'), [
            { text: t('ok'), onPress: () => navigation.goBack() },
          ]);
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
        navigation.navigate('ResetPasswordScreen');
      } else {
        Alert.alert(t('error'), t('invalidOTP'));
      }
    } catch (error) {
      console.error(error);
      Alert.alert(t('error'), t('otpVerificationError'));
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
        <SafeAreaView style={[styles.safeAreaStyle, {backgroundColor:color.background}]}>
          <TouchableOpacity style={styles.arrowButton} onPress={() => { navigation.navigate('ForgotPassword') }}>
            <Icon name="arrow-back" size={30} style={styles.backButton} />
          </TouchableOpacity>

          <View style={styles.container}>
         
          <Text style={[styles.title, {color:color.text}]}>{t('enterVerificationCode')}</Text> 
          <Text style={[styles.subtitle, {color:color.text}]}>{t('pleaseEnterCode')}</Text> 
          <Text style={[styles.countdown, ]}>{t('timeRemaining')}{countdown} {t('s')}</Text>
          <View style={styles.inputContainer}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  style={[styles.input, {color: color.text}]}
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
