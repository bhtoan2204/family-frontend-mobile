import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ViewAllMemberScreen from '../AllMember';

const Stack = createNativeStackNavigator();

const AllMemberModal: React.FC = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="AllMember" 
            component={ViewAllMemberScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default AllMemberModal;
