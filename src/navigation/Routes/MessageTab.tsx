import {BottomTabBarButtonProps,createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import TabButton from 'src/components/TabButton';
import ChatListScreen from 'src/screens/Chat/ChatList/ChatListScreen';
import PeopleScreen from 'src/screens/Chat/ChatList/People';

const Tab = createBottomTabNavigator();
  const MessageList = [
    {
      id: 'ChatList',
      title: 'Chat',
      component: ChatListScreen,
      screen: 'ChatList',
      icon: 'chat',
      visible: true,
    },

    {
      id: 'People',
      title: 'People',
      component: PeopleScreen,
      screen: 'People',
      icon: 'account',
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
  
  const MessageTab = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          header: () => null,
          tabBarStyle: styles.tabBar,
        }}>
        {MessageList.map((tab, index) => {
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
  
  export default MessageTab;
  