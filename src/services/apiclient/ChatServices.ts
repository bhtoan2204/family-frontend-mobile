import  {AxiosResponse} from 'axios';
import instance from '../httpInterceptor';
import baseUrl from '../urls/baseUrl';

const ChatServices = {
  GetFamilyMessages: async ({id_family, index}: {id_family?: number, index: number}) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/chat/getFamilyMessages/${id_family}/${index}`,

      );
      if (response && response.status === 200) {
        return response.data;
      } else {
        console.error('Error in getFamilyMessages: Unexpected response or status code is not 200');
      }
    } catch (error: any) {
      console.error('Error in getFamilyMessages:', error.message);
    }
  },
  GetMessages: async ({ id_user, index }: { id_user?: string; index: number }) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/chat/getMessages/${id_user}/${index}`
      );
      
      if ( response) {
        return response.data; 
      }
    } catch (error: any) {
      console.error('Error in getMessages:', error.message);
    }
  },

  GetUserChat: async ({index }: {index: number }) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/chat/getUsersChat/${index}`
      );
      
      if ( response) {
        return response.data; 
      }
    } catch (error: any) {
      console.error('Error in getUsersChat:', error.message);
    }
  },
  markSeenMessage: async ({receiver_id }: {receiver_id?: string }) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/chat/markSeenMessage/${receiver_id}`
      );
      
      if ( response) {
        return response.data; 
      }
    } catch (error: any) {
      console.error('Error in markSeenMessage:', error.message);
    }
  },
  GetAllUser: async ({index }: {index: number }) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/user/getAllUser`
      );
      if ( response) {
        return response.data; 
      }
    } catch (error: any) {
      console.error('Error in getAllUser:', error.message);
    }
  },
  
}
export default ChatServices;
