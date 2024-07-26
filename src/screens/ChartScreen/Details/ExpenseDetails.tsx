import React, {useCallback, useEffect, useState} from 'react';
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
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ExpenseDetailScreenProps} from 'src/navigation/NavigationTypes';
import {
  deleteExpense,
  selectSelectedExpense,
  updateExpense,
} from 'src/redux/slices/ExpenseAnalysis';
import Icon from 'react-native-vector-icons/Ionicons';
import {ExpenseServices} from 'src/services/apiclient';
import {ExpenseType} from 'src/interface/expense/ExpenseType';
import {
  selectSelectedFamily,
  setSelectedMemberById,
} from 'src/redux/slices/FamilySlice';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import ImageView from 'react-native-image-viewing';
import {COLORS} from 'src/constants';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Feather} from '@expo/vector-icons';
import moment from 'moment';
import {DailyExpense} from 'src/interface/expense/DailyExpense';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {getTranslate} from 'src/redux/slices/languageSlice';
import { Toast } from 'react-native-toast-notifications';
import DeleteButton from 'src/components/Button/DeleteButton';
import SaveButton from 'src/components/Button/SaveButton';
import CancelButton from 'src/components/Button/CancelButton';

const ExpenseDetailScreen = ({navigation}: ExpenseDetailScreenProps) => {
  const dispatch = useDispatch();
  const expense: DailyExpense | null = useSelector(selectSelectedExpense);
  const [isEditing, setIsEditing] = useState(false);
  const [expenseType, setExpenseType] = useState<ExpenseType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    expense?.financeExpenditureType?.expense_type_name ?? undefined,
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [chosenDate, setChosenDate] = useState(new Date());
  const [editedDescription, setEditedDescription] = useState(
    expense?.description || '',
  );
  const [editedAmount, setEditedAmount] = useState(
    expense?.amount.toString() || '',
  );
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [currentImageUri, setCurrentImageUri] = useState<string | undefined>(
    expense?.image_url,
  );
  const family = useSelector(selectSelectedFamily);
  const [loading, setLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const color = useThemeColors();
  const translate = useSelector(getTranslate);
  const [formattedAmount, setFormattedAmount] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(expense?.financeExpenditureType.id_expenditure_type);

  useEffect(() => {
    fetchExpenseType(family.id_family);
  }, []);
  const itemsPerPage = 10;

  const fetchExpenseType = async (id_family: number) => {
    try {
      const response = await ExpenseServices.getExpenseType(
        id_family,
        page,
        itemsPerPage,
      );
      if (response) {
        setExpenseType(prev => [...prev, ...response]);
        setPage(page + 1);
      }
    } catch (error: any) {
      console.error('Error in getExpenseType:', error.message);
    }
  };
  const handleCancel = () => {
    setIsEditing(false);
    setCurrentImageUri(expense?.image_url);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };
  useEffect(() => {
    const id = expenseType.find(item => item.expense_type_name === selectedCategory)?.id_expenditure_type;
    setSelectedCategoryId(id);
  }, [selectedCategory, expenseType]);
  
  const handleSave = async () => {
    setLoading(true);
    try {
      const amount = parseFloat(editedAmount);
      console.log(expense?.id_expenditure)
      if (selectedCategoryId !== undefined) {
        const response = await ExpenseServices.updateExpense(
            expense?.id_expenditure,
            family?.id_family,
            expense?.id_created_by,
            selectedCategoryId,
            amount,        
            chosenDate.toISOString(),
            editedDescription,
            currentImageUri ? currentImageUri : expense?.image_url,
          );
        console.log('update: ', response)
        if (response) {
        dispatch(updateExpense(response));
        Toast.show('Expense updated successfully', { type: 'success', duration: 3000 });
        setIsEditing(false);
        }
      } else {
        Toast.show('Selected category not found', { type: 'danger', duration: 3000 });
      }
      setLoading(false);

    } catch (error) {
      console.error('Error updating income:', error);
      Toast.show('An error occurred while updating expense', { type: 'danger', duration: 3000 });
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            if (expense?.id_expenditure) {
              try {
                await ExpenseServices.deleteExpense(
                  expense.id_family,
                  expense.id_expenditure,
                );
                dispatch(deleteExpense(expense.id_expenditure));
                navigation.goBack();
              } catch (error) {
                console.error(error);
                Alert.alert(
                  'Failed to delete expense',
                  'Please try again later.',
                );
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

  const handleCategoryChange = (itemValue: string | undefined) => {
    setSelectedCategory(itemValue);
  };

  const handleSelectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setLoading(true);

        if (family?.id_family && expense?.id_expenditure) {
          const respone = await ExpenseServices.updateExpense(
            expense.id_expenditure,
            expense.id_family,
            expense.id_created_by,
            expense.id_expenditure_type,
            expense.amount,
            expense.expenditure_date,
            expense.description,
            result.assets[0].uri,
          );
          dispatch(
            updateExpense({...expense, image_url: result.assets[0].uri}),
          );
        }
        setCurrentImageUri(result.assets[0].uri);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error opening image library:', error);
      setLoading(false);
    }
  };

  const handleSelectImageEdit = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setLoading(true);

        setCurrentImageUri(result.assets[0].uri);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error opening image library:', error);
      setLoading(false);
    }
  };

  const pressMember = (id_user?: string) => {
    dispatch(setSelectedMemberById(id_user));
    navigation.navigate('FamilyStack', {screen: 'MemberDetails'});
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handleImagePress = () => {
    if (currentImageUri) {
      setSelectedImageIndex(0);
    }
  };

  const formatNumberWithDots = (value) => {
    if (value === '') return '';
    
    const rawValue = value.replace(/[^\d]/g, '');
    
    const parts = rawValue.split('').reverse();
    const formattedValue = parts.reduce((acc, digit, index) => {
      if (index > 0 && index % 3 === 0) {
        acc.push('.');
      }
      acc.push(digit);
      return acc;
    }, []).reverse().join('');
  
    return formattedValue;
  };
  

    const handleAmountChange = (text) => {
      const formatted = formatNumberWithDots(text);
      
      const rawValue = formatted.replace(/\./g, '');
      const numericValue = parseFloat(rawValue);
  
      setEditedAmount(numericValue.toString());
      setFormattedAmount(formatted);
    };
  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: color.background}]}>
      <View style={[styles.container, {backgroundColor: color.background}]}>
        <View
          style={[styles.headerContainer, {backgroundColor: color.background}]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerButton}>
            <Icon
              name="close-outline"
              size={30}
              style={[styles.backButton, {color: color.text}]}
            />
            <Text style={[styles.headerText, {color: color.text}]}>
              {translate('Expense Details')}
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
              <Text style={{marginLeft: 10, fontWeight: '700', color: 'white'}}>
                {translate('Edit')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.amountContainer}>
          {!isEditing ? (
            <Text style={styles.valueAmount}>
              {formatCurrency(expense?.amount.toString() || '0')}
            </Text>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={styles.valueAmount}
                keyboardType="numeric"
                value={formattedAmount ? formattedAmount: editedAmount}
                onChangeText={handleAmountChange}
                placeholder={editedAmount}

                />
              <Text style={styles.valueAmount}> đ</Text>
            </View>
          )}
        </View>

        <View style={[styles.card, {backgroundColor: color.white}]}>
          <View style={styles.detailRow}>
            <Text style={[styles.label, {color: color.text}]}>
              {translate('Category')}:
            </Text>
            <View style={styles.valueContainer}>
              {!isEditing ? (
                expense?.financeExpenditureType ? (
                  <Text style={[styles.value, {color: color.text}]}>
                    {expense.financeExpenditureType.expense_type_name}
                  </Text>
                ) : (
                  <Text style={[styles.value, {color: color.text}]}>
                    {translate('Other')}
                  </Text>
                )
              ) : (
                <TouchableOpacity
                  onPress={() => setShowCategoryPicker(!showCategoryPicker)}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.value, {color: color.text}]}>
                      {selectedCategory}{' '}
                    </Text>
                    <Icon
                      name={showCategoryPicker ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      color={color.text}
                    />
                  </View>
                </TouchableOpacity>
              )}

              {showCategoryPicker && (
                <Picker
                  selectedValue={selectedCategory}
                  style={[styles.picker, {color: color.text}]}
                  onValueChange={itemValue => handleCategoryChange(itemValue)}>
                  {expenseType.map(item => (
                    <Picker.Item
                      key={item.id_expenditure_type}
                      label={item.expense_type_name}
                      value={item.expense_type_name}
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
                {expense?.description}
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
              {translate('Create by')}:
            </Text>
            <TouchableOpacity
              onPress={() => pressMember(expense?.users.id_user)}>
              <Text style={styles.ValueName}>
                {expense?.users.firstname} {expense?.users.lastname}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.label, {color: color.text}]}>
              {translate('Date')}:
            </Text>
            {!isEditing ? (
              <Text style={[styles.value, {color: color.text}]}>
                {expense
                  ? moment(expense.expenditure_date).format(
                      'MMMM DD YYYY, HH:mm',
                    )
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
        <View style={[styles.card, {backgroundColor: color.white}]}>
          <View style={styles.imageContainer}>
            <Text style={[styles.label, {color: color.text}]}>
              {translate('Receipt')}:
            </Text>
            {currentImageUri ? (
              <View>
                <TouchableOpacity
                  style={styles.imageWrapper}
                  onPress={handleImagePress}>
                  <Image
                    source={{
                      uri: isEditing ? currentImageUri : expense?.image_url,
                    }}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                {isEditing && (
                  <TouchableOpacity
                    style={styles.changeImageButton}
                    onPress={handleSelectImageEdit}>
                    <Text style={styles.changeImageText}>
                      {translate('Change receipt')}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : isEditing ? (
              <TouchableOpacity
                onPress={handleSelectImageEdit}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: COLORS.Azure, fontSize: 16}}>
                  {translate('Add receipt')}
                </Text>
                <Icon
                  name="add-circle-sharp"
                  size={36}
                  style={{color: COLORS.Azure}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleSelectImage}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: COLORS.Azure, fontSize: 16}}>
                  {translate('Add receipt')}
                </Text>
                <Icon
                  name="add-circle-sharp"
                  size={36}
                  style={{color: COLORS.Azure}}
                />
              </TouchableOpacity>
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal:10 }}>
          <CancelButton onPress={handleCancel} />
          <SaveButton onPress={handleSave} />

        </View>
      )}

      {!isEditing && (
          <DeleteButton onPress={handleDelete} />

      )}

      <ImageView
        images={[{uri: currentImageUri}]}
        imageIndex={selectedImageIndex || 0}
        visible={selectedImageIndex !== null}
        onRequestClose={handleCloseModal}
        backgroundColor="rgba(0, 0, 0, 0.8)"
      />
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
    backgroundColor: '#00adf5',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
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
    color: 'red',
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
    borderRadius: 10,

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

export default ExpenseDetailScreen;
