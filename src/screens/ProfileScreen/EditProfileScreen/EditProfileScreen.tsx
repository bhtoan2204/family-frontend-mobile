import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform, Alert } from 'react-native';
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

const EditProfileScreen = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const [firstName, setFirstName] = useState(profile?.firstname || '');
  const [lastName, setLastName] = useState(profile?.lastname || '');
  const [gender, setGender] = useState(profile?.genre || 'male');
  const [birthDate, setBirthDate] = useState(new Date(profile?.birthdate || Date.now()));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

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
    console.log(formatDate(birthDate))
    try {
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>
      <View style={styles.avatarContainer}>
        <TouchableOpacity style={styles.avatarButton} onPress={handleChangeAvatar}>
          <Image
            source={profile?.avatar !== "[NULL]" ? { uri: profile?.avatar } : require('../../../assets/images/avatar_default.jpg')}
            style={styles.avatarImage} />
          <View style={styles.editContainer}>
            <Icon name="add" size={30} style={styles.editIcon} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          label="First Name"
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          label="Last Name"
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={styles.radioContainer}
            onPress={() => setGender('male')}
          >
            <View style={styles.radioCircle}>
              {gender === 'male' && <View style={styles.selectedRb} />}
            </View>
            <Text style={styles.radioText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioContainer}
            onPress={() => setGender('female')}
          >
            <View style={styles.radioCircle}>
              {gender === 'female' && <View style={styles.selectedRb} />}
            </View>
            <Text style={styles.radioText}>Female</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Birth Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
          <Text style={styles.datePickerText}>{birthDate.toDateString()}</Text>
          <AntDesign name="calendar" size={24} color="black" />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;
