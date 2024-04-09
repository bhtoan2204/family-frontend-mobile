import { AnyAction, Dispatch, MiddlewareAPI } from '@reduxjs/toolkit';
import { connectWebSocket, setSocket } from '../redux/webSocketSlice'; 
import io from 'socket.io-client';
import LocalStorage from 'src/store/localstorage';
  
const socketMiddleware = (storeAPI: MiddlewareAPI) => (next: Dispatch<AnyAction>) => async (action: AnyAction) => {
  const accessToken = await LocalStorage.GetAccessToken();
  if (action.type === 'webSocket/connectWebSocket' && !storeAPI.getState().webSocket.isConnected) {
    try {
      const socket = io('https://api.rancher.io.vn/chat', {
        transports: ['websocket'],
        extraHeaders: { Authorization:  `Bearer ${accessToken}` } 
      });

      socket.on('connect', () => {
        
        storeAPI.dispatch(connectWebSocket()); 
      });

      socket.on('newMessage', (message) => {
        console.log('WebSocket connected newMessage', message);
      });
    
      socket.on('connect_error', (error) => {
      });

      storeAPI.dispatch(setSocket(socket));
    } catch (error) {
    }
  }

  return next(action);
};

export default socketMiddleware;