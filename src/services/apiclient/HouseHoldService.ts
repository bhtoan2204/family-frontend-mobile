import axios from 'axios';
import baseUrl from '../urls/baseUrl';
import {GuildlineUrl, HouseHoldUrls} from '../urls';
import instance from '../httpInterceptor';
import {HouseHoldItemDetailInterface} from 'src/interface/household/household_item_detail';
import {HouseHoldItemInterface} from 'src/interface/household/household_item';
import {HouseHoldCategoryInterface} from 'src/interface/household/household_category';
import LocalStorage from 'src/store/localstorage';
import {RoomInterface} from 'src/interface/household/room';
import {gradients_list} from 'src/assets/images/gradients';

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
    } catch (error: any) {
      console.log(error.message);
      return [];
    }
  },
  getHouseHoldItems: async (
    id_family: number,
    page: number,
    itemsPerPage: number,
  ) => {
    try {
      const token = await LocalStorage.GetAccessToken();
      console.log('token', token);
      const url =
        HouseHoldUrls.getHouseHoldItem +
        '?id_family=' +
        id_family +
        '&page=' +
        page +
        '&itemsPerPage=' +
        itemsPerPage +
        '&sortBy=created_at&sortDirection=ASC';
      console.log(url);
      const response = await instance.get(url);
      if (response.status === 200) {
        console.log(response.data);
        return response.data.data as HouseHoldItemInterface[];
      } else {
        return [];
      }
    } catch (error) {
      throw new Error();
    }
  },
  createHouseholdItem: async (
    id_family: number,
    item_image: string,
    item_name: string,
    id_category: number,
    item_description: string,
    id_room: number,
  ) => {
    const url = HouseHoldUrls.createHouseHoldItem;
    const createFormData = (uri: string): FormData => {
      let formData = new FormData();
      if (uri != '') {
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
      formData.append('item_name', item_name);
      formData.append('id_category', id_category.toString());
      formData.append('item_description', item_description);
      formData.append('item_type', 'durable');
      formData.append('id_room', id_room.toString());
      return formData;
    };

    try {
      const res = await instance.post(url, createFormData(item_image), {
        headers: {
          'Content-Type': 'multipart/form-data',
          accept: '*/*',
        },
      });
      if (res.status === 201) {
        const itemData = res.data.data;
        // itemData.id_family = parseInt(itemData.id_family);
        // itemData.id_category = parseInt(itemData.id_category);
        // itemData.id_room = parseInt(itemData.id_room);
        // console.log('created item data', itemData);
        return {
          id_family: itemData.id_family,
          id_household_item: itemData.id_household_item,
          id_category: itemData.id_category,
          id_room: itemData.id_room,
          item_description: itemData.item_description,
          item_imageurl: itemData.item_imageurl,
          item_name: itemData.item_name,
          created_at: itemData.created_at,
          updated_at: itemData.updated_at,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.log('Error creating item:', error);
      return null;
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
  getAllRoom: async (id_family: number, page: number, itemsPerPage: number) => {
    try {
      const url =
        HouseHoldUrls.getAllRoom +
        '?id_family=' +
        id_family +
        '&page=' +
        page +
        '&itemsPerPage=' +
        itemsPerPage +
        '&sortBy=created_at&sortDirection=ASC';
      const response = await instance.get(url);
      if (response.status === 200) {
        console.log('uwu', response.data.data);
        return response.data.data as RoomInterface[];
      } else {
        return [];
      }
    } catch (error) {
      throw new Error();
    }
  },
  createRoom: async (
    id_family: number,
    room_name: string,
    room_image: string,
  ) => {
    const url = HouseHoldUrls.createRoom;
    const createFormData = (uri: string): FormData => {
      let formData = new FormData();
      if (uri != '') {
        let filename = uri.split('/').pop()!;
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        const file = {
          uri,
          name: filename,
          type,
        };
        formData.append('image', file);
      }
      // else {
      //   const rand = Math.floor(Math.random() * gradients_list.length);

      //   const file = {
      //     uri: gradients_list[rand],
      //     type: 'image/png',
      //     name: `${id_family}_${rand}.png`,
      //   };
      //   formData.append('image', file);
      // }
      formData.append('id_family', id_family.toString());
      formData.append('room_name', room_name);
      return formData;
    };

    try {
      const res = await instance.post(url, createFormData(room_image), {
        headers: {
          'Content-Type': 'multipart/form-data',
          accept: '*/*',
        },
      });
      if (res.status === 201) {
        const roomData = res.data;
        roomData.id_family = parseInt(roomData.id_family);
        console.log('created room data', roomData);
        return roomData as RoomInterface;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Error creating room:', error);
      return null;
    }
  },
  updateRoom: async (
    id_family: number,
    id_room: number,
    room_name: string,
    room_image: string | null,
  ) => {
    const url = baseUrl + HouseHoldUrls.updateRoom;
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
        formData.append('image', file);
      }
      formData.append('id_family', id_family.toString());
      formData.append('id_room', id_room.toString());
      formData.append('room_name', room_name);
      return formData;
    };
    try {
      const res = await instance.put(url, createFormData(room_image || ''), {
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
      console.log('Error updating room info:', error);
    }
  },
  deleteItem: async (id_item: number, id_family: number) => {
    try {
      const url =
        HouseHoldUrls.deleteHouseHoldItem + '/' + id_family + '/' + id_item;
      const response = await instance.delete(url);
      if (response.status === 204) {
        return true;
      } else {
        return false;
      }
    } catch (error) {}
  },
};

export default HouseHoldService;
