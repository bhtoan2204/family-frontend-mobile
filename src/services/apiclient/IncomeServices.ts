import { AxiosResponse } from "axios";
import ExpenseUrl from "../urls/expenseUrls";
import instance from "../httpInterceptor";
import baseUrl from "../urls/baseUrl";

const IncomeServices = {
    getIncomeType: async() =>{
        try {
            const response: AxiosResponse = await instance.get(
                `${baseUrl}/api/v1/finance/income/getIncomeSource`,
            );
            if (response.status === 200) {
              return response.data.data;
            } else {
                console.error('Error in getIncomeType');
            }
          } catch (error: any) {
            console.error('Error in getIncomeType:', error.message);
          }
    },

}
export default IncomeServices;