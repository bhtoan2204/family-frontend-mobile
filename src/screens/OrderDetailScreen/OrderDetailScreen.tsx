import React, {useEffect, useState} from 'react';
import {Text, Image, View} from 'react-native';
import {
  FlatList,
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';

import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, TEXTS} from 'src/constants';

import {PackageServices} from 'src/services/apiclient';
import styles from './styles';
import {Button, TextInput} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {OrderDetailScreenProps} from 'src/navigation/NavigationTypes';

type PaymentMethod = {
  id: number;
  name: string;
  code: string;
  url_image: string;
};
//type Bank = {id: number; logo: string; shortName: string; name: string};

type Profile = {
  id_user: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
};
type PackageDetail = {
  id_package: number;
  name: string;
  price: number;
  description: string;
  expired: number;
};
const OrderDetailScreen = ({route, navigation}: OrderDetailScreenProps) => {
  const [code, setCodeMethod] = useState('vnpay');
  const currentDate = new Date().toLocaleDateString();
  const {id_user, id_family, id_package, amount} = route.params;
  const [profile, setProfile] = useState<Profile[]>([]);
  const [packageDetail, setPackageDetail] = useState<PackageDetail[]>([]);
  const [value, setValue] = React.useState(0);
  //const [banks, setBanks] = useState<Bank[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  //them tham so trong handleSelectMethod (id_package, amount)
  const handleSelectMethod = (
    code: string,
    id_user: string,
    id_family: number,
    id_package: number,
    amount: number,
  ) => {
    //navigation.navigate('BankInfoScreen', {id});
    switch (code) {
      case 'vnpay':
        navigation.navigate('BankInfoScreen', {
          code,
          id_user,
          id_family,
          id_package,
          amount,
        });
        break;
      case 'zalopay':
        navigation.navigate('ZaloPayScreen');
        break;
      // Thêm các trường hợp khác nếu cần
      default:
        console.log('Unknown id');
    }
  };
  const handleGetPackages = async (id_package: number) => {
    try {
      //console.log('Getting one package with id:', id_package);
      const result = await PackageServices.getPackage({id_package});
      //console.log('PackageServices.getPackage result:', result);
      setPackageDetail(result);
    } catch (error: any) {
      console.log('PackageServices.getPackage error:', error);
    }
  };
  const handleGetProfile = async () => {
    try {
      console.log('handleGetProfile called');
      const result = await PackageServices.getProfile();
      console.log('ProfileServices.getProfile result:', result);
      setProfile(result.data);
    } catch (error: any) {
      console.log('ProfileServices.getProfile error:', error);
    }
  };
  // const handleBankInfo = async () => {
  //   try {
  //     console.log('handleBankInfo called');
  //     const result = await PackageServices.getBankInfo();
  //     console.log('PackageServices.getBankInfo result:', result);
  //     setBanks(result);
  //   } catch (error: any) {
  //     console.log('PackageServices.getBankInfo error:', error);
  //   }
  // };

  const handlePaymentMethod = async () => {
    try {
      console.log('handleBankInfo called');
      const result = await PackageServices.getPaymentMethod();
      console.log('PackageServices.getBankInfo result:', result);
      setPaymentMethods(result);
    } catch (error: any) {
      console.log('PackageServices.getBankInfo error:', error);
    }
  };

  useEffect(() => {
    console.log('Getting package with id:', id_package);

    handlePaymentMethod();
    handleGetProfile();
    handleGetPackages(id_package);
  }, [id_package]);
  console.log('name_method', code);
  // console.log(`${profile.map} ${profile.lastname}`);
  //console.log(packageDetail.forEacrh(price => console.log(price)));

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{backgroundColor: COLORS.white, padding: 10}}>
        <View style={styles.header}>
          <View style={styles.headerAction}>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <FeatherIcon color="#0e0e0e" name="x" size={24} />
            </TouchableOpacity>
          </View>

          <Text style={styles.headerTitle}>Receipt</Text>

          <View style={[styles.headerAction, {alignItems: 'flex-end'}]} />
        </View>
        <ScrollView
          contentContainerStyle={styles.receipt}
          showsVerticalScrollIndicator={false}>
          <View style={styles.receiptLogo}>
            <FeatherIcon color="#fff" name="codepen" size={32} />
          </View>

          <Text style={styles.receiptTitle}>
            {packageDetail.map(detail => detail.name).join(', ')}
          </Text>

          {/* <Text style={styles.receiptSubtitle}>Invoice #0012-2832</Text> */}
          <View style={styles.receiptPrice}>
            <Text style={styles.receiptPriceText}>
              {packageDetail.map(detail => detail.price).join(', ')}
            </Text>

            <Text
              style={[styles.receiptPriceText, {fontSize: 20, lineHeight: 32}]}>
              .00
            </Text>
          </View>

          <Text style={styles.receiptDescription}>
            {packageDetail.map(detail => detail.description).join(', ')}
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
              {profile && (
                <Text style={styles.detailsValue}>
                  {profile.firstname} {profile.lastname}
                </Text>
              )}
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsField}>Billing Phone</Text>
              {profile && (
                <Text style={styles.detailsValue}>{profile.phone}</Text>
              )}
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsField}>Billing Email</Text>
              {profile && (
                <Text style={styles.detailsValue}>{profile.email}</Text>
              )}
            </View>
            <View style={styles.divider}>
              <View style={styles.dividerInset} />
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsTitle}>Choose Payment Method</Text>
            </View>
            <View>
              {paymentMethods &&
                paymentMethods.length > 0 &&
                paymentMethods.map(({code, name, url_image}, index) => {
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
                              {width: 30, height: 30},
                              //isActive && styles.radioPriceActive,
                            ]}
                            source={{uri: url_image}}
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
            // navigation.navigate('BankInfoScreen');
            handleSelectMethod(code, id_user, id_family, id_package, amount);
          }}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Submit Receipt</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // handle onPress
            // console.log('id_method', id);
            // handleSelectMethod(id);
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
