import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import {useDispatch, useSelector} from 'react-redux';
import {addAsset} from 'src/redux/slices/AssetSlice';
import {selectSelectedFamily} from 'src/redux/slices/FamilySlice';
import {AddAssetScreenProps} from 'src/navigation/NavigationTypes';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ExpenseServices} from 'src/services/apiclient';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {Toast} from 'react-native-toast-notifications';

const AddAssetScreen = ({navigation}: AddAssetScreenProps) => {
  const dispatch = useDispatch();
  const family = useSelector(selectSelectedFamily);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [image, setImage] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const translate = useSelector(getTranslate);
  const color = useThemeColors();

  const handleSave = async () => {
    if (!family?.id_family || !name || !value || !purchaseDate) {
      Toast.show(translate('Please fill in all required fields'), {
        type: 'danger',
        duration: 3000,
      });

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
        newAsset.image_url,
      );

      if (data.data) {
        console.log(data.data);
        dispatch(addAsset(data.data));
        Toast.show('Asset saved successfully', {
          type: 'success',
          duration: 3000,
        });
        navigation.goBack();
      }
    } catch (error) {
      Toast.show('Failed to save asset', {
        type: 'danger',
        duration: 3000,
      });
    }
  };

  const handleImagePicker = async () => {
    if (Constants.platform.ios) {
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert(
          translate(
            'Sorry, we need camera roll permissions to make this work!',
          ),
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
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || purchaseDate;
    setPurchaseDate(currentDate);
  };

  const {height} = Dimensions.get('window');

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: color.background}]}>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollViewContent,
            {paddingBottom: 80},
          ]}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={30} color={color.text} />
            </TouchableOpacity>
            <Text style={[styles.title, {color: color.text}]}>
              {translate('Add Asset')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleImagePicker}
            style={styles.imageContainer}>
            {image ? (
              <Image source={{uri: image}} style={styles.assetImage} />
            ) : (
              <View style={styles.placeholderImage}>
                <Icon name="camera" size={40} color="#ccc" />
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, {color: color.text}]}>
                {translate('Asset Name')}
              </Text>
              <TextInput
                style={[styles.input, {color: color.text}]}
                placeholder={translate('Enter Asset Name')}
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, {color: color.text}]}>
                {translate('Description')}
              </Text>
              <TextInput
                style={[styles.input, {height: 100, color: color.text}]}
                placeholder={translate('Enter Description')}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, {color: color.text}]}>
                {translate('Value')}
              </Text>
              <TextInput
                style={[styles.input, {color: color.text}]}
                placeholder={translate('Enter Value')}
                value={value}
                onChangeText={setValue}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, {color: color.text}]}>
                {translate('Purchase Date')}
              </Text>
              <DateTimePicker
                value={purchaseDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={handleSave}
          style={styles.saveButton}
          activeOpacity={0.8}>
          <Text style={styles.saveButtonText}>{translate('Save')}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inner: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
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
    marginBottom: 16,
  },
  assetImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
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
  buttonContainer: {
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  saveButton: {
    backgroundColor: '#66C0F4',
    paddingVertical: 12,
    borderRadius: 100,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddAssetScreen;
