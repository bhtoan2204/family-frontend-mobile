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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';

import Icon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import * as ImagePicker from 'expo-image-picker';
import {ExpenditureScreenProps} from 'src/navigation/NavigationTypes';
import {useDispatch, useSelector} from 'react-redux';
import {getType, setType} from 'src/redux/slices/FinanceSlice';

import {
  launchCameraAsync,
  CameraPermissionResponse,
  requestCameraPermissionsAsync,
} from 'expo-image-picker';
import {ExpenseType} from 'src/interface/expense/ExpenseType';
import {FlatList} from 'react-native-gesture-handler';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {LinearGradient} from 'expo-linear-gradient';
import {
  selectIncomeTypes,
  selectSelectedIncomeType,
  setIncomeTypes,
  setSelectedIncomeType,
} from 'src/redux/slices/IncomeTypeSlice';
import {ExpenseServices, IncomeServices} from 'src/services/apiclient';
import {
  selectExpenseTypes,
  selectSelectedExpenseType,
  setExpenseTypes,
  setSelectedExpenseType,
} from 'src/redux/slices/ExpenseTypeSlice';
import {selectProfile} from 'src/redux/slices/ProfileSclice';
import {
  selectFamilyMembers,
  selectSelectedFamily,
} from 'src/redux/slices/FamilySlice';
import {IncomeType, UtilitiesType} from 'src/interface/income/getIncome';
import CategoryExpense from './CategoryExpense';
import CategoryIncome from './CategoryIncome';
import SelectMember from './SelectMember';
import {Member} from 'src/interface/member/member';
import ImagePickerComponent from './ImagePicker';
import PickerModal from './ModalOption';
import CategoryUtilities from './CategoryUtilities';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {Toast} from 'react-native-toast-notifications';

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
  const [formattedAmount, setFormattedAmount] = useState('');
  const [amount, setAmount] = useState<number | null>(null);
  const [uriImage, setUriImage] = useState<string | null>(null);
  const [showLargeImage, setShowLargeImage] = useState(false);
  const [page, setPage] = useState(1);
  const profile = useSelector(selectProfile);
  const family = useSelector(selectSelectedFamily);
  const expenseType = useSelector(selectExpenseTypes);
  const incomeType = useSelector(selectIncomeTypes);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentPage, setCurrentPage] = useState(0);
  const widthOfYourPage = Dimensions.get('window').width;
  const [isScrollViewVisible, setScrollViewVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const dataExpenseTypeToShow = Object.values(expenseType).slice(0, 6);
  const dataIncomeTypeToShow = Object.values(incomeType).slice(0, 6);
  const members = useSelector(selectFamilyMembers);
  const [memberSelected, setMemberSelected] = useState<Member | null>(null);
  const [utilitiesSelect, setUtilitiesSelect] = useState<UtilitiesType | null>(
    null,
  );
  const translate = useSelector(getTranslate);
  const color = useThemeColors();

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
      const response = await ExpenseServices.getExpenseType(
        family?.id_family,
        page,
        50,
      );
      if (response) {
        const clonedResponse = {...response};
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
        const clonedResponse = {...response};
        await dispatch(setIncomeTypes(clonedResponse));
      }
      setLoading(false);
    } catch (error: any) {
      console.error('Error in fetchIncomeType:', error.message);
    }
  };

  const handleSubmit = async () => {
    if (!amount || !date) {
      Toast.show('Please fill in all required fields', {
        type: 'danger',
      });
      return;
    }

    try {
      console.log(expenseCategory?.expense_type_name);

      switch (selectedMenu) {
        case 'Expense':
          if (
            !expenseCategory ||
            !expenseCategory.id_expenditure_type ||
            !memberSelected?.id_user
          ) {
            Toast.show('Please select an expense category', {
              type: 'danger',
            });
            return;
          }
          await ExpenseServices.createExpense(
            family?.id_family,
            amount,
            memberSelected?.user.id_user,
            expenseCategory.id_expenditure_type,
            date,
            description,
            uriImage,
          );
          break;

        case 'Income':
          if (!incomeCategory || !incomeCategory.id_income_source) {
            Toast.show('Please select an income category', {
              type: 'danger',
            });
            return;
          }

          await IncomeServices.createIncome(
            family?.id_family,
            amount,
            memberSelected?.user.id_user,
            incomeCategory.id_income_source,
            date,
            description,
          );
          break;

        case 'Utilities':
          if (!utilitiesSelect || !utilitiesSelect.id_utilities_type) {
            Toast.show('Please select a utility category', {
              type: 'danger',
            });
            return;
          }

          await IncomeServices.createUtility(
            family?.id_family,
            utilitiesSelect.id_utilities_type,
            amount,
            description,
            uriImage,
          );
          break;

        default:
          Toast.show('Invalid menu selection', {
            type: 'danger',
          });
          return;
      }

      Toast.show('Transaction recorded', {
        type: 'success',
      });
      setFormattedAmount('');
      setAmount(null);
      setDescription('');
      setUriImage(null);
    } catch (error) {
      Toast.show('Failed to create transaction', {
        type: 'danger',
      });
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleExpenseTypePress = (item: ExpenseType) => {
    console.log(item);
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
    navigation.navigate('CategoryExpense');
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

  const formatNumberWithDots = (value: any) => {
    if (value === '') return '';

    const rawValue = value.replace(/[^\d]/g, '');

    const parts = rawValue.split('').reverse();
    const formattedValue = parts
      .reduce((acc: string[], digit: any, index: number) => {
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

    setAmount(isNaN(numericValue) ? null : numericValue);
    setFormattedAmount(formatted);
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/view-all-family-2.png')}
      style={{flex: 1}}
      resizeMode="stretch">
      <SafeAreaView style={{flex: 1, backgroundColor: color.background}}>
        <View style={[styles.header, {backgroundColor: color.background}]}>
          <TouchableOpacity style={styles.iconMoney}>
            {/* <Icon name="list" color={color.text} size={25} /> */}
          </TouchableOpacity>

          <LinearGradient
            colors={['#09203F', '#537895']}
            style={styles.circle}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}>
            <TouchableOpacity onPress={() => headerPress()}>
              <View style={styles.itemContainer}>
                <Text style={[styles.headerText, {marginRight: 10}]}>
                  {translate(selectedMenu)}
                </Text>
                <Octicons name="triangle-down" size={35} color="white" />
              </View>
            </TouchableOpacity>
          </LinearGradient>

          <TouchableOpacity
            style={styles.chevronContainer}
            onPress={handleSubmit}>
            <Icon name="save" color={color.text} size={30} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={[
              styles.headcontainer,
              {backgroundColor: color.background},
            ]}>
            <View
              style={[
                styles.inputContainer,
                {backgroundColor: color.background},
              ]}>
              <Text
                style={{textAlign: 'left', fontSize: 18, color: color.text}}>
                {translate('Amount')}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[
                      styles.inputAmount,
                      {
                        color: selectedMenu == 'Income' ? 'green' : 'red',
                        fontSize: 24,
                        fontWeight: 'bold',
                      },
                    ]}
                    placeholder={translate('Enter amount')}
                    value={formattedAmount}
                    onChangeText={handleAmountChange}
                    keyboardType="numeric"
                  />
                </View>
                <Text style={[styles.currency, {color: color.text}]}>VNĐ</Text>
              </View>
              <View
                style={{height: 1, backgroundColor: '#F4F4F4', bottom: 5}}
              />
            </View>

            {selectedMenu != 'Utilities' && (
              <SelectMember
                members={members}
                memberSelected={memberSelected}
                setMemberSelected={setMemberSelected}
              />
            )}

            {selectedMenu == 'Expense' && (
              <CategoryExpense
                expenseCategory={expenseCategory}
                pressSelectCategory={pressSelectCategory}
                handleMostUsedPress={handleMostUsedPress}
                isScrollViewVisible={isScrollViewVisible}
                scrollX={scrollX}
                expenseType={expenseType}
                dataExpenseTypeToShow={dataExpenseTypeToShow}
                handleExpenseTypePress={handleExpenseTypePress}
                widthOfYourPage={widthOfYourPage}
              />
            )}
            {selectedMenu == 'Income' && (
              <CategoryIncome
                incomeCategory={incomeCategory}
                pressSelectCategory={pressSelectCategory}
                handleMostUsedPress={handleMostUsedPress}
                isScrollViewVisible={isScrollViewVisible}
                scrollX={scrollX}
                dataIncomeTypeToShow={dataIncomeTypeToShow}
                handleIncomeTypePress={handleIncomeTypePress}
                widthOfYourPage={dataIncomeTypeToShow}
              />
            )}
            {selectedMenu == 'Utilities' && (
              <CategoryUtilities
                widthOfYourPage={widthOfYourPage}
                utilitiesSelect={utilitiesSelect}
                handleUtilitieTypePress={handleUtilitieTypePress}
                scrollX={scrollX}
              />
            )}

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
