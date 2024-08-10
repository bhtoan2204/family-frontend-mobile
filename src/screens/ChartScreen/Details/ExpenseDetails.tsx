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
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
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
  selectFamilyMembers,
  selectSelectedFamily,
  setSelectedMemberById,
} from 'src/redux/slices/FamilySlice';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import ImageView from 'react-native-image-viewing';
import {COLORS} from 'src/constants';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Feather, Ionicons} from '@expo/vector-icons';
import moment from 'moment';
import {DailyExpense, UtilitiesType} from 'src/interface/expense/DailyExpense';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {getTranslate, selectLocale} from 'src/redux/slices/languageSlice';
import {Toast} from 'react-native-toast-notifications';
import DeleteButton from 'src/components/Button/DeleteButton';
import SaveButton from 'src/components/Button/SaveButton';
import CancelButton from 'src/components/Button/CancelButton';
import ShoppingListServices from 'src/services/apiclient/ShoppingListServices';
import {
  ShoppingList,
  ShoppingListItem,
} from 'src/interface/shopping/shopping_list';
import ShoppingListCategoryItem from 'src/components/user/shopping/shopping-list-category/shopping-list-category-item';
import {updatePurchasedItem} from 'src/redux/slices/ShoppingListSlice';
import {AppDispatch, RootState} from 'src/redux/store';
import {styles} from './styles';

const ExpenseDetailScreen = ({navigation}: ExpenseDetailScreenProps) => {
  const location = useSelector(selectLocale);

  const expense: DailyExpense | null = useSelector(selectSelectedExpense);
  const [isEditing, setIsEditing] = useState(false);
  const [expenseType, setExpenseType] = useState<ExpenseType[]>([]);
  const [utilityType, setUtilityType] = useState<UtilitiesType[]>([]);

  const initialCategory =
    location === 'vi'
      ? expense?.financeExpenditureType?.expense_type_name_vn
      : expense?.financeExpenditureType?.expense_type_name;

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    initialCategory ?? undefined,
  );

  const initialUtilityCategory =
    expense?.utilities && expense?.utilities?.utilitiesType
      ? location === 'vi'
        ? expense.utilities.utilitiesType.name_vn
        : expense.utilities.utilitiesType.name_en
      : undefined;

  const [selectedUtilityCategory, setSelectedUtilityCategory] = useState<
    string | undefined
  >(initialUtilityCategory);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [chosenDate, setChosenDate] = useState(new Date());
  const [editedDescription, setEditedDescription] = useState(
    expense?.description || '',
  );
  const [editedAmount, setEditedAmount] = useState(
    expense?.amount.toString() || '',
  );
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showUtilityCategoryPicker, setShowUtilityCategoryPicker] =
    useState(false);

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
  const [formattedAmount, setFormattedAmount] = useState(
    expense?.amount.toString() || '',
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(expense?.financeExpenditureType?.id_expenditure_type);
  const dispatch = useDispatch<AppDispatch>();

  const initialUtilityCategoryId =
    expense?.utilities && expense?.utilities?.utilitiesType
      ? expense.utilities.utilitiesType.id_utilities_type
      : undefined;

  const [selectedUtilityCategoryId, setSelectedUtilityCategoryId] = useState<
    number | undefined
  >(initialUtilityCategoryId);
  const members = useSelector(selectFamilyMembers);
  const [shoppingList, setShoppingList] = useState<ShoppingList[]>([]);
  useEffect(() => {
    fetchExpenseType(family.id_family);
    fetchShoppingList();
    fetchUtilityType();
  }, []);

  const itemsPerPage = 10;

  useEffect(() => {
    if (expense?.amount) {
      handleAmountChange(expense.amount.toString());
    }
  }, [expense?.amount]);

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
      //console.error('Error in getExpenseType:', error.message);
    }
  };
  const fetchUtilityType = async () => {
    if (expense?.utilities) {
      try {
        const response = await ExpenseServices.getUtilityType();

        if (response) {
          setUtilityType(response);
        }
      } catch (error: any) {
        //console.error('Error in fetchUtilityType:', error.message);
      }
    } else {
      setUtilityType([]);
    }
  };

  const fetchShoppingList = async () => {
    try {
      if (expense?.shoppingLists) {
        const response = await ShoppingListServices.getShoppingItem(
          expense?.id_family,
          expense?.shoppingLists.id_list,
        );

        if (response) {
          console.log(response);
          setShoppingList(response);
        }
      } else {
        setShoppingList([]);
      }
    } catch (error: any) {
      //console.error('Error in fetchShoppingList:', error.message);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentImageUri(expense?.image_url);
    setShowCategoryPicker(false);
    setShowUtilityCategoryPicker(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };
  useEffect(() => {
    const id = expenseType.find(
      item =>
        item.expense_type_name === selectedCategory ||
        item.expense_type_name_vn === selectedCategory,
    )?.id_expenditure_type;
    setSelectedCategoryId(id);
  }, [selectedCategory, expenseType]);

  useEffect(() => {
    const id = utilityType.find(
      item =>
        item.name_en === selectedUtilityCategory ||
        item.name_vn === selectedUtilityCategory,
    )?.id_utilities_type;
    setSelectedUtilityCategoryId(id);
  }, [selectedUtilityCategory, utilityType]);

  const handleSave = async () => {
    console.log(selectedUtilityCategoryId, selectedCategoryId);
    setLoading(true);

    if (
      selectedCategory === 'Utilities' ||
      selectedCategory === 'Chi phí tiện ích'
    ) {
      if (expense?.utilities && expense?.utilities.id_utility) {
        try {
          console.log(
            expense?.utilities.id_utility,
            family?.id_family,
            selectedUtilityCategoryId,
          );
          await ExpenseServices.updateUtility(
            expense?.utilities.id_utility,
            family?.id_family,
            selectedUtilityCategoryId,
          );
        } catch (error) {
          //console.error('Error updating expense:', error);
        }
      }
    }

    try {
      const amount = parseFloat(editedAmount || '0');
      if (isNaN(amount)) {
        Toast.show('Invalid amount format', {type: 'danger', duration: 3000});
        setLoading(false);
        return;
      }
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
        if (response) {
          console.log(response);
          dispatch(updateExpense(response));
          Toast.show('Expense updated successfully', {
            type: 'success',
            duration: 3000,
          });
          setIsEditing(false);
          setShowCategoryPicker(false);
          setShowUtilityCategoryPicker(false);
        }
      } else {
        Toast.show('Selected category not found', {
          type: 'danger',
          duration: 3000,
        });
      }
      setLoading(false);
    } catch (error) {
      //console.error('Error updating expense:', error);
      Toast.show('An error occurred while updating expense', {
        type: 'danger',
        duration: 3000,
      });
      setLoading(false);
    }
  };

  const handleAmountChange = (text: string) => {
    const formatted = formatNumberWithDots(text);
    const rawValue = formatted.replace(/\./g, '');
    const numericValue = parseFloat(rawValue);
    setEditedAmount(numericValue.toString());
    setFormattedAmount(formatted);
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
                Toast.show('Expense delete successfully', {
                  type: 'success',
                  duration: 3000,
                });

                navigation.goBack();
              } catch (error) {
                //console.error(error);
                Toast.show('Failed to delete expense', {
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

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || chosenDate;
    setShowDatePicker(Platform.OS === 'ios');
    setChosenDate(currentDate);
  };

  const handleCategoryChange = (itemValue: string | undefined) => {
    setSelectedCategory(itemValue);
  };
  const handleUtilityCategoryChange = (itemValue: string | undefined) => {
    setSelectedUtilityCategory(itemValue);
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
          dispatch(updateExpense(respone));
          Toast.show('Add receipt successfully', {
            type: 'success',
            duration: 3000,
          });
        }
        setCurrentImageUri(result.assets[0].uri);
        setLoading(false);
      }
    } catch (error) {
      //console.error('Error opening image library:', error);
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
      //console.error('Error opening image library:', error);
      setLoading(false);
    }
  };

  const pressMember = (id_user?: string) => {
    if (expense?.users && id_user) {
      const memberExists = members.some(member => member.id_user === id_user);
      if (memberExists) {
        dispatch(setSelectedMemberById(id_user));
        navigation.navigate('FamilyStack', {screen: 'MemberDetails'});
      } else {
        Alert.alert('Notice', 'This member is not in the family.');
      }
    }
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handleImagePress = () => {
    if (currentImageUri) {
      setSelectedImageIndex(0);
    }
  };

  const formatNumberWithDots = value => {
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

  const formatCurrency = (amount: string) => {
    return parseFloat(amount).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };
  const mapByItemType2 = (
    items: ShoppingListItem[],
  ): Map<string, ShoppingListItem[]> => {
    const data: ShoppingListItem[] = JSON.parse(JSON.stringify(items));
    const map = new Map<string, ShoppingListItem[]>();
    for (let i = 0; i < data.length; i++) {
      const itemType = JSON.stringify(data[i].itemType);
      console.log('yuwu', data[i].itemType);
      if (!map.has(JSON.stringify(data[i].itemType))) {
        const arr = [data[i]];
        map.set(itemType, arr);
      } else {
        console.log('?');
        map.get(itemType)?.push(data[i]);
      }
    }
    return map;
  };

  const renderShoppinglists = () => {
    return (
      <ScrollView
        style={[styles.scrollView, {backgroundColor: color.white}]}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={true}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            marginTop: 10,
          }}>
          <Text
            style={[
              styles.header,
              {
                color: color.text,
                fontSize: 16,
                fontWeight: 'bold',
                fontStyle: 'italic',
              },
            ]}>
            {translate('Shopping List')}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ShoppingListStack', {
                screen: 'ShoppingListCategory',
                params: {
                  id_family: expense?.id_family,
                  id_category: expense?.shoppingLists.id_shopping_list_type,
                },
              })
            }
            style={styles.header}>
            <Text style={{color: color.BlueLight, fontWeight: '800'}}>
              {translate('View detail')}
            </Text>
          </TouchableOpacity>
        </View>
        {shoppingList && shoppingList.length > 0 ? (
          shoppingList.map(item => (
            <View key={item.id_item} style={styles.itemContainer}>
              <View style={styles.itemHeader}>
                <Image
                  source={{uri: item.itemType.icon_url}}
                  style={styles.itemIcon}
                />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.item_name}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                </View>
              </View>
              <Text
                style={
                  styles.itemPrice
                }>{`Price: ${item.price.toLocaleString()} VND`}</Text>
              <Text
                style={
                  styles.itemQuantity
                }>{`Quantity: ${item.quantity}`}</Text>

              <View
                style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
                <Text
                  style={[
                    styles.itemStatus,
                    {color: 'green', fontWeight: 'bold', marginLeft: 8},
                  ]}>
                  {item.is_purchased
                    ? translate('Purchased')
                    : translate('Not Purchased')}
                </Text>
                {item.is_purchased && (
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={24}
                    color="green"
                  />
                )}
              </View>
            </View>
          ))
        ) : (
          <TouchableOpacity
            style={[styles.addButton, {backgroundColor: color.white}]}
            onPress={() =>
              navigation.navigate('ShoppingListStack', {
                screen: 'ShoppingListCategory',
                params: {
                  id_family: expense?.id_family,
                  openSheet: true,
                  id_calendar: null,
                },
              })
            }>
            <Text style={styles.addButtonText}>
              {translate('New Shopping List')}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: color.background}]}>
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <View style={[styles.container, {backgroundColor: color.background}]}>
          <View
            style={[
              styles.headerContainer,
              {backgroundColor: color.background},
            ]}>
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
                <Text
                  style={{
                    marginLeft: 10,
                    fontWeight: '700',
                    color: 'white',
                  }}>
                  {translate('Edit')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.amountContainer}>
            {!isEditing ? (
              <Text style={styles.valueAmount}>
                -{formatCurrency(expense?.amount.toString() || '0')}
              </Text>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  style={styles.valueAmount}
                  keyboardType="numeric"
                  value={formattedAmount}
                  onChangeText={handleAmountChange}
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
                      {location === 'vi'
                        ? expense.financeExpenditureType.expense_type_name_vn
                        : expense.financeExpenditureType.expense_type_name}
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
                    style={[styles.picker, {color: color.text}]}
                    onValueChange={itemValue =>
                      handleCategoryChange(itemValue)
                    }>
                    {expenseType.map(item => (
                      <Picker.Item
                        key={item.id_expenditure_type}
                        label={
                          location === 'vi'
                            ? item.expense_type_name_vn
                            : item.expense_type_name
                        }
                        value={
                          location === 'vi'
                            ? item.expense_type_name_vn
                            : item.expense_type_name
                        }
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
            {expense?.id_created_by && (
              <View style={styles.detailRow}>
                <Text style={[styles.label, {color: color.text}]}>
                  {translate('Create by')}:
                </Text>
                <TouchableOpacity
                  onPress={() => pressMember(expense?.id_created_by)}>
                  <Text style={styles.ValueName}>
                    {expense?.users?.firstname
                      ? `${expense.users.firstname} ${expense.users?.lastname || ''}`.trim()
                      : 'No user data available'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.detailRow}>
              <Text style={[styles.label, {color: color.text}]}>
                {translate('Date')}:
              </Text>
              {!isEditing ? (
                <Text style={[styles.value, {color: color.text}]}>
                  {expense
                    ? moment(expense.expenditure_date).format(
                        'MM-DD-YYYY, HH:mm',
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

          {expense?.utilities &&
            expense.utilities.utilitiesType &&
            (selectedCategory === 'Utilities' ||
              selectedCategory === 'Chi phí tiện ích') && (
              <View style={[styles.card, {backgroundColor: color.white}]}>
                <View style={styles.detailRow}>
                  <Text style={[styles.label, {color: color.text}]}>
                    {translate('Category utility')}:
                  </Text>
                  <View style={styles.valueContainer}>
                    {!isEditing ? (
                      expense?.utilities && expense?.utilities.utilitiesType ? (
                        <Text style={[styles.value, {color: color.text}]}>
                          {location === 'vi'
                            ? expense.utilities.utilitiesType.name_vn
                            : expense.utilities.utilitiesType.name_en}
                        </Text>
                      ) : (
                        <Text style={[styles.value, {color: color.text}]}>
                          {translate('Other')}
                        </Text>
                      )
                    ) : (
                      <TouchableOpacity
                        onPress={() =>
                          setShowUtilityCategoryPicker(
                            !showUtilityCategoryPicker,
                          )
                        }>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={[styles.value, {color: color.text}]}>
                            {selectedUtilityCategory}{' '}
                          </Text>
                          <Icon
                            name={
                              showUtilityCategoryPicker
                                ? 'chevron-up'
                                : 'chevron-down'
                            }
                            size={20}
                            color={color.text}
                          />
                        </View>
                      </TouchableOpacity>
                    )}

                    {showUtilityCategoryPicker && (
                      <Picker
                        selectedValue={selectedUtilityCategory}
                        style={[styles.picker, {color: color.text}]}
                        onValueChange={itemValue =>
                          handleUtilityCategoryChange(itemValue)
                        }>
                        {utilityType.map(item => (
                          <Picker.Item
                            key={item.id_utilities_type}
                            label={
                              location === 'vi' ? item.name_vn : item.name_en
                            }
                            value={
                              location === 'vi' ? item.name_vn : item.name_en
                            }
                            color={color.text}
                          />
                        ))}
                      </Picker>
                    )}
                  </View>
                </View>
              </View>
            )}

          {expense?.shoppingLists && renderShoppinglists()}

          <View
            style={[
              styles.card,
              {backgroundColor: color.white, marginTop: 20},
            ]}>
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

        <ImageView
          images={[{uri: currentImageUri}]}
          imageIndex={selectedImageIndex || 0}
          visible={selectedImageIndex !== null}
          onRequestClose={handleCloseModal}
          backgroundColor="rgba(0, 0, 0, 0.8)"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ExpenseDetailScreen;
