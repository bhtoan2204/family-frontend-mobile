import React, {useEffect, useState} from 'react';
import {Text, Image, View, EmitterSubscription} from 'react-native';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';

import {SafeAreaView} from 'react-native-safe-area-context';

import {PackageServices} from 'src/services/apiclient';
import styles from './styles';
import {TextInput} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {BankInfoScreenProps} from 'src/navigation/NavigationTypes';

import baseUrl from 'src/services/urls/baseUrl';

import {Linking} from 'react-native';
import { useSelector } from 'react-redux';
import { getTranslate } from 'src/redux/slices/languageSlice';
import { useThemeColors } from 'src/hooks/useThemeColor';

type Bank = {
  id: number;
  code: string;
  logo: string;
  shortName: string;
  name: string;
};
interface Event {
  url: string;
}
const BankInfoScreen = ({route}: BankInfoScreenProps) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const { id_family, id_package, amount} = route.params;
  const translate = useSelector(getTranslate);
  const color = useThemeColors();
  
  const handleSearchChange = (text: string) => {
    setSearchValue(text);
  };

  const filteredBanks = banks.filter(bank =>
    bank.shortName.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const handleBankInfo = async () => {
    try {
      const result = await PackageServices.getBankInfo();
      setBanks(result.data);
    } catch (error: any) {
      console.log('PackageServices.getBankInfo error:', error);
    }
  };

  const handleSelectBank = async (id_package?: number, bankCode?: string) => {
    try {
      const paymentURL = await handleCreatePaymentURL(
        id_package,
        bankCode,
      );
      console.log('Payment URL:', paymentURL);
      if (paymentURL) {
        Linking.openURL(paymentURL);
      } else {
        console.log('Failed to create payment URL');
      }
    } catch (error: any) {
      console.log('Error selecting bank:', error);
    }
  };

  const handleCreatePaymentURL = async (
    id_main_package?: number,
    bankCode?: string,

  ) => {
    try {
      const response = await PackageServices.createPaymentURL(
        id_main_package,
        bankCode,

      );
      if (response) {
        console.log('Payment processed successfully');
        return response;
      } else {
        console.log('Failed to process payment');
      }
    } catch (error: any) {
      console.log('Error processing payment:', error);
    }
  };

  const handleReturnURL = async (url: string) => {
    console.log('URL đươc truyền vào hàm handleReturnURL:', url);
    try {
      const params = new URLSearchParams(url.split('?')[1]);
      const orderId = params.get('order_id');
      const amount = params.get('vnp_Amount');
      const bankCode = params.get('vnp_BankCode');
      console.log('Order ID:', orderId);
      console.log('Amount:', amount);
      console.log('Bank Code:', bankCode);
    } catch (error) {
      console.error('Error parsing URL:', error);
    }
  };

  const handleOpenURL = async (event: Event) => {
    const {url} = event;
    console.log('URL được truyền vào trong hàm handleOpenURL:', url);

    if (url.startsWith(`${baseUrl}/payment/vnpay_return`)) {
      await handleReturnURL(url); 
    } else {
      console.log('URL không phải là URL trả về từ thanh toán');
    }
  };

  useEffect(() => {
    handleBankInfo();

    const initPaymentListener = () => {
      console.log('Listener đang được bật.....');
      let subcription = Linking.addEventListener('url', handleOpenURL);

      return () => {
        subcription.remove();
        console.log('Listener đã tắt.....');
      };
    };
    const cleanup = initPaymentListener();

    return cleanup;
  }, []);

  return (
    <GestureHandlerRootView style={{backgroundColor: 'white'}}>
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <View style={styles.headerfile}>
          <TouchableOpacity>
            <Icon name="arrow-back" size={24} style={styles.backButton} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{translate('bank')}</Text>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.inputWrapper}>
        <View style={styles.searchview}>
          <View>
            <TextInput
              placeholder={translate('search_placeholder')}
              placeholderTextColor="gray"
              style={styles.input}
              onChangeText={handleSearchChange}
              value={searchValue}
            />
            <View style={styles.inputIcon}>
              <FeatherIcon color="gray" name="search" size={16} />
            </View>
            <Text style={styles.text1}>{translate('support_text')}</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={filteredBanks}
        numColumns={3} 
        keyExtractor={item => item.id.toString()}
        renderItem={({item: bank, index}) => (
          <TouchableOpacity
            onPress={() =>
              handleSelectBank(
                id_package,          
                bank.code,
             
            
              )
            }
            style={styles.touchable}>
            <Image source={{uri: bank.logo}} style={styles.image} />
          </TouchableOpacity>
        )}
      />
    </GestureHandlerRootView>
  );
};

export default BankInfoScreen;
