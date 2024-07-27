import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import {EnterCodeScreenProps} from 'src/navigation/NavigationTypes';
import {AuthServices} from 'src/services/apiclient';
import {useDispatch, useSelector} from 'react-redux';
import {getPhone, getEmail, setCode} from 'src/redux/slices/ForgotPassword';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';

const EnterCodeScreen = ({navigation}: EnterCodeScreenProps) => {
  const [code, setCodeState] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const [isVerified, setIsVerified] = useState(false); // Biến trạng thái cho mã OTP đã được xác nhận
  const inputs = useRef([]);
  const phone = useSelector(getPhone);
  const email = useSelector(getEmail);
  const dispatch = useDispatch();
  const translate = useSelector(getTranslate);
  const color = useThemeColors();

  useEffect(() => {
    if (code.join('').length === 6) {
      handleCheckCode();
    }
  }, [code]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown <= 1 && !isVerified) {
          // Kiểm tra biến trạng thái isVerified
          clearInterval(timer);
          Alert.alert(
            translate('timeExpired'),
            translate('codeExpiredMessage'),
            [{text: translate('ok'), onPress: () => navigation.goBack()}],
          );
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVerified]); // Thêm isVerified vào dependency array

  const handleCheckCode = async () => {
    try {
      let response = '';
      if (phone) {
        response = await AuthServices.checkOTP({
          email: '',
          phone,
          code: code.join(''),
        });
      } else if (email) {
        response = await AuthServices.checkOTP({
          email,
          phone: '',
          code: code.join(''),
        });
      }
      if (response.message === 'OTP is valid') {
        setIsVerified(true); // Cập nhật biến trạng thái isVerified
        await dispatch(setCode(code.join('')));
        navigation.navigate('ResetPasswordScreen');
      } else {
        Alert.alert(translate('error'), translate('invalidOTP'));
      }
    } catch (error) {
      console.error(error);
      Alert.alert(translate('error'), translate('otpVerificationError'));
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

  const handleKeyPress = ({nativeEvent: {key}}, index) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={styles.keyboardView} behavior="padding">
      <SafeAreaView
        style={[styles.safeAreaStyle, {backgroundColor: color.background}]}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressStep,
              styles.progressStepActive,
              {backgroundColor: color.progressBarActive},
            ]}></View>
          <View
            style={[
              styles.progressStep,
              styles.progressStepActive,
              {backgroundColor: color.progressBarActive},
            ]}></View>
          <View style={styles.progressStep}></View>
        </View>
        <View style={styles.container}>
          <View style={styles.TextContainer}>
            <Text style={[styles.emailTitle, {color: color.text}]}>
              {translate('ForgotYourPassword')}
            </Text>
            <Text style={[styles.emailDetail, {color: color.textSubdued}]}>
              {translate('ForgotYourPasswordDetail')}
            </Text>
          </View>
          <Text style={[styles.countdownText, {color: color.text}]}>
            {translate('timeRemaining')}
          </Text>
          <Text style={[styles.countdownTime, {color: color.red}]}>
            {countdown}
            {translate('s')}
          </Text>
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
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Icon name="arrow-back" size={24} color={color.icon} />
            <Text style={[styles.backButtonText, {color: color.text}]}>
              {translate('Back')}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default EnterCodeScreen;
