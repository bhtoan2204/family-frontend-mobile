import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import TabButton from 'src/components/TabButton';
import {TEXTS} from 'src/constants';
import HomeScreen from 'src/screens/HomeScreen';
import ProfileScreen from 'src/screens/ProfileScreen';
import ReportScreen from 'src/screens/ReportScreen';
import ViewAllFamilyScreen from 'src/screens/ViewAllFamily';

import BottomSheetChild from 'src/screens/HomeScreen/BottomSheetContent';
import {
  PurchasedScreenProps,
  ViewAllFamilyScreenProps,
} from '../NavigationTypes';

const Tab = createBottomTabNavigator();
const TabList = [
  {
    id: TEXTS.HOME_TAB,
    title: TEXTS.HOME_TAB,
    component: HomeScreen,
    screen: 'HomeScreen',
    icon: 'home',
    visible: true,
  },
  {
    id: TEXTS.FAMILY_TAB,
    title: TEXTS.FAMILY_TAB,
    component: ViewAllFamilyScreen,
    screen: 'ProfileScreen',
    icon: 'account-group',
    visible: true,
  },
  {
    id: TEXTS.QR_CODE_TAB,
    title: TEXTS.QR_CODE_TAB,
    component: ProfileScreen,
    screen: 'QRCodeScreen',
    icon: 'qrcode-scan',
    visible: true,
  },
  {
    id: TEXTS.REPORT_TAB,
    title: TEXTS.REPORT_TAB,
    component: ReportScreen,
    screen: 'PackageScreen',
    icon: 'notebook',
    visible: true,
  },
  {
    id: TEXTS.MORE_TAB,
    title: TEXTS.MORE_TAB,
    component: BottomSheetChild,
    screen: 'BottomSheetChild',
    icon: 'account-circle',
    visible: true,
  },
];

const TabBarButton = (props: BottomTabBarButtonProps, tab: any) => {
  return (
    <TabButton
      accessibilityState={props.accessibilityState}
      onPress={props.onPress}
      item={tab}
    />
  );
};

const HomeTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="AddScreen"
      screenOptions={{
        header: () => null,
        tabBarStyle: styles.tabBar,
      }}>
      {TabList.map((tab, index) => {
        return (
          <Tab.Screen
            key={tab.id}
            name={tab.screen}
            component={tab.component}
            options={{
              tabBarShowLabel: true,
              tabBarButton: props =>
                tab.visible ? TabBarButton(props, tab) : null,
              tabBarLabel: tab.title,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    position: 'absolute',
    bottom: 15,
    marginHorizontal: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#dadada',
  },
});

export default HomeTab;
