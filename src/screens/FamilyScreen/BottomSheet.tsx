import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import UpdateFamilyScreen from '../ModalScreen/UpdateFamily';

const Stack = createNativeStackNavigator();

interface BottomSheetProps {
  id_family?: number;
  name?: string;
  description?: string;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  id_family,
  name,
  description,
}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="UpdateFamily"
        component={UpdateFamilyScreen}
        initialParams={{id_family, name, description}}
      />
    </Stack.Navigator>
  );
};

export default BottomSheet;
