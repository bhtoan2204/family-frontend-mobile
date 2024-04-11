import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationContainer from 'src/navigation';
import store from 'src/redux/store';
import { connectWebSocket, disconnectWebSocket } from 'src/redux/webSocketSlice';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaProvider>
          <PaperProvider>
            <AppContent />
          </PaperProvider>
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}


function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectWebSocket());

    return () => {
      dispatch(disconnectWebSocket());
    };
  }, []);

  return <NavigationContainer />;
}

export default App;
