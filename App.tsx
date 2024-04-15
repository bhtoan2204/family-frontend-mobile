import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationContainer from 'src/navigation';
import { store } from 'src/redux/store';
import Notification from 'src/screens/Notifications';
import * as BackgroundFetch from 'expo-background-fetch';
import { connectSocket } from 'src/services/apiclient/Socket';
import navigation from 'src/navigation';

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


const registerBackgroundFetch = async () => {
    try {
        await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK_NAME, {
            minimumInterval: 15 * 60, 
            stopOnTerminate: false, 
            startOnBoot: true, 
        });
        console.log('Background fetch registered successfully.');
    } catch (error) {
        console.error('Background fetch registration error:', error);
    }
};

const initializeBackgroundFetch = async () => {
    await registerBackgroundFetch();
};

const App: React.FC = () => {
    useEffect(() => {
        connectSocket();
        //initializeBackgroundFetch();
    }, []);

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <PaperProvider>
                    <NavigationContainer />
                </PaperProvider>
            </SafeAreaProvider>
            <Notification />
        </Provider>
    );
};

export default App;
