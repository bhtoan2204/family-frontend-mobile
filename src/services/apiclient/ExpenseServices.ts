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
  getExpense: async (
    page: number,
    itemsPerPage: number,
    id_family?: number,
  ) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/finance/expensediture/getExpense/${id_family}`,
        {
          params: {
            page,
            itemsPerPage,
            id_family,
          },
        },
      );
      if (response.status === 200) {
        return response.data.data;
      } else {
        console.error('Error in getExpense');
      }
    } catch (error: any) {
      console.error('Error in getExpense:', error.message);
    }
  },
};
export default ExpenseServices;
