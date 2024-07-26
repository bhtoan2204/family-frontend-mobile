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
import {AntDesign, Ionicons} from '@expo/vector-icons';
import styles from './styles';
import {ProfileServices} from 'src/services/apiclient';
import {ProfileScreenProps} from 'src/navigation/NavigationTypes';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {useSelector} from 'react-redux';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {getIsDarkMode} from 'src/redux/slices/DarkModeSlice';

const ChangePasswordScreen = ({navigation}: ProfileScreenProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowCurrentPassword = () =>
    setShowCurrentPassword(prevState => !prevState);
  const toggleShowNewPassword = () =>
    setShowNewPassword(prevState => !prevState);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(prevState => !prevState);
  const color = useThemeColors();
  const translate = useSelector(getTranslate);

  const handleChangePassword = async () => {
    try {
      await ProfileServices.changePassword({
        oldPassword: currentPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });
      //Alert.alert('Success','Password changed successfully');
    } catch (error) {
      //Alert.alert('Error');
      console.log(error);
    }
  };
  const isDarkMode = useSelector(getIsDarkMode);
  const image = !isDarkMode
    ? require('../../../assets/images/change-password-light.png')
    : require('../../../assets/images/change-password-dark.png');
  const button = !isDarkMode
    ? require('../../../assets/images/button-rhino.png')
    : require('../../../assets/images/button-blue-demin.png');
  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: color.background}]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() =>
          navigation.navigate('HomeTab', {screen: 'ProfileScreen'})
        }>
        <Ionicons
          name="close"
          size={32}
          color={color.text}
          style={{marginLeft: 10, marginTop: 20}}
        />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} resizeMode="contain" />
        </View>
        <View
          style={{backgroundColor: color.white, padding: 30, borderRadius: 20}}>
          <View style={{height: 70}}></View>
          <View style={styles.header}>
            <Text style={[styles.headerText, {color: color.text}]}>
              {translate('Reset')}
            </Text>
            <Text style={[styles.headerText, {color: color.text}]}>
              {translate('YourPassword')}
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, {color: color.text}]}
              placeholder={translate('Enter current password')}
              secureTextEntry={!showCurrentPassword}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TouchableOpacity onPress={toggleShowCurrentPassword}>
              <AntDesign
                name={showCurrentPassword ? 'eye' : 'eyeo'}
                size={24}
                color={color.text}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, {color: color.text}]}
              placeholder={translate('Enter new password')}
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={toggleShowNewPassword}>
              <AntDesign
                name={showNewPassword ? 'eye' : 'eyeo'}
                size={24}
                color={color.text}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, {color: color.text}]}
              placeholder={translate('Confirm new password')}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={toggleShowConfirmPassword}>
              <AntDesign
                name={showConfirmPassword ? 'eye' : 'eyeo'}
                size={24}
                color={color.text}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <ImageBackground
            source={button}
            resizeMode="stretch"
            style={styles.changePasswordButton}>
            <TouchableOpacity onPress={handleChangePassword}>
              <Text style={styles.buttonText}>
                {translate('changePassword')}
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChangePasswordScreen;
