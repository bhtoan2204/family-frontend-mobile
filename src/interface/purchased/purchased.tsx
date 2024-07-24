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
  }
  
 export interface Purchased {
    id_payment_history: number;
    id_user: string;
    id_order: string;
    amount: number;
    type: string;
    payment_method: string;
    created_at: string;
    orders: Order;
  }

  export type PaymentMethod = {
    id: number;
    name: string;
    code: string;
    url_image: string;
  };