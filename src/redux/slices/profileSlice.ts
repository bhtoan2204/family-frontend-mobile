import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Profile {
  id_user: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  avatar: string;
}

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
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileSlice: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
    updateProfileSlice: (state, action: PayloadAction<Profile>) => {
      state.profile = {...state.profile, ...action.payload};
    },
  },
});

export const {setProfileSlice, updateProfileSlice} = profileSlice.actions;
export default profileSlice.reducer;
