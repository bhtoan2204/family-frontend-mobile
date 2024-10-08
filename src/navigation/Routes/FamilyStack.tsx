import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateFamilyScreen from 'src/screens/CreateFamilyScreen';
import InviteNewMemberScreen from 'src/screens/InviteNewMemberScreen';
import ViewAllFamilyScreen from 'src/screens/ViewAllFamily';
import ViewFamilyScreen from 'src/screens/FamilyScreen';
import ViewAllMemberScreen from 'src/screens/AllMember';
import AddMemberScreen from 'src/screens/AddEditFamilyMemberScreen';
import {
  AddEditFamilyMemberScreenProps,
  AllMemberScreenProps,
  CheckListDetailScreenProps,
  CheckListScreenProps,
  ContactScreenProps,
  CreateFamilyScreenProps,
  EducationDetailScreenProps,
  EducationScreenProps,
  GuidelinePublicScreenProps,
  GuildLineDetailScreenProps,
  GuildLineScreenProps,
  HouseHoldCategoryDetailScreenProps,
  HouseHoldScreenProps,
  MemberDetailsScreenProps,
  NewsScreenProps,
  ProgressScreenProps,
  SharedGuildLineScreenProps,
  SubjectDetailScreenProps,
  ThemeSwitcherProps,
  UpcomingEventsScreenProps,
  ViewAllFamilyScreenProps,
  ViewFamilyScreenProps,
} from '../NavigationTypes';
import ContactListScreen from 'src/screens/ContactList/ContactList';
import GuildLineScreen from 'src/screens/GuildLineScreen/GuildLineScreen';
import GuildLineDetailScreen from 'src/screens/GuildLineScreen/GuildLineDetailScreen';
import EducationScreen from 'src/screens/Education/EducationScreen/EducationScreen';
import ProgressScreen from 'src/screens/Education/ProgressScreen/ProgressScreen';
// import SubjectDetailScreen from 'src/screens/EducationScreen/SubjectDetailScreen';
import HouseHoldScreen from 'src/screens/HouseHoldScreen/HouseHoldScreen';
import ChecklistScreen from 'src/screens/CheckListScreen/CheckListScreen/CheckListScreen';
import NewsScreen from 'src/screens/NewsScreen/NewsScreen';
import SharedGuildLineDetailScreen from 'src/screens/GuildLineScreen/SharedGuildLineScreen';
import ChecklistDetailScreen from 'src/screens/CheckListScreen/CheckListDetailScreen';
import UpcomingEvents from 'src/screens/FamilyScreen/UpcomingEvents';
import MemberDetailsScreen from 'src/screens/AllMember/MemberDetails';
import GuidelinePublicScreen from 'src/screens/GuidelinePublic/GuidelinePublic';
import ThemeSwitcher from 'src/screens/ThemeScreen/ThemeSwitcher';
import LanguageSelector from 'src/screens/Language/LanguageSelector';
const Stack = createNativeStackNavigator();

const FamilyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AddEditFamilyMember">
        {props => (
          <AddMemberScreen {...(props as AddEditFamilyMemberScreenProps)} />
        )}
      </Stack.Screen>

      <Stack.Screen name="CreateFamily">
        {props => (
          <CreateFamilyScreen {...(props as CreateFamilyScreenProps)} />
        )}
      </Stack.Screen>

      <Stack.Screen name="AllMember">
        {props => <ViewAllMemberScreen {...(props as AllMemberScreenProps)} />}
      </Stack.Screen>

      <Stack.Screen name="InviteNewMember" component={InviteNewMemberScreen} />

      <Stack.Screen name="ViewAllFamily">
        {props => (
          <ViewAllFamilyScreen {...(props as ViewAllFamilyScreenProps)} />
        )}
      </Stack.Screen>
      <Stack.Screen name="LanguageSelector" component={LanguageSelector} />

      <Stack.Screen name="ViewFamily">
        {props => <ViewFamilyScreen {...(props as ViewFamilyScreenProps)} />}
      </Stack.Screen>

      <Stack.Screen name="ThemeSwitcher">
        {props => <ThemeSwitcher {...(props as ThemeSwitcherProps)} />}
      </Stack.Screen>

      <Stack.Screen name="Contact">
        {props => <ContactListScreen {...(props as ContactScreenProps)} />}
      </Stack.Screen>
      <Stack.Screen name="GuildLine">
        {props => <GuildLineScreen {...(props as GuildLineScreenProps)} />}
      </Stack.Screen>
      <Stack.Screen name="GuildLineDetail">
        {props => (
          <GuildLineDetailScreen {...(props as GuildLineDetailScreenProps)} />
        )}
      </Stack.Screen>
      <Stack.Screen name="SharedGuildLine">
        {props => (
          <SharedGuildLineDetailScreen
            {...(props as SharedGuildLineScreenProps)}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="EducationScreen">
        {props => <EducationScreen {...(props as EducationScreenProps)} />}
      </Stack.Screen>
      <Stack.Screen name="ProgressScreen">
        {props => (
          <ProgressScreen {...(props as ProgressScreenProps)} />
        )}
      </Stack.Screen>
      
      {/* <Stack.Screen name="HouseHold">
        {props => <HouseHoldScreen {...(props as HouseHoldScreenProps)} />}
      </Stack.Screen> */}
      <Stack.Screen name="CheckList">
        {props => <ChecklistScreen {...(props as CheckListScreenProps)} />}
      </Stack.Screen>
      <Stack.Screen name="CheckListDetail">
        {props => (
          <ChecklistDetailScreen {...(props as CheckListDetailScreenProps)} />
        )}
      </Stack.Screen>
      <Stack.Screen name="News">
        {props => <NewsScreen {...(props as NewsScreenProps)} />}
      </Stack.Screen>
      <Stack.Screen name="UpcomingEvents">
        {props => <UpcomingEvents {...(props as UpcomingEventsScreenProps)} />}
      </Stack.Screen>
      <Stack.Screen name="MemberDetails">
        {props => (
          <MemberDetailsScreen {...(props as MemberDetailsScreenProps)} />
        )}
      </Stack.Screen>
      <Stack.Screen name="GuidelinePublic">
        {props => (
          <GuidelinePublicScreen {...(props as GuidelinePublicScreenProps)} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default FamilyStack;
