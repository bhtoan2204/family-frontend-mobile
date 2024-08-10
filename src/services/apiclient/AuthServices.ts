import axios, {AxiosResponse} from 'axios';
import {ERROR_TEXTS} from 'src/constants';
import {AuthUrl} from '../urls';
import instance from '../httpInterceptor';
import LocalStorage from 'src/store/localstorage';

const AuthServices = {
  login: async ({email, password}: {email: string; password: string}) => {
    try {
      const url = AuthUrl.login;
      console.log('Login URL:', url);
      const response: AxiosResponse = await axios.post(AuthUrl.login, {
        email,
        password,
      });
      const userData = response.data;

      if (response.status === 200) {
        return userData;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },

  signup: async ({
    email,
    password,
    firstname,
    lastname,
    phone,
    genre,
    birthdate,
  }: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    phone: string;
    genre: string;
    birthdate: string;
  }) => {
    try {
      const response: AxiosResponse = await axios.post(AuthUrl.signup, {
        email,
        phone,
        password,
        firstname,
        lastname,
        genre,
        birthdate,
      });
      const userData = response.data;
      if (response.status === 200) {
        return userData;
      } else {
        //throw new Error(`Signup error: ${response.statusText}`);
      }
    } catch (error) {
      return null;
    }
  },

  sendOTPVerify: async ({email, phone}: {email?: string; phone?: string}) => {
    try {
      const payload: {email?: string; phone?: string} = {};
      if (email) payload.email = email;
      if (phone) payload.phone = phone;

      const response: AxiosResponse = await axios.post(
        AuthUrl.sendOTPVerify,
        payload,
      );
      const userData = response.data;
      if (response.status === 200) {
        return userData;
      } else {
        return null;
      }
    } catch (error: unknown) {
      return null;
    }
  },

  verifyOTP: async ({
    email,
    phone,
    code,
  }: {
    email?: string;
    phone?: string;
    code: string;
  }) => {
    try {
      const payload: {email?: string; phone?: string; code: string} = {
        email,
        phone,
        code,
      };

      Object.keys(payload).forEach(key => {
        if (payload[key as keyof typeof payload] === undefined) {
          delete payload[key as keyof typeof payload];
        }
      });

      console.log('verifyOTP params:', payload);

      const response: AxiosResponse = await axios.post(
        AuthUrl.verifyOTP,
        payload,
      );
      const userData = response.data;
      if (response.status === 200) {
        return userData;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },

  resetPassword: async ({
    email,
    phone,
    code,
    password,
  }: {
    email?: string;
    phone?: string;
    code: string;
    password: string;
  }) => {
    try {
      const payload: {
        email?: string;
        phone?: string;
        code: string;
        password: string;
      } = {code, password};

      if (email) {
        payload.email = email;
      } else if (phone) {
        payload.phone = phone;
      }

      const response: AxiosResponse = await axios.post(
        AuthUrl.resetPassword,
        payload,
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return null;
    }
  },

  checkOTP: async ({
    email,
    phone,
    code,
  }: {
    email: string;
    phone: string;
    code: string;
  }) => {
    try {
      if (email) {
        const response: AxiosResponse = await axios.post(
          AuthUrl.checkOTPForgotPassword,
          {
            email: email,
            code: code,
          },
        );
        if (response.status === 200) {
          return response.data;
        } else if (phone) {
          const response: AxiosResponse = await axios.post(
            AuthUrl.forgotPassword,
            {
              phone: phone,
              code: code,
            },
          );
          if (response.status === 200) {
            return response.data;
          }
        }
      }
    } catch (error) {
      return null;
    }
  },

  forgotPassword: async ({email, phone}: {email: string; phone: string}) => {
    try {
      if (email) {
        const response: AxiosResponse = await axios.post(
          AuthUrl.forgotPassword,
          {
            email: email,
          },
        );
        if (response.status === 200) {
          return response.data;
        } else if (phone) {
          const response: AxiosResponse = await axios.post(
            AuthUrl.forgotPassword,
            {
              phone: phone,
            },
          );
          if (response.status === 200) {
            return response.data;
          }
        }
      }
    } catch (error) {
      return null;
    }
  },

  refreshToken: async () => {
    try {
      const response: AxiosResponse = await axios.post(AuthUrl.refreshToken);
      const tokenData = response.data;
      if (response.statusText === 'OK') {
        return {
          accessToken: tokenData.accessToken,
          refreshToken: tokenData.refreshToken,
        };
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },
  googleLogin: async () => {
    try {
      const response: AxiosResponse = await axios.post(AuthUrl.googleLogin);

      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },
  facebookLogin: async () => {
    try {
      const response: AxiosResponse = await axios.post(AuthUrl.facebookLogin);

      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error: any) {
      return null;
    }
  },
  Logout: async () => {
    try {
      const response: AxiosResponse = await instance.get(AuthUrl.logout);
      if (response.status === 200) {
        await LocalStorage.RemoveAccessToken();
        await LocalStorage.RemoveRefreshToken();
        await LocalStorage.RemoveUserData();

        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      return false;
    }
  },
};

export default AuthServices;
