import axios, {AxiosResponse} from 'axios';
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
  deleteExpenseType: async (id_family: number | null, id_expenditure_type: number) => {
    try {
      const response: AxiosResponse = await instance.delete(
        `${baseUrl}/api/v1/finance/expenseditureType/deleteExpenseType/${id_family}/${id_expenditure_type }`,
        
      );
      if (response.status === 204) {
        return response.status;
      } else {
        console.error('Error in deleteExpenseType');
      }
    } catch (error: any) {
      console.error('Error in deleteExpenseType:', error.message);
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
    createExpense: async (id_family: number | null, amount: number | null, id_created_by: string, id_expense_type?: number, expenditure_date?: Date, description?: string) => {
      try {

        const response: AxiosResponse = await instance.post(
          `${baseUrl}/api/v1/finance/expensediture/createExpense`,
          {
        
              id_family,
              id_created_by,
              id_expense_type,
              amount,
              expenditure_date,
              description
            
          }
        );
        if (response.status === 201) {
          return response.data.data;
        } 
      } catch (error: any) {
        console.error('Error in createExpense:', error.message);
      }
    },


    uploadImageExpense: async (
      id_family: number | null,
      id_expenditure: number,
      uri: string
    ) => {
      try {
        const createFormData = (uri: string): FormData => {
          let formData = new FormData();
          let filename = uri.split('/').pop()!;
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;
          const file = {
            uri,
            name: filename,
            type,
          };
          formData.append('expenseImg', file);
  
          return formData;
        };
    
        const response: AxiosResponse = await instance.post(
          `https://api.rancher.io.vn/api/v1/finance/expensediture/uploadImageExpense/${id_family}/${id_expenditure}`,
          
          createFormData(uri),
          {
            
            headers: {
              'Content-Type': 'multipart/form-data',
              accept: '*/*',
            },
           
          }
          
          
        );
    
        if (response.status === 200) {
          return response.data.data;
        }
      } catch (error: any) {
        console.error('Error in uploadImageExpense:', error.message);
      }
    },
    
    

};
export default ExpenseServices;
