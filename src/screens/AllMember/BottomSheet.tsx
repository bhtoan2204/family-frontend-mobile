import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AddMemberScreen from '../AddEditFamilyMemberScreen';
const Stack = createNativeStackNavigator();

interface BottomSheetProps {
    id_user?: string;
    id_family?: number;
  }
  
  const BottomSh: React.FC<BottomSheetProps> = ({ id_user, id_family }) => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="AddEditFamilyMember"
            component={AddMemberScreen}
            initialParams={{ id_user, id_family}} 
            
          />
   
      
        </Stack.Navigator>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default BottomSh;
