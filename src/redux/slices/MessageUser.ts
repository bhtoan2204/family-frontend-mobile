import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

export interface LastMessage {
  _id: string;
  receiverId: string;
  latestMessage: Message;
}

interface UserInfo {
  avatar: string;
  birthdate: string;
  created_at: string;
  email: string;
  firstname: string;
  genre: string;
  id_user: string;
  is_banned: boolean;
  isadmin: boolean;
  isemailverified: boolean;
  isphoneverified: boolean;
  lastname: string;
  login_type: string;
  phone: string;
  updated_at: string;
}

interface Message {
  _id: string;
  content: string;
  isRead: boolean;
  receiverId: string;
  receiverInfo: UserInfo;
  senderId: string;
  senderInfo: UserInfo;
  timestamp: string;
  type: string;
}

export interface User {
  id_user: string;
  firstname: string;
  lastname: string;
  avatar: string;
}

interface MessageFamilySliceState {
  message: LastMessage;
}
const initialState: MessageFamilySliceState = {
  message: {
    _id: '66160e64b938e432ce8728c9',
    receiverId: 'receiver-id-placeholder',
    latestMessage: {
      senderId: 'bd94ba3a-b046-4a05-a260-890913e09df9',
      receiverId: 'receiver-id-placeholder',
      type: 'text',
      content: '😉',
      isRead: false,
      timestamp: new Date(),
      _id: '6675a2147bb424164f4eec79',
      receiver: {
        id_user: '',
        firstname: 'Sample',
        lastname: 'User',
        avatar: '',
      },
    },
  },
};

const messageSlice = createSlice({
  name: 'messageUser',
  initialState,
  reducers: {
    setLastMessage(state, action: PayloadAction<LastMessage>) {
      state.message = action.payload;
    },
    setUserMessage(state, action: PayloadAction<User>) {
      state.message.latestMessage.receiver = action.payload;
    },
  },
});

export const {setLastMessage, setUserMessage} = messageSlice.actions;

export const selectLastMessage = (state: RootState) => state.message.message;
export const selectReceiver = (state: RootState) =>
  state.message.message.latestMessage.receiver;

export default messageSlice.reducer;
