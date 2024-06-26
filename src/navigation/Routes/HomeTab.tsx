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
import ExpenditureScreen from 'src/screens/ExpenseScreen';
import BottomSheetChild from 'src/screens/HomeScreen/BottomSheetContent';
import CategoryExpenseScreen from 'src/screens/ExpenseScreen/CategoryScreen';
import WalletScreen from 'src/screens/ExpenseScreen/WalletScreen';
import FamilyScreen from 'src/screens/ExpenseScreen/FamilyScreen';
import CreateInvoiceScreen from 'src/screens/Invoice/CreateInvoice/CreateInvoice';
import ProfileScreen from 'src/screens/ProfileScreen';
import ChangePassword from 'src/screens/ProfileScreen/ChangePassword/ChangePassword';
import EditProfile from 'src/screens/ProfileScreen/EditProfile/EditProfile';
import EditProfileScreen from 'src/screens/ProfileScreen/EditProfileScreen/EditProfileScreen';

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
    screen: 'ViewAllFamilyScreen',
    icon: 'account-group',
    visible: true,
  },
  {
    id: 'Expense',
    title: 'Expense',
    component: ExpenditureScreen,
    screen: 'Expense',
    icon: 'plus',
    visible: true,
  },
  {
    id: 'Invoice',
    title: 'Invoice',
    component: CreateInvoiceScreen,
    screen: 'Invoice',
    icon: 'plus',
    visible: false,
  },
  {
    id: 'CategoryExpense',
    component: CategoryExpenseScreen,
    screen: 'CategoryExpense',
    visible: false,
  },
  {
    id: 'Wallet',
    component: WalletScreen,
    screen: 'Wallet',
    visible: false,
  },
  {
    id: 'FamilyFinace',
    component: FamilyScreen,
    screen: 'FamilyFinace',
    visible: false,
  },

  {
    id: TEXTS.REPORT_TAB,
    title: TEXTS.REPORT_TAB,
    component: ReportScreen,
    screen: 'ReportScreen',
    icon: 'notebook',
    visible: true,
  },
  {
    id: TEXTS.MORE_TAB,
    title: TEXTS.MORE_TAB,
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
