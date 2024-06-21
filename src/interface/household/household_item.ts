import {ImageSourcePropType} from 'react-native';

export interface HouseHoldItemInterface {
  id_household_item: number;
  id_family: number;
  item_name: string;
  item_description: string;
  item_imageurl?: string | null;
  id_category: number;
  item_image?: ImageSourcePropType | null;
}
