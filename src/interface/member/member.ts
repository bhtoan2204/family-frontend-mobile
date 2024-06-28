
export interface User {
  id_user: string;
  email: string;
  phone: string;
  firstname: string;
  lastname: string;
  created_at: string;
  updated_at: string;
  isphoneverified: boolean;
  login_type: string;
  avatar: string;
  genre: string | null;
  birthdate: string | null;
}

export interface Member {
  id: number;
  id_user: string;
  id_family: number;
  role: string;
  created_at: string;
  updated_at: string;
  user: User;
}
