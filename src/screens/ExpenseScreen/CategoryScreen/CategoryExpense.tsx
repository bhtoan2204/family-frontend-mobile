import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import ExpenseServices from 'src/services/apiclient/ExpenseServices';
import {CategoryExpenseScreenProps} from 'src/navigation/NavigationTypes';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {selectSelectedFamily} from 'src/redux/slices/FamilySlice';
import {
  createExpenseType,
  deleteExpenseType,
  selectExpenseTypes,
  setSelectedExpenseType,
} from 'src/redux/slices/ExpenseTypeSlice';
import {
  addIncomeType,
  deleteIncomeType,
  selectIncomeTypes,
  setSelectedIncomeType,
} from 'src/redux/slices/IncomeTypeSlice';
import {IncomeServices} from 'src/services/apiclient';
import {setType} from 'src/redux/slices/FinanceSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getTranslate, selectLocale} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {Toast} from 'react-native-toast-notifications';

const CategoryExpenseScreen = ({navigation}: CategoryExpenseScreenProps) => {
  const expenseType = useSelector(selectExpenseTypes);
  const incomeCategories = useSelector(selectIncomeTypes);
  const family = useSelector(selectSelectedFamily);
  const dispatch = useDispatch();
  const location = useSelector(selectLocale);
  const translate = useSelector(getTranslate);

  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [selectedCategoryType, setSelectedCategoryType] =
    useState<string>('Expense');
  const urlFood =
    'https://img.freepik.com/premium-vector/icon-food-drink-illustration-vector_643279-134.jpg';
  const color = useThemeColors();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const createCategory = async () => {
    try {
      if (selectedCategoryType === 'Expense') {
        const data = await ExpenseServices.createExpenseType(
          family.id_family,
          newCategoryName,
        );
        if (data) {
          console.log(data);
          dispatch(createExpenseType(data));
          Toast.show(translate('Create category successfully'), {
            type: 'success',
            duration: 3000,
          });
        } else {
          Toast.show(translate('Fail to create category'), {
            type: 'danger',
            duration: 3000,
          });
        }
      } else if (selectedCategoryType === 'Income') {
        const data = await IncomeServices.createIncomeType(
          family.id_family,
          newCategoryName,
        );
        if (data) {
          dispatch(addIncomeType(data));
          Toast.show(translate('Create category successfully'), {
            type: 'success',
            duration: 3000,
          });
        } else {
          Toast.show(translate('Fail to create category'), {
            type: 'danger',
            duration: 3000,
          });
        }
      }
      toggleModal();
      setNewCategoryName('');
    } catch (error) {
      console.error('Error creating category:', error.message);
      Toast.show(translate('An error occurred while creating the category.'), {
        type: 'danger',
        duration: 3000,
      });
    }
  };

  const selectCategory = (item: any) => {
    dispatch(setType(selectedCategoryType));
    if (selectedCategoryType === 'Expense') {
      dispatch(setSelectedExpenseType(item));
    } else if (selectedCategoryType === 'Income') {
      dispatch(setSelectedIncomeType(item));
    }
    navigation.navigate('FamilyTab', {screen: 'Expense'});
  };

  const onDeleteIncome = async (item: any) => {
    Alert.alert(
      translate('Confirm Delete'),
      translate('Are you sure you want to delete this category?'),
      [
        {
          text: translate('Cancel'),
          style: 'cancel',
        },
        {
          text: translate('Delete'),
          onPress: async () => {
            try {
              await IncomeServices.deleteIncomeSource(
                family.id_family,
                item.id_income_source,
              );
              Toast.show(
                translate('The category has been deleted successfully'),
                {
                  type: 'success',
                  duration: 3000,
                },
              );
              dispatch(deleteIncomeType(item.id_income_source));
            } catch (error) {
              console.error('Error deleting income category:', error);
              Toast.show(
                translate('An error occurred while deleting the category.'),
                {
                  type: 'danger',
                  duration: 3000,
                },
              );
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  const onDeleteExpense = async (item: any) => {
    Alert.alert(
      translate('Confirm Delete'),
      translate('Are you sure you want to delete this category?'),
      [
        {
          text: translate('Cancel'),
          style: 'cancel',
        },
        {
          text: translate('Delete'),
          onPress: async () => {
            try {
              const respone = await ExpenseServices.deleteExpenseType(
                family.id_family,
                item.id_expenditure_type,
              );
              if (respone) {
                Toast.show(
                  translate('The category has been deleted successfully'),
                  {
                    type: 'success',
                    duration: 3000,
                  },
                );
                dispatch(deleteExpenseType(item.id_expenditure_type));
              }
            } catch (error) {
              console.error('Error deleting expense category:', error);
              Toast.show(
                translate('An error occurred while deleting the category.'),
                {
                  type: 'danger',
                  duration: 3000,
                },
              );
            }
          },
        },
      ],
      {cancelable: true},
    );
  };
  const selectOption = (option: string) => {
    setSelectedCategoryType(option);
  };

  const renderCategoryItem = ({item}: {item: any}) => (
    <TouchableOpacity
      style={styles.categoryItemContainer}
      onPress={() => selectCategory(item)}>
      <Image source={{uri: urlFood}} style={styles.categoryImage} />
      <Text style={[styles.categoryName, {color: color.text}]}>
        {selectedCategoryType === 'Expense'
          ? location === 'vi'
            ? item.expense_type_name_vn
            : item.expense_type_name
          : location === 'vi'
            ? item.income_source_name_vn
            : item.income_source_name}
      </Text>
      <TouchableOpacity
        onPress={() =>
          selectedCategoryType === 'Expense'
            ? onDeleteExpense(item)
            : onDeleteIncome(item)
        }
        style={styles.deleteButton}>
        <Icon name="trash-outline" size={20} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: color.background}]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('FamilyTab', {screen: 'Expense'})}
          style={styles.headerButton}>
          <Icon
            name="arrow-back"
            size={30}
            style={[styles.addImage, {color: color.text}]}
          />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerText, {color: color.text}]}>
            {translate('Category')}
          </Text>
        </View>
        <TouchableOpacity onPress={toggleModal} style={styles.headerButton}>
          <Icon
            name="add"
            size={30}
            style={[styles.addImage, {color: color.text}]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerTab}>
        <TouchableOpacity
          onPress={() => selectOption('Income')}
          style={[
            styles.tabButton,
            selectedCategoryType === 'Income' && styles.selectedTabButton,
            {borderTopLeftRadius: 20, borderBottomLeftRadius: 20},
          ]}>
          <Text
            style={[
              styles.tabButtonText,
              selectedCategoryType === 'Income' && styles.selectedTabText,
            ]}>
            {translate('Income')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectOption('Expense')}
          style={[
            styles.tabButton,
            selectedCategoryType === 'Expense' && styles.selectedTabButton,
            {borderTopRightRadius: 20, borderBottomRightRadius: 20},
          ]}>
          <Text
            style={[
              styles.tabButtonText,
              selectedCategoryType === 'Expense' && styles.selectedTabText,
            ]}>
            {translate('Expense')}
          </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.bottomLine,
            {
              left: selectedCategoryType === 'Income' ? 0 : '50%',
              borderRadius: 20,
            },
          ]}
        />
      </View>

      <FlatList
        data={
          selectedCategoryType === 'Expense'
            ? Object.values(expenseType)
            : Object.values(incomeCategories)
        }
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{paddingBottom: 20}}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <TouchableOpacity
          style={[styles.modalContainer]}
          onPress={() => setModalVisible(false)}>
          <View
            style={[styles.modalContent, {backgroundColor: color.background}]}>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Icon name="close" size={30} color={color.text} />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, {color: color.text}]}>
              {translate('Add New Category')}
            </Text>
            <TextInput
              style={[
                styles.input,
                {backgroundColor: color.background, color: color.text},
              ]}
              placeholder={translate('Enter category name')}
              value={newCategoryName}
              onChangeText={setNewCategoryName}
            />
            <TouchableOpacity style={styles.button} onPress={createCategory}>
              <Text style={styles.buttonText}>{translate('Create')}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default CategoryExpenseScreen;
