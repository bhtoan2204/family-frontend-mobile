import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

export type RootParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  FamilyStack: NavigatorScreenParams<FamilyStackParamList>;
  PackStack: NavigatorScreenParams<PackStackParamList>;
  HomeTab: NavigatorScreenParams<HomeTabParamList>;
  CalendarStack: NavigatorScreenParams<CalendarStackParamList>;
  ChatStack: NavigatorScreenParams<ChatStackParamList>;
  ExpenseStack: NavigatorScreenParams<ExpenseStackParamList>;
  IncomeStack: NavigatorScreenParams<IncomeStackParamList>;
};

export type ExpenseStackParamList = {
  Expenditure: undefined;
  CategoryExpense: undefined;
  FamilySpec: {
    id_family: number | undefined;
  };
  ChartExpense: undefined;
};

export type IncomeStackParamList = {
  ChartIncomeScreen: undefined;
};

type ChartIncomeScreenNavigationProp = NativeStackNavigationProp<
  IncomeStackParamList,
  'ChartIncomeScreen'
>;

export interface ChartIncomeScreenProps {
  navigation: ChartIncomeScreenNavigationProp;
  route: RouteProp<IncomeStackParamList, 'ChartIncomeScreen'>;
}

type ChartExpenseNavigationProp = NativeStackNavigationProp<
  ExpenseStackParamList,
  'ChartExpense'
>;

export interface ChartExpenseProps {
  navigation: ChartExpenseNavigationProp;
  route: RouteProp<ExpenseStackParamList, 'ChartExpense'>;
}

type CategoryExpenseScreenNavigationProp = NativeStackNavigationProp<
  ExpenseStackParamList,
  'CategoryExpense'
>;

export interface CategoryExpenseScreenProps {
  navigation: CategoryExpenseScreenNavigationProp;
  route: RouteProp<ExpenseStackParamList, 'CategoryExpense'>;
}

type FamilySpecNavigationProp = NativeStackNavigationProp<
  ExpenseStackParamList,
  'FamilySpec'
>;

export interface FamilySpecProps {
  navigation: FamilySpecNavigationProp;
  route: RouteProp<ExpenseStackParamList, 'FamilySpec'>;
}

export type ChatStackParamList = {
  ChatFamily: {
    id_family: number | undefined;
  };
  ChatUser: {
    receiverId: string | undefined;
  };
  ChatList: undefined;

  CallVideo: {
    receiverId: string | undefined;
  };
};

type ChatFamilyScreenNavigationProp = NativeStackNavigationProp<
  ChatStackParamList,
  'ChatFamily'
>;

export interface ChatFamilyScreenProps {
  navigation: ChatFamilyScreenNavigationProp;
  route: RouteProp<ChatStackParamList, 'ChatFamily'>;
}

type ChatScreenNavigationProp = NativeStackNavigationProp<
  ChatStackParamList,
  'ChatUser'
>;

export interface ChatScreenProps {
  navigation: ChatScreenNavigationProp;
  route: RouteProp<ChatStackParamList, 'ChatUser'>;
}

type ChatListNavigationProp = NativeStackNavigationProp<
  ChatStackParamList,
  'ChatList'
>;

export interface ChatListProps {
  navigation: ChatListNavigationProp & ChatScreenNavigationProp;
  route: RouteProp<ChatStackParamList, 'ChatList'>;
}

type CallVideoNavigationProp = NativeStackNavigationProp<
  ChatStackParamList,
  'CallVideo'
>;

export interface CallVideoProps {
  navigation: CallVideoNavigationProp;
  route: RouteProp<ChatStackParamList, 'CallVideo'>;
}
export type AuthStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  ForgotPasswordScreen: undefined;
  LandingPage: undefined;
  Notification: undefined;
  WelcomeScreen: undefined;
};

export type CalendarStackParamList = {
  CalendarScreen: {
    id_family: number | undefined;
  };
  ScheduleScreen: {
    id_family: number | undefined;
  };
  CreateEvent: {
    id_family: number | undefined;
  };
  CreateCategoryEvent: {
    id_family: number | undefined;
  };
  EventListScreen: {
    id_family: number | undefined;
  };
};

export type FamilyStackParamList = {
  ViewAllFamily: undefined;
  CreateFamily: {
    id_order: number | undefined;
  };

  InviteMembers: undefined;

  ViewFamily: {
    id_family: number | undefined;
  };

  AllMember: {
    id_family: number | undefined;
  };
  Contact: {
    id_family: number | undefined;
  };

  //Guideline routes
  GuildLine: {
    id_family: number | undefined;
  };
  AddGuildLine: {
    id_family: number | undefined;
  };
  UpdateGuildLine: {
    id_family: number | undefined;
    id_item: number;
    title: string | null;
    description: string | null;
  };
  GuildLineDetail: {
    id_family: number | undefined;
    id_guide_item: number;
  };
  SharedGuildLine: {
    id_family: number | undefined;
    id_item: number;
  };

  //Education routes
  Education: {
    id_family: number | undefined;
  };
  AddEducation: {
    id_family: number | undefined;
  };
  EditEducation: {
    id_family: number | undefined;
    id_education_progress: number;
    title: string | null;
    progress_notes: string | null;
    school_info: string | null;
  };
  AddSubject: {
    id_family: number | undefined;
    id_education_progress: number;
  };
  EducationDetail: {
    id_family: number | undefined;
    id_education_progress: number;
  };
  SubjectDetail: {
    id_family: number | undefined;
    id_education_progress: number;
    id_subject: number;
  };

  //HouseHold routes
  HouseHold: {
    id_family: number | undefined;
  };
  HouseHoldCategory: {
    id_family: number | undefined;
    id_category: number;
  };
  HouseHoldItemDetail: {
    id_family: number | undefined;
    id_category: number;
    id_item: number;
  };
  AddHouseHoldItem: {
    id_family: number | undefined;
  };
  AddHouseHoldItemDetail: {
    id_family: number | undefined;
    id_category: number;
    id_item: number;
  };
  EditExpenseHouseHoldItem: {
    id_family: number | undefined;
    id_category: number;
    id_item: number;
  };
  EditBrandHouseHoldItem: {
    id_family: number | undefined;
    id_category: number;
    id_item: number;
  };
  EditDescriptionHouseHoldItem: {
    id_family: number | undefined;
    id_category: number;
    id_item: number;
    description: string;
  };
  AddConsumableHouseHoldItem: {
    id_family: number | undefined;
    id_category: number;
    id_item: number;
  };
  EditConsumableHouseHoldItem: {
    id_family: number | undefined;
    id_category: number;
    id_item: number;
    quantity: number;
    threshhold: number;
    expired_date: string;
  };
  AddHouseHoldRoom: {
    id_family: number | undefined;
  };

  //CheckList routes
  CheckList: {
    id_family: number | undefined;
  };
  CheckListDetail: {
    id_family: number | undefined;
    id_checklist: number;
  };
  AddShoppingList: {
    id_family: number | undefined;
  };
  AddCheckList: {
    id_family: number | undefined;
  };

  //
  News: {
    id_family: number | undefined;
  };
};

export type PackStackParamList = {
  ViewAllPurchased: undefined;
  ViewAllPackage: {
    id_family: number | undefined;
  };
  BankInfoScreen: {
    id_family: number | undefined;
    id_package: number | undefined;
    bankCode: string | undefined;
    amount: number | undefined;
    language: 'vn' | undefined;
    method: string | undefined;
  };
  OrderDetailScreen: {
    id_family: number | undefined;
    id_package: number | undefined;
    amount: number | undefined;
  };

  ZaloPayScreen: undefined;
};

/////
type CalendarStackNavigationProp = NativeStackNavigationProp<
  RootParamList,
  'CalendarStack'
>;
export interface CalendarStackProps {
  navigation: CalendarStackNavigationProp;
}
type CalendarScreenNavigationProp = NativeStackNavigationProp<
  CalendarStackParamList,
  'CalendarScreen'
>;

export interface CalendarScreenProps {
  navigation: CalendarScreenNavigationProp & CreateEventNavigationProps;
  route: RouteProp<CalendarStackParamList, 'CalendarScreen'>;
}

type EventListScreenNavigationProp = NativeStackNavigationProp<
  CalendarStackParamList,
  'EventListScreen'
>;

export interface EventListScreenProps {
  navigation: EventListScreenNavigationProp;
  route: RouteProp<CalendarStackParamList, 'EventListScreen'>;
}
type ScheduleScreenNavigationProp = NativeStackNavigationProp<
  CalendarStackParamList,
  'ScheduleScreen'
>;

export interface ScheduleScreenProps {
  navigation: ScheduleScreenNavigationProp;
  route: RouteProp<CalendarStackParamList, 'ScheduleScreen'>;
}
type FamilyStackNavigationProp = NativeStackNavigationProp<
  RootParamList,
  'FamilyStack'
>;
export interface FamilyStackProps {
  navigation: FamilyStackNavigationProp;
}

type PackStackNavigationProp = NativeStackNavigationProp<
  RootParamList,
  'PackStack'
>;
export interface PackStackProps {
  navigation: PackStackNavigationProp;
}

type ChatStackNavigationProp = NativeStackNavigationProp<
  RootParamList,
  'ChatStack'
>;
export interface ChattackProps {
  navigation: ChatStackNavigationProp;
}
//
type ZaloPayScreenNavigationProp = NativeStackNavigationProp<
  PackStackParamList,
  'ZaloPayScreen'
>;
export type ZaloPayScreenProps = {navigation: ZaloPayScreenNavigationProp};

type OrderDetailScreenNavigationProp = NativeStackNavigationProp<
  PackStackParamList,
  'OrderDetailScreen'
>;

export type OrderDetailScreenProps = {
  navigation: OrderDetailScreenNavigationProp;
  route: RouteProp<PackStackParamList, 'OrderDetailScreen'>;
};

type BankInfoScreenNavigationProp = NativeStackNavigationProp<
  PackStackParamList,
  'BankInfoScreen'
>;

export interface BankInfoScreenProps {
  navigation: BankInfoScreenNavigationProp;
  route: RouteProp<PackStackParamList, 'BankInfoScreen'>;
}

type SignupScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'SignupScreen'
>;

export interface SignupScreenProps {
  navigation: SignupScreenNavigationProp;
}

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'LoginScreen'
>;

export interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'WelcomeScreen'
>;

export interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}

type NotificationNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Notification'
>;

export interface NotificationScreenProps {
  navigation: NotificationNavigationProp;
}

type PurchasedNavigationProp = NativeStackNavigationProp<
  PackStackParamList,
  'ViewAllPurchased'
>;
export interface PurchasedScreenProps {
  navigation: ViewAllFamilyNavigationProp & FamilyStackNavigationProp;
  route: RouteProp<PackStackParamList, 'ViewAllPurchased'>;
}

type ViewAllFamilyNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'ViewAllFamily'
>;

export interface ViewAllFamilyScreenProps {
  navigation: ViewAllFamilyNavigationProp;
  route: RouteProp<FamilyStackParamList, 'ViewAllFamily'>;
}

type ViewFamilyNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'ViewFamily'
>;

export interface ViewFamilyScreenProps {
  navigation: ViewFamilyNavigationProp &
    CalendarScreenNavigationProp &
    ChatFamilyScreenNavigationProp;
  route: RouteProp<FamilyStackParamList, 'ViewFamily'>;
}

type GuildLineNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'GuildLine'
>;
type GuildLineDetailNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'GuildLineDetail'
>;
type SharedGuildLineNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'SharedGuildLine'
>;

type AddGuildLineNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'AddGuildLine'
>;

export interface AddGuildLineScreenProps {
  navigation: AddGuildLineNavigationProp;
  route: RouteProp<FamilyStackParamList, 'AddGuildLine'>;
}

type UpdateGuildLineNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'UpdateGuildLine'
>;

export interface UpdateGuildLineScreenProps {
  navigation: UpdateGuildLineNavigationProp;
  route: RouteProp<FamilyStackParamList, 'UpdateGuildLine'>;
}

type EducationNavigationprop = NativeStackNavigationProp<
  FamilyStackParamList,
  'Education'
>;

type AddEducationNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'AddEducation'
>;

export interface AddEducationScreenProps {
  navigation: AddEducationNavigationProp;
  route: RouteProp<FamilyStackParamList, 'AddEducation'>;
}

type EditEducationNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'EditEducation'
>;

export interface EditEducationScreenProps {
  navigation: EditEducationNavigationProp;
  route: RouteProp<FamilyStackParamList, 'EditEducation'>;
}

type AddSubjectNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'AddSubject'
>;

export interface AddSubjectScreenProps {
  navigation: AddSubjectNavigationProp;
  route: RouteProp<FamilyStackParamList, 'AddSubject'>;
}

type SubjectDetailNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'SubjectDetail'
>;

type HouseHoldNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'HouseHold'
>;

type HouseHoldCategoryNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'HouseHoldCategory'
>;

type HouseHoldItemDetailNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'HouseHoldItemDetail'
>;

type AddHouseHoldItemDetailNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'AddHouseHoldItemDetail'
>;

type AddHouseHoldItemNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'AddHouseHoldItem'
>;

export interface AddHouseHoldItemScreenProps {
  navigation: AddHouseHoldItemNavigationProp;
  route: RouteProp<FamilyStackParamList, 'AddHouseHoldItem'>;
}

type EditExpenseHouseHoldItemNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'EditExpenseHouseHoldItem'
>;

export interface EditExpenseHouseHoldItemScreenProps {
  navigation: EditExpenseHouseHoldItemNavigationProp;
  route: RouteProp<FamilyStackParamList, 'EditExpenseHouseHoldItem'>;
}

type EditBrandHouseHoldItemNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'EditBrandHouseHoldItem'
>;

export interface EditBrandHouseHoldItemScreenProps {
  navigation: EditBrandHouseHoldItemNavigationProp;
  route: RouteProp<FamilyStackParamList, 'EditBrandHouseHoldItem'>;
}

type AddHouseHoldRoomNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'AddHouseHoldRoom'
>;

export interface AddHouseHoldRoomScreenProps {
  navigation: AddHouseHoldRoomNavigationProp;
  route: RouteProp<FamilyStackParamList, 'AddHouseHoldRoom'>;
}

type EditDescriptionHouseHoldItemNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'EditDescriptionHouseHoldItem'
>;

export interface EditDescriptionHouseHoldItemScreenProps {
  navigation: EditDescriptionHouseHoldItemNavigationProp;
  route: RouteProp<FamilyStackParamList, 'EditDescriptionHouseHoldItem'>;
}

type EditConsumableHouseHoldItemNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'EditConsumableHouseHoldItem'
>;

export interface EditConsumableHouseHoldItemScreenProps {
  navigation: EditConsumableHouseHoldItemNavigationProp;
  route: RouteProp<FamilyStackParamList, 'EditConsumableHouseHoldItem'>;
}

type AddConsumableHouseHoldItemNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'AddConsumableHouseHoldItem'
>;

export interface AddConsumableHouseHoldItemScreenProps {
  navigation: AddConsumableHouseHoldItemNavigationProp;
  route: RouteProp<FamilyStackParamList, 'AddConsumableHouseHoldItem'>;
}

type CheckListNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'CheckList'
>;

type NewsNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'News'
>;
type CheckListDetailNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'CheckListDetail'
>;

type AddShoppingListNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'AddShoppingList'
>;

export interface AddShoppingListScreenProps {
  navigation: AddShoppingListNavigationProp;
  route: RouteProp<FamilyStackParamList, 'AddShoppingList'>;
}

type AddCheckListNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'AddCheckList'
>;

export interface AddCheckListScreenProps {
  navigation: AddCheckListNavigationProp;
  route: RouteProp<FamilyStackParamList, 'AddCheckList'>;
}

export interface CheckListDetailScreenProps {
  navigation: CheckListDetailNavigationProp;
  route: RouteProp<FamilyStackParamList, 'CheckListDetail'>;
}

export interface CheckListScreenProps {
  navigation: CheckListNavigationProp;
  route: RouteProp<FamilyStackParamList, 'CheckList'>;
}

export interface NewsScreenProps {
  navigation: NewsNavigationProp;
  route: RouteProp<FamilyStackParamList, 'News'>;
}

export interface HouseHoldScreenProps {
  navigation: HouseHoldNavigationProp;
  route: RouteProp<FamilyStackParamList, 'HouseHold'>;
}

export interface HouseHoldItemScreenProps {
  navigation: HouseHoldCategoryNavigationProp;
  route: RouteProp<FamilyStackParamList, 'HouseHoldCategory'>;
}

export interface HouseHoldItemDetailScreenProps {
  navigation: HouseHoldItemDetailNavigationProp;
  route: RouteProp<FamilyStackParamList, 'HouseHoldItemDetail'>;
}

export interface AddHouseHoldItemDetailScreenProps {
  navigation: AddHouseHoldItemDetailNavigationProp;
  route: RouteProp<FamilyStackParamList, 'AddHouseHoldItemDetail'>;
}

export interface SubjectDetailScreenProps {
  navigation: SubjectDetailNavigationProp;
  route: RouteProp<FamilyStackParamList, 'SubjectDetail'>;
}

export interface EducationScreenProps {
  navigation: EducationNavigationprop;
  route: RouteProp<FamilyStackParamList, 'Education'>;
}

type EducationDetailNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'EducationDetail'
>;

export interface EducationDetailScreenProps {
  navigation: EducationDetailNavigationProp;
  route: RouteProp<FamilyStackParamList, 'EducationDetail'>;
}

export interface GuildLineScreenProps {
  navigation: GuildLineNavigationProp;
  route: RouteProp<FamilyStackParamList, 'GuildLine'>;
}

export interface GuildLineDetailScreenProps {
  navigation: GuildLineDetailNavigationProp;
  route: RouteProp<FamilyStackParamList, 'GuildLineDetail'>;
}

export interface SharedGuildLineScreenProps {
  navigation: SharedGuildLineNavigationProp;
  route: RouteProp<FamilyStackParamList, 'SharedGuildLine'>;
}

export type UpdateFamilyNavigationProps = NativeStackNavigationProp<
  ModelScreenParamsList,
  'UpdateFamily'
>;

export interface UpdateFamilyScreenProps {
  navigation: UpdateFamilyNavigationProps;
  route: RouteProp<ModelScreenParamsList, 'UpdateFamily'>;
}

export type UpdateEventNavigationProps = NativeStackNavigationProp<
  ModelScreenParamsList,
  'UpdateEvent'
>;

export interface UpdateEventScreenProps {
  navigation: UpdateEventNavigationProps;
  route: RouteProp<ModelScreenParamsList, 'UpdateEvent'>;
}

export type CreateEventNavigationProps = NativeStackNavigationProp<
  CalendarStackParamList,
  'CreateEvent'
>;

export interface CreateEventScreenProps {
  navigation: CreateEventNavigationProps;
  route: RouteProp<CalendarStackParamList, 'CreateEvent'>;
}

export type CreateCategoryEventNavigationProps = NativeStackNavigationProp<
  CalendarStackParamList,
  'CreateCategoryEvent'
>;

export interface CreateCategoryEventScreenProps {
  navigation: CreateCategoryEventNavigationProps;
  route: RouteProp<CalendarStackParamList, 'CreateCategoryEvent'>;
}

export type AllMemberNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'AllMember'
>;

export interface AllMemberScreenProps {
  navigation: AllMemberNavigationProp &
    HomeScreenNavigationProp &
    AddEditFamilyMemberNavigationProp;
  route: RouteProp<FamilyStackParamList, 'AllMember'>;
}

export type ContactNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'Contact'
>;

export interface ContactScreenProps {
  navigation: ContactNavigationProp & AddEditFamilyMemberNavigationProp;
  route: RouteProp<FamilyStackParamList, 'Contact'>;
}

type CreateFamilyNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'CreateFamily'
>;

export interface CreateFamilyScreenProps {
  navigation: CreateFamilyNavigationProp & HomeScreenNavigationProp;
  route: RouteProp<FamilyStackParamList, 'CreateFamily'>;
}

export type AddEditFamilyMemberNavigationProp = NativeStackNavigationProp<
  ModelScreenParamsList,
  'AddEditFamilyMember'
>;
export interface AddEditFamilyMemberScreenProps {
  navigation: AddEditFamilyMemberNavigationProp & ContactNavigationProp;
  route: RouteProp<ModelScreenParamsList, 'AddEditFamilyMember'>;
}

type InviteMembersNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'InviteMembers'
>;

export interface InviteMembersScreenProps {
  navigation: InviteMembersNavigationProp;
}
type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'ForgotPasswordScreen'
>;

export interface ForgotPasswordScreenProps {
  navigation: ForgotPasswordScreenNavigationProp;
}
type LandingPageNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'LandingPage'
>;
export interface LandingPageScreenProps {
  navigation: LandingPageNavigationProp;
}
type ViewAllPackageNavigationProp = NativeStackNavigationProp<
  PackStackParamList,
  'ViewAllPackage'
>;
export interface ViewAllPackageScreenProps {
  navigation: ViewAllPackageNavigationProp;
  route: RouteProp<PackStackParamList, 'ViewAllPackage'>;
}
export type HomeTabParamList = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
  ReportScreen: undefined;
  AddScreen: undefined;
  MoreScreen: undefined;
  Expenditure: undefined;
  CategoryExpense: undefined;
};

type CategoryExpenseNavigationProp = NativeStackNavigationProp<
  HomeTabParamList,
  'CategoryExpense'
>;

export interface CategoryExpenseProps {
  navigation: CategoryExpenseNavigationProp;
  route: RouteProp<HomeTabParamList, 'CategoryExpense'>;
}

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeTabParamList,
  'HomeScreen'
>;

export interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  route: RouteProp<HomeTabParamList, 'HomeScreen'>;
}

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  HomeTabParamList,
  'ProfileScreen'
>;

export interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
}

type ReportScreenNavigationProp = NativeStackNavigationProp<
  HomeTabParamList,
  'ReportScreen'
>;

export interface ReportScreenProps {
  navigation: ReportScreenNavigationProp;
}

type AddScreenNavigationProp = NativeStackNavigationProp<
  HomeTabParamList,
  'AddScreen'
>;

export interface AddScreenProps {
  navigation: AddScreenNavigationProp;
}

type MoreScreenNavigationProp = NativeStackNavigationProp<
  HomeTabParamList,
  'MoreScreen'
>;

export interface MoreScreenProps {
  navigation: MoreScreenNavigationProp;
}

type ExpenditureScreenNavigationProp = NativeStackNavigationProp<
  HomeTabParamList,
  'Expenditure'
>;

export interface ExpenditureScreenProps {
  navigation: ExpenditureScreenNavigationProp;
}

// Define the types for the navigation tab nested in the HomeTab

type HomeTabNavigationProp = NativeStackNavigationProp<
  RootParamList,
  'HomeTab'
>;

export interface HomeTabProps {
  navigation: HomeTabNavigationProp;
}

export type ModelScreenParamsList = {
  ProfileDetail: undefined;
  ChangePassword: undefined;
  MainProfile: undefined;
  UpdateFamily: {
    id_family: number;
    name: string;
    description: string;
  };
  UpdateEvent: {
    id_calendar?: number;
    title?: string;
    description?: string;
    datetime?: Date;
  };
  AddEditFamilyMember: {
    id_family: number | undefined;
    phone: string | undefined;
  };
  CreateEvent: {
    id_family: number;
  };
};

type ProfileDetailNavigationProp = NativeStackNavigationProp<
  ModelScreenParamsList,
  'ProfileDetail'
>;

export interface ProfileDetailScreenProps {
  navigation: ProfileDetailNavigationProp;
}

type ChangePasswordNavigationProp = NativeStackNavigationProp<
  ModelScreenParamsList,
  'ChangePassword'
>;

export interface ChangePasswordScreenProps {
  navigation: ChangePasswordNavigationProp;
}

type MainProfileNavigationProp = NativeStackNavigationProp<
  ModelScreenParamsList,
  'MainProfile'
>;

export interface MainProfileScreenProps {
  navigation: MainProfileNavigationProp;
}
