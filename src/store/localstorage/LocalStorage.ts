import AsyncStorage from '@react-native-async-storage/async-storage';
import KeyStore from './KeyStore';

const LocalStorage = {
  StoreAccessToken: async (token: string) =>
    await AsyncStorage.setItem(KeyStore.ACCESS_TOKEN, token),
  StoreRefreshToken: async (token: string) =>
    await AsyncStorage.setItem(KeyStore.REFRESH_TOKEN, token),
  GetAccessToken: async () => await AsyncStorage.getItem(KeyStore.ACCESS_TOKEN),
  GetRefreshToken: async () =>
    await AsyncStorage.getItem(KeyStore.REFRESH_TOKEN),
  RemoveAccessToken: async () =>
    await AsyncStorage.removeItem(KeyStore.ACCESS_TOKEN),
  RemoveRefreshToken: async () =>
    await AsyncStorage.removeItem(KeyStore.REFRESH_TOKEN),
  StoreUserData: async (userData: object) =>
    await AsyncStorage.setItem(KeyStore.USER_DATA, JSON.stringify(userData)),
  GetUserData: async () => {
    const userData = await AsyncStorage.getItem(KeyStore.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  },
  RemoveUserData: async () => await AsyncStorage.removeItem(KeyStore.USER_DATA),
  ClearAll: async () => await AsyncStorage.clear(),
};

export default LocalStorage;
