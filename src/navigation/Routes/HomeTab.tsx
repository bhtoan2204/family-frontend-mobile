import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React, { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import TabButton from 'src/components/TabButton';
import { TEXTS } from 'src/constants';
import EditProfileScreen from 'src/screens/EditProfileScreen/EditProfileScreen';
import HomeScreen from 'src/screens/HomeScreen';
import PackageScreen from 'src/screens/PackageScreen';
import ProfileScreen from 'src/screens/ProfileScreen';
import ProfileScreen2 from 'src/screens/ProfileScreen/ProfileScreenV2';
import ReportScreen from 'src/screens/ReportScreen';
import ViewAllFamilyScreen from 'src/screens/ViewAllFamily';
import { getHeight } from 'src/utils/device/screen';

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
    id: TEXTS.EDIT_PROFILE,
    title: TEXTS.EDIT_PROFILE,
    component: EditProfileScreen,
    screen: 'EditProfileScreen',
    icon: 'account-edit',
    visible: false,
  },
  {
    id: TEXTS.ADD_TAB,
    title: TEXTS.ADD_TAB,
    component: ProfileScreen2,
    screen: 'AddScreen',
    icon: 'plus',
    visible: true,
  },
  {
    id: TEXTS.REPORT_TAB,
    title: TEXTS.REPORT_TAB,
    component: ReportScreen,
    //component: PackageScreen,
    screen: 'PackageScreen',
    icon: 'notebook',
    visible: true,
  },
  {
    id: TEXTS.MORE_TAB,
    title: TEXTS.MORE_TAB,
    component: ProfileScreen2,
    screen: 'MoreScreen',
    icon: 'view-list',
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
  const sheetRef = useRef<RBSheet>(null);
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
              tabBarShowLabel: false,
              tabBarButton: props =>
                tab.visible ? TabBarButton(props, tab) : null,
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
