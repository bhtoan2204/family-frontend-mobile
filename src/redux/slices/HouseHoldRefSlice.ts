import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {RoomInterface} from 'src/interface/household/room';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

// interface RoomState {
//   id_room: number;
//   room_name: string;
// }

const initialState: {
  addRoomRef: React.RefObject<BottomSheet> | undefined;
} = {
  addRoomRef: undefined,
};

const houseHoldRefSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setAddRoomRef(state, action: PayloadAction<React.RefObject<BottomSheet>>) {
      state.addRoomRef = action.payload;
    },
    clearAddRoomRef(state) {
      state.addRoomRef = undefined;
    },
  },
});

export const {setAddRoomRef, clearAddRoomRef} = houseHoldRefSlice.actions;

export default houseHoldRefSlice.reducer;
