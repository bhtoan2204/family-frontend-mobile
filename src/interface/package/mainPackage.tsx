export interface Package {
    id_main_package: number;
    name: string;
    price: number;
    description: string;
    duration_months: number;
  };

  export interface Service {
    id_extra_package: number;
    name: string;
    price: number;
    description: string;
    is_active: string;
  };

  
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
  
