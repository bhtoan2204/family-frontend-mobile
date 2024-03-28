import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FamilyServices } from 'src/services/apiclient';
import { ViewFamilyScreenProps } from 'src/navigation/NavigationTypes';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { TEXTS } from 'src/constants';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

type Member = {
  id_user: string;
  email: string;
  phone: string;
  firstname: string;
  lastname: string;
};

const ViewMemberScreen: React.FC<ViewFamilyScreenProps> = ({ navigation, route }) => {
  const { id_user, id_family } = route.params;
  const [member, setMember] = useState<Member[]>([]);


  const handleMember =async() => {
    try {
      const familyInfo = await FamilyServices.getAllMembers({ id_family: id_family });
      setMember(familyInfo);
    } catch (error: any) {
      console.log('FamilyServices.getFamily error:', error);
    }
  }
  useEffect(() => {
    handleMember();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerfile}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} style={styles.backButton} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>{TEXTS.MEMBER}</Text>

          {member.map((item) => (
            <View key={item.id_user} style={styles.familyContainer}>
              <Text style={styles.text}>Name: {item.lastname}</Text>
              <Text style={styles.text}>Email: {item.email}</Text>
              <Text style={styles.text}>Phone: {item.phone}</Text>

            </View>
          ))}
        </View>
        <TouchableOpacity
          onPress={handleMember}
          style={styles.iconDetail}>
          
          <Material name="heart" size={50} color="blue" /> 

          <Text style={styles.text}>Member</Text>
        </TouchableOpacity>

    </ScrollView>
  );
};

export default ViewMemberScreen;
