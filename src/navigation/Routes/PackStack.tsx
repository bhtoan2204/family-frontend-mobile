import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PackageScreen from '../../screens/PackageScreen';
import BankInfoScreen from '../../screens/BankInfoScreen';
import OrderDetailScreen from '../../screens/OrderDetailScreen';
import ZaloPayScreen from '../../screens/ZaloPayScreen';
import PurchasedScreen from '../../screens/PurchasedScreen';
import {PackStackParamList} from '../NavigationTypes';

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

    </Stack.Navigator>
  );
};

export default PackStack;
