import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthServices } from 'src/services/apiclient';
import styles from './styles';
import { ForgotPasswordScreenProps } from 'src/navigation/NavigationTypes';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPhone } from 'src/redux/slices/ForgotPassword';
import { getTranslate } from 'src/redux/slices/languageSlice';

const ForgotPassword = ({ navigation }: ForgotPasswordScreenProps) => {
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputPhone, setInputPhone] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<'email' | 'phone'>('email');
  const dispatch = useDispatch(); 
  const t  = useSelector(getTranslate);


  const handleSendSubmit = async () => {
    try {
      if (selectedOption === 'email') {
        dispatch(setEmail(inputEmail));
        await AuthServices.forgotPassword({ email: inputEmail, phone: '' });
      } else if (selectedOption === 'phone') {
        dispatch(setPhone(inputPhone));
        await AuthServices.forgotPassword({ email: '', phone: inputPhone });
      }
      navigateToEnterCodeScreen();
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToEnterCodeScreen = () => {
    navigation.navigate('EnterCodeScreen'); 
  };

  return (
    <KeyboardAvoidingView style={styles.keyboardView} behavior="padding">
      <SafeAreaView style={styles.safeAreaStyle}>
        <TouchableOpacity style={styles.arrowButton} onPress={() => { navigation.navigate('LoginScreen'); }}>
          <Icon name="arrow-back" size={30} style={styles.backButton} />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressStep, styles.activeStep]}></View>
          <View style={styles.progressStep}></View>
          <View style={styles.progressStep}></View>
        </View>
        <View style={styles.container}>
          <Image
            source={{ uri: 'https://static.vecteezy.com/system/resources/previews/008/483/414/non_2x/the-concept-of-an-african-american-man-thinking-behind-a-laptop-vector.jpg' }}
            style={styles.image}
          />
          <Text style={styles.forgotPasswordTitle}>
            {t('forgotPasswordTitle')}
          </Text>
          <Text style={styles.accountTitle}>
            {t('accountTitle')}
          </Text>

          <View style={styles.optionContainer}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === 'email' && styles.selectedOption,
              ]}
              onPress={() => setSelectedOption('email')}
            >
              <Text style={selectedOption === 'email' ? styles.selectedOptionText : styles.optionText}>{t('email')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === 'phone' && styles.selectedOption,
              ]}
              onPress={() => setSelectedOption('phone')}
            >
              <Text style={selectedOption === 'phone' ? styles.selectedOptionText : styles.optionText}>{t('phone')}</Text>
            </TouchableOpacity>
          </View>

          {selectedOption === 'email' && (
            <View style={styles.inputContainer}>
              <Text style={styles.title}>{t('email')}</Text>
              <View style={[styles.placeholder]}>
                <View style={styles.inputContainerFlex}>
                  <Icon name="email" size={24} color="black" style={styles.icon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder={t('enterEmail')}
                    placeholderTextColor="gray"
                    keyboardType="email-address"
                    onChangeText={text => setInputEmail(text)}
                    value={inputEmail}
                  />
                </View>
              </View>
            </View>
          )}

          {selectedOption === 'phone' && (
            <View style={styles.inputContainer}>
              <Text style={styles.title}>{t('phone')}</Text>
              <View style={[styles.placeholder]}>
                <View style={styles.inputContainerFlex}>
                  <Icon name="phone" size={24} color="black" style={styles.icon} />
                  <Text style={styles.countryCode}>+84</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder={t('enterPhone')}
                    placeholderTextColor="gray"
                    keyboardType="phone-pad"
                    onChangeText={text => setInputPhone(text)}
                    value={inputPhone}
                  />
                </View>
              </View>
            </View>
          )}

          <View style={styles.arrowContainer}>
            <TouchableOpacity style={styles.enterCodeButton} onPress={handleSendSubmit}>
              <Text style={styles.enterCodeButtonText}>{t('enterCode')}</Text>
              <Icon name="arrow-forward" size={24} color="white" style={styles.enterCodeButtonIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
