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
  const [selectedOption, setSelectedOption] = useState<'email' | 'phone'>(
    'email',
  );
  const translate = useSelector(getTranslate);
  const color = useThemeColors();

  const navigateToEnterEmailScreen = () => {
    navigation.navigate('EnterEmailScreen');
  };

  const isDarkMode = useSelector(getIsDarkMode);
  const asset = !isDarkMode
    ? require('../../assets/images/forgot-password.png')
    : require('../../assets/images/forgot-password-dark.png');

  const button = !isDarkMode
    ? require('../../assets/images/button-blue-demin.png')
    : require('../../assets/images/button-rhino.png');
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
                style={styles.selectedOption}
                onPress={navigateToEnterEmailScreen}>
                <Text style={styles.selectedOptionText}>
                  {translate('EmailAddress')}
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
