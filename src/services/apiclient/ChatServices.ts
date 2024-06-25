import  {AxiosResponse} from 'axios';
import instance from '../httpInterceptor';
import baseUrl from '../urls/baseUrl';
import { ERROR_TEXTS } from 'src/constants';

const ChatServices = {
  saveFCMToken: async ({fcmToken}: {fcmToken: string | null}) => {
    try {
      const response: AxiosResponse = await instance.post(
        `${baseUrl}/api/v1/auth/firebase/saveFCMToken`,{
          fcmToken
        }

      );
      if (response.status === 200) {
        return response.message;
      } else {
        console.error('Error in saveFCMToken');
      }
    } catch (error: any) {
      console.error('Error in saveFCMToken:', error.message);
    }
  },
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
      
      if ( response.status === 200) {
        return response.data; 
      }
    } catch (error: any) {
      console.error('Error in getMessages:', error.message);
    }
  },

  sendMessages: async ({ message, receiverId }: { message: string; receiverId?: string }) => {
    try {
      const response: AxiosResponse = await instance.post(
        `${baseUrl}/api/v1/chat/sendMessage`, 
        {
          message, receiverId
        }
      );
      
      if ( response.status ===200) {
        return response.data; 
      }
    } catch (error: any) {
      console.error('Error in sendMessages:', error.message);
    }
  },
  sendFamilyMessage: async ({ message, familyId }: { message: string; familyId?: number }) => {
    try {
      const response: AxiosResponse = await instance.post(
        `${baseUrl}/api/v1/chat/sendFamilyMessage`, 
        {
          message, familyId
        }
      );
      
      if ( response.status === 200) {
        return response.data; 
      }
    } catch (error: any) {
      console.error('Error in sendFamilyMessage:', error.message);
    }
  },
  sendImageMessage: async ({ uri, receiverId }: { uri: string; receiverId?: string }) => {
    try {
      const createFormData = (uri: string, receiverId?: string): FormData => {
        let formData = new FormData();
        let filename = uri.split('/').pop()!;
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        const file = {
          uri,
          name: filename,
          type,
        };
        formData.append('image', file);
        formData.append('receiverId', receiverId);

        return formData;
      };

      const response: AxiosResponse = await instance.post(
        `${baseUrl}/api/v1/chat/sendImageMessage`, 
        createFormData(uri, receiverId),
          {
            
            headers: {
              'Content-Type': 'multipart/form-data',
              accept: '*/*',
            },
           
          }
      );
      
      if ( response.status === 200) {
        return response.data; 
      }
    } catch (error: any) {
      console.error('Error in sendImageMessage:', error.message);
    }
  },
  sendFamilyImage: async ({ uri, familyId }: { uri: string; familyId: number | undefined }) => {
    try {
      const createFormData = (uri: string, familyId?: number): FormData => {
        let formData = new FormData();
        let filename = uri.split('/').pop()!;
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        const file = {
          uri,
          name: filename,
          type,
        };
        formData.append('image', file);
        formData.append('familyId', familyId);

        return formData;
      };

      const response: AxiosResponse = await instance.post(
        `${baseUrl}/api/v1/chat/sendFamilyImage`, 
        createFormData(uri, familyId),
          {
            
            headers: {
              'Content-Type': 'multipart/form-data',
              accept: '*/*',
            },
           
          }
      );
      
      if ( response.status === 200) {
        return response.data; 
      }
    } catch (error: any) {
      console.error('Error in sendFamilyImage:', error.message);
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
  getFamilyChats: async () => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/chat/getFamilyChats`
      );
      
      if ( response) {
        return response.data; 
      }
    } catch (error: any) {
      console.error('Error in getFamilyChats:', error.message);
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
  GetAllUser: async ({search }: {search: string }) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/chat/getLinkedUser`,{
          params: {
            search,
          }
        }
      );
      if ( response) {
        return response.data; 
      }
    } catch (error: any) {
      console.error('Error in getAllUser:', error.message);
    }
  },

  sendVideoMessage: async ( id_user: string | undefined, uri: string) => {
    try {
      const createFormData = (uri: string): FormData => {
        let formData = new FormData();
        let filename = uri.split('/').pop()!;
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `video/${match[1]}` : `video`;
        formData.append('video', {
          uri,
          name: filename,
          type,
        });
        formData.append('receiverId', String(id_user));

        return formData;
      };
      const response: AxiosResponse = await instance.put(
        `${baseUrl}/api/v1/chat/sendVideoMessage`,
        createFormData(uri),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            accept: '*/*',
          },
          
          
        },
      );
      console.log(response);
      if (response.status === 200) {
        return response.data.data.fileUrl;
      } else {
        throw new Error(ERROR_TEXTS.RESPONSE_ERROR);
      }
    } catch (error: any) {
      console.log('Update Error', error);
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
  sendFamilyVideo: async ( familyId: number | undefined, uri: string) => {
    try {
      const createFormData = (uri: string): FormData => {
        let formData = new FormData();
        let filename = uri.split('/').pop()!;
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `video/${match[1]}` : `video`;
        formData.append('video', {
          uri,
          name: filename,
          type,
        });
        formData.append('familyId', String(familyId));

        return formData;
      };
      const response: AxiosResponse = await instance.put(
        `${baseUrl}/api/v1/chat/sendFamilyVideo`,
        createFormData(uri),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            accept: '*/*',
          },
          
          
        },
      );
      if (response.status === 200) {
        return response.data.data.fileUrl;
      } else {
        throw new Error(ERROR_TEXTS.RESPONSE_ERROR);
      }
    } catch (error: any) {
      console.log('Update Error', error);
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
  
}
export default ChatServices;
