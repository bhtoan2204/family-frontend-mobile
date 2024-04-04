import axios, {AxiosResponse} from 'axios';
import {ERROR_TEXTS} from 'src/constants';
import {FamilyUrl} from '../urls';
import instance from '../httpInterceptor';
import LocalStorage from 'src/store/localstorage';
import baseUrl from '../urls/baseUrl';

const ChatServices = {
  //da xong
  GetFamilyMessages: async ({id_family, index} : {id_family?: number, index:number}) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/chat/getFamilyMessages/${id_family}/${index}`,
        {
          params: {
            id_family, index,
          }
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error in getFamilyMessages:');
    }
    } catch (error: any) {
      console.error('Error in getFamilyMessages:', error.message);
    }
  },


};

export default ChatServices;
