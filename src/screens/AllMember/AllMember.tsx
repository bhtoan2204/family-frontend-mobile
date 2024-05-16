import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, Dimensions, Image, FlatList, Modal } from 'react-native';
import { FamilyServices } from 'src/services/apiclient';
import { COLORS, TEXTS } from 'src/constants';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { AllMemberScreenProps } from 'src/navigation/NavigationTypes';
import styles from './styles';

import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';

interface FormValues {
  id_family: number;
}

type Member = {
  lastname: string;
  firstname: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
};

const ViewAllMemberScreen = ({ navigation, route }: AllMemberScreenProps ) => {
  const {  id_family } = route.params || {};
  const [members, setMembers] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAddMemberModalVisible, setAddMemberModalVisible] = useState<boolean>(false); // State to control modal visibility
  const screenHeight = Dimensions.get('screen').height;
  const bottomSheetRef = useRef<RBSheet>(null); 


  const handleViewAllMember = async () => {
    try {
      const result = await FamilyServices.getAllMembers({ id_family });
      console.log('FamilyServices.getAllMembers result:', result);
      setMembers(result);
    } catch (error) {
      console.log('FamilyServices.getAllMembers error:', error);
    }
  };

  const handleAddMember = () => {
    const phone = undefined;
    navigation.navigate('AddEditFamilyMember', {id_family, phone });
  }
  const handleSettingIconPress = (member: Member) => {
    console.log('Settings icon pressed for member:', member);
  };
  const filteredMembers = members.filter(member =>
    member.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.phone.includes(searchQuery)
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleViewAllMember();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.navigate('ViewFamily', {  id_family }); }}>
        <Icon name="arrow-back" size={24} style={styles.backButton} />
        </TouchableOpacity>

          <View style={styles.headerSearch}>
            <FeatherIcon color="#778599" name="search" size={17} />
            <TextInput
              autoCapitalize="none"
              autoComplete="off"
              placeholder="Search..."
              placeholderTextColor="#778599"
              style={styles.headerSearchInput}
              onChangeText={text => setSearchQuery(text)}
              value={searchQuery}
            />
          </View>
          <TouchableOpacity onPress={handleAddMember}>
            <FeatherIcon name="plus" size={24} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredMembers}
          renderItem={({ item: member }) => (
            <TouchableOpacity style={styles.card}>
              <View style={styles.iconContainer}>
                <View>
                  <Image source={{ uri: member.avatar }} style={styles.avatar} />
                  <Text style={styles.RoleText}>{member.role}</Text>

                </View>
                <View style={styles.InforContainer}>
                  <Text style={styles.nameText}>{member.firstname} {member.lastname}</Text>
                  <Text style={styles.cardText}>{member.email}</Text>
                  <Text style={styles.cardText}>{member.phone}</Text>
                </View>
         
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      
      {/* <RBSheet
        ref={bottomSheetRef}
        closeOnDragDown={true}
        height={screenHeight*0.3} 
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      >
        <BottomSh id_user={id_user} id_family={id_family} />
      </RBSheet> */}
    </SafeAreaView>
  );
};

export default ViewAllMemberScreen;
