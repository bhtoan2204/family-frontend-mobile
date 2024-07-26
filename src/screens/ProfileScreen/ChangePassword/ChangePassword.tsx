import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import {ProfileServices} from 'src/services/apiclient';
import { ProfileScreenProps } from 'src/navigation/NavigationTypes';
import { useThemeColors } from 'src/hooks/useThemeColor';
import { useSelector } from 'react-redux';
import { getTranslate } from 'src/redux/slices/languageSlice';

const ChangePasswordScreen = ({ navigation }: ProfileScreenProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowCurrentPassword = () => setShowCurrentPassword(prevState => !prevState);
  const toggleShowNewPassword = () => setShowNewPassword(prevState => !prevState);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(prevState => !prevState);
  const color = useThemeColors();
  const translate = useSelector(getTranslate);

  const handleChangePassword = async () => {
    try {
        await ProfileServices.changePassword({oldPassword: currentPassword, newPassword: newPassword, confirmPassword: confirmPassword});
        //Alert.alert('Success','Password changed successfully');
      }
    catch(error){
      //Alert.alert('Error');
      console.log(error)
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: color.background}]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.headerText, {color: color.text}]}>{translate('Change Password')}</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6146/6146587.png' }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <Text style={[styles.label, {color: color.text}]}>{translate('Current Password')}</Text>
        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={24} color={color.text} style={styles.icon} />
          <TextInput
            style={[styles.input, {color: color.text}]}
            placeholder={translate('Enter current password')}
            secureTextEntry={!showCurrentPassword}
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <TouchableOpacity onPress={toggleShowCurrentPassword}>
            <AntDesign name={showCurrentPassword ? 'eye' : 'eyeo'} size={24} color={color.text} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.label, {color: color.text}]}>{translate('New Password')}</Text>
        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={24} color={color.text} style={styles.icon} />
          <TextInput
            style={[styles.input, {color: color.text}]}
            placeholder={translate('Enter new password')}
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity onPress={toggleShowNewPassword}>
            <AntDesign name={showNewPassword ? 'eye' : 'eyeo'} size={24} color={color.text} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.label, {color: color.text}]}>{translate('Confirm New Password')}</Text>
        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={24} color={color.text} style={styles.icon} />
          <TextInput
            style={[styles.input, {color: color.text}]}
            placeholder={translate('Confirm new password')}
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={toggleShowConfirmPassword}>
            <AntDesign name={showConfirmPassword ? 'eye' : 'eyeo'} size={24} color={color.text} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>{translate('Change Password')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChangePasswordScreen;