import React, { useEffect, useState } from 'react';
import { Text, Image, View, StyleSheet, FlatList, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PackageServices } from 'src/services/apiclient';
import { TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { BankInfoScreenProps } from 'src/navigation/NavigationTypes';
import baseUrl from 'src/services/urls/baseUrl';
import { useSelector } from 'react-redux';
import { getTranslate } from 'src/redux/slices/languageSlice';
import { useThemeColors } from 'src/hooks/useThemeColor';
import { selectOption, selectPackage, selectService } from 'src/redux/slices/PackageSlice';

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

const BankInfoScreen = ({ route, navigation }: BankInfoScreenProps) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const { id_family } = route.params;
  const translate = useSelector(getTranslate);
  const color = useThemeColors();
  const packages = useSelector(selectPackage);
  const service = useSelector(selectService);
  const option = useSelector(selectOption);

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

  const handleSelectBank = async (bankCode?: string) => {
    try {

      if (option === "Package") {
          const paymentURL = await PackageServices.createPaymentURL(packages?.id_main_package, bankCode);
          console.log('Payment URL:', paymentURL);
          if (paymentURL) {
            Linking.openURL(paymentURL);
          } else {
            console.log('Failed to create payment URL');
          }
      }
      else if (option==="Service"){
        console.log('hi')
        const paymentURL = await PackageServices.createPaymentURL(null, service?.id_extra_package, null, id_family, bankCode, null);
          console.log('Payment URL:', paymentURL);
          if (paymentURL) {
            Linking.openURL(paymentURL);
          } else {
            console.log('Failed to create payment URL');
          }
      }
    } catch (error: any) {
      console.log('Error selecting bank:', error);
    }
  };






  const handleReturnURL = async (url: string) => {
    console.log('URL được truyền vào hàm handleReturnURL:', url);
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
    const { url } = event;
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
      let subscription = Linking.addEventListener('url', handleOpenURL);

      return () => {
        subscription.remove();
        console.log('Listener đã tắt.....');
      };
    };
    const cleanup = initPaymentListener();

    return cleanup;
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: color.background, flex: 1 }}>
      <View style={styles.headerfile}>
        <TouchableOpacity onPress={()=> {navigation.goBack()}}>
          <Icon name="close" size={24} color={color.text}/>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, {color: color.text}]}>   {translate('bank')}</Text>
        </View>
      </View>
      <View style={styles.inputWrapper}>
        <View style={styles.searchview}>
          <TextInput
            placeholder={translate('search_placeholder')}
            placeholderTextColor="gray"
            style={[styles.input, { backgroundColor: color.background, color:color.white }]}
            onChangeText={handleSearchChange}
            value={searchValue}
          />
          <View style={styles.inputIcon}>
            <FeatherIcon color={color.text} name="search" size={30} />
          </View>
          <Text style={styles.text1}>{translate('support_text')}</Text>
        </View>
      </View>
      <FlatList
        data={filteredBanks}
        numColumns={3}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item: bank }) => (
          <TouchableOpacity
            onPress={() => handleSelectBank(bank.code)}
            style={styles.touchable}
          >
            <Image source={{ uri: bank.logo }} style={styles.image} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }} 
        ListFooterComponent={<View style={{ height: 50 }} />} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerfile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  backButton: {
    marginRight: 10,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputWrapper: {
    padding: 10,
  },
  searchview: {
    position: 'relative',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  input: {
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  inputIcon: {
    position: 'absolute',
    right: 20,
    top: '30%',
    transform: [{ translateY: -8 }],
  },
  text1: {
    color: 'gray',
    fontSize: 14,
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  image: {
    width: 120,
    height: 100,
    resizeMode: 'contain',
  },
});

export default BankInfoScreen;
