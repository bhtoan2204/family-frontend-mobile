import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { selectProfile } from 'src/redux/slices/ProfileSclice';
import AuthServices from 'src/services/apiclient/AuthServices';
import styles from './styles';
import { UserProfile } from 'src/interface/user/userProfile';
import { ProfileScreenProps } from 'src/navigation/NavigationTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootState } from 'src/redux/store';

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  let user = useSelector(selectProfile);



  const handleSignOut = async () => {
    try {
      //await AuthServices.Logout();
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleChangePassword = async () => {
    try {
      navigation.navigate('ChangePassword');
    } catch (error) {
      console.log('error', error);
    }
  };
  const handleEditProfile = async () => {
    try {
      navigation.navigate('EditProfile');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Profile</Text>
        </View>
        <View style={styles.profileView}>
          <Image
            source={profile?.avatar !== "[NULL]" ? { uri: profile?.avatar } : require('../../assets/images/avatar_default.jpg')}
            resizeMode="cover"
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.nameText}>{profile?.firstname} {profile?.lastname}</Text>
            <Text style={styles.emailText}>{profile?.email}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>General</Text>

          <TouchableOpacity style={styles.item} onPress={handleEditProfile}>
            <AntDesign name="user" size={24} color="#333333" style={styles.icon} />
            <View style={styles.itemContent}>
              <View>
                <Text style={styles.itemText}>Edit Profile</Text>
                <Text style={styles.itemSubText}>Change profile picture, number, E-mail, etc.</Text>
              </View>
              <Icon name="chevron-forward-outline" size={22} color="#1b2838" style={styles.iconChevron} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={handleChangePassword}>
            <AntDesign name="lock" size={24} color="#333333" style={styles.icon} />
            <View style={styles.itemContent}>
              <View>
                <Text style={styles.itemText}>Change Password</Text>
                <Text style={styles.itemSubText}>Update and strengthen account security</Text>
              </View>
              <Icon name="chevron-forward-outline" size={22} color="#1b2838" style={styles.iconChevron} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Preferences</Text>
          <TouchableOpacity style={styles.item} onPress={handleChangePassword}>
            <AntDesign name="mail" size={24} color="#333333" style={styles.icon} />
            <View style={styles.itemContent}>
              <View>
                <Text style={styles.itemText}>Feedback</Text>
                <Text style={styles.itemSubText}>Provide us with your valuable feedback</Text>
              </View>
              <Icon name="chevron-forward-outline" size={22} color="#1b2838" style={styles.iconChevron} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={handleSignOut}>
          <AntDesign name="logout" size={24} color="#333333" style={styles.icon} />
          <View style={styles.itemContent}>
            <View>
              <Text style={styles.itemText}>Log Out</Text>
              <Text style={styles.itemSubText}>Securely log out of Account</Text>
            </View>
            <Icon name="chevron-forward-outline" size={22} color="#1b2838" style={styles.iconChevron} />
          </View>
        </TouchableOpacity>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
