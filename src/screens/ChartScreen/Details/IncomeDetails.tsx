import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IncomeDetailScreenProps} from 'src/navigation/NavigationTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  selectSelectedFamily,
  setSelectedMemberById,
} from 'src/redux/slices/FamilySlice';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {IncomeType} from 'src/interface/income/getIncome';
import {IncomeServices} from 'src/services/apiclient';
import {COLORS} from 'src/constants';
import {Feather} from '@expo/vector-icons';
import moment from 'moment';
import {
  deleteIncome,
  getSelectedIncome,
  updateIncome,
} from 'src/redux/slices/IncomeAnalysis';
import {Member} from 'src/interface/member/member';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import DeleteButton from 'src/components/Button/DeleteButton';
import CancelButton from 'src/components/Button/CancelButton';
import SaveButton from 'src/components/Button/SaveButton';
import {Toast} from 'react-native-toast-notifications';

const IncomeDetailScreen = ({navigation}: IncomeDetailScreenProps) => {
  const dispatch = useDispatch();
  const income = useSelector(getSelectedIncome);

  const [isEditing, setIsEditing] = useState(false);
  const [incomeType, setincomeType] = useState<IncomeType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    income?.financeIncomeSource?.income_source_name || '',
  );

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [chosenDate, setChosenDate] = useState(new Date());
  const [editedDescription, setEditedDescription] = useState(
    income?.description || '',
  );
  const [editedAmount, setEditedAmount] = useState(
    income?.amount.toString() || '',
  );
  const [categoryTimeout, setCategoryTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  let family = useSelector(selectSelectedFamily);
  const [loading, setLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const translate = useSelector(getTranslate);
  const color = useThemeColors();
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(income?.financeIncomeSource.id_income_source);
  const [formattedAmount, setFormattedAmount] = useState(
    income?.amount.toString() || '',
  );

  useEffect(() => {
    if (income?.amount) {
      handleAmountChange(income.amount.toString());
    }
  }, [income?.amount]);

  useEffect(() => {
    fetchincomeType(family?.id_family);
  }, [family?.id_family]);

  useEffect(() => {
    console.log('Selected Category:', selectedCategory);
    const id = incomeType.find(
      item => item.income_source_name === selectedCategory,
    )?.id_income_source;
    setSelectedCategoryId(id);
    console.log('Selected Category ID:', id);
  }, [selectedCategory, incomeType]);

  const fetchincomeType = async (id_family: any) => {
    try {
      const response = await IncomeServices.getIncomeType(id_family);
      console.log('Fetched income types:', response);
      setincomeType(response);
    } catch (error: any) {
      console.error('Error in getincomeType:', error.message);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      const amount = parseFloat(editedAmount);
      if (!selectedCategoryId) {
        Toast.show('Invalid amount format', {type: 'danger', duration: 3000});
        return;
      }

      if (selectedCategoryId !== undefined) {
        const data = await IncomeServices.updateIncome(
          income?.id_income,
          family?.id_family,
          amount,
          income?.id_created_by,
          selectedCategoryId,
          chosenDate.toISOString(),
          editedDescription,
        );
        dispatch(updateIncome(data));

        Toast.show('Income updated successfully', {
          type: 'success',
          duration: 3000,
        });
        setIsEditing(false);
      } else {
        Toast.show('Selected category not found', {
          type: 'danger',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error updating income:', error);
      Toast.show('An error occurred while updating income', {
        type: 'danger',
        duration: 3000,
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
  const handleDelete = () => {
    Alert.alert(
      'Delete income',
      'Are you sure you want to delete this income?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            if (income?.id_income) {
              try {
                const respone = await IncomeServices.deleteIncome(
                  income.id_income,
                  income.id_family,
                );
                console.log(respone);
                if (respone) {
                  dispatch(deleteIncome(income.id_income));
                  Toast.show('Income delete successfully', {
                    type: 'success',
                    duration: 3000,
                  });
                  navigation.goBack();
                }
              } catch (error) {
                Toast.show(error, {
                  type: 'danger',
                  duration: 3000,
                });
              }
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  const formatCurrency = (amount: string) => {
    return parseFloat(amount).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || chosenDate;
    setShowDatePicker(Platform.OS === 'ios');
    setChosenDate(currentDate);
  };

  const handleCategoryChange = (itemValue: string) => {
    setSelectedCategory(itemValue);
  };

  const pressMember = (id_user?: string) => {
    dispatch(setSelectedMemberById(id_user));
    navigation.navigate('FamilyStack', {screen: 'MemberDetails'});
  };
  const formatNumberWithDots = (value: any) => {
    if (value === '') return '';

    const rawValue = value.replace(/[^\d]/g, '');

    const parts = rawValue.split('').reverse();
    const formattedValue = parts
      .reduce((acc, digit, index) => {
        if (index > 0 && index % 3 === 0) {
          acc.push('.');
        }
        acc.push(digit);
        return acc;
      }, [])
      .reverse()
      .join('');

    return formattedValue;
  };

  const handleAmountChange = (text: string) => {
    const formatted = formatNumberWithDots(text);
    const rawValue = formatted.replace(/\./g, '');
    const numericValue = parseFloat(rawValue);
    setEditedAmount(numericValue.toString());
    setFormattedAmount(formatted);
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: color.background}]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
          <View style={[styles.container, {backgroundColor: color.background}]}>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.headerButton}>
                <Icon name="close-outline" size={30} color={color.text} />
                <Text style={[styles.headerText, {color: color.text}]}>
                  {translate('Income Details')}
                </Text>
              </TouchableOpacity>
              {!isEditing && (
                <TouchableOpacity
                  onPress={handleEdit}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#00adf5',
                    padding: 15,
                    borderRadius: 30,
                    paddingHorizontal: 20,
                    shadowColor: '#00adf5',
                    shadowOffset: {width: 0, height: 4},
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                  }}>
                  <Feather name="edit" size={20} color="white" />
                  <Text
                    style={{marginLeft: 10, fontWeight: '700', color: 'white'}}>
                    {translate('Edit')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.amountContainer}>
              {!isEditing ? (
                <Text style={styles.valueAmount}>
                  +{formatCurrency(income?.amount.toString() || '0')}
                </Text>
              ) : (
                <TextInput
                  style={styles.valueAmount}
                  keyboardType="numeric"
                  value={formattedAmount}
                  onChangeText={handleAmountChange}
                />
              )}
            </View>
            <View style={[styles.card, {backgroundColor: color.white}]}>
              <View style={styles.detailRow}>
                <Text style={[styles.label, {color: color.text}]}>
                  {translate('Category')}:
                </Text>
                <View style={styles.valueContainer}>
                  {!isEditing ? (
                    <Text style={[styles.value, {color: color.text}]}>
                      {' '}
                      {income?.financeIncomeSource &&
                      income.financeIncomeSource.income_source_name
                        ? income.financeIncomeSource.income_source_name
                        : translate('Other')}
                    </Text>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        setShowCategoryPicker(!showCategoryPicker)
                      }>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.value, {color: color.text}]}>
                          {selectedCategory}{' '}
                        </Text>
                        <Icon
                          name={
                            showCategoryPicker ? 'chevron-up' : 'chevron-down'
                          }
                          size={20}
                          color={color.text}
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                  {showCategoryPicker && (
                    <Picker
                      selectedValue={selectedCategory}
                      style={styles.picker}
                      onValueChange={itemValue =>
                        handleCategoryChange(itemValue)
                      }>
                      {incomeType.map(item => (
                        <Picker.Item
                          key={item.id_income_source}
                          label={item.income_source_name}
                          value={item.income_source_name}
                          color={color.text}
                        />
                      ))}
                    </Picker>
                  )}
                </View>
              </View>
              <View style={styles.detailRow}>
                <Text style={[styles.label, {color: color.text}]}>
                  {translate('Description')}:
                </Text>
                {!isEditing ? (
                  <Text style={[styles.value, {color: color.text}]}>
                    {income?.description}
                  </Text>
                ) : (
                  <TextInput
                    style={[styles.input, {color: color.text}]}
                    value={editedDescription}
                    onChangeText={setEditedDescription}
                  />
                )}
              </View>
              <View style={styles.detailRow}>
                <Text style={[styles.label, {color: color.text}]}>
                  {translate('Created by')}:
                </Text>
                <TouchableOpacity
                  onPress={() => pressMember(income?.users.id_user)}>
                  <Text style={styles.ValueName}>
                    {income?.users.firstname} {income?.users.lastname}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.detailRow}>
                <Text style={[styles.label, {color: color.text}]}>
                  {translate('Date')}:
                </Text>
                {!isEditing ? (
                  <Text style={[styles.value, {color: color.text}]}>
                    {income
                      ? moment(income.income_date).format('MM-DD-YYYY, HH:mm')
                      : ''}
                  </Text>
                ) : (
                  <>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={chosenDate}
                      mode="datetime"
                      display="default"
                      onChange={onChangeDate}
                    />
                  </>
                )}
              </View>
            </View>
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
              </View>
            )}
          </View>

          {isEditing && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}>
              <CancelButton onPress={handleCancel} />
              <SaveButton onPress={handleSave} />
            </View>
          )}

          {!isEditing && <DeleteButton onPress={handleDelete} />}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  editButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  editIcon: {
    color: 'gray',
    marginRight: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  headerButton: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    color: '#333',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  editContainer: {
    backgroundColor: 'lightblue',
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  buttonTextSave: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
  editButton: {
    color: '#333',
    marginRight: 5,
  },
  editText: {
    color: 'gray',
    fontSize: 18,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  amountContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  valueAmount: {
    color: 'green',
    fontSize: 40,
    fontWeight: 'bold',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  valueContainer: {
    flexDirection: 'column',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  ValueName: {
    fontSize: 16,
    color: COLORS.DenimBlue,
  },
  input: {
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 2,
  },
  picker: {
    color: '#333',
    width: 200,
    justifyContent: 'space-between',
  },
  imageContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  imageWrapper: {
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  changeImageButton: {
    marginBottom: 5,
  },
  changeImageText: {
    color: '#007BFF',
    fontSize: 16,
  },
  deleteImageButton: {
    marginBottom: 5,
  },
  deleteText: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'System',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
  },

  saveButton: {
    backgroundColor: '#4CAF50',
  },
});

export default IncomeDetailScreen;
