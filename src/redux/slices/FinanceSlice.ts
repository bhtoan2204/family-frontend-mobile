import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';


interface FinanceState {
  type: string;

}

const initialState: FinanceState = {
  type: 'Expense',

};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
 
  },
});

export const { setType } = financeSlice.actions;
 
export const getType= (state: RootState) => state.finance.type;


export default financeSlice.reducer;
