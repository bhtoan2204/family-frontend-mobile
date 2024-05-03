import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationContainer from 'src/navigation';
import { store } from 'src/redux/store';
import Notification from 'src/screens/Notifications';
import { connectSocket } from 'src/services/apiclient/Socket';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const App: React.FC = () => {
    useEffect(() => {
        connectSocket();
    }, []);

    return (
        <Provider store={store}>

            <SafeAreaProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <PaperProvider>
                        <NavigationContainer />
                    </PaperProvider>
                </GestureHandlerRootView>
            </SafeAreaProvider>
        </Provider>
    );
};

export default App;
