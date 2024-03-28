import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddEditFamilyMemberScreen from 'src/screens/AddEditFamilyMemberScreen';
import CreateFamilyScreen from 'src/screens/CreateFamilyScreen';
import InviteNewMemberScreen from 'src/screens/InviteNewMemberScreen';
import ViewAllFamilyScreen from 'src/screens/ViewAllFamily';
import ViewFamilyScreen from 'src/screens/FamilyScreen';
import ViewAllMemberScreen from 'src/screens/ModalScreen/AllMember';

const Stack = createNativeStackNavigator();

const FamilyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="AddEditFamilyMember"
        component={AddEditFamilyMemberScreen}
      />
      <Stack.Screen name="CreateFamily" component={CreateFamilyScreen} />
      <Stack.Screen name="InviteNewMember" component={InviteNewMemberScreen} />
      <Stack.Screen name="ViewAllFamily" component={ViewAllFamilyScreen} />
      <Stack.Screen name="ViewAllMember" component={ViewAllMemberScreen} />
      <Stack.Screen name="ViewFamily" component={ViewFamilyScreen} />
      <Stack.Screen name="AllMember" component={ViewAllMemberScreen} />

    </Stack.Navigator>
  );
};

export default FamilyStack;
