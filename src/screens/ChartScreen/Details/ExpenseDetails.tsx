import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, TextInput, Alert, Platform, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ExpenseDetailScreenProps } from 'src/navigation/NavigationTypes';
import { Expenditure, selectExpense } from 'src/redux/slices/ExpenseAnalysis';
import Icon from 'react-native-vector-icons/Ionicons';
import { ExpenseServices } from 'src/services/apiclient';
import { ExpenseType } from 'src/interface/expense/ExpenseType';
import { selectfamily } from 'src/redux/slices/FamilySlice';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import ImageView from 'react-native-image-viewing';
import { COLORS } from 'src/constants';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';

const ExpenseDetailScreen = ({ navigation }: ExpenseDetailScreenProps) => {
  const dispatch = useDispatch();
  const expense: Expenditure | null = useSelector(selectExpense);
  const [isEditing, setIsEditing] = useState(false);
  const [expenseType, setExpenseType] = useState<ExpenseType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(expense?.expense_category);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [chosenDate, setChosenDate] = useState(new Date());
  const [editedDescription, setEditedDescription] = useState(expense?.description || '');
  const [editedAmount, setEditedAmount] = useState(expense?.expense_amount.toString() || '');
  const [categoryTimeout, setCategoryTimeout] = useState<NodeJS.Timeout | null>(null);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [currentImageUri, setCurrentImageUri] = useState<string | undefined>(expense?.image_url);
  const [uriImage, setUriImage] = useState<string | null>(null);
  let family = useSelector(selectfamily);
  const [loading, setLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchExpenseType(family.id_family);
  }, []);

  const fetchExpenseType = async (id_family: any) => {
    try {
      // const response = await ExpenseServices.getExpenseType(id_family);
      // setExpenseType(response);
    } catch (error: any) {
      console.error('Error in getExpenseType:', error.message);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    try {
    } catch (error) {

    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            if (expense?.id_expenditure) {
              // dispatch(deleteExpense(expense.id));
              navigation.goBack();
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const formatCurrency = (amount: string) => {
    return parseFloat(amount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
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
          await ExpenseServices.uploadImageExpense(family.id_family, expense.id_expenditure, result.assets[0].uri);
        }
        setCurrentImageUri(result.assets[0].uri);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error opening image library:', error);
      setLoading(false);
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
            <Icon name="close-outline" size={30} style={styles.backButton} />
            <Text style={styles.headerText}>Expense Details</Text>
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
              Edit
            </Text>
          </TouchableOpacity>
          )}
        </View>
          <View style={styles.amountContainer}>
            {!isEditing ? (
              <Text style={styles.valueAmount}>{formatCurrency(expense?.expense_amount.toString() || '0')}</Text>
            ) : (
              <View style={{flexDirection:'row'}}> 
              <TextInput
                style={styles.valueAmount}
                keyboardType="numeric"
                value={editedAmount}
                onChangeText={setEditedAmount}
              />
              <Text style={styles.valueAmount}> đ</Text>
              </View>
            )}
            
          </View>

          <View style={styles.card}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Category:</Text>
            <View style={styles.valueContainer}>
              {!isEditing ? (
                <Text style={styles.value}>{expense?.expense_category}</Text>
              ) : (
                <TouchableOpacity onPress={() => setShowCategoryPicker(!showCategoryPicker)}>
                  <Text style={styles.value}>{selectedCategory}</Text>
                </TouchableOpacity>
              )}
              {showCategoryPicker && (
                <Picker
                  selectedValue={selectedCategory}
                  style={styles.picker}
                  onValueChange={(itemValue) => handleCategoryChange(itemValue)}
                >
                  {expenseType.map((item) => (
                    <Picker.Item
                      key={item.id_expense_type}
                      label={item.category}
                      value={item.category}
                    />
                  ))}
                </Picker>
              )}
            </View>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Description:</Text>
            {!isEditing ? (
              <Text style={styles.value}>{expense?.description}</Text>
            ) : (
              <TextInput
                style={styles.input}
                value={editedDescription}
                onChangeText={setEditedDescription}
              />
            )}
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Created By:</Text>
            <Text style={styles.ValueName}>{expense?.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Date:</Text>
            {!isEditing ? (
              <Text style={styles.value}>{expense? moment(expense.expenditure_date).format('MMMM DD YYYY, HH:mm') :''}</Text>
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
        <View style={styles.card}> 
          <View style={styles.imageContainer}>
            <Text style={styles.label}>Receipt:</Text>
          {currentImageUri ? (
          
              <View> 
                <TouchableOpacity style={styles.imageWrapper} onPress={handleImagePress}>
                  <Image source={{ uri: currentImageUri }} style={styles.image} resizeMode="contain" />
                </TouchableOpacity>
                {isEditing && (
                  <TouchableOpacity style={styles.changeImageButton} onPress={handleSelectImage}>
                    <Text style={styles.changeImageText}>Change receipt</Text>
                  </TouchableOpacity>
                )}
                 </View>
                ): (
                  <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: COLORS.Azure, fontSize: 16}}> Add receipt</Text>
                    <Icon name="add-circle-sharp" size={36} style={{ color: COLORS.Azure}} />
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
          <View style={{flexDirection: 'row'}}> 
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
       

      {!isEditing && (
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
          <Text style={styles.deleteText}> Delete</Text>
          {/* <Icon name="trash-outline" size={24} style={styles.editIcon} /> */}
        </TouchableOpacity>
        )}

      <ImageView
        images={[{ uri: currentImageUri }]} 
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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
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
    shadowOffset: { width: 0, height: 2 },
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
    fontFamily: 'System', 
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 150, 
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center', 
  },
  

  saveButton: {
    backgroundColor: '#4CAF50',
  },


});

export default ExpenseDetailScreen;
