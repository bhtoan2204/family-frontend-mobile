import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { FamilyServices } from 'src/services/apiclient';
import { PurchasedScreenProps, ViewFamilyScreenProps } from 'src/navigation/NavigationTypes'; // Assuming you have defined FamilyScreenProps


type Family={
    id_family: number
    quantity: number;
    description: string;
    name: string;

}
const ViewFamilyScreen = ({navigation, route}: ViewFamilyScreenProps) => {
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
          {/* Add any other family information you want to display */}
        </View>
      ))}
    </ScrollView>
  );
};

export default ViewFamilyScreen;
