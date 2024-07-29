import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Alert,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {AntDesign, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {Avatar} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import {ProfileServices} from 'src/services/apiclient';
import {AppDispatch, RootState} from 'src/redux/store';
import {updateProfileSlice} from 'src/redux/slices/ProfileSclice';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {ProfileScreenProps} from 'src/navigation/NavigationTypes';
import {COLORS} from 'src/constants';
import {Toast} from 'react-native-toast-notifications';

const EditProfileScreen = ({navigation}: ProfileScreenProps) => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const [firstName, setFirstName] = useState(profile?.firstname || '');
  const [lastName, setLastName] = useState(profile?.lastname || '');
  const [gender, setGender] = useState(profile?.genre || 'male');
  const [birthDate, setBirthDate] = useState(
    new Date(profile?.birthdate || Date.now()),
  );
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
      console.log(firstName, lastName, gender, formatDate(birthDate));
      await ProfileServices.updateProfile({
        firstname: firstName,
        lastname: lastName,
        genre: gender,
        birthdate: formatDate(birthDate),
      });
      dispatch(updateProfileSlice(updatedProfile));
      Toast.show('Profile updated successfully', {
        type: 'success',
        duration: 3000,
      });
    } catch (error) {
      Toast.show('Failed to update profile', {type: 'danger', duration: 3000});
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
      try {
        const data = await ProfileServices.changeAvatar(uri);
        if (data) {
          dispatch(updateProfileSlice({...profile, avatar: data.avatar}));
          setIsUploadingImage(false);
          Toast.show('Change avatar successfully', {
            type: 'success',
            duration: 3000,
          });
        } else {
          Toast.show('Fail to change avatar', {
            type: 'danger',
            duration: 3000,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthDate(currentDate);
  };

  return (
    <ImageBackground
      source={
        profile?.avatar !== '[NULL]'
          ? {uri: profile?.avatar}
          : require('../../../assets/images/avatar_default.jpg')
      }
      style={styles.backgroundImage}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <SafeAreaView>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() =>
              navigation.navigate('HomeTab', {screen: 'ProfileScreen'})
            }>
            <Ionicons
              name="close"
              size={32}
              color={COLORS.white}
              style={{marginLeft: 10, marginTop: 20}}
            />
          </TouchableOpacity>
          <View style={{top: 70}}>
            <View style={styles.avatarContainer}>
              <TouchableOpacity
                style={styles.avatarButton}
                onPress={handleChangeAvatar}>
                {/* <Image
                source={
                  profile?.avatar !== '[NULL]'
                    ? {uri: profile?.avatar}
                    : require('../../../assets/images/avatar_default.jpg')
                }
                style={styles.avatarImage}
              /> */}
                <Avatar
                  rounded
                  source={
                    profile?.avatar !== '[NULL]'
                      ? {uri: profile?.avatar}
                      : require('../../../assets/images/avatar_default.jpg')
                  }
                  size={150}
                  containerStyle={styles.avatarImage}
                />
                <View
                  style={[
                    styles.editContainer,
                    {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
                  ]}>
                  <Icon name="camera" size={18} color={COLORS.white} />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: color.card,
                padding: 20,
                borderRadius: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingBottom: 15,
                  borderBottomColor: color.border,
                  borderBottomWidth: 1,
                  marginBottom: 15,
                }}>
                <MaterialCommunityIcons
                  name="information"
                  color="#66C0F4"
                  size={28}
                  style={{marginRight: 10}}
                />
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: color.text}}>
                  {translate('Information')}
                </Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  label={translate('First Name')}
                  style={[styles.input, {backgroundColor: 'transparent'}]}
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  label={translate('Last Name')}
                  style={[styles.input, {backgroundColor: 'transparent'}]}
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={[styles.label, {color: color.text}]}>
                  {translate('Gender')}
                </Text>
                <View style={styles.genderContainer}>
                  <TouchableOpacity
                    style={styles.radioContainer}
                    onPress={() => setGender('male')}>
                    <View
                      style={[styles.radioCircle, {borderColor: color.text}]}>
                      {gender === 'male' && (
                        <View
                          style={[
                            styles.selectedRb,
                            {backgroundColor: color.text},
                          ]}
                        />
                      )}
                    </View>
                    <Text style={[styles.radioText, {color: color.text}]}>
                      {translate('male')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.radioContainer}
                    onPress={() => setGender('female')}>
                    <View
                      style={[styles.radioCircle, {borderColor: color.text}]}>
                      {gender === 'female' && (
                        <View
                          style={[
                            styles.selectedRb,
                            {backgroundColor: color.text},
                          ]}
                        />
                      )}
                    </View>
                    <Text style={[styles.radioText, {color: color.text}]}>
                      {translate('female')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={[
                  styles.inputContainer,
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <Text style={[styles.label, {color: color.text}]}>
                  {translate('Birth Date')}
                </Text>
                <DateTimePicker
                  value={birthDate}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              </View>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveChanges}>
                <Text style={styles.saveButtonText}>
                  {translate('Save Changes')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

export default EditProfileScreen;
