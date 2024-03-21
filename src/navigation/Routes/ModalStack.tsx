import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ModalStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        presentation: 'transparentModal',
        animation: 'slide_from_bottom',
      }}>
        <Stack.Screen name="ModalScreen" component={ModalScreen} />
      </Stack.Navigator>
  );
};

export default ModalStack;
