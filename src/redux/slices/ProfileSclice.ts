import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

interface Profile {
  id_user: string;
  email: string;
  phone: string;
  firstname: string;
  lastname: string;
  created_at: string;
  updated_at: string;
  isemailverified: boolean;
  isphoneverified: boolean;
  isadmin: boolean;
  login_type: string;
  avatar: string;
  genre: 'male' | 'female' | 'other';
  birthdate: string;
  is_banned: boolean;
}

interface ProfileSliceState {
  profile: Profile | null;
}
const initialState: ProfileSliceState = {
  profile: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    Profile(state, action: PayloadAction<Profile>) {
      state.profile = action.payload;
    },
    updateProfileSlice: (state, action: PayloadAction<Profile>) => {
      state.profile = {...state.profile, ...action.payload};
    },
  },
});

export const {Profile, updateProfileSlice} = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile.profile;

export default profileSlice.reducer;
