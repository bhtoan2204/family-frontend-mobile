import { createSlice } from "@reduxjs/toolkit";

interface MessageState {
    senderId: string;
    type: string;
    content: string;
    receiverId: string;
    _id: string;
    isRead: boolean;
  };
  const initialState: MessageState = {
    senderId: '',
    type: '',
    content: '',
    receiverId: '',
    _id: '',
    isRead: false,
  };
const NotificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers : {

    }
})