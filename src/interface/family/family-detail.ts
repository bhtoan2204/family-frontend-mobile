import {Member} from './member';

export interface FamilyDetail {
  id_family: number;
  quantity: number;
  description: string;
  created_at: string;
  updated_at: string;
  name: string;
  owner_id: string;
  expired_at: string;
  code_invite: string;
  avatar: string;
  members: Member[];
}
