import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useColorScheme} from 'nativewind';
import LocalStorage from 'src/store/localstorage';

export const useGetColorScheme = () => {
  const {setColorScheme} = useColorScheme();

  useEffect(() => {
    const fetchColorScheme = async () => {
      const isDarkMode = await LocalStorage.GetIsDarkMode();
      if (isDarkMode !== null) {
        setColorScheme(isDarkMode === 'dark' ? 'dark' : 'light');
      } else {
        await LocalStorage.StoreIsDarkMode('light');
        setColorScheme('light');
      }
    };

    fetchColorScheme();
  }, []);
};
