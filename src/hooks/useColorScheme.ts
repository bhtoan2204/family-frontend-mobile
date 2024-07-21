import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useColorScheme as useColorSchemeNativeWind} from 'nativewind';
import LocalStorage from 'src/store/localstorage';
import {useColorScheme} from 'react-native';
import {AppDispatch} from 'src/redux/store';
import {useDispatch} from 'react-redux';
import {setDarkMode} from 'src/redux/slices/DarkModeSlice';

export const useGetColorScheme = () => {
  const {setColorScheme} = useColorSchemeNativeWind();
  const colorScheme = useColorScheme();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    // const fetchColorScheme = async () => {
    //   const isDarkMode = await LocalStorage.GetIsDarkMode();
    //   if (isDarkMode !== null) {
    //     setColorScheme(isDarkMode === 'dark' ? 'dark' : 'light');
    //   } else {
    //     await LocalStorage.StoreIsDarkMode('light');
    //     setColorScheme('light');
    //   }
    // };

    // fetchColorScheme();
    if (colorScheme === 'dark') {
      setColorScheme('dark');
      dispatch(setDarkMode(true));
    } else {
      setColorScheme('light');
      dispatch(setDarkMode(false));
    }
    console.log(colorScheme)
  }, [colorScheme]);
};
