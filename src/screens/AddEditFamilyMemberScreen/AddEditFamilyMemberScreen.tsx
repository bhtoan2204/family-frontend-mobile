import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  PermissionsAndroid,
  Platform,
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
import RoleService from 'src/services/apiclient/RoleServices';
import DropDownPicker from 'react-native-dropdown-picker';
import {AddEditFamilyMemberScreenProps} from 'src/navigation/NavigationTypes';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import CustomButton from 'src/components/Button';

interface Role {
  label: string;
  value: string;
}

const AddMemberScreen: React.FC<AddEditFamilyMemberScreenProps> = ({
  navigation,
  route,
}) => {
  const sheet = useRef(null);
  const {id_family, phone} = route.params || {};
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [p_phone, setPhone] = useState('');

  // useEffect(() => {
  //   getRole();
  // }, []);

  // const getRole = async () => {
  //   try {
  //     const result = await RoleService.getAllRole();
  //     if (result && Array.isArray(result)) {
  //       const roles = result.map((role: any) => ({
  //         label: role.name,
  //         value: role.role,
  //       }));
  //       setRoles(roles);
  //       console.log('Role data found in response:', result);
  //     } else {
  //       console.log('Role data not found or invalid in response:', result);
  //     }
  //   } catch (error: any) {
  //     console.log('Failed to get roles', error);
  //   }
  // };

  const openContacts = async () => {
    navigation.navigate('Contact', {id_family});
  };

  const handleAddMember = async () => {
    try {
      //console.log(email, phone, selectedRole);

      const result = await FamilyServices.addMember({
        id_family: id_family,
        gmail: email,
        phone: phone,
        role: 'Member',
      });
      //console.log(result);
      Alert.alert('Inform', result.data);
      console.log('FamilyServices.addMember result:', result);
    } catch (error: any) {
      console.log('FamilyServices.addMember result:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollViewContent}>
        <KeyboardAvoidingView style={styles.keyboardView} behavior="padding">
          <View style={styles.headerfile}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back-outline"
                size={34}
                style={styles.backButton}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>{TEXTS.ADD_FAMILY_MEMBER_TITLE}</Text>
          </View>
          <Image
            source={require('src/assets/images/add-family-member.png')}
            resizeMode="stretch"
            style={{
              width: 270,
              height: 262,
              alignSelf: 'center',
              marginVertical: 10,
            }}
          />
          <View style={styles.form}>
            <View>
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
                    placeholder={phone || 'Enter phone number'}
                    placeholderTextColor="#A6A6A6"
                    style={styles.inputPhone}
                    onChangeText={setPhone}
                  />
                  <TouchableOpacity
                    onPress={openContacts}
                    style={{zIndex: 1, right: 15, position: 'absolute'}}>
                    <Icon
                      name="person-add"
                      size={24}
                      style={styles.contactIcon}
                    />
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
                  placeholder={TEXTS.FAMILY_MEMBER_EMAIL_PLACEHOLDER}
                  placeholderTextColor="#A6A6A6"
                  style={styles.inputControl}
                  onChangeText={setEmail}
                />
              </View>
              <View
                style={[
                  styles.input,
                  {flexDirection: 'row', position: 'relative'},
                ]}>
                {/* <DropDownPicker
                  open={isPickerOpen}
                  setOpen={setIsPickerOpen}
                  value={selectedRole}
                  items={roles}
                  setValue={setSelectedRole}
                  placeholder="Select relationship"
                  placeholderStyle={{
                    color: '#A6A6A6',
                  }}
                  containerStyle={{height: 100, zIndex: 1}}
                  style={[styles.inputControl, {zIndex: 1, paddingLeft: 45}]} // Adjust paddingLeft to make room for the icon
                /> */}
                {/* <MaterialCommunityIcons
                  name="hand-heart-outline"
                  size={26}
                  style={{
                    position: 'absolute',
                    left: 20,
                    top: 10,
                    color: COLORS.Rhino,
                    zIndex: 2, // Ensure zIndex is higher than DropDownPicker
                  }}
                /> */}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.addButtonContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <CustomButton
            style={styles.btn}
            title={TEXTS.LOGIN}
            filled
            onPress={handleAddMember}
            backgroundImage={require('../../assets/images/button.png')}
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddMemberScreen;
