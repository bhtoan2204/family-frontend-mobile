import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForgotPassword from 'src/screens/ForgotPassword';
import LoginScreen from 'src/screens/LoginScreen';
import SignupScreen from 'src/screens/SignupScreen';
import {AuthStackParamList} from '../NavigationTypes';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
