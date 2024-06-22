export interface Member {
  id_user: string;
  lastname: string;
  firstname: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: string;
  birthdate?: string | null;
  genre?: string | null;
}
