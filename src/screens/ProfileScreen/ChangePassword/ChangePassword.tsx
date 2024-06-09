import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { ProfileScreenProps } from 'src/navigation/NavigationTypes';
import { ProfileServices } from 'src/services/apiclient';

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

  const handleChangePassword = async () => {
    try {
        const result = await ProfileServices.changePassword({oldPassword: currentPassword, newPassword: newPassword, confirmPassword: confirmPassword});
        Alert.alert('Success','Password changed successfully');
      }
    catch(error){
      Alert.alert('Error');

    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Change Password</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6146/6146587.png' }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.label}>Current Password</Text>
        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter current password"
            secureTextEntry={!showCurrentPassword}
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <TouchableOpacity onPress={toggleShowCurrentPassword}>
            <AntDesign name={showCurrentPassword ? 'eye' : 'eyeo'} size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>New Password</Text>
        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity onPress={toggleShowNewPassword}>
            <AntDesign name={showNewPassword ? 'eye' : 'eyeo'} size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirm New Password</Text>
        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm new password"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={toggleShowConfirmPassword}>
            <AntDesign name={showConfirmPassword ? 'eye' : 'eyeo'} size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChangePasswordScreen;
