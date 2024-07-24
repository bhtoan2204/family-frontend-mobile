import React from 'react';
import { BottomTabBarButtonProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import TabButton from 'src/components/TabButton';
import { TEXTS } from 'src/constants';
import HomeScreen from 'src/screens/HomeScreen';
import NotificationScreen from 'src/screens/Notifications/NotificationScreen';
import ProfileScreen from 'src/screens/ProfileScreen';
import ChangePassword from 'src/screens/ProfileScreen/ChangePassword/ChangePassword';
import EditProfileScreen from 'src/screens/ProfileScreen/EditProfileScreen/EditProfileScreen';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import i18n from 'src/components/i18next/i18n';

const Tab = createBottomTabNavigator();

const TabList = [
  {
    id: TEXTS.HOME_TAB,
    title: 'homeTab',
    component: HomeScreen,
    screen: 'HomeScreen',
    icon: 'home',
    visible: true,
  },
  {
    id: 'ChatList',
    title: 'chatTab',
    component: HomeScreen, 
    screen: 'ChatList',
    icon: 'chat',
    visible: true,
  },
  {
    id: 'Notification',
    title: 'notificationTab',
    component: NotificationScreen,
    screen: 'Notification',
    icon: 'bell',
    visible: true,
  },
  {
    id: TEXTS.MORE_TAB,
    title: 'profileTab',
    component: ProfileScreen,
    screen: 'ProfileScreen',
    icon: 'account-circle',
    visible: true,
  },
  {
    id: 'ChangePassword',
    title: 'changePassword',
    component: ChangePassword,
    screen: 'ChangePassword',
    visible: false,
  },
  {
    id: 'EditProfile',
    title: 'editProfile',
    component: EditProfileScreen,
    screen: 'EditProfile',
  },
];

const TabBarButton = (props: BottomTabBarButtonProps, tab: any) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (tab.id === 'ChatList') {
      navigation.navigate('MessageTab', { screen: 'MessageTab' });
    } else {
      props.onPress();
    }
  };

  return (
    <TabButton
      accessibilityState={props.accessibilityState}
      onPress={handlePress}
      item={tab}
    />
  );
};

const HomeTab = () => {

  return (
    <Tab.Navigator
      screenOptions={{
        header: () => null,
        tabBarStyle: styles.tabBar,
      }}>
      {TabList.map((tab) => (
        <Tab.Screen
          key={tab.id}
          name={tab.screen}
          component={tab.component}
          options={{
            tabBarShowLabel: true,
            tabBarButton: (props) => (tab.visible ? TabBarButton(props, tab) : null),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: '9%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeTab;
