import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux'; 
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationContainer from 'src/navigation';
import store from 'src/redux/store'; 

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
