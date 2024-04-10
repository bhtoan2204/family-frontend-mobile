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
    disconnectWebSocket(state) {
      if (state.socket) {
        state.socket.disconnect();
        state.socket = null; 
        state.isConnected = false;
        console.log('WebSocket disconnected');
      } else {
        console.warn('No WebSocket connection to disconnect');
      }
    },    
    receiveMessage(state, action: PayloadAction<Message>) {
        state.messages.unshift(action.payload); 
      },

    sendFamilyMessage: (state, action: PayloadAction<{ message: string; familyId?: number }>) => {
      state.socket?.emit('newFamilyMessage', { message: action.payload.message, familyId: action.payload.familyId });
    },
      
    sendFamilyImage: (state, action: PayloadAction<{ familyId?: number, imageData: string}>) => {
      state.socket?.emit('newFamilyImageMessage', { familyId: action.payload.familyId, imageData: action.payload.imageData});
    }

    },
    
  });
  
  export const { connectWebSocket, setSocket, receiveMessage, sendFamilyMessage, sendFamilyImage, disconnectWebSocket} = webSocketSlice.actions;
  
  export default webSocketSlice.reducer;
