import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'; 
import { Member, Role, User } from 'src/interface/member/member';
import { Family } from 'src/interface/family/family';



interface FamilyState {
  families: Family[];
  selectedFamily: Family | null;
  familyMembers: Member[];
}

const initialState: FamilyState = {
  families: [],
  selectedFamily: null,
  familyMembers: [],
};

const familySlice = createSlice({
  name: 'family',
  initialState,
  reducers: {
    setFamilies(state, action: PayloadAction<Family[]>) {
      state.families = action.payload;
    },
    setSelectedFamily(state, action: PayloadAction<Family | null>) {
      state.selectedFamily = action.payload;
    },
    setFamilyMembers(state, action: PayloadAction<{ [key: number]: Member[] }>) {
      Object.values(action.payload).forEach((members) => {
        state.familyMembers.push(...members);
      });
    }
  },
});

export const { setFamilies, setSelectedFamily, setFamilyMembers } = familySlice.actions;

export const selectFamilies = (state: RootState) => state.family.families;
export const selectSelectedFamily = (state: RootState) => state.family.selectedFamily;
export const selectFamilyMembers = createSelector(
  (state: RootState) => state.family.familyMembers,
  (state: RootState) => state.family.selectedFamily?.id_family,
  (familyMembers, selectedFamilyId) => {
    if (!selectedFamilyId) {
      return familyMembers; 
    }

    return familyMembers.filter(member => member.id_family === selectedFamilyId);
  }
);



export default familySlice.reducer;
