import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FamilyServices } from 'src/services/apiclient';
import { ViewFamilyScreenProps } from 'src/navigation/NavigationTypes';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { TEXTS } from 'src/constants';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { Member } from 'src/interface/member/member';
import { useSelector } from 'react-redux';
import { selectFamilyMembers, selectSelectedFamily } from 'src/redux/slices/FamilySlice';



const ViewMemberScreen: React.FC<ViewFamilyScreenProps> = ({ navigation, route }) => {
 
  const member = useSelector(selectFamilyMembers);




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
              <Text style={styles.text}>Name: {item.user.firstname} {item.user.lastname}</Text>
              <Text style={styles.text}>Email: {item.user.email}</Text>
              <Text style={styles.text}>Phone: {item.user.phone}</Text>

            </View>
          ))}
        </View>
        <TouchableOpacity
          
          style={styles.iconDetail}>
          
          <Material name="heart" size={50} color="blue" /> 

          <Text style={styles.text}>Member</Text>
        </TouchableOpacity>

    </ScrollView>
  );
};

export default ViewMemberScreen;
