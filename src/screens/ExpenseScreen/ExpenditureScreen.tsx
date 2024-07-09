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
  setExpenseCategory_id,
  setExpenseCategory_name,
  setIncomeCategory_id,
  setIncomeCategory_name,
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
import { IncomeType } from 'src/interface/income/getIncome';

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
  const url =
    'https://png.pngtree.com/element_our/20190530/ourmid/pngtree-correct-icon-image_1267804.jpg';
  const urlCatetory = 'https://static.thenounproject.com/png/2351449-200.png';
 
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

  useEffect(() => {
    fetchExpenseType();
    fetchIncomeType();
  }, []);


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
    if (selectedMenu === 'Expense') {
    if ( !amount || !profile.id_user || !expenseCategory || !expenseCategory.id_expenditure_type || !date) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
  
    try {
      const response = await ExpenseServices.createExpense(family?.id_family, amount, profile.id_user, expenseCategory.id_expenditure_type, date, description, uriImage);
      
      if (response) {
        Alert.alert('Success', 'Expense created successfully');
      } 
  
      setAmount(null);
      setDescription('');
      setUriImage(null);
  
    } catch(error) {
      Alert.alert('Error', 'Failed to create expense');
    }
  }
  else if (selectedMenu === 'Income') {
    if (!amount || !profile.id_user || !incomeCategory || !incomeCategory?.id_income_source || !date) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
  
    try {
     await IncomeServices.createIncome(family?.id_family, amount, profile.id_user, incomeCategory?.id_income_source, date, description);
      
      
      Alert.alert('Success', 'Expense created successfully');
      
  
      setAmount(null);
      setDescription('');
      setUriImage(null);
  
    } catch(error) {
      Alert.alert('Error', 'Failed to create expense');
    }
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

 


  const itemsPerPage = 6;
  const pages: any[] = [];

  const pagesIncome: any[] = [];
  // if (!incomeType.some(item => item.id_income_source === -1)) {
  //   incomeType.push({id_income_source: -1, income_source_name: 'Edit'});
  // }

  // for (let i = 0; i < incomeType.length; i += itemsPerPage) {
  //   pagesIncome.push(incomeType.slice(i, i + itemsPerPage)); 
  // }

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
      <SafeAreaView style={{flex: 1}}>
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
              <Icon name="checkmark-done-sharp" color="#2a475e" size={30} />
            </TouchableOpacity>
          </View>
          <View style={{height: 1, backgroundColor: '#F4F4F4', bottom: 5}} />
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
            <View style={{ flexDirection: 'column', backgroundColor: 'white', marginBottom: 10 }}>
              <Text style={styles.text}>Select Member</Text>
              <FlatList
                data={members}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => ( 
                  <TouchableOpacity style={styles.memberItem}>
                    <Text>{item.user.firstname} {item.user.lastname}</Text>
                  </TouchableOpacity>
                )}
              />

            </View>
            {selectedMenu == 'Expense' && (
              <View style={styles.ContainerCategory}>
                <View style={styles.selectedItemContainer}>
                  <Image source={{uri: urlCatetory}} style={styles.avatar} />
                  <Text
                    style={[
                      styles.inputAmount,
                      {textAlign: 'left'},
                      {fontSize: 18},
                      {color: '#1b2838'},
                    ]}>
                    {expenseCategory?.expense_type_name || 'Select category'}
                  </Text>

                  <TouchableOpacity
                    style={styles.chevronContainer}
                    onPress={pressSelectCategory}>
                    <Text
                      style={[
                        {
                          color: '#1b2838',
                          fontWeight: 600,
                          fontSize: 16,
                          marginRight: 5,
                        },
                      ]}>
                      View All
                    </Text>
                    <Icon
                      name="chevron-forward-outline"
                      size={22}
                      color="#1b2838"
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
                    name={
                      isScrollViewVisible ? 'chevron-down' : 'chevron-right'
                    }
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
                              event.nativeEvent.contentOffset.x /
                                widthOfYourPage,
                            );
                            setCurrentPage(pageIndex);
                          },
                        },
                      )}>
                  {expenseType && (
                    <FlatList
                      data={ Object.values(dataExpenseTypeToShow) }
                      keyExtractor={(item) => item.id_expenditure_type.toString()}
                      numColumns={3}
                      contentContainerStyle={{ marginLeft: 10 }}
                      scrollEnabled={false}
                      renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleExpenseTypePress(item)}>
                          <View style={[styles.categoryContainer, { width: 125, height: 80 }]}>
                            <Text style={styles.expenseItem} numberOfLines={1} ellipsizeMode="tail">
                              {item.expense_type_name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  )}

                    </Animated.ScrollView>
                    {/* <View style={styles.pagination}>
                      <FlatList
                        data={ Object.values(dataExpenseTypeToShow) }
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ index }) => (
                          <View
                            style={[
                              styles.dot,
                              {
                                backgroundColor: index === currentPage ? 'gray' : '#ccc',
                              },
                            ]}
                          />
                        )}
                      />
                    </View> */}

                  </>
                )}
              </View>
            )}

            { selectedMenu == 'Income' && (
              <View style={styles.ContainerCategory}>
                <View style={styles.selectedItemContainer}>
                  <Image source={{uri: urlCatetory}} style={styles.avatar} />
                  <Text
                    style={[
                      styles.inputAmount,
                      {textAlign: 'left'},
                      {fontSize: 18},
                      {color: '#1b2838'},
                    ]}>
                    {incomeCategory?.income_source_name || 'Select category'}
                  </Text>

                  <TouchableOpacity
                    style={styles.chevronContainer}
                    onPress={pressSelectCategory}>
                    <Text
                      style={[
                        {
                          color: '#1b2838',
                          fontWeight: 600,
                          fontSize: 16,
                          marginRight: 5,
                        },
                      ]}>
                      View All
                    </Text>
                    <Icon
                      name="chevron-forward-outline"
                      size={22}
                      color="#1b2838"
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
                    name={
                      isScrollViewVisible ? 'chevron-down' : 'chevron-right'
                    }
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
                              event.nativeEvent.contentOffset.x /
                                widthOfYourPage,
                            );
                            setCurrentPage(pageIndex);
                          },
                        },
                      )}>
                      {incomeType && (
                        <FlatList
                          data={Object.values(dataIncomeTypeToShow) }
                          numColumns={3}
                          keyExtractor={item =>
                            item.id_income_source.toString()
                          }
                          contentContainerStyle={{marginLeft: 10}}
                          scrollEnabled={false}
                          renderItem={({item}) => (
                            <TouchableOpacity
                              onPress={() => handleIncomeTypePress(item)}>
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
                                  {item.income_source_name}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          )}
                        />
                      )}
                    </Animated.ScrollView>
                    {/* <View style={styles.pagination}>
                      <FlatList
                        data={ Object.values(dataIncomeTypeToShow) }
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ index }) => (
                          <View
                            style={[
                              styles.dot,
                              {
                                backgroundColor: index === currentPage ? 'gray' : '#ccc',
                              },
                            ]}
                          />
                        )}
                      />
                    </View> */}
                  </>
                )}
              </View>
            )}

            {/* {selectedMenu === 'Utilities' && <CreateInvoiceComponent />} */}

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

          {/* <Modal visible={showLargeImage} transparent={true}>
            <View style={styles.modalImageContainer}>
              <Image source={{uri: uriImage}} style={styles.largeImage} />
              <TouchableOpacity
                onPress={() => setShowLargeImage(false)}
                style={styles.closeButton}>
                <Icon name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </Modal> */}

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
                  <TouchableOpacity
                    onPress={() => handleOptionPress('Expense')}>
                    <View style={styles.menuItem}>
                      <Image
                        source={require('src/assets/icons/expense.png')}
                        resizeMode="stretch"
                        style={styles.avatar}
                      />
                      <Text style={styles.text}>Expense</Text>
                      <View style={styles.checkIcon}>
                        {selectedMenu === 'Expense' && (
                          <Icon
                            name="checkmark-sharp"
                            size={20}
                            color="green"
                          />
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleOptionPress('Income')}>
                    <View style={styles.menuItem}>
                      <Image
                        source={require('src/assets/icons/income.png')}
                        resizeMode="stretch"
                        style={styles.avatar}
                      />
                      <Text style={styles.text}>Income</Text>
                      <View style={styles.checkIcon}>
                        {selectedMenu === 'Income' && (
                          <Icon
                            name="checkmark-sharp"
                            size={20}
                            color="green"
                          />
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleOptionPress('Utilities')}>
                    <View style={styles.menuItem}>
                      <Image
                        source={require('src/assets/icons/invoice.png')}
                        resizeMode="stretch"
                        style={styles.avatar}
                      />
                      <Text style={styles.text}>Utilities</Text>
                      <View style={styles.checkIcon}>
                        {selectedMenu === 'Utilities' && (
                          <Icon
                            name="checkmark-sharp"
                            size={20}
                            color="green"
                          />
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ExpenditureScreen;
