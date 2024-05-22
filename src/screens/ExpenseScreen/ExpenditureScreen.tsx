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
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ExpenseServices from 'src/services/apiclient/ExpenseServices';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import {ExpenditureScreenProps} from 'src/navigation/NavigationTypes';
import {useDispatch, useSelector} from 'react-redux';
import {
  getExpenseId,
  getExpenseName,
  getIncomeId,
  getIncomeName,
  getType,
  setExpenseCategory_id,
  setExpenseCategory_name,
  setFamily,
  setIncomeCategory_id,
  setIncomeCategory_name,
  setType,
} from 'src/redux/slices/FinanceSlice';
import {FamilyServices, IncomeServices} from 'src/services/apiclient';
import {Family} from 'src/interface/family/family';
import TesseractOcr, {
  LANG_ENGLISH,
  LEVEL_WORD,
} from 'react-native-tesseract-ocr';
import {
  launchCameraAsync,
  MediaTypeOptions,
  CameraPermissionResponse,
  requestCameraPermissionsAsync,
} from 'expo-image-picker';
import {RNTesseractOcr} from 'react-native-tesseract-ocr';
import HomeTab from 'src/navigation/Routes/HomeTab';
import {ExpenseType} from 'src/interface/expense/ExpenseType';
import {IncomeType} from 'src/interface/income/IncomeType';
import CreateInvoiceScreen from '../Invoice/CreateInvoice/CreateInvoice';
import CreateInvoiceComponent from '../Invoice/CreateInvoice/CreateInvoice';
import {FlatList} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from 'src/constants';
import {NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {LinearGradient} from 'expo-linear-gradient';

const ExpenditureScreen = ({navigation}: ExpenditureScreenProps) => {
  const [expenseType, setExpenseType] = useState<ExpenseType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedExpenseType, setSelectedExpenseType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [wallet, setWallet] = useState<string>('');
  const [image, setImage] = useState<string>('');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const dispatch = useDispatch();
  let state = useSelector(getType);
  const [expenseCategory, selectExpenseCategory] = useState<ExpenseType>();
  const [incomeCategory, selectIncomeCategory] = useState<IncomeType>();
  const url =
    'https://png.pngtree.com/element_our/20190530/ourmid/pngtree-correct-icon-image_1267804.jpg';
  const urlCatetory = 'https://static.thenounproject.com/png/2351449-200.png';
  const urlMoney =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMpESFH3-fByKNSoaMNWOHuOp-blpyaDhabTnEbtjMmA&s';
  const [families, setFamilies] = useState<Family[]>([]);
  const [selectedFamily, setSelectedFamily] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [incomeType, setIncomeType] = useState<IncomeType[]>([]);

  const ExpenseId = useSelector(getExpenseId);
  const ExpenseName = useSelector(getExpenseName);
  const IncomeId = useSelector(getIncomeId);
  const IncomeName = useSelector(getIncomeName);
  const [uriImage, setUriImage] = useState<string>('');
  const [showLargeImage, setShowLargeImage] = useState(false);

  useEffect(() => {
    fetchAllFamily();
  }, []);

  useEffect(() => {
    if (selectedFamily != undefined) {
      fetchExpenseType(selectedFamily);
      fetchIncomeType(selectedFamily);

      if (selectedMenu == 'Expense') {
        selectExpenseCategory({
          ...expenseCategory,
          id_expense_type: ExpenseId,
          category: ExpenseName,
        });
      } else if (selectedMenu == 'Income') {
        selectIncomeCategory({
          ...incomeCategory,
          id_income_source: IncomeId,
          category: IncomeName,
        });
      }
    }
  }, [ExpenseId, IncomeId, state, selectedMenu, selectedFamily]);

  useEffect(() => {
    setSelectedMenu(state);
  }, []);

  useEffect(() => {
    dispatch(setFamily(selectedFamily));
  }, [selectedFamily]);

  const fetchExpenseType = async (id_family: any) => {
    try {
      const response = await ExpenseServices.getExpenseType(id_family);
      if (response) {
        setExpenseType(response);
      } else {
        console.error('Error in getExpenseType: response is undefined');
      }
      setLoading(false);
    } catch (error: any) {
      console.error('Error in getExpenseType:', error.message);
    }
  };

  const fetchIncomeType = async (id_family: any) => {
    try {
      const response = await IncomeServices.getIncomeType(id_family);
      setIncomeType(response);
      setLoading(false);
    } catch (error: any) {
      console.error('Error in fetchIncomeType:', error.message);
    }
  };

  const fetchAllFamily = async () => {
    try {
      const result = await FamilyServices.getAllFamily();
      setFamilies(result);
      setSelectedFamily(result[0]?.id_family || null);
    } catch (error: any) {
      console.log('FamilyServices.getAllFamily error:', error);
    }
  };

  const handleSubmit = () => {
    console.log('Amount:', amount);
    console.log('Selected Expense Type:', selectedExpenseType);
    console.log('Description:', description);
    console.log('Date:', date);
    console.log('Wallet:', wallet);
    console.log('Image:', image);
  };

  const handleDateChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleExpenseTypePress = (item: ExpenseType) => {
    selectExpenseCategory(item);
    dispatch(setExpenseCategory_id(item.id_expense_type));
    dispatch(setExpenseCategory_name(item.category));
  };

  const handleIncomeTypePress = (item: IncomeType) => {
    selectIncomeCategory(item);
    dispatch(setIncomeCategory_id(item.id_income_source));
    dispatch(setIncomeCategory_name(item.category));
  };

  const handleOptionPress = (option: string) => {
    setIsPickerOpen(false);
    setSelectedMenu(option);
    dispatch(setType(option));
  };

  const headerPress = () => {
    setIsPickerOpen(!isPickerOpen);
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

        //analyzeInvoice(result.assets[0].uri);
      }
      //     const compressedImage = await ImageManipulator.manipulateAsync(result.assets[0].uri, [], { compress: 0.5 });
      //     const fileInfo = await FileSystem.getInfoAsync(compressedImage.uri);

      //     if (fileInfo.exists && fileInfo.size) {
      //       if (fileInfo.size < 50000) {
      //         const base64 = await FileSystem.readAsStringAsync(compressedImage.uri, { encoding: 'base64' });
      //         await handleSendImage(base64);
      //       } else {
      //         alert('Selected image size exceeds 50KB limit');
      //       }
      //     } else {
      //       console.error('File does not exist or size cannot be determined');
      //     }
      //   }
    } catch (error) {
      console.error('Error opening image library:', error);
    }
  };
  const pressSelectCategory = () => {
    navigation.navigate('HomeTab', {screen: 'CategoryExpense'});
  };

  const handleFamilyPress = (family: any) => {
    if (selectedFamily == family) {
      setSelectedFamily(null);
    } else {
      setSelectedFamily(family);
    }
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
        //analyzeInvoice(result.assets[0].uri);
      }
    } else {
      alert('Permission to access camera is required!');
    }
  };

  const analyzeInvoice = async (uri: string) => {
    try {
      console.log(uri);
      // const textRecognition =  RNTextDetector.detectFromUri(uri);
      // console.log(textRecognition)
    } catch (err) {
      console.error(err);
    }
  };
  const showInvoice = () => {
    navigation.navigate('HomeTab', {screen: 'Invoice'});
  };
  const handleRemoveImage = () => {
    setUriImage('');
  };

  const itemsPerPage = 6;
  const pages = [];
  if (!expenseType.some(item => item.id_expense_type === -1)) {
    expenseType.push({id_expense_type: -1, category: 'Edit'});
  }

  for (let i = 0; i < expenseType.length; i += itemsPerPage) {
    pages.push(expenseType.slice(i, i + itemsPerPage));
  }
  const scrollX = useRef(new Animated.Value(0)).current;

  const [currentPage, setCurrentPage] = useState(0);
  const widthOfYourPage = Dimensions.get('window').width;

  const [isScrollViewVisible, setScrollViewVisible] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleMostUsedPress = () => {
    setScrollViewVisible(!isScrollViewVisible);
    if (!isScrollViewVisible) {
      setCurrentPage(0);
      scrollViewRef.current?.scrollTo({x: 0, animated: false});
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/view-all-family-2.png')}
      style={{flex: 1}}
      resizeMode="stretch">
      <View>
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
            <Icon name="checkmark-done-sharp" color="#2a475e" size={25} />
          </TouchableOpacity>
        </View>
        <View style={{height: 1, backgroundColor: '#F4F4F4', bottom: 5}} />
        <ScrollView contentContainerStyle={styles.headcontainer}>
          <View style={styles.inputContainer}>
            <Text style={{textAlign: 'left', fontSize: 17}}>Amount</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.inputAmount, {color: 'red', fontSize: 20}]}
                  placeholder="Enter amount"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                />
              </View>
              <Text style={styles.currency}>VNĐ</Text>
            </View>
            <View style={{height: 1, backgroundColor: '#F4F4F4', bottom: 5}} />
          </View>
          <View
            style={[
              {
                flexDirection: 'column',
                backgroundColor: 'white',
                marginBottom: 10,
              },
            ]}>
            <Text style={styles.text}>Select Family</Text>
            <FlatList
              horizontal
              data={families}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item: family}) => (
                <TouchableOpacity
                  style={[
                    styles.family,
                    selectedFamily === family.id_family &&
                      styles.selectedFamily,
                    {
                      marginBottom: 10,
                      margin: 5,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.1,
                      shadowRadius: 3.84,
                      elevation: 5,
                    },
                  ]}
                  onPress={() => handleFamilyPress(family.id_family)}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons
                      name="people"
                      size={22}
                      color={COLORS.darkgray}
                      style={{marginRight: 10}}
                    />
                    <Text style={styles.familyText}>{family.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          {selectedFamily != null && selectedMenu == 'Expense' && (
            <View style={styles.ContainerCategory}>
              <View style={styles.selectedItemContainer}>
                <Image source={{uri: urlCatetory}} style={styles.avatar} />
                <Text
                  style={[
                    styles.inputAmount,
                    {textAlign: 'left'},
                    {fontSize: 18},
                  ]}>
                  {expenseCategory?.category || 'Select category'}
                </Text>

                <TouchableOpacity
                  style={styles.chevronContainer}
                  onPress={pressSelectCategory}>
                  <Text
                    style={[
                      {
                        color: 'rgba(128,50,128,0.5)',
                        fontWeight: 600,
                        fontSize: 16,
                        marginRight: 5,
                      },
                    ]}>
                    All
                  </Text>
                  <Icon
                    name="chevron-forward-outline"
                    size={22}
                    color="rgba(128,50,128,0.5)"
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{height: 1, backgroundColor: '#F4F4F4', bottom: 5}}
              />
              <TouchableOpacity
                onPress={handleMostUsedPress}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  //justifyContent: 'space-between',
                }}>
                <Text style={[styles.mostUsedButton, {marginRight: -10}]}>
                  Most used{' '}
                </Text>
                <EvilIcons
                  name={isScrollViewVisible ? 'chevron-down' : 'chevron-up'}
                  size={30}
                  color="#878C9A"
                />
              </TouchableOpacity>

              {isScrollViewVisible && (
                <>
                  <Animated.ScrollView
                    ref={scrollViewRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                      [{nativeEvent: {contentOffset: {x: scrollX}}}],
                      {
                        useNativeDriver: false,
                        listener: (
                          event: NativeSyntheticEvent<NativeScrollEvent>,
                        ) => {
                          const pageIndex = Math.round(
                            event.nativeEvent.contentOffset.x / widthOfYourPage,
                          );
                          setCurrentPage(pageIndex);
                        },
                      },
                    )}>
                    {pages.map((page, pageIndex) => (
                      <FlatList
                        key={pageIndex}
                        data={page}
                        numColumns={3}
                        keyExtractor={item => item.id_expense_type.toString()}
                        contentContainerStyle={{marginLeft: 10}}
                        scrollEnabled={false}
                        renderItem={({item}) => (
                          <TouchableOpacity
                            onPress={() => handleExpenseTypePress(item)}>
                            <View
                              style={[
                                styles.categoryContainer,
                                {width: 125, height: 80},
                              ]}>
                              <Image
                                source={{uri: url}}
                                style={styles.avatar}
                              />
                              <Text
                                style={styles.expenseItem}
                                numberOfLines={1}
                                ellipsizeMode="tail">
                                {item.category}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        )}
                      />
                    ))}
                  </Animated.ScrollView>
                  <View style={styles.pagination}>
                    {pages.map((_, pageIndex) => (
                      <View
                        key={pageIndex}
                        style={[
                          styles.dot,
                          {
                            backgroundColor:
                              pageIndex === currentPage ? 'gray' : '#ccc',
                          },
                        ]}
                      />
                    ))}
                  </View>
                </>
              )}
            </View>
          )}
          {selectedFamily != null && selectedMenu == 'Income' && (
            <View style={styles.ContainerCategory}>
              <View style={styles.selectedItemContainer}>
                <Image source={{uri: urlCatetory}} style={styles.avatar} />
                <Text style={styles.inputAmount}>
                  {incomeCategory?.category || 'Select category'}
                </Text>
                <TouchableOpacity
                  style={styles.chevronContainer}
                  onPress={pressSelectCategory}>
                  <Icon name="chevron-forward-outline" size={22} color="gray" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={handleMostUsedPress}>
                <Text style={styles.mostUsedButton}>Most used </Text>
              </TouchableOpacity>

              <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                {incomeType.map(item => (
                  <TouchableOpacity
                    key={item.id_income_source}
                    onPress={() => handleIncomeTypePress(item)}>
                    <View style={styles.categoryContainer}>
                      <Image source={{uri: url}} style={styles.avatar} />
                      <Text style={styles.expenseItem}>{item.category}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {selectedMenu === 'Invoice' && <CreateInvoiceComponent />}

          <View style={styles.container}>
            <View style={styles.datePickerContainer}>
              <View style={styles.itemContainer}>
                <Icon
                  name="pencil"
                  size={25}
                  color="black"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.titleText}
                  placeholder="Description"
                  value={description}
                  onChangeText={setDescription}
                />
              </View>
            </View>

            <View style={styles.datePickerContainer}>
              <View style={styles.itemContainer}>
                <Icon
                  name="calendar"
                  size={25}
                  color="black"
                  style={styles.icon}
                />
                <Text style={[styles.text, {marginRight: 90, right: 10}]}>
                  Select Date
                </Text>
              </View>
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            </View>
          </View>
          <View style={styles.imageContainer}>
            <View style={styles.imageContainer}>
              <View style={styles.imageContainer1}>
                <TouchableOpacity onPress={() => setShowLargeImage(true)}>
                  {uriImage && (
                    <View>
                      <Image source={{uri: uriImage}} style={styles.image} />
                      <TouchableOpacity
                        style={styles.removeIconContainer}
                        onPress={handleRemoveImage}>
                        <Icon name="close" size={20} color="white" />
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.imageContainer2}>
              <TouchableOpacity onPress={() => handleOpenImageLibrary()}>
                <Icon
                  name="image"
                  size={60}
                  color="gray"
                  style={styles.cameraButton}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleTakePhoto()}>
                <Icon name="camera" size={60} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <Modal visible={showLargeImage} transparent={true}>
          <View style={styles.modalImageContainer}>
            <Image source={{uri: uriImage}} style={styles.largeImage} />
            <TouchableOpacity
              onPress={() => setShowLargeImage(false)}
              style={styles.closeButton}>
              <Icon name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={isPickerOpen}
          onRequestClose={() => {
            setIsPickerOpen(!isPickerOpen);
          }}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalBackground}
              activeOpacity={1}
              onPress={() => setIsPickerOpen(!isPickerOpen)}>
              <View style={styles.dropdownMenu}>
                <TouchableOpacity onPress={() => handleOptionPress('Expense')}>
                  <View style={styles.menuItem}>
                    <Image source={{uri: urlMoney}} style={styles.avatar} />
                    <Text style={styles.text}>Expense</Text>
                    <View style={styles.checkIcon}>
                      {selectedMenu === 'Expense' && (
                        <Icon name="checkmark-sharp" size={20} color="green" />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOptionPress('Income')}>
                  <View style={styles.menuItem}>
                    <Image source={{uri: urlMoney}} style={styles.avatar} />
                    <Text style={styles.text}>Income</Text>
                    <View style={styles.checkIcon}>
                      {selectedMenu === 'Income' && (
                        <Icon name="checkmark-sharp" size={20} color="green" />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOptionPress('Invoice')}>
                  <View style={styles.menuItem}>
                    <Image source={{uri: urlMoney}} style={styles.avatar} />
                    <Text style={styles.text}>Invoice</Text>
                    <View style={styles.checkIcon}>
                      {selectedMenu === 'Invoice' && (
                        <Icon name="checkmark-sharp" size={20} color="green" />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

export default ExpenditureScreen;
