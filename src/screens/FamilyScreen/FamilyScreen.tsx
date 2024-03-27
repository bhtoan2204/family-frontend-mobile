import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { FamilyServices } from 'src/services/apiclient';
import { ViewFamilyScreenProps } from 'src/navigation/NavigationTypes'; // Sửa lại tên kiểu props nếu cần
import { FamilyStackProps } from 'src/navigation/NavigationTypes';
type Family = {
  id_family: number;
  quantity: number;
  description: string;
  name: string;
};



const ViewFamilyScreen: React.FC<ViewFamilyScreenProps> = ({ navigation, route }) => {
  const { id_user, id_family } = route.params;
  const [family, setFamily] = useState<Family[]>([]);

  const handleGetAllFamily = async () => {
    try {
      const familyInfo = await FamilyServices.getFamily({ id_family: id_family });
      setFamily(familyInfo);
    } catch (error: any) {
      console.log('FamilyServices.createFamily error:', error);
    }
  };

  useEffect(() => {
    handleGetAllFamily();
  }, []);

  return (
    <ScrollView>
      {family.map((item) => (
        <View key={item.id_family}>
          <Text>Name: {item.name}</Text>
          <Text>Quantity: {item.quantity}</Text>
          <Text>Description: {item.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default ViewFamilyScreen;
