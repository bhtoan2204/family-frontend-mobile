import instance from '../httpInterceptor';
import {ShoppingListUrls} from '../urls';
import {
  ShoppingList,
  ShoppingListItem,
  ShoppingListItemType,
  ShoppingListType,
} from 'src/interface/shopping/shopping_list';
import baseUrl from '../urls/baseUrl';
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
    const url =
      ShoppingListUrls.getShoppingListByFamily +
      '?id_family=' +
      id_family +
      '&page=1&itemsPerPage=100&sortBy=created_at&sortDirection=DESC';
    try {
      const response = await instance.get(url);
      if (response.status === 200) {
        const shoppingListData = response.data.data as ShoppingList[];
        console.log(shoppingListData.length);
        for (let i = 0; i < shoppingListData.length; i++) {
          const itemUrl =
            ShoppingListUrls.getShoppingListItem +
            '?id_family=' +
            id_family +
            '&id_list=' +
            shoppingListData[i].id_list +
            '&page=1&itemsPerPage=100&sortBy=created_at&sortDirection=DESC';
          console.log('itemUrl ', itemUrl);
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
        console.log('shoppingListData ', shoppingListData);
        return shoppingListData;
      } else {
        return [];
      }
    } catch (error: any) {
      console.log(error.message);
      return [];
    }
  },
  createShoppingList: async ({
    id_family,
    id_shopping_list_type,
    title,
    description,
  }: {
    id_family: number;
    id_shopping_list_type: number;
    title: string;
    description: string;
  }) => {
    const url = ShoppingListUrls.createShoppingList;
    try {
      const response = await instance.post(url, {
        id_family,
        id_shopping_list_type,
        title,
        description,
      });
      if (response.status === 201) {
        return response.data.data as {
          id_family: number;
          title: string;
          description: string;
          id_shopping_list_type: number;
          id_list: number;
          status: number;
          created_at: string;
          updated_at: string;
        };
      } else {
        return null;
      }
    } catch (error: any) {
      console.log(error.message);
      return null;
    }
  },

  createShoppingListItem: async ({
    id_family,
    id_list,
    item_name,
    quantity,
    id_item_type,
    priority_level,
    reminder_date,
    price,
    description,
  }: {
    id_family: number;
    id_list: number;
    item_name: string;
    quantity: number;
    id_item_type: number;
    priority_level: number;
    reminder_date: string;
    price: number;
    description: string;
  }) => {
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
        return response.data.data as {
          id_list: number;
          item_name: string;
          quantity: number;
          id_item_type: number;
          priority_level: number;
          reminder_date: string;
          price: number;
          description: string;
          id_item: number;
          is_purchased: boolean;
          created_at: string;
          updated_at: string;
        };
      } else {
        return null;
      }
    } catch (error: any) {
      console.log(error.message);
      return null;
    }
  },
  getShoppingItem: async (id_family: number, id_list: number) => {
    const url = `${baseUrl}/api/v1/shopping/getShoppingItem`;
    try {
      console.log(id_list, id_family);
      const response = await instance.get(url, {
        params: {
          page: 1,
          itemsPerPage: 10,
          sortBy: 'created_at',
          sortDirection: 'DESC',
          id_family: id_family,
          id_list: id_list,
        },
      });
      if (response.status === 200) {
        return response.data.data;
      } else {
        return null;
      }
    } catch (error: any) {
      console.log(error.message);
      return null;
    }
  },
};

export default ShoppingListServices;
