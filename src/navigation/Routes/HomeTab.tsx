import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import TabButton from '../../components/TabButton';
import {TEXTS} from '../../constants';
import EditProfileScreen from '../../screens/EditProfileScreen/EditProfileScreen';
import HomeScreen from '../../screens/HomeScreen';
import PackageScreen from '../../screens/PackageScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import ReportScreen from '../../screens/ReportScreen';
import ViewAllFamilyScreen from '../../screens/ViewAllFamily';
import BottomSheet from '../../screens/FamilyScreen/BottomSheet';
import BottomSheetChild from '../../screens/HomeScreen/BottomSheetContent';

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
    component: ProfileScreen,
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
