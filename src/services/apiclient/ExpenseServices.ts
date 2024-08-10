import axios, {AxiosResponse} from 'axios';
import ExpenseUrl from '../urls/expenseUrls';
import instance from '../httpInterceptor';
import baseUrl from '../urls/baseUrl';

const ExpenseServices = {
  getExpenseType: async (
    id_family?: number,
    page?: number,
    itemsPerPage?: number,
  ) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/finance/expenseditureType/getExpenseType/${id_family}`,
        {
          params: {
            id_family,
            page,
            itemsPerPage,
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
  getUtilityType: async () => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/utilities/getUtilityTypes`,
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

  updateUtility: async (
    id_utility: number,
    id_family: number,
    id_utilities_type: number,
  ) => {
    try {
      const response: AxiosResponse = await instance.put(
        `${baseUrl}/api/v1/utilities/updateUtility`,
        {
          id_utility,
          id_family,
          id_utilities_type,
        },
      );
      console.log('updateUtility: ', response.data.data);
      if (response.status === 200) {
        return response.data.data;
      } else {
        return null;
      }
    } catch (error: any) {
      return null;
    }
  },

  getAsset: async (
    id_family: number,
    page: number,
    itemsPerPage: number,
    sortBy: string,
    sortDirection: string,
  ) => {
    try {
      const response: AxiosResponse = await instance.get(
        `/api/v1/finance/asset/getAssets`,
        {
          params: {
            page,
            itemsPerPage,
            sortBy,
            sortDirection,
            id_family,
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

  createAsset: async (
    id_family: number,
    name: string,
    description: string,
    value: number,
    purchase_date: string,
    image: string,
  ) => {
    try {
      const createFormData = (uri: string): FormData => {
        let formData = new FormData();

        formData.append('id_family', id_family?.toString() || '');
        formData.append('name', name || '');
        formData.append('description', description || '');
        formData.append('value', value?.toString() || '');
        formData.append('purchase_date', purchase_date || '');
        if (uri) {
          let filename = uri.split('/').pop()!;
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;
          const file = {
            uri,
            name: filename,
            type,
          };
          formData.append('image', file);
        }

        return formData;
      };

      const response: AxiosResponse = await instance.post(
        `${baseUrl}/api/v1/finance/asset/createAsset`,
        createFormData(image),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: '*/*',
          },
        },
      );

      if (response.status === 201) {
        return response.data;
      }
    } catch (error: any) {
      return null;
    }
  },
  updateAsset: async (
    id_asset?: number,
    id_family?: number,
    name?: string,
    description?: string,
    value?: number,
    purchase_date?: string,
    image?: string,
  ) => {
    try {
      const createFormData = (uri: string): FormData => {
        let formData = new FormData();

        formData.append('id_asset', id_asset?.toString() || '');
        formData.append('id_family', id_family?.toString() || '');
        formData.append('name', name || '');
        formData.append('description', description || '');
        formData.append('value', value?.toString() || '');
        formData.append('purchase_date', purchase_date || '');
        if (uri) {
          let filename = uri.split('/').pop()!;
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;
          const file = {
            uri,
            name: filename,
            type,
          };
          formData.append('image', file);
        }

        return formData;
      };

      const response: AxiosResponse = await instance.put(
        `${baseUrl}/api/v1/finance/asset/updateAsset`,
        createFormData(image),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: '*/*',
          },
        },
      );

      if (response.status === 200) {
        return response.data.data;
      }
    } catch (error: any) {
      return null;
    }
  },
  deleteAsset: async (id_family?: number, id_asset?: number) => {
    try {
      const response: AxiosResponse = await instance.delete(
        `${baseUrl}/api/v1/finance/asset/deleteAsset/${id_family}/${id_asset}`,
      );

      if (response.status === 204) {
        return true;
      }
    } catch (error: any) {
      return false;
    }
  },

  createExpenseType: async (
    id_family: number | null,
    expense_type_name: string,
  ) => {
    try {
      const response: AxiosResponse = await instance.post(
        `${baseUrl}/api/v1/finance/expenseditureType/createExpenseType`,
        {
          id_family,
          expense_type_name,
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
  deleteExpenseType: async (
    id_family: number | null,
    id_expenditure_type: number,
  ) => {
    try {
      const response: AxiosResponse = await instance.delete(
        `${baseUrl}/api/v1/finance/expenseditureType/deleteExpenseType/${id_family}/${id_expenditure_type}`,
      );
      if (response.status === 204) {
        return true;
      } else {
        return false;
        //console.error('Error in deleteExpenseType');
      }
    } catch (error: any) {
      return false;
      //console.error('Error in deleteExpenseType:', error.message);
    }
  },

  getExpenseByYear: async (year: number, id_family?: number) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/finance/expensediture/getExpensebyYear/${id_family}`,
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
  getExpenseByMonth: async (
    month: number,
    year: number,
    id_family?: number,
  ) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/finance/expensediture/getExpenseByMonth/${id_family}`,
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
  getExpenseByDate: async (date: string, id_family?: number) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/finance/expensediture/getExpenseByDate/${id_family}`,
        {
          params: {
            id_family,
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
  getExpenseByDateRange: async (
    page: number,
    itemsPerPage: number,
    id_family?: number,
    fromDate: string,
    toDate: string,
  ) => {
    try {
      const response: AxiosResponse = await instance.get(
        `${baseUrl}/api/v1/finance/expensediture/getExpenseByDateRange`,
        {
          params: {
            page,
            itemsPerPage,
            sortBy: 'expenditure_date',
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
  createExpense: async (
    id_family?: number | null,
    amount?: number | null,
    id_created_by: string,
    id_expense_type: number,
    expenditure_date: Date,
    description?: string,
    uri?: string | null,
  ) => {
    try {
      const createFormData = (uri: string): FormData => {
        let formData = new FormData();
        formData.append('id_family', String(id_family));
        formData.append('id_created_by', String(id_created_by));
        formData.append('id_expenditure_type', id_expense_type);
        formData.append('amount', String(amount));
        formData.append('expenditure_date', expenditure_date?.toISOString());
        formData.append('description', description);

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
          id_created_by,
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
  deleteExpense: async (id_family: number, id_expenditure: number) => {
    try {
      const response: AxiosResponse = await instance.delete(
        `${baseUrl}/api/v1/finance/expensediture/deleteExpense/${id_family}/${id_expenditure}`,
      );
      if (response.status === 201) {
        return response.data;
      }
    } catch (error: any) {
      return null;
    }
  },

  updateExpense: async (
    id_expenditure?: number,
    id_family?: number,
    id_created_by?: string,
    id_expense_type?: number,
    amount?: number,
    expenditure_date?: string,
    description?: string,
    uri?: string,
  ) => {
    try {
      console.log(
        id_expenditure,
        id_family,
        id_created_by,
        id_expense_type,
        amount,
        description,
        expenditure_date,
      );

      const createFormData = (uri?: string): FormData => {
        let formData = new FormData();

        if (id_expenditure !== null) {
          formData.append('id_expenditure', String(id_expenditure));
        }
        if (id_family !== null) {
          formData.append('id_family', String(id_family));
        }
        if (id_created_by !== null) {
          formData.append('id_created_by', String(id_created_by));
        }
        if (id_expense_type !== null) {
          formData.append('id_expense_type', String(id_expense_type));
        }
        if (amount !== null) {
          formData.append('amount', String(amount));
        }
        if (expenditure_date !== null) {
          formData.append('expenditure_date', String(expenditure_date));
        }
        if (description !== null) {
          formData.append('description', String(description));
        }

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

      const response: AxiosResponse = await instance.put(
        `${baseUrl}/api/v1/finance/expensediture/updateExpense`,
        createFormData(uri),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            accept: '*/*',
          },
        },
      );

      if (response.status === 200) {
        return response.data.data;
      }
    } catch (error: any) {
      return null;
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

  getShoppingItem: async (id_family: number, id_list: number) => {
    const url = `${baseUrl}/api/v1/shopping/getShoppingItem`;
    try {
      console.log(id_list, id_family);
      const response = await instance.get(url, {
        params: {
          page: 1,
          itemsPerPage: 10,
          sortBy: 'created_at',
          sortDirection: 'DESC',
          id_family: id_family,
          id_list: id_list,
        },
      });
      if (response.status === 200) {
        return response.data.data;
      } else {
        return null;
      }
    } catch (error: any) {
      console.log(error.message);
      return null;
    }
  },
};
export default ExpenseServices;
