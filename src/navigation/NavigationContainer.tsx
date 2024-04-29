import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../constants';
import AuthStack from './Routes/AuthStack';
import HomeTab from './Routes/HomeTab';
import FamilyStack from './Routes/FamilyStack';
import PackStack from './Routes/PackStack';
import CalendarStack from './Routes/CalendarStack';
import ChatStack from './Routes/ChatStack';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: () => null,
          }}>
          <Stack.Screen name="AuthStack" component={AuthStack} />
          <Stack.Screen name="HomeTab" component={HomeTab} />
          <Stack.Screen name="FamilyStack" component={FamilyStack} />
          <Stack.Screen name="PackStack" component={PackStack} />
          <Stack.Screen name="CalendarStack" component={CalendarStack} />
          <Stack.Screen name="ChatStack" component={ChatStack} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default Navigation;
