export interface Family {
  id_family: number;
  quantity: number;
  description: string;
  created_at: string;
  updated_at: string;
  name: string;
  owner_id: string;
  expired_at: string;
  code_invite: string | null;
  avatar: string | null;
}
