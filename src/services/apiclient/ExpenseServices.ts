import { AxiosResponse } from "axios";
import ExpenseUrl from "../urls/expenseUrls";
import instance from "../httpInterceptor";
import baseUrl from "../urls/baseUrl";

const ExpenseServices = {
    getExpenseType: async() =>{
        try {
            const response: AxiosResponse = await instance.get(
                `${baseUrl}/api/v1/finance/expensediture/getExpenseType`,
            );
            if (response.status === 200) {
              return response.data.data;
            } else {
                console.error('Error in getExpenseType');
            }
          } catch (error: any) {
            console.error('Error in getExpenseType:', error.message);
          }
    },
    getIncomeType: async() =>{
      try {
          const response: AxiosResponse = await instance.get(
              `${baseUrl}/api/v1/finance/income/getIncomeSource`,
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
  getExpense: async(page: number, itemsPerPage: number, id_family?: number) =>{
    try {
        const response: AxiosResponse = await instance.get(
            `${baseUrl}/api/v1/finance/expensediture/getExpense/${id_family}`,{
            params: {
              page, itemsPerPage, id_family,
            }
          }
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
    getIncome: async(page: number, itemsPerPage: number, id_family?: number) =>{
      try {
          const response: AxiosResponse = await instance.get(
              `${baseUrl}/api/v1/finance/income/getIncome/${id_family}`,{
              params: {
                page, itemsPerPage, id_family,
              }
            }
          );
          if (response.status === 200) {
            return response.data.data;
          } else {
              console.error('Error in getIncome');
          }
        } catch (error: any) {
          console.error('Error in getIncome:', error.message);
        }
    },
}
export default ExpenseServices;