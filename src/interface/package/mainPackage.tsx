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
