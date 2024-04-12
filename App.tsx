import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationContainer from 'src/navigation';
import { store } from 'src/redux/store';
import { SocketConnection } from 'src/services/apiclient/Socket';
import Notification from 'src/screens/Notifications';

function App(): React.JSX.Element {
  useEffect(() => {
    SocketConnection();
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
}

export default App;
