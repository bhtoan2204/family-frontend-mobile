import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { FamilyServices } from 'src/services/apiclient';
import { UpdateFamilyNavigationProps } from 'src/navigation/NavigationTypes';
import styles from './styles';
import { COLORS, TEXTS } from 'src/constants';
import Icon from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import { ViewFamilyScreenProps } from 'src/navigation/NavigationTypes';
type Family = {
  id_family: number;
  quantity: number;
  description: string;
  name: string;
};

const ViewFamilyScreen: React.FC<ViewFamilyScreenProps> = ({ navigation, route }) => {
  const { id_user, id_family } = route.params;
  const [family, setFamily] = useState<Family[]>([]);
  const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);

  const handleGetFamily = async () => {
    try {
      const familyInfo = await FamilyServices.getFamily({ id_family });
      setFamily(familyInfo);
    } catch (error: any) {
      console.log('FamilyServices.getFamily error:', error);
    }
  };

  const handleDeleteFamily = async (id_family: number) => {
    try {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this family?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              const result = await FamilyServices.deleteFamily({ id_family });
              Alert.alert(
                'Success',
                'Successfully deleted family'
              );
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error: any) {
      Alert.alert(
        'Fail',
        'Failed deleted family'
      );
      console.log('Error deleting family:', error);
    }
  };
  
  const handleUpdateFamily = (name: string, description: string) => {
    navigation.navigate('ModalStack', { screen: 'UpdateFamily', params: { id_user: id_user, id_family: family.id_family, name: name, description: description}})
  };

  useEffect(() => {
    handleGetFamily();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerfile}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} style={styles.backButton} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>{TEXTS.FAMILY_DETAIL}</Text>

        {family.map((item) => (
          <View key={item.id_family} style={styles.familyContainer}>
            <Text style={styles.text}>Name: {item.name}</Text>
            <Text style={styles.text}>Quantity: {item.quantity}</Text>
            <Text style={styles.text}>Description: {item.description}</Text>
          </View>
        ))}
      </View>
      <View style={styles.settingContainer}>
        <TouchableOpacity 
          onPress={() => handleUpdateFamily(family[0].name, family[0].description) }>
          <Material name="pencil" size={24} color="black" />
          <Text style={styles.settingText}>Edit Family</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDeleteFamily(family[0].id_family)} style={styles.settingItem}>
          <Material name="delete" size={24} color="red" />
          <Text style={styles.settingText}>Delete Family</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ViewFamilyScreen;
