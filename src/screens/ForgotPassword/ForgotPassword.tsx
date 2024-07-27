import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AuthServices} from 'src/services/apiclient';
import styles from './styles';
import {ForgotPasswordScreenProps} from 'src/navigation/NavigationTypes';
import {useDispatch, useSelector} from 'react-redux';
import {setEmail, setPhone} from 'src/redux/slices/ForgotPassword';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {getIsDarkMode} from 'src/redux/slices/DarkModeSlice';
import {ImageBackground} from 'react-native';

const ForgotPassword = ({navigation}: ForgotPasswordScreenProps) => {
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputPhone, setInputPhone] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<'email' | 'phone'>(
    'email',
  );
  const dispatch = useDispatch();
  const translate = useSelector(getTranslate);
  const color = useThemeColors();

  // const handleSendSubmit = async () => {
  //   try {
  //     if (selectedOption === 'email') {
  //       dispatch(setEmail(inputEmail));
  //       await AuthServices.forgotPassword({email: inputEmail, phone: ''});
  //     } else if (selectedOption === 'phone') {
  //       dispatch(setPhone(inputPhone));
  //       await AuthServices.forgotPassword({email: '', phone: inputPhone});
  //     }
  //     navigateToEnterCodeScreen();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const navigateToEnterEmailScreen = () => {
    navigation.navigate('EnterEmailScreen');
  };

  const isDarkMode = useSelector(getIsDarkMode);
  const asset = !isDarkMode
    ? require('../../assets/images/forgot-password.png')
    : require('../../assets/images/forgot-password-dark.png');

  const button = !isDarkMode
    ? require('../../assets/images/button-rhino.png')
    : require('../../assets/images/button-blue-demin.png');
  return (
    <KeyboardAvoidingView
      style={[styles.keyboardView, {backgroundColor: color.background}]}
      behavior="padding">
      <SafeAreaView style={styles.safeAreaStyle}>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}>
          <Icon
            name="arrow-back"
            size={31}
            style={[styles.backButton, {color: color.icon}]}
          />
        </TouchableOpacity>
        {/* <View style={styles.progressBar}>
          <View style={[styles.progressStep, styles.activeStep]}></View>
          <View style={styles.progressStep}></View>
          <View style={styles.progressStep}></View>
        </View> */}
        <View style={styles.container}>
          <Image
            source={asset}
            resizeMode="stretch"
            style={{height: 350, width: 350}}
          />
          <Text style={[styles.forgotPasswordTitle, {color: color.text}]}>
            {translate('forgotPasswordTitle')}
          </Text>
          <Text style={[styles.accountTitle, {color: color.textSubdued}]}>
            {translate('accountTitle')}
          </Text>

          <View style={styles.optionContainer}>
            <ImageBackground
              source={button}
              style={styles.optionEmailButton}
              resizeMode="stretch">
              <TouchableOpacity
                style={[selectedOption === 'email' && styles.selectedOption]}
                onPress={navigateToEnterEmailScreen}>
                <Text
                  style={
                    selectedOption === 'email'
                      ? styles.selectedOptionText
                      : styles.optionText
                  }
                  >
                  {translate('EmailAddress')}
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>

          {/* {selectedOption === 'email' && (
            <View style={styles.inputContainer}>
              <Text style={styles.title}>{translate('email')}</Text>
              <View style={[styles.placeholder]}>
                <View style={styles.inputContainerFlex}>
                  <Icon
                    name="email"
                    size={24}
                    color="black"
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder={translate('enterEmail')}
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
              <Text style={styles.title}>{translate('phone')}</Text>
              <View style={[styles.placeholder]}>
                <View style={styles.inputContainerFlex}>
                  <Icon
                    name="phone"
                    size={24}
                    color="black"
                    style={styles.icon}
                  />
                  <Text style={styles.countryCode}>+84</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder={translate('enterPhone')}
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
            <TouchableOpacity
              style={styles.enterCodeButton}
              onPress={handleSendSubmit}>
              <Text style={styles.enterCodeButtonText}>
                {translate('enterCode')}
              </Text>
              <Icon
                name="arrow-forward"
                size={24}
                color="white"
                style={styles.enterCodeButtonIcon}
              />
            </TouchableOpacity>
          </View> */}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
