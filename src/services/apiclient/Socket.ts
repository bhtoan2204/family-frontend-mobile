import LocalStorage from 'src/store/localstorage';
import { Socket, io } from 'socket.io-client';

let socket: Socket | null = null;


const getSocket = () => {
    return socket;
  };

const SocketConnection = async () => {
  const accessToken = await LocalStorage.GetAccessToken();

  if (socket){
  closeSocketConnection(socket);
  }

  socket = io('https://api.rancher.io.vn/chat', {
    extraHeaders: { Authorization: `Bearer ${accessToken}` },
  });

  socket.on('connect', () => {
    console.log('Socket connected');
  });




  return socket;
};

const closeSocketConnection = (socket: any) => {
  if (socket) {
    socket.disconnect();
    console.log('Socket disconnected');
  }
};

export { SocketConnection, closeSocketConnection , getSocket};
