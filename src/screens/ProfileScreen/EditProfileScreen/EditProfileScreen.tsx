import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform, Alert, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { ProfileServices } from 'src/services/apiclient';
import { AppDispatch, RootState } from 'src/redux/store';
import { updateProfileSlice } from 'src/redux/slices/ProfileSclice';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { useThemeColors } from 'src/hooks/useThemeColor';
import { getTranslate } from 'src/redux/slices/languageSlice';

const EditProfileScreen = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const [firstName, setFirstName] = useState(profile?.firstname || '');
  const [lastName, setLastName] = useState(profile?.lastname || '');
  const [gender, setGender] = useState(profile?.genre || 'male');
  const [birthDate, setBirthDate] = useState(new Date(profile?.birthdate || Date.now()));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const color = useThemeColors();
  const translate = useSelector(getTranslate);

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const handleSaveChanges = async () => {
    const updatedProfile = {
      ...profile,
      firstname: firstName,
      lastname: lastName,
      gender: gender,
      birthDate: formatDate(birthDate),
    };
    try {
      console.log(firstName, lastName, gender, formatDate(birthDate))
      await ProfileServices.updateProfile({ firstname: firstName, lastname: lastName, genre: gender, birthdate: formatDate(birthDate) });
      dispatch(updateProfileSlice(updatedProfile));
      Alert.alert('Success', 'Profile updated successfully');

    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleChangeAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const a = result.assets[0]!;
      const uri = a.uri;
      setIsUploadingImage(true);
      const fileUrl = await ProfileServices.changeAvatar(uri);
      dispatch(updateProfileSlice({ ...profile, avatar: fileUrl }));
      setIsUploadingImage(false);
    }
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthDate(currentDate);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
      style={[styles.container, { backgroundColor: color.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: color.text }]}>{translate('editProfile')}</Text>
      </View>
      <View style={styles.avatarContainer}>
        <TouchableOpacity style={styles.avatarButton} onPress={handleChangeAvatar}>
          <Image
            source={profile?.avatar !== "[NULL]" ? { uri: profile?.avatar } : require('../../../assets/images/avatar_default.jpg')}
            style={styles.avatarImage}
          />
          <View style={[styles.editContainer, {backgroundColor: color.white}]}>
            <Icon name="add" size={30} color={color.black} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          label={translate('First Name')}
          style={[styles.input, { backgroundColor: color.white }]}
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          label={translate('Last Name')}
          style={[styles.input, { backgroundColor: color.white }]}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: color.text }]}>{translate('Gender')}</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={styles.radioContainer}
            onPress={() => setGender('male')}
          >
            <View style={[styles.radioCircle, { borderColor: color.text }]}>
              {gender === 'male' && <View style={[styles.selectedRb, { backgroundColor: color.black }]} />}
            </View>
            <Text style={[styles.radioText, { color: color.text }]}>{translate('male')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioContainer}
            onPress={() => setGender('female')}
          >
            <View style={[styles.radioCircle, { borderColor: color.text }]}>
              {gender === 'female' && <View style={[styles.selectedRb, { backgroundColor: color.black }]} />}
            </View>
            <Text style={[styles.radioText, { color: color.text }]}>{translate('female')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.inputContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        <Text style={[styles.label, { color: color.text }]}>{translate('Birth Date')}</Text>
   
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
  
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>{translate('Save Changes')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfileScreen;
