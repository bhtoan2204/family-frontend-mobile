import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationContainer from 'src/navigation';
import { Provider } from 'react-redux';
import { store } from 'src/redux/store';
function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Provider store={store}>
          <NavigationContainer />
        </Provider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
