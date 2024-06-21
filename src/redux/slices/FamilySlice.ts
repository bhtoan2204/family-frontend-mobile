import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Family } from 'src/interface/family/family';

interface FamilyState {
    family: Family;
  };

  const initialState: FamilyState = {
    family: {
        id_family: 0,
        quantity: 0,
        description: "",
        created_at: "",
        updated_at: "",
        name: "",
        owner_id: "",
        expired_at: "",
        code_invite: "",
        avatar: "",
    },
  };

  const familySlice = createSlice({
    name: 'family',
    initialState,
    reducers: {
  
      setFamily(state, action: PayloadAction<Family>) {
        state.family = action.payload;
  
      },

      updateFamily: (state, action: PayloadAction<Family>) => {
        state.family = {...state.family, ...action.payload};
      },
    },
  });
  
  export const { setFamily, updateFamily } = familySlice.actions;
  
  export const selectfamily = (state: RootState) => state.family.family;
  
  export default familySlice.reducer;
  