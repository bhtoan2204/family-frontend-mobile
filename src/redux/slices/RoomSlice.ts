import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import { RoomInterface } from 'src/interface/household/room';

// interface RoomState {
//   id_room: number;
//   room_name: string;
// }

const initialState: RoomInterface[] = [];

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom(state, action: PayloadAction<RoomInterface[]>) {
      return action.payload;
    },
    clearRoom(state) {
      state = [];
    },
    addRoom(state, action: PayloadAction<RoomInterface>) {
      console.log(action.payload.id_room, action.payload.room_name);
      state.push(action.payload);
      console.log(state)
    },
  },
});

export const {setRoom, clearRoom, addRoom} = roomSlice.actions;

export default roomSlice.reducer;
