import React, {useState} from 'react';
import {
  Text,
  Image,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {
  GestureHandlerRootView,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from 'src/constants';

import styles from './styles';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {OrderDetailScreenProps} from 'src/navigation/NavigationTypes';
import {useDispatch, useSelector} from 'react-redux';
import {selectProfile} from 'src/redux/slices/ProfileSclice';
import {Package} from 'src/interface/package/mainPackage';
import {selectPackage, setOption} from 'src/redux/slices/PackageSlice';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import {PaymentMethod} from 'src/interface/purchased/purchased';

const OrderDetailScreen = ({route, navigation}: OrderDetailScreenProps) => {
  const [code, setCodeMethod] = useState('vnpay');
  const [discountCode, setDiscountCode] = useState('');
  const [totalAmount, setTotalAmount] = useState<number>(0);
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
  let selectedPackage: Package = useSelector(selectPackage);
  const translate = useSelector(getTranslate);
  const color = useThemeColors();
  const dispatch = useDispatch();

  const handleSelectMethod = (
    code: string,
    id_family: number,
    id_package: number,
    amount: number,
  ) => {
    switch (code) {
      case 'vnpay':
        dispatch(setOption('Package'));
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

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  };

  const applyDiscount = () => {
    const discount = 0.1;
    const discountedPrice =
      selectedPackage.price - selectedPackage.price * discount;
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
            showsVerticalScrollIndicator={false}
            onScrollBeginDrag={() => Keyboard.dismiss()}>
            <View style={styles.receiptLogo}>
              <FeatherIcon color="#fff" name="codepen" size={32} />
            </View>

            <Text style={[styles.receiptTitle, {color: color.text}]}>
              {selectedPackage.name}
            </Text>

            <View style={styles.receiptPrice}>
              <Text style={styles.receiptPriceText}>
                {formatCurrency(totalAmount || selectedPackage.price)}
              </Text>
            </View>

            <Text
              style={[styles.receiptDescription, {color: color.textSubdued}]}>
              {selectedPackage.description}
            </Text>

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
              <TextInput
                style={[
                  styles.discountInput,
                  {backgroundColor: color.white, color: color.text},
                ]}
                placeholder={translate('Enter discount code')}
                onChangeText={handleDiscountCodeChange}
                value={discountCode}
              />
            </View>
          </ScrollView>
        </SafeAreaView>

        <View style={[styles.overlay, {backgroundColor: color.background}]}>
          <TouchableOpacity
            onPress={() => {
              console.log('name_method', code);
              handleSelectMethod(
                code,
                id_family,
                selectedPackage.id_main_package,
                totalAmount || selectedPackage.price,
              );
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

export default OrderDetailScreen;
