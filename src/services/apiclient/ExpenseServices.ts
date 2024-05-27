import {AxiosResponse} from 'axios';
import ExpenseUrl from '../urls/expenseUrls';
import instance from '../httpInterceptor';
import baseUrl from '../urls/baseUrl';

const ExpenseServices = {
  getExpenseType: async (id_family: number) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/finance/expenseditureType/getExpenseType/${id_family}`,
      );

      if (response.status === 200) {
        //return response.data.data[0].f_get_finance_expenditure_type;
        return response.data.data;
      } else {
        console.error('Error in getExpenseType');
      }
    } catch (error: any) {
      console.error('Error in getExpenseType:', error.message);
    }
  },
  createExpenseType: async (id_family: number | null, name: string) => {
    try {
      const response: AxiosResponse = await instance.post(
        `${baseUrl}/api/v1/finance/expenseditureType/createExpenseType`,
        {
          id_family,
          name,
        },
      );
      if (response.status === 200) {
        return response.status;
      } else {
        console.error('Error in createExpenseType');
      }
    } catch (error: any) {
      console.error('Error in createExpenseType:', error.message);
    }
  },
  getExpenseByYear: async (year: number, id_family?: number) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/finance/expensediture/getExpensebyYear/${id_family}`,
        {
          params: {
            year
          }
        }
      );
      if (response.status === 200) {
        return response.data.data;
      } else {
        console.error('Error in getExpenseByYear');
      }
    } catch (error: any) {
      console.error('Error in getExpenseByYear:', error.message);
    }
        
    },
    getExpenseByMonth: async (month: number, year: number, id_family?: number) => {
      try {
        const response: AxiosResponse = await instance.get(
          `${baseUrl}/api/v1/finance/expensediture/getExpenseByMonth/${id_family}`,
          {
            params: {
              year, month
            }
          }
        );
        if (response.status === 200) {
          return response.data.data;
        } else {
          console.error('Error in getExpenseByMonth');
        }
      } catch (error: any) {
        console.error('Error in getExpenseByMonth:', error.message);
      }
      
    },
    getExpenseByDate: async (date: string, id_family?: number) => {

      try {
        const response: AxiosResponse = await instance.get(
          `${baseUrl}/api/v1/finance/expensediture/getExpenseByDate/${id_family}`,
          {
            params: {
              date
            }
          }
        );
        if (response.status === 200) {
          return response.data.data;
        } else {
          console.error('Error in getExpenseByDate');
        }
      } catch (error: any) {
        console.error('Error in getExpenseByDate:', error.message);
      }
      
    },
};
export default ExpenseServices;
