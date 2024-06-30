import React, {useEffect, useState} from 'react';
import {VietQR} from 'vietqr';
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
      // Phân tích URL để trích xuất dữ liệu
      const params = new URLSearchParams(url.split('?')[1]);
      const orderId = params.get('order_id');
      const amount = params.get('vnp_Amount');
      const bankCode = params.get('vnp_BankCode');
      // Ví dụ: In ra thông tin đã trích xuất được
      console.log('Order ID:', orderId);
      console.log('Amount:', amount);
      console.log('Bank Code:', bankCode);
      // Tiếp tục xử lý dữ liệu...
    } catch (error) {
      console.error('Error parsing URL:', error);
    }
  };

  const handleOpenURL = async (event: Event) => {
    const {url} = event;
    console.log('URL được truyền vào trong hàm handleOpenURL:', url);

    // Kiểm tra xem URL có phải là URL trả về từ thanh toán không
    if (url.startsWith(`${baseUrl}/payment/vnpay_return`)) {
      await handleReturnURL(url); // Xử lý URL trả về từ thanh toán
    } else {
      console.log('URL không phải là URL trả về từ thanh toán');
    }
  };

  useEffect(() => {
    handleBankInfo();

    const initPaymentListener = () => {
      // Đăng ký bộ lắng nghe sự kiện mở URL
      console.log('Listener đang được bật.....');
      let subcription = Linking.addEventListener('url', handleOpenURL);

      // Hủy đăng ký bộ lắng nghe khi không cần thiết nữa
      return () => {
        subcription.remove();
        console.log('Listener đã tắt.....');
      };
    };
    // Gọi hàm khởi tạo bộ lắng nghe khi component được mount
    const cleanup = initPaymentListener();

    // Hủy bỏ bộ lắng nghe khi component bị unmount
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
            <Text style={styles.title}>Ngân hàng</Text>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.inputWrapper}>
        <View style={styles.searchview}>
          <View>
            <TextInput
              placeholder="Search for bank"
              placeholderTextColor="gray"
              style={styles.input}
              onChangeText={handleSearchChange}
              value={searchValue}
            />
            <View style={styles.inputIcon}>
              <FeatherIcon color="gray" name="search" size={16} />
            </View>
            <Text style={styles.text1}>Hỗ trợ chuyển tiền nhanh NAPAS 247</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={filteredBanks}
        numColumns={3} // Adjust as needed
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
