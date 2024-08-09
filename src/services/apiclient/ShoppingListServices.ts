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
  updateShoppingListItem: async ({
    id_family,
    id_item,
    id_list,
    item_name,
    quantity,
    is_purchased,
    priority_level,
    price,
    description,
    id_item_type,
    reminder_date,
  }: {
    id_family: number;
    id_item: number;
    id_list: number;
    item_name?: string;
    quantity?: number;
    is_purchased?: boolean;
    priority_level?: number;
    price?: number;
    description?: string;
    id_item_type?: number;
    reminder_date?: string;
  }) => {
    const body: any = {
      id_family,
      id_list,
      id_item,
    };
    if (item_name) {
      body.item_name = item_name;
    }
    if (quantity) {
      body.quantity = quantity;
    }
    if (is_purchased) {
      body.is_purchased = is_purchased;
    }
    if (priority_level) {
      body.priority_level = priority_level;
    }
    if (price) {
      body.price = price;
    }
    if (description) {
      body.description = description;
    }
    if (id_item_type) {
      body.id_item_type = id_item_type;
    }
    if (reminder_date) {
      body.reminder_date = reminder_date;
    }
    const url = ShoppingListUrls.updateShoppingListItem;
    try {
      const response = await instance.put(url, body);
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  },
  deleteShoppingListItem: async ({
    id_family,
    id_list,
    id_item,
  }: {
    id_family: number;
    id_list: number;
    id_item: number;
  }) => {
    const url =
      ShoppingListUrls.deleteShoppingListItem +
      '/' +
      id_family +
      '/' +
      id_list +
      '/' +
      id_item;
    try {
      const response = await instance.delete(url);
      if (response.status === 204) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  },
};

export default ShoppingListServices;
