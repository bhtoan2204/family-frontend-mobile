import axios, {AxiosResponse} from 'axios';
import instance from '../httpInterceptor';
import {PackageUrl} from '../urls';
import LocalStorage from 'src/store/localstorage';
import {ERROR_TEXTS} from 'src/constants';
import baseUrl from '../urls/baseUrl';

const PackageServices = {
  //da xong
  getPackage: async ({id_package}: {id_package: number}) => {
    try {
      console.log('getPackage called with id:', id_package);
      const response: AxiosResponse = await instance.get(
        PackageUrl.getPackage,
        {
          params: {
            id_package,
          },
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(ERROR_TEXTS.PACKAGE_NOT_FOUND);
      }
    } catch (error: any) {
      console.error('Error in getPackage:', error.message);
      throw new Error(ERROR_TEXTS.PACKAGE_NOT_FOUND);
    }
  },

  //da xong
  getProfile: async () => {
    try {
      console.log('getProfile called');
      const response: AxiosResponse = await instance.get(
        PackageUrl.getProfile,
        {
          headers: {
            Authorization: `Bearer ${await LocalStorage.GetAccessToken()}`,
          },
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(ERROR_TEXTS.USER_NOT_FOUND);
      }
    } catch (error: any) {
      console.error('Error in getProfile:', error.message);
      throw new Error(ERROR_TEXTS.USER_NOT_FOUND);
    }
  },

  //da xong
  getBankInfo: async () => {
    try {
      console.log('getBankInfo called');
      const response: AxiosResponse = await instance.get(PackageUrl.banksInfo, {
        headers: {
          Authorization: `Bearer ${await LocalStorage.GetAccessToken()}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(ERROR_TEXTS.BANK_INFO_NOT_FOUND);
      }
    } catch (error: any) {
      console.error('Error in getBankInfo:', error.message);
      throw new Error(ERROR_TEXTS.BANK_INFO_NOT_FOUND);
    }
  },

  //da xong
  getPaymentMethod: async () => {
    try {
      console.log('getPaymentMethod called');
      const response: AxiosResponse = await instance.get(
        PackageUrl.getPaymentMethod,
        {
          headers: {
            Authorization: `Bearer ${await LocalStorage.GetAccessToken()}`,
          },
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(ERROR_TEXTS.BANK_INFO_NOT_FOUND);
      }
    } catch (error: any) {
      console.error('Error in getPaymentMethod:', error.message);
      throw new Error(ERROR_TEXTS.BANK_INFO_NOT_FOUND);
    }
  },

  //da xong
  getAllPackage: async () => {
    try {
      console.log('getAllPackage called');
      const response: AxiosResponse = await instance.get(
        PackageUrl.getAllPackage,
        {
          headers: {
            Authorization: `Bearer ${await LocalStorage.GetAccessToken()}`,
          },
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(ERROR_TEXTS.PACKAGE_NOT_FOUND);
      }
    } catch (error: any) {
      console.error('Error in getAllPackages:', error.message);
      throw new Error(ERROR_TEXTS.PACKAGE_NOT_FOUND);
    }
  },

  //da xong
  createPaymentURL: async ({
    id_package,
    id_family,
    bankCode,
    amount,
    language,
    method,
  }: {
    id_package: number;
    id_family: number;
    bankCode: string;
    amount: number;
    language: string;
    method: string;
  }) => {
    try {
      const response: AxiosResponse = await instance.post(
        PackageUrl.createPaymentURL,
        {
          id_package,
          id_family,
          bankCode,
          amount,
          language,
          method,
        },
      );
      const isSuccess = response.data.isSuccess;
      const paymentUrl = response.data.paymentUrl;

      console.log('Success:', isSuccess);
      console.log('Payment URL:', paymentUrl);

      if (response.data.isSuccess === true) {
        return response.data;
      } else {
        throw new Error(ERROR_TEXTS.CREATE_ORDER_ERROR);
      }
    } catch (error) {
      console.error(error);
      throw new Error(ERROR_TEXTS.CREATE_ORDER_ERROR);
    }
  },
  //danglam
  getReturnUrl: async () => {
    try {
      console.log('getUrl called');
      const response: AxiosResponse = await axios.get(
        `${baseUrl}/payment/vnpay_return`,
      );
      if (response.status === 200) {
        console.log('ReturnURL:', response.data); // Log message từ server
      } else {
        throw new Error('Error: Data not found');
      }
    } catch (error: any) {
      console.error('Error in getUrl:', error.message);
      if (error.code === 'ECONNABORTED') {
        console.error('Request timed out. Please try again.');
      } else {
        throw new Error('Error: Data not found');
      }
    }
  },
  getOrderSucessful: async () => {
    try {
      console.log('getPurchased called');
      const response: AxiosResponse = await instance.get(
        PackageUrl.getOrderSucessful,
        {
          headers: {
            Authorization: `Bearer ${await LocalStorage.GetAccessToken()}`,
          },
        },
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(ERROR_TEXTS.PACKAGE_NOT_FOUND);
      }
    } catch (error: any) {
      console.error('Error in getAllPackages:', error.message);
      throw new Error(ERROR_TEXTS.PACKAGE_NOT_FOUND);
    }
  },
  // getUrl: () => {
  //   console.log('getUrl called');
  //   setWebViewUrl(`${PaymentUrl}/payment/vnpay_return`);
  // },
};
export default PackageServices;
