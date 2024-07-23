export interface Guildline {
  id_guide_item: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  id_family: number;
  steps?: Step[] | null;
  is_shared: boolean;
}

export interface Step {
  name: string;
  imageUrl?: string;
  description: string;
}

export interface GuildLineDetail {
  id_guide_item: number;
  name: string;
  description: string;
  id_family: number;
  step: any;
  steps: Step[];
  is_shared: boolean;
  created_at: string;
  updated_at: string;
}
