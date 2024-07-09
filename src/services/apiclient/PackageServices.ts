import axios, {AxiosResponse} from 'axios';
import instance from '../httpInterceptor';
import {PackageUrl} from '../urls';
import LocalStorage from 'src/store/localstorage';
import {ERROR_TEXTS} from 'src/constants';
import baseUrl from '../urls/baseUrl';

const PackageServices = {
  

  //da xong
  getProfile: async () => {
    try {
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

  getAllPackage: async () => {
    try {
      const response: AxiosResponse = await instance.get(
        PackageUrl.getAllPackage,
       
      );
      if (response.status === 200) {
        return response.data.data;
      } else {
        throw new Error(ERROR_TEXTS.PACKAGE_NOT_FOUND);
      }
    } catch (error: any) {
      console.error('Error in getAllPackages:', error.message);
      throw new Error(ERROR_TEXTS.PACKAGE_NOT_FOUND);
    }
  },

  getExtraPackage: async () => {
    try {
      const response: AxiosResponse = await instance.get(
        PackageUrl.getExtraPackage,
      );
      if (response.status === 200) {
        return response.data.data;
      } else {
        throw new Error(ERROR_TEXTS.PACKAGE_NOT_FOUND);
      }
    } catch (error: any) {
      console.error('Error in getAllPackages:', error.message);
      throw new Error(ERROR_TEXTS.PACKAGE_NOT_FOUND);
    }
  },

  getComboPackage: async () => {
    try {
      const response: AxiosResponse = await instance.get(
        PackageUrl.getComboPackage,
      );
      if (response.status === 200) {
        return response.data.data;
      } else {
        throw new Error(ERROR_TEXTS.PACKAGE_NOT_FOUND);
      }
    } catch (error: any) {
      console.error('Error in getAllPackages:', error.message);
      throw new Error(ERROR_TEXTS.PACKAGE_NOT_FOUND);
    }
  },
  getAvailableFunction: async (id_family?: number) => {
    try {
      const response: AxiosResponse = await instance.get(
        PackageUrl.getAvailableFunction + `/${id_family}`,
      );
      if (response.status === 200) {
        return response.data.data.extra_packages;
      } else {
        throw new Error(ERROR_TEXTS.PACKAGE_NOT_FOUND);
      }
    } catch (error: any) {
      console.error('Error in getAllPackages:', error.message);
      throw new Error(ERROR_TEXTS.PACKAGE_NOT_FOUND);
    }
  },

  createPaymentURL: async (id_main_package?: number, bankCode?: string , ) => {
    try {
      console.log( id_main_package, bankCode)
      const response: AxiosResponse = await instance.post(
        PackageUrl.createPaymentURL,
        {
          id_main_package,
          bankCode
        },
      );



      if (response.status === 200) {
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
  paymentHistory: async (itemsPerPage: number, page: number ) => {
    try {
      const response: AxiosResponse = await instance.get(
        PackageUrl.paymentHistory,
        {
          params: {
            itemsPerPage, page
          }
        },
      );
      if (response.status === 200) {
        return response.data.data;
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
