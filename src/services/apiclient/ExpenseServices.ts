import axios, {AxiosResponse} from 'axios';
import ExpenseUrl from '../urls/expenseUrls';
import instance from '../httpInterceptor';
import baseUrl from '../urls/baseUrl';

const ExpenseServices = {
  
  getExpenseType: async (id_family: number, page: number, itemsPerPage : number) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/finance/expenseditureType/getExpenseType/${id_family}`,{
          params: {
            id_family, page, itemsPerPage
          }
        }
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
  getAsset: async (id_family: number) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/finance/asset/getAssets/${id_family}`,
      );

      if (response.status === 200) {

        return response.data.data;
      } else {
        console.error('Error in getAsset');
      }
    } catch (error: any) {
      console.error('Error in getAsset:', error.message);
    }
  },

  createAsset: async (id_family: number, name: string, description: string, value : number, purchase_date : string, image: string) => {
    try {
      const createFormData = (image: string): FormData => {
        let formData = new FormData();
        if (image != null){
          let filename = image.split('/').pop()!;
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;
          const file = {
            image,
            name: filename,
            type,
          };
          formData.append('image', file);
      }
        formData.append('id_family', id_family.toString());
        formData.append('name', name.toString());
        formData.append('description', description.toString());
        formData.append('value', value.toString());
        formData.append('purchase_date', purchase_date.toString());

        return formData;
      };

      const response: AxiosResponse = await instance.post(
        `${baseUrl}/api/v1/finance/asset/createAsset`, createFormData(image), {
          headers: {
            'Content-Type': 'multipart/form-data',
            accept: '*/*',
          },
        }
      );

      if (response.status === 201) {

        return response.data;
      } 
    } catch (error: any) {
      console.error('Error in createAsset:', error.message);
    }
  },
  updateAsset: async (
    id_asset?: number,
    id_family?: number,
    name?: string,
    description?: string,
    value?: number,
    purchase_date?: string,
    image?: string
  ) => {
    try {
      const formData = new FormData();
  
      if (image) {
        let filename = image.split('/').pop()!;
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        const file = {
          image,
          name: filename,
          type,
        };

        formData.append('image', file);
      }
  
      formData.append('id_asset', id_asset?.toString() || '');
      formData.append('id_family', id_family?.toString() || '');
      formData.append('name', name || '');
      formData.append('description', description || '');
      formData.append('value', value?.toString() || '');
      formData.append('purchase_date', purchase_date || '');
  
      const response: AxiosResponse = await instance.put(
        `${baseUrl}/api/v1/finance/asset/updateAsset`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: '*/*',
          },
        }
      );
  
      if (response.status === 200) {
        return response.data.data;
      }
    } catch (error: any) {
      console.error('Error in updateAsset:', error.message);
      throw error; 
    }
  },
  deleteAsset: async (id_family?: number, id_asset?: number) => {
    try {
      
      const response: AxiosResponse = await instance.delete(
        `${baseUrl}/api/v1/finance/asset/deleteAsset/${id_family}/${id_asset}`,
      );

      if (response.status === 204) {

        return;
      } 
    } catch (error: any) {
      console.error('Error in deleteAsset:', error.message);
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
            id_family , year
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
              id_family, date
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
    getExpenseByDateRange: async (page: number, itemsPerPage: number, id_family?: number, fromDate: string, toDate: string) => {

      try {
        const response: AxiosResponse = await instance.get(
          `${baseUrl}/api/v1/finance/expensediture/getExpenseByDateRange/${id_family}`,
          {
            params: {
              id_family, page, itemsPerPage, fromDate, toDate
            }
          }
        );
        if (response.status === 200) {
          return response.data;
        } else {
          console.error('Error in getExpenseByDateRange');
        }
      } catch (error: any) {
        console.error('Error in getExpenseByDateRange:', error.message);
      }
      
    },
    createExpense: async (id_family: number | null, amount: number | null, id_created_by: string, id_expense_type?: number, expenditure_date?: Date, description?: string, uri: string) => {
      try {
        const createFormData = (uri: string): FormData => {
          let formData = new FormData();
          formData.append('id_family', String(id_family));
          formData.append('id_created_by', String(id_created_by));
          formData.append('id_expense_type', id_expense_type.toString());
          formData.append('amount', String(amount));
          formData.append('expenditure_date', expenditure_date?.toISOString());
          formData.append('description', description );

          if (uri) {
            let filename = uri.split('/').pop()!;
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            const file = {
              uri,
              name: filename,
              type,
            };
            formData.append('expenseImg', file);
          }

          return formData;
        };
    
        const response: AxiosResponse = await instance.post(
          `${baseUrl}/api/v1/finance/expensediture/createExpense`,
          createFormData(uri),
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              accept: '*/*',
            },
          }
        );
        if (response.status === 201) {
          return response.data.data;
        } 
      } catch (error: any) {
        console.error('Error in createExpense:', error.message);
      }
    },
updateIncome: async (id_income?:number, id_family: number | null, amount: number, id_created_by: string, id_income_source?: number, income_date?: string, description?: string) => {
      try {
        console.log(id_income,
          id_family,
          id_created_by,
          id_income_source,
          amount,
          income_date,
          description
        )
        const response: AxiosResponse = await instance.put(
          `${baseUrl}/api/v1/finance/income/updateIncome`,
          {
            id_income,
              id_family,
              id_created_by,
              id_income_source,
              amount,
              income_date,
              description
            
          }
        );
        if (response.status === 200) {
          return response.data.data;
        } 
      } catch (error: any) {
        console.error('Error in updateIncome:', error.message);
      }
    },
    deleteExpense: async (id_family: number, id_expenditure : number) => {
      try {

        const response: AxiosResponse = await instance.delete(
          `${baseUrl}/api/v1/finance/expensediture/deleteExpense/${id_family}/${id_expenditure}`,
          
        );
        if (response.status === 201) {
          return response.data;
        } 
      } catch (error: any) {
        console.error('Error in deleteExpense:', error.message);
      }
    },

    updateExpense: async (
      id_expenditure?: number ,
      id_family?: number,
      id_created_by?: string ,
      id_expense_type?: number,
      amount?: number,
      expenditure_date?: string,
      description?: string,
      uri?: string
    ) => {
      try {
        const createFormData = (): FormData => {
          let formData = new FormData();
          let filename = uri.split('/').pop()!;
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;
          const file = {
            uri,
            name: filename,
            type,
          };
          formData.append('id_expenditure', String(id_expenditure));
          formData.append('id_family', String(id_family));
          formData.append('id_created_by', String(id_created_by));
          formData.append('id_expense_type', id_expense_type.toString());
          formData.append('amount', String(amount));
          formData.append('expenditure_date', expenditure_date);
          formData.append('description', description );
          formData.append('expenseImg', file);

          return formData;
        };
    
        const response: AxiosResponse = await instance.put(
          `${baseUrl}/api/v1/finance/expensediture/updateExpense`,
          createFormData(),
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
        console.error('Error in updateExpense:', error.message);
      }
    },
    

    //  uploadImageExpense: async (
    //   id_family: number | null,
    //   id_expenditure: number,
    //   uri: string
    // ) => {
    //   try {
    //     const createFormData = (uri: string): FormData => {
    //       let formData = new FormData();
    //       let filename = uri.split('/').pop()!;
    //       let match = /\.(\w+)$/.exec(filename);
    //       let type = match ? `image/${match[1]}` : `image`;
    //       const file = {
    //         uri,
    //         name: filename,
    //         type,
    //       };
    //       formData.append('expenseImg', file);
    //       return formData;
    //     };
    
    //     const response: AxiosResponse = await instance.post(
    //       `${baseUrl}/api/v1/finance/expensediture/uploadImageExpense/${id_family}/${id_expenditure}`,
    //       createFormData(uri),
    //       {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //           accept: '*/*',
    //         },
    //       }
    //     );
    
    //     if (response.status === 200) {
    //       return response.data.data;
    //     }
    //   } catch (error: any) {
    //     console.error('Error in uploadImageExpense:', error.message);
    //   }
    // },
    
    
    

};
export default ExpenseServices;
