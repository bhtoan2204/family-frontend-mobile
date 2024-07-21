import React, { useState, useEffect } from 'react';
import { View, Text, FlatList,TouchableOpacity, Image,Modal,TextInput,Alert,} from 'react-native';
import ExpenseServices from 'src/services/apiclient/ExpenseServices';
import { CategoryExpenseScreenProps } from 'src/navigation/NavigationTypes';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedFamily } from 'src/redux/slices/FamilySlice';
import { selectExpenseTypes, setSelectedExpenseType } from 'src/redux/slices/ExpenseTypeSlice';
import { selectIncomeTypes, setSelectedIncomeType } from 'src/redux/slices/IncomeTypeSlice';
import { IncomeServices } from 'src/services/apiclient';
import { setType } from 'src/redux/slices/FinanceSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

const CategoryExpenseScreen = ({ navigation }: CategoryExpenseScreenProps) => {
  const expenseType = useSelector(selectExpenseTypes);
  const incomeCategories = useSelector(selectIncomeTypes);
  const family = useSelector(selectSelectedFamily);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [selectedCategoryType, setSelectedCategoryType] = useState<string>('Expense');
  const urlFood =
    'https://img.freepik.com/premium-vector/icon-food-drink-illustration-vector_643279-134.jpg';

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const createCategory = async () => {
    try {
      if (selectedCategoryType === 'Expense') {
        await ExpenseServices.createExpenseType(family.id_family, newCategoryName);
      } else if (selectedCategoryType === 'Income') {
        await IncomeServices.createIncomeType(family.id_family, newCategoryName);
      }
      toggleModal();
      setNewCategoryName('');
    } catch (error: any) {
      console.error('Error creating category:', error.message);
      Alert.alert('Error', 'An error occurred while creating the category.');
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
      'Confirm Delete',
      'Are you sure you want to delete this category?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await IncomeServices.deleteIncomeSource(family.id_family, item.id_income_source);
              Alert.alert('Success', 'The category has been deleted successfully.');
            } catch (error) {
              console.error('Error deleting income category:', error);
              Alert.alert('Error', 'An error occurred while deleting the category.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const onDeleteExpense = async (item: any) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this category?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await ExpenseServices.deleteExpenseType(family.id_family, item.id_expenditure_type);
              Alert.alert('Success', 'The category has been deleted successfully.');
            } catch (error) {
              console.error('Error deleting expense category:', error);
              Alert.alert('Error', 'An error occurred while deleting the category.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const selectOption = (option: string) => {
    setSelectedCategoryType(option);
  };

  const renderCategoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.categoryItemContainer} onPress={() => selectCategory(item)}>
      <Image source={{ uri: urlFood }} style={styles.categoryImage} />
      <Text style={styles.categoryName}>
        {selectedCategoryType === 'Expense' ? item.expense_type_name : item.income_source_name}
      </Text>
      <TouchableOpacity
        onPress={() =>
          selectedCategoryType === 'Expense' ? onDeleteExpense(item) : onDeleteIncome(item)
        }
        style={styles.deleteButton}>
        <Icon name="trash-outline" size={20} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('FamilyTab', {screen: 'Expense'})} style={styles.headerButton}>
          <Icon name="arrow-back" size={25} style={styles.backButton} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerText}>Categories</Text>
        </View>
        <TouchableOpacity onPress={toggleModal} style={styles.headerButton}>
          <Icon name="add" size={30} style={styles.addImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerTab}>
            <TouchableOpacity
              onPress={() => selectOption('Income')}
              style={[
                styles.tabButton,
                selectedCategoryType === 'Income' && styles.selectedTabButton,
                { borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }
              ]}>
              <Text style={[styles.tabButtonText, selectedCategoryType === 'Income' && styles.selectedTabText]}>Income</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => selectOption('Expense')}
              style={[
                styles.tabButton,
                selectedCategoryType === 'Expense' && styles.selectedTabButton,
                { borderTopRightRadius: 20, borderBottomRightRadius: 20 }
              ]}>
              <Text style={[styles.tabButtonText, selectedCategoryType === 'Expense' && styles.selectedTabText]}>Expense</Text>
            </TouchableOpacity>
            <View
              style={[
                styles.bottomLine,
                { left: selectedCategoryType === 'Income' ? 0 : '50%', borderRadius: 20 }
              ]}
            />
          </View>

      <FlatList
        data={selectedCategoryType === 'Expense' ? Object.values(expenseType) : Object.values(incomeCategories)}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Category</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter category name"
              value={newCategoryName}
              onChangeText={setNewCategoryName}
            />
            <TouchableOpacity style={styles.button} onPress={createCategory}>
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleModal}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CategoryExpenseScreen;
