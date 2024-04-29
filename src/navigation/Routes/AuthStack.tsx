import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForgotPassword from '../../screens/ForgotPassword';
import LoginScreen from '../../screens/LoginScreen';
import SignupScreen from '../../screens/SignupScreen';
import {AuthStackParamList} from '../NavigationTypes';
import LandingPage from '../../screens/LandingPage/LandingPage';
import Notification from '../../screens/Notifications';

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
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="Notification" component={Notification} />

    </Stack.Navigator>
  );
};

export default AuthStack;
