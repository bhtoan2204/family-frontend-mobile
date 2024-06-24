import {ImageSourcePropType} from 'react-native';

export interface HouseHoldItemInterface {
  id_household_item: number;
  id_family: number;
  item_name: string;
  description: string;
  item_imageurl?: string | null;
  id_category: number;
  id_room?: number | null;
  item_image?: ImageSourcePropType | null;
  category?: {
    id_household_item_category: number;
    category_name: string;
  };
  room?: {
    id_room: number;
    id_family: number;
    room_name: string;
    created_at: string;
    updated_at: string;
  };
}
