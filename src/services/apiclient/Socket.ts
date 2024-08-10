import {Socket, io} from 'socket.io-client';
import * as BackgroundFetch from 'expo-background-fetch';
import LocalStorage from 'src/store/localstorage';
import * as TaskManager from 'expo-task-manager';
import baseUrl from '../urls/baseUrl';

let socket: Socket | null = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;

const getSocket = () => socket;

const connectSocket = async () => {
  try {
    if (socket && socket.connected) return socket;

    const accessToken = await LocalStorage.GetAccessToken();
    if (!accessToken) {
      throw new Error('Access token is missing.');
    }
    socket = io(`${baseUrl}/chat`, {
      autoConnect: false,
      upgrade: true,
      transports: ['websocket'],
      auth: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    socket.on('connect', () => {
      reconnectAttempts = 0;
    });

    socket.on('disconnect', () => {
      if (reconnectAttempts < maxReconnectAttempts) {
        console.log('Attempting to reconnect...');
        reconnectAttempts++;
        setTimeout(connectSocket, 3000);
      } else {
        console.log('Exceeded maximum reconnect attempts.');
      }
    });

    socket.on('connect_error', error => {});

    socket.connect();
  } catch (error) {}
};

const closeSocketConnection = () => {
  if (socket) {
    socket.disconnect();
    console.log('Socket disconnected');
  }
};

const BACKGROUND_FETCH_TASK_NAME = 'socketTask';

const backgroundFetchHandler = async (taskId: any) => {
  console.log('[BackgroundFetch] Task', taskId, 'executed.');

  try {
    await connectSocket();
    return 'newData';
  } catch (error) {
    return 'failed';
  }
};

TaskManager.defineTask(BACKGROUND_FETCH_TASK_NAME, backgroundFetchHandler);

BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK_NAME, {
  minimumInterval: 15 * 60,
  stopOnTerminate: false,
  startOnBoot: true,
})
  .then(() => {
    console.log('Background fetch task registered successfully.');
  })
  .catch(error => {});

export {connectSocket, closeSocketConnection, getSocket};
