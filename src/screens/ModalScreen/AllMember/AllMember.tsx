import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, Dimensions, StyleSheet, Image } from 'react-native';
import { FamilyServices } from 'src/services/apiclient';
import { SwipeListView } from 'react-native-swipe-list-view';
import { COLORS, TEXTS } from 'src/constants';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { AllMemberScreenProps } from 'src/navigation/NavigationTypes';
import styles from './styles';

interface FormValues {
  id_family: number;
}

type Member = {
  lastname: string;
  firstname: string;
  email: string;
  phone: string;
};

const ViewAllMemberScreen = ({ navigation, route }: AllMemberScreenProps) => {
  const { id_user, id_family } = route.params;
  const [members, setMembers] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    handleViewAllMember();
  }, []);

  const handleViewAllMember = async () => {
    try {
      const result = await FamilyServices.getAllMembers({ id_family });
      console.log('FamilyServices.getAllMembers result:', result);
      setMembers(result);
    } catch (error) {
      console.log('FamilyServices.getAllMembers error:', error);
    }
  };

  const filteredMembers = members.filter(member =>
    member.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.phone.includes(searchQuery)
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { navigation.navigate('ViewFamily', { id_user,id_family }); }}>
            <FeatherIcon name="chevron-left" size={24} />
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

          <TouchableOpacity onPress={() => { }}>
            <FeatherIcon name="more-vertical" size={24} />
          </TouchableOpacity>
        </View>

        <SwipeListView
          data={filteredMembers}
          renderItem={({ item: member }) => (
            <TouchableOpacity style={styles.card}>
              <View style={styles.iconContainer}>
                <Image source={{ uri: 'https://pethouse.com.vn/wp-content/uploads/2023/06/meo-anh-long-ngan-833x800.jpg' }} style={styles.avatar} />

                <Text style={styles.cardText}>{member.firstname} {member.lastname}</Text>
                <Text style={styles.cardText}>{member.email}</Text>
                <Text style={styles.cardText}>{member.phone}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ViewAllMemberScreen;
