import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import { Member } from 'src/interface/member/member';
import BottomSheet from '@gorhom/bottom-sheet';

export type RootParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  FamilyStack: NavigatorScreenParams<FamilyStackParamList>;
  PackStack: NavigatorScreenParams<PackStackParamList>;
  HomeTab: NavigatorScreenParams<HomeTabParamList>;
  CalendarStack: NavigatorScreenParams<CalendarStackParamList>;
  ChatStack: NavigatorScreenParams<ChatStackParamList>;
  ExpenseStack: NavigatorScreenParams<ExpenseStackParamList>;
  IncomeStack: NavigatorScreenParams<IncomeStackParamList>;
  MessageTab: NavigatorScreenParams<MessageTabParamList>;
  FamilyTab: NavigatorScreenParams<FamilyTabParamList>;

  // HouseHoldTab: NavigatorScreenParams<HouseHoldTabParamList>;
  HouseHoldStack: NavigatorScreenParams<HouseHoldStackParamList>;
  HouseHoldItemStack: NavigatorScreenParams<HouseHoldItemStackParamList>;
  ShoppingListStack: NavigatorScreenParams<ShoppingListStackParamList>;
  TodoListStack: NavigatorScreenParams<TodoListStackParamList>;
  EducationStack: NavigatorScreenParams<EducationTabParamList>;
  // ShoppingListCategoryStack: NavigatorScreenParams<ShoppingListCategoryStackParamList>;
};

export type ExpenseStackParamList = {
  Expenditure: undefined;
  CategoryExpense: undefined;
  FamilySpec: {
    id_family: number | undefined;
  };
  ChartExpense: undefined;
  IncomeExpenseScreen: undefined;
  ExpenseDetailScreen: undefined;
  AssetScreen: undefined;
  AssetDetailScreen: undefined;
  AddAssetScreen: undefined;
  ExpenseScreen: undefined;

};

export type IncomeStackParamList = {
  ChartIncomeScreen: undefined;
  IncomeDetailScreen: undefined;
  IncomeScreen: undefined;

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

type IncomeExpenseScreenNavigationProp = NativeStackNavigationProp<
  ExpenseStackParamList,
  'IncomeExpenseScreen'
>;

export interface IncomeExpenseScreenProps {
  navigation: IncomeExpenseScreenNavigationProp;
  route: RouteProp<ExpenseStackParamList, 'IncomeExpenseScreen'>;
}

type ExpenseDetailScreenNavigationProp = NativeStackNavigationProp<
  ExpenseStackParamList,
  'ExpenseDetailScreen'
>;

export interface ExpenseDetailScreenProps {
  navigation: ExpenseDetailScreenNavigationProp;
  route: RouteProp<ExpenseStackParamList, 'ExpenseDetailScreen'>;
}
type AssetScreenNavigationProp = NativeStackNavigationProp<
  ExpenseStackParamList,
  'AssetScreen'
>;

export interface AssetScreenProps {
  navigation: AssetScreenNavigationProp;
  route: RouteProp<ExpenseStackParamList, 'AssetScreen'>;
}


type AssetDetailScreenNavigationProp = NativeStackNavigationProp<
  ExpenseStackParamList,
  'AssetDetailScreen'
>;

export interface AssetDetailScreenProps {
  navigation: AssetDetailScreenNavigationProp;
  route: RouteProp<ExpenseStackParamList, 'AssetDetailScreen'>;
}
type AddAssetScreenNavigationProp = NativeStackNavigationProp<
  ExpenseStackParamList,
  'AddAssetScreen'
>;

export interface AddAssetScreenProps {
  navigation: AddAssetScreenNavigationProp;
  route: RouteProp<ExpenseStackParamList, 'AddAssetScreen'>;
}

type ExpenseScreenNavigationProp = NativeStackNavigationProp<
  ExpenseStackParamList,
  'ExpenseScreen'
>;

export interface ExpenseScreenProps {
  navigation: ExpenseScreenNavigationProp;
  route: RouteProp<ExpenseStackParamList, 'ExpenseScreen'>;
}


type IncomeDetailScreenNavigationProp = NativeStackNavigationProp<
IncomeStackParamList,
  'IncomeDetailScreen'
>;

export interface IncomeDetailScreenProps {
  navigation: IncomeDetailScreenNavigationProp;
  route: RouteProp<IncomeStackParamList, 'IncomeDetailScreen'>;
}

type IncomeScreenNavigationProp = NativeStackNavigationProp<
IncomeStackParamList,
  'IncomeScreen'
>;

export interface IncomeScreenProps {
  navigation: IncomeScreenNavigationProp;
  route: RouteProp<IncomeStackParamList, 'IncomeScreen'>;
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
  ChatFamily:  undefined;
  
  ChatFamilyLast: undefined;

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
type ChatFamilyLastScreenNavigationProp = NativeStackNavigationProp<
  ChatStackParamList,
  'ChatFamilyLast'
>;

export interface ChatFamilyLastScreenProps {
  navigation: ChatFamilyLastScreenNavigationProp;
  route: RouteProp<ChatStackParamList, 'ChatFamilyLast'>;
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
  MessageTabParamList,
  'ChatList'
>;

export interface ChatListProps {
  navigation: ChatListNavigationProp;
  route: RouteProp<MessageTabParamList, 'ChatList'>;
}

type FamilyNavigationProp = NativeStackNavigationProp<
FamilyTabParamList,
  'Family'
>;

export interface FamilyProps {
  navigation: FamilyNavigationProp;
  route: RouteProp<FamilyTabParamList, 'Family'>;
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
  LandingPage2: undefined;
  LandingPage3: undefined;
  Notification: undefined;
  WelcomeScreen: undefined;
  EnterCodeScreen: undefined;
  ResetPasswordScreen: undefined;
  Feedback: undefined;
};

export type CalendarStackParamList = {
  CalendarScreen: {
    id_family: number | undefined;
  };
  ScheduleScreen: {
    id_family: number | undefined;
  };
  CreateEvent: undefined;
  
  CreateCategoryEvent: {
    id_family: number | undefined;
  };
  EventListScreen: {
    id_family: number | undefined;
  };
  EventDetailsScreen: {
    id_family: number | undefined;
    id_calendar: number | undefined;
  };
  UpdateEvent: {
    id_family: number | undefined;
  };
};

export type FamilyStackParamList = {
  ViewAllFamily: undefined;
  CreateFamily: {
    id_order: number | undefined;
  };
  LanguageSelector: undefined;
  InviteMembers: undefined;
  
  ThemeSwitcher: undefined;

  ViewFamily: undefined;

  AllMember: {
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
  SharedGuildLine: {
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
  CheckList: {
    id_family: number | undefined;
  };
  CheckListDetail: {
    id_family: number | undefined;
    id_checklist: number;
  };
  News: undefined;
  UpcomingEvents: undefined;
  MemberDetails: undefined;
  GuidelinePublic: undefined

};

export type PackStackParamList = {
  ViewAllPurchased: undefined;
  ViewAllPackage: {
    id_family: number | null;
  };
  ViewAllService: undefined;
  
  BankInfoScreen: {
    id_family: number | null;
    id_package: number | undefined;
    bankCode: string | undefined;
    amount: number | undefined;
    language: 'vn' | undefined;
    method: string | undefined;
  };
  OrderDetailScreen: {
    id_family: number | null;
  };
  ZaloPayScreen: undefined;
  ComboScreen: undefined;
};

//household stack
type HouseHoldStackParamList = {
  HouseHoldScreen: {
    id_family: number | undefined;
  }; //household screen default is room
  ItemScreen: {
    id_family: number | undefined;
  };
  CategoryScreen: {
    id_family: number | undefined;
  };
  RoomDetail: {
    id_room: number | undefined;
    id_family: number | undefined;
  };
  ItemDetail: {
    id_item: number | undefined;
    id_family: number | undefined;
  };
  CategoryDetail: {
    id_category: number | undefined;
    id_family: number | undefined;
  };
};

type HouseHoldStackNavigationProp = NativeStackNavigationProp<
  RootParamList,
  'HouseHoldStack'
>;

export interface HouseHoldStackProps {
  navigation: HouseHoldStackNavigationProp;
  route: RouteProp<RootParamList, 'HouseHoldStack'>;
}

//household item stack
type HouseHoldItemStackParamList = {
  HouseHoldItem: {
    id_item: number | undefined;
    id_family: number | undefined;
  };
 
};

type HouseHoldItemStackNavigationProp = NativeStackNavigationProp<
  RootParamList,
  'HouseHoldItemStack'
>;
export interface HouseHoldItemStackProps {
  navigation: HouseHoldItemStackNavigationProp;
  route: RouteProp<RootParamList, 'HouseHoldItemStack'>;
}

type HouseHoldItemNavigationProp = NativeStackNavigationProp<
  HouseHoldItemStackParamList,
  'HouseHoldItem'
>;

export interface HouseHoldItemScreenProps {
  navigation: HouseHoldItemNavigationProp;
  route: RouteProp<HouseHoldItemStackParamList, 'HouseHoldItem'>;
  addEditConsumableItemSheetRef: React.RefObject<BottomSheet> | undefined;
  addEditDescriptionSheetRef: React.RefObject<BottomSheet> | undefined;
}

// type ReceiptInfoNavigationProp = NativeStackNavigationProp<
//   HouseHoldItemStackParamList,
//   'ReceiptInfo'
// >;

// export interface ReceiptInfoScreenProps {
//   navigation: ReceiptInfoNavigationProp;
//   route: RouteProp<HouseHoldItemStackParamList, 'ReceiptInfo'>;
// }

// type AddConsumableItemNavigationProp = NativeStackNavigationProp<
//   HouseHoldItemStackParamList,
//   'AddConsumableItem'
// >;

// export interface AddConsumableItemScreenProps {
//   navigation: AddConsumableItemNavigationProp;
//   route: RouteProp<HouseHoldItemStackParamList, 'AddConsumableItem'>;
// }

// type AddDescriptionNavigationProp = NativeStackNavigationProp<
//   HouseHoldItemStackParamList,
//   'AddDescription'
// >;

// export interface AddDescriptionScreenProps {
//   navigation: AddDescriptionNavigationProp;
//   route: RouteProp<HouseHoldItemStackParamList, 'AddDescription'>;
// }

// type EditConsumbleItemNavigationProp = NativeStackNavigationProp<
//   HouseHoldItemStackParamList,
//   'EditConsumbleItem'
// >;

// export interface EditConsumbleItemScreenProps {
//   navigation: EditConsumbleItemNavigationProp;
//   route: RouteProp<HouseHoldItemStackParamList, 'EditConsumbleItem'>;
// }

// type EditDescriptionNavigationProp = NativeStackNavigationProp<
//   HouseHoldItemStackParamList,
//   'EditDescription'
// >;

// export interface EditDescriptionScreenProps {
//   navigation: EditDescriptionNavigationProp;
//   route: RouteProp<HouseHoldItemStackParamList, 'EditDescription'>;
// }

type HouseHoldScreenNavigationProp = NativeStackNavigationProp<
  HouseHoldStackParamList,
  'HouseHoldScreen'
>;

export interface HouseHoldScreenProps {
  navigation: HouseHoldScreenNavigationProp;
  route: RouteProp<HouseHoldStackParamList, 'HouseHoldScreen'>;
  addRoomRef: React.RefObject<BottomSheet> | undefined;
  addItemRef: React.RefObject<BottomSheet> | undefined;
}

type HouseHoldScreen = NativeStackNavigationProp<
  HouseHoldStackParamList,
  'HouseHoldScreen'
>;

export interface HouseHoldScreenProps {
  navigation: HouseHoldScreen;
  route: RouteProp<HouseHoldStackParamList, 'HouseHoldScreen'>;
}

type RoomDetailNavigationProp = NativeStackNavigationProp<
  HouseHoldStackParamList,
  'RoomDetail'
>;

export interface RoomDetailScreenProps {
  navigation: RoomDetailNavigationProp;
  route: RouteProp<HouseHoldStackParamList, 'RoomDetail'>;
  setAddItemType: (type: number) => void;
  setPickedRoom: (room: number) => void;
  addItemSheetRef: React.RefObject<BottomSheet> | undefined;
}

type ItemScreenNavigationProp = NativeStackNavigationProp<
  HouseHoldStackParamList,
  'ItemScreen'
>;

export interface ItemScreenProps {
  navigation: ItemScreenNavigationProp;
  route: RouteProp<HouseHoldStackParamList, 'ItemScreen'>;
  addItemRef: React.RefObject<BottomSheet> | undefined;
  addRoomRef: React.RefObject<BottomSheet> | undefined;
}

type ItemDetailNavigationProp = NativeStackNavigationProp<
  HouseHoldStackParamList,
  'ItemDetail'
>;

export interface ItemDetailScreenProps {
  navigation: ItemDetailNavigationProp;
  route: RouteProp<HouseHoldStackParamList, 'ItemDetail'>;
}

type CategoryScreenNavigationProp = NativeStackNavigationProp<
  HouseHoldStackParamList,
  'CategoryScreen'
>;

export interface CategoryScreenProps {
  navigation: CategoryScreenNavigationProp;
  route: RouteProp<HouseHoldStackParamList, 'CategoryScreen'>;
  addCategoryRef: React.RefObject<BottomSheet> | undefined;
}

type CategoryDetailNavigationProp = NativeStackNavigationProp<
  HouseHoldStackParamList,
  'CategoryDetail'
>;

export interface CategoryDetailScreenProps {
  navigation: CategoryDetailNavigationProp;
  route: RouteProp<HouseHoldStackParamList, 'CategoryDetail'>;
  setAddItemType: (type: number) => void;
  setPickedCategory: (category: number) => void;
  addItemSheetRef: React.RefObject<BottomSheet> | undefined;
}
//// shopping stacks
type ShoppingListStackParamList = {
  ShoppingList: {
    id_family: number | undefined;
  };
  ShoppingListCategory: {
    id_family: number | undefined;
    id_category: number;
  };
  ShoppingListDetail: {
    id_family: number | undefined;
    id_shopping_list: number;
    id_category: number;
    id_item: number;
  };
};

type ShoppingListStackNavigationProp = NativeStackNavigationProp<
  RootParamList,
  'ShoppingListStack'
>;

export interface ShoppingListStackProps {
  navigation: ShoppingListStackNavigationProp;
  route: RouteProp<RootParamList, 'ShoppingListStack'>;
}

type ShoppingListNavigationProp = NativeStackNavigationProp<
  ShoppingListStackParamList,
  'ShoppingList'
>;

export interface ShoppingListScreenProps {
  navigation: ShoppingListNavigationProp;
  route: RouteProp<ShoppingListStackParamList, 'ShoppingList'>;
  handleNavigateShoppingListCategory: (id_category: number) => void;
}

type ShoppingListCategoryNavigationProp = NativeStackNavigationProp<
  ShoppingListStackParamList,
  'ShoppingListCategory'
>;

export interface ShoppingListCategoryScreenProps {
  navigation: ShoppingListCategoryNavigationProp;
  route: RouteProp<ShoppingListStackParamList, 'ShoppingListCategory'>;
}

type ShoppingListDetailNavigationProp = NativeStackNavigationProp<
  ShoppingListStackParamList,
  'ShoppingListDetail'
>;

export interface ShoppingListDetailScreenProps {
  navigation: ShoppingListDetailNavigationProp;
  route: RouteProp<ShoppingListStackParamList, 'ShoppingListDetail'>;
}
//Shopping Category Stack
// type ShoppingListCategoryStackParamList = {
//   ShoppingListCategory: {
//     id_family: number | undefined;
//     id_category: number;
//   };
//   ShoppingListCategoryDetail: {
//     id_family: number | undefined;
//     id_category: number;
//     id_item: number;
//     id_list: number;
//   };
// };

// type ShoppingListCategoryStackNavigationProp = NativeStackNavigationProp<
//   RootParamList,
//   'ShoppingListCategoryStack'
// >;

// export interface ShoppingListCategoryStackProps {
//   navigation: ShoppingListCategoryStackNavigationProp;
//   route: RouteProp<RootParamList, 'ShoppingListCategoryStack'>;
// }

// type ShoppingCategoryNavigationProp = NativeStackNavigationProp<
//   ShoppingListCategoryStackParamList,
//   'ShoppingListCategory'
// >;

// export interface ShoppingListCategoryScreenProps {
//   navigation: ShoppingCategoryNavigationProp;
//   route: RouteProp<ShoppingListCategoryStackParamList, 'ShoppingListCategory'>;
// }

// type ShoppingCategoryDetailNavigationProp = NativeStackNavigationProp<
//   ShoppingListCategoryStackParamList,
//   'ShoppingListCategoryDetail'
// >;

// export interface ShoppingCategoryDetailScreenProps {
//   navigation: ShoppingCategoryDetailNavigationProp;
//   route: RouteProp<
//     ShoppingListCategoryStackParamList,
//     'ShoppingListCategoryDetail'
//   >;
// }

type TodoListStackParamList = {
  TodoList: {
    id_family: number | undefined;
  };
  TodoListCategory: {
    id_family: number | undefined;
    id_category: number;
  };
  TodoListItemDetail: {
    id_family: number | undefined;
    id_list: number;
    id_category: number;
    id_item: number;
  };
};

type TodoStackNavigationProp = NativeStackNavigationProp<
  RootParamList,
  'TodoListStack'
>;

export interface TodoListStackProps {
  navigation: TodoStackNavigationProp;
  route: RouteProp<RootParamList, 'TodoListStack'>;
}

type TodoListNavigationProp = NativeStackNavigationProp<
  TodoListStackParamList,
  'TodoList'
>;

export interface TodoListScreenProps {
  navigation: TodoListNavigationProp;
  route: RouteProp<TodoListStackParamList, 'TodoList'>;
}

type TodoListCategoryNavigationProp = NativeStackNavigationProp<
  TodoListStackParamList,
  'TodoListCategory'
>;

export interface TodoListCategoryScreenProps {
  navigation: TodoListCategoryNavigationProp;
  route: RouteProp<TodoListStackParamList, 'TodoListCategory'>;
}

type TodoListItemDetailNavigationProp = NativeStackNavigationProp<
  TodoListStackParamList,
  'TodoListItemDetail'
>;

export interface TodoListItemDetailScreenProps {
  navigation: TodoListItemDetailNavigationProp;
  route: RouteProp<TodoListStackParamList, 'TodoListItemDetail'>;
}


/////

type EducationTabParamList = {
  EducationScreen: {
    id_family: number;
  };
  ProgressScreen: {
    id_family: number;
    id_progress: number;
  };
  SubjectScreen: {
    id_family: number;
    id_progress: number;
    id_subject: number;
  };
};

type EducationStackNavigationProp = NativeStackNavigationProp<
  RootParamList,
  'EducationStack'
>;

export interface EducationStackProps {
  navigation: EducationStackNavigationProp;
  route: RouteProp<RootParamList, 'EducationStack'>;
}

type EducationScreenNavigationProp = NativeStackNavigationProp<
  EducationTabParamList,
  'EducationScreen'
>;

export interface EducationScreenProps {
  navigation: EducationScreenNavigationProp;
  route: RouteProp<EducationTabParamList, 'EducationScreen'>;
}

type ProgressScreenNavigationProp = NativeStackNavigationProp<
  EducationTabParamList,
  'ProgressScreen'
>;

export interface ProgressScreenProps {
  navigation: ProgressScreenNavigationProp;
  route: RouteProp<EducationTabParamList, 'ProgressScreen'>;
}

type SubjectScreenNavigationProp = NativeStackNavigationProp<
  EducationTabParamList,
  'SubjectScreen'
>;

export interface SubjectScreenProps {
  navigation: SubjectScreenNavigationProp;
  route: RouteProp<EducationTabParamList, 'SubjectScreen'>;
}

export interface EducationScreenProps {
  navigation: EducationScreenNavigationProp;
  route: RouteProp<EducationTabParamList, 'EducationScreen'>;
}



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
  navigation: EventListScreenNavigationProp ;
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

type EventDetailsScreenNavigationProp = NativeStackNavigationProp<
  CalendarStackParamList,
  'EventDetailsScreen'
>;

export interface EventDetailsScreenProps {
  navigation: EventDetailsScreenNavigationProp;
  route: RouteProp<CalendarStackParamList, 'EventDetailsScreen'>;
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
export interface ChatStackProps {
  navigation: ChatStackNavigationProp;
}
//
type ZaloPayScreenNavigationProp = NativeStackNavigationProp<
  PackStackParamList,
  'ZaloPayScreen'
>;
export type ZaloPayScreenProps = {navigation: ZaloPayScreenNavigationProp};

type ComboScreenNavigationProp = NativeStackNavigationProp<PackStackParamList, 'ComboScreen'>;
export type ComboScreenProps = { navigation: ComboScreenNavigationProp };

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

type EnterCodeScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'EnterCodeScreen'
>;

export interface ResetPasswordScreenProps {
  navigation: ResetPasswordScreenNavigationProp;
}

type FeedBackNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Feedback'
>;
export interface FeedbackProps {
  navigation: FeedBackNavigationProp;
}


type LanguageSelectorNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'LanguageSelector'
>;
export interface LanguageSelectorProps {
  navigation: LanguageSelectorNavigationProp;
}

type ResetPasswordScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'ResetPasswordScreen'
>;
export interface EnterCodeScreenProps {
  navigation: EnterCodeScreenNavigationProp;
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
type ViewAllServiceNavigationProp = NativeStackNavigationProp<
  PackStackParamList,
  'ViewAllService'
>;
export interface ViewAllServiceProps {
  navigation: ViewAllServiceNavigationProp ;
  route: RouteProp<PackStackParamList, 'ViewAllService'>;
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

export interface CheckListDetailScreenProps {
  navigation: CheckListDetailNavigationProp;
  route: RouteProp<FamilyStackParamList, 'CheckListDetail'>;
}


type MemberDetailsNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'MemberDetails'
>;

export interface MemberDetailsScreenProps {
  navigation: MemberDetailsNavigationProp;
  route: RouteProp<FamilyStackParamList, 'MemberDetails'>;
}
type GuidelinePublicNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'GuidelinePublic'
>;

export interface GuidelinePublicScreenProps {
  navigation: GuidelinePublicNavigationProp;
  route: RouteProp<FamilyStackParamList, 'GuidelinePublic'>;
}

export interface CheckListScreenProps {
  navigation: CheckListNavigationProp;
  route: RouteProp<FamilyStackParamList, 'CheckList'>;
}

export interface NewsScreenProps {
  navigation: NewsNavigationProp;
  route: RouteProp<FamilyStackParamList, 'News'>;
}

// export interface HouseHoldScreenProps {
//   navigation: HouseHoldNavigationProp;
//   route: RouteProp<FamilyStackParamList, 'HouseHold'>;
// }

export interface HouseHoldItemScreenProps2 {
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

// export interface EducationScreenProps {
//   navigation: EducationNavigationprop;
//   route: RouteProp<FamilyStackParamList, 'Education'>;
// }

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
  CalendarStackParamList,
  'UpdateEvent'
>;

export interface UpdateEventScreenProps {
  navigation: UpdateEventNavigationProps;
  route: RouteProp<CalendarStackParamList, 'UpdateEvent'>;
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


type ThemeSwitcherNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'ThemeSwitcher'
  >;

export interface ThemeSwitcherProps {
  navigation: ThemeSwitcherNavigationProp;
}

type UpcomingEventsNavigationProp = NativeStackNavigationProp<
  FamilyStackParamList,
  'UpcomingEvents'
  >;

export interface UpcomingEventsScreenProps { navigation: UpcomingEventsNavigationProp; }

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

type LandingPage2NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'LandingPage2'
>;

export interface LandingPage2ScreenProps { navigation: LandingPage2NavigationProp; }

type LandingPage3NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'LandingPage3'
>;

export interface LandingPage3ScreenProps {navigation: LandingPage3NavigationProp;}  

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

export type MessageTabParamList = {
  ChatList: undefined;
};
export type FamilyTabParamList = {
  Family: undefined;
 
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
  };
  AddEditFamilyMember: {
    id_family: number | undefined;
    phone: string | undefined;
  };
  CreateEvent: {
    id_family: number;
  };
  Login: undefined;
};

type ProfileDetailNavigationProp = NativeStackNavigationProp<
  ModelScreenParamsList,
  'ProfileDetail'
>;

export interface ProfileDetailScreenProps {
  navigation: ProfileDetailNavigationProp;
}

type LoginNavigationProp = NativeStackNavigationProp<
  ModelScreenParamsList,
  'Login'
>;

export interface LoginProps {
  navigation: LoginNavigationProp;
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
