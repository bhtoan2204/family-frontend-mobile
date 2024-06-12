import {AxiosResponse} from 'axios';
import {ERROR_TEXTS} from 'src/constants';
import instance from '../httpInterceptor';
import {ProfileUrl} from '../urls';
import {ImagePickerAsset} from 'expo-image-picker';

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
    // phone,
    // email,
  }: {
    firstname: string;
    lastname: string;
    // phone: string;
    // email: string;
  }) => {
    try {
      const response: AxiosResponse = await instance.put(
        ProfileUrl.updateProfile,
        {
          firstname,
          lastname,
          // phone,
          // email,
        },
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(ERROR_TEXTS.RESPONSE_ERROR);
      }
    } catch (error: any) {
      console.log('Update Error', error);
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
    const response: AxiosResponse = await instance.post(
      ProfileUrl.changePassword,
      {
        oldPassword,
        newPassword,
        confirmPassword,
      },
    );

    console.log(response)
    if (response.status === 200) {
      return response.data.message;
    } else {
      throw new Error(response.data.statusCode);
    }
  },
  changeAvatar: async (uri: string) => {
    try {
      const createFormData = (uri: string): FormData => {
        let formData = new FormData();
        let filename = uri.split('/').pop()!;
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        const file = {
          uri,
          name: filename,
          type,
        };
        formData.append('avatar', file);

        return formData;
      };
      const response: AxiosResponse = await instance.put(
        ProfileUrl.changeAvatar,
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
};

export default ProfileServices;
