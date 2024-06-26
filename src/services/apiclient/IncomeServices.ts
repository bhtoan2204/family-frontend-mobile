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
  createIncomeType: async (id_family: number | null, name: string) => {
    try {
      const response: AxiosResponse = await instance.post(
        `${baseUrl}/api/v1/finance/incomeSource/createIncomeSource`,
        {
          id_family,
          name,
        },
      );
      if (response.status === 200) {
        return response.status;
      } else {
        console.error('Error in createIncomeType');
      }
    } catch (error: any) {
      console.error('Error in createIncomeType:', error.message);
    }
  },
  deleteIncomeSource: async (id_family: number | null, id_income_source : number) => {
    try {
      const response: AxiosResponse = await instance.delete(
        `${baseUrl}/api/v1/finance/incomeSource/deleteIncomeSource/${id_family}/${id_income_source }`,
        
      );
      if (response.status === 204) {
        return response.status;
      } else {
        console.error('Error in deleteIncomeSource');
      }
    } catch (error: any) {
      console.error('Error in deleteIncomeSource:', error.message);
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
    createIncome: async (id_family: number | null, amount: number | null, id_created_by: string, id_income_source?: number, income_date?: Date, description?: string) => {
      try {

        const response: AxiosResponse = await instance.post(
          `${baseUrl}/api/v1/finance/income/createIncome`,
          {
        
              id_family,
              id_created_by,
              id_income_source,
              amount,
              income_date,
              description
            
          }
        );
        if (response.status === 201) {
          return response.data.data;
        } 
      } catch (error: any) {
        console.error('Error in createIncome:', error.message);
      }
    },
};
export default IncomeServices;
