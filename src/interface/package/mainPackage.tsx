export interface Package {
  id_main_package: number;
  name: string;
  price: number;
  description: string;
  duration_months: number;
}

export interface Service {
  id_extra_package: number;
  name: string;
  price: number;
  description: string;
  is_active: string;
}

export interface ComboPackage {
  id_combo_package: number;
  name: string;
  description: string;
  price: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  packageExtras: Service[];
}

export interface PackageMain {
  id_main_package: number;
  name: string;
  name_vn: string;
  description: string;
  price: number;
  is_active: boolean;
  duration_months: number;
  created_at: string;
  updated_at: string;
}

export interface Family {
  id_family: number;
  quantity: number;
  name: string;
  description: string;
  owner_id: string;
  expired_at: string;
  avatar: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id_order: string;
  id_user: string;
  id_family: number;
  status: string;
  id_package_main: number;
  id_package_extra: number | null;
  id_package_combo: number | null;
  method: string;
  bank_code: string;
  price: string;
  created_at: string;
  updated_at: string;
  packageMain: PackageMain;
  packageExtra: any | null;
  packageCombo: any | null;
  family: Family;
}

export interface PaymentHistory {
  id_payment_history: number;
  id_user: string;
  id_order: string;
  amount: number;
  type: string;
  payment_method: string;
  created_at: string;
  orders: Order;
}
