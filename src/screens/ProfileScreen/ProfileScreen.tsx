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
import { getTranslate } from 'src/redux/slices/languageSlice';

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  let user = useSelector(selectProfile);
  const translate = useSelector(getTranslate);



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
          <Text style={styles.headerText}>{translate('profile')}</Text>
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
          <Text style={styles.sectionHeader}>{translate('general')}</Text>

          <TouchableOpacity style={styles.item} onPress={handleEditProfile}>
            <AntDesign name="user" size={24} color="#333333" style={styles.icon} />
            <View style={styles.itemContent}>
              <View>
                <Text style={styles.itemText}>{translate('edit_profile')}</Text>
                <Text style={styles.itemSubText}>{translate('change_profile_picture')}</Text>
              </View>
              <Icon name="chevron-forward-outline" size={22} color="#1b2838" style={styles.iconChevron} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={handleChangePassword}>
            <AntDesign name="lock" size={24} color="#333333" style={styles.icon} />
            <View style={styles.itemContent}>
              <View>
                <Text style={styles.itemText}>{translate('change_password')}</Text>
                <Text style={styles.itemSubText}>{translate('update_security')}</Text>
              </View>
              <Icon name="chevron-forward-outline" size={22} color="#1b2838" style={styles.iconChevron} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{translate('preferences')}</Text>
          <TouchableOpacity style={styles.item} onPress={handleChangePassword}>
            <AntDesign name="mail" size={24} color="#333333" style={styles.icon} />
            <View style={styles.itemContent}>
              <View>
                <Text style={styles.itemText}>{translate('feedback')}</Text>
                <Text style={styles.itemSubText}>{translate('provide_feedback')}</Text>
              </View>
              <Icon name="chevron-forward-outline" size={22} color="#1b2838" style={styles.iconChevron} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={handleSignOut}>
          <AntDesign name="logout" size={24} color="#333333" style={styles.icon} />
          <View style={styles.itemContent}>
            <View>
              <Text style={styles.itemText}>{translate('log_out')}</Text>
              <Text style={styles.itemSubText}>{translate('securely_log_out')}</Text>
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