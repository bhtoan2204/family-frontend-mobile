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
        return null;
      }
    } catch (error: any) {
      return null;
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
        return null;
      }
    } catch (error: any) {
      return null;
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
        return null;
      }
    } catch (error: any) {
      return null;
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
        return null;
      }
    } catch (error: any) {
      return null;
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
        return null;
      }
    } catch (error: any) {
      return null;
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
        return null;
      }
    } catch (error: any) {
      return null;
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
        return null;
      }
    } catch (error: any) {
      return null;
    }
  },

  createPaymentURL: async (
    id_main_package?: number | null,
    id_extra_package?: number | null,
    id_combo_package?: number | null,
    id_family?: number | null,
    bankCode?: string | null,
    code?: string | null,
  ) => {
    try {
      const payload = {
        ...(id_main_package !== null && {id_main_package}),
        ...(id_extra_package !== null && {id_extra_package}),
        ...(id_combo_package !== null && {id_combo_package}),
        ...(id_family !== null && {id_family}),
        ...(bankCode !== null && {bankCode}),
        ...(code !== null && {code}),
      };

      console.log(payload);

      const response: AxiosResponse = await instance.post(
        PackageUrl.createPaymentURL,
        payload,
      );

      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
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
        console.log('ReturnURL:', response.data);
      } else {
        return null;
      }
    } catch (error: any) {
      return null;
    }
  },
  paymentHistory: async (itemsPerPage: number, page: number) => {
    try {
      const response: AxiosResponse = await instance.get(
        PackageUrl.paymentHistory,
        {
          params: {
            itemsPerPage,
            page,
            sortBy: 'created_at',
            sortDirection: 'DESC',
          },
        },
      );
      if (response.status === 200) {
        return response.data.data;
      } else {
        return null;
      }
    } catch (error: any) {
      return null;
    }
  },
  // getUrl: () => {
  //   console.log('getUrl called');
  //   setWebViewUrl(`${PaymentUrl}/payment/vnpay_return`);
  // },
};
export default PackageServices;
