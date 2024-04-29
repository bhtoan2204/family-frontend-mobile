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
};

export type ChatStackParamList = {
  ChatFamily: {
    id_user: string | undefined;
    id_family: number | undefined;
  };
  ChatUser: {
    id_user: string | undefined;
    receiverId: string | undefined;
  };
  ChatList: {
    id_user: string | undefined;
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

export type AuthStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  ForgotPasswordScreen: undefined;
  LandingPage: undefined;
  Notification: undefined;
};

export type CalendarStackParamList = {
  CalendarScreen: {
    id_family: number;
  };
  CreateEvent: {
    id_family: number;
  };
};

export type FamilyStackParamList = {
  ViewAllFamily: {
    id_user: string | undefined;
  };
  CreateFamily: {
    id_user: string | undefined;
    id_order: number | undefined;
  };

  InviteMembers: undefined;

  ViewFamily: {
    id_user: string | undefined;
    id_family: number | undefined;
  };

  AllMember: {
    id_user: string | undefined;
    id_family: number | undefined;
  };
  Contact: {
    id_family: number | undefined;
  };
  GuildLine: {
    id_family: number | undefined;
  };
  GuildLineDetail: {
    id_family: number | undefined;
    id_item: number;
  };
  Education: {
    id_family: number | undefined;
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
  HouseHold: {
    id_family: number | undefined;
  };
  HouseHoldCategory: {
    id_family: number | undefined;
    id_category: number;
  };
  HouseHoldCategoryDetail: {
    id_family: number | undefined;
    id_category: number;
    id_item: number;
  };
};

export type PackStackParamList = {
  ViewAllPurchased: {
    id_user: string | undefined;
  };
  ViewAllPackage: {
    id_user: string | undefined;
    id_family: number | undefined;
  };
  BankInfoScreen: {
    id_user: string | undefined;
    id_family: number | undefined;
    id_package: number | undefined;
    bankCode: string | undefined;
    amount: number | undefined;
    language: 'vn' | undefined;
    method: string | undefined;
  };
  OrderDetailScreen: {
    id_user: string | undefined;
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
type EducationNavigationprop = NativeStackNavigationProp<
  FamilyStackParamList,
  'Education'
>;

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

type HouseHoldCategoryDetailNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'HouseHoldCategoryDetail'
>;

export interface HouseHoldScreenProps {
  navigation: HouseHoldNavigationProp;
  route: RouteProp<FamilyStackParamList, 'HouseHold'>;
}

export interface HouseHoldCategoryScreenProps {
  navigation: HouseHoldCategoryNavigationProp;
  route: RouteProp<FamilyStackParamList, 'HouseHoldCategory'>;
}

export interface HouseHoldCategoryDetailScreenProps {
  navigation: HouseHoldCategoryDetailNavigationProp;
  route: RouteProp<FamilyStackParamList, 'HouseHoldCategoryDetail'>;
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
  EditProfileScreen: undefined;
  ReportScreen: undefined;
  AddScreen: undefined;
  MoreScreen: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeTabParamList,
  'HomeScreen'
>;

export interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  route: {
    params: {
      id_user: string | undefined;
    };
  };
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

type EditProfileScreenNavigationProp = NativeStackNavigationProp<
  HomeTabParamList,
  'EditProfileScreen'
>;

export interface EditProfileScreenProps {
  navigation: EditProfileScreenNavigationProp;
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
    id_user: string;
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
