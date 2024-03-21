import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import React, {useState, useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import {FamilyServices} from 'src/services/apiclient';
import {Table, Row} from 'react-native-table-component';
import styles from './styles';
import {SwipeListView} from 'react-native-swipe-list-view';
import RBSheet from 'react-native-raw-bottom-sheet';
import {COLORS, TEXTS} from 'src/constants';
import {Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import CustomButton from 'src/components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
//import {HomePageScreenProps} from 'src/navigation/NavigationTypes';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ConfirmButton from 'src/components/Button/ButtonConfirm';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {Button, Menu, Divider, PaperProvider} from 'react-native-paper';

const items: Item[] = [
  // Your item objects here
  {
    img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    name: 'Dubai',
    airport: 'DXB',
    departure: '2022-10-10',
    arrival: '2023-04-01',
    price: 966,
  },
  {
    img: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80',
    name: 'Italy',
    airport: 'VCE',
    departure: '2022-10-10',
    arrival: '2023-04-01',
    price: 652,
  },
  {
    img: 'https://images.unsplash.com/photo-1623536167776-922ccb1ff749?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=544&q=80',
    name: 'Bosnia',
    airport: 'BNX',
    departure: '2022-10-10',
    arrival: '2023-04-01',
    price: 566,
  },
  {
    img: 'https://images.unsplash.com/photo-1554939437-ecc492c67b78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    name: 'Spain',
    airport: 'BCN',
    departure: '2022-10-10',
    arrival: '2023-04-01',
    price: 602,
  },
];

type Family = {
  id_family: number;
  name: string;
  description: string;
};

type FamilyDetail = {
  id_family: number;
  quantity: number;
  description: string;
  name: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
};

interface FormValues {
  id_family: number;
  description: string;
  name: string;
  submit: null;
}

const ViewAllFamilyScreen = () => {
  const RBEdit = useRef<RBSheet>(null);
  const RBDetail = useRef();
  const [families, setFamilies] = useState<Family[]>([]);
  const [selectedFamilyId, setSelectedFamilyId] = useState<number | null>(null);
  const [familyDetail, setFamilyDetail] = useState<FamilyDetail[]>([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const translateHeader = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -80],
    extrapolate: 'clamp',
  });
  const opacityTitle = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const translateTitle = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 40],
    extrapolate: 'clamp',
  });

  // Handle xem detail va xoa family
  const handleDetailPress = (id_family: number) => {
    handleGetFamily(id_family);
    if (RBDetail.current) {
      RBDetail.current.open();
    }
  };

  // const handleEditButtonClick = (
  //   id_family: number,
  //   setFieldValue: (field: string, value: any) => void,
  // ) => {
  //   setFieldValue('id_family', id_family);
  // };

  const handleEditPress = (id_family: number) => {
    console.log('[PRESS]Edit family with id:', id_family);
    // Thiết lập ID gia đình được chọn vào state selectedFamilyId
    setSelectedFamilyId(id_family);
    // Mở RBSheet để chỉnh sửa thông tin gia đình
    RBEdit.current?.open();
  };

  const handleDeletePress = (id_family: number) => {
    console.log('Delete family with id:', id_family);
    handleDeleteFamily(id_family);
  };
  ////////////////////////////////////////
  const handleGetAllFamily = async () => {
    try {
      console.log('Hello World');
      const result = await FamilyServices.getAllFamily();
      console.log('FamilyServices.createFamily result:', result);
      setFamilies(result);
    } catch (error: any) {
      console.log('FamilyServices.createFamily error:', error);
    }
  };
  useEffect(() => {
    handleGetAllFamily();
  }, []);

  const handleGetFamily = async (id_family: number) => {
    try {
      console.log('Getting family with id:', id_family);
      const result = await FamilyServices.getFamily({id_family});
      console.log('FamilyServices.getFamilyById result:', result);
      setFamilyDetail(result);
    } catch (error: any) {
      console.log('FamilyServices.getFamilyById error:', error);
    }
  };

  const handleEditFamily = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    console.log('[API]Edit family with id:', values.id_family);
    try {
      console.log('Hello World');
      const result = await FamilyServices.updateFamily({
        id_family: values.id_family,
        description: values.description,
        name: values.name,
      });
      console.log('FamilyServices.editFamily result:', result);

      // Nếu cập nhật thành công, đặt trạng thái form thành thành công
      if (result.success) {
        actions.setStatus({success: true});
        setSelectedFamilyId(null);
      } else {
        // Nếu cập nhật không thành công, đặt trạng thái form thành thất bại và hiển thị lỗi
        actions.setStatus({success: false});
        actions.setErrors({submit: result.message});
      }
    } catch (error: any) {
      // Nếu có lỗi xảy ra trong quá trình gọi API, đặt trạng thái form thành thất bại và hiển thị lỗi
      actions.setStatus({success: false});
      actions.setErrors({submit: error.message});
    }
  };

  const handleDeleteFamily = async (id_family: number) => {
    try {
      if (!id_family) {
        console.error('Invalid family id:', id_family);
        return;
      }
      const response = await FamilyServices.deleteFamily({id_family});
      if (!response) {
        console.error('No response from deleteFamily');
        return;
      }
      if (response && response.status === 200) {
        // Refresh the family list after successfully deleting the family
        handleGetAllFamily();
      } else {
        console.error('Error in deleteFamily:', response);
      }
    } catch (error: any) {
      console.error('FamilyServices.deleteFamily error:', error);
    }
  };

  //const tableHead = ['Family ID', 'Name', 'Description'];

  //const tableHeadDetail = ['ID', 'Name', 'Description', 'Owner ID', 'Quantity'];

  return (
    <View style={{backgroundColor: '#05141c'}}>
      <Animated.View
        style={[styles.header, {transform: [{translateY: translateHeader}]}]}>
        <Animated.Text
          style={[
            styles.headerTitle,
            {opacity: opacityTitle},
            ,
            {transform: [{translateY: translateTitle}]},
          ]}>
          Family Hub{'\n'}Explore All Things Family
        </Animated.Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
          <View
            style={[
              styles.inputWrapper,
              {
                flexDirection: 'row',
                alignItems: 'center',
              },
            ]}>
            <TextInput
              placeholder="Search Family"
              placeholderTextColor="#9A9A9A"
              style={styles.input}
            />
            <View style={styles.inputIcon}>
              <FeatherIcon color="#9A9A9A" name="search" size={16} />
            </View>
          </View>
          <TouchableOpacity>
            <FeatherIcon color="white" name="plus" size={25} />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={styles.content}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        )}
        scrollEventThrottle={1}>
        {items.map(({img, name, airport, departure, arrival, price}, index) => {
          return (
            <View key={index}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.card}>
                  {/* <View style={{flex: 1}}> */}
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      alt=""
                      resizeMode="cover"
                      source={{uri: img}}
                      style={styles.cardImg}
                    />

                    <View style={styles.cardBody}>
                      <Text>
                        <Text style={styles.cardTitle}>{name}</Text>{' '}
                        <Text style={styles.cardAirport}>{airport}</Text>
                      </Text>

                      <View style={styles.cardRow}>
                        <View style={styles.cardRowItem}>
                          <FontAwesome
                            color="#6f61c4"
                            name="plane-departure"
                            size={10}
                          />

                          <Text style={styles.cardRowItemText}>
                            {new Date(departure).toLocaleDateString('en-US', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </Text>
                        </View>

                        <View style={styles.cardRowItem}>
                          <FontAwesome
                            color="#6f61c4"
                            name="plane-arrival"
                            size={10}
                          />

                          <Text style={styles.cardRowItemText}>
                            {new Date(arrival).toLocaleDateString('en-US', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </Text>
                        </View>
                      </View>

                      <Text style={styles.cardPrice}>
                        <Text>from </Text>

                        <Text style={styles.cardPriceValue}>
                          ${price.toLocaleString('en-US')}{' '}
                        </Text>

                        <Text style={styles.cardPriceCurrency}>USD</Text>
                      </Text>

                      <TouchableOpacity
                        onPress={() => {
                          // handle onPress
                        }}>
                        <View style={styles.btn}>
                          <TouchableOpacity>
                            <Text style={styles.btnText}>View details</Text>
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity>
                      <FeatherIcon name="edit-2" size={20} color="#4884D3" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <FeatherIcon name="trash" size={20} color="#E32C3E" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

export default ViewAllFamilyScreen;
