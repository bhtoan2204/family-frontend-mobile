import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
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

const AddMemberScreen: React.FC<AddEditFamilyMemberScreenProps> = ({
  navigation,
  route,
}) => {
  const {id_family, phone} = route.params || {};
  const [email, setEmail] = useState('');
  const [p_phone, setPhone] = useState(phone);
  const profile = useSelector(selectProfile);
  const t = useSelector(getTranslate);
  const color = useThemeColors();
  const openContacts = () => {
    navigation.navigate('Contact', {id_family});
  };

  useEffect(() => {
    setPhone(formatPhoneNumber(phone));
  }, [phone]);

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
        role: 'Member',
      });

      if (result.data === t('successMessage')) {
        Alert.alert(t('inform'), result.data);
      } else {
        Alert.alert(
          t('inform'),
          result.data,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: t('invite'),
              onPress: () => Invite(id_family, email, profile),
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error: any) {
      console.log('FamilyServices.addMember result:', error);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: color.background}]}>
      <KeyboardAvoidingView style={styles.keyboardView} behavior="padding">
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={34} color={color.text} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.title, {color: color.text}]}>
          {t('addFamilyMemberTitle')}
        </Text>

        <Image
          source={require('src/assets/images/add-family-member.png')}
          resizeMode="stretch"
          style={{
            width: 360,
            height: 262,
            alignSelf: 'center',
            marginVertical: 40,
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
                  color: COLORS.Rhino,
                }}
              />
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="phone-pad"
                placeholder={p_phone ? p_phone : t('enterPhoneNumber')}
                placeholderTextColor={color.textSubdued}
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
                <Icon name="person-add" size={24} style={styles.contactIcon} />
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
                color: COLORS.Rhino,
              }}
            />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder={t('familyMemberEmailPlaceholder')}
              placeholderTextColor={color.textSubdued}
              style={[
                styles.inputControl,
                {
                  color: email ? 'black' : '#A6A6A6',
                  backgroundColor: color.white,
                },
              ]}
              onChangeText={setEmail}
            />
          </View>
        </View>
      </KeyboardAvoidingView>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.addButtonContainer}>
          <CustomButton
            style={styles.btn}
            title="Add"
            filled
            onPress={handleAddMember}
            backgroundImage={require('src/assets/images/button.png')}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default AddMemberScreen;
