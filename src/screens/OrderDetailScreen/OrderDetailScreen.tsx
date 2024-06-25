import React, { useState } from 'react';
import { Text, Image, View } from 'react-native';
import {
  GestureHandlerRootView,
  ScrollView,
  TouchableOpacity
} from 'react-native-gesture-handler';

import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from 'src/constants';

import styles from './styles';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { OrderDetailScreenProps } from 'src/navigation/NavigationTypes';
import { useSelector } from 'react-redux';
import { selectProfile } from 'src/redux/slices/ProfileSclice';
import { Package } from 'src/interface/package/mainPackage';
import { selectPackage } from 'src/redux/slices/PackageSlice';

type PaymentMethod = {
  id: number;
  name: string;
  code: string;
  url_image: string;
};

const OrderDetailScreen = ({ route, navigation }: OrderDetailScreenProps) => {
  const [code, setCodeMethod] = useState('vnpay');
  const currentDate = new Date().toLocaleDateString();
  const { id_family } = route.params;
  const [value, setValue] = useState(0);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: 1, name: 'VNPay', code: 'vnpay', url_image: 'https://example.com/vnpay-logo.png' },
    { id: 2, name: 'ZaloPay', code: 'zalopay', url_image: 'https://example.com/zalopay-logo.png' }
  ]);
  let profile = useSelector(selectProfile);
  let selectedPackage: Package = useSelector(selectPackage);

  const handleSelectMethod = (
    code: string,
    id_family: number,
    id_package: number,
    amount: number,
  ) => {
    switch (code) {
      case 'vnpay':
        navigation.navigate('BankInfoScreen', {
          code,
          id_family,
          id_package,
          amount,
        });
        break;
      case 'zalopay':
        navigation.navigate('ZaloPayScreen');
        break;
      default:
        console.log('Unknown id');
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ backgroundColor: COLORS.white, padding: 10 }}>
        <View style={styles.header}>
          <View style={styles.headerAction}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <FeatherIcon color="#0e0e0e" name="x" size={24} />
            </TouchableOpacity>
          </View>

          <Text style={styles.headerTitle}>Receipt</Text>

          <View style={[styles.headerAction, { alignItems: 'flex-end' }]} />
        </View>
        <ScrollView
          contentContainerStyle={styles.receipt}
          showsVerticalScrollIndicator={false}>
          <View style={styles.receiptLogo}>
            <FeatherIcon color="#fff" name="codepen" size={32} />
          </View>

          <Text style={styles.receiptTitle}>
            {selectedPackage.name}
          </Text>

          <View style={styles.receiptPrice}>
            <Text style={styles.receiptPriceText}>
              {selectedPackage.price}
            </Text>

            <Text
              style={[styles.receiptPriceText, { fontSize: 20, lineHeight: 32 }]}>
              .00
            </Text>
          </View>

          <Text style={styles.receiptDescription}>
            {selectedPackage.description}
          </Text>

          <View style={styles.divider}>
            <View style={styles.dividerInset} />
          </View>
          <View style={styles.details}>
            <Text style={styles.detailsTitle}>Transaction details</Text>

            <View style={styles.detailsRow}>
              <Text style={styles.detailsField}>Date</Text>
              <Text style={styles.detailsValue}>{currentDate}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsField}>Billing Name</Text>
              <Text style={styles.detailsValue}>
                {profile.firstname} {profile.lastname}
              </Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsField}>Billing Phone</Text>
              <Text style={styles.detailsValue}>{profile.phone}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsField}>Billing Email</Text>
              <Text style={styles.detailsValue}>{profile.email}</Text>
            </View>
            <View style={styles.divider}>
              <View style={styles.dividerInset} />
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsTitle}>Choose Payment Method</Text>
            </View>
            <View>
              {paymentMethods.map(({ code, name, url_image }, index) => {
                const isFirst = index === 0;
                const isLast = index === paymentMethods.length - 1;
                const isActive = value === index;
                return (
                  <View
                    key={code}
                    style={[
                      styles.radioWrapper,
                      isActive && styles.radioActive,
                      isFirst && styles.radioFirst,
                      isLast && styles.radioLast,
                    ]}>
                    <TouchableOpacity
                      onPress={() => {
                        setValue(index);
                        setCodeMethod(code);
                      }}>
                      <View style={styles.radio}>
                        <View
                          style={[
                            styles.radioInput,
                            isActive && styles.radioInputActive,
                          ]}
                        />

                        <Text style={styles.radioLabel}>{name}</Text>
                        <Image
                          style={[
                            styles.radioPrice,
                            { width: 30, height: 30 },
                          ]}
                          source={{ uri: url_image }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <View style={styles.overlay}>
        <TouchableOpacity
          onPress={() => {
            console.log('name_method', code);
            handleSelectMethod(code, id_family, selectedPackage.id_main_package, selectedPackage.price);
          }}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Submit Receipt</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
          }}>
          <View style={styles.btnSecondary}>
            <Text style={styles.btnSecondaryText}>Screenshot</Text>
          </View>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

export default OrderDetailScreen;
