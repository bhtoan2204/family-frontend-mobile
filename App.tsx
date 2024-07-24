import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationContainer from 'src/navigation';
import { store } from 'src/redux/store';
import { connectSocket } from 'src/services/apiclient/Socket';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { MenuProvider } from 'react-native-popup-menu';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { ToastProvider } from 'react-native-toast-notifications'

const App: React.FC = () => {

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <ToastProvider>
      <Provider store={store}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <PaperProvider>
              <ActionSheetProvider>
                <MenuProvider>
                  <BottomSheetModalProvider>

                    <NavigationContainer />
                  </BottomSheetModalProvider>
                </MenuProvider>
              </ActionSheetProvider>
            </PaperProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </Provider>
    </ToastProvider>
  );
};

export default App;
