import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { useSelector } from 'react-redux';
import { AuthServices } from 'src/services/apiclient';
import { getPhone, getEmail, getCode } from 'src/redux/slices/ForgotPassword';
import { ResetPasswordScreenProps } from 'src/navigation/NavigationTypes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getTranslate } from 'src/redux/slices/languageSlice';

const ResetPasswordScreen = ({ navigation }: ResetPasswordScreenProps) => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowNewPassword = () => setShowNewPassword(prevState => !prevState);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(prevState => !prevState);
  const phone = useSelector(getPhone);
  const email = useSelector(getEmail);
  const code = useSelector(getCode);
  const t  = useSelector(getTranslate);

  const handleChangePassword = async () => {
    try {
      console.log(email, phone, code, newPassword);
      const response = await AuthServices.resetPassword({ email, phone, code, password: newPassword });
      console.log(response);
      if (response.message === 'Password has not been reset') {
        Alert.alert(t('error'), t('passwordResetFailed'));
        navigation.navigate('LoginScreen');
      } else {
        Alert.alert(t('success'), t('passwordResetSuccess'));
        navigation.navigate('LoginScreen');
      }
    } catch (error) {
      Alert.alert(t('error'), 'An error occurred while resetting the password.');
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.arrowButton} onPress={() => navigation.navigate('ForgotPassword')}>
            <Icon name="arrow-back" size={30} style={styles.backButton} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{t('changePassword')}</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6146/6146587.png' }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.label}>{t('newPassword')}</Text>
        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={t('enterNewPassword')}
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity onPress={toggleShowNewPassword}>
            <AntDesign name={showNewPassword ? 'eye' : 'eyeo'} size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>{t('confirmNewPassword')}</Text>
        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={t('confirmPassword')}
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={toggleShowConfirmPassword}>
            <AntDesign name={showConfirmPassword ? 'eye' : 'eyeo'} size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>{t('changePasswordButton')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;