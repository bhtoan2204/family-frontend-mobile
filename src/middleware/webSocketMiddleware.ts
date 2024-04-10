import { AnyAction, Dispatch, MiddlewareAPI } from '@reduxjs/toolkit';
import { connectWebSocket, setSocket, disconnectWebSocket } from '../redux/webSocketSlice'; 
import { io, Socket } from "socket.io-client";
import LocalStorage from 'src/store/localstorage';
  
let isSocketConnected = false;
type ServerToClientEvents = {
  onNewMessage: (msg: string) => void;
  onNewImageMessage: (image: string) => void;
};

type ClientToServerEvents = {
  sendMessage: (msg: string) => void;
  sendImage: (image: string) => void;
  newMessage: (msg: string) => void;
  newImageMessage: (image: string) => void;
};

const socketMiddleware = (storeAPI: MiddlewareAPI) => (next: Dispatch<AnyAction>) => async (action: AnyAction) => {

  const accessToken = await LocalStorage.GetAccessToken();

  if (action.type === 'webSocket/connectWebSocket' && !isSocketConnected) {
    try {
      const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('https://api.rancher.io.vn/chat', {
        transports: ['websocket'],
        extraHeaders: { Authorization:  `Bearer ${accessToken}` } 
      });

      socket.on('connect', () => {
        console.log('socket connect')
        storeAPI.dispatch(connectWebSocket()); 
        isSocketConnected = true; 
      });
      storeAPI.dispatch(setSocket(socket));

      socket.on('onNewMessage', (msg) => {
        console.log('Received new message:', msg);

      });
      socket.on('onNewImageMessage', (msg) => {
        console.log('Received new message:', msg);

      });
    
    } catch (error) {
      console.error('Socket connection error:', error);
    }
  }

  return next(action);
};

export default socketMiddleware;
