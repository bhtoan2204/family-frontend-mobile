import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AntDesign} from '@expo/vector-icons';
import styles from './styles';
import {useSelector} from 'react-redux';
import {AuthServices} from 'src/services/apiclient';
import {getPhone, getEmail, getCode} from 'src/redux/slices/ForgotPassword';
import {ResetPasswordScreenProps} from 'src/navigation/NavigationTypes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {getIsDarkMode} from 'src/redux/slices/DarkModeSlice';

const ResetPasswordScreen = ({navigation}: ResetPasswordScreenProps) => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowNewPassword = () =>
    setShowNewPassword(prevState => !prevState);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(prevState => !prevState);
  const phone = useSelector(getPhone);
  const email = useSelector(getEmail);
  const code = useSelector(getCode);
  const t = useSelector(getTranslate);
  const color = useThemeColors();
  const handleBackPress = () => {
    navigation.navigate('EnterEmailScreen');
  };
  const handleChangePassword = async () => {
    try {
      console.log(email, phone, code, newPassword);
      const response = await AuthServices.resetPassword({
        email,
        phone,
        code,
        password: newPassword,
      });
      console.log(response);
      if (response.message === 'Password has not been reset') {
        Alert.alert(t('error'), t('passwordResetFailed'));
        navigation.navigate('LoginScreen');
      } else {
        Alert.alert(t('success'), t('passwordResetSuccess'));
        navigation.navigate('LoginScreen');
      }
    } catch (error) {
      Alert.alert(
        t('error'),
        'An error occurred while resetting the password.',
      );
      console.log(error);
    }
  };
  const isDarkMode = useSelector(getIsDarkMode);
  const button = !isDarkMode
    ? require('../../../assets/images/button-blue-demin.png')
    : require('../../../assets/images/button-rhino.png');
  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}>
      <SafeAreaView style={{backgroundColor: color.background, flex: 1}}>
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
          <View
            style={[
              styles.progressStep,
              styles.progressStepActive,
              {backgroundColor: color.progressBarActive},
            ]}></View>
        </View>

        <View style={styles.container}>
          <View style={styles.TextContainer}>
            <Text style={[styles.emailTitle, {color: color.text}]}>
              {t('CreateNewPassword')}
            </Text>
            <Text style={[styles.emailDetail, {color: color.textSubdued}]}>
              {t('CreateNewPasswordDetail')}
            </Text>
          </View>
          <View
            style={[
              styles.row,
              styles.TextInput,
              {
                borderColor: '#2A475E',
                backgroundColor: color.white,
                marginBottom: 20,
              },
            ]}>
            <TextInput
              style={[
                {
                  marginLeft: 10,
                  width: '100%',
                  color: color.text,
                },
              ]}
              placeholder={t('enterNewPassword')}
              secureTextEntry={!showNewPassword}
              value={newPassword}
              placeholderTextColor={color.textSubdued}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={toggleShowNewPassword}>
              <AntDesign
                name={showNewPassword ? 'eye' : 'eyeo'}
                size={24}
                color={color.icon}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.row,
              styles.TextInput,
              {
                borderColor: '#2A475E',
                backgroundColor: color.white,
                marginBottom: 20,
              },
            ]}>
            <TextInput
              placeholderTextColor={color.textSubdued}
              style={[
                {
                  marginLeft: 10,
                  width: '100%',
                  color: color.text,
                },
              ]}
              placeholder={t('confirmPassword')}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={toggleShowConfirmPassword}>
              <AntDesign
                name={showConfirmPassword ? 'eye' : 'eyeo'}
                size={24}
                color={color.icon}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity
            style={styles.changePasswordButton}
            onPress={handleChangePassword}>
            <Text style={styles.buttonText}>{t('changePasswordButton')}</Text>
          </TouchableOpacity> */}
          <View style={styles.optionContainer}>
            <ImageBackground
              source={button}
              style={styles.optionEmailButton}
              resizeMode="stretch">
              <TouchableOpacity
                style={styles.selectedOption}
                onPress={handleChangePassword}>
                <Text style={styles.selectedOptionText}>
                  {t('SavePassword')}
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>

          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Icon name="arrow-back" size={24} color={color.icon} />
            <Text style={[styles.backButtonText, {color: color.text}]}>
              {t('Back')}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;
