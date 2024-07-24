import React, { useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text, TextInput, PaperProvider } from 'react-native-paper';
import { FamilyServices } from 'src/services/apiclient';
import { UpdateFamilyScreenProps } from 'src/navigation/NavigationTypes';
import styles from './styles';
import { useSelector } from 'react-redux';
import { getTranslate } from 'src/redux/slices/languageSlice';
import { useThemeColors } from 'src/hooks/useThemeColor';

const UpdateFamilyScreen: React.FC<UpdateFamilyScreenProps> = ({
  route,
  navigation,
}) => {
  const { id_family, name, description } = route.params;

  const [familyName, setFamilyName] = useState<string>(name);
  const [familyDescription, setFamilyDescription] = useState<string>(description);
  const t = useSelector(getTranslate);
  const color = useThemeColors();

  const handleUpdateFamily = async () => {
    console.log('handleUpdateFamily called');

    try {
      console.log(familyName, familyDescription);

      await FamilyServices.updateFamily({
        id_family,
        name: familyName,
        description: familyDescription,
      });
      Alert.alert(t('Success'), t('Successfully updated family'), [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } catch (error: any) {
      console.log("Error in handleUpdateFamily:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: color.background }}>

      <View
        style={{
          flex: 1,
          marginHorizontal: 5,
          marginTop: 5,
          backgroundColor: color.background,
        }}>
        <View style={{ padding: 20 }}>
          <TextInput
            style={{ marginTop: 20, borderRadius: 20, backgroundColor: color.white }}
            label={t('Name')}
            mode="outlined"
            value={familyName}
            onChangeText={setFamilyName}
          />
        
          <TextInput
                style={{ marginTop: 20, borderRadius: 20, backgroundColor: color.white }}
                label={t('Description')}
                mode="outlined"
                value={familyDescription}
                onChangeText={setFamilyDescription}
              />
          
              <TouchableOpacity onPress={() => { 
                  console.log('TouchableOpacity pressed');
                  handleUpdateFamily();
                }} 
                  style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>{t('Save Changes')}</Text>
              </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UpdateFamilyScreen;
