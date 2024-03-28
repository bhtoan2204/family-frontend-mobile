import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

export type RootParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  FamilyStack: NavigatorScreenParams<FamilyStackParamList>;
  PackStack: NavigatorScreenParams<PackStackParamList>;
  HomeTab: NavigatorScreenParams<HomeTabParamList>;
};

export type AuthStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  ForgotPasswordScreen: undefined;
};

export type FamilyStackParamList = {
  CreateFamily: {
    id_user: string;
    id_order: number;
  };
  AddMembers: undefined;
  InviteMembers: undefined;
  ViewAllFamily:{
    id_user:string;
  };
  ViewAllMember: undefined;
  ViewFamily: {
    id_user: string;
    id_family: number;

  };
 
};

export type PackStackParamList = {

  ViewAllPurchased: {
    id_user: string;
  };
  ViewAllPackage: {
    id_user: string;
    id_family: number;
  };
  BankInfoScreen: {
    code: string;
    id_user: string;
    id_family: number;
    id_package: number;
    amount: number;
  };
  OrderDetailScreen: {
    id_user: string;
    id_family: number;
    id_package: number;
    amount: number;
  };

  ZaloPayScreen: undefined;
};

/////
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
  route: RouteProp<PackStackParamList, 'OrderDetailScreen'> & {
    params: {
      id_user: string;
      id_family: number;
      id_package: number;
      amount: number;
    };
  };
};

type BankInfoScreenNavigationProp = NativeStackNavigationProp<
  PackStackParamList,
  'BankInfoScreen'
>;

export interface BankInfoScreenProps {
  navigation: BankInfoScreenNavigationProp;
  route: RouteProp<PackStackParamList, 'BankInfoScreen'> & {
    params: {
      id_user: string;
      id_family: number;
      id_package: number;
      bankCode: string;
      amount: number;
      language: 'vn';
      method: string;
    };
  };
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

type ViewAllMemberNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'ViewAllMember'
>;
export interface ViewAllMemberScreenProps {
  navigation: ViewAllMemberNavigationProp;
}

type PurchasedNavigationProp = NativeStackNavigationProp<
  PackStackParamList,
  'ViewAllPurchased'
>;
export interface PurchasedScreenProps {
  navigation: PurchasedNavigationProp;
  route: RouteProp<PackStackParamList, 'ViewAllPurchased'> & {
    params: {
      id_user: string;
      id_family: number;
    };
  };
}

type ViewAllFamilyNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'ViewAllFamily'
>;

export interface ViewAllFamilyScreenProps {
  navigation: ViewAllFamilyNavigationProp & ViewFamilyNavigationProp;
  route: RouteProp<FamilyStackParamList, 'ViewAllFamily'> & {
    params: {
      id_user: string;
    };
}
}


export type ViewFamilyNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'ViewFamily'
>;

export interface ViewFamilyScreenProps {
  navigation: ViewFamilyNavigationProp;
  route: RouteProp<FamilyStackParamList, 'ViewFamily'> & {
    params: {
      id_user: string;
      id_family: number;
    };
  };
}


export type UpdateFamilyNavigationProps = NativeStackNavigationProp<
ModelScreenParamsList,
  'UpdateFamily'
>;

export interface UpdateFamilyScreenProps {
  //navigation: UpdateFamilyNavigationProps;
  navigation: ViewFamilyNavigationProp;
  route: {
    params: {
      id_user: string;
      id_family: number;
      name: string;
      description: string;
    };
  };
}

type CreateFamilyNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'CreateFamily'
>;

export interface CreateFamilyScreenProps {
  navigation: CreateFamilyNavigationProp;
  route: RouteProp<FamilyStackParamList, 'CreateFamily'> & {
    params: {
      id_user: string;
      id_order: number;
    };
  };
}

type AddMembersNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'AddMembers'
>;

export interface AddMembersScreenProps {
  navigation: AddMembersNavigationProp;
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

type ViewAllPackageNavigationProp = NativeStackNavigationProp<
  PackStackParamList,
  'ViewAllPackage'
>;
export interface ViewAllPackageScreenProps {
  navigation: ViewAllPackageNavigationProp;
  route: RouteProp<PackStackParamList, 'ViewAllPackage'> & {
    params: {
      id_user: string;
      id_family: number;
    };
  };
}
// Define the types for the navigation stack of the HomeTab
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
      id_user: string;
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
