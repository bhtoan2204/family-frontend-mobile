import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UpdateEventScreen from '../ModalScreen/UpdateEvent';
const Stack = createNativeStackNavigator();

interface BottomSheetProps {
    id_calendar?: number;
    title?: string;
    description?: string;
    datetime?: string;
  }
  
  const BottomSheet: React.FC<BottomSheetProps> = ({ id_calendar, title, description, datetime }) => {
    console.log(id_calendar, title);
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
            initialParams={{id_calendar, title, description, datetime }} 
            
          />
   
      
        </Stack.Navigator>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default BottomSheet;
