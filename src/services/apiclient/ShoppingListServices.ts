import instance from '../httpInterceptor';
import {ShoppingListUrls} from '../urls';
import {
  ShoppingList,
  ShoppingListItem,
  ShoppingListItemType,
  ShoppingListType,
} from 'src/interface/shopping/shopping_list';
const ShoppingListServices = {
  getShoppingListType: async () => {
    const url = ShoppingListUrls.getShoppingListType;
    try {
      const response = await instance.get(url);
      if (response.status === 200) {
        return response.data.data as ShoppingListType[];
      } else {
        return [];
      }
    } catch (error: any) {
      console.log(error.message);
      return [];
    }
  },
  getShoppingItemType: async () => {
    const url = ShoppingListUrls.getAllShoppingListItemType;
    try {
      const response = await instance.get(url);
      if (response.status === 200) {
        return response.data.data as ShoppingListItemType[];
      } else {
        return [];
      }
    } catch (error: any) {
      console.log(error.message);
      return [];
    }
  },
  getShoppingListByFamily: async (id_family: number) => {
    const url = ShoppingListUrls.getShoppingListByFamily + '/' + id_family;
    try {
      const response = await instance.get(url);
      if (response.status === 200) {
        return response.data.data as ShoppingList[];
      } else {
        return [];
      }
    } catch (error: any) {
      console.log(error.message);
      return [];
    }
  },
  getShoppingListDetail: async (id_family: number, id_list: number) => {
    const url =
      ShoppingListUrls.getShoppingListItem + '/' + id_family + '/' + id_list;
    try {
      const response = await instance.get(url);
      if (response.status === 200) {
        return response.data.data;
      } else {
        return [];
      }
    } catch (error: any) {
      console.log(error.message);
      return [];
    }
  },
  getShoppingDetail: async (id_family: number) => {
    const url = ShoppingListUrls.getShoppingListByFamily + '/' + id_family;
    try {
      const response = await instance.get(url);
      if (response.status === 200) {
        const shoppingListData = response.data.data as ShoppingList[];
        console.log(shoppingListData.length);
        for (let i = 0; i < shoppingListData.length; i++) {
          const itemUrl =
            ShoppingListUrls.getShoppingListItem +
            '/' +
            id_family +
            '/' +
            shoppingListData[i].id_list;
          const itemResponse = await instance.get(itemUrl);
          if (itemResponse.status == 200) {
            shoppingListData[i].items = itemResponse.data
              .data as ShoppingListItem[];
            console.log('list ', shoppingListData[i].id_list);
            console.log('items ', itemResponse.data.data);
          } else {
            shoppingListData[i].items = [];
          }
        }
        return shoppingListData;
      } else {
        return [];
      }
    } catch (error: any) {
      console.log(error.message);
      return [];
    }
  },
  createShoppingListItem: async (
    id_family: number,
    id_list: number,
    item_name: string,
    quantity: number,
    id_item_type: number,
    priority_level: number,
    reminder_date: string,
    price: number,
    description: string,
  ) => {
    const url = ShoppingListUrls.createShoppingListItem;
    try {
      const response = await instance.post(url, {
        id_family,
        id_list,
        item_name,
        quantity,
        id_item_type,
        priority_level,
        reminder_date,
        price,
        description,
      });
      if (response.status === 201) {
        return response.data;
      } else {
        return [];
      }
    } catch (error: any) {
      console.log(error.message);
      return [];
    }
  },
};

export default ShoppingListServices;
