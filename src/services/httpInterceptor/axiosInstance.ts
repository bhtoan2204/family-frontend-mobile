import axios from 'axios';
import {ERROR_TEXTS} from 'src/constants';
import LocalStorage from 'src/store/localstorage';
import {AuthServices} from '../apiclient';
import baseUrl from '../urls/baseUrl';

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(async request => {
  const accessToken = await LocalStorage.GetAccessToken();
  request.headers.Authorization = `Bearer ${accessToken}`;
  return request;
});

instance.interceptors.response.use(
  response => response,
  async error => {
    const config = error?.config;
    if (error?.response?.status === 401) {
      config.sent = true;

      try {
        const {accessToken, refreshToken} = await AuthServices.refreshToken();

        if (accessToken && refreshToken) {
          await LocalStorage.StoreAccessToken(accessToken);
          await LocalStorage.StoreRefreshToken(refreshToken);

          const AccessToken = await LocalStorage.GetAccessToken();

          const newConfig = {...config};
          newConfig.headers.Authorization = `Bearer ${AccessToken}`;

          return axios(newConfig);
        } else {
          await LocalStorage.RemoveAccessToken();
          await LocalStorage.RemoveRefreshToken();
          await LocalStorage.RemoveUserData();
        }
      } catch (error) {
        await LocalStorage.RemoveAccessToken();
        await LocalStorage.RemoveRefreshToken();
        await LocalStorage.RemoveUserData();
        throw new Error(ERROR_TEXTS.API_ERROR);
      }
    }
  },
);

export default instance;
