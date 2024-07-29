import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import moment from 'moment';
import {AssetDetailScreenProps} from 'src/navigation/NavigationTypes';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteAsset,
  selectSelectedAsset,
  updateAsset,
} from 'src/redux/slices/AssetSlice';
import {ExpenseServices} from 'src/services/apiclient';
import Modal from 'react-native-modal';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {Feather} from '@expo/vector-icons';
import {ScrollView} from 'react-native-gesture-handler';
import styles from './styles';

const AssetDetailScreen = ({route, navigation}: AssetDetailScreenProps) => {
  const asset = useSelector(selectSelectedAsset);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(asset?.name);
  const [description, setDescription] = useState(asset?.description);
  const [value, setValue] = useState(asset?.value.toString());
  const [purchaseDate, setPurchaseDate] = useState(
    new Date(asset?.purchase_date),
  );
  const [image, setImage] = useState(asset?.image_url);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const dispatch = useDispatch();
  const translate = useSelector(getTranslate);
  const color = useThemeColors();

  // Function to format currency
  const formatCurrency = (amount: string | number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(Number(amount));
  };

  // Function to parse currency input and return raw value
  const parseCurrency = (input: string) => {
    return input.replace(/[^\d]/g, ''); // Remove non-numeric characters
  };

  // Function to handle input changes
  const handleValueChange = (text: string) => {
    const rawValue = parseCurrency(text);
    setValue(rawValue);
  };

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
        updatedAsset.image_url,
      );
      console.log(data);
      dispatch(updateAsset(data));
      setImage(data?.image_url);
      setIsEditing(false);
      Toast.show('Asset updated successfully', {
        type: 'success',
        duration: 3000,
      });
    } catch (error) {
      Toast.show('Failed to update asset', {type: 'danger', duration: 3000});
    }
  };

  const confirmDelete = async () => {
    try {
      await ExpenseServices.deleteAsset(asset?.id_family, asset?.id_asset);
      Toast.show('Asset deleted successfully', {
        type: 'success',
        duration: 3000,
      });
      dispatch(deleteAsset(asset?.id_asset));
      navigation.navigate('AssetScreen');
    } catch (error) {
      Toast.show('Failed to delete asset', {type: 'danger', duration: 3000});
    }
  };

  const handleDeletePress = async () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this asset?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => confirmDelete()},
      ],
      {cancelable: true},
    );
  };

  const handleImagePicker = async () => {
    if (Constants.platform.ios) {
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Toast.show(
          'Sorry, we need camera roll permissions to make this work!',
          {type: 'danger', duration: 3000},
        );
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
      console.log(result.assets[0].uri);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setPurchaseDate(date);
    hideDatePicker();
  };

  const handleImagePress = () => {
    console.log('Image URI in handleImagePress:', image);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: color.background}]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color={color.text} />
          </TouchableOpacity>
          <Text style={[styles.title, {color: color.text}]}>{asset?.name}</Text>
          <TouchableOpacity onPress={handleEditPress}>
            <Feather name="edit" size={23} color={color.icon} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollView}>
          {image ? (
            <>
              <TouchableOpacity
                onPress={handleImagePress}
                style={styles.imageContainer1}>
                <Image source={{uri: image}} style={styles.assetImage} />
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.noImageContainer}>
              <Text style={styles.noImageText}>{translate('No Image')}</Text>
            </View>
          )}
          <View style={styles.imageContainer}>
            {isEditing && (
              <TouchableOpacity
                onPress={handleImagePicker}
                style={styles.cameraIconContainer}>
                <Icon
                  name="camera"
                  size={24}
                  color="white"
                  style={styles.cameraIcon}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={[styles.assetInfo, {backgroundColor: color.white}]}>
            <Text style={[styles.assetDetailLabel, {color: color.text}]}>
              {translate('Value')}
            </Text>
            {isEditing ? (
              <TextInput
                style={[styles.input, {color: color.text}]}
                value={formatCurrency(value)}
                onChangeText={handleValueChange}
                keyboardType="numeric"
                placeholder={translate('Enter Value')}
              />
            ) : (
              <Text
                style={[styles.assetDetailText, {color: color.textSubdued}]}>
                {formatCurrency(parseInt(asset?.value))}
              </Text>
            )}
            <Text style={[styles.assetDetailLabel, {color: color.text}]}>
              {translate('Asset Name')}
            </Text>
            {isEditing ? (
              <TextInput
                style={[styles.input, {color: color.text}]}
                value={name}
                onChangeText={setName}
                placeholder={translate('Enter Asset Name')}
              />
            ) : (
              <Text
                style={[styles.assetDetailText, {color: color.textSubdued}]}>
                {asset?.name}
              </Text>
            )}
            <Text style={[styles.assetDetailLabel, {color: color.text}]}>
              {translate('Description')}
            </Text>
            {isEditing ? (
              <TextInput
                style={[
                  styles.input,
                  styles.multilineInput,
                  {color: color.text},
                ]}
                value={description}
                onChangeText={setDescription}
                placeholder={translate('Enter Description')}
                multiline
              />
            ) : (
              <Text
                style={[styles.assetDetailText, {color: color.textSubdued}]}>
                {asset?.description}
              </Text>
            )}
            <Text style={[styles.assetDetailLabel, {color: color.text}]}>
              {translate('Purchase Date')}
            </Text>
            {isEditing ? (
              <>
                <TouchableOpacity onPress={showDatePicker}>
                  <Text style={[styles.input, {color: color.text}]}>
                    {moment(purchaseDate).format('YYYY-MM-DD')}
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  date={purchaseDate}
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </>
            ) : (
              <Text
                style={[styles.assetDetailText, {color: color.textSubdued}]}>
                {moment(asset?.purchase_date).format('YYYY-MM-DD')}
              </Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            {isEditing ? (
              <>
                <TouchableOpacity
                  style={[styles.button, styles.saveButton]}
                  onPress={handleSavePress}>
                  <Text style={styles.buttonText}>{translate('Save')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button]}
                  onPress={handleCancel}>
                  <Text style={styles.buttonText}>{translate('Cancel')}</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: 'red'}]}
                  onPress={handleDeletePress}>
                  <Text style={styles.buttonText}>{translate('Delete')}</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Icon name="close" size={30} color="#fff" />
          </TouchableOpacity>
          <Image source={{uri: image}} style={styles.modalImage} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AssetDetailScreen;
