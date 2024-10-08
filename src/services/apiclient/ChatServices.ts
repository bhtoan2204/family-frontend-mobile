import {AxiosResponse} from 'axios';
import instance from '../httpInterceptor';
import baseUrl from '../urls/baseUrl';
import {ERROR_TEXTS} from 'src/constants';

const ChatServices = {
  saveFCMToken: async ({fcmToken}: {fcmToken: string | null}) => {
    try {
      const response: AxiosResponse = await instance.post(
        `${baseUrl}/api/v1/auth/firebase/saveFCMToken`,
        {
          fcmToken,
        },
      );
      if (response.status === 200) {
        return response.message;
      } else {
        return null;
      }
    } catch (error: any) {
      return null;
    }
  },
  GetFamilyMessages: async ({
    id_family,
    index,
  }: {
    id_family?: number;
    index: number;
  }) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/chat/getFamilyMessages/${id_family}/${index}`,
      );
      if (response && response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error: any) {
      return null;
    }
  },
  GetMessages: async ({id_user, index}: {id_user?: string; index: number}) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/chat/getMessages/${id_user}/${index}`,
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error: any) {
      return [];
    }
  },

  sendMessages: async ({
    message,
    receiverId,
  }: {
    message: string;
    receiverId?: string;
  }) => {
    try {
      const response: AxiosResponse = await instance.post(
        `${baseUrl}/api/v1/chat/sendMessage`,
        {
          message,
          receiverId,
        },
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error: any) {
      return null;
    }
  },
  sendFamilyMessage: async ({
    message,
    familyId,
  }: {
    message: string;
    familyId?: number;
  }) => {
    try {
      const response: AxiosResponse = await instance.post(
        `${baseUrl}/api/v1/chat/sendFamilyMessage`,
        {
          message,
          familyId,
        },
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error: any) {
      return null;
    }
  },
  sendImageMessage: async ({
    uri,
    receiverId,
  }: {
    uri: string;
    receiverId?: string;
  }) => {
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
        },
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error: any) {
      return null;
    }
  },
  sendFamilyImage: async ({
    uri,
    familyId,
  }: {
    uri: string;
    familyId: number | undefined;
  }) => {
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
        },
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error: any) {
      return null;
    }
  },

  GetUserChat: async ({index}: {index: number}) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/chat/getUsersChat/${index}`,
      );

      if (response) {
        return response.data;
      }
    } catch (error: any) {
      return null;
    }
  },

  createRoom: async () => {
    try {
      const response: AxiosResponse = await instance.post(
        `${baseUrl}/api/v1/chat/createRoom`,
      );

      if (response.status === 201) {
        return response.data.roomId;
      }
    } catch (error: any) {
      return null;
    }
  },
  getFamilyChats: async () => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/chat/getFamilyChats`,
      );

      if (response) {
        return response.data;
      }
    } catch (error: any) {
      return null;
    }
  },
  markSeenMessage: async ({receiver_id}: {receiver_id?: string}) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/chat/markSeenMessage/${receiver_id}`,
      );

      if (response) {
        return response.data;
      }
    } catch (error: any) {
      return null;
    }
  },
  GetAllUser: async ({search}: {search: string}) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/chat/getLinkedUser`,
        {
          params: {
            search,
          },
        },
      );
      if (response) {
        return response.data;
      }
    } catch (error: any) {
      return null;
    }
  },
  removeMessage: async (receiver_id: string, id_message: string) => {
    try {
      console.log(receiver_id, id_message);
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/chat/removeMessage/${receiver_id}/${id_message}`,
      );
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      return false;
    }
  },

  removeMessageFamily: async (id_family: number, id_message: string) => {
    try {
      console.log(id_family, id_message);
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/chat/removeFamilyMessage/${id_family}/${id_message}`,
      );
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      return false;
    }
  },

  sendVideoMessage: async (id_user: string | undefined, uri: string) => {
    try {
      const createFormData = (
        uri: string,
        id_user: string | undefined,
      ): FormData => {
        let formData = new FormData();
        let filename = uri.split('/').pop()!;
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `video/${match[1]}` : `video`;
        const file = {
          uri,
          name: filename,
          type,
        };
        formData.append('video', file);
        formData.append('receiverId', String(id_user));

        return formData;
      };
      const response: AxiosResponse = await instance.post(
        `${baseUrl}/api/v1/chat/sendVideoMessage`,
        createFormData(uri, id_user),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            accept: '*/*',
          },
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error: any) {
      return null;
    }
  },
  sendFamilyVideo: async (familyId: number | undefined, uri: string) => {
    try {
      const createFormData = (uri: string): FormData => {
        let formData = new FormData();
        let filename = uri.split('/').pop()!;
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `video/${match[1]}` : `video`;
        const file = {
          uri,
          name: filename,
          type,
        };
        formData.append('video', file);
        formData.append('familyId', String(familyId));
        return formData;
      };
      const response: AxiosResponse = await instance.post(
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
        return response.data;
      } else {
        return null;
      }
    } catch (error: any) {
      return null;
    }
  },
};
export default ChatServices;
