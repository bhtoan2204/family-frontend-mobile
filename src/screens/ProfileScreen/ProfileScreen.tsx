import {MaterialIcons} from '@expo/vector-icons';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../constants';
import {EditProfileScreenProps} from '../../navigation/NavigationTypes';
import styles from './styles';

const ProfileScreen = ({navigation}: EditProfileScreenProps) => {
  const handleSignOut = () => {
    // Sign out logic
  };
  return (
    <ScrollView style={styles.safeView}>
      <SafeAreaView style={styles.safeView}>
        <View style={styles.backgroundImageView}>
          <Image style={styles.backgroundImage} resizeMode="cover" />
        </View>
        <View style={styles.profileView}>
          <Image
            source={require('../../assets/images/google.png')}
            resizeMode="contain"
            style={styles.profileImage}
          />
          <Text style={styles.nameText}>Duong Pham</Text>
          <Text style={styles.emailText}>duong@gmail.com</Text>
          <View style={styles.locationView}>
            <MaterialIcons
              name="location-on"
              size={24}
              color={COLORS.primary}
            />
            <Text>Ho Chi Minh City, Vietnam</Text>
          </View>
          <View style={styles.infoView}>
            <View style={styles.infoItemView}>
              <Text style={styles.numberText}>122</Text>
              <Text style={styles.infoItemText}>Owned Families</Text>
            </View>
            <View style={styles.infoItemView}>
              <Text style={styles.numberText}>67</Text>
              <Text style={styles.infoItemText}>Joined</Text>
            </View>
            <View style={styles.infoItemView}>
              <Text style={styles.numberText}>77</Text>
              <Text style={styles.infoItemText}>Friends</Text>
            </View>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('EditProfileScreen')}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Add Friend</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View style={styles.signOutView}>
            <TouchableOpacity style={styles.changePasswordButton}>
              <Text>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signoutButton}
              onPress={handleSignOut}>
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ProfileScreen;
