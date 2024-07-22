import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'; 
import { Member } from 'src/interface/member/member';
import { Family } from 'src/interface/family/family';

interface FamilyState {
  families: Family[];
  selectedFamily: Family | null;
  familyMembers: Member[];
  allFamilyMembers: { [key: number]: Member[] };
  selectedMember: Member | null;
}

const initialState: FamilyState = {
  families: [],
  selectedFamily: null,
  familyMembers: [],
  allFamilyMembers: {}, 
  selectedMember: null,
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
      state.familyMembers = Object.values(action.payload).flat(); 
      state.allFamilyMembers = action.payload;
    },
    setSelectedFamilyById(state, action: PayloadAction<number>) {
      const selectedFamily = state.families.find(family => family.id_family === action.payload);
      if (selectedFamily) {
        state.selectedFamily = selectedFamily;
      }
    },
    setSelectedMemberById(state, action: PayloadAction<string | undefined>) {
      const selectedMember = state.familyMembers.find(member => member.id_user === action.payload);
      if (selectedMember) {
        state.selectedMember = selectedMember;
      }
    },
    updateFamily(state, action: PayloadAction<Family>) {
      const index = state.families.findIndex(family => family.id_family === action.payload.id_family);
      if (index !== -1) {
        state.families[index] = action.payload;
        if (state.selectedFamily?.id_family === action.payload.id_family) {
          state.selectedFamily = action.payload;
        }
      }
    },
  },
});

export const { setSelectedMemberById, setSelectedFamilyById, setFamilies, setSelectedFamily, setFamilyMembers, updateFamily } = familySlice.actions;

export const selectFamilies = (state: RootState) => state.family.families;
export const selectSelectedFamily = (state: RootState) => state.family.selectedFamily;
export const selectSelectedMember = (state: RootState) => state.family.selectedMember;

export const selectFamilyMembers = createSelector(
  [(state: RootState) => state.family.familyMembers, (state: RootState) => state.family.selectedFamily],
  (familyMembers, selectedFamily) => {
    if (!selectedFamily) {
      return [];
    }
    return familyMembers.filter(member => member.id_family === selectedFamily.id_family);
  }
);

export const selectAllFamilyMembers = (state: RootState) => state.family.allFamilyMembers;

export default familySlice.reducer;
