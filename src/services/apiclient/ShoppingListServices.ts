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
    if (item_name != undefined) {
      body.item_name = item_name;
    }
    if (quantity != undefined) {
      body.quantity = quantity;
    }
    if (is_purchased != undefined) {
      body.is_purchased = is_purchased;
    }
    if (priority_level != undefined) {
      body.priority_level = priority_level;
    }
    if (price != undefined) {
      body.price = price;
    }
    if (description != undefined) {
      body.description = description;
    }
    if (id_item_type != undefined) {
      body.id_item_type = id_item_type;
    }
    if (reminder_date != undefined) {
      body.reminder_date = reminder_date;
    }
    console.log(body);
    const url = ShoppingListUrls.updateShoppingListItem;
    try {
      const response = await instance.put(url, body);
      if (response.status === 200) {
        console.log('aaa', response.data.data);
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  },
  updateCompleteShoppingList: async ({
    id_list,
    id_family,
    id_shopping_list_type,
    title,
    description,
    status,
  }: {
    id_list: number;
    id_family: number;
    id_shopping_list_type: number;
    title?: string;
    description?: string;
    status: string;
  }) => {
    const url = ShoppingListUrls.updateShoppingList;
    try {
      const response = await instance.put(url, {
        id_list,
        id_family,
        id_shopping_list_type,
        title,
        description,
        status,
      });
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
  getSuggestion: async ({
    id_family,
    id_item,
    id_list,
  }: {
    id_family: number;
    id_list: number;
    id_item: number;
  }) => {
    const url =
      'https://api.famfund.io.vn/api/v1/shopping/getSuggestions' +
      '/' +
      id_family +
      '/' +
      id_list +
      '/' +
      id_item;
    const res = await instance.get(url);
    if (res.status === 200) {
      const data = res.data.data.shopping as {
        title: string;
        source: string;
        link?: string;
        price: string;
        delivery: string;
        imageUrl: string;
        position?: number;
      }[];
      return data.slice(0, 5);
    } else {
      return [];
    }
  },
};

export default ShoppingListServices;

// {
//   title: string;
//     source: string;
//     link: string;
//     price: string;
//     delivery: string;
//     imageUrl: string;
//     position: number;
// }
// "title": "Cua Thịt Cà Mau",
// "source": "Đảo Hải Sản",
// "link": "https://daohaisan.vn/products/cua-thit-ca-mau-size-3-con-kg",
// "price": "199.000 ₫",
// "delivery": " 30.000 ₫ phí giao hàng",
// "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTAzoVrDN4Cc3ztTdG0hYWVMWOCEVWI82JyLXx3s0lL7w42PzZcF_PMB9G21bSGP5AnmmPkN58QbV-71ezpMUlKkkCgjc5fjtiX_AsUEEYtIbU_p-oIyQ&usqp=CAE",
// "position": 1
