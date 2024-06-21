import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Member} from 'src/interface/member/member';

const initialState: Member[] = [];

const memberSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    setMembers(state, action: PayloadAction<Member[]>) {
      return action.payload;
    },
    clearMembers(state) {
      state = [];
    },
  },
});

export const {setMembers, clearMembers} = memberSlice.actions;

export default memberSlice.reducer;
