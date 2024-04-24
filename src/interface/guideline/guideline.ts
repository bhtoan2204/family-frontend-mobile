export interface Guildline {
  id_item: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Step {
  name: string;
  imageUrl: string;
  description: string;
}

export interface GuildLineDetail {
  id_item: number;
  name: string;
  description: string;
  id_family: number;
  step: any;
  steps: Step[];
  is_shared: boolean;
  created_at: string;
  updated_at: string;
}
