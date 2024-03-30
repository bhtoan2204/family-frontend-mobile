import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, TEXTS } from 'src/constants';
import styles from './styles';
import { FamilyServices } from 'src/services/apiclient';
import RoleService from 'src/services/apiclient/RoleServices';
import DropDownPicker from 'react-native-dropdown-picker';
import { AddEditFamilyMemberScreenProps } from 'src/navigation/NavigationTypes';

interface Role {
  label: string;
  value: string;
}

const AddMemberScreen: React.FC<AddEditFamilyMemberScreenProps> = ({ navigation, route }) => {
  const sheet = useRef(null);
  const { id_user, id_family } = route.params || {};
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddMember = async () => {
    try {
      console.log(email, phone, selectedRole);
      const result = await FamilyServices.addMember({
        id_family: id_family,
        gmail: email,
        phone: phone,
        role: selectedRole,
      });
      Alert.alert('Inform', result);
      console.log('FamilyServices.addMember result:', result);
    } catch (error: any) {
      console.log('FamilyServices.addMember result:', error);
    }
  };

  const getRole = async () => {
    try {
      const result = await RoleService.getAllRole();
      if (result && Array.isArray(result)) {
        const roles = result.map((role: any) => ({ label: role.name, value: role.role }));
        setRoles(roles);
        console.log('Role data found in response:', result);
      } else {
        console.log('Role data not found or invalid in response:', result);
      }
    } catch (error: any) {
      console.log('Failed to get roles', error);
    }
  };

  useEffect(() => {
    getRole();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollViewContent}>
  <KeyboardAvoidingView style={styles.keyboardView} behavior="padding">
    <View style={styles.headerfile}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} style={styles.backButton} />
      </TouchableOpacity>
    </View>
    <View style={styles.header}>
      <Text style={styles.title}>{TEXTS.ADD_FAMILY_MEMBER_TITLE}</Text>
    </View>
    <View style={styles.form}>
      <View>
        <View style={styles.input}>
          <Text style={styles.inputLabel}>{TEXTS.PHONE}</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="phone-pad"
            placeholder={TEXTS.PHONE_PLACEHOLDER}
            placeholderTextColor={COLORS.darkgray}
            style={styles.inputControl}
            onChangeText={setPhone}
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.inputLabel}>{TEXTS.FAMILY_MEMBER_EMAIL_LABEL}</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholder={TEXTS.FAMILY_MEMBER_EMAIL_PLACEHOLDER}
            placeholderTextColor={COLORS.darkgray}
            style={styles.inputControl}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.inputLabel}>{TEXTS.FAMILY_MEMBERS_RELATION_LABEL}</Text>
          <DropDownPicker
            open={isPickerOpen}
            setOpen={setIsPickerOpen}
            value={selectedRole}
            items={roles}
            setValue={setSelectedRole}
            placeholder="Select Relationship"
            containerStyle={{ height: 100 }}
            style={styles.inputControl}
          />
        </View>
      </View>
    </View>
  </KeyboardAvoidingView>
</View>

      <KeyboardAvoidingView behavior="padding" style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.btn} onPress={handleAddMember}>
          <Text style={styles.btnText}>Add Member</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddMemberScreen;
