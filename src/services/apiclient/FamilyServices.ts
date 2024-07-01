import axios, {AxiosResponse} from 'axios';
import {ERROR_TEXTS} from 'src/constants';
import {FamilyUrl} from '../urls';
import instance from '../httpInterceptor';
import LocalStorage from 'src/store/localstorage';

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

  //dang lam
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
  getAllMembers: async ({ id_family }: { id_family?: number }) => {
    try {
      const response: AxiosResponse = await instance.get(
        FamilyUrl.getAllMembers,
        {
          params: {
            id_family,
          },
        },
      );
      if (response.status === 200) {
        return response.data.data;
      } else {
        throw new Error(ERROR_TEXTS.MEMBER_NOT_FOUND);
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.MEMBER_NOT_FOUND);
    }
  },

  getMember: async ({ id_user }: { id_user?: string }) => {
    try {
      const response: AxiosResponse = await instance.get(
        FamilyUrl.getMember,
        {
          params: {
            id_user
          },
        },
      );
      if (response ) {
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
    role,
  }: {
    id_family?: number;
    gmail?: string;
    phone?: string;
    role?: string;
  }) => {
    try {
      const response: AxiosResponse = await instance.post(FamilyUrl.addMember, {
        id_family,
        gmail,
        phone,
        role,
      });
      if (response.status === 201) {
        
        return response.data;
      } 
    } catch (error) {
      console.error('Error in addMember:', error);
      //throw new Error(ERROR_TEXTS.ADD_MEMBER_ERROR);
    }
  },

  deleteMember: async (familyId?: number, memberId?: string) => {
    try {
      const response: AxiosResponse = await axios.delete(
        `${FamilyUrl.deleteMember}/${familyId}/${memberId}`,
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(ERROR_TEXTS.DELETE_MEMBER_ERROR);
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.DELETE_MEMBER_ERROR);
    }
  },
  inviteMember: async (familyId?: number) => {
    try {
      const response: AxiosResponse =await instance.get(
        `${FamilyUrl.inviteMember}`,
        {
          params: {
            familyId,
          }
        }
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

  changeAvatar: async ( id_family: number | undefined, uri: string) => {
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
