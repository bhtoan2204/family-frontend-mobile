import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Button,
  SafeAreaView,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
  Dimensions,
  ImageBackground,
  Alert,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';

import Icon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import * as ImagePicker from 'expo-image-picker';
import {ExpenditureScreenProps} from 'src/navigation/NavigationTypes';
import {useDispatch, useSelector} from 'react-redux';
import {
  getType,
  setType,
} from 'src/redux/slices/FinanceSlice';

import {
  launchCameraAsync,
  CameraPermissionResponse,
  requestCameraPermissionsAsync,
} from 'expo-image-picker';
import {ExpenseType} from 'src/interface/expense/ExpenseType';
import {FlatList} from 'react-native-gesture-handler';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {LinearGradient} from 'expo-linear-gradient';
import { selectIncomeTypes, selectSelectedIncomeType, setIncomeTypes, setSelectedIncomeType } from 'src/redux/slices/IncomeTypeSlice';
import { ExpenseServices, IncomeServices } from 'src/services/apiclient';
import { selectExpenseTypes, selectSelectedExpenseType, setExpenseTypes, setSelectedExpenseType } from 'src/redux/slices/ExpenseTypeSlice';
import { selectProfile } from 'src/redux/slices/ProfileSclice';
import { selectFamilyMembers, selectSelectedFamily } from 'src/redux/slices/FamilySlice';
import { IncomeType, UtilitiesType } from 'src/interface/income/getIncome';
import CategoryExpense from './CategoryExpense';
import CategoryIncome from './CategoryIncome';
import SelectMember from './SelectMember';
import { Member } from 'src/interface/member/member';
import ImagePickerComponent from './ImagePicker';
import PickerModal from './ModalOption';
import CategoryUtilities from './CategoryUtilities';

const ExpenditureScreen = ({navigation}: ExpenditureScreenProps) => {

  const [loading, setLoading] = useState<boolean>(true);
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [image, setImage] = useState<string>('');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const dispatch = useDispatch();
  let state = useSelector(getType);
  const expenseCategory = useSelector(selectSelectedExpenseType);
  const incomeCategory = useSelector(selectSelectedIncomeType);

  const [amount, setAmount] = useState<number | null>(null);
  const [uriImage, setUriImage] = useState<string | null>(null);
  const [showLargeImage, setShowLargeImage] = useState(false);
  const [page, setPage] = useState(1);
  const profile = useSelector(selectProfile);
  const family = useSelector(selectSelectedFamily);
  const expenseType = useSelector(selectExpenseTypes);
  const incomeType=useSelector(selectIncomeTypes);
  const scrollX = useRef(new Animated.Value(0)).current;

  const [currentPage, setCurrentPage] = useState(0);
  const widthOfYourPage = Dimensions.get('window').width;

  const [isScrollViewVisible, setScrollViewVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const dataExpenseTypeToShow = Object.values(expenseType).slice(0, 6);
  const dataIncomeTypeToShow = Object.values(incomeType).slice(0, 6);
  const members = useSelector(selectFamilyMembers);
  const [memberSelected, setMemberSelected] = useState<Member | null>(null);
  const [utilitiesSelect, setUtilitiesSelect] = useState<UtilitiesType|null>(null)


  useEffect(() => {
    fetchExpenseType();
    fetchIncomeType();
    setSelectedExpenseType(null);
    setSelectedIncomeType(null);
  }, [family]);


  useEffect(() => {
    setSelectedMenu(state);

  }, [state]);



  const fetchExpenseType = async () => {
    try {
      const response = await ExpenseServices.getExpenseType(family?.id_family, page, 50);
      if (response) {
        const clonedResponse = { ...response }; 
        await dispatch(setExpenseTypes(clonedResponse));
      } else {
        console.error('Error in getExpenseType: response is undefined');
      }
      setLoading(false);
    } catch (error: any) {
      console.error('Error in getExpenseType:', error.message);
    }
  };
  
  const fetchIncomeType = async () => {
    try {
      const response = await IncomeServices.getIncomeType(family?.id_family);
      if (response) {

        const clonedResponse = { ...response }; 
        await dispatch(setIncomeTypes(clonedResponse));
      }
      setLoading(false);
    } catch (error: any) {
      console.error('Error in fetchIncomeType:', error.message);
    }
  };

 

  const handleSubmit = async () => {
    if (!amount || !date) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
  
    try {
      switch (selectedMenu) {
        case 'Expense':
          if (!expenseCategory || !expenseCategory.id_expenditure_type || !memberSelected.user.id_user) {
            Alert.alert('Error', 'Please select an expense category');
            return;
          }
 

          await ExpenseServices.createExpense(
            family?.id_family,
            amount,
            memberSelected?.user.id_user,
            expenseCategory.id_expenditure_type,
            date,
            description,
            uriImage
          );
          break;
  
        case 'Income':
          if (!incomeCategory || !incomeCategory.id_income_source) {
            Alert.alert('Error', 'Please select an income category');
            return;
          }
   
          await IncomeServices.createIncome(
            family?.id_family,
            amount,
            memberSelected?.user.id_user,
            incomeCategory.id_income_source,
            date,
            description
          );
          break;
  
        case 'Utilities':
          if (!utilitiesSelect || !utilitiesSelect.id_utilities_type) {
            Alert.alert('Error', 'Please select a utility category');
            return;
          }
  
          await IncomeServices.createUtility(
            family?.id_family,
            utilitiesSelect.id_utilities_type,
            amount,
            description,
            uriImage
          );
          break;
  
        default:
          Alert.alert('Error', 'Invalid menu selection');
          return;
      }
  
      Alert.alert('Success', 'Transaction created successfully');
      setAmount(null);
      setDescription('');
      setUriImage(null);
  
    } catch(error) {
      Alert.alert('Error', 'Failed to create transaction');
    }
  };
  
  
  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleExpenseTypePress = (item: ExpenseType) => {
    dispatch(setSelectedExpenseType(item));
  };

  const handleIncomeTypePress = (item: IncomeType) => {
    dispatch(setSelectedIncomeType(item));

  };
  const handleUtilitieTypePress = (item: UtilitiesType) => {
    setUtilitiesSelect(item);

  };
  const handleOptionPress = (option: string) => {
    setIsPickerOpen(false);
    setSelectedMenu(option);
    dispatch(setType(option));
  };

  const headerPress = () => {
    setIsPickerOpen(!isPickerOpen);
  };
  const handleRemoveImage = () => {
    setUriImage('');
    };

  const handleOpenImageLibrary = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setUriImage(result.assets[0].uri);

      }
    
    } catch (error) {
      console.error('Error opening image library:', error);
    }
  };
  const pressSelectCategory = () => {
    navigation.navigate('ExpenseStack', {screen: 'CategoryExpense'});
  };



  const handleTakePhoto = async () => {
    const cameraPermission: CameraPermissionResponse =
      await requestCameraPermissionsAsync();

    if (cameraPermission.granted) {
      const result = await launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
      });

      if (!result.canceled) {
        setUriImage(result.assets[0].uri);
      }
    } else {
      alert('Permission to access camera is required!');
    }
  };


  const handleMostUsedPress = () => {
    setScrollViewVisible(!isScrollViewVisible);
    if (!isScrollViewVisible) {
      setCurrentPage(0);
      scrollViewRef.current?.scrollTo({x: 0, animated: false});
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/view-all-family-2.png')}
      style={{flex: 1}}
      resizeMode="stretch">
      <SafeAreaView style={{flex: 1}}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.iconMoney}>
              <Icon name="list" color="#2a475e" size={25} />
            </TouchableOpacity>

            <LinearGradient
              colors={['#09203F', '#537895']}
              style={styles.circle}
              start={{x: 0, y: 1}}
              end={{x: 0, y: 0}}>
              <TouchableOpacity onPress={() => headerPress()}>
                <View style={styles.itemContainer}>
                  <Text style={[styles.headerText, {marginRight: 10}]}>
                    {selectedMenu}
                  </Text>
                  <Octicons name="triangle-down" size={35} color="#fff" />
                </View>
              </TouchableOpacity>
            </LinearGradient>

            <TouchableOpacity
              style={styles.chevronContainer}
              onPress={handleSubmit}>
              <Icon name="checkmark-done-sharp" color="#2a475e" size={30} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1}}>

          <ScrollView contentContainerStyle={styles.headcontainer}>
            <View style={styles.inputContainer}>
              <Text style={{textAlign: 'left', fontSize: 18, color: '#1b2838'}}>
                Amount
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[styles.inputAmount, {color: 'red', fontSize: 20}]}
                    placeholder="Enter amount"
                    value={amount !== null ? amount.toString() : ''}
                    onChangeText={text => setAmount(text ? Number(text) : null)}
                    keyboardType="numeric"
                  />
                </View>
                <Text style={styles.currency}>VNĐ</Text>
              </View>
              <View
                style={{height: 1, backgroundColor: '#F4F4F4', bottom: 5}}
              />
            </View>

            {selectedMenu != 'Utilities' && (
            <SelectMember members={members} memberSelected={memberSelected} setMemberSelected={setMemberSelected}/> )}
        
            {selectedMenu == 'Expense' && (
            <CategoryExpense 
            expenseCategory={expenseCategory} 
            pressSelectCategory={pressSelectCategory} 
            handleMostUsedPress = {handleMostUsedPress}
            isScrollViewVisible = {isScrollViewVisible}
            scrollX={scrollX}
            expenseType={expenseType}
            dataExpenseTypeToShow={dataExpenseTypeToShow}
            handleExpenseTypePress={handleExpenseTypePress}
            widthOfYourPage={widthOfYourPage}
            />
            )}
        { selectedMenu == 'Income' && ( 
          <CategoryIncome 
            incomeCategory ={incomeCategory}
            pressSelectCategory ={pressSelectCategory}
            handleMostUsedPress ={handleMostUsedPress}
            isScrollViewVisible ={isScrollViewVisible}
            scrollX = {scrollX}
            dataIncomeTypeToShow ={dataIncomeTypeToShow}
            handleIncomeTypePress= {handleIncomeTypePress}
            widthOfYourPage= {dataIncomeTypeToShow}
            />
        )}
        {selectedMenu == 'Utilities' && (
            <CategoryUtilities 
            widthOfYourPage={widthOfYourPage}
            utilitiesSelect={utilitiesSelect}
            handleUtilitieTypePress={handleUtilitieTypePress}
            scrollX={scrollX}
            />
        )

        }


            {/* {selectedMenu === 'Utilities' && <CreateInvoiceComponent />} */}

        <ImagePickerComponent 
          description={description}
          setDescription={setDescription}
          date={date}
          handleDateChange={handleDateChange}
          uriImage={uriImage}
          setShowLargeImage={setShowLargeImage}
          handleRemoveImage={handleRemoveImage}
          handleOpenImageLibrary={handleOpenImageLibrary}
          handleTakePhoto={handleTakePhoto}
          selectedMenu={selectedMenu}
           />

          </ScrollView>

          <PickerModal 
            isPickerOpen={isPickerOpen}
            setIsPickerOpen={setIsPickerOpen}
            selectedMenu={selectedMenu}
            handleOptionPress={handleOptionPress}
          />

         
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ExpenditureScreen;
