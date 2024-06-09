import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { UserProfile } from 'src/interface/user/userProfile';
import { useSelector } from 'react-redux';
import { selectProfile } from 'src/redux/slices/ProfileSclice';
import { TextInput } from 'react-native-paper';
import styles from './styles';

const EditProfileScreen = () => {

  const [profile, setProfile] = useState<UserProfile>();
  let user = useSelector(selectProfile);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    setProfile(user);
  }, [user]);

  const handleChangeAvatar = () => {
    // Thực hiện chức năng thay đổi avatar
  };

  const handleSaveChanges = () => {
    // Thực hiện lưu các thay đổi
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
          <MaterialIcons name="edit" size={24} color="#333333" style={styles.editIcon} />
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
