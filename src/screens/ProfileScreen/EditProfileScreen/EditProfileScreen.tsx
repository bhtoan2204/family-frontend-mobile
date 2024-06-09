import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { UserProfile } from 'src/interface/user/userProfile';
import { useSelector } from 'react-redux';
import { selectProfile } from 'src/redux/slices/ProfileSclice';

const EditProfileScreen = () => {

  const [profile, setProfile] = useState<UserProfile>();
  let user = useSelector(selectProfile);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');

  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

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
          <Image source={profile?.avatar !== "[NULL]" ? { uri: profile?.avatar } : require('../../assets/images/avatar_default.jpg')}
 />
          <MaterialIcons name="edit" size={24} color="#333333" style={styles.editIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <AntDesign name="user" size={24} color="#333333" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={profile?.firstname} 
          onChangeText={setFirstName}
        />
      </View>
      <View style={styles.inputContainer}>
        <AntDesign name="user" size={24} color="#333333" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={profile?.lastname} 
          onChangeText={setLastName}
        />
      </View>
      <View style={styles.inputContainer}>
        <AntDesign name="mail" size={24} color="#333333" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={profile?.email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <AntDesign name="phone" size={24} color="#333333" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingBottom: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarButton: {
    position: 'relative',
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 5,
    elevation: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#0080FF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
