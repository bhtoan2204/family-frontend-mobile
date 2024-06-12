import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

interface RoomState {
  id_room: number;
  room_name: string;
}

const initialState: RoomState[] = [];

const householdSlice = createSlice({
  name: 'householdItems',
  initialState,
  reducers: {
    setRoom(state, action: PayloadAction<RoomState[]>) {
      return action.payload;
    },
    clearRoom(state) {
      state = [];
    },
    addRoom(state, action: PayloadAction<RoomState>) {
      console.log(action.payload.id_room, action.payload.room_name);
      state.push(action.payload);
      console.log(state);
    },
  },
});

export const {setRoom, clearRoom, addRoom} = householdSlice.actions;

export default householdSlice.reducer;
