import {AxiosResponse} from 'axios';
import ExpenseUrl from '../urls/expenseUrls';
import instance from '../httpInterceptor';
import baseUrl from '../urls/baseUrl';

const IncomeServices = {
  getIncomeType: async (id_family: number) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/finance/incomeSource/getIncomeSource/${id_family}`,
      );
      if (response.status === 200) {
        return response.data.data;
      } else {
        console.error('Error in getIncomeSource');
      }
    } catch (error: any) {
      console.error('Error in getIncomeSource:', error.message);
    }
  },
  getIncomeByYear: async (year: number, id_family?: number) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/finance/income/getIncomeByYear/${id_family}`,
        {
          params: {
            year
          }
        }
      );
      if (response.status === 200) {
        return response.data.data;
      } else {
        console.error('Error in getIncomeByYear');
      }
    } catch (error: any) {
      console.error('Error in getIncomeByYear:', error.message);
    }
        
    },
    getIncomeByMonth: async (month: number, year: number, id_family?: number) => {
      try {
        const response: AxiosResponse = await instance.get(
          `${baseUrl}/api/v1/finance/income/getIncomeByMonth/${id_family}`,
          {
            params: {
              year, month
            }
          }
        );
        if (response.status === 200) {
          return response.data.data;
        } else {
          console.error('Error in getIncomeByMonth');
        }
      } catch (error: any) {
        console.error('Error in getIncomeByMonth:', error.message);
      }
      
    },
    getIncomeByDate: async (date: string, id_family?: number) => {
      try {
        const response: AxiosResponse = await instance.get(
          `${baseUrl}/api/v1/finance/income/getIncomeByDate/${id_family}`,
          {
            params: {
              date
            }
          }
        );
        if (response.status === 200) {
          return response.data.data;
        } else {
          console.error('Error in getIncomeByDate');
        }
      } catch (error: any) {
        console.error('Error in getIncomeByDate:', error.message);
      }
      
    },
};
export default IncomeServices;
