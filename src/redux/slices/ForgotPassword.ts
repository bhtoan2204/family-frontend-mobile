
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface forgorPasswordState {
  phone: string;
  email: string;
  code: string;

}

const initialState: forgorPasswordState = {
    phone: '',
    email: '',
    code: '',

};

const forgorPasswordSlice = createSlice({
  name: 'forgorPassword',
  initialState,
  reducers: {

      setPhone: (state, action: PayloadAction<string>) => {
        state.phone = action.payload;
      },
      setEmail: (state, action: PayloadAction<string>) => {
        state.email = action.payload;
      },
      setCode: (state, action: PayloadAction<string>) => {
        state.code = action.payload;
      },
  },
});

export const { setPhone,setEmail,setCode } = forgorPasswordSlice.actions;

export const getEmail= (state: RootState) => state.forgorPassword.email;
export const getPhone= (state: RootState) => state.forgorPassword.phone;
export const getCode= (state: RootState) => state.forgorPassword.code;

export default forgorPasswordSlice.reducer;