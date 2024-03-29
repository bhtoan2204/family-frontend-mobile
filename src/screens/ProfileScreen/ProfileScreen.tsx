import { MaterialIcons } from '@expo/vector-icons';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from 'src/constants';
import { EditProfileScreenProps } from 'src/navigation/NavigationTypes';
import styles from './styles';
import { useEffect, useRef } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { getHeight } from 'src/utils/device/screen';
import LocalStorage from 'src/store/localstorage';
import useUserProfile from 'src/hooks/user/useUserProfile';

const ProfileScreen = ({ navigation }: EditProfileScreenProps) => {
  const sheetRef = useRef<RBSheet>(null);
  const { userProfile, loading, error } = useUserProfile();
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const userData = await LocalStorage.GetAccessToken();
  //     console.log("hâha")

  //     console.log(userData)
  //   }
  //   fetchUserData()
  // }, [])
  useEffect(() => {
    console.log("cout<<")
    console.log(userProfile)
  }, [userProfile])
  const openRBSheet = () => {
    sheetRef.current?.open();
  };

  const handleSignOut = () => {
    // Sign out logic
  };
  return (
    <ScrollView style={styles.safeView}>
      <SafeAreaView style={styles.safeView}>
        <RBSheet ref={sheetRef} height={getHeight(0.8)} useNativeDriver={true}
          dragFromTopOnly={true}
          dragOnContent={true}
          disableOverlay={false}
        >

          {/* Content of your RBSheet */}
          <View style={{ padding: 20 }}>
            <Text>RBSheet Content</Text>
          </View>
        </RBSheet>
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
              onPress={() => {
                openRBSheet();
              }}
            // onPress={() => navigation.navigate('EditProfileScreen')}

            >
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
