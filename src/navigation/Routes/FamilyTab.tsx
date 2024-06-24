import {BottomTabBarButtonProps,createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import TabButton from 'src/components/TabButton';
import { TEXTS } from 'src/constants';
import ChatListScreen from 'src/screens/Chat/ChatList/ChatListScreen';
import PeopleScreen from 'src/screens/Chat/ChatList/People';
import ExpenditureScreen from 'src/screens/ExpenseScreen';
import ViewFamilyScreen from 'src/screens/FamilyScreen';
import ReportScreen from 'src/screens/Report';

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
        id: 'Expense',
        title: 'Expense',
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
  
  const FamilyTab = () => {
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
  
  export default FamilyTab;
  