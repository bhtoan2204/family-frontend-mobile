import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import NavigationContainer from 'src/navigation';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
