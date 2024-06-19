import {AxiosResponse} from 'axios';
import {ERROR_TEXTS} from 'src/constants';
import instance from '../httpInterceptor';
import {ProfileUrl, ShoppingListUrls} from '../urls';
import {CheckListCategoryInterface, CheckListCategoryTypeInterface} from 'src/interface/checklist/checklist';

const CheckListServices = {
  getAllShoppingListTypes: async () => {
    try {
      const response: AxiosResponse = await instance.get(
        ShoppingListUrls.getAllShoppingListType,
      );

      if (response.status === 200) {
        return response.data.data as CheckListCategoryTypeInterface[];
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
  getShoppingListByFamilyId: async (familyId: string) => {
    try {
      const response: AxiosResponse = await instance.get(
        ShoppingListUrls.getShoppingListByFamily + '/' + familyId,
      );

      if (response.status === 200) {
        const resData = response.data.data as CheckListCategoryInterface[];
        
        return response.data.data;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
  getShoppingListItems: async (listId: string) => {
    try {
      const response: AxiosResponse = await instance.get(
        ShoppingListUrls.getShoppingListItem + '/' + listId,
      );

      if (response.status === 200) {
        return response.data.data;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
};

export default CheckListServices;
