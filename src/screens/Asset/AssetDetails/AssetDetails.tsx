import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import moment from 'moment';
import { AssetDetailScreenProps } from 'src/navigation/NavigationTypes';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAsset, selectSelectedAsset, updateAsset } from 'src/redux/slices/AssetSlice';
import { ExpenseServices } from 'src/services/apiclient';

const AssetDetailScreen = ({ route, navigation }: AssetDetailScreenProps) => {
  const asset = useSelector(selectSelectedAsset);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(asset?.name);
  const [description, setDescription] = useState(asset?.description);
  const [value, setValue] = useState(asset?.value.toString());
  const [purchaseDate, setPurchaseDate] = useState(new Date(asset?.purchase_date));
  const [image, setImage] = useState(asset?.image_url);
  const dispatch= useDispatch();
  
  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setImage(asset?.image_url);
    setName(asset?.name);
    setDescription(asset?.description);
    setValue(asset?.value.toString());
    setPurchaseDate(new Date(asset?.purchase_date));
    setIsEditing(false);
  };

  const handleSavePress = async () => {
    const updatedAsset = {
      ...asset,
      name,
      description,
      value: parseInt(value, 10),
      purchase_date: purchaseDate.toISOString(),
      image_url: image,
    };
    try {
      const data = await ExpenseServices.updateAsset(
        asset?.id_asset,
        updatedAsset.id_family,
        updatedAsset.name,
        updatedAsset.description,
        updatedAsset.value,
        updatedAsset.purchase_date,
        updatedAsset.image_url
      );
      console.log(data);
      dispatch(updateAsset(data));
      setIsEditing(false);
      Alert.alert('Success', 'Asset updated successfully');
    } catch (error) {
        console.log(error);
      Alert.alert('Error', 'Failed to update asset');
    }
  };
  

  const handleDeletePress = async () => {
    try {
      await ExpenseServices.deleteAsset(asset?.id_family, asset?.id_asset);
      Alert.alert('Success', 'Asset deleted successfully');
      dispatch(deleteAsset(asset?.id_asset));
      navigation.navigate('AssetScreen');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete asset');
    }
  };

  const handleImagePicker = async () => {
    if (Constants.platform.ios) {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const renderDateTimePicker = () => {
    if (Platform.OS === 'ios' || isEditing) {
      return (
        <DateTimePicker
          value={purchaseDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || purchaseDate;
            setPurchaseDate(currentDate);
          }}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Asset Detail</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.assetImage} />
        {isEditing && (
          <TouchableOpacity onPress={handleImagePicker} style={styles.cameraIconContainer}>
            <Icon name="camera" size={24} color="#fff" style={styles.cameraIcon} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.assetInfo}>
        <Text style={styles.assetDetailLabel}>Asset Name</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter Asset Name"
          />
        ) : (
          <Text style={styles.assetDetailText}>{asset?.name}</Text>
        )}
        <Text style={styles.assetDetailLabel}>Description</Text>
        {isEditing ? (
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter Description"
            multiline
          />
        ) : (
          <Text style={styles.assetDetailText}>{asset?.description}</Text>
        )}
        <Text style={styles.assetDetailLabel}>Value</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
            placeholder="Enter Value"
          />
        ) : (
          <Text style={styles.assetDetailText}>{`${parseInt(asset?.value).toLocaleString()} VND`}</Text>
        )}
        <Text style={styles.assetDetailLabel}>Purchase Date</Text>
        {isEditing ? (
          <TouchableOpacity onPress={renderDateTimePicker}>
            <Text style={styles.input}>{moment(purchaseDate).format('YYYY-MM-DD')}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.assetDetailText}>{moment(asset?.purchase_date).format('YYYY-MM-DD')}</Text>
        )}
        <View style={styles.buttonContainer}>
          {isEditing ? (
            <>
              <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSavePress}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEditPress}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeletePress}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  assetImage: {
    width: '100%',
    height: 200,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 8,
    borderRadius: 20,
  },
  cameraIcon: {
    color: '#fff',
  },
  assetInfo: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  assetDetailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  assetDetailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#FF6347',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AssetDetailScreen;
