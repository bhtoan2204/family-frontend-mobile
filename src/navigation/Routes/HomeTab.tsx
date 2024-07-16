import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import TabButton from 'src/components/TabButton';
import {TEXTS} from 'src/constants';
import HomeScreen from 'src/screens/HomeScreen';
import ReportScreen from 'src/screens/Report';
import ViewAllFamilyScreen from 'src/screens/ViewAllFamily';
import ExpenditureScreen from 'src/screens/ExpenseScreen/CreateExpense';
import BottomSheetChild from 'src/screens/HomeScreen/BottomSheetContent';
import CategoryExpenseScreen from 'src/screens/ExpenseScreen/CategoryScreen';
import WalletScreen from 'src/screens/ExpenseScreen/WalletScreen';
import FamilyScreen from 'src/screens/ExpenseScreen/FamilyScreen';
import ProfileScreen from 'src/screens/ProfileScreen';
import ChangePassword from 'src/screens/ProfileScreen/ChangePassword/ChangePassword';
import EditProfileScreen from 'src/screens/ProfileScreen/EditProfileScreen/EditProfileScreen';
import ChatListScreen from 'src/screens/Chat/ChatList/ChatListScreen';
import MessageTab from './MessageTab';
import { useNavigation } from '@react-navigation/native';
import NotificationScreen from 'src/screens/Notifications/NotificationScreen';

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
    id: 'ChatList',
    title: 'Chat',
    component: HomeScreen, 
    screen: 'ChatList', 
    icon: 'chat',
    visible: true,
  },


  {
    id: 'Notification',
    title: 'Notification',
    component: NotificationScreen,
    screen: 'Notification',
    icon: 'bell',
    visible: true,
  },

  {
    id: TEXTS.MORE_TAB,
    title: 'Profile',
    component: ProfileScreen,
    screen: 'ProfileScreen',
    icon: 'account-circle',
    visible: true,
  },
  {
    id: 'ChangePassword',
    title: 'ChangePassword',
    component: ChangePassword,
    screen: 'ChangePassword',
    visible: false,
  },
  {
    id: 'EditProfile',
    title: 'EditProfile',
    component: EditProfileScreen,
    screen: 'EditProfile',
  },
];

const TabBarButton = (props: BottomTabBarButtonProps, tab: any) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (tab.id === 'ChatList') {
      navigation.navigate('MessageTab', {screen: 'MessageTab'});
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
    height: '9%',
    width: '100%',
    position: 'absolute',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(128, 50, 128, 0.5)',
  },
});

export default HomeTab;
