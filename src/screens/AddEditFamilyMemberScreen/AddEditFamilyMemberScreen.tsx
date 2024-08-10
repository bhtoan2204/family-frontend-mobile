import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, TEXTS} from 'src/constants';
import styles from './styles';
import {FamilyServices} from 'src/services/apiclient';
import {AddEditFamilyMemberScreenProps} from 'src/navigation/NavigationTypes';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import CustomButton from 'src/components/Button';
import {useSelector} from 'react-redux';
import Invite from './Invite';
import {selectProfile} from 'src/redux/slices/ProfileSclice';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import * as Clipboard from 'expo-clipboard';
import {Toast} from 'react-native-toast-notifications';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import {getIsDarkMode} from 'src/redux/slices/DarkModeSlice';

const AddMemberScreen: React.FC<AddEditFamilyMemberScreenProps> = ({
  navigation,
  route,
}) => {
  const isDarkMode = useSelector(getIsDarkMode);
  const {id_family, phone} = route.params || {};
  const [email, setEmail] = useState('');
  const [p_phone, setPhone] = useState(phone);
  const [inviteLink, setInviteLink] = useState('');
  const profile = useSelector(selectProfile);
  const t = useSelector(getTranslate);
  const color = useThemeColors();
  const openContacts = () => {
    navigation.navigate('Contact', {id_family});
  };

  useEffect(() => {
    setPhone(formatPhoneNumber(phone));
  }, [phone]);

  useEffect(() => {
    fetchCode();
  }, []);

  const fetchCode = async () => {
    try {
      const data = await FamilyServices.inviteMember(id_family);
      console.log(data);
      const link = `https://famfund.io.vn/services/invite?code=${data.code}&id_family=${id_family}`;
      setInviteLink(link);
    } catch (error) {
      console.log(error);
    }
  };

  const formatPhoneNumber = (phoneNumber?: string) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{3})$/);
    if (match) {
      return `+84${match[2]}${match[3]}${match[4]}`;
    }
    console.log(phoneNumber);
    return phoneNumber;
  };

  const handleAddMember = async () => {
    try {
      if (!p_phone && !email) {
        Alert.alert(
          t('missingInformation'),
          t('missingInformationMessage'),
          [
            {
              text: 'OK',
              onPress: () => console.log('Missing Information Alert Closed'),
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
        return;
      }

      let formattedPhone = p_phone;
      if (formattedPhone && !formattedPhone.startsWith('+84')) {
        formattedPhone = `+84${formattedPhone.replace(/\D/g, '')}`;
      }

      const result = await FamilyServices.addMember({
        id_family: id_family,
        gmail: email || '',
        phone: formattedPhone || '',
      });

      if (result) {
        //dispatch(addMember())
        Toast.show(t('successMessage'), {
          type: 'success',
          duration: 3000,
        });
      } else {
        Alert.alert(
          t('error'),
          t('errorMessage'),
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: t('invite'),
              onPress: () => Invite(id_family, email, profile, inviteLink),
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error: any) {
      console.log('FamilyServices.addMember result:', error);
    }
  };

  const handleOpenLink = async () => {
    if (inviteLink) {
      try {
        await Linking.openURL(inviteLink);
      } catch (error) {
        console.error('Error opening link:', error);
      }
    } else {
      Alert.alert('No invite link available.');
    }
  };

  const handleCopyLink = async () => {
    await Clipboard.setStringAsync(inviteLink);

    Toast.show('Link copied to clipboard', {
      type: 'success',
      duration: 3000,
    });
  };
  const handleShare = async () => {
    try {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(inviteLink, {
          mimeType: 'text/plain',
          dialogTitle: 'Share Invite Link',
          UTI: 'public.plain-text',
        });
      } else {
        Alert.alert('Sharing is not available on this device.');
      }
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };
  const button = !isDarkMode
    ? require('../../assets/images/button-rhino.png')
    : require('../../assets/images/button-blue-demin.png');
  return (
    <View style={[styles.container, {backgroundColor: color.background}]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior="padding"
        keyboardVerticalOffset={50}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AllMember', {
                    id_family: id_family,
                    forceUpdate: new Date().getTime(),
                  })
                }>
                <Icon name="chevron-back" size={34} color={color.icon} />
              </TouchableOpacity>
              <Text style={[styles.title, {color: color.text}]}>
                {t('addFamilyMemberTitle')}
              </Text>
            </View>

            <Image
              source={require('src/assets/images/add-family-member.png')}
              resizeMode="stretch"
              style={{
                width: 380,
                height: 262,
                alignSelf: 'center',
                marginVertical: 0,
                marginBottom: 10,
              }}
            />
            <View style={styles.form}>
              <View style={styles.input}>
                <View style={styles.inputContainer}>
                  <MaterialIcons
                    name="phone-iphone"
                    size={26}
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      marginLeft: 10,
                      color: color.icon,
                    }}
                  />
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="phone-pad"
                    placeholder={p_phone ? p_phone : t('enterPhoneNumber')}
                    placeholderTextColor={color.text}
                    style={[
                      styles.inputPhone,
                      {
                        color: p_phone ? color.text : '#A6A6A6',
                        backgroundColor: color.white,
                      },
                    ]}
                    value={p_phone}
                    onChangeText={setPhone}
                  />
                  <TouchableOpacity
                    onPress={openContacts}
                    style={{zIndex: 1, right: 15, position: 'absolute'}}>
                    <Icon name="person-add" size={24} color={color.text} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.input}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={26}
                  style={{
                    position: 'absolute',
                    zIndex: 1,
                    marginLeft: 20,
                    top: 10,
                    color: color.icon,
                  }}
                />
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  placeholder={t('familyMemberEmailPlaceholder')}
                  placeholderTextColor={color.text}
                  style={[
                    styles.inputControl,
                    {
                      color: email ? color.text : '#A6A6A6',
                      backgroundColor: color.white,
                    },
                  ]}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              <ImageBackground
                source={button}
                style={styles.optionEmailButton}
                resizeMode="stretch">
                <TouchableOpacity
                  style={styles.selectedOption}
                  onPress={handleAddMember}>
                  <Text style={styles.selectedOptionText}>
                    {t('Add member')}
                  </Text>
                </TouchableOpacity>
              </ImageBackground>

              <Text
                style={[styles.inviteLinkLabel, {color: 'gray', fontSize: 17}]}>
                {t('inviteLinkLabel')}{' '}
              </Text>
              <View
                style={[
                  styles.inviteLinkWrapper,
                  {backgroundColor: color.white},
                ]}>
                <View style={styles.inviteLinkContent}>
                  <TouchableOpacity
                    onPress={handleOpenLink}
                    style={styles.inviteLinkContainer}>
                    <Text style={styles.inviteLinkText}>
                      {inviteLink || t('generateInviteLink')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleCopyLink}
                    style={styles.copyButton}>
                    <Icon name="copy" size={24} color={color.text} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={handleShare}
                  style={styles.shareButton}>
                  <Icon
                    name="share-social"
                    size={24}
                    color={COLORS.BlueLight}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddMemberScreen;
