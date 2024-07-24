import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PackageScreen from 'src/screens/PurchasedScreen/PackageScreen';
import BankInfoScreen from 'src/screens/BankInfoScreen';
import ZaloPayScreen from 'src/screens/ZaloPayScreen';
import PurchasedScreen from 'src/screens/PurchasedScreen';
import {PackStackParamList} from '../NavigationTypes';
import ComboScreen from 'src/screens/ComboScreen';
import ServiceScreen from 'src/screens/PurchasedScreen/ServiceScreen/ServiceScreen';
import OrderDetailScreen from 'src/screens/OrderDetailScreen/OrderDetailPackage/OrderDetailScreen';
import OrderDetailService from 'src/screens/OrderDetailScreen/OrderDetailService/OrderDetailService';

const Stack = createNativeStackNavigator<PackStackParamList>();

const PackStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}>
      <Stack.Screen name="ZaloPayScreen" component={ZaloPayScreen} />
      <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
      <Stack.Screen name="ViewAllPackage" component={PackageScreen} />
      <Stack.Screen name="BankInfoScreen" component={BankInfoScreen} />
      <Stack.Screen name="ViewAllPurchased" component={PurchasedScreen} />
      <Stack.Screen name="ViewAllService" component={ServiceScreen} />
      <Stack.Screen name="ComboScreen" component={ComboScreen} />     
      <Stack.Screen name="OrderDetailService" component={OrderDetailService} />

    </Stack.Navigator>
  );
};

export default PackStack;
