import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { useDispatch, useSelector } from 'react-redux';
import { addAsset } from 'src/redux/slices/AssetSlice';
import { selectSelectedFamily } from 'src/redux/slices/FamilySlice';
import { AddAssetScreenProps } from 'src/navigation/NavigationTypes';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { ExpenseServices } from 'src/services/apiclient';
import { getTranslate } from 'src/redux/slices/languageSlice';

const AddAssetScreen = ({ navigation }: AddAssetScreenProps) => {
  const dispatch = useDispatch();
  const family = useSelector(selectSelectedFamily);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [image, setImage] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false); 
  const translate = useSelector(getTranslate);

  const handleSave = async () => {
    if (!family?.id_family || !name || !value || !purchaseDate) {
      Alert.alert(translate('Error'), translate('Please fill in all required fields'));
      return;
    }
  
    const newAsset = {
      name,
      description,
      value: parseInt(value, 10),
      purchase_date: purchaseDate.toISOString(),
      image_url: image,
      id_family: family.id_family,
    };
  
    try {
      const data = await ExpenseServices.createAsset(
        newAsset.id_family,
        newAsset.name,
        newAsset.description,
        newAsset.value,
        newAsset.purchase_date,
        newAsset.image_url
      );
  
      if (data) {
        console.log(data);
        dispatch(addAsset(data));
        Alert.alert(translate('Success'), translate('Asset saved successfully'));
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert(translate('Error'), translate('Failed to save asset'));
    }
  };
  

  const handleImagePicker = async () => {
    if (Constants.platform.ios) {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert(translate('Sorry, we need camera roll permissions to make this work!'));
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || purchaseDate;
    setPurchaseDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>{translate('Add Asset')}</Text>
      </View>
      <TouchableOpacity onPress={handleImagePicker}>
        {image ? (
          <Image source={{ uri: image }} style={styles.assetImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Icon name="camera" size={40} color="#ccc" />
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{translate('Asset Name')}</Text>
          <TextInput
            style={styles.input}
            placeholder={translate('Enter Asset Name')}
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{translate('Description')}</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder={translate('Enter Description')}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{translate('Value')}</Text>
          <TextInput
            style={styles.input}
            placeholder={translate('Enter Value')}
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{translate('Purchase Date')}</Text>
        
            <DateTimePicker
              value={purchaseDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          
        </View>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleSave}>
        <Icon name="save-outline" size={40} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  assetImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginBottom: 16,
    borderRadius: 8,
  },
  form: {
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  addButton: {
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 16,
    right: 16,
    elevation: 3,
  },
});

export default AddAssetScreen;
