import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UpdateFamilyScreen from '../ModalScreen/UpdateFamily';
import { UpdateFamilyScreenProps } from 'src/navigation/NavigationTypes';

const Stack = createNativeStackNavigator();

interface BottomSheetProps {
    id_user: string;
    id_family: number;
    name: string;
    description: string;
  }
  
  const BottomSheet: React.FC<BottomSheetProps> = ({ id_user, id_family, name, description }) => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="UpdateFamily"
            component={UpdateFamilyScreen}
            initialParams={{ id_user, id_family, name, description }} // Truyền params vào initialParams
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default BottomSheet;
