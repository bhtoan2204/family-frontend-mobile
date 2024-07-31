import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import TabButton from 'src/components/TabButton';
import {TEXTS} from 'src/constants';
import ChatListScreen from 'src/screens/Chat/ChatList/ChatListScreen';
import PeopleScreen from 'src/screens/Chat/ChatList/People';
import ExpenditureScreen from 'src/screens/ExpenseScreen/CreateExpense';
import ViewFamilyScreen from 'src/screens/FamilyScreen';
import ReportScreen from 'src/screens/Report';
import FamilyScreen from 'src/screens/ExpenseScreen/FamilyScreen';
import CategoryExpenseScreen from 'src/screens/ExpenseScreen/CategoryScreen/CategoryExpense';
import ChatFamilyScreen from 'src/screens/Chat/ChatFamily';
import HomeScreen from 'src/screens/HomeScreen';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getTranslate} from 'src/redux/slices/languageSlice';

const Tab = createBottomTabNavigator();
const FamilyList = [
  {
    id: 'Family',
    title: 'Family',
    component: ViewFamilyScreen,
    screen: 'Family',
    icon: 'home',
    visible: true,
  },
  {
    id: 'ChatFamily',
    title: 'Chat',
    component: ChatFamilyScreen,
    screen: 'ChatFamily',
    icon: 'chat',
    visible: true,
  },
  {
    id: 'Expense',
    title: 'Finance',
    component: ExpenditureScreen,
    screen: 'Expense',
    icon: 'plus',
    visible: true,
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
    id: 'CategoryExpense',
    component: CategoryExpenseScreen,
    screen: 'CategoryExpense',
    visible: false,
  },

  {
    id: 'FamilyFinace',
    component: FamilyScreen,
    screen: 'FamilyFinace',
    visible: false,
  },
];

const TabBarButton = (props: BottomTabBarButtonProps, tab: any) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (tab.id === 'ChatFamily') {
      navigation.navigate('ChatStack', {screen: 'ChatFamilyScreen'});
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

const FamilyTab = () => {
  const translations = useSelector(getTranslate);

  return (
    <Tab.Navigator
      screenOptions={{
        header: () => null,
        tabBarStyle: styles.tabBar,
      }}>
      {FamilyList.map((tab, index) => {
        return (
          <Tab.Screen
            key={tab.id}
            name={tab.screen}
            component={tab.component}
            options={{
              tabBarShowLabel: true,
              tabBarButton: props =>
                tab.visible ? TabBarButton(props, tab) : null,
              tabBarLabel: translations[tab.title],
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

export default FamilyTab;
