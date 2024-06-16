import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Profile {
  id_user: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  avatar: string;
  genre: string;
  birthdate: string;
};

interface ProfileSliceState {
  profile: Profile;
}
const initialState: ProfileSliceState = {
  profile: {
    id_user: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    avatar: '',
    genre: '',
    birthdate: '',
  },
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

export const { Profile, updateProfileSlice } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile.profile;

export default profileSlice.reducer;
