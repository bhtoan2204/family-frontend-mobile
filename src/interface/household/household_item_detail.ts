import {ImageSourcePropType} from 'react-native';

export interface HouseHoldItemDetailInterface {
  id_household_item: number;
  id_family: number;
  item_name: string;
  item_imageurl: string | null;
  item_image?: ImageSourcePropType | null;
  id_guide_item?: number | null;
  description: string | null;
  id_category: number;
  id_room: number;
  category: {
    id_household_item_category: number;
    category_name: string;
  };
  room: {
    id_room: number;
    id_family: number;
    room_name: string;
    created_at: string;
    updated_at: string;
  };
  durableItem: {
    id_household_item: number;
    condition: string;
  } | null;
  consumableItem: {
    id_household_item: number;
    quantity: number;
    threshold: number;
    expired_date: string;
  } | null;
}
