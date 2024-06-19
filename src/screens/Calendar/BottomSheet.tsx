import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UpdateEventScreen from '../ModalScreen/UpdateEventModal';
const Stack = createNativeStackNavigator();

interface BottomSheetProps {
    id_calendar: number;
 
  }
  
  const BottomSheet: React.FC<BottomSheetProps> = ({ id_calendar }) => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="UpdateEvent"
            component={UpdateEventScreen}
            initialParams={{id_calendar }} 
            
          />
   
      
        </Stack.Navigator>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default BottomSheet;
