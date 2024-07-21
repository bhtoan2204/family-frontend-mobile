import {useColorScheme} from 'react-native';

import COLORS from 'src/constants/colors-2';

export const useThemeColors = () => {
  //   const {setColorScheme} = useColorSchemeNativeWind();
  const colorScheme = useColorScheme();
  if (colorScheme === 'dark') {
    return COLORS.dark;
  } else {
    return COLORS.light;
  }
};
