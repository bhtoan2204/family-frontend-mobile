import React, {useState} from 'react';
import {
  Text,
  Image,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  GestureHandlerRootView,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import {SafeAreaView} from 'react-native-safe-area-context';

import styles from './styles';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {OrderDetailServiceProps} from 'src/navigation/NavigationTypes';
import {useDispatch, useSelector} from 'react-redux';
import {selectProfile} from 'src/redux/slices/ProfileSclice';
import {Service, Package} from 'src/interface/package/mainPackage';
import {
  selectCombo,
  selectOption,
  selectPackage,
  selectService,
  setOption,
} from 'src/redux/slices/PackageSlice';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {PaymentMethod} from 'src/interface/purchased/purchased';
import {AppDispatch} from 'src/redux/store';
import Icon from 'react-native-vector-icons/Ionicons';

const OrderDetailService = ({route, navigation}: OrderDetailServiceProps) => {
  const [code, setCodeMethod] = useState('vnpay');
  const {id_family} = route.params;
  const currentDate = new Date().toLocaleDateString();
  const [value, setValue] = useState(0);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 1,
      name: 'VNPay',
      code: 'vnpay',
      url_image:
        'https://cdn-new.topcv.vn/unsafe/150x/https://static.topcv.vn/company_logos/cong-ty-cp-giai-phap-thanh-toan-viet-nam-vnpay-6194ba1fa3d66.jpg',
    },
  ]);
  let profile = useSelector(selectProfile);
  const selectedService = useSelector(selectService);
  const selectedPackage = useSelector(selectPackage);
  const option = useSelector(selectOption);
  const translate = useSelector(getTranslate);
  const color = useThemeColors();
  const dispatch = useDispatch<AppDispatch>();
  const Combo = useSelector(selectCombo);
  const [discountCode, setDiscountCode] = useState(null);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const handleSelectMethod = (code: string) => {
    switch (code) {
      case 'vnpay':
        navigation.navigate('BankInfoScreen', {
          id_family,
          discountCode,
        });
        break;
      case 'zalopay':
        navigation.navigate('ZaloPayScreen');
        break;
      default:
        console.log('Unknown id');
    }
  };

  const formatCurrency = (amount: string) => {
    return parseFloat(amount).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };

  const renderDetails = () => {
    switch (option) {
      case 'Service':
        return (
          <>
            <Text style={[styles.receiptTitle, {color: color.text}]}>
              {selectedService.name}
            </Text>
            <View style={styles.receiptPrice}>
              <Text style={styles.receiptPriceText}>
                {formatCurrency(selectedService.price)}
              </Text>
            </View>
            <Text
              style={[styles.receiptDescription, {color: color.textSubdued}]}>
              {selectedService.description}
            </Text>
          </>
        );
      case 'Combo':
        return (
          <>
            <Text style={[styles.receiptTitle, {color: color.text}]}>
              {Combo?.name}
            </Text>
            <View style={styles.receiptPrice}>
              <Text style={styles.receiptPriceText}>
                {formatCurrency(Combo.price)}
              </Text>
            </View>
            <Text
              style={[styles.receiptDescription, {color: color.textSubdued}]}>
              {Combo?.description}
            </Text>
          </>
        );
      case 'Packge':
        return (
          <>
            <Text style={[styles.receiptTitle, {color: color.text}]}>
              {selectedPackage?.name}
            </Text>
            <View style={styles.receiptPrice}>
              <Text style={styles.receiptPriceText}>
                {formatCurrency(selectedPackage.price)}
              </Text>
            </View>
            <Text
              style={[styles.receiptDescription, {color: color.textSubdued}]}>
              {selectedPackage?.description}
            </Text>
          </>
        );
      default:
        return null;
    }
  };

  const getSelectedIdAndPrice = () => {
    if (option === 'Service') {
      return {
        id: selectedService.id_extra_package,
        price: selectedService.price,
      };
    }
    if (option === 'Package') {
      return {
        id: selectedPackage.id_main_package,
        price: selectedPackage.price,
      };
    }
    if (option === 'Combo') {
      return {id: Combo?.id_combo_package, price: Combo.price};
    }
    return {id: 0, price: 0};
  };

  const {id, price} = getSelectedIdAndPrice();
  const handleApplyDiscount = () => {
    console.log('Applied discount code:', discountCode);
  };
  const applyDiscount = () => {
    const discount = 0.1;
    const discountedPrice = 0;
    setTotalAmount(discountedPrice);
  };

  const handleDiscountCodeChange = (text: string) => {
    setDiscountCode(text);
    applyDiscount();
  };
  return (
    <GestureHandlerRootView
      style={{backgroundColor: color.background, height: '100%'}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        <SafeAreaView style={{padding: 20, marginTop: 20}}>
          <View style={styles.header}>
            <View style={styles.headerAction}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <FeatherIcon color={color.text} name="x" size={24} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.headerTitle, {color: color.text}]}>
              {translate('Receipt')}
            </Text>

            <View style={[styles.headerAction, {alignItems: 'flex-end'}]} />
          </View>
          <ScrollView
            contentContainerStyle={styles.receipt}
            showsVerticalScrollIndicator={false}>
            <View style={styles.receiptLogo}>
              <FeatherIcon color="#fff" name="codepen" size={32} />
            </View>

            {renderDetails()}

            <View style={styles.divider}>
              <View style={styles.dividerInset} />
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>
                {translate('Transaction details')}
              </Text>

              <View style={styles.detailsRow}>
                <Text style={[styles.detailsField, {color: color.text}]}>
                  {translate('Date')}
                </Text>
                <Text style={[styles.detailsValue, {color: color.text}]}>
                  {currentDate}
                </Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={[styles.detailsField, {color: color.text}]}>
                  {translate('Bill owner')}
                </Text>
                <Text style={[styles.detailsValue, {color: color.text}]}>
                  {profile.firstname} {profile.lastname}
                </Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={[styles.detailsField, {color: color.text}]}>
                  {translate('Phone')}
                </Text>
                <Text style={[styles.detailsValue, {color: color.text}]}>
                  {profile.phone}
                </Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={[styles.detailsField, {color: color.text}]}>
                  Email
                </Text>
                <Text style={[styles.detailsValue, {color: color.text}]}>
                  {profile.email}
                </Text>
              </View>
              <View style={styles.divider}>
                <View style={styles.dividerInset} />
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsTitle}>
                  {translate('Choose Payment Method')}
                </Text>
              </View>
              <View>
                {paymentMethods.map(({code, name, url_image}, index) => {
                  const isFirst = index === 0;
                  const isLast = index === paymentMethods.length - 1;
                  const isActive = value === index;
                  return (
                    <View
                      key={code}
                      style={[
                        styles.radioWrapper,
                        {
                          backgroundColor: color.white,
                          borderColor: color.background,
                        },
                        isActive && styles.radioActive,
                        isFirst && styles.radioFirst,
                        isLast && styles.radioLast,
                      ]}>
                      <TouchableOpacity
                        onPress={() => {
                          setValue(index);
                          setCodeMethod(code);
                        }}>
                        <View
                          style={[
                            styles.radio,
                            {backgroundColor: color.white},
                          ]}>
                          <View
                            style={[
                              styles.radioInput,
                              isActive && styles.radioInputActive,
                            ]}
                          />

                          <Text
                            style={[styles.radioLabel, {color: color.text}]}>
                            {name}
                          </Text>
                          <Image
                            style={[styles.radioPrice, {width: 30, height: 30}]}
                            source={{uri: url_image}}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>

            <View style={styles.divider}>
              <View style={styles.dividerInset} />
            </View>

            <View style={styles.details}>
              <Text style={[styles.detailsTitle, {color: color.text}]}>
                {translate('Discount Code')}
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  {backgroundColor: color.background},
                ]}>
                <Icon
                  name="pricetag"
                  size={24}
                  color={color.text}
                  style={styles.icon}
                />
                <TextInput
                  style={[
                    styles.discountInput,
                    {
                      color: color.text,
                      fontWeight: 'bold',
                    },
                  ]}
                  placeholder={translate('Enter discount code')}
                  placeholderTextColor={color.placeholderText}
                  onChangeText={handleDiscountCodeChange}
                  value={discountCode}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>

        <View style={[styles.overlay, {backgroundColor: color.background}]}>
          <TouchableOpacity
            onPress={() => {
              console.log('name_method', code);
              handleSelectMethod(code);
            }}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>{translate('Payment')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default OrderDetailService;
