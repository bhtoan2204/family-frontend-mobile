import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {COLORS} from 'src/constants';
import {ModelScreenParamsList} from 'src/navigation/NavigationTypes';
import ChangePassword from '../ModalScreen/ChangePassword';
import MainProfile from '../ModalScreen/MainProfile';
import ProfileDetail from '../ModalScreen/ProfileDetail';

const Stack = createNativeStackNavigator<ModelScreenParamsList>();

const BottomSheetChild = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="MainProfile"
            component={MainProfile}
          />
          <Stack.Screen
            options={{
              headerShown: true,
              headerBackTitle: 'Back',
              headerTintColor: '#66c0f4',
            }}
            name="ProfileDetail"
            component={ProfileDetail}
          />
          <Stack.Screen
            options={{
              headerShown: true,
              headerBackTitle: 'Back',
              headerTintColor: '#66c0f4',
            }}
            name="ChangePassword"
            component={ChangePassword}
          />
        </Stack.Navigator>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default BottomSheetChild;
