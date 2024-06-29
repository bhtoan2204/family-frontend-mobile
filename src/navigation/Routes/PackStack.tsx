import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PackageScreen from 'src/screens/PackageScreen';
import BankInfoScreen from 'src/screens/BankInfoScreen';
import OrderDetailScreen from 'src/screens/OrderDetailScreen';
import ZaloPayScreen from 'src/screens/ZaloPayScreen';
import PurchasedScreen from 'src/screens/PurchasedScreen';
import {PackStackParamList} from '../NavigationTypes';
import ComboScreen from 'src/screens/ComboScreen';

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
      <Stack.Screen name="ComboScreen" component={ComboScreen} />
    </Stack.Navigator>
  );
};

export default PackStack;
