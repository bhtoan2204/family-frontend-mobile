import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface LastMessage {
    senderId: string;
    type: string; 
    content: string;
    isRead: boolean;
    timestamp: Date; 
    _id: string;
  }
  
 interface FamilyLastMessage {
    _id: string;
    familyId: number;
    lastMessage: LastMessage;
    name: string;
    avatar: string;
  }


interface MessageFamilySliceState {
  message: FamilyLastMessage;
}
const initialState: MessageFamilySliceState = {
    message: {
        _id: "66160e64b938e432ce8728c9",
        familyId: 96,
        lastMessage: {
          senderId: "bd94ba3a-b046-4a05-a260-890913e09df9",
          type: "text", 
          content: "😉",
          isRead: false,
          timestamp: new Date(),
          _id: "6675a2147bb424164f4eec79"
        },
        name: "My family",
        avatar: "https://storage.googleapis.com/famfund-bucket/avatar/avatar_family_bd94ba3a-b046-4a05-a260-890913e09df9_1719316197129_412AF269-4D38-4778-9995-7225BAA185EB.jpg"
      }
};


const messageFamilySlice = createSlice({
  name: 'messageFamily',
  initialState,
  reducers: {

    setFamilyLastMessage(state, action: PayloadAction<FamilyLastMessage>) {
      state.message = action.payload;

    },

  },
});

export const { setFamilyLastMessage} = messageFamilySlice.actions;

export const selectFamilyLastMessage = (state: RootState) => state.messageFamily.message;

export default messageFamilySlice.reducer;
