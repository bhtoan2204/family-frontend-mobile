import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForgotPassword from 'src/screens/ForgotPassword';
import LoginScreen from 'src/screens/LoginScreen';
import SignupScreen from 'src/screens/SignupScreen';
import {AuthStackParamList} from '../NavigationTypes';
import LandingPage from 'src/screens/LandingPage/LandingPage1/LandingPage';
import LandingPage2 from 'src/screens/LandingPage/LandingPage2/LandingPage2';
import LandingPage3 from 'src/screens/LandingPage/LandingPage3/LandingPage3';
import Notification from 'src/screens/Notifications';
import WelcomeScreen from 'src/screens/WelcomeScreen';
import EnterCodeScreen from 'src/screens/ForgotPassword/EnterCode';
import EnterEmailScreen from 'src/screens/ForgotPassword/EnterEmail';
import ResetPassword from 'src/screens/ForgotPassword/ResetPassword/ResetPassword';
import FeedbackScreen from 'src/screens/FeedBack/FeedBack';
import LanguageSelector from 'src/screens/Language/LanguageSelector';
import VerifyCode from 'src/screens/VerifyCode';
import LandingPageOld from 'src/screens/LandingPage/LandingPageOld';
const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="VerifyCode" component={VerifyCode} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPassword} />
      <Stack.Screen name="LandingPageOld" component={LandingPageOld} />
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="LandingPage2" component={LandingPage2} />
      <Stack.Screen name="LandingPage3" component={LandingPage3} />
      <Stack.Screen name="EnterCodeScreen" component={EnterCodeScreen} />
      <Stack.Screen name="EnterEmailScreen" component={EnterEmailScreen} />
      <Stack.Screen name="ResetPasswordScreen" component={ResetPassword} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
