import { Socket, io } from 'socket.io-client';
import * as BackgroundFetch from 'expo-background-fetch';
import LocalStorage from 'src/store/localstorage';
import * as TaskManager from 'expo-task-manager'; 

let socket: Socket | null = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;

const getSocket = () => socket;

const connectSocket = async () => {
    try {
        if (socket) return socket;

        const accessToken = await LocalStorage.GetAccessToken();
        socket = io('https://api.rancher.io.vn/chat', {
            extraHeaders: { Authorization: `Bearer ${accessToken}` },
        });

        socket.on('connect', () => {
            console.log('Socket connected');
            reconnectAttempts = 0;
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
            if (reconnectAttempts < maxReconnectAttempts) {
                console.log('Attempting to reconnect...');
                reconnectAttempts++;
                setTimeout(connectSocket, 3000);
            } else {
                console.log('Exceeded maximum reconnect attempts.');
            }
        });
    } catch (error) {
        console.error('Socket connection error:', error);
    }
};

const closeSocketConnection = () => {
    if (socket) {
        socket.disconnect();
        console.log('Socket disconnected');
    }
};

const BACKGROUND_FETCH_TASK_NAME = 'socketTask';

const backgroundFetchHandler = async (taskId: any) => {
    console.log("[BackgroundFetch] Task", taskId, "executed.");

    try {
        await connectSocket();
        return 'newData';
    } catch (error) {
        console.error('Background fetch error:', error);
        return 'failed';
    }
};

TaskManager.defineTask(BACKGROUND_FETCH_TASK_NAME, backgroundFetchHandler);

BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK_NAME, {
    minimumInterval: 15 * 60, 
    stopOnTerminate: false,
    startOnBoot: true, 
}).then(() => {
    console.log('Background fetch task registered successfully.');
}).catch((error) => {
    console.error('Background fetch registration error:', error);
});


export { connectSocket, closeSocketConnection, getSocket };
