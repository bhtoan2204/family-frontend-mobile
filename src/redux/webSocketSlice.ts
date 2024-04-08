import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io-client';

  
  interface Message {
    senderId: string;
    type: string;
    content: string;
    receiverId: string;
  }
  

interface WebSocketState {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  isConnected: boolean;
  messages: Message[];
}

const initialState: WebSocketState = {
  socket: null,
  isConnected: false,
  messages: [], 

};

const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<Socket<DefaultEventsMap, DefaultEventsMap>>) => {
      state.socket = action.payload as any; 
      state.isConnected = false;
    },
    connectWebSocket(state) {
      state.isConnected = true;
    },

    receiveMessage(state, action: PayloadAction<Message>) {
        state.messages.unshift(action.payload); 
      },

    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    },
    
  });
  
  export const { connectWebSocket, setSocket, receiveMessage } = webSocketSlice.actions;
  
  export default webSocketSlice.reducer;
