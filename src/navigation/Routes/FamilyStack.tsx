import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateFamilyScreen from 'src/screens/CreateFamilyScreen';
import InviteNewMemberScreen from 'src/screens/InviteNewMemberScreen';
import ViewAllFamilyScreen from 'src/screens/ViewAllFamily';
import ViewFamilyScreen from 'src/screens/FamilyScreen';
import ViewAllMemberScreen from 'src/screens/AllMember';
import AddMemberScreen from 'src/screens/AddEditFamilyMemberScreen';
import { AddConsumableHouseHoldItemScreenProps, AddEditFamilyMemberScreenProps, AddEducationScreenProps, AddGuildLineScreenProps, AddHouseHoldItemDetailScreenProps, AddHouseHoldItemScreenProps, AddHouseHoldRoomScreenProps, AddShoppingListScreenProps, AddSubjectScreenProps, AllMemberScreenProps, CheckListDetailScreenProps, CheckListScreenProps, ContactScreenProps, CreateFamilyScreenProps, EditConsumableHouseHoldItemScreenProps, EditDescriptionHouseHoldItemScreenProps, EditEducationScreenProps, EditExpenseHouseHoldItemScreenProps, EducationDetailScreenProps, EducationScreenProps, GuildLineDetailScreenProps, GuildLineScreenProps, HouseHoldItemDetailScreenProps, HouseHoldItemScreenProps, HouseHoldScreenProps, NewsScreenProps, SharedGuildLineScreenProps, SubjectDetailScreenProps, UpdateGuildLineScreenProps, ViewAllFamilyScreenProps, ViewFamilyScreenProps } from '../NavigationTypes';
import ContactListScreen from 'src/screens/ContactList/ContactList';
import GuildLineScreen from 'src/screens/GuildLineScreen/GuildLineScreen';
import GuildLineDetailScreen from 'src/screens/GuildLineScreen/GuildLineDetailScreen';
import EducationScreen from 'src/screens/EducationScreen/EducationScreen';
import EducationDetailScreen from 'src/screens/EducationScreen/EducationDetailScreen';
import SubjectDetailScreen from 'src/screens/EducationScreen/SubjectDetailScreen';
import HouseHoldScreen from 'src/screens/HouseHoldScreen/HouseHoldScreen';
import ChecklistScreen from 'src/screens/CheckListScreen/CheckListScreen/CheckListScreen';
import NewsScreen from 'src/screens/NewsScreen/NewsScreen';
import SharedGuildLineDetailScreen from 'src/screens/GuildLineScreen/SharedGuildLineScreen';
import ChecklistDetailScreen from 'src/screens/CheckListScreen/CheckListDetailScreen';
import HouseHoldItemScreen from 'src/screens/HouseHoldScreen/HouseHoldItemDetailScreen';
import HouseHoldItemDetailScreen from 'src/screens/HouseHoldScreen/HouseHoldItemDetailScreen';
import AddHouseHoldItemDetailScreen from 'src/screens/HouseHoldScreen/AddHouseHoldItemDetailScreen';
import EditExpenseScreen from 'src/screens/HouseHoldScreen/EditExpenseScreen';
import AddHouseHoldItemScreen from 'src/screens/HouseHoldScreen/AddHouseHoldItemScreen';
import AddRoomScreen from 'src/screens/HouseHoldScreen/AddRoomScreen';
import AddEducationScreen from 'src/screens/EducationScreen/AddEducationScreen';
import AddSubjectScreen from 'src/screens/EducationScreen/AddSubjectScreen';
import AddGuildLineScreen from 'src/screens/GuildLineScreen/AddGuildlineScreen';
import UpdateGuildLineScreen from 'src/screens/GuildLineScreen/UpdateGuildlineScreen';
import AddShoppingListcreen from 'src/screens/CheckListScreen/AddShoppingListScreen';
import EditEducationScreen from 'src/screens/EducationScreen/EditEducationScreen';
import EditHouseHoldDescriptionScreen from 'src/screens/HouseHoldScreen/EditHouseHoldDescriptionScreen';
import EditConsumableHouseHoldItemScreen from 'src/screens/HouseHoldScreen/EditConsumableHouseHoldItem';
import AddConsumableHouseHoldItemScreen from 'src/screens/HouseHoldScreen/AddConsumableHouseHoldItem';
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
      <Stack.Screen name="SharedGuildLine">
        {(props) => <SharedGuildLineDetailScreen {...props as SharedGuildLineScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="AddGuildLine" options={{
        animation: 'slide_from_bottom',
        presentation: 'fullScreenModal',

      }}>
        {(props) => <AddGuildLineScreen {...props as AddGuildLineScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="UpdateGuildLine" options={{
        animation: 'slide_from_bottom',
        presentation: 'fullScreenModal',
      }}>
        {(props) => <UpdateGuildLineScreen {...props as UpdateGuildLineScreenProps} />}
      </Stack.Screen>

      <Stack.Screen name="Education">
        {(props) => <EducationScreen {...props as EducationScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="EducationDetail">
        {(props) => <EducationDetailScreen {...props as EducationDetailScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="AddEducation" options={{
        animation: 'slide_from_bottom',
        presentation: 'fullScreenModal',
      }}>
        {(props) => <AddEducationScreen {...props as AddEducationScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="EditEducation" options={{
        animation: 'slide_from_bottom',
        presentation: 'fullScreenModal',
      }}>
        {(props) => <EditEducationScreen {...props as EditEducationScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="AddSubject" options={{
        animation: 'slide_from_bottom',
      }}>
        {(props) => <AddSubjectScreen {...props as AddSubjectScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="SubjectDetail">
        {(props) => <SubjectDetailScreen {...props as SubjectDetailScreenProps} />}
      </Stack.Screen>



      <Stack.Screen name="HouseHold">
        {(props) => <HouseHoldScreen {...props as HouseHoldScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="HouseHoldItemDetail">
        {(props) => <HouseHoldItemDetailScreen {...props as HouseHoldItemDetailScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="AddHouseHoldItem" options={{
        animation: 'slide_from_bottom',
      }}>
        {(props) => <AddHouseHoldItemScreen {...props as AddHouseHoldItemScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="AddHouseHoldRoom" options={{
        animation: 'slide_from_bottom',
      }}>
        {(props) => <AddRoomScreen {...props as AddHouseHoldRoomScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="AddHouseHoldItemDetail" options={{
        animation: 'slide_from_bottom',
        presentation: 'fullScreenModal',
      }}>
        {(props) => <AddHouseHoldItemDetailScreen {...props as AddHouseHoldItemDetailScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="EditExpenseHouseHoldItem" >
        {(props) => <EditExpenseScreen {...props as EditExpenseHouseHoldItemScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="EditDescriptionHouseHoldItem" >
        {(props) => <EditHouseHoldDescriptionScreen {...props as EditDescriptionHouseHoldItemScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="EditConsumableHouseHoldItem" >
        {(props) => <EditConsumableHouseHoldItemScreen {...props as EditConsumableHouseHoldItemScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="AddConsumableHouseHoldItem" >
        {(props) => <AddConsumableHouseHoldItemScreen {...props as AddConsumableHouseHoldItemScreenProps} />}
      </Stack.Screen>

      {/* <Stack.Screen name="HouseHoldCategory">
        {(props) => <HouseHoldCategoryScreen {...props as HouseHoldCategoryScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="HouseHoldCategoryDetail">
        {(props) => <HouseHoldCategoryDetailScreen {...props as HouseHoldCategoryDetailScreenProps} />}
      </Stack.Screen> */}
      <Stack.Screen name="CheckList">
        {(props) => <ChecklistScreen {...props as CheckListScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="CheckListDetail">
        {(props) => <ChecklistDetailScreen {...props as CheckListDetailScreenProps} />}
      </Stack.Screen>
      <Stack.Screen name="AddShoppingList" options={{
        animation: 'slide_from_bottom',
        presentation: 'fullScreenModal',
      }}>
        {(props) => <AddShoppingListcreen {...props as AddShoppingListScreenProps} />}
      </Stack.Screen>


      <Stack.Screen name="News">
        {(props) => <NewsScreen {...props as NewsScreenProps} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default FamilyStack;
