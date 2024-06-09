import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { UserProfile } from 'src/interface/user/userProfile';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile, updateProfileSlice } from 'src/redux/slices/ProfileSclice';
import {  TextInput } from 'react-native-paper';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';
import { ProfileServices } from 'src/services/apiclient';
import { AppDispatch, RootState } from 'src/redux/store';
import Icon from 'react-native-vector-icons/Ionicons';

const EditProfileScreen = () => {

  const profile = useSelector((state: RootState) => state.profile.profile);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isUploadingImage, setIsUploadingImage] = React.useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>()



  const handleSaveChanges = () => {
  };

  const handleChangeAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
    });
    console.log('image')
    console.log(result);

    if (!result.canceled) {
        const a = result.assets[0]!
        const uri = a.uri
        setIsUploadingImage(true)
        const fileUrl = await ProfileServices.changeAvatar(uri)
        dispatch(updateProfileSlice({ ...profile, avatar: fileUrl }))
        setIsUploadingImage(false)
        console.log("fileUrl", fileUrl)
        // setImage(result.assets[0].uri);
    }
}
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
            <Icon name="add" size={30}  style={styles.editIcon} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          label="First Name"
          style={styles.input}
          value={profile?.firstname}
          onChangeText={setFirstName}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          label="Last Name"
          style={styles.input}
          value={profile?.lastname}
          onChangeText={setLastName}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          label="E-Mail"
          style={styles.input}
          value={profile?.email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          label="Phone Number"
          style={styles.input}
          value={profile?.phone}
          onChangeText={setPhoneNumber}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;

