// import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
// import { connectWebSocket, setSocket, disconnectWebSocket } from '../redux/webSocketSlice'; 
// import { io, Socket } from "socket.io-client";
// import LocalStorage from 'src/store/localstorage';

// const socketMiddleware: Middleware = (storeAPI) => (next) => async (action: any) => {

//   const accessToken = await LocalStorage.GetAccessToken();
//   if (action.type === 'webSocket/connectWebSocket' ) {
//     if (storeAPI.getState().webSocket.isConnected === false) {

//     try {
//       const socket = io('https://api.rancher.io.vn/chat', {
//         extraHeaders: { Authorization:  `Bearer ${accessToken}` } 
//       });

//       socket.on('connect', () => {
//         storeAPI.dispatch(setSocket(socket));

//         console.log('socket connect')
//         storeAPI.dispatch(connectWebSocket()); 
//       });


    
//     } catch (error) {
//       console.error('Socket connection error:', error);
//     }
//   };

//   return next(action);
// };
// };

// export default socketMiddleware;
