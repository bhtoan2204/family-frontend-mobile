import { AxiosResponse } from "axios";
import ExpenseUrl from "../urls/expenseUrls";
import instance from "../httpInterceptor";
import baseUrl from "../urls/baseUrl";

const IncomeServices = {

  getIncomeType: async(id_family: number) =>{
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

}
export default IncomeServices;