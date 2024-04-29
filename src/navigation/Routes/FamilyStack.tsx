import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateFamilyScreen from 'src/screens/CreateFamilyScreen';
import InviteNewMemberScreen from 'src/screens/InviteNewMemberScreen';
import ViewAllFamilyScreen from 'src/screens/ViewAllFamily';
import ViewFamilyScreen from 'src/screens/FamilyScreen';
import ViewAllMemberScreen from 'src/screens/AllMember';
import AddMemberScreen from 'src/screens/AddEditFamilyMemberScreen';
import { AddEditFamilyMemberScreenProps, AllMemberScreenProps, ContactScreenProps, CreateFamilyScreenProps, EducationDetailScreenProps, EducationScreenProps, GuildLineDetailScreenProps, GuildLineScreenProps, HouseHoldCategoryDetailScreenProps, HouseHoldCategoryScreenProps, HouseHoldScreenProps, SubjectDetailScreenProps, ViewAllFamilyScreenProps, ViewFamilyScreenProps } from '../NavigationTypes';
import ContactListScreen from 'src/screens/ContactList/ContactList';
import GuildLineScreen from 'src/screens/GuildLineScreen/GuildLineScreen';
import GuildLineDetailScreen from 'src/screens/GuildLineScreen/GuildLineDetailScreen';
import EducationScreen from 'src/screens/EducationScreen/EducationScreen';
import EducationDetailScreen from 'src/screens/EducationScreen/EducationDetailScreen';
import SubjectDetailScreen from 'src/screens/EducationScreen/SubjectDetailScreen';
import HouseHoldScreen from 'src/screens/HouseHoldScreen/HouseHoldScreen';
import HouseHoldCategoryScreen from 'src/screens/HouseHoldScreen/HouseHoldCategoryScreen/HouseHoldCategoryScreen';
import HouseHoldCategoryDetailScreen from 'src/screens/HouseHoldScreen/HouseHoldCategoryDetailScreen/HouseHoldCategoryDetailScreen';
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
      <Stack.Screen name="Education">
        {(props) => <EducationScreen {...props as EducationScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="EducationDetail">
        {(props) => <EducationDetailScreen {...props as EducationDetailScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="SubjectDetail">
        {(props) => <SubjectDetailScreen {...props as SubjectDetailScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="HouseHold">
        {(props) => <HouseHoldScreen {...props as HouseHoldScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="HouseHoldCategory">
        {(props) => <HouseHoldCategoryScreen {...props as HouseHoldCategoryScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="HouseHoldCategoryDetail">
        {(props) => <HouseHoldCategoryDetailScreen {...props as HouseHoldCategoryDetailScreenProps} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default FamilyStack;
