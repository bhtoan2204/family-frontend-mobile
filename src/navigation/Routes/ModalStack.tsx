import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UpdateFamilyScreen from 'src/screens/ModalScreen/UpdateFamily';

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
        <Stack.Screen name="UpdateFamily" component={UpdateFamilyScreen} />

      </Stack.Navigator>
  );
};

export default ModalStack;
