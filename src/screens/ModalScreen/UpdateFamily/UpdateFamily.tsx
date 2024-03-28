import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FamilyServices } from 'src/services/apiclient';
import { UpdateFamilyScreenProps } from 'src/navigation/NavigationTypes';
import styles from './styles';

const UpdateFamilyScreen: React.FC<UpdateFamilyScreenProps> = ({ navigation, route }) => {
    const { id_user, id_family, name: initialName, description: initialDescription } = route.params;
    const [name, setName] = useState(initialName);
    const [description, setDescription] = useState(initialDescription);
  

    const handleUpdateFamily = async () => {
        try {
            const result = await FamilyServices.updateFamily({ id_family, name, description });
            Alert.alert('Success', 'Successfully updated family');
            //onClose(); // Close modal after successful update
        } catch (error: any) {
            Alert.alert('Fail', 'Failed to update family');
            console.log('FamilyServices.updateFamily error:', error);
        }
    };

    return (
        <View style={styles.modalContainer}>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={text => setName(text)} // Update name state
                placeholder="Enter name"
            />
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={text => setDescription(text)} // Update description state
                placeholder="Enter description"
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdateFamily}>
                <Text style={styles.buttonText}>Update Family</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UpdateFamilyScreen;
