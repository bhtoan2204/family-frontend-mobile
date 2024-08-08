import {AxiosResponse} from 'axios';
import {ERROR_TEXTS} from 'src/constants';
import instance from '../httpInterceptor';
import {ProfileUrl} from '../urls';
import {ImagePickerAsset} from 'expo-image-picker';
import {Alert} from 'react-native';
import baseUrl from '../urls/baseUrl';

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
  getNotification: async (index: number) => {
    try {
      const response: AxiosResponse = await instance.get(
        ProfileUrl.getNotification + `/${index}`,
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
  markAllRead: async () => {
    try {
      const response: AxiosResponse = await instance.get(
        ProfileUrl.markAllRead,
      );

      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  },
  getUserInfoByPhone: async (phone: string) => {
    try {
      const response: AxiosResponse = await instance.get(
        ProfileUrl.getUserInfoByPhone,
        {
          params: {
            phone,
          },
        },
      );

      if (response.status === 200) {
        return response.data.data;
      }
    } catch (error) {}
  },
  getUserInfoByEmail: async (email: string) => {
    try {
      const response: AxiosResponse = await instance.get(
        ProfileUrl.getUserInfoByEmail,
        {
          params: {
            email,
          },
        },
      );

      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
  markRead: async (index: string) => {
    try {
      const response: AxiosResponse = await instance.get(
        ProfileUrl.markRead + `/${index}`,
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
  createFeedback: async (rating: number, comment: string) => {
    try {
      const response: AxiosResponse = await instance.post(
        `${baseUrl}/api/v1/feedback`,
        {
          comment,
          rating,
        },
      );

      if (response.status === 201) {
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
    genre,
    birthdate,
  }: {
    firstname: string;
    lastname: string;
    genre: string;
    birthdate: string;
  }) => {
    try {
      const response: AxiosResponse = await instance.put(
        ProfileUrl.updateProfile,
        {
          firstname,
          lastname,
          genre,
          birthdate,
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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      Alert.alert(
        'Error',
        'New password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one number.',
      );
      return;
    }

    try {
      const response: AxiosResponse = await instance.post(
        ProfileUrl.changePassword,
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Password changed successfully');
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      if (error.response) {
        Alert.alert('Error', error.response.data.message);
      } else if (error.request) {
        Alert.alert('Error', 'No response from server. Please try again.');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
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

export default ProfileServices;
