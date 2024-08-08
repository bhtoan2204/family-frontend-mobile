import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import {PackageServices} from 'src/services/apiclient';
import {useDispatch, useSelector} from 'react-redux';
import {getTranslate} from 'src/redux/slices/languageSlice';
import {useThemeColors} from 'src/hooks/useThemeColor';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
import {Family, PaymentHistory} from 'src/interface/package/mainPackage';
import {PaymentHistoryScreennProps} from 'src/navigation/NavigationTypes';
import {setSelectedFamily} from 'src/redux/slices/FamilySlice';

const PaymentHistoryScreen = ({
  route,
  navigation,
}: PaymentHistoryScreennProps) => {
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const translate = useSelector(getTranslate);
  const color = useThemeColors();
  const itemsPerPage = 10;
  const dispatch = useDispatch();

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

  const formatCurrency = (amount: any) => {
    return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  };

  const NavigateFamily = (family: Family) => {
    dispatch(setSelectedFamily(family));

    navigation.navigate('FamilyStack', {
      screen: 'ViewFamily',
      params: {id_family: family.id_family},
    });
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
        {paymentHistory.map((item: PaymentHistory, index: number) => (
          <View
            key={index}
            style={[styles.paymentItem, {backgroundColor: color.card}]}>
            <View
              style={[
                styles.statusContainer,
                {justifyContent: 'space-between'},
              ]}>
              <View>
                <Text
                  style={{color: color.text, fontWeight: 'bold', fontSize: 20}}>
                  {' '}
                  {formatCurrency(item.amount / 1000)}
                </Text>
              </View>
              <View
                style={{
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 100,
                  height: 30,
                }}>
                <Text
                  style={[
                    {
                      color: getStatusColor(item.orders.status),
                      fontWeight: 'bold',
                      fontSize: 16,
                    },
                  ]}>
                  {item.orders.status}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.familyInfo}
              onPress={() => {
                NavigateFamily(item.orders.family);
              }}>
              <Image
                source={
                  item.orders.family.avatar
                    ? {uri: item.orders.family.avatar}
                    : require('../../assets/images/big-family_4441180.png')
                }
                style={styles.familyAvatar}
              />
              <Text
                style={[
                  styles.paymentText,
                  {color: color.textSubdued, fontWeight: 'bold'},
                ]}>
                {item.orders.family.name}
              </Text>
            </TouchableOpacity>

            <Text style={[styles.paymentText, {color: color.textSubdued}]}>
              <Text style={styles.boldText}>Payment Method:</Text>{' '}
              {item.payment_method}
            </Text>
            <Text style={[styles.paymentText, {color: color.textSubdued}]}>
              <Text style={styles.boldText}>Date:</Text>{' '}
              {moment(item.created_at).format('YYYY-MM-DD HH:mm')}
            </Text>
            {item.orders.packageMain && (
              <View style={styles.packageDetail}>
                <Text
                  style={[
                    styles.paymentText,
                    {color: color.BlueLight, fontWeight: 'bold'},
                  ]}>
                  <Text style={[styles.boldText, {color: 'gray'}]}>
                    Main Package:
                  </Text>{' '}
                  {item.orders.packageMain.name}
                </Text>
                <Text style={[styles.paymentText, {color: color.textSubdued}]}>
                  <Text style={[styles.boldText, {color: 'gray'}]}>
                    Duration (months):
                  </Text>{' '}
                  {item.orders.packageMain.duration_months}
                </Text>
              </View>
            )}
            {item.orders.packageExtra && (
              <View style={styles.packageDetail}>
                <Text
                  style={[
                    styles.paymentText,
                    {color: color.BlueLight, fontWeight: 'bold'},
                  ]}>
                  <Text style={[styles.boldText, {color: 'gray'}]}>
                    Extra Package:
                  </Text>{' '}
                  {item.orders.packageExtra.name}
                </Text>
              </View>
            )}
            {item.orders.packageCombo && (
              <View style={styles.packageDetail}>
                <Text
                  style={[
                    styles.paymentText,
                    {color: color.BlueLight, fontWeight: 'bold'},
                  ]}>
                  <Text style={styles.boldText}>Combo Package:</Text>{' '}
                  {item.orders.packageCombo.name}
                </Text>
              </View>
            )}
          </View>
        ))}
        {loading && <ActivityIndicator size="large" color={color.primary} />}
        {/* {!hasMore && (
          <Text style={[styles.noMoreDataText, {color: color.text}]}>
            {translate('NO_MORE_DATA')}
          </Text>
        )} */}
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
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  scrollViewContainer: {
    padding: 16,
  },
  paymentItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentText: {
    fontSize: 16,
    marginBottom: 6,
    color: '#ccc',
  },
  boldText: {
    fontWeight: '600',
    color: '#ccc',
  },
  packageDetail: {
    marginTop: 12,
  },
  noMoreDataText: {
    textAlign: 'center',
    padding: 16,
    fontSize: 16,
    fontStyle: 'italic',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 8,
  },
  familyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  familyAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
});

export default PaymentHistoryScreen;
