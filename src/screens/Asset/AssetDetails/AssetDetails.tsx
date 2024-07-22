import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Platform, Alert, Modal as RNModal } from 'react-native';
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
import Modal from 'react-native-modal';
import { getTranslate } from 'src/redux/slices/languageSlice';

const AssetDetailScreen = ({ route, navigation }: AssetDetailScreenProps) => {
  const asset = useSelector(selectSelectedAsset);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(asset?.name);
  const [description, setDescription] = useState(asset?.description);
  const [value, setValue] = useState(asset?.value.toString());
  const [purchaseDate, setPurchaseDate] = useState(new Date(asset?.purchase_date));
  const [image, setImage] = useState(asset?.image_url);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const translate = useSelector(getTranslate);

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
      dispatch(updateAsset(data));
      setIsEditing(false);
      Alert.alert('Success', 'Asset updated successfully');
    } catch (error) {
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

    if (!result.canceled) {
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

  const handleImagePress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>{translate('Asset Detail')}</Text>
      </View>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handleImagePress}>
          <Image source={{ uri: image }} style={styles.assetImage} />
        </TouchableOpacity>
        {isEditing && (
          <TouchableOpacity onPress={handleImagePicker} style={styles.cameraIconContainer}>
            <Icon name="camera" size={24} color="#fff" style={styles.cameraIcon} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.assetInfo}>
        <Text style={styles.assetDetailLabel}>{translate('Asset Name')}</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder={translate('Enter Asset Name')}
          />
        ) : (
          <Text style={styles.assetDetailText}>{asset?.name}</Text>
        )}
        <Text style={styles.assetDetailLabel}>{translate('Description')}</Text>
        {isEditing ? (
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={description}
            onChangeText={setDescription}
            placeholder={translate('Enter Description')}
            multiline
          />
        ) : (
          <Text style={styles.assetDetailText}>{asset?.description}</Text>
        )}
        <Text style={styles.assetDetailLabel}>{translate('Value')}</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
            placeholder={translate('Enter Value')}
          />
        ) : (
          <Text style={styles.assetDetailText}>{`${parseInt(asset?.value).toLocaleString()} VND`}</Text>
        )}
        <Text style={styles.assetDetailLabel}>{translate('Purchase Date')}</Text>
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
                <Text style={styles.buttonText}>{translate('Save')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                <Text style={styles.buttonText}>{translate('Cancel')}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEditPress}>
                <Text style={styles.buttonText}>{translate('Edit')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeletePress}>
                <Text style={styles.buttonText}>{translate('Delete')}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      <RNModal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={closeModal}>
          <View>
            <Image source={{ uri: asset?.image_url }} style={styles.modalImage} />
          </View>
        </TouchableOpacity>
      </RNModal>
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
    color: '#333',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
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
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  assetDetailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  assetDetailText: {
    fontSize: 16,
    marginBottom: 16,
    color: '#666',
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    flex: 1,
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    flex: 1,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#2196F3',
    flex: 1,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    flex: 1,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
});

export default AssetDetailScreen;
