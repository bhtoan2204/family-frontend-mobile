import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';


interface FinanceState {
  type: string;
  expensecategory_id: number ;
  expensecategory_name: string ;
  incomecategory_id: number ;
  incomecategory_name: string ;
  wallet: string;
}

const initialState: FinanceState = {
  type: 'Expense',
  expensecategory_id: 0,
  expensecategory_name: '',
  incomecategory_id: 0,
  incomecategory_name: '',
  wallet: '',
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setExpenseCategory_id: (state, action: PayloadAction<number>) => {
        state.expensecategory_id = action.payload;

    },
    setExpenseCategory_name: (state, action: PayloadAction<string>) => {
        state.expensecategory_name = action.payload;

    },
    setIncomeCategory_id: (state, action: PayloadAction<number>) => {
      state.incomecategory_id = action.payload;

    },
    setIncomeCategory_name: (state, action: PayloadAction<string>) => {
        state.incomecategory_name = action.payload;

    },
    setWallet: (state, action: PayloadAction<string>) => {
      state.wallet = action.payload;
    },
  },
});

export const { setType, setExpenseCategory_id, setExpenseCategory_name ,setIncomeCategory_id, setIncomeCategory_name, setWallet } = financeSlice.actions;
 
export const getType= (state: RootState) => state.finace.type;
export const getIncomeId= (state: RootState) => state.finace.incomecategory_id;
export const getIncomeName= (state: RootState) => state.finace.incomecategory_name;
export const getExpenseId= (state: RootState) => state.finace.expensecategory_id;
export const getExpenseName= (state: RootState) => state.finace.expensecategory_name;


export default financeSlice.reducer;
