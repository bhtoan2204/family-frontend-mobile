// profileSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ProfileState {
  id_user: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  avatar: string;
};

const initialState: ProfileState = {
  id_user: '',
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  avatar: '',

};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {

    Profile(state, action: PayloadAction<ProfileState>) {
        state.id_user = action.payload.id_user;
        state.firstname = action.payload.firstname;
        state.lastname = action.payload.lastname;
        state.email = action.payload.email;
        state.phone = action.payload.phone;
        state.avatar = action.payload.avatar;

    },
    fetchProfile(state) {
        return state;
    },

  },
});

export const { fetchProfile, Profile } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;
