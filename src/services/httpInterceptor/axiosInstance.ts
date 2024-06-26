import axios from 'axios';
import { ERROR_TEXTS } from 'src/constants';
import LocalStorage from 'src/store/localstorage';
import baseUrl from '../urls/baseUrl';
import { AuthUrl } from '../urls';

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});


const refreshToken = async () => {
  try {
    const response = await axios.post(AuthUrl.refreshToken);
    const tokenData = response.data;
    if (response.statusText === 'OK') {
      return {
        accessToken: tokenData.accessToken,
        refreshToken: tokenData.refreshToken,
      };
    } else {
      throw new Error(ERROR_TEXTS.RESPONSE_ERROR);
    }
  } catch (error) {
    throw new Error(ERROR_TEXTS.API_ERROR);
  }
};

instance.interceptors.request.use(async request => {
  const accessToken = await LocalStorage.GetAccessToken();
  request.headers.Authorization = `Bearer ${accessToken}`;
  return request;
});

instance.interceptors.response.use(
  response => response,
  async error => {
    const config = error?.config;
    if (error?.response?.status === 401 && !config.sent) {
      config.sent = true;

      try {
        const { accessToken, refreshToken: newRefreshToken } = await refreshToken();

        if (accessToken && newRefreshToken) {
          await LocalStorage.StoreAccessToken(accessToken);
          await LocalStorage.StoreRefreshToken(newRefreshToken);

          const AccessToken = await LocalStorage.GetAccessToken();

          const newConfig = { ...config };
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
    return Promise.reject(error);
  }
);

export default instance;
