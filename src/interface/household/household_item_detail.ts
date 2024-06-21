export interface HouseHoldItemDetailInterface {
  id_household_item: number;
  id_family: number;
  item_name: string;
  item_description: string;
  item_imageurl: string;
  description: string;
  category_name: string;
  quantity: number | null;
  threshold: number | null;
  condition: string;
  expired_date: string | null;
}
