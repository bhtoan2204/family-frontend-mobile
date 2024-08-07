import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {PackageServices} from 'src/services/apiclient';
import {useSelector} from 'react-redux';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import Icon from 'react-native-vector-icons/Ionicons';
import {PaymentHistoryScreennProps} from 'src/navigation/NavigationTypes';
import {Feather} from '@expo/vector-icons';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';

export interface PaymentHistoryItem {
  id_payment_history: number;
  id_user: string;
  id_order: string;
  amount: number;
  type: string;
  payment_method: string;
  created_at: string;
  orders: {
    id_order: string;
    id_user: string;
    id_family: number;
    status: string;
    id_package_main: number | null;
    id_package_extra: number;
    id_package_combo: number | null;
    method: string;
    bank_code: string;
    price: string;
    created_at: string;
    updated_at: string;
  };
}

const PaymentHistoryScreen = ({
  route,
  navigation,
}: PaymentHistoryScreennProps) => {
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryItem[]>(
    [],
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const translate = useSelector(getTranslate);
  const color = useThemeColors();
  const itemsPerPage = 10;

  const fetchPaymentHistory = async (pageNumber: number) => {
    setLoading(true);
    try {
      const result = await PackageServices.paymentHistory(
        itemsPerPage,
        pageNumber,
      );
      if (result.length < itemsPerPage) {
        setHasMore(false);
      }
      setPaymentHistory(prev => [...prev, ...result]);
    } catch (error) {
      console.log('Error fetching payment history:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentHistory(page);
  }, [page]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'green';
      case 'PENDING':
        return 'yellow';
      default:
        return 'red';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'extra':
        return 'Service';
      case 'combo':
        return 'Combo Service';
      case 'main':
        return 'Package';
      default:
        return 'Unknown';
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.background}}>
      <View style={[styles.header, {backgroundColor: color.background}]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Material name="close" size={30} style={{color: color.text}} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: color.text}]}>
          {translate('PAYMENT_HISTORY')}
        </Text>
      </View>

      <ScrollView
        onScroll={({nativeEvent}) => {
          const {contentOffset, layoutMeasurement, contentSize} = nativeEvent;
          const isCloseToBottom =
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 20;
          if (isCloseToBottom) {
            handleLoadMore();
          }
        }}
        scrollEventThrottle={400}
        contentContainerStyle={styles.scrollViewContainer}>
        {paymentHistory.map((item: PaymentHistoryItem, index: number) => (
          <View
            key={index}
            style={[styles.paymentItem, {backgroundColor: color.white}]}>
            <Text style={styles.paymentText}>Amount: {item.amount}</Text>
            <Text style={styles.paymentText}>
              Type: {getTypeLabel(item.type)}
            </Text>
            <Text style={styles.paymentText}>
              Payment Method: {item.payment_method}
            </Text>
            <Text style={styles.paymentText}>
              Date: {new Date(item.created_at).toLocaleDateString()}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.paymentText]}>Order Status:</Text>
              <Text style={[{color: getStatusColor(item.orders.status)}]}>
                {' '}
                {item.orders.status}
              </Text>
            </View>
          </View>
        ))}
        {loading && <ActivityIndicator size="large" color={color.background} />}
        {!hasMore && (
          <Text style={[styles.noMoreDataText, {color: color.text}]}>
            {translate('NO_MORE_DATA')}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    ...Platform.select({
      ios: {
        paddingTop: 20, // Adjust padding for iOS status bar
      },
      android: {
        paddingTop: 20, // Adjust padding for Android status bar
      },
    }),
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollViewContainer: {
    padding: 16,
  },
  paymentItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  paymentText: {
    fontSize: 16,
    marginBottom: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  noMoreDataText: {
    textAlign: 'center',
    padding: 16,
  },
});

export default PaymentHistoryScreen;
