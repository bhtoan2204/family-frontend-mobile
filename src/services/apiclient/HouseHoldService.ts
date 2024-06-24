import axios from 'axios';
import baseUrl from '../urls/baseUrl';
import {GuildlineUrl, HouseHoldUrls} from '../urls';
import instance from '../httpInterceptor';
import {HouseHoldItemDetailInterface} from 'src/interface/household/household_item_detail';
import {HouseHoldItemInterface} from 'src/interface/household/household_item';
import {HouseHoldCategoryInterface} from 'src/interface/household/household_category';

const HouseHoldService = {
  getAllHouseHoldCategory: async () => {
    try {
      const url = HouseHoldUrls.getHouseHoldCategory;
      const response = await instance.get(url);
      if (response.status === 200) {
        return response.data.data as HouseHoldCategoryInterface[];
      } else {
        return [];
      }
    } catch (error) {}
  },
  getHouseHoldItems: async (
    id_family: number,
    page: number,
    itemsPerPage: number,
  ) => {
    try {
      const url =
        HouseHoldUrls.getHouseHoldItem +
        '/' +
        id_family +
        '?page=' +
        page +
        '&itemsPerPage=' +
        itemsPerPage;
      const response = await instance.get(url);
      if (response.status === 200) {
        return response.data.data as HouseHoldItemInterface[];
      } else {
        return [];
      }
    } catch (error) {
      throw new Error();
    }
  },
  getHouseHoldItemDetail: async (id_item: number, id_family: number) => {
    try {
      const url =
        HouseHoldUrls.getHouseHoldItemDetail + '/' + id_family + '/' + id_item;
      console.log('url ', url);
      const response = await instance.get(url);
      if (response.status === 200) {
        return response.data as HouseHoldItemDetailInterface;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error();
    }
  },
  updateHouseHoldItem: async (
    id_item: number,
    id_family: number,
    image_uri: string | null,
    item_name: string | null,
    description: string | null,
  ) => {
    const url = baseUrl + HouseHoldUrls.updateHouseHoldItem;
    const createFormData = (uri: string): FormData => {
      let formData = new FormData();
      if (uri != null && uri != '') {
        let filename = uri.split('/').pop()!;
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        const file = {
          uri,
          name: filename,
          type,
        };
        formData.append('item_image', file);
      }
      formData.append('id_family', id_family.toString());
      formData.append('id_item', id_item.toString());
      if (item_name) {
        formData.append('item_name', item_name);
      }
      if (description) {
        formData.append('item_description', description);
      }
      return formData;
    };
    try {
      const res = await instance.put(url, createFormData(image_uri || ''), {
        headers: {
          'Content-Type': 'multipart/form-data',
          accept: '*/*',
        },
      });
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log('Error updating item info:', error);
    }
  },
  updateConsumableItem: async (
    id_item: number,
    id_family: number,
    quantity: number | null,
    expiry_date: string | null,
    threshhold: number | null,
  ) => {
    const url = baseUrl + HouseHoldUrls.updateConsumableItem;
    try {
      const res = await instance.put(url, {
        id_family,
        id_item,
        quantity,
        threshhold,
        expiry_date,
      });
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log('Error updating consumable item:', error);
    }
  },
};

export default HouseHoldService;
