import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet'; // Import RBSheet
import { FamilyServices } from 'src/services/apiclient';
import { ViewFamilyScreenProps } from 'src/navigation/NavigationTypes';
import { COLORS, TEXTS } from 'src/constants';
import styles from './styles';
import BottomSheet from './BottomSheet';

type Family = {
  id_family: number;
  quantity: number;
  description: string;
  name: string;
};

const ViewFamilyScreen: React.FC<ViewFamilyScreenProps> = ({ navigation, route }) => {
  const { id_user, id_family } = route.params;
  const [family, setFamily] = useState<Family[]>([]);
  const bottomSheetRef = useRef<RBSheet>(null); 

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

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.open(); 
  };

  useEffect(() => {
    // Reload data when returning to this screen
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetFamily();
    });
    return unsubscribe;
  }, [navigation]);

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
        <TouchableOpacity onPress={handleOpenBottomSheet} style={styles.settingItem}>
          <Material name="pencil" size={24} color="black" />
          <Text style={styles.settingText}>Edit Family</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDeleteFamily(family[0]?.id_family)} style={styles.settingItem}>
          <Material name="delete" size={24} color="red" />
          <Text style={styles.settingText}>Delete Family</Text>
        </TouchableOpacity>
      </View>
      <RBSheet
        ref={bottomSheetRef}
        closeOnDragDown={true}
        height={300} 
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      >
        <BottomSheet id_user={id_user} id_family={id_family} name={family[0]?.name} description={family[0]?.description} />
      </RBSheet>
    </ScrollView>
  );
};

export default ViewFamilyScreen;
