import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ImageBackground,
  FlatList,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { AllMemberScreenProps } from 'src/navigation/NavigationTypes';
import { selectFamilyMembers } from 'src/redux/slices/FamilySlice';
import styles from './styles';
import { Member } from 'src/interface/member/member';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ViewAllMemberScreen = ({ navigation, route }: AllMemberScreenProps) => {
  const { id_family } = route.params || {};
  const members = useSelector(selectFamilyMembers);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleAddMember = () => {
    const phone = undefined;
    navigation.navigate('AddEditFamilyMember', { id_family, phone });
  };

  const handlePressMember = (member: Member) => {
    navigation.navigate('MemberDetails', { member: member });
  };


  // const filteredMembers = members
  //   ? members.filter(
  //       (member) =>
  //         member.user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         member.user.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         member.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         member.user.phone.includes(searchQuery)
  //     )
  //   : [];

  return (
    <ImageBackground
      source={require('../../assets/images/view-all-member.png')}
      style={{ flex: 1 }}
      resizeMode="stretch">
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ top: 250, backgroundColor: '#f0f0f0', padding: 20, borderTopLeftRadius: 60, borderTopRightRadius: 60, width: '100%', alignSelf: 'center', flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', zIndex: 1, alignItems: 'center', marginBottom: -10 }}>
              <View style={[styles.headerSearch, { bottom: 40, backgroundColor: '#8E8C8A', width: '60%', alignSelf: 'center', borderRadius: 12, padding: 3, height: 40, marginLeft: 40 }]}>
                <FeatherIcon color="white" name="search" size={17} style={{ padding: 10 }} />
                <TextInput
                  autoCapitalize="none"
                  autoComplete="off"
                  placeholder="Search..."
                  placeholderTextColor="white"
                  style={styles.headerSearchInput}
                  onChangeText={(text) => setSearchQuery(text)}
                  value={searchQuery}
                />
              </View>
              <View style={{ bottom: 40, backgroundColor: '#8E8C8A', height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 12, padding: 3, marginRight: 40 }}>
                <TouchableOpacity onPress={handleAddMember}>
                  <FeatherIcon name="plus" size={24} style={{ color: 'white' }} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ backgroundColor: '#f0f0f0' }}>
              <FlatList
                data={members}
                renderItem={({ item: member }) => (
                  <View style={{ padding: 11, paddingHorizontal: 0 }}>
                    <TouchableOpacity onPress={() => handlePressMember(member)} style={styles.card}>
                      <View style={styles.iconContainer}>
                        <View style={{ justifyContent: 'space-between', alignSelf: 'center', padding: 10, marginHorizontal: 5 }}>
                          <Image source={{ uri: member.user.avatar }} style={styles.avatar} />
                        </View>
                        <View style={styles.InforContainer}>
                          <Text style={styles.RoleText}>{member.familyRoles.role_name_en}</Text>
                          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', width: '70%' }}>
                            <MaterialIcons name="person" style={{ fontSize: 20, color: 'black', marginRight: 5 }} />
                            <Text style={styles.nameText}>{member.user.firstname} {member.user.lastname}</Text>
                          </View>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', width: '70%' }}>
                            <MaterialCommunityIcons name="email-outline" style={{ fontSize: 16, color: 'black', marginRight: 5 }} />
                            <Text style={styles.cardText} numberOfLines={1} ellipsizeMode="tail">{member.user.email}</Text>
                          </View>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', width: '70%' }}>
                            <MaterialCommunityIcons name="phone-outline" style={{ fontSize: 16, color: 'black', marginRight: 5 }} />
                            <Text style={styles.cardText} numberOfLines={1} ellipsizeMode="tail">{member.user.phone}</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={<View style={{ height: 250 }} />}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ViewAllMemberScreen;
