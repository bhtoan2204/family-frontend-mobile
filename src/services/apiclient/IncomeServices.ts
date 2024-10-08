import {AxiosResponse} from 'axios';
import ExpenseUrl from '../urls/expenseUrls';
import instance from '../httpInterceptor';
import baseUrl from '../urls/baseUrl';

const IncomeServices = {
  getUtilityTypes: async () => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/utilities/getUtilityTypes`,
      );
      if (response.status === 200) {
        return response.data.data;
      }
    } catch (error: any) {
      return null;
    }
  },
  createUtility: async (
    id_family?: number,
    id_utilities_type?: number,
    value?: number,
    description?: string,
    utilityImg?: string,
  ) => {
    try {
      const createFormData = (utilityImg?: string): FormData => {
        let formData = new FormData();
        formData.append('id_family', String(id_family));
        formData.append('id_utilities_type', String(id_utilities_type));
        formData.append('value', String(value));
        formData.append('description', String(description));

        if (utilityImg) {
          let filename = utilityImg.split('/').pop()!;
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;
          const file = {
            utilityImg,
            name: filename,
            type,
          };
          formData.append('utilityImg', file);
        }

        return formData;
      };

      const response: AxiosResponse = await instance.post(
        `${baseUrl}/api/v1/utilities/createUtility`,
        createFormData(utilityImg),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            accept: '*/*',
          },
        },
      );

      if (response.status === 201) {
        return response.data.data;
      }
    } catch (error: any) {
      return null;
    }
  },

  getIncomeType: async (id_family?: number) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/finance/incomeSource/getIncomeSource/${id_family}`,
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
  createIncomeType: async (
    id_family: number | null,
    income_source_name: string,
  ) => {
    try {
      const response: AxiosResponse = await instance.post(
        `${baseUrl}/api/v1/finance/incomeSource/createIncomeSource`,
        {
          id_family,
          income_source_name,
        },
      );
      if (response.status === 201) {
        return response.data.data;
      } else {
        return null;
      }
    } catch (error: any) {
      return null;
    }
  },
  deleteIncomeSource: async (
    id_family: number | null,
    id_income_source: number,
  ) => {
    try {
      const response: AxiosResponse = await instance.delete(
        `${baseUrl}/api/v1/finance/incomeSource/deleteIncomeSource/${id_family}/${id_income_source}`,
      );
      if (response.status === 204) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      return false;
    }
  },

  getIncomeByYear: async (year: number, id_family?: number) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/finance/income/getIncomeByYear/${id_family}`,
        {
          params: {
            id_family,
            year,
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
  getIncomeByMonth: async (month: number, year: number, id_family?: number) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/finance/income/getIncomeByMonth/${id_family}`,
        {
          params: {
            year,
            month,
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
  getIncomeByDate: async (date: string, id_family?: number) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/finance/income/getIncomeByDate/${id_family}`,
        {
          params: {
            date,
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
  getIncomeByDateRange: async (
    page: number,
    itemsPerPage: number,
    id_family?: number,
    fromDate: string,
    toDate: string,
  ) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/finance/income/getIncomeByDateRange`,
        {
          params: {
            page,
            itemsPerPage,
            sortBy: 'income_date',
            sortDirection: 'DESC',
            id_family,
            fromDate,
            toDate,
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
  createIncome: async (
    id_family?: number | null,
    amount: number,
    id_created_by?: string,
    id_income_source?: number,
    income_date?: Date,
    description?: string,
  ) => {
    try {
      const response: AxiosResponse = await instance.post(
        `${baseUrl}/api/v1/finance/income/createIncome`,
        {
          id_family,
          id_created_by,
          id_income_source,
          amount,
          income_date,
          description,
        },
      );
      if (response.status === 201) {
        return response.data.data;
      }
    } catch (error: any) {
      return null;
    }
  },

  updateIncome: async (
    id_income?: number,
    id_family: number | null,
    amount: number,
    id_created_by: string,
    id_income_source?: number,
    income_date?: string,
    description?: string,
  ) => {
    try {
      console.log(
        id_income,
        id_family,
        id_created_by,
        id_income_source,
        amount,
        income_date,
        description,
      );
      const response: AxiosResponse = await instance.put(
        `${baseUrl}/api/v1/finance/income/updateIncome`,
        {
          id_income,
          id_family,
          id_income_source,
          amount,
          income_date,
          description,
        },
      );
      if (response.status === 200) {
        return response.data.data;
      }
    } catch (error: any) {
      return null;
    }
  },
  deleteIncome: async (id_income?: number, id_family?: number) => {
    try {
      console.log(id_family, id_income);
      const response: AxiosResponse = await instance.delete(
        `${baseUrl}/api/v1/finance/income/deleteIncome/${id_family}/${id_income}`,
      );
      if (response.status === 204) {
        return true;
      }
    } catch (error: any) {
      return false;
    }
  },
};
export default IncomeServices;
