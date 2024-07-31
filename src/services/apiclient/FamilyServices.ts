import axios, {AxiosResponse} from 'axios';
import {ERROR_TEXTS} from 'src/constants';
import {FamilyUrl} from '../urls';
import instance from '../httpInterceptor';
import LocalStorage from 'src/store/localstorage';

const familyErrorDat = {
  data: [
    {
      id: 140,
      id_user: 'db31bfb8-ec15-4cb1-9cbe-ebe3edaca323',
      id_family: 96,
      role: 'Member',
      created_at: '2024-04-03T05:02:07.477Z',
      updated_at: '2024-04-03T05:02:07.477Z',
      user: {
        id_user: 'db31bfb8-ec15-4cb1-9cbe-ebe3edaca323',
        email: 'klong31122001@gmail.com',
        phone: '+84974649112',
        firstname: 'Tang',
        lastname: 'Long',
        created_at: '2024-03-27T12:50:46.067Z',
        updated_at: '2024-03-27T12:50:46.067Z',
        isphoneverified: false,
        login_type: 'local',
        avatar:
          'https://static.vecteezy.com/system/resources/previews/020/911/740/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png',
        genre: null,
        birthdate: null,
      },
    },
    {
      id: 142,
      id_user: '28905675-858b-4a93-a283-205899779622',
      id_family: 96,
      role: 'Member',
      created_at: '2024-04-06T13:02:49.132Z',
      updated_at: '2024-04-06T13:02:49.132Z',
      user: {
        id_user: '28905675-858b-4a93-a283-205899779622',
        email: 'tthien@gmail.com',
        phone: '+84886725044',
        firstname: 'Hiền',
        lastname: 'Thu',
        created_at: '2024-03-11T15:08:54.552Z',
        updated_at: '2024-03-20T20:24:06.620Z',
        isphoneverified: false,
        login_type: 'local',
        avatar:
          'https://storage.googleapis.com/famfund-bucket/avatar/avatar_28905675-858b-4a93-a283-205899779622_1717948664029_77E37648-6EDA-406D-920A-2B32C9E3F0F5.jpg',
        genre: null,
        birthdate: null,
      },
    },
    {
      id: 3,
      id_user: '9e153f4a-7c30-4e6f-a1bd-157a6eea5885',
      id_family: 96,
      role: 'Member',
      created_at: '2024-06-22T10:46:59.352Z',
      updated_at: '2024-06-22T10:46:59.352Z',
      user: {
        id_user: '9e153f4a-7c30-4e6f-a1bd-157a6eea5885',
        email: 'thuhien21052002@gmail.com',
        phone: null,
        firstname: 'Hiền',
        lastname: 'Thu',
        created_at: '2024-06-08T15:37:00.433Z',
        updated_at: '2024-06-08T15:37:00.433Z',
        isphoneverified: false,
        login_type: 'local',
        avatar:
          'https://lh3.googleusercontent.com/a/ACg8ocKGwQUqBsPAFOSVmsMfhfv3E-03hYSrnxhFYjfUp-YDQ7J2dY0=s96-c',
        genre: null,
        birthdate: null,
      },
    },
    {
      id: 135,
      id_user: 'bd94ba3a-b046-4a05-a260-890913e09df9',
      id_family: 96,
      role: 'Member',
      created_at: '2024-03-27T09:20:26.437Z',
      updated_at: '2024-03-27T09:20:26.437Z',
      user: {
        id_user: 'bd94ba3a-b046-4a05-a260-890913e09df9',
        email: 'banhhaotoan2002@gmail.com',
        phone: '+84971308623',
        firstname: 'Toan',
        lastname: 'Banh',
        created_at: '2024-03-11T15:09:07.654Z',
        updated_at: '2024-06-26T02:58:45.846Z',
        isphoneverified: true,
        login_type: 'local',
        avatar:
          'https://storage.googleapis.com/famfund-bucket/avatar/avatar_bd94ba3a-b046-4a05-a260-890913e09df9_1719370720327_5C8DC691-5AFD-489C-80BD-51BB87D1EFD6.jpg',
        genre: 'male',
        birthdate: '2002-06-18',
      },
    },
  ],
  message: 'All members of family',
};

const FamilyServices = {
  //da xong
  getAllFamily: async () => {
    try {
      const response: AxiosResponse = await instance.get(
        FamilyUrl.getAllFamily,
        {
          headers: {
            Authorization: `Bearer ${await LocalStorage.GetAccessToken()}`,
          },
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(ERROR_TEXTS.FAMILY_NOT_FOUND);
      }
    } catch (error: any) {
      console.error('Error in getAllFamily:', error.message);
      throw new Error(ERROR_TEXTS.FAMILY_NOT_FOUND);
    }
  },

  //da xong
  getFamily: async ({id_family}: {id_family?: number}) => {
    try {
      const response: AxiosResponse = await instance.get(FamilyUrl.getFamily, {
        params: {
          id_family,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(ERROR_TEXTS.FAMILY_NOT_FOUND);
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.FAMILY_NOT_FOUND);
    }
  },
  checkphone: async ({phone}: {phone?: string}) => {
    // try {
    //   const response: AxiosResponse = await instance.get(FamilyUrl.getFamily, {
    //     params: {
    //       id_family,
    //     },
    //   });
    //   if (response.status === 200) {
    //     return response.data;
    //   } else {
    //     throw new Error(ERROR_TEXTS.FAMILY_NOT_FOUND);
    //   }
    // } catch (error) {
    //   throw new Error(ERROR_TEXTS.FAMILY_NOT_FOUND);
    // }
  },

  //da xong
  createFamily: async ({
    description,
    name,
    id_order,
  }: {
    description?: string;
    name?: string;
    id_order?: number;
  }) => {
    try {
      const response: AxiosResponse = await instance.post(
        FamilyUrl.createFamily,
        {
          description,
          name,
          id_order,
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(ERROR_TEXTS.CREATE_FAMILY_ERROR);
      }
    } catch (error) {
      console.error(error);
      throw new Error(ERROR_TEXTS.CREATE_FAMILY_ERROR);
    }
  },

  updateFamily: async ({
    id_family,
    description,
    name,
  }: {
    id_family?: number;
    description?: string;
    name?: string;
  }) => {
    try {
      const response: AxiosResponse = await instance.put(
        FamilyUrl.updateFamily,
        {
          id_family,
          description,
          name,
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(ERROR_TEXTS.UPDATE_FAMILY_ERROR);
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.UPDATE_FAMILY_ERROR);
    }
  },

  //dang lam
  deleteFamily: async ({id_family}: {id_family?: number}) => {
    try {
      // const response: AxiosResponse = await instance.delete(
      //   `${FamilyUrl.deleteFamily}/${id_family}`,
      // );
      const response: AxiosResponse = await instance.delete(
        FamilyUrl.deleteFamily,
        {
          params: {
            id_family,
          },
        },
      );
      if (response.status === 200) {
        return response;
      } else {
        console.error('Error in deleteFamily: response is', response);
        throw new Error(ERROR_TEXTS.DELETE_FAMILY_ERROR);
      }
    } catch (error: any) {
      console.error('Error in deleteFamily:', error.message);
      throw new Error(ERROR_TEXTS.DELETE_FAMILY_ERROR);
    }
  },

  //da xong
  getAllMembers: async (search: string, id_family?: number) => {
    try {
      const response: AxiosResponse = await instance.get(
        FamilyUrl.getAllMembers,
        {
          params: {
            id_family,
            search,
          },
        },
      );
      if (response.status === 200) {
        return response.data.data;
      } else {
        return familyErrorDat;
      }
    } catch (error) {
      return familyErrorDat;
      throw new Error(ERROR_TEXTS.MEMBER_NOT_FOUND);
    }
  },

  getMember: async ({id_user}: {id_user?: string}) => {
    try {
      const response: AxiosResponse = await instance.get(FamilyUrl.getMember, {
        params: {
          id_user,
        },
      });
      if (response) {
        return response;
      } else {
        throw new Error(ERROR_TEXTS.MEMBER_NOT_FOUND);
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.MEMBER_NOT_FOUND);
    }
  },
  //da xong
  addMember: async ({
    id_family,
    gmail,
    phone,
  }: {
    id_family?: number;
    gmail?: string;
    phone?: string;
  }) => {
    try {
      const response: AxiosResponse = await instance.post(FamilyUrl.addMember, {
        id_family,
        gmail,
        phone,
      });
      if (response.status === 201) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      //console.error('Error in addMember:', error);
    }
  },

  kickMember: async (id_user: string, id_family: number) => {
    try {
      const response: AxiosResponse = await instance.delete(
        `${FamilyUrl.kickMember}`,
        {
          params: {
            id_user,
            id_family,
          },
        },
      );
      if (response.status === 204) {
        return 'Successful';
      } else {
        throw new Error(ERROR_TEXTS.DELETE_MEMBER_ERROR);
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.DELETE_MEMBER_ERROR);
    }
  },

  leaveFamily: async (id_family?: number) => {
    try {
      const response: AxiosResponse = await instance.delete(
        `${FamilyUrl.leaveFamily}`,
        {
          params: {
            id_family,
          },
        },
      );

      if (response.status === 204) {
        return 'Successful';
      } else {
        throw new Error(ERROR_TEXTS.DELETE_MEMBER_ERROR);
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.DELETE_MEMBER_ERROR);
    }
  },
  inviteMember: async (familyId?: number) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${FamilyUrl.inviteMember}`,
        {
          params: {
            id_family: familyId,
          },
        },
      );
      if (response.status === 201) {
        return response.data.data;
      } else {
        throw new Error(ERROR_TEXTS.DELETE_MEMBER_ERROR);
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.DELETE_MEMBER_ERROR);
    }
  },
  changeAvatar: async (id_family: number | undefined, uri: string) => {
    try {
      const createFormData = (uri: string): FormData => {
        let formData = new FormData();
        let filename = uri.split('/').pop()!;
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        formData.append('avatar', {
          uri,
          name: filename,
          type,
        });
        formData.append('id_family', String(id_family));

        return formData;
      };
      const response: AxiosResponse = await instance.put(
        FamilyUrl.changeAvatar,
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
        return response.data.data;
      } else {
        throw new Error(ERROR_TEXTS.RESPONSE_ERROR);
      }
    } catch (error: any) {
      console.log('Update Error', error);
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
};

export default FamilyServices;
