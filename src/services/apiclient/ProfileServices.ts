import {AxiosResponse} from 'axios';
import {ERROR_TEXTS} from 'src/constants';
import instance from '../httpInterceptor';
import {ProfileUrl} from '../urls';

const ProfileServices = {
  profile: async () => {
    try {
      const response: AxiosResponse = await instance.get(ProfileUrl.profile);

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(ERROR_TEXTS.RESPONSE_ERROR);
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
  updateProfile: async ({
    firstname,
    lastname,
    phone,
    email,
  }: {
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
  }) => {
    try {
      const response: AxiosResponse = await instance.put(
        ProfileUrl.updateProfile,
        {
          firstname,
          lastname,
          phone,
          email,
        },
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(ERROR_TEXTS.RESPONSE_ERROR);
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
  changePassword: async ({
    oldPassword,
    newPassword,
    confirmPassword,
  }: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      const response: AxiosResponse = await instance.post(
        ProfileUrl.changePassword,
        {
          oldPassword,
          newPassword,
          confirmPassword
        },
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(ERROR_TEXTS.RESPONSE_ERROR);
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
};

export default ProfileServices;
