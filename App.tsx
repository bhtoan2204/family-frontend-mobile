import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import NavigationContainer from 'src/navigation';
import {store} from 'src/redux/store';
import Notification from 'src/screens/Notifications';
import * as BackgroundFetch from 'expo-background-fetch';
import {connectSocket} from 'src/services/apiclient/Socket';

const App: React.FC = () => {
  useEffect(() => {
    connectSocket();
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
