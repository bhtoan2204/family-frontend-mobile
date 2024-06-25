import {AxiosResponse} from 'axios';
import {ERROR_TEXTS} from 'src/constants';
import instance from '../httpInterceptor';
import {ProfileUrl, ShoppingListUrls} from '../urls';
import {
  ShoppingListCategoryInterface,
  ShoppingListCategoryTypeInterface,
  ShoppingListItemInterface,
} from 'src/interface/checklist/checklist';

const CheckListServices = {
  getAllShoppingListTypes: async () => {
    try {
      const response: AxiosResponse = await instance.get(
        ShoppingListUrls.getAllShoppingListType,
      );

      if (response.status === 200) {
        return response.data.data as ShoppingListCategoryTypeInterface[];
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
  getShoppingListByFamilyId: async (familyId: number) => {
    try {
      const response: AxiosResponse = await instance.get(
        ShoppingListUrls.getShoppingListByFamily + '/' + familyId,
      );
      // console.log(response.data.data);
      if (response.status === 200) {
        const resData = response.data.data as ShoppingListCategoryInterface[];
        for (let i = 0; i < resData.length; i++) {
          let completed = 0;
          let total = 0;
          const listData = await CheckListServices.getShoppingListItems(
            resData[i].id_list,
          );
          total = listData.length;
          listData.length > 0 &&
            listData.forEach(item => {
              if (item.is_purchased === true) {
                completed++;
              }
            });
          resData[i].checklistItems = listData;
          resData[i].completed = completed;
          resData[i].total = total;
        }
        return response.data.data;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
  getShoppingListItems: async (listId: number) => {
    try {
      const response: AxiosResponse = await instance.get(
        ShoppingListUrls.getShoppingListItem + '/' + listId,
      );

      if (response.status === 200) {
        return response.data.data as ShoppingListItemInterface[];
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
  addNewShoppingList: async (
    id_family: number,
    title: string,
    description: string,
  ) => {
    try {
      const response: AxiosResponse = await instance.post(
        ShoppingListUrls.createShoppingList,
        {
          id_family: id_family,
          title,
          description,
        },
      );

      if (response.status === 201) {
        const newShoppingList: ShoppingListCategoryInterface =
          response.data.data;
        newShoppingList.checklistItems = [];
        newShoppingList.completed = 0;
        newShoppingList.total = 0;

        return newShoppingList;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
  addItemToShoppingList: async (
    id_list: number,
    item_name: string,
    quantity: number,
    id_item_type: number,
    priority_level: number,
    reminder_date: string,
    price: number,
    description: string,
  ) => {
    try {
      const response: AxiosResponse = await instance.post(
        ShoppingListUrls.createShoppingListItem,
        {
          id_list,
          item_name,
          quantity,
          id_item_type,
          priority_level,
          reminder_date,
          price,
          description,
        },
      );

      if (response.status === 201) {
        return response.data.data as ShoppingListItemInterface;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
  updateShoppingListItem: async (
    id_item: number,
    id_list: number,
    item_name: string,
    quantity: number,
    is_purchased: boolean,
    priority_level: number,
    reminder_date: string,
    price: number,
    description: string,
    id_item_type: number,
  ) => {
    try {
      const url = ShoppingListUrls.updateShoppingListItem;
      console.log(url);
      const response: AxiosResponse = await instance.put(
        ShoppingListUrls.updateShoppingListItem,
        {
          id_item: id_item,
          id_list: id_list,
          id_item_type: id_item_type,
          item_name: item_name,
          description: description,
          quantity: quantity,
          is_purchased: is_purchased,
          priority_level: priority_level,
          reminder_date: reminder_date,
          price: price,
        },
      );
      if (response.status === 200) {
        return response.data.data as ShoppingListItemInterface;
      } else {
        return null;
      }
    } catch (error: any) {
      console.log(error.message);
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
};

export default CheckListServices;
