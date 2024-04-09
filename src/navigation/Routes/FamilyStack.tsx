import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateFamilyScreen from 'src/screens/CreateFamilyScreen';
import InviteNewMemberScreen from 'src/screens/InviteNewMemberScreen';
import ViewAllFamilyScreen from 'src/screens/ViewAllFamily';
import ViewFamilyScreen from 'src/screens/FamilyScreen';
import ViewAllMemberScreen from 'src/screens/AllMember';
import AddMemberScreen from 'src/screens/AddEditFamilyMemberScreen';
import { AddEditFamilyMemberScreenProps, AllMemberScreenProps, ContactScreenProps, CreateFamilyScreenProps, GuildLineDetailScreenProps, GuildLineScreenProps, ViewAllFamilyScreenProps, ViewFamilyScreenProps } from '../NavigationTypes';
import ContactListScreen from 'src/screens/ContactList/ContactList';
import GuildLineScreen from 'src/screens/GuildLineScreen/GuildLineScreen';
import GuildLineDetailScreen from 'src/screens/GuildLineScreen/GuildLineDetailScreen';
const Stack = createNativeStackNavigator();

const FamilyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>

      <Stack.Screen name="AddEditFamilyMember">{(props) => <AddMemberScreen {...props as AddEditFamilyMemberScreenProps} />}</Stack.Screen>

      <Stack.Screen name="CreateFamily">{(props) => <CreateFamilyScreen {...props as CreateFamilyScreenProps} />}</Stack.Screen>

      <Stack.Screen name="InviteNewMember" component={InviteNewMemberScreen} />

      <Stack.Screen name="ViewAllFamily">
        {(props) => <ViewAllFamilyScreen {...props as ViewAllFamilyScreenProps} />}
      </Stack.Screen>

      <Stack.Screen name="ViewFamily">
        {(props) => <ViewFamilyScreen {...props as ViewFamilyScreenProps} />}
      </Stack.Screen>

      <Stack.Screen name="AllMember">
        {(props) => <ViewAllMemberScreen {...props as AllMemberScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="Contact" >
        {(props) => <ContactListScreen {...props as ContactScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="GuildLine">
        {(props) => <GuildLineScreen {...props as GuildLineScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="GuildLineDetail">
        {(props) => <GuildLineDetailScreen {...props as GuildLineDetailScreenProps} />}
      </Stack.Screen>


    </Stack.Navigator>
  );
};

export default FamilyStack;
