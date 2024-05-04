import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
interface ExpenseType {
    id_expense_type: number;
    expense_name: string;
}

interface FinanceState {
  type: string;
  category_id: number ;
  category_name: string ;
  wallet: string;
}

const initialState: FinanceState = {
  type: 'Expense',
  category_id: 0,
  category_name: '',
  wallet: '',
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setCategory_id: (state, action: PayloadAction<number>) => {
        state.category_id = action.payload;

    },
    setCategory_name: (state, action: PayloadAction<string>) => {
        state.category_name = action.payload;

    },
    setWallet: (state, action: PayloadAction<string>) => {
      state.wallet = action.payload;
    },
  },
});

export const { setType, setCategory_id, setCategory_name , setWallet } = financeSlice.actions;

export const getFinance= (state: RootState) => state.finace;


export default financeSlice.reducer;
